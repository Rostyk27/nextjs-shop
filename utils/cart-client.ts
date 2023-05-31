export const useCartOpen = () => {
  const cartOpen = localStorage.getItem('cart-open');

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
