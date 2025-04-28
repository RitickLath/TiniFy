# High-Performance URL Shortener with Scalable Analytics and Caching (Tinify)

This project is a simple and efficient URL shortener service built using Node.js, Express, Prisma, Redis, and JWT for authentication. It supports user registration and login, URL shortening with expiration dates, redirection, analytics tracking, and automatic cleanup of expired URLs using Cron jobs.

## Features

- **User Authentication**: Users can sign up and sign in with JWT-based authentication.
- **URL Shortening**: Users can generate short URLs with expiration dates.
- **Redirection**: Short URLs redirect to the original URLs.
- **Cache Optimization with Redis**: Short URLs are cached in Redis for faster redirection.
- **Analytics**: Tracks device type, referer, IP address, and timestamp for each URL visit.
- **Automatic Cleanup**: Cron jobs are implemented to automatically delete expired URLs from the database.

## Technologies Used

- **Node.js & Express**: Web server and routing.
- **Prisma**: ORM for interacting with the PostgreSQL database.
- **Redis**: In-memory data store for caching short URLs.
- **JWT**: Secure token-based authentication for users.
- **PostgreSQL**: Relational database to store users, URLs, and analytics.
- **Zod**: Validation library to ensure data integrity.
- **Cron Jobs**: For periodic cleanup of expired URLs from the database.

## Functional Requirements

1. **User Authentication**:
   - Users can sign up and sign in using email and password.
   - JWT tokens are issued after successful sign-in and used for protecting routes.
2. **URL Shortening**:
   - Users can provide a URL and receive a unique short URL.
   - The short URL will have an expiration date (30 days by default).
3. **Redirection**:
   - When a short URL is accessed, the system will redirect to the original URL.
   - Redirection data is stored in Redis for faster access.
4. **Analytics**:
   - Every redirection is logged with analytics including device type, referer, IP address, and timestamp.
5. **Caching**:
   - Short URLs are cached in Redis to reduce load on the database.
   - URLs are cached with an expiration time based on their remaining time in the database.
6. **Automatic Cleanup of Expired URLs**:
   - Cron jobs run periodically to delete expired URLs from the database.

## Non-Functional Requirements

1. **Performance**:

   - Fast redirection by using Redis for caching.
   - Minimize database queries by storing frequently accessed data in Redis.
   - Cron jobs are used for periodic cleanup to maintain a lean database.

2. **Scalability**:

   - The system can scale to handle many users and short URLs.
   - Caching with Redis helps improve scalability by reducing load on the database.

3. **Security**:

   - JWT-based authentication ensures secure access to the API.
   - Passwords are hashed using bcrypt before being stored in the database.
   - Input validation is done using Zod to prevent malformed data.

4. **Maintainability**:
   - Code is modular, with separate controllers, routes, and services.
   - Prisma ORM is used to interact with the PostgreSQL database, making the codebase easier to maintain and extend.

## Optimizations

### 1. **Redis Caching**:

- Short URLs are stored in Redis for faster access. When a short URL is requested, Redis is checked first before querying the database. This minimizes database load and improves the response time for redirection requests.
- Redis stores the short URL with an expiration time, which is either set to the time left in the database or a fixed duration (e.g., 3 days), ensuring the cache doesn't persist forever and is properly cleaned up.

### 2. **Non-blocking Analytics Handling**:

- Analytics logging happens asynchronously and does not block the redirection process. This ensures that the user is redirected to the original URL as quickly as possible, even while analytics data is being stored in the background.
- This non-blocking behavior optimizes redirection speed, reducing the time taken for the redirection process.

- With Blocking
  ![alt text](image.png)
- Without Blocking
  ![alt text](image-1.png)

### 3. **Cron Jobs for Expired URL Cleanup**:

- A **Cron Job** is implemented to run periodically (e.g., every day) and clean up expired URLs from the database. This ensures that the database is not cluttered with outdated records, which could slow down operations and increase storage usage.

## Project Setup

### Prerequisites

- Node.js >= 14.x
- PostgreSQL Database
- Redis (for caching)
- JWT Secret for token generation

### Environment Setup

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd <project-directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```bash
     DATABASE_URL=postgresql://username:password@localhost:5432/database_name
     JWT_SECRET=your_jwt_secret
     REDIS_URL=redis://localhost:6379
     ```

4. Run Prisma migrations to set up the database:

   ```bash
   npx prisma migrate dev --name init
   ```

5. Start the application:
   ```bash
   npm run start
   ```

### Available Routes

- **User Authentication**:

  - `POST /api/v1/auth/signup`: Register a new user.
  - `POST /api/v1/auth/signin`: Log in a user and get a JWT token.

- **URL Shortening**:
  - `POST /api/v1/generate`: Generate a short URL for the given original URL.
- **Redirection**:

  - `GET /api/v1/:short`: Redirect to the original URL using the short URL.

- **Analytics**:
  - `POST /api/v1/analytics`: (Placeholder route for future analytics retrieval).

### Example Requests

1. **Sign Up**:

   ```bash
   POST /api/v1/auth/signup
   {
     "username": "john_doe",
     "email": "john.doe@example.com",
     "password": "Password123!"
   }
   ```

2. **Sign In**:

   ```bash
   POST /api/v1/auth/signin
   {
     "email": "john.doe@example.com",
     "password": "Password123!"
   }
   ```

3. **Generate Short URL**:

   ```bash
   POST /api/v1/generate
   {
     "url": "https://example.com/long-url",
     "userId": 1
   }
   ```

4. **Redirect**:
   ```bash
   GET /api/v1/:short
   ```

### Cron Job for Expired URL Cleanup

To set up the Cron job to delete expired URLs, we can use the `node-cron` library.

- **Cron Job Setup**: A cron job is implemented in the `cron-job.ts` file (or a similar file) that runs at 4am everyday to check for expired URLs and deletes them from the database.

  Example of cron job code:

  ```ts
  // Run every day at midnight
  import { CronJob } from "cron";

  const job = new CronJob(
    "0 4 * * * *", // 4AM every day
    async () => {
      const now = new Date();
      try {
        // Deleting URLs where expirationDate is less than the current date
        await prisma.uRLs.deleteMany({
          where: {
            expirationDate: {
              lt: now,
            },
          },
        });
        console.log("Expired URLs deleted successfully.");
      } catch (error) {
        console.error("Error deleting expired URLs:", error);
      }
    },
    null, // no callback after conmpletion
    true, // automatically start cron job
    "Asia/Kolkata"
  );
  ```

This ensures that expired URLs are cleaned up daily, preventing database clutter and improving performance.

### Database Schema

The database schema is defined using Prisma and includes the following models:

1. **User**:
   - `id`: Unique identifier.
   - `username`: User's username.
   - `email`: Unique email address.
   - `password`: User's hashed password.
2. **URLs**:

   - `id`: Unique identifier.
   - `originalURL`: The original URL.
   - `redirectedURL`: The shortened URL.
   - `creationDate`: The date and time when the URL was created.
   - `expirationDate`: The date and time when the URL expires.
   - `userId`: The ID of the user who created the URL.

3. **Analytics**:
   - `id`: Unique identifier.
   - `deviceType`: The type of device used for the request.
   - `referer`: The referrer URL.
   - `ipAddress`: The IP address of the requestor.
   - `visitedAt`: Timestamp of when the URL was accessed.
   - `urlId`: The ID of the URL that was accessed.
