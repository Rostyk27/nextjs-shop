import { getProducts, getProductCategories } from '@/utils/cms';
import Product from '@/types/Product';

import ProductItem from '@/components/loop-items/ProductItem';
import Pagination from '@/components/product-filters/Pagination';
import ProductFilteringBar from '@/components/product-filters/ProductFilteringBar';

interface HomeProps {
  searchParams: {
    page: string;
    category: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const categories = await getProductCategories();

  let currentCategory = 'all';
  const searchParamsCategory = searchParams.category;
  if (searchParamsCategory && categories.includes(searchParamsCategory)) {
    currentCategory = searchParamsCategory;
  }

  const totalProducts = (await getProducts(1, currentCategory)).total;

  const productsPerPage = 4;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  let currentPage = 1;
  const searchParamsPage = parseInt(searchParams.page);
  if (searchParamsPage >= 1 && searchParamsPage <= totalPages) {
    currentPage = searchParamsPage;
  }

  const products = (await getProducts(currentPage, currentCategory)).result;

  return (
    <section className="products mb-20 lg:mb-24">
      <div className="container">
        <h1>All products</h1>

        <ProductFilteringBar
          {...{
            categories,
            currentCategory,
          }}
        />

        <ul className="product__list grid grid-cols-1 gap-x-6 gap-y-14  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product: Product) => (
            <ProductItem key={product.id} {...product} />
          ))}
        </ul>

        {totalProducts > productsPerPage && (
          <Pagination
            {...{
              totalPages,
              currentPage,
            }}
          />
        )}
      </div>
    </section>
  );
}
