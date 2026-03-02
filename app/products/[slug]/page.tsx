// app/products/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, getReviewsByProductId, getMetafieldValue } from '@/lib/cosmic';
import StarRating from '@/components/StarRating';
import ReviewCard from '@/components/ReviewCard';

export const revalidate = 60;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const reviews = await getReviewsByProductId(product.id);

  const price = product.metadata?.price;
  const condition = getMetafieldValue(product.metadata?.condition);
  const year = product.metadata?.year;
  const description = product.metadata?.description;
  const seller = product.metadata?.seller;
  const category = product.metadata?.category;

  // Handle images
  const images = product.metadata?.images;
  const imageList: Array<{ url: string; imgix_url: string }> = [];
  if (Array.isArray(images)) {
    imageList.push(...images);
  } else if (images && typeof images === 'object' && 'imgix_url' in images) {
    imageList.push(images as { url: string; imgix_url: string });
  }

  // Calculate average rating
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + Number(r.metadata?.rating || 0), 0) / reviews.length
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-stone-500 mb-8">
        <Link href="/" className="hover:text-amber-700 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-amber-700 transition-colors">Products</Link>
        <span>/</span>
        <span className="text-stone-900 font-medium truncate">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          {imageList.length > 0 ? (
            <div className="space-y-4">
              <div className="aspect-square bg-stone-100 rounded-2xl overflow-hidden border border-stone-200">
                <img
                  src={`${imageList[0]?.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                  alt={product.title}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              {imageList.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {imageList.slice(1, 5).map((img, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-stone-100 rounded-lg overflow-hidden border border-stone-200"
                    >
                      <img
                        src={`${img.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                        alt={`${product.title} - Image ${index + 2}`}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="aspect-square bg-stone-100 rounded-2xl flex items-center justify-center border border-stone-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">{product.title}</h1>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            {condition && (
              <span className="bg-amber-100 text-amber-800 text-sm font-semibold px-3 py-1 rounded-full">
                {condition}
              </span>
            )}
            {year && (
              <span className="bg-stone-100 text-stone-700 text-sm font-medium px-3 py-1 rounded-full">
                Year: {year}
              </span>
            )}
            {category && (
              <Link
                href={`/categories/${category.slug}`}
                className="bg-amber-50 text-amber-700 text-sm font-medium px-3 py-1 rounded-full hover:bg-amber-100 transition-colors"
              >
                {category.metadata?.name || category.title}
              </Link>
            )}
          </div>

          {reviews.length > 0 && (
            <div className="flex items-center gap-3 mb-6">
              <StarRating rating={avgRating} size="md" />
              <span className="text-stone-600 text-sm">
                {avgRating.toFixed(1)} ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
              </span>
            </div>
          )}

          {price && (
            <p className="text-4xl font-bold text-amber-800 mb-6">
              ${Number(price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          )}

          {description && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-stone-900 mb-2">Description</h2>
              <p className="text-stone-600 leading-relaxed whitespace-pre-line">{description}</p>
            </div>
          )}

          {/* Seller Info */}
          {seller && (
            <div className="border-t border-stone-200 pt-6">
              <h2 className="text-lg font-semibold text-stone-900 mb-3">Seller</h2>
              <Link
                href={`/sellers/${seller.slug}`}
                className="flex items-center gap-4 p-4 bg-stone-50 rounded-xl hover:bg-stone-100 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-amber-50 overflow-hidden border border-amber-100 flex-shrink-0">
                  {seller.metadata?.profile_photo?.imgix_url ? (
                    <img
                      src={`${seller.metadata.profile_photo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                      alt={seller.metadata?.display_name || seller.title}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-lg">👤</div>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-stone-900 group-hover:text-amber-700 transition-colors">
                    {seller.metadata?.display_name || seller.title}
                  </p>
                  {seller.metadata?.location && (
                    <p className="text-stone-500 text-sm">{seller.metadata.location}</p>
                  )}
                  {seller.metadata?.seller_rating && (
                    <div className="flex items-center gap-1 mt-1">
                      <StarRating rating={Number(seller.metadata.seller_rating)} size="sm" />
                    </div>
                  )}
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-stone-900 mb-6">
            Reviews ({reviews.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} showProduct={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}