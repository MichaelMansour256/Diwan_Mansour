# Diwan Mansour for Books

<div align="center">
  <img src="./logo.png" alt="Diwan Mansour Logo" width="100" height="100">
  <h3>مكتبة إلكترونية لعرض وبيع الكتب</h3>
  <p>Electronic Library for Book Display and Sales</p>
</div>

A modern, responsive single-file React application for a private book catalog with real-time admin management, cart functionality, and WhatsApp checkout integration.

## ✨ Main Features

### 📚 **Book Management**
- **New & Used Books** - Visual condition tags (جديد/مستعمل)
- **Image Upload** - Direct cover image upload via ImgBB API
- **Real-time Updates** - Firebase Firestore syncs changes instantly
- **Admin Panel** - Add, edit, and remove books with authentication

### 🛒 **Shopping Experience**
- **Smart Cart** - Add multiple quantities, remove items
- **Cart Counter** - Visual indicator showing number of items
- **Price Display** - EGP currency formatting
- **Responsive Design** - Works on mobile, tablet, and desktop

### 💬 **WhatsApp Integration**
- **One-Click Checkout** - Direct WhatsApp message with order details
- **Arabic Support** - Pre-filled messages in Arabic
- **Order Summary** - Lists all items, quantities, and total price

### 🔐 **Admin Features**
- **Secure Login** - Firebase Authentication with email/password
- **Live Editing** - Edit books without page refresh
- **Image Management** - Upload new covers or keep existing ones
- **Real-time Sync** - Changes appear for all users immediately

## File Structure
- `DiwanMansourBooks.jsx` – Entire app (components, state, styles via Tailwind classes)

## Quick Start (CDN demo)
Use this for a quick preview without a build step.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Diwan Mansour for Books</title>
    <!-- Tailwind CDN (play) -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {},
        },
      };
    </script>
  </head>
  <body class="min-h-screen">
    <div id="root"></div>

    <!-- React + ReactDOM via CDN -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <!-- Babel for in-browser JSX transform (dev only) -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <!-- App JSX -->
    <script type="text/babel" data-type="module" data-presets="env,react">
      // Paste the content of DiwanMansourBooks.jsx here and remove the export default
      // Then render the App:
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(<App />);
    </script>
  </body>
</html>
```

## Using in a React project
- Ensure Tailwind is configured in your project.
- Import and render the default export `App` from `DiwanMansourBooks.jsx`.

```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './DiwanMansourBooks.jsx';

createRoot(document.getElementById('root')).render(<App />);
```

## Admin Panel
- **Access**: Click "Open Admin" button (requires Firebase Authentication)
- **Login**: Email/password authentication via Firebase Auth
- **Add Books**: Title, Author, Price (EGP), Condition (New/Used), Cover Image Upload
- **Edit Books**: Click "Edit" button to modify existing books
- **Image Upload**: Direct file upload via ImgBB API (permanent URLs for all users)
- **Real-time Sync**: Changes appear instantly for all users via Firebase Firestore

## WhatsApp Checkout
- **Button**: "Checkout via WhatsApp" in cart modal/sidebar
- **Message**: Pre-filled Arabic message with order details
- **Format**: "اريد طلب الكتب التالية: [items] المجموع: [total] يرجي تأكيد التوفر وإرسال طريقة الدفع"
- **Phone**: `201201129135` (configured for your business)

## Cart Features
- **Visual Counter**: Red badge showing number of items in cart
- **Quantity Management**: Add multiple quantities, remove items
- **Real-time Updates**: Cart updates instantly across all components
- **Responsive Design**: Mobile modal + desktop sidebar

## Technical Notes
- **Pricing**: Formatted as EGP without decimals
- **Images**: Uploaded to ImgBB (permanent URLs, works for all users)
- **Data Storage**: Firebase Firestore (real-time sync)
- **Authentication**: Firebase Auth with email/password
- **Condition Tags**: Visual indicators for New (جديد) vs Used (مستعمل) books

## License
Unlicensed / private. Update as needed.
