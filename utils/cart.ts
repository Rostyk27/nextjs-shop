'use server';

import Product from '@/types/Product';
import { cookies } from 'next/headers';
import { getProductById } from './cms';
import { revalidatePath } from 'next/cache';

export const useCartOpen = () => {
  const cookieShop = cookies();
  const cartOpen = cookieShop.get('cart-open')?.value;

  if (cartOpen === 'true') {
    return true;
  }

  return false;
};

export const openCart = () => {
  /* @ts-ignore */
  cookies().set('cart-open', 'true');
  revalidatePath('/');
};

export const closeCart = () => {
  /* @ts-ignore */
  cookies().set('cart-open', 'false');
  revalidatePath('/');
};

export const useCartItems = async () => {
  type cartItemsType = {
    id: number;
    qty: number;
  }[];

  const cookieShop = cookies();
  const cartItems = cookieShop.get('cart-items')?.value;

  let parsedCartItems = [] as cartItemsType;

  if (cartItems && typeof cartItems === 'string') {
    parsedCartItems = JSON.parse(cartItems) as cartItemsType;
  }

  return parsedCartItems;
};

export const useCartProducts = async () => {
  const cartItems = await useCartItems();

  let cartProducts = [] as { product: Product; quantity: number }[];

  await Promise.all(
    cartItems.map(async (item: { id: number; qty: number }) => {
      const product = (await getProductById(item.id)) as Product;
      const cartProduct = {
        product: product,
        quantity: item.qty,
      };
      cartProducts.push(cartProduct);
    })
  );

  return cartProducts;
};

export const useCartTotal = async () => {
  const cartItems = await useCartItems();
  let total = cartItems.reduce((acc: number, item) => acc + item.qty, 0);

  return total;
};

export const useCartTotalPrice = async () => {
  const cartProducts = await useCartProducts();
  let totalPrice = cartProducts.reduce(
    (acc: number, item) => acc + item.product.price * item.quantity,
    0
  );

  return totalPrice;
};

export const addToCart = async (data: FormData) => {
  const cartItems = await useCartItems();
  const productId = parseInt(data.get('productId') as string);
  const productQuantity = parseInt(data.get('productQuantity') as string);
  const productToAdd = await getProductById(productId);

  if (productToAdd) {
    if (cartItems) {
      const existingCartItem = Object.values(cartItems).find(
        item => item.id === productId
      );

      if (existingCartItem) {
        /* @ts-ignore */
        cookies().set(
          'cart-items',
          JSON.stringify(
            cartItems.map(item =>
              item.id === productId
                ? { ...item, qty: item.qty + productQuantity }
                : item
            )
          )
        );
      } else {
        /* @ts-ignore */
        cookies().set(
          'cart-items',
          JSON.stringify([
            ...cartItems,
            { id: productToAdd.id, qty: productQuantity },
          ])
        );
      }
    } else {
      /* @ts-ignore */
      cookies().set(
        'cart-items',
        JSON.stringify([{ id: productToAdd.id, qty: productQuantity }])
      );
    }

    revalidatePath('/');
  }
};
