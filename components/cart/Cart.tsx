import Product from '@/types/Product';
import { useState } from 'react';
import clsx from 'clsx';

import CartItem from '@/components/loop-items/CartItem';
import CartForm from './CartForm';

type CartProps = {
  cartProducts: { product: Product; quantity: number }[];
  isCartOpen: boolean;
  totalCartItems: number;
  totalCartPrice: number;
  onCloseCart: () => void;
  onRemoveFromCart: (productId: number) => void;
  addToCart: (productId: number, productQty?: number) => void;
  decreaseFromCart: (productId: number) => void;
  clearCart: () => void;
};

const Cart = ({
  cartProducts,
  isCartOpen,
  totalCartItems,
  totalCartPrice,
  onCloseCart,
  onRemoveFromCart,
  addToCart,
  decreaseFromCart,
  clearCart,
}: CartProps) => {
  const a11y = !isCartOpen && { tabIndex: -1, 'aria-hidden': true };

  const [cartSuccessMessage, setCartSuccessMessage] = useState('');

  const handleSuccessMessage = (msg: string) => {
    setCartSuccessMessage(msg);
  };

  return (
    <>
      {totalCartItems > 0 && (
        <div
          className={clsx(
            'popup',
            isCartOpen
              ? 'pointer-events-all opacity-100'
              : 'pointer-events-none opacity-0'
          )}
        >
          <button
            {...a11y}
            type="button"
            onClick={onCloseCart}
            className="absolute right-6 top-4 hover:text-color-error"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          <ul className="px-4 py-5 sm:px-6">
            {cartProducts.map(item => (
              <CartItem
                key={item.product.id}
                item={item}
                isCartOpen={isCartOpen}
                onRemoveFromCart={onRemoveFromCart}
                addToCart={addToCart}
                decreaseFromCart={decreaseFromCart}
              />
            ))}
          </ul>

          <div className="bg-color-bg px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between px-4">
              <strong className="flex-1 pl-2">Total</strong>

              <strong className="mr-[40px] w-[40px] text-center">
                {totalCartItems}
              </strong>

              <strong className="w-[50px] text-center">
                ${totalCartPrice}
              </strong>
            </div>
          </div>

          <CartForm
            isCartOpen={isCartOpen}
            onCloseCart={onCloseCart}
            onClearCart={clearCart}
            cartSuccessMessage={handleSuccessMessage}
          />
        </div>
      )}

      {cartSuccessMessage.length > 0 && (
        <div className="popup !py-12 px-7 text-center">
          {cartSuccessMessage}

          <button
            type="button"
            onClick={() => handleSuccessMessage('')}
            className="absolute right-6 top-4 hover:text-color-error"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
