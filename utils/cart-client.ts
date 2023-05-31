'use client';

export const useCartOpen = () => {
  let cartOpen: string | null = 'false';

  if (typeof window !== 'undefined') {
    cartOpen = localStorage.getItem('cart-items')
      ? localStorage.getItem('cart-open')
      : 'false';
  }

  if (cartOpen === 'true') {
    return true;
  }

  return false;
};

export const openCart = () => {
  localStorage.setItem('cart-open', 'true');
};

export const closeCart = () => {
  localStorage.setItem('cart-open', 'false');
};
