import Link from 'next/link';
import type { Seller } from '@/types';
import StarRating from '@/components/StarRating';

interface SellerCardProps {
  seller: Seller;
}

export default function SellerCard({ seller }: SellerCardProps) {
  const displayName = seller.metadata?.display_name || seller.title;
  const bio = seller.metadata?.bio;
  const profilePhoto = seller.metadata?.profile_photo;
  const location = seller.metadata?.location;
  const rating = seller.metadata?.seller_rating;

  return (
    <Link href={`/sellers/${seller.slug}`} className="block">
      <div className="bg-white rounded-xl overflow-hidden border border-stone-200 card-hover shadow-sm p-6 group">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-amber-50 flex-shrink-0 overflow-hidden border-2 border-amber-100">
            {profilePhoto?.imgix_url ? (
              <img
                src={`${profilePhoto.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                alt={displayName}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl">
                👤
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-stone-900 text-lg group-hover:text-amber-700 transition-colors truncate">
              {displayName}
            </h3>
            {location && (
              <p className="text-stone-500 text-sm flex items-center gap-1 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location}
              </p>
            )}
            {rating && (
              <div className="flex items-center gap-2 mb-2">
                <StarRating rating={Number(rating)} size="sm" />
                <span className="text-xs text-stone-500">({Number(rating).toFixed(1)})</span>
              </div>
            )}
            {bio && (
              <p className="text-stone-500 text-sm line-clamp-2">
                {bio}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}