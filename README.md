# Diwan Mansour for Books

A single-file React application styled with Tailwind CSS for a private book catalog with cart and WhatsApp checkout. Includes a minimal Admin panel (localStorage-backed) to add/remove books without a backend.

## Features
- Modern, responsive UI (Tailwind CSS)
- Book grid with title, author, price, Add to Cart
- Cart with quantity aggregation, remove item, total price
- WhatsApp checkout deep link (lists items + total)
- Admin panel: add/remove books; persists to `localStorage` (`dm_books`)

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
