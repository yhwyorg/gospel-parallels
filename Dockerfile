FROM node:18-alpine AS build

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json* ./

# Install dependencies with legacy-peer-deps flag to handle dependency conflicts
RUN npm ci --legacy-peer-deps

# Copy all project files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Set up nginx config for single-page application
RUN echo 'server { \
  listen 80; \
  location / { \
    root /usr/share/nginx/html; \
    index index.html; \
    try_files $uri $uri/ /index.html; \
  } \
}' > /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
