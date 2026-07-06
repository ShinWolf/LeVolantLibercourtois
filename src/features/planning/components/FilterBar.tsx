import { PlanningItem } from "../../../types";

type FilterBarProps = {
  selectedType: PlanningItem["type"] | "Tous";
  onTypeChange: (type: PlanningItem["type"] | "Tous") => void;
};

export function FilterBar({ selectedType, onTypeChange }: FilterBarProps) {
  const categories: (PlanningItem["type"] | "Tous")[] = [
    "Tous",
    "Entrainement",
    "Interclub",
    "Competition",
  ];

  return (
    <div className="filters" aria-label="Filtrer le planning">
      {categories.map((type) => (
        <button
          key={type}
          className={selectedType === type ? "filter-active" : ""}
          type="button"
          onClick={() => onTypeChange(type)}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
