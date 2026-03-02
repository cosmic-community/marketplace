import Link from 'next/link';
import { getProducts, getCategories, getSellers, getReviews } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import SellerCard from '@/components/SellerCard';
import ReviewCard from '@/components/ReviewCard';

export const revalidate = 60;

export default async function HomePage() {
  const [products, categories, sellers, reviews] = await Promise.all([
    getProducts(),
    getCategories(),
    getSellers(),
    getReviews(),
  ]);

  const featuredProducts = products.slice(0, 4);
  const featuredSellers = sellers.slice(0, 3);
  const recentReviews = reviews.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-hero text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Discover Rare
              <span className="block text-amber-300">Collectibles</span>
            </h1>
            <p className="text-lg md:text-xl text-amber-100/90 mb-8 leading-relaxed max-w-2xl">
              Your premier destination for vintage treasures and unique collectibles.
              Browse curated collections from trusted sellers worldwide.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-400 text-amber-950 font-semibold rounded-lg transition-colors shadow-lg shadow-amber-900/30"
              >
                Browse Products
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors border border-white/20"
              >
                Explore Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-amber-700">{products.length}</p>
              <p className="text-stone-500 text-sm mt-1">Products</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-amber-700">{categories.length}</p>
              <p className="text-stone-500 text-sm mt-1">Categories</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-amber-700">{sellers.length}</p>
              <p className="text-stone-500 text-sm mt-1">Sellers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-amber-700">{reviews.length}</p>
              <p className="text-stone-500 text-sm mt-1">Reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-stone-900">Browse Categories</h2>
              <p className="text-stone-500 mt-1">Find collectibles by type</p>
            </div>
            <Link href="/categories" className="text-amber-700 hover:text-amber-800 font-medium text-sm flex items-center gap-1">
              View All
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="bg-stone-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-stone-900">Featured Products</h2>
                <p className="text-stone-500 mt-1">Latest additions to our marketplace</p>
              </div>
              <Link href="/products" className="text-amber-700 hover:text-amber-800 font-medium text-sm flex items-center gap-1">
                View All
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Sellers */}
      {featuredSellers.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-stone-900">Top Sellers</h2>
              <p className="text-stone-500 mt-1">Trusted sellers in our community</p>
            </div>
            <Link href="/sellers" className="text-amber-700 hover:text-amber-800 font-medium text-sm flex items-center gap-1">
              View All
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredSellers.map((seller) => (
              <SellerCard key={seller.id} seller={seller} />
            ))}
          </div>
        </section>
      )}

      {/* Recent Reviews */}
      {recentReviews.length > 0 && (
        <section className="bg-stone-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-stone-900">Recent Reviews</h2>
                <p className="text-stone-500 mt-1">What our collectors are saying</p>
              </div>
              <Link href="/reviews" className="text-amber-700 hover:text-amber-800 font-medium text-sm flex items-center gap-1">
                View All
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="gradient-hero text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Collection Today</h2>
          <p className="text-amber-100/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of collectors who have found their next treasure on our marketplace.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-4 bg-amber-500 hover:bg-amber-400 text-amber-950 font-semibold rounded-lg transition-colors text-lg shadow-lg"
          >
            Explore All Products
          </Link>
        </div>
      </section>
    </div>
  );
}