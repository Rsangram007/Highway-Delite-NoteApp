# NoteApp

NoteApp is a RESTful API-based application designed to manage user notes. Users can register, log in using OTP verification, and perform CRUD operations on their personal notes. The application uses Node.js, Express.js, MongoDB, and TypeScript to provide a secure and efficient note management system.

## Features

### User Authentication

- **Sign Up**: Register a new account with name, email, and date of birth.
- **Login**: Log in with email and OTP verification.
- **Verify OTP**: Verify the OTP sent to the user's email.

### Notes Management

- **Get Notes**: Retrieve all notes for the authenticated user.
- **Create Note**: Add a new note with content.
- **Delete Note**: Delete a specific note by its ID.

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Email Service**: Nodemailer with SMTP
- **Middleware**: CORS, Morgan
- **Utilities**: TypeScript, Async/Await

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Rsangram007/Highway-Delite-NoteApp.git
   
   cd NoteApp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables in a `.env` file:

   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/NoteApp
   JWT_EXPIRE=7d
   JWT_SECRET=<your-secret-key>
   SMTP_SERVICE=SMTP
   SMTP_MAIL=<your-smtp-email>
   SMTP_PASSWORD=<your-smtp-password>
   SMTP_HOST=smtp.ethereal.email
   SMTP_PORT=587
   ```

4. Start the application:

   ```bash
   npm run dev
   ```

## API Endpoints

### User Routes

- **POST /user/register**: Register a new user.
- **POST /user/login**: Log in with email and generate OTP.
- **POST /user/verify-otp**: Verify OTP and get a JWT token.
- **GET /user/Getuser**: Fetch authenticated user details (requires JWT token).

### Notes Routes

- **GET /note/Notes**: Get all notes for the authenticated user.
- **POST /note/Createnotes**: Create a new note (requires JWT token).
- **DELETE /note/notes/:id**: Delete a note by ID (requires JWT token).

## Project Structure

```plaintext
src/
├── controllers/
│   ├── note.controller.ts
│   ├── user.controller.ts
├── middleware/
│   └── authorization.ts
├── models/
│   ├── note.model.ts
│   └── user.model.ts
├── routes/
│   ├── note.route.ts
│   └── user.route.ts
├── utils/
│   ├── mailSender.ts
│   └── sendotp.ts
├── db/
│   └── connect.ts
├── app.ts
├── server.ts
.env
```

## Development

- **Scripts**:
  - `npm start`: Start the Backend in development mode.
  - `npm run dev`: Start the Frontend in development mode.

- **Logging**: Morgan is used to log HTTP requests.
- **Error Handling**: Centralized error handling with proper HTTP status codes.

## Future Enhancements

- Add note update functionality.
- Add support for file attachments to notes.
- Improve user authentication with password support.

## License

This project is licensed under the MIT License.

---

**Contributions**: Feel free to fork this repository, create a feature branch, and submit pull requests. Suggestions and feedback are always welcome!
