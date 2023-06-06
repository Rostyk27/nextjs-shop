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
  const [isAdded, setIsAdded] = useState(false);

  const handleButtonTextChange = () => {
    setButtonText('Added!');
    setIsAdded(true);

    setTimeout(() => {
      setButtonText('Add to cart');
      setIsAdded(false);
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
          disabled={isAdded}
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
