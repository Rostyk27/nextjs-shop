'use client';

import Product from '@/types/Product';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { openCart, closeCart, useCartOpen } from '@/utils/cart-client';

import Link from 'next/link';
import HeaderButton from './HeaderButton';
import Cart from '@/components/cart/Cart';

type HeaderProps = {
  cartProducts: { product: Product; quantity: number }[];
  totalCartItems: number;
  totalCartPrice: number;
  handleRemoveFromCart: (productId: number) => void;
};

const Header = ({
  cartProducts,
  totalCartItems,
  totalCartPrice,
  handleRemoveFromCart,
}: HeaderProps) => {
  const pathname = usePathname();
  const [isCartOpen, setIsCartOpen] = useState(useCartOpen());

  const handleOpenCart = () => {
    openCart();
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    closeCart();
    setIsCartOpen(false);
  };

  useEffect(() => {
    if (totalCartItems === 0 && isCartOpen === true) {
      handleCloseCart();
    }
  }, [totalCartItems]);

  useEffect(() => {
    if (isCartOpen === true) {
      handleCloseCart();
    }
  }, [pathname]);

  return (
    <header className="fixed left-0 right-0 top-0 z-10 bg-color-primary">
      <div className="container flex min-h-[100px] items-center justify-between">
        <Link
          href={'/'}
          className="flex items-center hover:text-color-tertiary"
        >
          Shop app <span className="material-symbols-rounded ml-1">apps</span>
        </Link>

        <HeaderButton
          totalCartItems={totalCartItems}
          onOpenCart={handleOpenCart}
        />
      </div>

      <Cart
        cartProducts={cartProducts}
        isCartOpen={isCartOpen}
        totalCartItems={totalCartItems}
        totalCartPrice={totalCartPrice}
        onCloseCart={handleCloseCart}
        onRemoveFromCart={handleRemoveFromCart}
      />
    </header>
  );
};

export default Header;
