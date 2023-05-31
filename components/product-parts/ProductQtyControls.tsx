'use client';

import { useRouter } from 'next/navigation';

type ProductQtyControlsProps = {
  a11y?: {
    tabIndex: number;
    'aria-hidden': boolean;
  };
  id: number;
  quantity: number;
  onQtyIncrease: (productId: number) => void;
  onQtyDecrease: (productId: number) => void;
};

const ProductQtyControls = ({
  a11y = {
    tabIndex: 0,
    'aria-hidden': false,
  },
  id,
  quantity,
  onQtyIncrease,
  onQtyDecrease,
}: ProductQtyControlsProps) => {
  const router = useRouter();

  return (
    <div className="flex w-[80px] items-center">
      <button
        type="button"
        disabled={quantity === 1}
        onClick={() => {
          onQtyDecrease(id);
          router.refresh();
        }}
        className="flex hover:text-color-success"
        {...(typeof a11y === 'object' && { ...a11y })}
      >
        <span className="material-symbols-outlined text-[20px]">remove</span>
      </button>

      <span className="w-[40px] text-center">{quantity}</span>

      <button
        type="button"
        onClick={() => {
          onQtyIncrease(id);
          router.refresh();
        }}
        className="flex hover:text-color-success"
        {...(typeof a11y === 'object' && { ...a11y })}
      >
        <span className="material-symbols-outlined text-[20px]">add</span>
      </button>
    </div>
  );
};

export default ProductQtyControls;
