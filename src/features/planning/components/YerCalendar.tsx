import { CalendarRange } from "lucide-react";
import { seasonMonths } from "../../../data/PlanningData";
import { PlanningItem } from "../../../types";

type YearCalendarProps = {
  filteredPlanning: PlanningItem[];
};

export function YearCalendar({ filteredPlanning }: YearCalendarProps) {
  return (
    <div className="year-calendar">
      {seasonMonths.map((month, index) => {
        const monthIndex = index < 4 ? index + 8 : index - 4;
        const monthEvents = filteredPlanning.filter(
          (item) => new Date(item.date).getMonth() === monthIndex,
        );

        return (
          <article className="year-month" key={month}>
            <div>
              <CalendarRange size={18} />
              <strong>{month}</strong>
            </div>
            {monthEvents.length > 0 ? (
              monthEvents.map((item) => (
                <span
                  className={`compact-event ${item.type.toLowerCase()}`}
                  key={item.title}
                >
                  {item.title}
                </span>
              ))
            ) : (
              <small>Aucun evenement planifie</small>
            )}
          </article>
        );
      })}
    </div>
  );
}
