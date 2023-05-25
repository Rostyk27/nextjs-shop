import { getProductById } from '@/utils/cms';
import { cookies } from 'next/headers';

type ProductButtonProps = {
  id: number;
  inStock: boolean;
  addToCartQuantity?: number;
};

export default async function ProductButton({
  id,
  inStock,
  addToCartQuantity = 1,
}: ProductButtonProps) {
  const cookieShop = cookies();
  const cartItems = cookieShop.get('cart-items');
  const productToAdd = await getProductById(id);

  const handleAddToCart = async (data: FormData) => {
    'use server';

    const productId = data.get('productId') as unknown as number;
    const productQuantity = data.get('productQuantity') as unknown as number;

    if (productToAdd) {
      /* @ts-ignore */
      cookies().set('product-id', productToAdd.id);
      console.log(productToAdd.id);
      // const existingCartItem = cartItems.find(
      //   item => item.product.id === productId
      // );
      // if (existingCartItem) {
      //   setCartItems(
      //     cartItems.map(item =>
      //       item.product.id === productId
      //         ? { ...item, quantity: item.quantity + productQuantity }
      //         : item
      //     )
      //   );
      // } else {
      //   setCartItems([
      //     ...cartItems,
      //     { product: productToAdd, quantity: productQuantity },
      //   ]);
      // }
    }
  };

  return (
    <>
      {inStock ? (
        <form action={handleAddToCart}>
          <input type="hidden" name="productId" value={id} />
          <input
            type="hidden"
            name="producproductQuantitytId"
            value={addToCartQuantity}
          />
          <button type="submit" className="button">
            Add to cart
          </button>
        </form>
      ) : (
        <button type="button" className="button" disabled>
          Out of stock
        </button>
      )}
    </>
  );
}
