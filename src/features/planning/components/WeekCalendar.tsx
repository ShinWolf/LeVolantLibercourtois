import { weekDays } from "../../../data/PlanningData";
import { PlanningItem } from "../../../types";

type WeekCalendarProps = {
  filteredPlanning: PlanningItem[];
};

export function WeekCalendar({ filteredPlanning }: WeekCalendarProps) {
  return (
    <div className="week-calendar">
      {weekDays.map((day) => (
        <article className="calendar-day" key={day}>
          <strong>{day}</strong>
          {filteredPlanning
            .filter((item) => item.day === day)
            .map((item) => (
              <div
                className="calendar-event"
                key={`${item.title}-${item.date}`}
              >
                <span className={`type-pill ${item.type.toLowerCase()}`}>
                  {item.type}
                </span>
                <b>{item.title}</b>
                <small>{item.time}</small>
              </div>
            ))}
        </article>
      ))}
    </div>
  );
}
