import Select from 'react-select';

type ProductSortProps = {
  selectedSort: string;
  onSortChange: (sort: string) => void;
};

const sortOptions = [
  { value: 'id', label: 'Default' },
  { value: 'name-asc', label: 'Name A-Z' },
  { value: 'name-desc', label: 'Name Z-A' },
  { value: 'price-asc', label: 'Price increase' },
  { value: 'price-desc', label: 'Price decrease' },
];

const ProductSort = ({ selectedSort, onSortChange }: ProductSortProps) => {
  return (
    <div>
      <label>
        <small>Sort by:</small>
      </label>

      <Select
        options={sortOptions}
        instanceId="sorting"
        className="react-select-container"
        classNamePrefix="react-select"
        unstyled={true}
        isSearchable={false}
        defaultValue={sortOptions[0]}
        onChange={e => e && onSortChange(e.value)}
        value={{
          value: selectedSort,
          label:
            sortOptions.find(option => option.value === selectedSort)?.label ??
            '',
        }}
      />
    </div>
  );
};

export default ProductSort;
