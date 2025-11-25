import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

type CategorySelectProps = {
  categories: string[];
  onChange: (value: string) => void;
  value: string;
};

export default function CategorySelect({ categories, onChange, value }: CategorySelectProps) {
  return (
    <select
      className="block rounded-3xl border border-border bg-card py-2 pr-10 pl-3 text-base text-card-foreground focus:border-accent focus:ring-accent focus:outline-none sm:text-sm"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      <option value="">All categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {capitalizeFirstLetter(category)}
        </option>
      ))}
    </select>
  );
}
