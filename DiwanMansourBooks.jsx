import React, { useEffect, useMemo, useState } from 'react';

// Mock books data (at least 8 items)
const MOCK_BOOKS = [
  {
    id: 'b1',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    price: 320,
    imageUrl: 'https://placehold.co/400x600/14532D/FFFFFF?text=Book+Cover',
    condition: 'new',
  },
  {
    id: 'b2',
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 450,
    imageUrl: 'https://placehold.co/400x600/1E3A5F/FFFFFF?text=Book+Cover',
    condition: 'used',
  },
  {
    id: 'b3',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    price: 380,
    imageUrl: 'https://placehold.co/400x600/0B3D2E/FFFFFF?text=Book+Cover',
    condition: 'new',
  },
  {
    id: 'b4',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    price: 550,
    imageUrl: 'https://placehold.co/400x600/253B3D/FFFFFF?text=Book+Cover',
    condition: 'used',
  },
  {
    id: 'b5',
    title: 'Educated',
    author: 'Tara Westover',
    price: 400,
    imageUrl: 'https://placehold.co/400x600/4A3B2A/FFFFFF?text=Book+Cover',
    condition: 'new',
  },
  {
    id: 'b6',
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    price: 360,
    imageUrl: 'https://placehold.co/400x600/1B4332/FFFFFF?text=Book+Cover',
    condition: 'used',
  },
  {
    id: 'b7',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    price: 300,
    imageUrl: 'https://placehold.co/400x600/2C3E50/FFFFFF?text=Book+Cover',
    condition: 'new',
  },
  {
    id: 'b8',
    title: 'The Subtle Art of Not Giving a F*ck',
    author: 'Mark Manson',
    price: 420,
    imageUrl: 'https://placehold.co/400x600/264653/FFFFFF?text=Book+Cover',
    condition: 'used',
  },
];

function formatCurrencyEGP(amount) {
  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 0,
  }).format(amount);
}

function Header({ onToggleCart, cartItemsCount }) {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-amber-900/20 bg-amber-800 text-amber-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <img src="./logo.png" alt="Diwan Mansour logo" className="h-10 w-10 rounded-md ring-1 ring-amber-600/40 object-contain bg-white" />
          <div>
            <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
              Diwan Mansour for Books
            </h1>
            <p className="text-xs text-amber-100/90 sm:text-sm">مكتبة إلكترونية لعرض وبيع الكتب</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleCart}
            className="relative inline-flex items-center gap-2 rounded-md bg-amber-700 px-3 py-2 text-sm font-medium text-amber-50 shadow hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 lg:hidden"
            aria-label="Toggle cart"
          >
            <span>Cart</span>
            <span>🛒</span>
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

function BookCard({ book, onAddToCart }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-amber-900/10 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-stone-50">
        <img
          src={book.imageUrl}
          alt={`${book.title} cover`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
        {/* Condition tag */}
        <div className="absolute top-2 left-2">
          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
            book.condition === 'new' 
              ? 'bg-green-100 text-green-800 ring-1 ring-green-600/20' 
              : 'bg-orange-100 text-orange-800 ring-1 ring-orange-600/20'
          }`}>
            {book.condition === 'new' ? 'جديد' : 'مستعمل'}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3">
          <h3 className="line-clamp-2 text-base font-semibold text-slate-900">{book.title}</h3>
          <p className="mt-1 text-sm text-slate-600">{book.author}</p>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-sm font-semibold text-green-800">
            {formatCurrencyEGP(book.price)}
          </span>
          <button
            type="button"
            onClick={() => onAddToCart(book)}
            className="rounded-md bg-amber-700 px-3 py-2 text-xs font-medium text-white shadow hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
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
    const totalsum = `المجموع: ${totalPrice}`;
    const totalLine = `يرجي تأكيد التوفر وإرسال طريقة الدفع`;
    const message = [header, ...lines, totalsum, totalLine].join('\n');
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/201201129135?text=${encoded}`;
    window.open(url, '_blank');
  }

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={isDisabled}
      className={`mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold shadow transition focus:outline-none focus:ring-2 focus:ring-amber-400 ${
        isDisabled
          ? 'cursor-not-allowed bg-amber-200 text-amber-900/60'
          : 'bg-amber-700 text-white hover:bg-amber-600'
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
                <span className="text-sm font-semibold text-green-800">
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
          <span className="text-base font-semibold text-green-800">{formatCurrencyEGP(totalPrice)}</span>
        </div>
      </div>
    </div>
  );
}

function CartSidebarDesktop({ cartItems, onRemoveItem, totalPrice }) {
  const cartItemsCount = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);
  
  return (
    <aside className="hidden lg:sticky lg:top-[88px] lg:block lg:h-[calc(100vh-96px)] lg:w-80">
      <div className="flex h-full flex-col rounded-xl border border-amber-900/10 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900">Your Cart</h3>
          {cartItemsCount > 0 && (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {cartItemsCount}
            </span>
          )}
        </div>
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
  const [isAdminAuthed, setIsAdminAuthed] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [isBooksReady, setIsBooksReady] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  // Check for admin route and load admin auth
  useEffect(() => {
    // Check if URL contains #admin
    const isAdminRoute = window.location.hash === '#admin';
    setIsAdminRoute(isAdminRoute);
    
    try {
      const authed = localStorage.getItem('dm_admin_authed') === 'true';
      setIsAdminAuthed(authed);
    } catch (_) {}

    // Firestore realtime subscription (requires Firebase config in index.html)
    if (window.firebaseDb) {
      const unsubscribe = window.firebaseDb
        .collection('books')
        .orderBy('createdAt', 'desc')
        .onSnapshot((snap) => {
          const remote = [];
          snap.forEach((doc) => {
            const d = doc.data() || {};
            if (d.id && d.title) remote.push({ 
              id: d.id, 
              title: d.title, 
              author: d.author || '', 
              price: d.price || 0, 
              imageUrl: d.imageUrl || '',
              condition: d.condition || 'new'
            });
          });
          setBooks(remote);
          setIsBooksReady(true);
        }, (err) => {
          // fallback to mock if needed
          console.error('Firestore subscribe error', err);
          setBooks([]);
          setIsBooksReady(true);
        });
      return () => unsubscribe && unsubscribe();
    }
    // If Firebase not configured, fall back to MOCK_BOOKS immediately
    setBooks(MOCK_BOOKS);
    setIsBooksReady(true);
  }, []);

  function openAdmin() {
    if (isAdminAuthed) {
      setIsAdminOpen((v) => !v);
    } else {
      setIsAuthModalOpen(true);
    }
  }

  function handleAdminLogout() {
    setIsAdminAuthed(false);
    setIsAdminOpen(false);
    try { localStorage.setItem('dm_admin_authed', 'false'); } catch (_) {}
  }

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

  const cartItemsCount = useMemo(
    () => cartItems.reduce((sum, ci) => sum + ci.quantity, 0),
    [cartItems]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-amber-50 to-orange-50">
      <Header onToggleCart={() => setIsCartOpenOnMobile((v) => !v)} cartItemsCount={cartItemsCount} />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Admin controls - only show on admin route */}
        {isAdminRoute && (
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openAdmin}
                className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                {isAdminOpen ? 'Close Admin' : 'Open Admin'}
              </button>
              {isAdminAuthed && (
                <button
                  type="button"
                  onClick={handleAdminLogout}
                  className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}

        {isAdminRoute && isAdminOpen && isAdminAuthed && (
          <AdminPanel books={books} setBooks={setBooks} />
        )}

        {/* Admin login prompt for admin route */}
        {isAdminRoute && !isAdminAuthed && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-center">
            <h3 className="text-lg font-semibold text-amber-800">Admin Access Required</h3>
            <p className="text-sm text-amber-700">Please log in to access the admin panel.</p>
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="mt-2 rounded-md bg-amber-700 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
            >
              Login
            </button>
          </div>
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
            {isBooksReady ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                {books.map((book) => (
                  <BookCard key={book.id} book={book} onAddToCart={addToCart} />
                ))}
              </div>
            ) : (
              <div className="py-10 text-center text-sm text-slate-500">Loading…</div>
            )}
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

      <footer className="border-t border-amber-900/10 bg-white/60 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-slate-600 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Diwan Mansour for Books. All rights reserved.
        </div>
      </footer>

      <AdminAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => setIsAdminAuthed(true)}
      />
    </div>
  );
}

function AdminPanel({ books, setBooks }) {
  const [form, setForm] = useState({ title: '', author: '', price: '', condition: 'new' });
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [editingBook, setEditingBook] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleCoverImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setCoverImageFile(file);
    }
  }

  function startEdit(book) {
    setEditingBook(book);
    setForm({
      title: book.title,
      author: book.author,
      price: book.price.toString(),
      condition: book.condition
    });
    setCoverImageFile(null);
  }

  function cancelEdit() {
    setEditingBook(null);
    setForm({ title: '', author: '', price: '', condition: 'new' });
    setCoverImageFile(null);
  }

  async function handleAdd(e) {
    e.preventDefault();
    const title = form.title.trim();
    const author = form.author.trim();
    const priceNum = Number(form.price);
    const condition = form.condition || 'new';
    
    if (!title || !author || !Number.isFinite(priceNum) || priceNum <= 0) return;
    if (!coverImageFile && !editingBook) {
      alert('Please select a cover image');
      return;
    }
    
    // Check authentication state
    if (window.firebaseAuth) {
      const user = window.firebaseAuth.currentUser;
      console.log('Current user:', user);
      if (!user) {
        alert('You must be logged in to edit books');
        return;
      }
    }
    
    let imageUrl = editingBook ? editingBook.imageUrl : '';
    
    // Upload new image to ImgBB if a file was selected
    if (coverImageFile) {
      try {
        const formData = new FormData();
        formData.append('image', coverImageFile);
        formData.append('key', 'd42965b5ea3b2df2dc7e2002c177b1f1');
        
        const response = await fetch('https://api.imgbb.com/1/upload', {
          method: 'POST',
          body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
          imageUrl = result.data.url;
        } else {
          throw new Error(result.error?.message || 'Upload failed');
        }
      } catch (err) {
        console.error('ImgBB upload failed', err);
        alert('Failed to upload image. Please try again.');
        return;
      }
    }
    
    const id = editingBook ? editingBook.id : `b_${Date.now()}`;
    const newBook = { id, title, author, price: Math.round(priceNum), imageUrl, condition };
    
    try {
      if (window.firebaseDb) {
        console.log('Updating book in Firebase:', id, newBook);
        const bookData = {
          ...newBook,
          createdAt: editingBook?.createdAt || firebase.firestore.FieldValue.serverTimestamp()
        };
        await window.firebaseDb.collection('books').doc(id).set(bookData);
        console.log('Book updated successfully in Firebase');
      } else {
        console.log('Firebase not available, updating locally');
        if (editingBook) {
          setBooks((prev) => prev.map(b => b.id === id ? newBook : b));
        } else {
          setBooks((prev) => [newBook, ...prev]);
        }
      }
    } catch (err) {
      console.error('Add/Update book failed', err);
      alert('Failed to save book: ' + err.message);
    }
    
    setForm({ title: '', author: '', price: '', condition: 'new' });
    setCoverImageFile(null);
    setEditingBook(null);
  }

  async function handleRemove(id) {
    try {
      if (window.firebaseDb) {
        await window.firebaseDb.collection('books').doc(id).delete();
      }
    } catch (err) {
      console.error('Remove book failed', err);
    }
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }

  return (
    <section className="mb-6 rounded-xl border border-amber-900/10 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-base font-semibold text-slate-900">
        {editingBook ? `Edit Book: ${editingBook.title}` : 'Admin Panel'}
      </h3>
      
      {/* Debug info */}
      <div className="mb-3 rounded-md bg-slate-100 p-2 text-xs">
        <p>Firebase DB: {window.firebaseDb ? '✅ Connected' : '❌ Not connected'}</p>
        <p>Firebase Auth: {window.firebaseAuth ? '✅ Available' : '❌ Not available'}</p>
        <p>Current User: {window.firebaseAuth?.currentUser ? window.firebaseAuth.currentUser.email : 'Not logged in'}</p>
      </div>
      <form onSubmit={handleAdd} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price (EGP)"
          type="number"
          min="1"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
        <select
          name="condition"
          value={form.condition}
          onChange={handleChange}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          <option value="new">جديد (New)</option>
          <option value="used">مستعمل (Used)</option>
        </select>
        <div className="flex flex-col gap-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverImageChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 rounded-md bg-amber-700 px-3 py-2 text-sm font-medium text-white shadow hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              {editingBook ? 'Update Book' : 'Add Book'}
            </button>
            {editingBook && (
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((b) => (
          <div key={b.id} className={`flex items-center justify-between rounded-lg border p-3 ${
            editingBook && editingBook.id === b.id ? 'border-amber-500 bg-amber-50' : 'border-slate-200'
          }`}>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900">{b.title}</p>
              <p className="truncate text-xs text-slate-600">{b.author}</p>
              <p className="text-xs text-slate-500">{formatCurrencyEGP(b.price)} • {b.condition === 'new' ? 'جديد' : 'مستعمل'}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => startEdit(b)}
                className="rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleRemove(b.id)}
                className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AdminAuthModal({ isOpen, onClose, onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError('');
    try {
      setLoading(true);
      if (!window.firebaseAuth) {
        throw new Error('Firebase not initialized. Check index.html config.');
      }
      await window.firebaseAuth.signInWithEmailAndPassword(email.trim(), password);
      try { localStorage.setItem('dm_admin_authed', 'true'); } catch (_) {}
      onSuccess();
      setEmail('');
      setPassword('');
      onClose();
    } catch (err) {
      setError(err && err.message ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-xl border border-amber-900/10 bg-white p-5 shadow-xl">
        <h3 className="mb-3 text-base font-semibold text-slate-900">Admin Login</h3>
        <form onSubmit={submit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin email"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          {error ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{error}</div>
          ) : null}
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-amber-700 px-3 py-2 text-sm font-medium text-white hover:bg-amber-600 disabled:opacity-60"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        <p className="mt-3 text-xs text-slate-500">Use a Firebase Auth email/password user. Configure in Firebase Console.</p>
      </div>
    </div>
  );
}


