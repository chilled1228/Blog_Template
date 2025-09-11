# Firebase Admin Setup Guide

## Overview
Your blog now has a complete Firebase-based admin system with:
- Google Sign-In authentication
- Email/password authentication  
- Admin user management via Firestore
- Secure admin dashboard
- Admin creation and removal via dashboard

## Setup Instructions

### 1. Firebase Configuration
Make sure your `.env.local` file has these Firebase variables:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 2. Enable Google Sign-In in Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Authentication → Sign-in method
4. Enable Google provider
5. Add your domain to authorized domains (including localhost)

### 3. Admin Access
Your email `bipul281b@gmail.com` has been set up as the first admin.

## How to Use

### Admin Login
1. Go to `http://localhost:3001/admin`
2. Sign in with:
   - **Google Sign-In**: Click "Sign in with Google"
   - **Email/Password**: Use your email and password

### Managing Admin Users
1. Log in as admin
2. Go to the "Users" tab in the dashboard
3. **Add Admin**: Click "Add Admin" and enter the email address
4. **Remove Admin**: Click the trash icon next to an admin (cannot remove yourself)

### Security Features
- Only users in the `admin_users` Firestore collection can access the admin panel
- Admin users are managed via Firestore database
- API routes are protected with admin authentication
- Users cannot remove their own admin access
- System prevents removing the last admin user

## Admin User Structure
Admin users are stored in Firestore with this structure:
```javascript
{
  email: "user@example.com",
  addedBy: "admin@example.com", 
  addedAt: "timestamp",
  role: "admin"
}
```

## API Endpoints
- `GET /api/admin/users` - List all admin users
- `POST /api/admin/users` - Add new admin user  
- `DELETE /api/admin/users?email=user@example.com` - Remove admin user

## Troubleshooting

### Google Sign-In Issues
- Make sure Google provider is enabled in Firebase Console
- Add your domain to authorized domains
- Check browser console for errors

### Admin Access Issues
- Verify user email is in `admin_users` collection
- Check Firestore security rules
- Ensure Firebase configuration is correct

### API Issues
- Check that admin user exists in Firestore
- Verify authentication headers are correct
- Check browser console for errors