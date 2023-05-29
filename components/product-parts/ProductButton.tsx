import { addToCart } from '@/utils/cart';

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
  return (
    <>
      {inStock ? (
        <form action={addToCart}>
          <input type="hidden" name="productId" value={id} />
          <input
            type="hidden"
            name="productQuantity"
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
