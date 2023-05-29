'use server';

import { getProductById } from './cms';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const useCartItems = async () => {
  type cartItemsType = {
    id: number;
    quantity: number;
  }[];

  const cookieShop = cookies();
  const cartItemsValue = cookieShop.get('cart-items')?.value;
  const cartItems =
    cartItemsValue &&
    (JSON.parse(JSON.stringify(cartItemsValue)) as unknown as cartItemsType);

  let parsedCartItems = [] as cartItemsType;

  if (cartItems) {
    if (typeof cartItems === 'string') {
      parsedCartItems = JSON.parse(cartItems) as cartItemsType;
    }
  }

  return parsedCartItems;
};

export const addToCart = async (data: FormData) => {
  const cartItems = await useCartItems();

  const productId = parseInt(
    (data.get('productId') as unknown as number).toString()
  );
  const productQuantity = parseInt(
    (data.get('productQuantity') as unknown as number).toString()
  );
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
                ? { ...item, quantity: item.quantity + productQuantity }
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
            { id: productToAdd.id, quantity: productQuantity },
          ])
        );
      }
    } else {
      /* @ts-ignore */
      cookies().set(
        'cart-items',
        JSON.stringify([{ id: productToAdd.id, quantity: productQuantity }])
      );
    }

    revalidatePath('/');
  }
};
