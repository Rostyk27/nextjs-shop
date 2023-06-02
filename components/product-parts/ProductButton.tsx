'use client';

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

  return (
    <>
      {inStock ? (
        <button
          onClick={() => {
            onAddToCart(id, addToCartQty);
            router.refresh();
          }}
          type="button"
          className="button"
        >
          Add to cart
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
