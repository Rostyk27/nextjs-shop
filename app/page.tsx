import Product from '@/types/Product';
import { getProducts, getProductCategories } from '@/utils/cms';

import ProductItem from '@/components/loop-items/ProductItem';
import Pagination from '@/components/product-filters/Pagination';
import ProductFilteringBar from '@/components/product-filters/ProductFilteringBar';

type HomeProps = {
  searchParams: {
    page: string;
    search: string;
    category: string;
    sort: string;
    inStock: string;
  };
};

export default async function Home({ searchParams }: HomeProps) {
  const categories = await getProductCategories();

  let searchTerm = '';
  const searchParamsSearch = searchParams.search;
  if (searchParamsSearch) {
    searchTerm = searchParamsSearch;
  }

  let currentCategory = 'all';
  const searchParamsCategory = searchParams.category;
  if (searchParamsCategory && categories.includes(searchParamsCategory)) {
    currentCategory = searchParamsCategory;
  }

  let currentSort = 'id';
  const searchParamsSort = searchParams.sort;
  if (searchParamsSort) {
    currentSort = searchParamsSort;
  }

  let isInStock = false;
  const searchParamsInStock = searchParams.inStock;
  if (searchParamsInStock === 'true') {
    isInStock = true;
  }

  const filterParams = {
    search: searchTerm,
    category: currentCategory,
    sort: currentSort,
    inStock: isInStock,
  };

  const totalProducts = (await getProducts({ filterParams })).total;

  const productsPerPage = 4;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  let currentPage = 1;
  const searchParamsPage = parseInt(searchParams.page);
  if (searchParamsPage >= 1 && searchParamsPage <= totalPages) {
    currentPage = searchParamsPage;
  }

  const products = (await getProducts({ page: currentPage, filterParams }))
    .result;

  return (
    <section className="products mb-20 lg:mb-24">
      <div className="container">
        <h1>All products</h1>

        <ProductFilteringBar
          {...{
            searchTerm,
            categories,
            currentCategory,
            currentSort,
            isInStock,
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

        {totalProducts === 0 && <p>No products found</p>}
      </div>
    </section>
  );
}
