import { CalendarDays } from "lucide-react";
import { PlanningViewMode } from "../../types";
import { usePlanning } from "./hooks/usePlanning";
import { FilterBar } from "./components/FilterBar";
import { WeekCalendar } from "./components/WeekCalendar";
import { MonthCalendar } from "./components/MonthCalendar";
import { YearCalendar } from "./components/YerCalendar";

export function PlanningSection() {
  const {
    selectedType,
    setSelectedType,
    planningView,
    setPlanningView,
    filteredPlanning,
  } = usePlanning();

  const views: PlanningViewMode[] = ["semaine", "mois", "annee"];

  return (
    <section id="planning" className="content-section planning-section">
      <div className="section-heading">
        <span className="section-icon">
          <CalendarDays size={20} />
        </span>
        <div>
          <p className="eyebrow">Agenda sportif</p>
          <h2>Planning</h2>
        </div>
      </div>

      <FilterBar selectedType={selectedType} onTypeChange={setSelectedType} />

      {/* Vue Time (Mobile-Friendly) */}
      <div className="timeline">
        {filteredPlanning.map((item) => (
          <article className="timeline-item" key={`${item.title}-${item.day}`}>
            <span className={`type-pill ${item.type.toLowerCase()}`}>
              {item.type}
            </span>
            <h3>{item.title}</h3>
            <p>
              {item.day} - {item.time}
            </p>
            <small>{item.location}</small>
          </article>
        ))}
      </div>

      {/* Vue grand format */}
      <div className="large-planning">
        <div className="large-planning-header">
          <div>
            <p className="eyebrow">Vue grand format</p>
            <h3>Calendrier de la saison</h3>
          </div>
          <div
            className="view-switcher"
            aria-label="Changer la vue du planning"
          >
            {views.map((view) => (
              <button
                className={planningView === view ? "filter-active" : ""}
                key={view}
                type="button"
                onClick={() => setPlanningView(view)}
              >
                {view}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Rendu conditionnel des calendriers */}
      {planningView === "semaine" && (
        <WeekCalendar filteredPlanning={filteredPlanning} />
      )}
      {planningView === "mois" && (
        <MonthCalendar filteredPlanning={filteredPlanning} />
      )}
      {planningView === "annee" && (
        <YearCalendar filteredPlanning={filteredPlanning} />
      )}
    </section>
  );
}
