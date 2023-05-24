const getSearchParamsString = (searchParams: URLSearchParams) => {
  let queryString: string = '';
  const searchParamsArray = Array.from(searchParams.entries());

  searchParamsArray.forEach(([key, value], index) => {
    queryString += key + '=' + value;

    if (index !== searchParamsArray.length - 1) {
      queryString += '&';
    }
  });

  return queryString;
};

export default getSearchParamsString;
