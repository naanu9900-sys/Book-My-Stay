<<<<<<< HEAD
# Book My Stay — Local Auth Server

This adds a simple Node.js + SQLite server to handle user registration and login for the sample pages.

Quick start:

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

3. Open the login page in your browser:

http://localhost:3000/login%20page.html

Endpoints:
- `POST /register` { email, password } — create a test user
- `POST /login` { email, password } — authenticate user

Notes:
- Passwords are hashed using bcrypt.
- The database file `auth.db` is created in the workspace root.
- For production use, add HTTPS, CSRF protection, sessions or JWTs, and a proper user flow.
=======
# Book-My-Stay
Major Project
>>>>>>> 33cfc5736415e649e385d59b70e7472153402b5f
