// import { useState, useEffect, useCallback } from 'react';
// import { useLocation } from 'react-router-dom';

import Product from '@/types/Product';

import CartItem from '@/components/loop-items/CartItem';
// import CartForm from './CartForm';

type CartProps = {
  cartProducts: { product: Product; quantity: number }[];
  isCartOpen: boolean;
  totalCartItems: number;
  totalCartPrice: number;
  onCloseCart: () => void;
  onRemoveFromCart: (productId: number) => void;
};

export default function Cart({
  cartProducts,
  isCartOpen,
  totalCartItems,
  totalCartPrice,
  onCloseCart,
  onRemoveFromCart,
}: // onUpdateQuantity,
// onClearCart,
CartProps) {
  // const location = useLocation();
  const a11y = !isCartOpen && { tabIndex: -1, 'aria-hidden': true };

  // const [cartSuccessMessage, setCartSuccessMessage] = useState('');

  // const handleSuccessMessage = (msg: string) => {
  //   setCartSuccessMessage(msg);
  // };

  // const onHideCartCallback = useCallback(() => {
  //   onHideCart();
  // }, [onHideCart]);

  // useEffect(() => {
  //   if (totalCartItems === 0) {
  //     onHideCartCallback();
  //   }
  // }, [totalCartItems, onHideCartCallback]);

  // useEffect(() => {
  //   if (isCartOpen) {
  //     onHideCartCallback();
  //   }
  //   // eslint-disable-next-line
  // }, [location]);

  return (
    <>
      {totalCartItems > 0 && (
        <div
          className={`popup ${
            isCartOpen
              ? 'pointer-events-all opacity-100'
              : 'pointer-events-none opacity-0'
          }`}
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
                // onUpdateQuantity={onUpdateQuantity}
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

          {/* <CartForm
            isCartOpen={isCartOpen}
            onHideCart={onHideCart}
            onClearCart={onClearCart}
            cartSuccessMessage={handleSuccessMessage}
          /> */}
        </div>
      )}

      {/* {cartSuccessMessage.length > 0 && (
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
      )} */}
    </>
  );
}
