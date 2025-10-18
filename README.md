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
- Toggle via the “Open Admin / Close Admin” button near the top of the page.
- Add: Title, Author, Price (EGP), optional Image URL (falls back to a placeholder).
- Remove: Click “Remove” next to a listed book.
- Persistence: Books are saved to `localStorage` under key `dm_books`.

## WhatsApp Checkout
- Button: “Checkout via WhatsApp” in cart modal/sidebar.
- It opens a `wa.me` link with a URL-encoded message listing items and total.
- Placeholder number: `201001234567` – replace with the real business number when ready.

## Notes
- Pricing is formatted as EGP without decimals.
- Images use placeholder URLs; replace with real covers anytime.

## License
Unlicensed / private. Update as needed.
