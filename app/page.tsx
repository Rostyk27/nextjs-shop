import { getProducts } from '@/utils/cms';
import Product from '@/types/Product';
import ProductItem from '@/components/loop-items/ProductItem';

export default async function Home() {
  const products = await getProducts();

  return (
    <section className="products mb-20 lg:mb-24">
      <div className="container">
        <h1>All products</h1>

        <ul className="product__list grid grid-cols-1 gap-x-6 gap-y-14  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product: Product) => (
            <ProductItem key={product.id} {...product} />
          ))}
        </ul>
      </div>
    </section>
  );
}
