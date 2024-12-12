# Building React App
FROM node:18.17-alpine AS builder

# Set workdir
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Build
RUN npm run build

# Use Nginx
FROM nginx:1.26.2

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the build output
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
