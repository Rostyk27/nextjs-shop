type ProductPriceProps = {
  price: number;
};

const ProductPrice = ({ price }: ProductPriceProps) => {
  return (
    <p className="mb-5 text-lg">
      <strong>${price}</strong>
    </p>
  );
};

export default ProductPrice;
