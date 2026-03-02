interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function StarRating({ rating, maxStars = 5, size = 'md' }: StarRatingProps) {
  const numericRating = typeof rating === 'string' ? parseFloat(rating) : rating;
  const safeRating = isNaN(numericRating) ? 0 : Math.max(0, Math.min(numericRating, maxStars));

  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className="flex items-center gap-0.5" aria-label={`${safeRating} out of ${maxStars} stars`}>
      {Array.from({ length: maxStars }, (_, i) => {
        const filled = i < Math.floor(safeRating);
        const halfFilled = !filled && i < safeRating;

        return (
          <svg
            key={i}
            className={`${sizeClasses[size]} ${
              filled
                ? 'text-amber-400'
                : halfFilled
                ? 'text-amber-300'
                : 'text-stone-200'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 15.585l-6.327 3.323 1.209-7.044L0 7.207l7.072-1.028L10 0l2.928 6.18L20 7.207l-4.882 4.657 1.209 7.044z"
              clipRule="evenodd"
            />
          </svg>
        );
      })}
    </div>
  );
}