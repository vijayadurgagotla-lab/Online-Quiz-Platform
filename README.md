# Online Quiz Platform

A web-based Online Quiz Platform that allows users to register, log in, attend quizzes, and view their results. The application uses a frontend interface connected to a Node.js and Express backend and MySQL database.

## Features

- User Registration
- User Login and Authentication
- Quiz Dashboard
- Multiple-choice questions
- Quiz submission
- Automatic result calculation
- Result viewing
- Session-based authentication
- MySQL database integration
- REST API-based backend

## Technologies Used

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MySQL

### Other Tools
- Git
- GitHub
- VS Code

## Project Structure

```text
OnlineQuizPlatformFSD/
├── backend/
│   ├── configure/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routers/
│   │   ├── auth.js
│   │   ├── quizzes.js
│   │   └── results.js
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
└── frontend/
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── auth.js
    │   └── quizzes.js
    ├── login.html
    ├── register.html
    └── quizzes.html
```
