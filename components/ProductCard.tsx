import Link from 'next/link';
import type { Product } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';
import StarRating from '@/components/StarRating';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  const price = product.metadata?.price;
  const condition = getMetafieldValue(product.metadata?.condition);
  const year = product.metadata?.year;
  const sellerName = product.metadata?.seller?.metadata?.display_name || product.metadata?.seller?.title;
  const categoryName = product.metadata?.category?.metadata?.name || product.metadata?.category?.title;

  // Handle images - can be array or single object
  const images = product.metadata?.images;
  let imageUrl: string | undefined;
  if (Array.isArray(images) && images.length > 0) {
    imageUrl = images[0]?.imgix_url;
  } else if (images && !Array.isArray(images)) {
    imageUrl = (images as { imgix_url: string }).imgix_url;
  }

  return (
    <Link href={`/products/${product.slug}`} className={`block ${className}`}>
      <div className="bg-white rounded-xl overflow-hidden border border-stone-200 card-hover shadow-sm">
        <div className="aspect-square bg-stone-100 relative overflow-hidden">
          {imageUrl ? (
            <img
              src={`${imageUrl}?w=600&h=600&fit=crop&auto=format,compress`}
              alt={product.title}
              width={300}
              height={300}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          {condition && (
            <span className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {condition}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-stone-900 text-base mb-1 line-clamp-2">
            {product.title}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            {categoryName && (
              <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                {categoryName}
              </span>
            )}
            {year && (
              <span className="text-xs text-stone-500">
                {year}
              </span>
            )}
          </div>
          {sellerName && (
            <p className="text-xs text-stone-500 mb-2">
              by {sellerName}
            </p>
          )}
          {price && (
            <p className="text-lg font-bold text-amber-800">
              ${Number(price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}