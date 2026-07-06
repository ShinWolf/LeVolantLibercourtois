import { ChevronRight } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="hero-media" aria-hidden="true">
        <div className="court-lines">
          <span />
          <span />
          <span />
        </div>
        <div className="shuttle">
          <span />
        </div>
      </div>
      <div className="hero-content">
        <p className="eyebrow">Libercourt - Saison 2026</p>
        <h1>
          Le club de badminton qui fait vivre le gymnase toute la semaine.
        </h1>
        <p>
          Actualites, entrainements, competitions, candidatures et gestion de
          contenu reunis dans une premiere experience front-end claire et
          evolutive.
        </p>
        <div className="hero-actions">
          <a className="primary-action" href="#planning">
            Voir le planning <ChevronRight size={18} />
          </a>
          <a className="secondary-action" href="#candidatures">
            Candidater
          </a>
        </div>
      </div>
    </section>
  );
}
