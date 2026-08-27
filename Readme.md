# Members Only Posts

A full-stack members-only messaging application built with **Node.js, Express, PostgreSQL, Passport.js, EJS, and server-side sessions**.

Users can create accounts, authenticate securely, join a private club, create messages, and manage messages according to their authorization level.

## Live Demo

[The Common Room](https://members-only-posts.onrender.com)

> The application is deployed on Render and uses Neon PostgreSQL for production data storage.

---

## Features

### Authentication

* User registration
* Password hashing with bcrypt
* Login with Passport.js LocalStrategy
* Session-based authentication
* PostgreSQL session storage using `connect-pg-simple`
* Secure production session cookies
* Logout functionality

### Authorization

* Authentication-protected routes
* Admin-only actions
* Message owner authorization
* Admin override for message management
* Membership-based access control

### Messages

* Create messages
* View messages
* View individual messages
* Edit own messages
* Admin message management
* Delete messages
* Message ownership checks

### Security

* CSRF protection using the Synchronizer Token Pattern
* CSRF protection on state-changing requests
* Password hashing with bcrypt
* `httpOnly` session cookies
* `secure` cookies in production
* `SameSite=Lax` session cookies
* Session regeneration through Passport authentication
* Server-side validation with `express-validator`
* Centralized error handling

### Error Handling

The application uses custom application errors and centralized error handling for:

* `401 Unauthorized`
* `403 Forbidden`
* `404 Not Found`
* `500 Internal Server Error`

Error pages are rendered using EJS and styled consistently with the rest of the application.

---

## Tech Stack

### Backend

* Node.js
* Express 5
* PostgreSQL
* Passport.js
* Passport LocalStrategy
* Express Session
* connect-pg-simple
* bcrypt
* express-validator

### Frontend

* EJS
* HTML
* CSS
* Vanilla JavaScript

### Database

* PostgreSQL
* Neon PostgreSQL in production

### Deployment

* Render — application hosting
* Neon — PostgreSQL hosting
* GitHub — source control

---

## Project Structure

```text
members-only-posts/
├── app.js
├── server.js
├── package.json
├── package-lock.json
├── public/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── flashMessage.js
├── src/
│   ├── config/
│   │   └── passport.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── messageController.js
│   │   └── userController.js
│   ├── db/
│   │   ├── pool.js
│   │   └── schema.sql
│   ├── errors/
│   │   ├── AppError.js
│   │   └── NotFoundError.js
│   ├── middlewares/
│   │   ├── authMiddlewares/
│   │   │   ├── requireAdmin.js
│   │   │   ├── requireAuth.js
│   │   │   ├── requireMember.js
│   │   │   └── requireMessageOwnerOrAdmin.js
│   │   ├── errorMiddlewares/
│   │   │   ├── errorHandler.js
│   │   │   └── handleValidationError.js
│   │   ├── flashMessage.js
│   │   └── securityMiddlewares/
│   │       ├── csrf.js
│   │       └── verifyCsrfToken.js
│   ├── models/
│   │   ├── messageModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── authRouter.js
│   │   ├── messageRouter.js
│   │   └── userRouter.js
│   └── validators/
│       ├── authValidator.js
│       ├── messageValidator.js
│       └── userValidator.js
└── views/
    ├── errors/
    │   └── error.ejs
    ├── partials/
    │   ├── flashMessage.ejs
    │   ├── footer.ejs
    │   ├── head.ejs
    │   ├── header.ejs
    │   ├── messages.ejs
    │   └── nav.ejs
    ├── editMessage.ejs
    ├── homePage.ejs
    ├── loginForm.ejs
    ├── message.ejs
    ├── newMessage.ejs
    ├── profile.ejs
    └── signupForm.ejs
```

---

## Database Schema

The application uses three PostgreSQL tables.

### `users`

Stores registered users and their authorization state.

Important fields include:

* `id`
* `first_name`
* `last_name`
* `username`
* `email`
* `password_hash`
* `membership_status`
* `is_admin`
* `created_at`

### `messages`

Stores messages created by users.

Important fields include:

* `id`
* `title`
* `message`
* `user_id`
* `created_at`
* `updated_at`

Each message belongs to a user through a foreign key with `ON DELETE CASCADE`.

### `session`

Stores Express sessions using `connect-pg-simple`.

This allows sessions to persist in PostgreSQL instead of being stored only in application memory.

---

## Authentication Flow

The application uses Passport.js with a local email/password strategy.

```text
User
 ↓
Login Form
 ↓
Passport LocalStrategy
 ↓
Find User in PostgreSQL
 ↓
bcrypt.compare()
 ↓
req.logIn()
 ↓
Passport serializeUser()
 ↓
Session stored in PostgreSQL
 ↓
members_session cookie
```

For subsequent authenticated requests:

```text
members_session cookie
 ↓
Express Session
 ↓
Passport deserializeUser()
 ↓
req.user
 ↓
Authorization middleware
```

---

## CSRF Protection

State-changing requests are protected using a session-based CSRF token.

The token is generated and stored in the user's session and included in protected forms.

```text
GET Form
 ↓
Generate CSRF Token
 ↓
Store Token in Session
 ↓
Render Hidden Form Field
 ↓
POST Request
 ↓
Verify Submitted Token
 ↓
Allow / Reject Request
```

Invalid or missing CSRF tokens are rejected before the protected operation is performed.

---

## Environment Variables

The application requires the following environment variables:

```text
PORT
DATABASE_URL
SESSION_SECRET
NODE_ENV
```

Example:

```text
NODE_ENV=production
DATABASE_URL=<your PostgreSQL connection string>
SESSION_SECRET=<your production session secret>
```

Secrets should never be committed to the repository.

---

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/Mayank789947/members-only-posts.git
cd members-only-posts
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```text
PORT=3000
DATABASE_URL=<your PostgreSQL connection string>
SESSION_SECRET=<your session secret>
NODE_ENV=development
```

### 4. Create the database schema

Run the SQL from:

```text
src/db/schema.sql
```

against your PostgreSQL database.

The `session` table must also exist when using `connect-pg-simple`.

### 5. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## Production Deployment

The production application is deployed using:

* **Render** for the Express application
* **Neon** for PostgreSQL

Production environment variables are configured through the hosting platform rather than committed to the repository.

The application uses HTTPS in production and enables secure session cookies.

---

## Project Goals

This project was built to practice real-world backend development concepts, including:

* Authentication
* Authorization
* Session management
* PostgreSQL integration
* Security middleware
* CSRF protection
* Input validation
* Error handling
* MVC-style application structure
* Production deployment

---

## Author

**Mayank Rawat**

GitHub: [Mayank789947](https://github.com/Mayank789947)
