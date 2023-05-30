import { useCartTotal, openCart } from '@/utils/cart';

const HeaderButton = async () => {
  const totalCartItems = await useCartTotal();

  return (
    <form action={openCart}>
      <button
        type="submit"
        disabled={totalCartItems === 0}
        // onClick={onShowCart}
        className="relative inline-flex pr-[26px] hover:text-color-tertiary"
      >
        <span className="material-symbols-rounded !text-[36px]">
          shopping_cart
        </span>

        <span className="center-y right-0 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-color-secondary text-[11px] font-bold leading-[22px] text-white">
          {totalCartItems}
        </span>
      </button>
    </form>
  );
};

export default HeaderButton;
