# Product Management App

A Vue 3 application for managing products with authentication, built with Vue Router, Pinia, and Tailwind CSS.

## Features

- **User Authentication**: Login with token-based authentication
- **Product Listing**: View all products with search and filter capabilities
- **Product Details**: View detailed information about each product
- **Add Products**: Create new products
- **Delete Products**: Remove products from the list
- **State Management**: Centralized state management with Pinia
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## Tech Stack

- **Vue 3** (Composition API)
- **Vue Router** for navigation
- **Pinia** for state management
- **Tailwind CSS** for styling
- **Axios** for HTTP requests
- **Vite** for build tooling
- **DummyJSON API** for backend

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd product-management-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── assets/          # CSS and static assets
├── components/      # Reusable Vue components
├── router/          # Vue Router configuration
├── stores/          # Pinia stores
│   ├── auth.js     # Authentication store
│   └── product.js  # Product store
├── views/           # Page components
│   ├── LoginView.vue
│   ├── ProductList.vue
│   ├── ProductView.vue
│   └── AddProduct.vue
├── App.vue          # Root component
└── main.js          # Application entry point
```

## Usage

### Login

Use any of the DummyJSON test credentials:
- Username: `emilys`
- Password: `emilyspass`

Other test users available at: https://dummyjson.com/users

### Features

1. **Product List Page** (`/products`)
   - Search products by title
   - Filter by category
   - View product details
   - Add new products

2. **Product Details Page** (`/products/:id`)
   - View full product information
   - Delete product
   - Navigate back to product list

3. **Add Product Page** (`/products/new`)
   - Form to create new products
   - Required fields: Title, Price
   - Optional fields: Description, Category, Stock, Thumbnail URL

## API Integration

This app uses the DummyJSON API:
- Auth: https://dummyjson.com/docs/auth
- Products: https://dummyjson.com/docs/products

## State Management

### Auth Store
- Manages user authentication state
- Stores token in localStorage for persistence
- Provides login/logout actions
- Guards routes based on authentication status

### Product Store
- Manages product data
- Handles CRUD operations
- Provides loading and error states
- Syncs with API endpoints

## Deployment

This app is configured for GitHub Pages deployment with the base URL set to `/product-management-app/`.

To deploy:
1. Build the project: `npm run build`
2. Deploy the `dist` folder to GitHub Pages

## Design Decisions

- **Composition API**: Used for better code organization and reusability
- **Pinia**: Chosen for its simplicity and Vue 3 integration
- **Tailwind CSS**: Utility-first approach for rapid UI development
- **Primary Color**: #000080 (Navy Blue) as specified
- **Route Guards**: Implemented to protect authenticated routes
- **LocalStorage**: Used for session persistence across page refreshes

## Assumptions

- The DummyJSON API is used for demonstration purposes
- Token authentication is simulated (API doesn't require real auth for most endpoints)
- Product images use the thumbnail URLs provided by the API
- Delete and update operations are simulated by the API but work correctly in the UI

## Future Enhancements

- Edit product functionality
- Pagination for large product lists
- Advanced filtering options
- Product image upload
- User profile management
- Toast notifications for actions
