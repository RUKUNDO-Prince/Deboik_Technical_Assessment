# Full-Stack Developer Internship – Technical Assessment Implementation
(Next.js | React | MongoDB | Full-Stack Development)  

## Introduction  

This project is a **Full-Stack Developer Technical Assessment** for a **Full-Stack Developer Internship** position. It is a **CRUD-based Employee Record Web App** built using **Next.js, React, MongoDB, and Tailwind CSS**.  

The assessment required implementing **CRUD operations, authentication using NextAuth.js**, and ensuring **error handling, validation, and server-side rendering (SSR) or static site generation (SSG)**.  

## Table of Contents  
- [Full-Stack Developer Internship – Technical Assessment Implementation](#full-stack-developer-internship--technical-assessment-implementation)
  - [Introduction](#introduction)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
  - [Running the Project](#running-the-project)
  - [Main Features](#main-features)
    - [Task 1: Build a Simple CRUD App (Next.js \& MongoDB)](#task-1-build-a-simple-crud-app-nextjs--mongodb)
    - [Task 2: Implement Authentication (NextAuth.js)](#task-2-implement-authentication-nextauthjs)
  - [Approach](#approach)
  - [Technologies Used](#technologies-used)
  - [API Routes](#api-routes)
  - [Authentication](#authentication)
  - [Validation \& Error Handling](#validation--error-handling)
  - [Deployment](#deployment)
  - [Troubleshooting](#troubleshooting)
    - [Common Issues](#common-issues)

---

## Installation  

### Prerequisites  
Ensure you have the following installed:  
- [Node.js](https://nodejs.org/)  
- [MongoDB](https://www.mongodb.com/) (Locally or MongoDB Atlas)  
- [Git](https://git-scm.com/)  

### Steps  

1. **Clone the repository**  

   ```bash
   git clone https://github.com/RUKUNDO-Prince/Deboik_Technical_Assessment.git
   cd Deboik_Technical_Assessment
   ```

2. **Install dependencies**  

   ```bash
   npm install
   ```

3. **Set up environment variables**  
   Create a `.env.local` file in the root directory and add the following:  

   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. **Run the development server**  

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`.  

---

## Running the Project  

- **Start the Next.js app**  
  ```bash
  npm run dev
  ```
- **Run in production mode**  
  ```bash
  npm run build && npm start
  ```

---

## Main Features  

### Task 1: Build a Simple CRUD App (Next.js & MongoDB)  

✅ **Create an Employee Record** (Firstname, LastName, Email, Phone, Role: Admin/Staff)  
✅ **Read** all records and display them in a list  
✅ **Update** the First Name, LastName, Phone  
✅ **Delete** a record  

**Requirements Met:**  
✔ Used **Next.js API routes** for CRUD operations  
✔ Stored records in **MongoDB** with **Mongoose schema**  
✔ Built the UI with **React & Tailwind CSS**  
✔ Implemented **Server-Side Rendering (SSR) & Static Site Generation (SSG)**  
✔ Added **error handling & form validation**  

### Task 2: Implement Authentication (NextAuth.js)  

✅ **Users can sign up, log in, and log out**  
✅ **Only logged-in users can manage records**  
✅ **Implemented JWT-based authentication using NextAuth.js**  

---

## Approach  

1. **Full-Stack with Next.js API Routes**  
   - Utilized Next.js API routes for backend functionality.  
   - Ensured proper routing, middleware, and authentication handling.  

2. **MongoDB with Mongoose**  
   - Created a structured Employee Schema with Mongoose.  
   - Used MongoDB Atlas for cloud database storage.  

3. **Server-Side Rendering (SSR) & Static Site Generation (SSG)**  
   - Used `getServerSideProps()` for dynamic content fetching.  
   - Optimized performance with `getStaticProps()` where applicable.  
   - Used react-query and tanstack for faster data fetching and retrieval

4. **Authentication with NextAuth.js**  
   - Implemented email/password authentication.  
   - Secured API routes by checking session authentication.  

5. **Clean UI with Tailwind CSS**  
   - Built a modern and responsive UI using Tailwind CSS.  
   - Ensured a clean user experience.  

---

## Technologies Used  

- **Frontend:** Next.js, React, Tailwind CSS  
- **Backend:** Next.js API Routes  
- **Database:** MongoDB  
- **Authentication:** NextAuth.js (JWT-based authentication)  
- **Deployment:** Vercel  

---

## API Routes  

| Route             | Method | Description                | Auth Required |
|------------------|--------|---------------------------|--------------|
| `/api/employees` | `GET`  | Get all employee records  | ✅ |
| `/api/employees` | `POST` | Add a new employee        | ✅ |
| `/api/employees/:id` | `PUT`  | Update an employee        | ✅ |
| `/api/employees/:id` | `DELETE` | Delete an employee        | ✅ |
| `/api/auth/register` | `POST` | Register a new user |  ✅ |
| `/api/auth/login` | `POST` | Login a user |  ✅ |
| `/api/auth/logout` | `POST` | Logout a user |  ✅ |

---

## Authentication  

- Implemented authentication with **NextAuth.js**.  
- Users must be logged in to manage employee records.  
- Protected routes using `getSession()` from NextAuth.  

---

## Validation & Error Handling  

- Used **Zod & Yup** for form validation.  
- Implemented error handling in API routes with `try/catch` blocks.  

---

## Deployment  

The project is deployed on **Vercel**.  
[🔗 View Live Project](https://deboik-technical-assessment.vercel.app/login) 

---

## Troubleshooting  

### Common Issues  
1. **MongoDB Connection Issues**  
   - Ensure **MONGODB_URI** in `.env.local` is correct.  
   - Restart the server after changing environment variables.  

2. **Authentication Not Working?**  
   - Make sure **JWT_SECRET** is set correctly.  
   - Check browser cookies and local storage.  

For additional help, open an issue on GitHub.  

---
