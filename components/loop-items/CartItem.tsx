import Product from '@/types/Product';
import { useRouter } from 'next/navigation';

import Link from 'next/link';
import ProductImage from '@/components/product-parts/ProductImage';
import ProductQtyControls from '../product-parts/ProductQtyControls';

type CartItemProps = {
  item: { product: Product; quantity: number };
  isCartOpen: boolean;
  onRemoveFromCart: (productId: number) => void;
  addToCart: (productId: number, productQty?: number) => void;
  decreaseFromCart: (productId: number) => void;
};

const CartItem = ({
  item,
  isCartOpen,
  onRemoveFromCart,
  addToCart,
  decreaseFromCart,
}: CartItemProps) => {
  const router = useRouter();
  const a11y = !isCartOpen && { tabIndex: -1, 'aria-hidden': true };

  return (
    <li className="w-full border-b-[1px] border-color-primary p-4 sm:flex sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center">
        <Link
          href={`/products/${item.product.link}`}
          tabIndex={-1}
          aria-hidden="true"
          className="flex w-[60px] hover:opacity-75"
        >
          <ProductImage
            imageSrc={item.product.imageSrc}
            imageAlt={item.product.imageAlt}
            width={60}
            height={60}
          />
        </Link>

        <h5 className="flex-1 pl-4 pr-2 text-[13px]">
          <Link
            href={`/products/${item.product.link}`}
            {...a11y}
            className="hover:text-color-tertiary"
          >
            {item.product.name}
          </Link>
        </h5>
      </div>

      <div className="mt-6 flex items-center justify-end sm:mt-0 sm:justify-normal">
        <div className="flex w-[160px] items-center justify-center">
          <button
            {...a11y}
            type="button"
            className="mr-[20px] flex hover:text-color-error"
            onClick={() => {
              onRemoveFromCart(item.product.id);
              router.refresh();
            }}
          >
            <span className="material-symbols-outlined text-[20px]">
              delete
            </span>
          </button>

          <ProductQtyControls
            a11y={a11y}
            id={item.product.id}
            quantity={item.quantity}
            onQtyIncrease={addToCart}
            onQtyDecrease={decreaseFromCart}
          />
        </div>

        <strong className="w-[50px] text-center">
          ${item.product.price * item.quantity}
        </strong>
      </div>
    </li>
  );
};

export default CartItem;
