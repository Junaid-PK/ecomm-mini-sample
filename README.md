# E-Commerce Mini

Simple shopping cart system built with Laravel and React.

## Requirements

- PHP 8.2+
- Node.js 18+
- Composer

## Setup

```bash
# Install dependencies
composer install
npm install

# Environment
cp .env.example .env
php artisan key:generate

# Database
touch database/database.sqlite
php artisan migrate --seed

# Run
php artisan serve
npm run dev
```

## Test Accounts

| Email | Password | Role |
|-------|----------|------|
| admin@example.com | password | Admin |
| test@example.com | password | User |

## Queue (for email notifications)

```bash
php artisan queue:work
```

## Scheduled Jobs

Daily sales report runs at 6 PM. To test locally:

```bash
php artisan schedule:work
```

