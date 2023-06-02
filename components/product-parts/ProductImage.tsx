import Image from 'next/image';

type ProductImageProps = {
  imageSrc: string;
  imageAlt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
};

const ProductImage = ({
  imageSrc,
  imageAlt,
  width,
  height,
  fill,
  className,
}: ProductImageProps) => {
  return (
    <figure
      className={`flex overflow-hidden rounded-lg${
        className ? ' ' + className : ''
      }`}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        {...(fill
          ? { fill }
          : {
              width: width,
              height: height,
            })}
        className="object-cover object-center"
      />
    </figure>
  );
};

export default ProductImage;
