import Link from 'next/link';
import type { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const iconImage = category.metadata?.icon_image;
  const name = category.metadata?.name || category.title;
  const description = category.metadata?.description;

  return (
    <Link href={`/categories/${category.slug}`} className="block">
      <div className="bg-white rounded-xl overflow-hidden border border-stone-200 card-hover shadow-sm p-6 text-center group">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-amber-50 flex items-center justify-center overflow-hidden border-2 border-amber-100 group-hover:border-amber-300 transition-colors">
          {iconImage?.imgix_url ? (
            <img
              src={`${iconImage.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
              alt={name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-3xl">🏷️</span>
          )}
        </div>
        <h3 className="font-semibold text-stone-900 text-lg mb-2 group-hover:text-amber-700 transition-colors">
          {name}
        </h3>
        {description && (
          <p className="text-stone-500 text-sm line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}