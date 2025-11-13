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
    quantity: 3,
    totalQuantity: 3,
    availability: 'available',
  },
  {
    id: 'b2',
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 450,
    imageUrl: 'https://placehold.co/400x600/1E3A5F/FFFFFF?text=Book+Cover',
    condition: 'used',
    quantity: 2,
    totalQuantity: 2,
    availability: 'available',
  },
  {
    id: 'b3',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    price: 380,
    imageUrl: 'https://placehold.co/400x600/0B3D2E/FFFFFF?text=Book+Cover',
    condition: 'new',
    quantity: 4,
    totalQuantity: 4,
    availability: 'available',
  },
  {
    id: 'b4',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    price: 550,
    imageUrl: 'https://placehold.co/400x600/253B3D/FFFFFF?text=Book+Cover',
    condition: 'used',
    quantity: 1,
    totalQuantity: 1,
    availability: 'available',
  },
  {
    id: 'b5',
    title: 'Educated',
    author: 'Tara Westover',
    price: 400,
    imageUrl: 'https://placehold.co/400x600/4A3B2A/FFFFFF?text=Book+Cover',
    condition: 'new',
    quantity: 5,
    totalQuantity: 5,
    availability: 'unavailable',
  },
  {
    id: 'b6',
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    price: 360,
    imageUrl: 'https://placehold.co/400x600/1B4332/FFFFFF?text=Book+Cover',
    condition: 'used',
    quantity: 2,
    totalQuantity: 2,
    availability: 'available',
  },
  {
    id: 'b7',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    price: 300,
    imageUrl: 'https://placehold.co/400x600/2C3E50/FFFFFF?text=Book+Cover',
    condition: 'new',
    quantity: 3,
    totalQuantity: 3,
    availability: 'unavailable',
  },
  {
    id: 'b8',
    title: 'The Subtle Art of Not Giving a F*ck',
    author: 'Mark Manson',
    price: 420,
    imageUrl: 'https://placehold.co/400x600/264653/FFFFFF?text=Book+Cover',
    condition: 'used',
    quantity: 1,
    totalQuantity: 1,
    availability: 'available',
  },
];

function formatCurrencyEGP(amount) {
  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 0,
  }).format(amount);
}

function SearchBar({ searchQuery, onSearch, placeholder = "ابحث عن الكتب..." }) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        placeholder={placeholder}
        className="w-full pr-8 pl-3 py-1.5 text-xs sm:pr-10 sm:pl-4 sm:py-2 sm:text-sm border border-slate-300 rounded-full bg-white/90 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
      />
      {searchQuery && (
        <button
          onClick={() => onSearch('')}
          className="absolute inset-y-0 left-0 pl-3 flex items-center"
        >
          <svg className="h-4 w-4 text-slate-400 hover:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

function FloatingNav({ currentSection, onNavigate, searchQuery, onSearch }) {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  return (
    <>
      {/* Desktop/Tablet nav (previous look) */}
      <nav className="hidden sm:block fixed top-2 left-1/2 z-50 -translate-x-1/2 transform">
        <div className="flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md border border-amber-200/50 shadow-lg px-4 py-2">
          <button
            onClick={() => onNavigate('main')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              currentSection === 'main' 
                ? 'bg-amber-700 text-white' 
                : 'text-slate-700 hover:bg-amber-100'
            }`}
          >
            الرئيسية
          </button>
          <button
            onClick={() => onNavigate('books')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              currentSection === 'books' 
                ? 'bg-amber-700 text-white' 
                : 'text-slate-700 hover:bg-amber-100'
            }`}
          >
            الكتب
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              currentSection === 'contact' 
                ? 'bg-amber-700 text-white' 
                : 'text-slate-700 hover:bg-amber-100'
            }`}
          >
            اتصل بنا
          </button>
          <div className="w-64">
            <SearchBar 
              searchQuery={searchQuery} 
              onSearch={onSearch}
              placeholder="ابحث عن الكتب..."
            />
          </div>
        </div>
      </nav>

      {/* Mobile: only magnifier button at top-right */}
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        className="sm:hidden fixed top-2 left-2 z-50 rounded-full bg-white/90 backdrop-blur-md border border-amber-200/50 p-2 shadow"
        aria-label="Open navigation"
      >
        {/* Hamburger menu icon */}
        <svg className="h-5 w-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile side menu drawer */}
      <div className={`sm:hidden fixed inset-0 z-50 ${isMobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${isMobileOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileOpen(false)}
        />
        {/* Panel */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] transform bg-white shadow-xl transition-transform ${
            isMobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-200 p-4">
            <h3 className="text-sm font-semibold text-slate-900">القائمة</h3>
            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              className="rounded-md bg-slate-100 p-2 text-slate-700 hover:bg-slate-200"
              aria-label="إغلاق"
            >
              ✕
            </button>
          </div>
          <div className="p-4 space-y-4">
            <SearchBar searchQuery={searchQuery} onSearch={onSearch} placeholder="ابحث عن الكتب..." />
            <div className="flex flex-col gap-2">
              <button
                onClick={() => { onNavigate('main'); setIsMobileOpen(false); }}
                className={`w-full rounded-md px-3 py-2 text-right text-sm font-medium ${
                  currentSection === 'main' ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                الرئيسية
              </button>
              <button
                onClick={() => { onNavigate('books'); setIsMobileOpen(false); }}
                className={`w-full rounded-md px-3 py-2 text-right text-sm font-medium ${
                  currentSection === 'books' ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                الكتب
              </button>
              <button
                onClick={() => { onNavigate('contact'); setIsMobileOpen(false); }}
                className={`w-full rounded-md px-3 py-2 text-right text-sm font-medium ${
                  currentSection === 'contact' ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                اتصل بنا
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">اتصل بنا</h2>
          <p className="mt-4 text-lg text-slate-600">تواصل مع ديوان منصور للكتب</p>
        </div>
        
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-xl bg-amber-50 p-8">
            <h3 className="text-xl font-semibold text-amber-800 mb-4">📞 واتساب</h3>
            <p className="text-slate-700 mb-4">تواصل معنا مباشرة عبر واتساب للرد السريع والطلبات.</p>
            <a 
              href="https://wa.me/201201129135" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-white font-medium hover:bg-green-700 transition-colors"
            >
              <span>📱</span>
              محادثة على واتساب
            </a>
          </div>
          
          <div className="rounded-xl bg-slate-50 p-8">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">📧 البريد الإلكتروني</h3>
            <p className="text-slate-700 mb-4">أرسل لنا بريدًا إلكترونيًا للاستفسار عن توفر الكتب والطلبات.</p>
            <a 
              href="mailto:info@diwanmansour.com" 
              className="inline-flex items-center gap-2 rounded-lg bg-slate-700 px-6 py-3 text-white font-medium hover:bg-slate-800 transition-colors"
            >
              <span>✉️</span>
              إرسال بريد إلكتروني
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Header({ onToggleCart, cartItemsCount }) {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-amber-900/20 bg-amber-800 text-amber-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Desktop: Full logo + text */}
        <div className="hidden sm:flex items-center gap-3">
          <img src="./logo.png" alt="Diwan Mansour logo" className="h-10 w-10 rounded-md ring-1 ring-amber-600/40 object-contain bg-white" />
          <div>
            <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
              Diwan Mansour for Books
            </h1>
            <p className="text-xs text-amber-100/90 sm:text-sm">مكتبة إلكترونية لعرض وبيع الكتب</p>
          </div>
        </div>
        
        {/* Mobile: Centered logo only */}
        <div className="sm:hidden flex justify-center flex-1">
          <img src="./logo.png" alt="Diwan Mansour logo" className="h-12 w-12 rounded-md ring-1 ring-amber-600/40 object-contain bg-white" />
        </div>
        
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleCart}
            className="relative inline-flex items-center gap-2 rounded-md bg-amber-700 px-3 py-2 text-sm font-medium text-amber-50 shadow hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 lg:hidden"
            aria-label="فتح السلة"
          >
            <span>السلة</span>
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

function BookCard({ book, onAddToCart, onViewDetails }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-amber-900/10 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-stone-50 cursor-pointer" onClick={() => onViewDetails(book)}>
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
        {/* Status/Quantity tag */}
        <div className="absolute top-2 right-2">
          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
            book.availability === 'available' && (book.quantity || 1) > 0
              ? 'bg-blue-100 text-blue-800 ring-1 ring-blue-600/20' 
              : 'bg-red-100 text-red-800 ring-1 ring-red-600/20'
          }`}>
            {book.availability === 'available' && (book.quantity || 1) > 0 
              ? `${book.quantity || 1} متوفر` 
              : 'غير متوفر'}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3">
          <h3 className="line-clamp-2 text-base font-semibold text-slate-900 cursor-pointer hover:text-amber-700" onClick={() => onViewDetails(book)}>{book.title}</h3>
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
            أضف للسلة
          </button>
        </div>
      </div>
    </div>
  );
}

function BookDetail({ book, onAddToCart, onBack, cartItemsCount }) {
  if (!book) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Back button and cart indicator */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          <span>→</span>
          العودة للكتب
        </button>
        
        {/* Cart indicator */}
        {cartItemsCount > 0 && (
          <div className="flex items-center gap-2 rounded-lg bg-amber-100 px-3 py-2">
            <span className="text-sm font-medium text-amber-800">السلة:</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-700 text-xs font-bold text-white">
              {cartItemsCount}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Book Image */}
        <div className="space-y-4">
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-stone-50">
            <img
              src={book.imageUrl}
              alt={`${book.title} cover`}
              className="h-full w-full object-cover"
            />
            {/* Condition tag */}
            <div className="absolute top-4 left-4">
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                book.condition === 'new' 
                  ? 'bg-green-100 text-green-800 ring-1 ring-green-600/20' 
                  : 'bg-orange-100 text-orange-800 ring-1 ring-orange-600/20'
              }`}>
                {book.condition === 'new' ? 'جديد' : 'مستعمل'}
              </span>
            </div>
            {/* Status/Quantity tag */}
            <div className="absolute top-4 right-4">
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                book.availability === 'available' && (book.quantity || 1) > 0
                  ? 'bg-blue-100 text-blue-800 ring-1 ring-blue-600/20' 
                  : 'bg-red-100 text-red-800 ring-1 ring-red-600/20'
              }`}>
                {book.availability === 'available' && (book.quantity || 1) > 0 
                  ? `${book.quantity || 1} متوفر` 
                  : 'غير متوفر'}
              </span>
            </div>
          </div>
        </div>

        {/* Book Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{book.title}</h1>
            <p className="mt-2 text-xl text-slate-600">بواسطة {book.author}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-green-800">
                {formatCurrencyEGP(book.price)}
              </span>
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                book.condition === 'new' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {book.condition === 'new' ? 'كتاب جديد' : 'كتاب مستعمل'}
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-900">معلومات الكتاب</h3>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>العنوان:</span>
                  <span className="font-medium">{book.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>المؤلف:</span>
                  <span className="font-medium">{book.author}</span>
                </div>
                <div className="flex justify-between">
                  <span>الحالة:</span>
                  <span className="font-medium">{book.condition === 'new' ? 'جديد' : 'مستعمل'}</span>
                </div>
                <div className="flex justify-between">
                  <span>السعر:</span>
                  <span className="font-medium text-green-800">{formatCurrencyEGP(book.price)}</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onAddToCart(book)}
                className="w-full rounded-lg bg-amber-700 px-6 py-3 text-lg font-semibold text-white shadow hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                أضف للسلة
              </button>
            </div>

            <div className="rounded-lg bg-amber-50 p-4">
              <h4 className="font-semibold text-amber-800">📞 معلومات الاتصال</h4>
              <p className="mt-2 text-sm text-amber-700">
                للاستفسار عن هذا الكتاب أو لتقديم طلب، يرجى التواصل معنا عبر واتساب.
              </p>
            </div>
          </div>
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
      <span>الدفع عبر واتساب</span>
      <span>📲</span>
    </button>
  );
}

function CartList({ cartItems, onRemoveItem, onReduceQuantity, onIncreaseQuantity, totalPrice }) {
  return (
    <div className="flex h-full flex-col">
      {cartItems.length === 0 ? (
        <p className="text-sm text-slate-600">السلة فارغة.</p>
      ) : (
        <ul className="-mx-2 flex-1 space-y-3 overflow-y-auto px-2">
          {cartItems.map((item) => (
            <li key={item.bookId} className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">{item.title}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xs text-slate-600">الكمية:</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onReduceQuantity(item.bookId)}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-700 hover:bg-slate-200"
                    >
                      -
                    </button>
                    <span className="min-w-[20px] text-center text-xs font-medium text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onIncreaseQuantity(item.bookId)}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-700 hover:bg-slate-200"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.bookId)}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xs font-medium text-red-700 hover:bg-red-200"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-green-800">
                  {formatCurrencyEGP(item.price * item.quantity)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 border-t border-slate-200 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">المجموع</span>
          <span className="text-base font-semibold text-green-800">{formatCurrencyEGP(totalPrice)}</span>
        </div>
      </div>
    </div>
  );
}

function CartSidebarDesktop({ cartItems, onRemoveItem, onReduceQuantity, onIncreaseQuantity, totalPrice }) {
  const cartItemsCount = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);
  
  return (
    <aside className="hidden lg:sticky lg:top-[88px] lg:block lg:h-[calc(100vh-96px)] lg:w-80">
      <div className="flex h-full flex-col rounded-xl border border-amber-900/10 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900">سلة التسوق</h3>
          {cartItemsCount > 0 && (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {cartItemsCount}
            </span>
          )}
        </div>
        <CartList cartItems={cartItems} onRemoveItem={onRemoveItem} onReduceQuantity={onReduceQuantity} onIncreaseQuantity={onIncreaseQuantity} totalPrice={totalPrice} />
        <WhatsAppCheckoutButton cartItems={cartItems} totalPrice={totalPrice} />
      </div>
    </aside>
  );
}

function CartModalMobile({ isOpen, onClose, cartItems, onRemoveItem, onReduceQuantity, onIncreaseQuantity, totalPrice }) {
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
            <h3 className="text-base font-semibold text-slate-900">سلة التسوق</h3>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200"
            >
              إغلاق
            </button>
          </div>
          <div className="flex h-[calc(70vh-3rem)] flex-col">
            <CartList cartItems={cartItems} onRemoveItem={onRemoveItem} onReduceQuantity={onReduceQuantity} onIncreaseQuantity={onIncreaseQuantity} totalPrice={totalPrice} />
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
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentSection, setCurrentSection] = useState('main');
  const [searchQuery, setSearchQuery] = useState('');

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
              condition: d.condition || 'new',
              quantity: d.quantity || 1,
              totalQuantity: d.totalQuantity || d.quantity || 1,
              availability: d.availability || 'available',
              reservedAt: d.reservedAt || null
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
    // Check if book is available
    if (book.availability && book.availability !== 'available') {
      const statusMessages = {
        'reserved': 'هذا الكتاب محجوز حالياً من قبل عميل آخر',
        'sold': 'تم بيع هذا الكتاب',
        'unavailable': 'هذا الكتاب غير متاح حالياً'
      };
      alert(statusMessages[book.availability] || 'هذا الكتاب غير متاح');
      return;
    }
    
    // Use remaining stock for gating
    const remaining = Number(book.quantity) || 0;
    const currentCartQuantity = cartItems.find(ci => ci.bookId === book.id)?.quantity || 0;
    const maxAllowed = Number(book.totalQuantity) || null;

    // If we track a total cap, respect it; otherwise rely on remaining stock
    if (maxAllowed !== null && currentCartQuantity >= maxAllowed) {
      alert(`عذراً، لقد وصلت إلى الحد الأقصى من النسخ المتاحة (${maxAllowed}) لـ "${book.title}"`);
      return;
    }

    if (remaining <= 0) {
      alert(`عذراً، لا توجد نسخ متاحة لـ "${book.title}"`);
      return;
    }
    
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
    
    // Update book quantity (reduce available quantity)
    setBooks((prevBooks) => 
      prevBooks.map(b => 
        b.id === book.id 
          ? { ...b, quantity: Math.max(0, (b.quantity || 0) - 1) }
          : b
      )
    );
  }

  function removeFromCart(bookId) {
    // Find the cart item to get its quantity
    const cartItem = cartItems.find(ci => ci.bookId === bookId);
    const quantityToRestore = cartItem?.quantity || 0;
    
    // Remove from cart
    setCartItems((prev) => prev.filter((ci) => ci.bookId !== bookId));
    
    // Restore quantity to the book (add back the quantity that was in cart)
    if (quantityToRestore > 0) {
      setBooks((prevBooks) => 
        prevBooks.map(b => 
          b.id === bookId 
            ? { ...b, quantity: (b.quantity || 0) + quantityToRestore }
            : b
        )
      );
    }
  }

  function reduceCartQuantity(bookId) {
    const cartItem = cartItems.find(ci => ci.bookId === bookId);
    if (!cartItem) return;
    
    if (cartItem.quantity === 1) {
      // If only 1 item, remove completely
      removeFromCart(bookId);
    } else {
      // Reduce quantity by 1
      setCartItems((prev) => 
        prev.map(ci => 
          ci.bookId === bookId 
            ? { ...ci, quantity: ci.quantity - 1 }
            : ci
        )
      );
      
      // Restore 1 quantity to the book
      setBooks((prevBooks) => 
        prevBooks.map(b => 
          b.id === bookId 
            ? { ...b, quantity: (b.quantity || 0) + 1 }
            : b
        )
      );
    }
  }

  function increaseCartQuantity(bookId) {
    // find book in catalog
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    const available = book.quantity || 0;
    if (available <= 0) {
      alert('لا توجد مخزون متاح لهذا العنوان');
      return;
    }
    // increment in cart
    setCartItems(prev => prev.map(ci => ci.bookId === bookId ? { ...ci, quantity: ci.quantity + 1 } : ci));
    // decrement from stock
    setBooks(prev => prev.map(b => b.id === bookId ? { ...b, quantity: Math.max(0, (b.quantity || 0) - 1) } : b));
  }

  const totalPrice = useMemo(
    () => cartItems.reduce((sum, ci) => sum + ci.price * ci.quantity, 0),
    [cartItems]
  );

  const cartItemsCount = useMemo(
    () => cartItems.reduce((sum, ci) => sum + ci.quantity, 0),
    [cartItems]
  );

  const filteredBooks = useMemo(() => {
    // Filter books that have quantity > 0 (available books)
    const availableBooks = books.filter(book => 
      (book.quantity || 1) > 0 // Default to 1 if quantity doesn't exist
    );
    
    // Then apply search filter if there's a search query
    if (!searchQuery.trim()) return availableBooks;
    
    const query = searchQuery.toLowerCase().trim();
    return availableBooks.filter(book => 
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
    );
  }, [books, searchQuery]);

  const handleNavigate = (section) => {
    setCurrentSection(section);
    if (section === 'books') {
      setSelectedBook(null);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() && currentSection !== 'books') {
      setCurrentSection('books');
    }
  };

  // Auto-release reserved books after 24 hours
  useEffect(() => {
    const autoReleaseReservedBooks = () => {
      const twentyFourHoursAgo = Date.now() - (24 * 60 * 60 * 1000);
      
      setBooks(prevBooks => {
        return prevBooks.map(book => {
          if (book.availability === 'reserved' && book.reservedAt && book.reservedAt < twentyFourHoursAgo) {
            return { ...book, availability: 'available', reservedAt: null };
          }
          return book;
        });
      });
    };

    // Run auto-release check every 30 minutes
    const interval = setInterval(autoReleaseReservedBooks, 30 * 60 * 1000);
    
    // Run once on mount
    autoReleaseReservedBooks();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-amber-50 to-orange-50">
      <FloatingNav 
        currentSection={currentSection} 
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        onSearch={handleSearch}
      />
      <Header onToggleCart={() => setIsCartOpenOnMobile((v) => !v)} cartItemsCount={cartItemsCount} />

      {/* Show book detail page if a book is selected */}
      {selectedBook ? (
        <BookDetail 
          book={selectedBook} 
          onAddToCart={addToCart}
          onBack={() => setSelectedBook(null)}
          cartItemsCount={cartItemsCount}
        />
      ) : (
        <>
          {/* Main Section - Landing Page */}
          {currentSection === 'main' && (
            <>
              {/* Admin controls - only show on admin route */}
              {isAdminRoute && (
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={openAdmin}
                        className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
                      >
                        {isAdminOpen ? 'إغلاق لوحة التحكم' : 'فتح لوحة التحكم'}
                      </button>
                      {isAdminAuthed && (
                        <button
                          type="button"
                          onClick={handleAdminLogout}
                          className="inline-flex items-center gap-2 rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        >
                          تسجيل الخروج
                        </button>
                      )}
                    </div>
                  </div>

                  {isAdminOpen && isAdminAuthed && (
                    <AdminPanel books={books} setBooks={setBooks} />
                  )}

                  {/* Admin login prompt for admin route */}
                  {!isAdminAuthed && (
                    <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-center">
                      <h3 className="text-lg font-semibold text-amber-800">يتطلب الوصول كمسؤول</h3>
                      <p className="text-sm text-amber-700">يرجى تسجيل الدخول للوصول إلى لوحة التحكم.</p>
                      <button
                        type="button"
                        onClick={() => setIsAuthModalOpen(true)}
                        className="mt-2 rounded-md bg-amber-700 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
                      >
                        تسجيل الدخول
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Hero Section */}
              <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="text-center">
                    <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-amber-200/50">
                      <img 
                        src="./logo.png" 
                        alt="Diwan Mansour for Books" 
                        className="h-24 w-24 rounded-full object-contain"
                      />
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl">
                      Diwan Mansour
                    </h1>
                    <h2 className="mt-2 text-2xl font-semibold text-amber-700 sm:text-3xl">
                      for Books
                    </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
                      اكتشف عالماً من المعرفة مع مجموعتنا المختارة من الكتب الجديدة والمستعملة. 
                      من الكلاسيكيات إلى الأعمال المعاصرة، ابحث عن قراءتك القادمة.
                    </p>
                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                      <button
                        onClick={() => handleNavigate('books')}
                        className="rounded-lg bg-amber-700 px-8 py-3 text-lg font-semibold text-white shadow-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
                      >
                        تصفح جميع الكتب
                      </button>
                      <button
                        onClick={() => handleNavigate('contact')}
                        className="rounded-lg border-2 border-amber-700 px-8 py-3 text-lg font-semibold text-amber-700 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
                      >
                        اتصل بنا
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Featured Books Section */}
              <section className="py-16 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900">كتب مميزة</h2>
                    <p className="mt-4 text-lg text-slate-600">اختيارات مختارة بعناية من مجموعتنا</p>
                  </div>
                  
                  {isBooksReady ? (
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                      {books.slice(0, 6).map((book) => (
                        <BookCard 
                          key={book.id} 
                          book={book} 
                          onAddToCart={addToCart}
                          onViewDetails={setSelectedBook}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="py-10 text-center text-sm text-slate-500">جاري التحميل…</div>
                  )}
                  
                  <div className="mt-12 text-center">
                    <button
                      onClick={() => handleNavigate('books')}
                      className="rounded-lg bg-amber-700 px-8 py-3 text-lg font-semibold text-white shadow-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
                    >
                      عرض المجموعة الكاملة
                    </button>
                  </div>
                </div>
              </section>

              {/* Stats Section */}
              <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-amber-700">{books.length}+</div>
                      <div className="mt-2 text-lg text-slate-600">كتاب متاح</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-amber-700">جديد ومستعمل</div>
                      <div className="mt-2 text-lg text-slate-600">حالات الكتب</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-amber-700">24/7</div>
                      <div className="mt-2 text-lg text-slate-600">دعم واتساب</div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* Books Section */}
          {currentSection === 'books' && (
            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  {searchQuery ? `نتائج البحث عن "${searchQuery}"` : 'جميع الكتب'}
                </h2>
                <p className="text-slate-600">
                  {searchQuery 
                    ? `تم العثور على ${filteredBooks.length} ${filteredBooks.length === 1 ? 'كتاب' : 'كتاب'}`
                    : 'تصفح مجموعتنا الكاملة'
                  }
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* Books grid */}
                <section className="lg:col-span-9">
                  {isBooksReady ? (
                    <>
                      {filteredBooks.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                          {filteredBooks.map((book) => (
                            <BookCard 
                              key={book.id} 
                              book={book} 
                              onAddToCart={addToCart}
                              onViewDetails={setSelectedBook}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="py-16 text-center">
                          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                            <svg className="h-8 w-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-2">لم يتم العثور على كتب</h3>
                          <p className="text-slate-600 mb-4">
                            {searchQuery 
                              ? `لا توجد كتب تطابق "${searchQuery}". جرب مصطلح بحث آخر.`
                              : 'لا توجد كتب متاحة في الوقت الحالي.'
                            }
                          </p>
                          {searchQuery && (
                            <button
                              onClick={() => handleSearch('')}
                              className="rounded-lg bg-amber-700 px-4 py-2 text-white font-medium hover:bg-amber-600"
                            >
                              مسح البحث
                            </button>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="py-10 text-center text-sm text-slate-500">جاري التحميل…</div>
                  )}
                </section>

                {/* Desktop sidebar */}
                <div className="lg:col-span-3">
                  <CartSidebarDesktop
                    cartItems={cartItems}
                    onRemoveItem={removeFromCart}
                    onReduceQuantity={reduceCartQuantity}
                    onIncreaseQuantity={increaseCartQuantity}
                    totalPrice={totalPrice}
                  />
                </div>
              </div>
            </main>
          )}

          {/* Contact Section */}
          {currentSection === 'contact' && (
            <ContactSection />
          )}
        </>
      )}

      {/* Mobile modal */}
      <CartModalMobile
        isOpen={isCartOpenOnMobile}
        onClose={() => setIsCartOpenOnMobile(false)}
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        onReduceQuantity={reduceCartQuantity}
        onIncreaseQuantity={increaseCartQuantity}
        totalPrice={totalPrice}
      />

      <footer className="border-t border-amber-900/10 bg-white/60 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-slate-600 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} ديوان منصور للكتب. جميع الحقوق محفوظة.
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
  const [form, setForm] = useState({ title: '', author: '', price: '', condition: 'new', quantity: 1, availability: 'available', originalQuantity: 1 });
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
    console.log('Starting edit for book:', book);
    setEditingBook(book);
    setForm({
      title: book.title,
      author: book.author,
      price: book.price.toString(),
      condition: book.condition,
      quantity: book.totalQuantity || book.quantity || 1, // Use totalQuantity for editing
      availability: book.availability || 'available',
      originalQuantity: book.originalQuantity || book.quantity || 1
    });
    console.log('Form set to:', {
      title: book.title,
      author: book.author,
      price: book.price.toString(),
      condition: book.condition,
      quantity: book.totalQuantity || book.quantity || 1,
      availability: book.availability || 'available',
      originalQuantity: book.originalQuantity || book.quantity || 1
    });
    setCoverImageFile(null);
  }

  function cancelEdit() {
    setEditingBook(null);
    setForm({ title: '', author: '', price: '', condition: 'new', quantity: 1, availability: 'available', originalQuantity: 1 });
    setCoverImageFile(null);
  }

  async function handleAdd(e) {
    e.preventDefault();
    const title = form.title.trim();
    const author = form.author.trim();
    const priceNum = Number(form.price);
    const condition = form.condition || 'new';
    const quantity = Number(form.quantity);
    const availability = form.availability || 'available';
    
    // Debug logging
    console.log('Form data:', form);
    console.log('Parsed quantity:', quantity);
    console.log('Parsed availability:', availability);
    
    if (!title || !author || !Number.isFinite(priceNum) || priceNum <= 0) return;
    if (!Number.isFinite(quantity) || quantity <= 0) {
      alert('يرجى إدخال كمية صحيحة (يجب أن تكون أكبر من 0)');
      return;
    }
    if (!coverImageFile && !editingBook) {
      alert('يرجى اختيار صورة الغلاف');
      return;
    }
    
    // Check authentication state
    if (window.firebaseAuth) {
      const user = window.firebaseAuth.currentUser;
      console.log('Current user:', user);
      if (!user) {
        alert('يجب تسجيل الدخول لتعديل الكتب');
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
          throw new Error(result.error?.message || 'فشل الرفع');
        }
      } catch (err) {
        console.error('ImgBB upload failed', err);
        alert('فشل رفع الصورة. يرجى المحاولة مرة أخرى.');
        return;
      }
    }
    
    const id = editingBook ? editingBook.id : `b_${Date.now()}`;
    const newBook = { 
      id, 
      title, 
      author, 
      price: Math.round(priceNum), 
      imageUrl, 
      condition, 
      quantity: Math.round(quantity), // Available quantity (use exact value from form)
      totalQuantity: Math.round(quantity), // Total inventory (use exact value from form)
      availability,
      reservedAt: availability === 'reserved' ? Date.now() : null
    };
    
    console.log('Creating newBook:', newBook);
    console.log('Availability in newBook:', newBook.availability);
    
    try {
      if (window.firebaseDb) {
        console.log('Updating book in Firebase:', id, newBook);
        const bookData = {
          ...newBook,
          createdAt: editingBook?.createdAt || firebase.firestore.FieldValue.serverTimestamp()
        };
        await window.firebaseDb.collection('books').doc(id).set(bookData);
        console.log('Book updated successfully in Firebase');
        
        // Update local state after successful Firebase update
        if (editingBook) {
          setBooks((prev) => prev.map(b => b.id === id ? newBook : b));
        } else {
          setBooks((prev) => [newBook, ...prev]);
        }
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
      alert('فشل حفظ الكتاب: ' + err.message);
    }
    
    setForm({ title: '', author: '', price: '', condition: 'new', quantity: 1, availability: 'available', originalQuantity: 1 });
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
        {editingBook ? `تعديل الكتاب: ${editingBook.title}` : 'لوحة التحكم'}
      </h3>
      
      {/* Debug info */}
      <div className="mb-3 rounded-md bg-slate-100 p-2 text-xs">
        <p>قاعدة بيانات Firebase: {window.firebaseDb ? '✅ متصل' : '❌ غير متصل'}</p>
        <p>مصادقة Firebase: {window.firebaseAuth ? '✅ متاح' : '❌ غير متاح'}</p>
        <p>المستخدم الحالي: {window.firebaseAuth?.currentUser ? window.firebaseAuth.currentUser.email : 'غير مسجل دخول'}</p>
      </div>
      <form onSubmit={handleAdd} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="عنوان الكتاب"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="المؤلف"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="السعر (جنيه)"
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
          <option value="new">جديد</option>
          <option value="used">مستعمل</option>
        </select>
        <input
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="الكمية"
          type="number"
          min="1"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
        <select
          name="availability"
          value={form.availability}
          onChange={handleChange}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          <option value="available">متوفر</option>
          <option value="unavailable">غير متوفر</option>
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
              {editingBook ? 'تحديث الكتاب' : 'إضافة كتاب'}
            </button>
            {editingBook && (
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-md bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                إلغاء
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
                تعديل
              </button>
              <button
                type="button"
                onClick={() => handleRemove(b.id)}
                className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
              >
                حذف
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
        <h3 className="mb-3 text-base font-semibold text-slate-900">تسجيل دخول المسؤول</h3>
        <form onSubmit={submit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="البريد الإلكتروني"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="كلمة المرور"
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
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-amber-700 px-3 py-2 text-sm font-medium text-white hover:bg-amber-600 disabled:opacity-60"
            >
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
          </div>
        </form>
        <p className="mt-3 text-xs text-slate-500">استخدم مستخدم Firebase Auth بالبريد الإلكتروني/كلمة المرور. قم بالتكوين في Firebase Console.</p>
      </div>
    </div>
  );
}


