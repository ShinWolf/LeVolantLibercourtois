import { PlanningItem } from "../../../types";

type MonthCalendarProps = {
  filteredPlanning: PlanningItem[];
};

export function MonthCalendar({ filteredPlanning }: MonthCalendarProps) {
  return (
    <div className="month-calendar">
      {Array.from({ length: 30 }, (_, index) => {
        const dayNumber = index + 1;
        const dayEvents = filteredPlanning.filter((item) => {
          const date = new Date(item.date);
          return date.getMonth() === 8 && date.getDate() === dayNumber;
        });

        return (
          <article className="month-day" key={dayNumber}>
            <strong>{dayNumber}</strong>
            {dayEvents.map((item) => (
              <span
                className={`compact-event ${item.type.toLowerCase()}`}
                key={item.title}
              >
                {item.title}
              </span>
            ))}
          </article>
        );
      })}
    </div>
  );
}
