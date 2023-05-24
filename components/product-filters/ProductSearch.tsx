type ProductSearchProps = {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
};

const ProductSearch = ({ searchTerm, onSearch }: ProductSearchProps) => {
  return (
    <div>
      <label htmlFor="search">
        <small>Search:</small>
      </label>

      <input
        id="search"
        type="search"
        placeholder="Search"
        defaultValue={searchTerm}
        onChange={e => onSearch(e.target.value)}
      />
    </div>
  );
};

export default ProductSearch;
