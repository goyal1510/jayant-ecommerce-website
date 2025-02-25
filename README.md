# Jayant Ecommerce Website

## Overview
Jayant E-Commerce Website is a full-stack MERN (MongoDB, Express.js, React, Node.js) application that provides a seamless online shopping experience. The project includes user authentication, cart functionality, and an intuitive user interface.

## Features
- **User Authentication** (Sign Up, Login, Logout, JWT Authentication)
- **Shopping Cart System** (Add, Remove, Update Quantities, Checkout)
- **Responsive Design** (Optimized for all devices)

## Future Features
- **Payment Integration** (Implement secure payment gateways like Stripe or Razorpay)
- **Order Processing System** (Manage and track user orders)
- **Admin Dashboard** (Manage products, users, and orders)
- **Product Management** (Allow admin to add, update, and delete products)
- **Wishlist Feature** (Users can save items for later purchases)
- **User Reviews and Ratings** (Allow users to review and rate products)
- **Enhanced UI/UX** (Improve user experience with better animations and interactivity)

## Tech Stack
### Frontend:
- React.js
- Redux Toolkit (for state management)
- Tailwind CSS (for styling)
- React Router (for navigation)

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JWT (JSON Web Token) Authentication

## Installation
### Prerequisites
Make sure you have **Node.js**, **MongoDB**, and **npm** installed.

### Steps to Run the Project
#### 1. Clone the Repository
```bash
git clone https://github.com/goyal1510/jayant-ecommerce-website.git
cd jayant-ecommerce-website
```

#### 2. Install Dependencies
##### Backend
```bash
cd backend
npm install
```
##### Frontend
```bash
cd frontend
npm install
```

#### 3. Configure Environment Variables
Create a `.env` file in the `backend` directory and add the following:
```
DB_URL = "mongodb+srv://admin:jpncqTcjg4CeSQA5@jayant-ecommerce.pldzn.mongodb.net/jayant?retryWrites=true&w=majority&appName=jayant-ecommerce"
PORT = 5000
JWT_SECRET = "himynameisjayant"
FRONTEND_URL = "http://localhost:5173"
```

#### 4. Run the Application
##### Start the Backend Server
```bash
cd backend
npm run start:dev
```
##### Start the Frontend Server
```bash
cd frontend
npm start
```


## Screenshots
![Home Page](./Screenshots/Homepage.png)

## Deployment
🔗 Live Demo: [Jayant E-Commerce](https://jayant-ecommerce-website.vercel.app/)

## Contribution
Feel free to fork this repository and contribute to the project. Open an issue or submit a pull request with improvements.

## Contact
For any queries or suggestions, reach out at **goyal151002@gmail.com**

---
