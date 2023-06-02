type ProductCategoryProps = {
  name: string;
};

const ProductCategory = ({ name }: ProductCategoryProps) => {
  return (
    <small className="mb-3 inline-flex border-[1px] px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-color-tertiary">
      {name}
    </small>
  );
};

export default ProductCategory;
