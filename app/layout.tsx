import '@/styles/global.scss';
import { Montserrat } from 'next/font/google';
import '@material-symbols/font-700';

import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import Cart from '@/components/cart/Cart';

const font = Montserrat({
  display: 'swap',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata = {
  title: 'Next.js 13 - Shop',
  description: 'Next.js 13 - Shop (App Router)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`flex min-h-screen flex-col ${font.className}`}>
        <Header />

        {/* @ts-expect-error Async Server Component */}
        <Cart />

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
