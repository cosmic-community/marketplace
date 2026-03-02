import Link from 'next/link';
import type { Review } from '@/types';
import StarRating from '@/components/StarRating';

interface ReviewCardProps {
  review: Review;
  showProduct?: boolean;
}

export default function ReviewCard({ review, showProduct = true }: ReviewCardProps) {
  const reviewerName = review.metadata?.reviewer_name || 'Anonymous';
  const rating = review.metadata?.rating;
  const reviewText = review.metadata?.review_text;
  const product = review.metadata?.product;

  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold text-stone-900">{reviewerName}</p>
          {showProduct && product && (
            <Link
              href={`/products/${product.slug}`}
              className="text-sm text-amber-700 hover:text-amber-800 transition-colors"
            >
              Re: {product.title}
            </Link>
          )}
        </div>
        {rating && (
          <div className="flex items-center gap-2">
            <StarRating rating={Number(rating)} size="sm" />
            <span className="text-sm font-medium text-stone-600">{Number(rating).toFixed(1)}</span>
          </div>
        )}
      </div>
      {reviewText && (
        <p className="text-stone-600 text-sm leading-relaxed">
          {reviewText}
        </p>
      )}
    </div>
  );
}