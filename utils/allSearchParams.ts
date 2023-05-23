import { ReadonlyURLSearchParams } from 'next/navigation';

const getAllSearchParams = (searchParams: ReadonlyURLSearchParams) => {
  let allSearchParams: string = '';
  const searchParamsArray = Array.from(searchParams.entries());

  searchParamsArray.forEach(([key, value], index) => {
    allSearchParams += key + '=' + value;

    if (index !== searchParamsArray.length - 1) {
      allSearchParams += '&';
    }
  });

  return allSearchParams;
};

export default getAllSearchParams;
