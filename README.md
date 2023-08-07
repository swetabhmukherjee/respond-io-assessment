# Notes App API Documentation

This document provides clear and concise instructions on how to run and test the Node.js application, including MySQL and Redis usage, and an overview of the design pattern used.

## Prerequisites

Before running the application, ensure you have the following installed on your system:

- Node.js (v14 or above)

- Docker and Docker Compose (to use MySQL and Redis in containers)

- MySQL client (optional for direct database access)

## Installation

1\. Clone the repository from GitHub:

```bash

git clone <repository_url>

cd <repository_folder>

```

2\. Install Node.js dependencies:

```bash

npm install

```

## Configuration

The application uses environment variables for configuration. Create a `.env` file in the root directory of the project and add the following variables:

```

# Application

PORT=3000

NODE_ENV=development

# MySQL

MYSQL_HOST=localhost

MYSQL_PORT=3306

MYSQL_USER=my_app_user

MYSQL_PASSWORD=my-secret-password

MYSQL_DATABASE=my_app_db

# Redis

REDIS_HOST=localhost

REDIS_PORT=6379

```

Modify the values according to your MySQL and Redis configurations.

## Database Setup

The application uses MySQL for data storage. If you have Docker and Docker Compose installed, you can start MySQL and Redis as containers:

```bash

docker-compose up -d

```

This command will start MySQL and Redis in the background.

## Running the Application

To start the Node.js application, use the following command:

```bash

npm start

```

The application will be accessible at `http://localhost:3000`.

## Testing the Application

To run the unit tests for the application, use the following command:

```bash

npm test

```

The tests cover critical components and business logic to ensure the application behaves as expected.

## Design Pattern

The application follows the Model-View-Controller (MVC) design pattern:

1\. **Model**: Contains the data and business logic. It includes the database models (created using Sequelize) and services to interact with the database.

2\. **View**: Represents the user interface, but in this case, it is not implemented explicitly as the application is an API.

3\. **Controller**: Acts as the middle layer between the Model and View. It handles incoming HTTP requests, processes data, and sends appropriate responses.

## Conclusion

You have successfully set up, run, and tested the Node.js application with MySQL and Redis support. The application follows the MVC design pattern, promoting a clear separation of concerns and maintainability.

For any further questions or assistance, please refer to the application's code or reach out to the development team. Happy coding!