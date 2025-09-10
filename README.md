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
## 📐 UML Diagram

Here is the class diagram representing the main entities and their relationships in the system:  

![Class Diagram](https://github.com/Mustapha-who/KreV2.0/blob/736e1291a4ca15d5a6ffac700f792b0403a054a9/client/public/r8.png)


