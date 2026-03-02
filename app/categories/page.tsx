import { getCategories } from '@/lib/cosmic';
import CategoryCard from '@/components/CategoryCard';

export const revalidate = 60;

export const metadata = {
  title: 'Categories — Collectibles Marketplace',
  description: 'Browse collectible categories and find exactly what you are looking for.',
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-2">Categories</h1>
        <p className="text-stone-500 text-lg">
          Browse {categories.length} collectible categories
        </p>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-6xl mb-4 block">🏷️</span>
          <h2 className="text-xl font-semibold text-stone-700 mb-2">No categories yet</h2>
          <p className="text-stone-500">Categories will appear here once they are added.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}