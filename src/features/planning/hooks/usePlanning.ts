import { useMemo, useState } from "react";
import { PlanningItem, PlanningViewMode } from "../../../types";
import { planningData } from "../../../data/PlanningData";

export function usePlanning() {
  const [selectedType, setSelectedType] = useState<
    PlanningItem["type"] | "Tous"
  >("Tous");
  const [planningView, setPlanningView] = useState<PlanningViewMode>("semaine");

  const filteredPlanning = useMemo(() => {
    if (selectedType === "Tous") {
      return planningData;
    }

    return planningData.filter((item) => item.type === selectedType);
  }, [selectedType]);

  return {
    selectedType,
    setSelectedType,
    planningView,
    setPlanningView,
    filteredPlanning,
  };
}
