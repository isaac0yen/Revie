
# Revie

Revie is a platform where users can sign up, post reviews about apartments they've lived in, including optional videos and/or images. Users can review landlords, the environment, and the quality of amenities. Reviews can be marked as helpful by visitors and can be sorted by helpfulness or recency.

## Table of Contents

- [Revie](#revie)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Usage](#usage)
  - [API Documentation](#api-documentation)
    - [Endpoints](#endpoints)
    - [Example Requests](#example-requests)
      - [Register a User](#register-a-user)
      - [Login a User](#login-a-user)
      - [Create a Review](#create-a-review)
  - [Database Schema](#database-schema)
    - [Users Table](#users-table)
    - [Reviews Table](#reviews-table)
  - [Deployment](#deployment)
  - [Contributing](#contributing)

## Features

- User registration and authentication
- Posting reviews with text, images, and videos
- Marking reviews as helpful
- Sorting reviews by helpfulness or recency

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/isaac0yen/revie.git
    cd revie
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up the database:
    - Ensure you have MySQL installed and running.
    - Create a database for the project.

4. Set up environment variables:
    - Create a `.env` file in the root directory and add the following variables:
    ```env
    DB_HOST=your_database_host
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_NAME=your_database_name
    JWT_SECRET=your_jwt_secret
    ```

5. Run the database setup script to create tables:
    ```sh
    node setupDatabase.js
    ```

## Environment Variables

Make sure to create a `.env` file in the root directory with the following content:

```env
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret
```

## Usage

Start the server:
```sh
npm start
```

The server will start on the port specified in your environment variables (default is `3000`).

## API Documentation

The API documentation is generated using Swagger. Once the server is running, you can access the documentation at:
```
http://localhost:3000/api-docs
```

### Endpoints

- **POST /api/users/register**
  - Registers a new user.
- **POST /api/users/login**
  - Logs in a user.
- **POST /api/reviews**
  - Creates a new review.
- **GET /api/reviews**
  - Retrieves all reviews.
- **PATCH /api/reviews/{id}/helpful**
  - Marks a review as helpful.
- **GET /api/reviews/sort**
  - Sorts reviews by helpfulness or recency.

### Example Requests

#### Register a User
```sh
curl -X POST http://localhost:3000/api/users/register \
-H "Content-Type: application/json" \
-d '{"name": "John Doe", "email": "john.doe@example.com", "password": "password123"}'
```

#### Login a User
```sh
curl -X POST http://localhost:3000/api/users/login \
-H "Content-Type: application/json" \
-d '{"email": "john.doe@example.com", "password": "password123"}'
```

#### Create a Review
```sh
curl -X POST http://localhost:3000/api/reviews \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your_jwt_token>" \
-d '{"landlord": "Good landlord", "environment": "Nice environment", "amenities": "Great amenities", "images": ["image1.jpg"], "videos": ["video1.mp4"]}'
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Reviews Table
```sql
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    landlord VARCHAR(255) NOT NULL,
    environment TEXT NOT NULL,
    amenities TEXT NOT NULL,
    images TEXT NULL,
    videos TEXT NULL,
    helpful_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## Deployment

1. Ensure you have set up the environment variables on your server.
2. Clone the repository on your server:
    ```sh
    git clone https://github.com/isaac0yen/revie.git
    cd revie
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

4. Start the server:
    ```sh
    npm start
    ```

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch`
5. Open a pull request.
