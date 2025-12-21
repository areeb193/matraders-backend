# Authentication System

This application uses JWT (JSON Web Token) based authentication with a 10-minute session timeout.

## Environment Variables

Add this to your `.env.local` file:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-ma-traders-2025
```

**Important:** Change the JWT_SECRET in production!

## Authentication Flow

### Admin Login
- **Email:** `admin@matraders.com`
- **Password:** `admin123`
- **Redirect:** `/backendadmin` (admin dashboard)
- **Features:** Full access to admin panel

### User Login
- Users are stored in MongoDB database
- **Redirect:** `/` (home page)
- **Features:** View profile, place orders with pre-filled info

### Session Management
- **Token Expiry:** 10 minutes (600 seconds)
- **Auto-Logout:** Client automatically logs out after 10 minutes
- **Storage:** JWT stored in secure HttpOnly cookie

## API Endpoints

### POST /api/auth/login
Login with email and password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "user"
  },
  "token": "jwt_token_here"
}
```

**Response (Error):**
```json
{
  "error": "Invalid credentials"
}
```

### GET /api/auth/profile
Get current user profile (requires authentication).

**Response (Success):**
```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "user"
  }
}
```

**Response (Error):**
```json
{
  "error": "Not authenticated"
}
```

### POST /api/auth/logout
Logout current user.

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

## Testing the Authentication System

### Test Credentials

1. **Admin Account:**
   - Email: `admin@matraders.com`
   - Password: `admin123`

2. **Test User Account:**
   Create a user in MongoDB:
   ```javascript
   db.users.insertOne({
     name: "Test User",
     email: "test@example.com",
     password: "test123",
     role: "user",
     createdAt: new Date()
   })
   ```

### Testing Steps

1. **Admin Login Test:**
   - Go to http://localhost:3000/login
   - Enter admin credentials
   - Should redirect to `/backendadmin`
   - Navbar should show "Admin" and logout button
   - Wait 10 minutes → should auto-logout

2. **User Login Test:**
   - Go to http://localhost:3000/login
   - Enter user credentials
   - Should redirect to `/` (home page)
   - Navbar should show user's name and logout button
   - Go to checkout → name and email should be pre-filled
   - Place an order → order should show user's name/email in admin panel

3. **Session Timeout Test:**
   - Login as any user
   - Wait 10 minutes
   - Should automatically logout and redirect to home
   - Try accessing protected routes → should get 401 error

4. **Logout Test:**
   - Login as any user
   - Click logout button in navbar
   - Should redirect to home
   - Navbar should show "Login" button again

## Security Features

1. **HttpOnly Cookies:** JWT stored in HttpOnly cookie to prevent XSS attacks
2. **Secure Flag:** Enabled in production for HTTPS only
3. **SameSite:** Set to 'lax' to prevent CSRF attacks
4. **Short Expiry:** 10-minute session timeout reduces security risks
5. **Password Storage:** Passwords stored as plain text (⚠️ TODO: Add bcrypt hashing in production)

## Client-Side Usage

### Using AuthContext

```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, login, logout, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (user) {
    return (
      <div>
        <p>Welcome, {user.name}!</p>
        <p>Role: {user.role}</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return <div>Not logged in</div>;
}
```

### Protected Routes

```tsx
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function AdminPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  if (isLoading) return <div>Loading...</div>;
  if (!user || user.role !== 'admin') return null;

  return <div>Admin Content</div>;
}
```

## TODO / Future Improvements

1. **Password Hashing:** Use bcrypt to hash passwords
2. **Refresh Tokens:** Implement refresh token for longer sessions
3. **Email Verification:** Add email verification on signup
4. **Password Reset:** Implement forgot password feature
5. **Rate Limiting:** Add rate limiting to prevent brute force attacks
6. **2FA:** Add two-factor authentication for admin accounts
7. **Session Management:** Track active sessions in database
8. **Password Policy:** Enforce strong password requirements

## Troubleshooting

### JWT Secret Not Found
- Make sure `.env.local` has `JWT_SECRET` defined
- Restart the development server after adding env variables

### Auto-Logout Not Working
- Check browser console for errors
- Verify `AuthContext` is properly wrapped around app
- Check if timer is being cleared properly

### Cookie Not Set
- Check if `JWT_SECRET` is configured
- Verify API endpoints are working (`/api/auth/login`)
- Check browser devtools → Application → Cookies

### Orders Not Showing User Info
- Make sure user is logged in when creating order
- Check if `useAuth()` hook is returning user data
- Verify order API is receiving user info in request
