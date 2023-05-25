import Product from '@/types/Product';

type GetProductsParams = {
  page?: number;
  filterParams?: {
    search?: string;
    category?: string;
    sort?: string;
    inStock?: boolean;
  };
};

export const getProducts = async (params: GetProductsParams) => {
  const {
    page = 1,
    filterParams: {
      search = '',
      category = 'all',
      sort = 'id',
      inStock = false,
    } = {},
  } = params;

  const res = await fetch(process.env.API_URL + '/data.json');
  const products: Product[] = await res.json();

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  let filteredItems = products;

  filteredItems = products.filter((product: Product) => {
    return (
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.imageAlt.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (category !== 'all') {
    filteredItems = filteredItems.filter(
      product => product.category === category
    );
  }

  if (sort === 'name-asc') {
    filteredItems.sort((a: Product, b: Product) => {
      return a.name.localeCompare(b.name);
    });
  } else if (sort === 'name-desc') {
    filteredItems.sort((a: Product, b: Product) => {
      return b.name.localeCompare(a.name);
    });
  } else if (sort === 'price-asc') {
    filteredItems.sort((a: Product, b: Product) => {
      return a.price - b.price;
    });
  } else if (sort === 'price-desc') {
    filteredItems.sort((a: Product, b: Product) => {
      return b.price - a.price;
    });
  } else {
    filteredItems.sort((a: Product, b: Product) => {
      return a.id - b.id;
    });
  }

  if (inStock) {
    filteredItems = filteredItems.filter((product: Product) => {
      return product.inStock;
    });
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

export const getProduct = async (link: string) => {
  const res = await fetch(process.env.API_URL + '/data.json');
  const products: Product[] = await res.json();

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const product = products.find(product => product.link === link);

  return product;
};
