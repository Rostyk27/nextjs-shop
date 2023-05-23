import Product from '@/types/Product';

export const getProducts = async (page = 1, category = 'all') => {
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

  let filteredItems = products;

  if (category !== 'all') {
    filteredItems = filteredItems.filter(
      product => product.category === category
    );
  }

  const result = filteredItems.slice((page - 1) * 4, page * 4);

  const total = filteredItems.length;

  return { result, total };
};

export const getProductCategories = async () => {
  const res = await fetch(process.env.API_URL + '/data.json');
  const products: Product[] = await res.json();

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const categories = products.map(product => product.category);

  return ['all', ...new Set(categories)];
};
