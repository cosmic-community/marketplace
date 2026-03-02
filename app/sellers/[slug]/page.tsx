// app/sellers/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSellerBySlug, getProductsBySellerId } from '@/lib/cosmic';
import StarRating from '@/components/StarRating';
import ProductCard from '@/components/ProductCard';

export const revalidate = 60;

export default async function SellerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const seller = await getSellerBySlug(slug);

  if (!seller) {
    notFound();
  }

  const products = await getProductsBySellerId(seller.id);

  const displayName = seller.metadata?.display_name || seller.title;
  const bio = seller.metadata?.bio;
  const profilePhoto = seller.metadata?.profile_photo;
  const location = seller.metadata?.location;
  const rating = seller.metadata?.seller_rating;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-stone-500 mb-8">
        <Link href="/" className="hover:text-amber-700 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/sellers" className="hover:text-amber-700 transition-colors">Sellers</Link>
        <span>/</span>
        <span className="text-stone-900 font-medium">{displayName}</span>
      </nav>

      {/* Seller Profile */}
      <div className="bg-gradient-to-r from-amber-50 to-stone-50 rounded-2xl p-8 mb-10 border border-amber-200/50">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-white overflow-hidden border-2 border-amber-200 shadow-sm flex-shrink-0">
            {profilePhoto?.imgix_url ? (
              <img
                src={`${profilePhoto.imgix_url}?w=192&h=192&fit=crop&auto=format,compress`}
                alt={displayName}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl bg-amber-50">
                👤
              </div>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-2">{displayName}</h1>
            {location && (
              <p className="text-stone-500 flex items-center gap-1.5 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location}
              </p>
            )}
            {rating && (
              <div className="flex items-center gap-2 mb-3">
                <StarRating rating={Number(rating)} size="md" />
                <span className="text-stone-600 font-medium">{Number(rating).toFixed(1)} / 5</span>
              </div>
            )}
            {bio && (
              <p className="text-stone-600 leading-relaxed max-w-2xl">{bio}</p>
            )}
            <p className="text-amber-700 font-medium mt-3">
              {products.length} product{products.length !== 1 ? 's' : ''} listed
            </p>
          </div>
        </div>
      </div>

      {/* Seller Products */}
      <div>
        <h2 className="text-2xl font-bold text-stone-900 mb-6">
          Products by {displayName}
        </h2>
        {products.length === 0 ? (
          <div className="text-center py-16 bg-stone-50 rounded-xl">
            <span className="text-5xl mb-3 block">📦</span>
            <p className="text-stone-500">This seller hasn&apos;t listed any products yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}