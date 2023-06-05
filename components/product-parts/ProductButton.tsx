'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type ProductButtonProps = {
  id: number;
  inStock: boolean;
  onAddToCart: (productId: number, productQty?: number) => void;
  addToCartQty?: number;
};

const ProductButton = ({
  id,
  inStock,
  onAddToCart,
  addToCartQty = 1,
}: ProductButtonProps) => {
  const router = useRouter();

  const [buttonText, setButtonText] = useState('Add to cart');

  const handleButtonTextChange = () => {
    setButtonText('Added!');

    setTimeout(() => {
      setButtonText('Add to cart');
    }, 1000);
  };

  return (
    <>
      {inStock ? (
        <button
          onClick={() => {
            handleButtonTextChange();
            onAddToCart(id, addToCartQty);
            router.refresh();
          }}
          type="button"
          className="button"
          disabled={buttonText === 'Added!'}
        >
          {buttonText}
        </button>
      ) : (
        <button type="button" className="button" disabled>
          Out of stock
        </button>
      )}
    </>
  );
};

export default ProductButton;
