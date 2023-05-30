'use server';

import { cookies } from 'next/headers';
import { getProductById } from './cms';
import { revalidatePath } from 'next/cache';

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
