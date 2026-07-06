import { BadgeCheck, CalendarDays, Trophy, Users } from "lucide-react";

type StatsBandProps = {
  licenceCount: number;
  slotsCount: number;
  teamsCount: number;
};

export function StatsBand({
  licenceCount,
  slotsCount,
  teamsCount,
}: StatsBandProps) {
  return (
    <section className="stats-band" aria-label="Indicateurs du club">
      <article>
        <Users size={22} />
        <strong>{licenceCount}</strong>
        <span>Licencies</span>
      </article>
      <article>
        <CalendarDays size={22} />
        <strong>{slotsCount}</strong>
        <span>Creneaux hebdo</span>
      </article>
      <article>
        <Trophy size={22} />
        <strong>{teamsCount}</strong>
        <span>Equipes interclub</span>
      </article>
      <article>
        <BadgeCheck size={22} />
        <strong>FFBad</strong>
        <span>Affiliation club</span>
      </article>
    </section>
  );
}
