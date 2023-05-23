'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import getAllSearchParams from '@/utils/allSearchParams';

import ProductFilter from './ProductFilter';

interface ProductFilteringBarProps {
  categories: string[];
  currentCategory: string;
}

const ProductFilteringBar = ({
  categories,
  currentCategory,
}: ProductFilteringBarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const allSearchParams = getAllSearchParams(searchParams);

  const handleCategoryChange = (category: string) => {
    window.scrollTo(0, 0);

    let newUrl = '';

    if (allSearchParams.includes('category=')) {
      newUrl =
        pathname +
        '?' +
        allSearchParams.replace(
          'category=' + currentCategory,
          'category=' + category
        );
    } else if (allSearchParams === '') {
      newUrl = pathname + '?category=' + category;
    } else {
      newUrl = pathname + '?' + allSearchParams + '&category=' + category;
    }

    if (newUrl.includes('page=')) {
      newUrl = newUrl.replace(/page=\d+/, 'page=1');
    }

    router.push(newUrl);
  };

  return (
    <div className="product__actions mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 xl:gap-8">
      <ProductFilter
        categories={categories}
        selectedCategory={currentCategory}
        onCategoryChange={handleCategoryChange}
      />
    </div>
  );
};

export default ProductFilteringBar;
