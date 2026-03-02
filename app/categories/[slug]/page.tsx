// app/categories/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getProductsByCategoryId } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';

export const revalidate = 60;

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategoryId(category.id);
  const name = category.metadata?.name || category.title;
  const description = category.metadata?.description;
  const iconImage = category.metadata?.icon_image;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-stone-500 mb-8">
        <Link href="/" className="hover:text-amber-700 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-amber-700 transition-colors">Categories</Link>
        <span>/</span>
        <span className="text-stone-900 font-medium">{name}</span>
      </nav>

      {/* Category Header */}
      <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-2xl p-8 mb-10 border border-amber-200/50">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-amber-200 shadow-sm flex-shrink-0">
            {iconImage?.imgix_url ? (
              <img
                src={`${iconImage.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                alt={name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl">🏷️</span>
            )}
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-2">{name}</h1>
            {description && (
              <p className="text-stone-600 text-lg">{description}</p>
            )}
            <p className="text-amber-700 font-medium mt-2">{products.length} product{products.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      {/* Products */}
      {products.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-6xl mb-4 block">📦</span>
          <h2 className="text-xl font-semibold text-stone-700 mb-2">No products in this category</h2>
          <p className="text-stone-500">Check back soon for new additions.</p>
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