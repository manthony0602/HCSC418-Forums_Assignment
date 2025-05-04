# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Expose port 5000 for the backend to communicate with the outside
EXPOSE 5000

# Define the command to run when the container starts
CMD ["node", "server.js"]