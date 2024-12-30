
# Bookstore MERN Project

This is a Bookstore application built with the MERN stack, allowing users to browse and purchase books online. This README explains how to set up and run the project for the user-side only.

![Bookstore](./frontend/src/assets/image.png)



## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Running the Application](#running-the-application)
6. [Usage](#usage)
7. [License](#license)

## Project Overview
The Bookstore MERN project provides an online platform for users to:
- Browse a variety of books.
- View book details (price, description, availability).
- Add books to the shopping cart.
- Complete the purchase process.

## Features
- **User Authentication**: Register and log in to your account.
- **Book Catalog**: View a list of books with detailed information.
- **Shopping Cart**: Add books to your cart and proceed to checkout.
- **Responsive Design**: Fully responsive user interface.

## Prerequisites
Before you begin, make sure you have the following installed on your local machine:
- **Node.js** (version 14 or higher)
- **npm** (or **yarn**)
- **MongoDB** (or MongoDB Atlas for a cloud-based database)

## Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Vijayan1606/Book-Store.git
   cd Book-Store
```

## Install Dependencies
The project consists of two parts: the frontend (React) and the backend (Node.js + Express)
1. **Backend Setup (Node.js + Express)**:
- Navigate to the backend directory:
```bash
cd backend
npm install
```
2.**Frontend Setup (React)**:
- Navigate to the frontend directory
```bash
cd frontend
npm create vite@latest my-project 
cd my-project
```
3.**Frontend Setup (Tailwand CSS)**:
- Install tailwindcss and its peer dependencies, then generate your tailwind.config.js and postcss.config.js files.
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

```
## Configure the Backend
- Set up environment variables:
- In the backend folder, create a .env file with the following contents
```
PORT = 1000
URI = mongodb+srv://muthuvijayan1606:Vijay@bookstore.3rsps.mongodb.net/bookecommerce
```
## Configure the Frontend
- Add the paths to all of your template files in your tailwind.config.js file.
```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
- Add the @tailwind directives for each of Tailwind’s layers to your ./src/index.css file.
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
## Running the Application
1.**Start the Backend Server**:
- Navigate to the backend folder:
```
cd backend
```
- Start the server:
```
nodemon app.js
```
This will start the backend server on http://localhost:1000.

2.**Start the Frontend Server**:
- Navigate to the frontend folder:
```
cd frontend
```
- Start the React development server:
```
npm run dev
```
This will launch the React app at http://localhost:5173

## Usage
**Browse Books:** The homepage will display a list of available books with titles, authors, prices, and images. You can scroll through and view books in different categories.

**View Book Details:** Click on any book title to open a detailed view, including the book's description, price, and availability. There is also an option to view user reviews and ratings if applicable.

**Add Books to Cart:** You can add books to your shopping cart by clicking the "Add to Cart" button. Your cart will keep track of all added items.

**Proceed to Checkout:** Once you're ready to make a purchase, you can proceed to checkout to enter your shipping details and complete the purchase.

## API Functionality

- I created own API for this project 
```
http://localhost:1000//api/v1/
```
- By using this api , I fetch the details from MONGODB 

