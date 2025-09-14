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

# ☁️ AWS Infrastructure Setup:

This document outlines the complete AWS infrastructure deployment for our rental application. The architecture follows AWS best practices with secure networking, managed databases, and scalable hosting solutions.


## Architecture Overview

Our application uses the following AWS services:

- **VPC**: Network isolation and security
- **EC2**: Node.js/Express backend hosting
- **RDS**: PostgreSQL database with PostGIS extension
- **S3**: Image storage for property photos
- **Cognito**: User authentication and authorization
- **API Gateway**: API management and security
- **Amplify**: Next.js frontend hosting and CI/CD


## Infrastructure Components

### 🌐 VPC (Networking)

**Purpose**: Provides secure network isolation for backend services

#### Setup Steps:
1. **Create VPC**
   ```
   AWS Console → VPC → Create VPC → "VPC and more"
   ```

2. **Network Components Created**:
   - 1 Public subnet (for EC2 instances)
   - 2 Private subnets (for RDS across different AZs)
   - 1 Internet Gateway (attached to VPC)

3. **Route Tables**:
   - **Public Route Table**: Associated with public subnet, routes to Internet Gateway
   - **Private Route Table**: Associated with private subnets

4. **Security Groups**:
   - **sg-ec2**: Allow HTTP (port 5000) and SSH (port 22) from your IP
   - **sg-rds**: Allow PostgreSQL (port 5432) only from sg-ec2

### 🖥️ EC2 (Backend Server)

**Purpose**: Runs the Node.js/Express backend application

#### Setup Steps:

1. **Launch Instance**:
   ```
   AWS Console → EC2 → Launch Instance
   ```
   - Place in public subnet
   - Attach sg-ec2 security group
   - Create and download key pair (.pem file)

2. **Connect via SSH**:
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-public-ip
   ```

3. **Install Dependencies**:
   ```bash
   sudo apt update
   sudo apt install -y nodejs npm git
   sudo npm install -g pm2
   ```

4. **Deploy Application**:
   ```bash
   git clone https://github.com/your-username/rental-app.git
   cd rental-app/server
   nano .env  # Configure environment variables
   npm install
   npx prisma migrate deploy
   pm2 start app.js  # or npm run dev for development
   ```

### 🗄️ RDS (Database)

**Purpose**: Managed PostgreSQL database with PostGIS for geospatial data

#### Setup Steps:

1. **Create Database**:
   ```
   AWS Console → RDS → Create database → PostgreSQL
   ```
   - Deploy in 2 private subnets (Multi-AZ)
   - Attach sg-rds security group

2. **Enable PostGIS Extension**:
   ```bash
   # From EC2 instance
   sudo apt install -y postgresql-client
   psql -h <rds-endpoint> -U <username> -d <dbname>
   ```
   ```sql
   CREATE EXTENSION postgis;
   ```

3. **Update Backend Configuration**:
   - Add `DATABASE_URL` to backend `.env`
   - Restart the backend server

### 🪣 S3 (Storage)

**Purpose**: Stores property images and static assets

#### Setup Steps:

1. **Create Bucket**:
   ```
   AWS Console → S3 → Create bucket
   ```

2. **Configure Public Access**:
   - Disable "Block all public access" (if public uploads needed)

3. **Set CORS Policy**:
   ```json
   [
     {
       "AllowedHeaders": ["*"],
       "AllowedMethods": ["GET", "POST", "PUT"],
       "AllowedOrigins": ["*"]
     }
   ]
   ```

4. **Create IAM User**:
   - Grant `AmazonS3FullAccess` policy
   - Generate access keys for backend configuration

### 🧩 Cognito & API Gateway

**Purpose**: Authentication and API management

#### Cognito Setup:
1. **Create User Pool**:
   ```
   AWS Console → Cognito → Create User Pool
   ```
   - Enable email login
   - Create App Client
   - Note User Pool ID and Client ID

#### API Gateway Setup:
1. **Create REST API**:
   ```
   AWS Console → API Gateway → Create REST API
   ```
   - Integrate with EC2 backend endpoint
   - Create Cognito Authorizer
   - Attach authorizer to protected routes
   - Deploy API

### 🚀 Amplify (Frontend)

**Purpose**: Hosts and deploys the Next.js frontend with CI/CD

#### Setup Steps:

1. **Connect Repository**:
   ```
   AWS Console → Amplify → Create new app → Connect GitHub
   ```
   - Select repository and main branch

2. **Configure Build Settings**:
   - Add environment variables (see [Environment Variables](#environment-variables))
   - Amplify automatically builds and deploys on each push

## Environment Variables

### Backend (.env)
```bash
PORT=5000
DATABASE_URL=postgresql://username:password@rds-endpoint:5432/dbname
S3_BUCKET_NAME=your-bucket-name
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=your-region
```

### Frontend (Amplify Environment Variables)
```bash
NEXT_PUBLIC_API_BASE_URL=https://your-api-gateway-endpoint
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token
NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID=your_user_pool_id
NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID=your_client_id
```
---

For additional support, refer to the [AWS Documentation](https://docs.aws.amazon.com/) or contact the development team.

## 📐 UML Diagram

Here is the class diagram representing the main entities and their relationships in the system:  

![Class Diagram](https://github.com/Mustapha-who/KreV2.0/blob/736e1291a4ca15d5a6ffac700f792b0403a054a9/client/public/r8.png)




