# Task-Board-Backend

A robust and scalable backend built with Node.js and Express.js to manage projects, tasks, comments, and users.
This API serves as the core engine for the task-board.

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/RaviGahire/task-board-backend
cd <project-folder>
```

### 2. Install dependencies

```bash
npm install
```

---

##  Environment Configuration

Create a `.env` file in the root directory and add the following variables:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5000
```

---

## Run the Server

### Development

```bash
npm run dev
npm node index.js
```

### Production

```bash
npm node index.js
```

---

## 🌐 API Base URL

```
http://localhost:8000/api/
```

---

## 📂 Folder Structure

```text
/src
  ├── /config        # DB connection, environment setup
  ├── /controllers   # Route logic (business logic)
  ├── /models        # Mongoose schemas
  ├── /routes        # API route definitions
  ├── /middlewares   # Auth, error handling
  ├── /utils         # Helper functions (ApiError, ApiResponse)
  ├── /validators    # Request validation logic
  ├── app.js         # Express app configuration
  └── index.js      # Server entry point
```

---

## Request Flow

1. **Client Request** → Frontend sends API request
2. **Route Layer** → Request hits route
3. **Controller** → Handles request logic
4. **Service Layer (optional)** → Business logic execution
5. **Database** → MongoDB operations via Mongoose
6. **Response** → JSON response sent to client


##  Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* dotenv
* CORS

---

##  API Modules

* **Projects** → Create, update, delete projects
* **Tasks** → Task CRUD operations
* **Comments** → Add & manage comments

---

## Best Practices

* **MVC Architecture** → Clean separation of concerns
* **Error Handling** → Centralized error middleware
* **Reusable Utilities** → ApiError, ApiResponse
* **Environment Variables** → Secure config management
* **Modular Code Structure** → Easy scalability

---

## Error Handling Format

```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```

---

## Success Response Format

```json
{
  "success": true,
  "message": "Request successful",
  "data": {}
}
```

---

## Notes

* Ensure MongoDB is running before starting the server
* Keep `.env` file secure and never push to GitHub
* Use Postman or Thunder Client for API testing

---

## Author

Ravi Gahire
