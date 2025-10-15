import React, { useEffect, useMemo, useState } from 'react';

// Mock books data (at least 8 items)
const MOCK_BOOKS = [
  {
    id: 'b1',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    price: 320,
    imageUrl: 'https://placehold.co/400x600/14532D/FFFFFF?text=Book+Cover',
  },
  {
    id: 'b2',
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 450,
    imageUrl: 'https://placehold.co/400x600/1E3A5F/FFFFFF?text=Book+Cover',
  },
  {
    id: 'b3',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    price: 380,
    imageUrl: 'https://placehold.co/400x600/0B3D2E/FFFFFF?text=Book+Cover',
  },
  {
    id: 'b4',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    price: 550,
    imageUrl: 'https://placehold.co/400x600/253B3D/FFFFFF?text=Book+Cover',
  },
  {
    id: 'b5',
    title: 'Educated',
    author: 'Tara Westover',
    price: 400,
    imageUrl: 'https://placehold.co/400x600/4A3B2A/FFFFFF?text=Book+Cover',
  },
  {
    id: 'b6',
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    price: 360,
    imageUrl: 'https://placehold.co/400x600/1B4332/FFFFFF?text=Book+Cover',
  },
  {
    id: 'b7',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    price: 300,
    imageUrl: 'https://placehold.co/400x600/2C3E50/FFFFFF?text=Book+Cover',
  },
  {
    id: 'b8',
    title: 'The Subtle Art of Not Giving a F*ck',
    author: 'Mark Manson',
    price: 420,
    imageUrl: 'https://placehold.co/400x600/264653/FFFFFF?text=Book+Cover',
  },
];

function formatCurrencyEGP(amount) {
  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 0,
  }).format(amount);
}

function Header({ onToggleCart }) {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-emerald-900/20 bg-emerald-950 text-emerald-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-800/60 ring-1 ring-emerald-600/40">
            <span className="text-lg">📚</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
              Diwan Mansour for Books
            </h1>
            <p className="text-xs text-emerald-200/80 sm:text-sm">Private catalog • Curated selection</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleCart}
            className="inline-flex items-center gap-2 rounded-md bg-emerald-700 px-3 py-2 text-sm font-medium text-emerald-50 shadow hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 lg:hidden"
            aria-label="Toggle cart"
          >
            <span>Cart</span>
            <span>🛒</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function BookCard({ book, onAddToCart }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-emerald-900/10 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-emerald-50">
        <img
          src={book.imageUrl}
          alt={`${book.title} cover`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3">
          <h3 className="line-clamp-2 text-base font-semibold text-slate-900">{book.title}</h3>
          <p className="mt-1 text-sm text-slate-600">{book.author}</p>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-sm font-semibold text-emerald-800">
            {formatCurrencyEGP(book.price)}
          </span>
          <button
            type="button"
            onClick={() => onAddToCart(book)}
            className="rounded-md bg-emerald-700 px-3 py-2 text-xs font-medium text-white shadow hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

function WhatsAppCheckoutButton({ cartItems, totalPrice }) {
  const isDisabled = cartItems.length === 0;

  function handleCheckout() {
    if (isDisabled) return;
    const header = 'اريد طلب الكتب التالية:';
    const lines = cartItems.map((item) => `- ${item.title} (x${item.quantity})`);
    const totalLine = `المجموع: ${totalPrice}. يرجى التأكد من التوفر والدفع.`;
    const message = [header, ...lines, totalLine].join('\n');
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/201201129135?text=${encoded}`;
    window.open(url, '_blank');
  }

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={isDisabled}
      className={`mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold shadow transition focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
        isDisabled
          ? 'cursor-not-allowed bg-emerald-200 text-emerald-900/60'
          : 'bg-emerald-700 text-white hover:bg-emerald-600'
      }`}
    >
      <span>Checkout via WhatsApp</span>
      <span>📲</span>
    </button>
  );
}

function CartList({ cartItems, onRemoveItem, totalPrice }) {
  return (
    <div className="flex h-full flex-col">
      <h3 className="mb-3 text-base font-semibold text-slate-900">Your Cart</h3>
      {cartItems.length === 0 ? (
        <p className="text-sm text-slate-600">Your cart is empty.</p>
      ) : (
        <ul className="-mx-2 flex-1 space-y-3 overflow-y-auto px-2">
          {cartItems.map((item) => (
            <li key={item.bookId} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
              <div>
                <p className="text-sm font-medium text-slate-900">{item.title}</p>
                <p className="text-xs text-slate-600">Qty: {item.quantity}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-emerald-800">
                  {formatCurrencyEGP(item.price * item.quantity)}
                </span>
                <button
                  type="button"
                  onClick={() => onRemoveItem(item.bookId)}
                  className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 border-t border-slate-200 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">Total</span>
          <span className="text-base font-semibold text-emerald-800">{formatCurrencyEGP(totalPrice)}</span>
        </div>
      </div>
    </div>
  );
}

function CartSidebarDesktop({ cartItems, onRemoveItem, totalPrice }) {
  return (
    <aside className="hidden lg:sticky lg:top-[88px] lg:block lg:h-[calc(100vh-96px)] lg:w-80">
      <div className="flex h-full flex-col rounded-xl border border-emerald-900/10 bg-white p-4 shadow-sm">
        <CartList cartItems={cartItems} onRemoveItem={onRemoveItem} totalPrice={totalPrice} />
        <WhatsAppCheckoutButton cartItems={cartItems} totalPrice={totalPrice} />
      </div>
    </aside>
  );
}

function CartModalMobile({ isOpen, onClose, cartItems, onRemoveItem, totalPrice }) {
  return (
    <div
      className={`lg:hidden ${
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      } fixed inset-0 z-40 transition-opacity`}
    >
      <div
        className={`absolute inset-0 bg-black/40 ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity`}
        onClick={onClose}
      />
      <div
        className={`absolute bottom-0 left-0 right-0 z-50 transform rounded-t-2xl bg-white p-4 shadow-2xl transition-transform ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="mx-auto h-[70vh] max-w-2xl">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-base font-semibold text-slate-900">Your Cart</h3>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200"
            >
              Close
            </button>
          </div>
          <div className="flex h-[calc(70vh-3rem)] flex-col">
            <CartList cartItems={cartItems} onRemoveItem={onRemoveItem} totalPrice={totalPrice} />
            <WhatsAppCheckoutButton cartItems={cartItems} totalPrice={totalPrice} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [isCartOpenOnMobile, setIsCartOpenOnMobile] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [books, setBooks] = useState(MOCK_BOOKS);
  const [cartItems, setCartItems] = useState([]);

  // Persist books to localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('dm_books');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.every((b) => b && b.id && b.title)) {
          setBooks(parsed);
        }
      }
    } catch (_) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('dm_books', JSON.stringify(books));
    } catch (_) {
      // ignore
    }
  }, [books]);

  function addToCart(book) {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.bookId === book.id);
      if (existing) {
        return prev.map((ci) =>
          ci.bookId === book.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [
        ...prev,
        { bookId: book.id, title: book.title, price: book.price, quantity: 1 },
      ];
    });
  }

  function removeFromCart(bookId) {
    setCartItems((prev) => prev.filter((ci) => ci.bookId !== bookId));
  }

  const totalPrice = useMemo(
    () => cartItems.reduce((sum, ci) => sum + ci.price * ci.quantity, 0),
    [cartItems]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-emerald-50 to-emerald-100">
      <Header onToggleCart={() => setIsCartOpenOnMobile((v) => !v)} />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsAdminOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              {isAdminOpen ? 'Close Admin' : 'Open Admin'}
            </button>
          </div>
        </div>

        {isAdminOpen && (
          <AdminPanel books={books} setBooks={setBooks} />
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Books grid */}
          <section className="lg:col-span-9">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                  Featured Books
                </h2>
                <p className="text-sm text-slate-600">Browse our curated selection</p>
              </div>
              <div className="hidden text-sm text-slate-600 lg:block">
                {cartItems.length > 0 ? (
                  <span>
                    {cartItems.length} item{cartItems.length > 1 ? 's' : ''} in cart •{' '}
                    {formatCurrencyEGP(totalPrice)}
                  </span>
                ) : (
                  <span>Cart is empty</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
              {books.map((book) => (
                <BookCard key={book.id} book={book} onAddToCart={addToCart} />
              ))}
            </div>
          </section>

          {/* Desktop sidebar */}
          <div className="lg:col-span-3">
            <CartSidebarDesktop
              cartItems={cartItems}
              onRemoveItem={removeFromCart}
              totalPrice={totalPrice}
            />
          </div>
        </div>
      </main>

      {/* Mobile modal */}
      <CartModalMobile
        isOpen={isCartOpenOnMobile}
        onClose={() => setIsCartOpenOnMobile(false)}
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        totalPrice={totalPrice}
      />

      <footer className="border-t border-emerald-900/10 bg-white/60 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-slate-600 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Diwan Mansour for Books. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function AdminPanel({ books, setBooks }) {
  const [form, setForm] = useState({ title: '', author: '', price: '', imageUrl: '' });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleAdd(e) {
    e.preventDefault();
    const title = form.title.trim();
    const author = form.author.trim();
    const priceNum = Number(form.price);
    const imageUrl = form.imageUrl.trim() || 'https://placehold.co/400x600/38761D/FFFFFF?text=Book+Cover';
    if (!title || !author || !Number.isFinite(priceNum) || priceNum <= 0) return;
    const id = `b_${Date.now()}`;
    const newBook = { id, title, author, price: Math.round(priceNum), imageUrl };
    setBooks((prev) => [newBook, ...prev]);
    setForm({ title: '', author: '', price: '', imageUrl: '' });
  }

  function handleRemove(id) {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }

  return (
    <section className="mb-6 rounded-xl border border-emerald-900/10 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-base font-semibold text-slate-900">Admin Panel</h3>
      <form onSubmit={handleAdd} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price (EGP)"
          type="number"
          min="1"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="Image URL (optional)"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <button
          type="submit"
          className="rounded-md bg-emerald-700 px-3 py-2 text-sm font-medium text-white shadow hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          Add Book
        </button>
      </form>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((b) => (
          <div key={b.id} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900">{b.title}</p>
              <p className="truncate text-xs text-slate-600">{b.author}</p>
            </div>
            <button
              type="button"
              onClick={() => handleRemove(b.id)}
              className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}


