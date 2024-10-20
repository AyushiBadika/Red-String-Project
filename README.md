# My Broker

Explore upcoming events or post your own. Join the fun, connect with others, and never miss out on exciting experiences!

## Hosted Link :

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)

## Features

- User authentication (sign up, sign in, sign out)
- Event creation and management
- User profile management
- Responsive design for mobile and desktop

## Screenshots

Here are screenshots of the key pages in our application:

## Installation

1. Clone the repository:

   ```
   git clone
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up your environment variables:

   ```
   In root directory :
   PORT
   CONNECTION_STRING
   JWT_SECRET

   cd client :
   VITE_FIREBASE_API_KEY
   VITE_SERVER_URL

   ```

   Then edit the `.env` file with your configuration.

## Usage

To run the project in development mode:

```
npm run dev
```

To build the project:

```
npm run build
```

### Auth Routes

- **POST** `/api/auth/sign-up`: Register a new user
- **POST** `/api/auth/sign-in`: Log in a user
- **GET** `/api/auth/sign-out`: Log out the user

### Listing Routes

- **POST** `/api/event/create`: Create a new event (requires token)
- **GET** `/api/event/events`: Get all events of a user (requires token)
- **DELETE** `/api/event/delete/:id`: Delete a event by ID (requires token)
- **POST** `/api/event/update/:id`: Update a event by ID (requires token)
- **GET** `/api/event/get/:id`: Get a specific event by ID
- **GET** `/api/event/get/`: Get all events

### User Routes

- **GET** `/api/user/:id`: Get user data by ID (requires token)
- **POST** `/api/user/update`: Update user data (requires token)
- **DELETE** `/api/user/delete`: Delete a user account (requires token)
