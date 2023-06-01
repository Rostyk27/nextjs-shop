import Select from 'react-select';

type ProductFilterProps = {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

export default function ProductFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: ProductFilterProps) {
  const categoryOptions = categories.map((category: string) => ({
    value: category,
    label: category,
  }));

  return (
    <div>
      <label>
        <small>Categories:</small>
      </label>

      <Select
        options={categoryOptions}
        instanceId="categories"
        className="react-select-container"
        classNamePrefix="react-select"
        unstyled={true}
        isSearchable={false}
        defaultValue={categoryOptions[0]}
        onChange={e => e && onCategoryChange(e.value)}
        value={{ value: selectedCategory, label: selectedCategory }}
      />
    </div>
  );
}
