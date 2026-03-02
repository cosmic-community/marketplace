import { getSellers } from '@/lib/cosmic';
import SellerCard from '@/components/SellerCard';

export const revalidate = 60;

export const metadata = {
  title: 'Sellers — Collectibles Marketplace',
  description: 'Meet our trusted sellers and browse their collectible inventories.',
};

export default async function SellersPage() {
  const sellers = await getSellers();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-2">Our Sellers</h1>
        <p className="text-stone-500 text-lg">
          {sellers.length} trusted sellers in our community
        </p>
      </div>

      {sellers.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-6xl mb-4 block">👤</span>
          <h2 className="text-xl font-semibold text-stone-700 mb-2">No sellers yet</h2>
          <p className="text-stone-500">Our seller community is growing. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sellers.map((seller) => (
            <SellerCard key={seller.id} seller={seller} />
          ))}
        </div>
      )}
    </div>
  );
}