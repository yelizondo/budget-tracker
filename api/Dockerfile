# Use a Node.js LTS base image
FROM node:22

# Set the working directory in the container
WORKDIR /app

RUN apt-get update && apt-get install -y curl 

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json /app/

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . /app/

# Expose the desired port for your application 
EXPOSE 4000

# Start the application using ts-node
CMD ["npm", "start"]