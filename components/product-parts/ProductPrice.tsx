type ProductPriceProps = {
  price: number;
};

export default function ProductPrice({ price }: ProductPriceProps) {
  return (
    <p className="mb-5 text-lg">
      <strong>${price}</strong>
    </p>
  );
}
