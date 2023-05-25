import { getProductBySlug } from '@/utils/cms';

import ProductCategory from '@/components/product-parts/ProductCategory';
import ProductImage from '@/components/product-parts/ProductImage';
import ProductPrice from '@/components/product-parts/ProductPrice';

type ProductSingleProps = {
  params: {
    link: string;
  };
};

export default async function ProductSingle({ params }: ProductSingleProps) {
  const product = await getProductBySlug(params.link);

  if (!product) {
    return;
  }

  return (
    <div className="product__single mb-20 md:mb-24">
      <div className="container">
        <h1>{product.name}</h1>

        <div className="max-w-[940px] md:flex">
          <ProductImage
            imageSrc={product.imageSrc}
            imageAlt={product.imageAlt}
            width={440}
            height={440}
            className="mb-10 w-[320px] max-w-full shadow-lg md:mb-0 lg:w-[440px]"
          />

          <div className="md:flex-1 md:pl-16">
            <ProductCategory name={product.category} />

            <p className="pb-6 pt-2 text-[15px]">{product.description}</p>

            <ProductPrice price={product.price} />

            <div className="flex items-center pt-3 lg:pt-5">
              {/* {product.inStock && (
                <div className="mr-7">
                  <ProductQuantityControls
                    id={product.id}
                    quantity={productQuantity}
                    onQuantityChange={handleQuantityChange}
                  />
                </div>
              )}

              <ProductButton
                id={product.id}
                inStock={product.inStock}
                addToCart={addToCart}
                addToCartQuantity={productQuantity}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
