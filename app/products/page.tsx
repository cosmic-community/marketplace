import { getProducts } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';

export const revalidate = 60;

export const metadata = {
  title: 'All Products — Collectibles Marketplace',
  description: 'Browse our complete collection of rare and vintage collectibles.',
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-2">All Products</h1>
        <p className="text-stone-500 text-lg">
          Discover {products.length} unique collectibles from our trusted sellers
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-6xl mb-4 block">📦</span>
          <h2 className="text-xl font-semibold text-stone-700 mb-2">No products yet</h2>
          <p className="text-stone-500">Check back soon for new additions to our marketplace.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}