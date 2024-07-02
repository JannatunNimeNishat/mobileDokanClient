# Mobile Dokan

Welcome to Mobile Dokan, your go-to solution for managing smartphone inventory. This project is a comprehensive Smartphone Management Dashboard designed to facilitate efficient inventory management, sales tracking, and analysis. It incorporates authentication, CRUD operations, real-time UI updates, and advanced filtering capabilities for smartphones. Users can register, log in, and access the dashboard based on their roles: Super Admin, Branch Manager, or Seller.

## Table of Contents

- [Live URLs](#live-urls)
- [Features](#features)
- [Technology Used](#technology-used)
- [How to Run Locally](#how-to-run-locally)
- [Contributing](#contributing)
- [License](#license)

## Live URLs

- **Client Live Link:** [Mobile Dokan Client](https://mobile-dokan-clinet.vercel.app/)
- **Server Live Link:** [Mobile Dokan Server](https://mobile-dokan-server-fawn.vercel.app/)

## Features

- **Authentication:**
  - Users can register and log in securely using JWT (JSON Web Tokens).
  - Three user roles: Super Admin, Branch Manager, and Seller.
  - Super Admin has full access, Managers can add and modify products, while Sellers can only sell.
- **Smartphone Management:**
  - CRUD Operations: Add, delete, update, and view smartphones in the inventory.
  - Filtering System: Robust filtering options based on price, release date, brand, model, operating system, storage capacity, screen size, and additional parameters like camera quality and battery life.
  - Bulk Delete: Efficiently manage inventory by deleting multiple smartphones simultaneously.
  - Duplicate & Edit: Create variants of existing products with pre-filled data that users can modify.
  - Search products with ease.
- **Sales Management:**
  - Sell Functionality: Users can search for products to sell, enter quantity, buyer's name, and sale date.
  - Invoice Generation: Upon completing a sale, users can download an invoice in PDF format containing product details and buyer information.
  - Stock Management: Products are automatically removed from inventory when the quantity reaches zero.
- **Sales History**
  - View sales history categorized by weekly, daily, monthly, and yearly periods.

## Technology Used

### Frontend

- **React (Vite):** Efficient and fast JavaScript library for building user interfaces.
- **Redux (RTK Query, Redux Toolkit):** State management for scalable applications.
- **JWT for authentication**
- **react-pdf libraries for PDF generation**

### Backend

- **Programming Language: TypeScript**
- **Web Framework: Express.js:** Fast, unopinionated, minimalist web framework for Node.js.
- **Object Data Modeling (ODM):** Mongoose for MongoDB.
- **Validation:** Zod for data validation.
- **Security:** JSON Web Tokens, Bcrypt for authentication and data security.
- **Middleware:** CORS, Dotenv for environment variable management.
- **Linting:** ESLint for code quality.
- **Code Formatting:** Prettier for consistent code styling.

## How to Run Locally

### Client

1. Clone the repository: `git clone <client-repo-url>`
2. Navigate to the client directory: `cd mobile-dokan-client`
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`

### Server

1. Clone the repository: `git clone <server-repo-url>`
2. Navigate to the server directory: `cd mobile-dokan-server`
3. Install dependencies: `npm install`
4. Set up environment variables (refer to `.env.example` for required variables).
5. Run the server: `npm run start`

Now you can access the client application at `http://localhost:3000` and the server at `http://localhost:5000`.


