FROM node:20-slim

WORKDIR /app

# Install OpenSSL required by Prisma
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy package manifests and Prisma schema
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Generate Prisma Client and compile TypeScript
RUN npx prisma generate
RUN npm run build

EXPOSE 3001

CMD ["node", "dist/src/index.js"]
