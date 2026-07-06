import { FilePlus2, CalendarDays, Dumbbell, Trophy } from "lucide-react";

export function QuickActions() {
  return (
    <div className="admin-panel quick-actions">
      <div className="panel-title">
        <FilePlus2 size={20} />
        <h3>Prochaines briques</h3>
      </div>
      <button type="button">
        <CalendarDays size={18} /> Ajouter un creneau
      </button>
      <button type="button">
        <Dumbbell size={18} /> Declarer un interclub
      </button>
      <button type="button">
        <Trophy size={18} /> Publier un resultat
      </button>
    </div>
  );
}
