# Use an official Node.js runtime as the base image
FROM node:18.17-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install --production  # Only install production dependencies

# Copy the rest of the app's source code
COPY . .

# Build the React app for production
RUN npm run build

# Install a simple HTTP server to serve the build files
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Serve the built app
CMD ["serve", "-s", "build"]
