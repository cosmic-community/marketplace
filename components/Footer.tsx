import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-amber-950 text-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🏛️</span>
              <span className="text-xl font-bold text-white">Marketplace</span>
            </Link>
            <p className="text-amber-200/80 text-sm leading-relaxed">
              Your premier destination for rare and vintage collectibles. Discover unique treasures from trusted sellers worldwide.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Browse</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-amber-200/80 hover:text-white transition-colors text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-amber-200/80 hover:text-white transition-colors text-sm">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/sellers" className="text-amber-200/80 hover:text-white transition-colors text-sm">
                  Sellers
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-amber-200/80 hover:text-white transition-colors text-sm">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">About</h3>
            <p className="text-amber-200/80 text-sm leading-relaxed">
              Collectibles Marketplace connects passionate collectors with unique finds. Every item tells a story.
            </p>
          </div>
        </div>
        <div className="border-t border-amber-800 mt-8 pt-8 text-center text-amber-200/60 text-sm">
          © {currentYear} Collectibles Marketplace. All rights reserved.
        </div>
      </div>
    </footer>
  );
}