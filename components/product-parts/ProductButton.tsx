import { addToCart } from '@/utils/cart-server';

type ProductButtonProps = {
  id: number;
  inStock: boolean;
  addToCartQty?: number;
};

export default async function ProductButton({
  id,
  inStock,
  addToCartQty = 1,
}: ProductButtonProps) {
  return (
    <>
      {inStock ? (
        <form action={addToCart}>
          <input type="hidden" name="productId" value={id} />
          <input type="hidden" name="productQuantity" value={addToCartQty} />
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
