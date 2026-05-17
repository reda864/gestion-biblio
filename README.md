# Biblio-App - Library Management System

A full-stack library management system built with React and Laravel. This application enables students, teachers, and librarians to manage book reservations, borrowings, and library operations efficiently.

## 📋 Project Overview

Biblio-App is a comprehensive library management solution designed for educational institutions. It provides features for:

- **Student Management** - Register and manage student accounts
- **Book Inventory** - Catalog and track library books (ouvrages)
- **Reservations** - Reserve books in advance
- **Borrowing System** - Track book borrowing and returns
- **Penalty Management** - Automated penalty calculation for overdue books
- **Admin Dashboard** - Central management for librarians and administrators
- **User Roles** - Differentiated access for Students, Teachers, Librarians, and Admins

## 🏗️ Architecture

This is a **monorepo** containing:

- **Frontend** (`biblio-app/`) - React single-page application
- **Backend** (`laravelbackend/`) - Laravel REST API server

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Biblio-App Monorepo                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────┐      ┌──────────────────────┐   │
│  │   React Frontend     │      │   Laravel Backend    │   │
│  │   (biblio-app/)      │◄────►│ (laravelbackend/)    │   │
│  │                      │      │                      │   │
│  │ - Pages             │      │ - REST APIs         │   │
│  │ - Components        │      │ - Database Models   │   │
│  │ - Routing           │      │ - Business Logic    │   │
│  │ - Context API       │      │ - Authentication    │   │
│  └──────────────────────┘      └──────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router v7** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Styled Components** - CSS-in-JS styling
- **Axios** - HTTP client
- **Framer Motion** - Animation library
- **React Testing Library** - Testing framework

### Backend
- **Laravel 8** - PHP web framework
- **Laravel Sanctum** - API authentication
- **Laravel CORS** - Cross-origin resource sharing
- **MySQL/SQLite** - Database
- **Guzzle HTTP** - HTTP client

## 📦 Project Structure

```
pstage/
├── biblio-app/                 # React Frontend
│   ├── public/                 # Static files
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API services
│   │   ├── context/            # React Context for state
│   │   ├── routes/             # Router configuration
│   │   └── assets/             # Images, icons, etc.
│   ├── tailwind.config.js      # Tailwind configuration
│   └── package.json
│
├── laravelbackend/             # Laravel API Backend
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/    # API controllers
│   │   ├── Models/             # Database models
│   │   └── Exceptions/         # Custom exceptions
│   ├── routes/
│   │   ├── api.php             # API routes
│   │   └── web.php             # Web routes
│   ├── database/
│   │   ├── migrations/         # Schema migrations
│   │   └── seeders/            # Database seeders
│   ├── config/                 # Configuration files
│   ├── storage/                # Logs, cache, files
│   ├── tests/                  # Test suites
│   └── composer.json
│
└── package.json                # Root workspace config
```

## 🚀 Getting Started

### Prerequisites

#### Frontend
- Node.js >= 16.x
- npm >= 8.x or yarn

#### Backend
- PHP >= 7.3
- Composer
- MySQL >= 5.7 or SQLite

### Installation

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd pstage
```

#### 2. Setup Backend (Laravel)

```bash
cd laravelbackend

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Create database and run migrations
php artisan migrate

# (Optional) Seed sample data
php artisan db:seed

# Start the development server
php artisan serve
```

The backend will be available at `http://localhost:8000`

#### 3. Setup Frontend (React)

```bash
cd ../biblio-app

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will be available at `http://localhost:3000`

## 🔧 Configuration

### Backend Configuration (laravelbackend/.env)

```env
APP_NAME=Biblio-App
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=biblio_app
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:3000
```

### Frontend Configuration (biblio-app/src/services/api.js)

Ensure the API base URL points to your Laravel backend:
```javascript
const API_BASE_URL = 'http://localhost:8000/api';
```

## 📱 Available Pages & Features

- **Home Page** - Dashboard and overview
- **Authentication** - Login page for different user types
- **Admin Dashboard** - Administrative overview
- **Gestion Étudiants** - Student management
- **Gestion Enseignants** - Teacher management
- **Gestion Bibliothécaires** - Librarian management
- **Gestion Ouvrages** - Book inventory management
- **Reservation Page** - Book reservation system
- **Navbar** - Navigation component with user menu

## 🔐 User Roles

- **Student** - Can view books, make reservations, view borrowing history
- **Teacher** - Can view books and manage personal borrowings
- **Librarian** - Can manage inventory, process borrowings/returns
- **Admin** - Full system access, user management, system configuration

## 📚 Database Models

- **User** - System users with different roles
- **Student** - Student profiles
- **Book** - Library book inventory
- **Borrowing** - Track book borrowing records
- **Reservation** - Book reservations
- **Notification** - User notifications
- **Penalty** - Overdue penalties

## 🧪 Testing

### Frontend
```bash
cd biblio-app
npm test
```

### Backend
```bash
cd laravelbackend
php artisan test
```

## 🚀 Deployment

### Frontend Deployment (Vercel, Netlify, etc.)
```bash
cd biblio-app
npm run build
# Deploy the 'build' directory
```

### Backend Deployment (Heroku, AWS, etc.)
```bash
cd laravelbackend
# Configure your hosting provider
# Run migrations on production server
php artisan migrate --force
```

## 📝 API Documentation

API endpoints follow RESTful conventions. Base URL: `http://localhost:8000/api`

### Authentication
- POST `/auth/login` - User login
- POST `/auth/logout` - User logout
- GET `/auth/user` - Get current user

### Books
- GET `/books` - List all books
- POST `/books` - Create new book (admin)
- GET `/books/{id}` - Get book details
- PUT `/books/{id}` - Update book
- DELETE `/books/{id}` - Delete book

### Reservations
- GET `/reservations` - List user reservations
- POST `/reservations` - Create reservation
- DELETE `/reservations/{id}` - Cancel reservation

### Borrowing
- GET `/borrowings` - List borrowing records
- POST `/borrowings` - Create borrowing record
- PUT `/borrowings/{id}/return` - Return borrowed book

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Commit your changes: `git commit -m 'Add some feature'`
3. Push to the branch: `git push origin feature/your-feature-name`
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

Developed as a full-stack project combining React frontend and Laravel backend expertise.

## 📞 Support

For issues and questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include error messages and steps to reproduce

## 🔄 Workflow

### Development
```bash
# Terminal 1 - Backend
cd laravelbackend
php artisan serve

# Terminal 2 - Frontend
cd biblio-app
npm start
```

### Building for Production
```bash
# Backend
cd laravelbackend
# Follow your hosting provider's build process

# Frontend
cd biblio-app
npm run build
```

---

**Happy coding!** 🎉

For more information, please refer to:
- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
