// import { addToCart } from '@/utils/cart-server';
// addToCart function should accept (data: FormData) as argument,
// like this:
// export const addToCart = async (data: FormData) => {
//   const productId = parseInt(data.get('productId') as string);
//   const productQty = parseInt(data.get('productQty') as string);
//
//   revalidatePath('/'); (do this to refresh the page after adding to cart)

// type ProductButtonProps = {
//   id: number;
//   inStock: boolean;
//   addToCartQty?: number;
// };

// const ProductButton = async ({
//   id,
//   inStock,
//   addToCartQty = 1,
// }: ProductButtonProps) => {
//   return (
//     <>
//       {inStock ? (
//         <form action={addToCart}>
//           <input type="hidden" name="productId" value={id} />
//           <input type="hidden" name="productQty" value={addToCartQty} />
//           <button type="submit" className="button">
//             Add to cart
//           </button>
//         </form>
//       ) : (
//         <button type="button" className="button" disabled>
//           Out of stock
//         </button>
//       )}
//     </>
//   );
// };

// export default ProductButton;
