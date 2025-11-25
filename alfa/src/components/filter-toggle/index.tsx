import Button from "@/components/button";

type FilterToggleProps = {
  filter: "all" | "favorites";
  onFilterChange: (filter: "all" | "favorites") => void;
};

export default function FilterToggle({ filter, onFilterChange }: FilterToggleProps) {
  return (
    <div className="flex rounded-3xl bg-muted p-1">
      <Button
        className={`rounded-3xl px-4 py-1.5 text-sm font-medium transition-all ${
          filter === "all" ? "bg-card text-card-foreground shadow-sm" : "text-muted-foreground hover:text-card-foreground"
        }`}
        onClick={() => {
          onFilterChange("all");
        }}
        type="button"
      >
        All
      </Button>
      <Button
        className={`flex items-center gap-1 rounded-3xl px-4 py-1.5 text-sm font-medium transition-all ${
          filter === "favorites" ? "bg-card text-card-foreground shadow-sm" : "text-muted-foreground hover:text-card-foreground"
        }`}
        onClick={() => {
          onFilterChange("favorites");
        }}
        type="button"
      >
        Favorites
      </Button>
    </div>
  );
}
