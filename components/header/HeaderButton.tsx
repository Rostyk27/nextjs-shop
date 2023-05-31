type HeaderButtonProps = {
  totalCartItems: number;
  onOpenCart: () => void;
};

const HeaderButton = ({ totalCartItems, onOpenCart }: HeaderButtonProps) => {
  return (
    <button
      type="button"
      onClick={onOpenCart}
      disabled={totalCartItems === 0}
      className="relative inline-flex pr-[26px] hover:text-color-tertiary"
    >
      <span className="material-symbols-rounded !text-[36px]">
        shopping_cart
      </span>

      <span className="center-y right-0 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-color-secondary text-[11px] font-bold leading-[22px] text-white">
        {totalCartItems}
      </span>
    </button>
  );
};

export default HeaderButton;
