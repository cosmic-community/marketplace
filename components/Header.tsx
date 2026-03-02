import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🏛️</span>
            <span className="text-xl font-bold text-amber-900 group-hover:text-amber-700 transition-colors">
              Marketplace
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/products"
              className="text-stone-600 hover:text-amber-700 font-medium transition-colors"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="text-stone-600 hover:text-amber-700 font-medium transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/sellers"
              className="text-stone-600 hover:text-amber-700 font-medium transition-colors"
            >
              Sellers
            </Link>
            <Link
              href="/reviews"
              className="text-stone-600 hover:text-amber-700 font-medium transition-colors"
            >
              Reviews
            </Link>
          </nav>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

function MobileMenu() {
  return (
    <div className="md:hidden">
      <details className="relative">
        <summary className="list-none cursor-pointer p-2 text-stone-600 hover:text-amber-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </summary>
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-stone-200 py-2 z-50">
          <Link href="/products" className="block px-4 py-2 text-stone-600 hover:bg-amber-50 hover:text-amber-700">
            Products
          </Link>
          <Link href="/categories" className="block px-4 py-2 text-stone-600 hover:bg-amber-50 hover:text-amber-700">
            Categories
          </Link>
          <Link href="/sellers" className="block px-4 py-2 text-stone-600 hover:bg-amber-50 hover:text-amber-700">
            Sellers
          </Link>
          <Link href="/reviews" className="block px-4 py-2 text-stone-600 hover:bg-amber-50 hover:text-amber-700">
            Reviews
          </Link>
        </div>
      </details>
    </div>
  );
}