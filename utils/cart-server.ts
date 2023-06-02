'use server';

import Product from '@/types/Product';
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

  const sortedCartItems = parsedCartItems.sort((a, b) => {
    return a.id - b.id;
  });

  return sortedCartItems;
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

  const sortedCartProducts = cartProducts.sort((a, b) => {
    return a.product.id - b.product.id;
  });

  return sortedCartProducts;
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

export const addToCart = async (productId: number, productQty: number = 1) => {
  const cartItems = await useCartItems();
  const productToAdd = await getProductById(productId);

  if (productToAdd) {
    if (cartItems) {
      const existingCartItem = Object.values(cartItems).find(
        item => item.id === productId
      );

      if (existingCartItem) {
        const updatedCartItems = cartItems.map(item =>
          item.id === productId ? { ...item, qty: item.qty + productQty } : item
        );
        const sortedCartItems = updatedCartItems.sort((a, b) => {
          return a.id - b.id;
        });

        /* @ts-ignore */
        cookies().set('cart-items', JSON.stringify(sortedCartItems));
      } else {
        const updatedCartItems = [
          ...cartItems,
          { id: productToAdd.id, qty: productQty },
        ];
        const sortedCartItems = updatedCartItems.sort((a, b) => {
          return a.id - b.id;
        });

        /* @ts-ignore */
        cookies().set('cart-items', JSON.stringify(sortedCartItems));
      }
    } else {
      /* @ts-ignore */
      cookies().set(
        'cart-items',
        JSON.stringify([{ id: productToAdd.id, qty: productQty }])
      );
    }
  }
};

export const decreaseFromCart = async (productId: number) => {
  const cartItems = await useCartItems();

  if (cartItems) {
    const existingCartItem = Object.values(cartItems).find(
      item => item.id === productId
    );

    if (existingCartItem && existingCartItem.qty > 1) {
      const updatedCartItems = cartItems.map(item =>
        item.id === productId ? { ...item, qty: item.qty - 1 } : item
      );
      const sortedCartItems = updatedCartItems.sort((a, b) => {
        return a.id - b.id;
      });

      /* @ts-ignore */
      cookies().set('cart-items', JSON.stringify(sortedCartItems));
    }
  }
};

export const removeFromCart = async (productId: number) => {
  const cartItems = await useCartItems();

  if (cartItems) {
    /* @ts-ignore */
    cookies().set(
      'cart-items',
      JSON.stringify(cartItems.filter(item => item.id !== productId))
    );
  }

  revalidatePath('/');
};

export const useProductQty = async (productId: number) => {
  const cookieShop = cookies();
  const currentProduct = cookieShop.get('product-' + productId)?.value;
  let productQty;

  if (currentProduct && typeof currentProduct === 'string') {
    productQty = parseInt(currentProduct);
  } else {
    productQty = 1;
  }

  return productQty;
};

export const setProductQty = async (productId: number, qty: number) => {
  /* @ts-ignore */
  cookies().set('product-' + productId, qty);
};

export const increaseProductQty = async (productId: number) => {
  const productQty = await useProductQty(productId);
  setProductQty(productId, productQty + 1);
};

export const decreaseProductQty = async (productId: number) => {
  const productQty = await useProductQty(productId);
  if (productQty === 1) return;
  setProductQty(productId, productQty - 1);
};

export const checkProductQty = async (
  products: Product[]
): Promise<boolean> => {
  const cookieShop = cookies();

  for (const product of products) {
    const { id } = product;
    const currentProduct = cookieShop.get('product-' + id)?.value;

    if (currentProduct && parseInt(currentProduct) > 1) {
      return true;
    }
  }

  return false;
};

export const resetProductQty = async () => {
  const cookieShop = cookies();

  for (const key of cookieShop.getAll()) {
    const name = key.name;
    if (name.startsWith('product-')) {
      const productId = name.replace('product-', '');
      const value = parseInt(cookieShop.get(name)?.value as string);

      if (value > 1) {
        /* @ts-ignore */
        cookies().set(name, '1');
      }
    }
  }
};
