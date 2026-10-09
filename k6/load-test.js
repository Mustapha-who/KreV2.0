import http from "k6/http";
import { check, sleep } from "k6";
import { Rate, Trend } from "k6/metrics";

const failureRate = new Rate("failed_requests");
const propertySearchDuration = new Trend("property_search_duration", true);
const propertyDetailDuration = new Trend("property_detail_duration", true);

const BASE_URL = __ENV.BASE_URL || "http://localhost:3001";

export const options = {
  stages: [
    { duration: "1m", target: 200 },
    { duration: "1m", target: 500 },
    { duration: "1m", target: 1000 },
    { duration: "1m", target: 1500 },
    { duration: "1m", target: 2000 },
    { duration: "2m", target: 2000 }, // hold the peak
    { duration: "1m", target: 0 },    // cool-down
  ],
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<500", "p(99)<1000"],
    failed_requests: ["rate<0.01"],
  },
  // Do not wait for slow requests when the server is overloaded
  noConnectionReuse: false,
};

export default function () {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  // 1. List all properties
  {
    const res = http.get(`${BASE_URL}/properties`, { headers, timeout: "10s" });
    const ok = check(res, { "list is 200": (r) => r.status === 200 });
    failureRate.add(!ok);
    propertySearchDuration.add(res.timings.duration);
    sleep(Math.random() * 0.5 + 0.5);
  }

  // 2. Filter by price, beds, baths
  {
    const q = "priceMin=800&priceMax=3500&beds=2&baths=1";
    const res = http.get(`${BASE_URL}/properties?${q}`, { headers, timeout: "10s" });
    const ok = check(res, { "filter is 200": (r) => r.status === 200 });
    failureRate.add(!ok);
    propertySearchDuration.add(res.timings.duration);
    sleep(Math.random() * 0.5 + 0.5);
  }

  // 3. Spatial query (PostGIS)
  {
    const q = "latitude=34.0522&longitude=-118.2437";
    const res = http.get(`${BASE_URL}/properties?${q}`, { headers, timeout: "10s" });
    const ok = check(res, { "geo is 200": (r) => r.status === 200 });
    failureRate.add(!ok);
    propertySearchDuration.add(res.timings.duration);
    sleep(Math.random() * 0.5 + 0.5);
  }

  // 4. Single property
  {
    const id = Math.floor(Math.random() * 10) + 1;
    const res = http.get(`${BASE_URL}/properties/${id}`, { headers, timeout: "10s" });
    const ok = check(res, { "detail is 200": (r) => r.status === 200 });
    failureRate.add(!ok);
    propertyDetailDuration.add(res.timings.duration);
    sleep(Math.random() * 0.5 + 0.5);
  }
}