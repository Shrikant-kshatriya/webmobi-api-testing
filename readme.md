Sure, here is a README file for the assignment:

---

# Authentication System Assignment

This project is a basic authentication system implemented using Node.js, Express, and MySQL. It includes user registration, login functionalities, and JWT (JSON Web Token) for securing the endpoints.

## Features

- **User Registration**: Registers a new user with a hashed password.
- **User Login**: Logs in a user and returns a JWT.
- **Profile Retrieval**: Retrieves the logged-in user's profile information (protected endpoint).

## Endpoints

### Register a new user
- **URL**: `/register`
- **Method**: `POST`
- **Body Parameters**:
  - `username` (String, required)
  - `email` (String, required)
  - `password` (String, required)
- **Response**: 
  - `201 Created`: User registered successfully
  - `400 Bad Request`: User already exists or missing fields
  - `500 Internal Server Error`: Error message

### Login a user and return a JWT
- **URL**: `/login`
- **Method**: `POST`
- **Body Parameters**:
  - `email` (String, required)
  - `password` (String, required)
- **Response**:
  - `200 OK`: JWT token
  - `400 Bad Request`: Invalid email or password
  - `500 Internal Server Error`: Error message

### Retrieve the logged-in user's profile
- **URL**: `/profile`
- **Method**: `GET`
- **Headers**:
  - `Cookie`: `token=${authToken}`
- **Response**:
  - `200 OK`: User profile
  - `404 Not Found`: User not found
  - `500 Internal Server Error`: Error message

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Shrikant-kshatriya/webmobi-api-testing.git
   cd auth-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your MySQL database credentials and JWT secret:
   ```env
   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   JWT_SECRET=your_jwt_secret_key
   ```

4. Run the application:
   ```bash
   npm start
   ```

5. The application will be running on `http://localhost:3000`.

## Testing

To run the tests, use the following command:
```bash
npm test
```

## Dependencies

- `express`: Web framework for Node.js
- `mysql2`: MySQL client for Node.js
- `bcryptjs`: Library for hashing passwords
- `jsonwebtoken`: Library for generating and verifying JWTs

## License

This project is licensed under the ISC License.

---
