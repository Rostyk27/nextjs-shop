// import { useContext } from 'react';
// import { AddToCartContext } from '../AddToCartContext';
import Link from 'next/link';

import ProductImage from '@/components/product-parts/ProductImage';
import ProductCategory from '@/components/product-parts/ProductCategory';
import ProductPrice from '@/components/product-parts/ProductPrice';
import ProductButton from '@/components/product-parts/ProductButton';

import Product from '@/types/Product';

export default function ProductItem({
  id,
  name,
  link,
  price,
  category,
  inStock,
  imageSrc,
  imageAlt,
}: Product) {
  // const addToCart = useContext(AddToCartContext);

  const addToCart = async () => {
    'use server';
  };

  return (
    <li id={`pid_${id}`} className="product">
      <Link
        href={`/products/${link}`}
        tabIndex={-1}
        aria-hidden="true"
        className="mb-4 flex hover:opacity-75"
      >
        <ProductImage
          imageSrc={imageSrc}
          imageAlt={imageAlt}
          fill={true}
          className="aspect-h-1 aspect-w-1 w-full bg-color-bg xl:aspect-h-8 xl:aspect-w-7"
        />
      </Link>

      <ProductCategory name={category} />

      <h3 className="mb-2">
        <Link href={`/products/${link}`} className="hover:text-color-tertiary">
          {name}
        </Link>
      </h3>

      <ProductPrice price={price} />

      <ProductButton id={id} inStock={inStock} addToCart={addToCart} />
    </li>
  );
}