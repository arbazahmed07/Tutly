# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

RUN apk add --no-cache libc6-compat curl

# Copy package.json and package-lock.json files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Production Image
FROM node:18-alpine AS runner

# Set environment variables
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0

# Set the working directory
WORKDIR /app

RUN apk add --no-cache libc6-compat curl


# Copy built application from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Install only production dependencies
RUN npm install --only=production

# Expose the port for the Next.js application
EXPOSE 4000

# Start the application
CMD ["npm", "start"]
