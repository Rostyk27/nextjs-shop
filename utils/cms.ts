import Product from '@/types/Product';

export const getProducts = async () => {
  // direct fetch from json file in public folder
  const res = await fetch(process.env.API_URL + '/data.json');
  // fetch from api endpoint via route.ts in /api/products folder
  // const res = await fetch(process.env.API_URL + '/api/products');
  const products: Product[] = await res.json();

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  // simulate slow connection to test loading state
  await new Promise(resolve => {
    setTimeout(() => resolve(1), 250);
  });

  return products;
};
