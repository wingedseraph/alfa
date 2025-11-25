import { type ChangeEvent, useDeferredValue, useEffect } from "react";

import { Search } from "lucide-react";

type InputProps = {
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
};

export default function Input({ onChange, placeholder = "Search for...", value }: InputProps) {
  const deferredValue = useDeferredValue(value);

  useEffect(() => {
    onChange(deferredValue);
  }, [deferredValue, onChange]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative max-w-md flex-1">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-5 w-5 text-muted-foreground" />
      </div>
      <input
        className="block w-full rounded-3xl border border-border bg-card py-2 pr-3 pl-10 leading-5 text-card-foreground placeholder-muted-foreground transition duration-150 ease-in-out focus:border-muted-foreground focus:ring-1 focus:ring-accent focus:outline-none sm:text-sm"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        type="text"
      />
    </div>
  );
}
