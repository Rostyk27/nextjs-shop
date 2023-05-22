import Product from '@/types/Product';

export const getProducts = async (page = 1) => {
  // direct fetch from json file in public folder
  const res = await fetch(process.env.API_URL + '/data.json');
  // fetch from api endpoint via route.ts in /api/products folder
  // const res = await fetch(process.env.API_URL + '/api/products');
  const products: Product[] = await res.json();

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  // simulate slow connection to test loading state
  // await new Promise(resolve => {
  //   setTimeout(() => resolve(1), 250);
  // });

  const result = products.slice((page - 1) * 4, page * 4);

  return result;
};

export const getProductsTotal = async () => {
  const res = await fetch(process.env.API_URL + '/data.json');
  const products: Product[] = await res.json();

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return products.length;
};

// export const getProduct = async (link: string) => {
//   const res = await fetch(process.env.API_URL + '/data.json');
//   const products: Product[] = await res.json();

//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }

//   const product = products.find(product => product.link === link);

//   if (!product) {
//     throw new Error('Failed to fetch data');
//   }

//   return product;
// }
