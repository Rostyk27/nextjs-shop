import clsx from 'clsx';

type ProductInStockProps = {
  inStockOnly: boolean;
  onInStockChange: (inStock: boolean) => void;
};

const ProductInStock = ({
  inStockOnly,
  onInStockChange,
}: ProductInStockProps) => {
  return (
    <div>
      <label
        htmlFor="inStock"
        className="pointer-events-none !mb-0 mt-px flex flex-wrap"
      >
        <small className="label pointer-events-all w-full leading-[24px]">
          Show only products in stock
        </small>

        <span
          className={clsx(
            'material-symbols-outlined checkbox_element',
            inStockOnly ? 'is_checked' : ''
          )}
        >
          check
        </span>
      </label>

      <input
        id="inStock"
        type="checkbox"
        checked={inStockOnly}
        onChange={e => onInStockChange(e.target.checked)}
        className="sr-only"
      />
    </div>
  );
};

export default ProductInStock;
