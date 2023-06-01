import '@/styles/global.scss';
import { Montserrat } from 'next/font/google';
import '@material-symbols/font-700';

import { getProducts } from '@/utils/cms';

import {
  useCartProducts,
  useCartTotal,
  useCartTotalPrice,
  removeFromCart,
  checkProductQty,
  resetProductQty,
} from '@/utils/cart-server';

import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';

const font = Montserrat({
  display: 'swap',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata = {
  title: 'Next.js 13 - Shop',
  description: 'Next.js 13 - Shop (App Router)',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const products = (await getProducts({})).result;
  const useProductQty = await checkProductQty(products);
  const cartProducts = await useCartProducts();
  const totalCartItems = await useCartTotal();
  const totalCartPrice = await useCartTotalPrice();

  return (
    <html lang="en">
      <body className={`flex min-h-screen flex-col ${font.className}`}>
        <Header
          cartProducts={cartProducts}
          totalCartItems={totalCartItems}
          totalCartPrice={totalCartPrice}
          handleRemoveFromCart={removeFromCart}
          useProductQty={useProductQty}
          onResetQty={resetProductQty}
        />

        <main
          id="main"
          className="mt-[calc(100px+3.5rem)] flex-[1_0_auto] overflow-hidden lg:mt-[calc(100px+10vh)]"
        >
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
