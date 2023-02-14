# Use a Node.js base image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the required dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the production version of the app
RUN npm run build

# Set the command to start the app
CMD ["npm", "start"]
