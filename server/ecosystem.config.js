module.exports = {
  apps: [
    {
      name: "krev2-api",
      script: "dist/src/index.js",
      instances: "max", // Uses all available CPUs (2 on t3.small)
      exec_mode: "cluster",
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};