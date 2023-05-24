'use client';

import { useRouter, usePathname } from 'next/navigation';
import getSearchParamsString from '@/utils/searchParamsString';

import ProductSearch from './ProductSearch';
import ProductFilter from './ProductFilter';
import ProductSort from './ProductSort';
import ProductInStock from './ProductInStock';

type ProductFilteringBarProps = {
  searchTerm: string;
  categories: string[];
  currentCategory: string;
  currentSort: string;
  isInStock: boolean;
};

const ProductFilteringBar = ({
  searchTerm,
  categories,
  currentCategory,
  currentSort,
  isInStock,
}: ProductFilteringBarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    const searchParamsString = getSearchParamsString(params);

    if (searchParamsString.includes(`${key}=`)) {
      params.set(key, value);
    } else {
      params.append(key, value);
    }

    params.set('page', '1');

    const newUrl = `${pathname}?${params.toString()}`;

    router.push(newUrl);
  };

  const handleCategoryChange = (categoryItem: string) => {
    updateSearchParams('category', categoryItem);
  };

  const handleSearch = (searchQuery: string) => {
    updateSearchParams('search', searchQuery);
  };

  const handleSortChange = (sortOption: string) => {
    updateSearchParams('sort', sortOption);
  };

  const handleInStockChange = (isInStock: boolean) => {
    updateSearchParams('inStock', isInStock ? 'true' : 'false');
  };

  return (
    <div className="product__actions mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 xl:gap-8">
      <ProductSearch searchTerm={searchTerm} onSearch={handleSearch} />

      <ProductFilter
        categories={categories}
        selectedCategory={currentCategory}
        onCategoryChange={handleCategoryChange}
      />

      <ProductSort selectedSort={currentSort} onSortChange={handleSortChange} />

      <ProductInStock
        inStockOnly={isInStock}
        onInStockChange={handleInStockChange}
      />
    </div>
  );
};

export default ProductFilteringBar;
