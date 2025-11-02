# Admin Authentication Setup

## Overview

The admin authentication system allows authorized users to access the admin dashboard and upload projects. The upload form is only visible to authenticated admins.

## Default Credentials

- **Email**: `admin@pksa.com`
- **Password**: `admin123`

⚠️ **IMPORTANT**: Change these credentials in production by setting environment variables.

## Environment Variables

Create a `.env.local` file in the project root and add:

```env
ADMIN_EMAIL=your_admin_email@example.com
ADMIN_PASSWORD=your_secure_password
```

## How to Use

1. **Access Login Page**: Navigate to `/admin/login` or click the "Admin Login" button on the projects page
2. **Login**: Enter your admin email and password
3. **Dashboard**: After login, you'll be redirected to `/admin/dashboard`
4. **Upload Projects**: Once logged in, the upload form will appear on the `/projects` page
5. **Logout**: Click the logout button in the dashboard

## Features

- ✅ Email-based authentication
- ✅ Secure session-based authentication
- ✅ Protected admin routes
- ✅ Admin-only upload form visibility
- ✅ Protected API endpoints
- ✅ Visible login prompt for non-authenticated users

## Security Notes

- The current implementation uses simple session cookies
- For production, consider:
  - Using JWT tokens
  - Implementing password hashing (bcrypt)
  - Adding rate limiting
  - Using HTTPS only cookies
  - Implementing CSRF protection

## File Structure

- `lib/auth.ts` - Authentication utilities
- `app/api/admin/login/route.ts` - Login API endpoint
- `app/api/admin/logout/route.ts` - Logout API endpoint
- `app/api/admin/session/route.ts` - Session check endpoint
- `app/admin/login/page.tsx` - Login page
- `app/admin/dashboard/page.tsx` - Admin dashboard

