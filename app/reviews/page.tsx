import { getReviews } from '@/lib/cosmic';
import ReviewCard from '@/components/ReviewCard';

export const revalidate = 60;

export const metadata = {
  title: 'Reviews — Collectibles Marketplace',
  description: 'Read authentic reviews from our collectibles community.',
};

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-2">Customer Reviews</h1>
        <p className="text-stone-500 text-lg">
          {reviews.length} review{reviews.length !== 1 ? 's' : ''} from our collector community
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-6xl mb-4 block">⭐</span>
          <h2 className="text-xl font-semibold text-stone-700 mb-2">No reviews yet</h2>
          <p className="text-stone-500">Be the first to leave a review on one of our products!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} showProduct={true} />
          ))}
        </div>
      )}
    </div>
  );
}