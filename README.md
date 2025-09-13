# 🏠 Enterprise Real Estate Rental Web App  
![Image Alt](https://github.com/Mustapha-who/KreV2.0/blob/da9fecc91494e74dd4f6c0fdc4bdbeb3c3ed9532/client/public/r1.png)  
![Image Alt](https://github.com/Mustapha-who/KreV2.0/blob/da9fecc91494e74dd4f6c0fdc4bdbeb3c3ed9532/client/public/r2.png)  
![Image Alt](https://github.com/Mustapha-who/KreV2.0/blob/da9fecc91494e74dd4f6c0fdc4bdbeb3c3ed9532/client/public/r3.png)  
![Image Alt](https://github.com/Mustapha-who/KreV2.0/blob/da9fecc91494e74dd4f6c0fdc4bdbeb3c3ed9532/client/public/r7.png)  
![Image Alt](https://github.com/Mustapha-who/KreV2.0/blob/da9fecc91494e74dd4f6c0fdc4bdbeb3c3ed9532/client/public/r4.png)  
![Image Alt](https://github.com/Mustapha-who/KreV2.0/blob/da9fecc91494e74dd4f6c0fdc4bdbeb3c3ed9532/client/public/r5.png)  
![Image Alt](https://github.com/Mustapha-who/KreV2.0/blob/da9fecc91494e74dd4f6c0fdc4bdbeb3c3ed9532/client/public/r6.png)  


## 📌 Description  
This project is a **full-stack rental apartment management platform** built with **Next.js (frontend)** and **Node.js/Express (backend)**, deployed on **AWS**. It supports **tenants and managers**, with role-based dashboards, advanced property search (server-side filtering + Mapbox integration), secure authentication with **AWS Cognito**, and image uploads via **S3**.  

## 🚀 Features  
- 🔐 **Authentication & Roles** → Secure login/signup with AWS Cognito (tenant & manager dashboards).  
- 🏡 **Property Management** → Create, view, update, and delete property listings.  
- 🗺️ **Advanced Search** → Server-side filtering (price, rooms, type, etc.) with Mapbox interactive map.  
- 📸 **Image Uploads** → Property images stored in AWS S3.  
- 📊 **Dashboards** → Tenant (favorites, applications, leases) and Manager (property management, tenant applications).  
- ☁️ **Cloud Deployment** → Backend on AWS EC2 + RDS (Postgres + PostGIS), frontend on AWS Amplify, API Gateway + Cognito authorizers for secure communication.  

## 🛠️ Tech Stack  
- **Frontend**: Next.js, TailwindCSS, Shadcn/UI, Redux Toolkit (modular structure), React Hook Form, Zod, Framer Motion  
- **Backend**: Node.js, Express, Prisma ORM, PostgreSQL, PostGIS  
- **Cloud (AWS)**: EC2, RDS, S3, Cognito, Amplify, API Gateway  

## ⚙️ Setup Instructions  

### 1️⃣ Clone the repo  
```bash
git clone https://github.com/your-username/rental-app.git
cd rental-app
2️⃣ Frontend Setup
cd client
npm install
npm run dev
3️⃣ Backend Setup
cd server
npm install
npm run dev
```
## 🔑 Environment Variables

There are two .env files, one for the server and one for the client.

### 📂 Server (/server/.env)
```bash
PORT=5000
DATABASE_URL=postgresql://username:password@host:5432/rentaldb
S3_BUCKET_NAME=your_bucket_name
```
### 📂 Client (/client/.env)
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token
NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID=your_user_pool_id
NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID=your_client_id
```
## 🗄️ Database Setup with Prisma & Postgres

We use Prisma ORM to handle database schema and migrations.

### 1️⃣ Initialize Prisma 
```bash
npx prisma init
2️⃣ Define your schema in prisma/schema.prisma
3️⃣ Generate Prisma client
npx prisma generate
4️⃣ Run migrations to Postgres
npx prisma migrate dev --name init
5️⃣ Check the database with Prisma Studio (optional)
npx prisma studio
```

## ☁️ AWS Infrastructure Setup

Below are the steps we followed to deploy the project on AWS. Most resources were created via the AWS Console interface, and only the EC2 server uses bash commands after SSH access.

🌐 VPC (Networking)
Role: Provides secure network isolation for backend services.
- In the AWS Console → VPC → Create VPC → choose "VPC and more".
- Created:
  - 1 public subnet (for EC2)
  - 2 private subnets (for RDS in different AZs)
  - 1 Internet Gateway (attached to the VPC)
- Created 2 route tables:
  - Public route table → associated with the public subnet → has a route to the Internet Gateway.
  - Private route table → associated with the two private subnets.
- Created 2 security groups:
  - sg-ec2 → allow inbound HTTP (5000) and SSH (22) from our IP.
  - sg-rds → allow inbound Postgres (5432) only from sg-ec2.

🖥️ EC2 (Backend Server)
Role: Runs the Node.js/Express backend.
- In AWS Console → EC2 → Launch Instance → (choose your instance).
- Place it in the public subnet and attach sg-ec2.
- Create a key pair (.pem) for SSH access.
- Connect via SSH from your local machine:
  ssh -i your-key.pem ubuntu@your-ec2-public-ip
- Inside EC2, install dependencies and run backend:
  sudo apt update
  sudo apt install -y nodejs npm git
  sudo npm install -g pm2
  git clone https://github.com/your-username/rental-app.git
  cd rental-app/server
  nano .env
 # Add: PORT, DATABASE_URL, S3_BUCKET_NAME
  npm install
  npx prisma migrate deploy
  pm2 start or npm run dev
  

🗄️ RDS (PostgreSQL + PostGIS)
Role: Stores application data.
- Go to RDS → Create database → PostgreSQL engine.
- Place it in the 2 private subnets (multi-AZ) and attach sg-rds.
- After it's available, copy the endpoint.
- From EC2 connect and enable PostGIS:
  sudo apt install -y postgresql-client
  psql -h <rds-endpoint> -U <username> -d <dbname>
  CREATE EXTENSION postgis;
- Add DATABASE_URL in the backend .env and restart the server.

🪣 S3 (Image Storage)
Role: Stores property images.
- Go to S3 → Create bucket.
- Disable "Block all public access" (if uploads need public access).
- Under Permissions → add CORS rule:
  [
    {"AllowedHeaders": ["*"], "AllowedMethods": ["GET","POST","PUT"], "AllowedOrigins": ["*"]}
  ]
- Create an IAM user with AmazonS3FullAccess → get access keys → use them in backend.

🧩 Cognito + API Gateway
Role: Handles authentication and secures API requests.
- Go to Cognito → Create User Pool → enable email login → create App Client.
- Copy User Pool ID and Client ID → add them to frontend .env.
- Go to API Gateway → Create REST API → integrate it with your EC2 backend endpoint.
- Create a Cognito Authorizer → attach it to protected routes → deploy API.
- Use API Gateway Invoke URL as NEXT_PUBLIC_API_BASE_URL in frontend.

🚀 Amplify (Frontend Hosting)
Role: Hosts and deploys the Next.js frontend.
- Go to Amplify → Create new app → Connect GitHub → select your repo and main branch.
- In build settings, add:
  NEXT_PUBLIC_API_BASE_URL=https://your-api-gateway-endpoint
  NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token
  NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID=your_user_pool_id
  NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID=your_client_id
- Amplify builds and deploys automatically on every push.


## 📐 UML Diagram

Here is the class diagram representing the main entities and their relationships in the system:  

![Class Diagram](https://github.com/Mustapha-who/KreV2.0/blob/736e1291a4ca15d5a6ffac700f792b0403a054a9/client/public/r8.png)




