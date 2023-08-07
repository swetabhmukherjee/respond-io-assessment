# Dockerfile
FROM node:14

# Install wait-for-it.sh script
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh

# Set working directory
WORKDIR /app

# Copy application files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Install sequelize globally inside the container
RUN npm install -g sequelize-cli

# Start the application using the wait-for-it.sh script
CMD ["/usr/wait-for-it.sh", "db:3306", "--", "node", "app.js"]
