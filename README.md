# React Product Catalogue App

## Overview

This is a scalable and responsive product catalogue application built using **React** and **Material UI**. The application allows users to browse a product catalog, add items to their cart, and proceed to checkout. It includes features like search, filtering, sorting, and user authentication.

## Features

- **Responsive Design**: The application is fully responsive and optimized for different screen sizes, ensuring a smooth user experience on both desktop and mobile devices.
- **Product Catalog Management**: Displays a list of products fetched from an API, with features like pagination, sorting by price, and filtering by category.
- **Search Functionality**: Users can search for products by name.
- **Cart Management**: Users can add products to their cart, adjust quantities, and remove items.
- **Checkout Process**: Upon checkout, the cart is cleared, and users are redirected to a confirmation page.
- **User Authentication**: The application supports user registration and login, ensuring that only authenticated users can access certain features.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Material UI**: A popular React UI framework for building responsive, attractive, and consistent user interfaces.
- **React Router**: For handling navigation and routing within the application.
- **json-server**: A simple tool to create a fake REST API for the application.
- **localStorage**: To persist user session data and cart items across page reloads.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Install from [here](https://nodejs.org/)
- **npm**: Installed automatically with Node.js
- **Git**: For version control

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/kmdurga67/twinleaves-assesment.git
   cd twinleaves-assesment
2. **Install the dependencies**
  
  ```bash
  npm install

3. **Run the fake server**

    ```bash
    npx json-server --watch db.json --port 5000

4. **Start the development server**

    ```bash
    npm start

5. **Application running on**

