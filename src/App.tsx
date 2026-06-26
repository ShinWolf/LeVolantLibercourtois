import {
  BadgeCheck,
  CalendarDays,
  CalendarRange,
  ChevronRight,
  ClipboardList,
  Dumbbell,
  ExternalLink,
  FilePlus2,
  FileText,
  LayoutDashboard,
  Megaphone,
  Menu,
  Newspaper,
  Plus,
  ShieldCheck,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";

type NewsItem = {
  title: string;
  category: string;
  date: string;
  description: string;
  image: string;
};

type PlanningItem = {
  title: string;
  type: "Entrainement" | "Competition" | "Interclub";
  day: string;
  date: string;
  time: string;
  location: string;
};

type Candidate = {
  name: string;
  profile: string;
  status: "A contacter" | "Dossier FFBad" | "Valide";
};

const initialNews: NewsItem[] = [
  {
    title: "Reprise des entrainements jeunes",
    category: "Club",
    date: "03 sept.",
    description:
      "Les creneaux jeunes reprennent au gymnase avec deux groupes adaptes au niveau et a l'age.",
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Tournoi interne de rentree",
    category: "Evenement",
    date: "14 sept.",
    description:
      "Double surprise, buvette associative et finales en fin d'apres-midi pour lancer la saison.",
    image:
      "https://images.unsplash.com/photo-1613918431703-aa50889e3be7?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Nouvelles tenues du club",
    category: "Vie du club",
    date: "21 sept.",
    description:
      "Essayages disponibles pendant les entrainements adultes avant la commande groupee.",
    image:
      "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?auto=format&fit=crop&w=900&q=80",
  },
];

const planning: PlanningItem[] = [
  {
    title: "Adultes loisirs",
    type: "Entrainement",
    day: "Lundi",
    date: "2026-09-07",
    time: "19:30 - 22:00",
    location: "Salle Pierre de Coubertin",
  },
  {
    title: "Jeunes U11 / U15",
    type: "Entrainement",
    day: "Mercredi",
    date: "2026-09-09",
    time: "17:30 - 19:00",
    location: "Gymnase municipal",
  },
  {
    title: "Equipe interclub D2",
    type: "Interclub",
    day: "Vendredi",
    date: "2026-09-11",
    time: "20:00 - 23:00",
    location: "Libercourt",
  },
  {
    title: "Championnat departemental",
    type: "Competition",
    day: "Dimanche",
    date: "2026-09-13",
    time: "08:30 - 18:00",
    location: "Complexe sportif Henin-Beaumont",
  },
  {
    title: "Stage jeunes vacances",
    type: "Entrainement",
    day: "Mardi",
    date: "2026-10-27",
    time: "14:00 - 17:00",
    location: "Gymnase municipal",
  },
  {
    title: "Interclub equipe D1",
    type: "Interclub",
    day: "Samedi",
    date: "2026-11-21",
    time: "18:00 - 22:30",
    location: "Carvin",
  },
  {
    title: "Tournoi regional doubles",
    type: "Competition",
    day: "Dimanche",
    date: "2027-01-17",
    time: "08:00 - 19:00",
    location: "Lens",
  },
];

const candidates: Candidate[] = [
  { name: "Camille Martin", profile: "Adulte debutant", status: "A contacter" },
  { name: "Noah Lefevre", profile: "Jeune U15", status: "Dossier FFBad" },
  { name: "Sarah Dubois", profile: "Mutation interclub", status: "Valide" },
];

const navItems = [
  { id: "actualites", label: "Actualites" },
  { id: "planning", label: "Planning" },
  { id: "candidatures", label: "Candidatures" },
  { id: "admin", label: "Admin" },
];

const weekDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const seasonMonths = ["Sept.", "Oct.", "Nov.", "Dec.", "Jan.", "Fev.", "Mars", "Avr.", "Mai", "Juin"];
const pdfPlaceholderHref =
  "data:application/pdf;charset=utf-8,%25PDF-1.4%0A%25%20Formulaire%20d'inscription%20placeholder%20-%20remplacer%20par%20le%20PDF%20FFBad%20officiel%0A";

function App() {
  const [news, setNews] = useState(initialNews);
  const [selectedType, setSelectedType] = useState<PlanningItem["type"] | "Tous">("Tous");
  const [planningView, setPlanningView] = useState<"semaine" | "mois" | "annee">("semaine");
  const [registrationMode, setRegistrationMode] = useState<"mineurs" | "adultes">("mineurs");
  const [applicationPdf, setApplicationPdf] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const registrationFileName =
    registrationMode === "mineurs"
      ? "dossier-inscription-mineurs-ffbad.pdf"
      : "dossier-inscription-adultes-ffbad.pdf";

  const filteredPlanning = useMemo(() => {
    if (selectedType === "Tous") {
      return planning;
    }

    return planning.filter((item) => item.type === selectedType);
  }, [selectedType]);

  function handleAddNews(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") || "").trim();
    const description = String(form.get("description") || "").trim();
    const imageUrl = String(form.get("imageUrl") || "").trim();
    const imageFile = form.get("imageFile");

    if (!title || !description) {
      return;
    }

    const uploadedImage =
      imageFile instanceof File && imageFile.size > 0 ? URL.createObjectURL(imageFile) : "";

    setNews((currentNews) => [
      {
        title,
        description,
        category: String(form.get("category") || "Club"),
        date: "Aujourd'hui",
        image: uploadedImage || imageUrl || "/placeholder-news.svg",
      },
      ...currentNews,
    ]);
    event.currentTarget.reset();
  }

  function handlePdfSelection(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    setApplicationPdf(file ? file.name : "");
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Accueil Le Volant Libercourtois">
          <span className="brand-mark">LVL</span>
          <span>
            <strong>Le Volant Libercourtois</strong>
            <small>Badminton club</small>
          </span>
        </a>

        <button
          className="icon-button mobile-only"
          type="button"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
          aria-label="Ouvrir le menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav className={menuOpen ? "nav nav-open" : "nav"} aria-label="Navigation principale">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

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
          <h1>Le club de badminton qui fait vivre le gymnase toute la semaine.</h1>
          <p>
            Actualites, entrainements, competitions, candidatures et gestion de contenu reunis
            dans une premiere experience front-end claire et evolutive.
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

      <section className="stats-band" aria-label="Indicateurs du club">
        <article>
          <Users size={22} />
          <strong>96</strong>
          <span>Licencies</span>
        </article>
        <article>
          <CalendarDays size={22} />
          <strong>6</strong>
          <span>Creneaux hebdo</span>
        </article>
        <article>
          <Trophy size={22} />
          <strong>3</strong>
          <span>Equipes interclub</span>
        </article>
        <article>
          <BadgeCheck size={22} />
          <strong>FFBad</strong>
          <span>Affiliation club</span>
        </article>
      </section>

      <section id="actualites" className="content-section">
        <div className="section-heading">
          <span className="section-icon">
            <Newspaper size={20} />
          </span>
          <div>
            <p className="eyebrow">Vie du club</p>
            <h2>Actualites</h2>
          </div>
        </div>

        <div className="news-grid">
          {news.map((item) => (
            <article className="news-card" key={`${item.title}-${item.date}`}>
              <img src={item.image} alt="" />
              <div className="news-card-body">
                <div className="news-meta">
                  <span>{item.category}</span>
                  <time>{item.date}</time>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button className="text-button" type="button">
                  Lire <ChevronRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

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

        <div className="filters" aria-label="Filtrer le planning">
          {["Tous", "Entrainement", "Competition", "Interclub"].map((type) => (
            <button
              className={selectedType === type ? "filter-active" : ""}
              key={type}
              type="button"
              onClick={() => setSelectedType(type as PlanningItem["type"] | "Tous")}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="timeline">
          {filteredPlanning.map((item) => (
            <article className="timeline-item" key={`${item.title}-${item.day}`}>
              <span className={`type-pill ${item.type.toLowerCase()}`}>{item.type}</span>
              <h3>{item.title}</h3>
              <p>{item.day} - {item.time}</p>
              <small>{item.location}</small>
            </article>
          ))}
        </div>

        <div className="large-planning">
          <div className="large-planning-header">
            <div>
              <p className="eyebrow">Vue grand format</p>
              <h3>Calendrier de la saison</h3>
            </div>
            <div className="view-switcher" aria-label="Changer la vue du planning">
              {["semaine", "mois", "annee"].map((view) => (
                <button
                  className={planningView === view ? "filter-active" : ""}
                  key={view}
                  type="button"
                  onClick={() => setPlanningView(view as "semaine" | "mois" | "annee")}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>

          {planningView === "semaine" && (
            <div className="week-calendar">
              {weekDays.map((day) => (
                <article className="calendar-day" key={day}>
                  <strong>{day}</strong>
                  {filteredPlanning
                    .filter((item) => item.day === day)
                    .map((item) => (
                      <div className="calendar-event" key={`${item.title}-${item.date}`}>
                        <span className={`type-pill ${item.type.toLowerCase()}`}>{item.type}</span>
                        <b>{item.title}</b>
                        <small>{item.time}</small>
                      </div>
                    ))}
                </article>
              ))}
            </div>
          )}

          {planningView === "mois" && (
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
                      <span className={`compact-event ${item.type.toLowerCase()}`} key={item.title}>
                        {item.title}
                      </span>
                    ))}
                  </article>
                );
              })}
            </div>
          )}

          {planningView === "annee" && (
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
                        <span className={`compact-event ${item.type.toLowerCase()}`} key={item.title}>
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
          )}
        </div>
      </section>

      <section id="candidatures" className="content-section registration-section">
        <div className="section-heading">
          <span className="section-icon">
            <ClipboardList size={20} />
          </span>
          <div>
            <p className="eyebrow">Adhesions</p>
            <h2>Dossier d'inscription</h2>
          </div>
        </div>

        <div className="registration-layout">
          <aside className="registration-sidebar">
            <p className="notice">Aucun document papier ne sera pris en compte.</p>
            <div className="mode-switcher" aria-label="Choisir le dossier d'inscription">
              <button
                className={registrationMode === "mineurs" ? "filter-active" : ""}
                type="button"
                onClick={() => setRegistrationMode("mineurs")}
              >
                Mineurs
              </button>
              <button
                className={registrationMode === "adultes" ? "filter-active" : ""}
                type="button"
                onClick={() => setRegistrationMode("adultes")}
              >
                Adultes
              </button>
            </div>
            <p className="section-copy">
              Le membre telecharge le formulaire, le complete, puis renvoie le PDF depuis cette
              page. Le lien FFBad reste disponible pour les dossiers qui passent directement par la
              federation.
            </p>
            <div className="candidate-actions">
              <a className="primary-action" href="https://www.ffbad.org/" target="_blank" rel="noreferrer">
                FFBad <ExternalLink size={17} />
              </a>
              <a className="secondary-action" href={pdfPlaceholderHref} download={registrationFileName}>
                Télécharger
              </a>
            </div>

            <div className="pdf-upload">
              <label>
                Retourner le PDF complete
                <input accept="application/pdf,.pdf" type="file" onChange={handlePdfSelection} />
              </label>
              <div className="pdf-status">
                <FileText size={18} />
                <span>{applicationPdf || "Aucun PDF selectionne"}</span>
              </div>
              <button className="primary-action full-width" type="button">
                Envoyer le dossier
              </button>
            </div>
          </aside>

          <div className="document-preview">
            <h3>« Dossier d'inscription pour les {registrationMode} »</h3>
            <div className="pdf-viewer" aria-label="Apercu du formulaire PDF">
              <div className="pdf-toolbar">
                <span>☰</span>
                <strong>
                  {registrationMode === "mineurs"
                    ? "JEUNES_Formulaire_inscription.pdf"
                    : "ADULTES_Formulaire_inscription.pdf"}
                </strong>
                <span>1 / 2</span>
                <span>100%</span>
                <span>⌕</span>
                <span>⇩</span>
                <span>⋮</span>
              </div>

              <div className="pdf-paper">
                <div className="pdf-brand-row">
                  <div className="ffbad-logo">FFBad</div>
                  <div>
                    <strong>FEDERATION FRANCAISE DE BADMINTON</strong>
                    <span>www.ffbad.org</span>
                  </div>
                </div>
                <div className="pdf-title-row">
                  <h4>DEMANDE DE LICENCE 2025 / 2026</h4>
                  <strong>POUR LES {registrationMode.toUpperCase()}</strong>
                </div>
                <div className="fake-form-grid">
                  {[
                    "Club",
                    "Ligue",
                    "Nom",
                    "Prenom",
                    "Ne(e) le",
                    "Adresse",
                    "Code postal",
                    "Ville",
                    "E-mail",
                    "Telephone",
                  ].map((field) => (
                    <label key={field}>
                      <span>{field}</span>
                      <i />
                    </label>
                  ))}
                </div>
                <div className="fake-checks">
                  <span />
                  <p>Je suis en situation de handicap</p>
                  <span />
                  <p>J'accepte que la federation utilise mes informations pour mon adhesion.</p>
                  <span />
                  <p>Je reconnais avoir pris connaissance des conditions de licence.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="admin" className="content-section admin-section">
        <div className="section-heading">
          <span className="section-icon">
            <LayoutDashboard size={20} />
          </span>
          <div>
            <p className="eyebrow">Vue administrateur</p>
            <h2>Gestion du contenu</h2>
          </div>
        </div>

        <div className="admin-grid">
          <form className="admin-panel" onSubmit={handleAddNews}>
            <div className="panel-title">
              <Megaphone size={20} />
              <h3>Ajouter une actualite</h3>
            </div>
            <label>
              Titre
              <input name="title" placeholder="Titre de l'actualite" />
            </label>
            <label>
              Categorie
              <select name="category" defaultValue="Club">
                <option>Club</option>
                <option>Evenement</option>
                <option>Competition</option>
                <option>Vie du club</option>
              </select>
            </label>
            <label>
              Contenu
              <textarea name="description" placeholder="Resume visible sur le site" rows={4} />
            </label>
            <label>
              Photo depuis l'ordinateur
              <input name="imageFile" type="file" accept="image/*" />
            </label>
            <label>
              Ou URL d'image
              <input name="imageUrl" placeholder="https://..." type="url" />
            </label>
            <button className="primary-action full-width" type="submit">
              <Plus size={18} /> Publier
            </button>
          </form>

          <div className="admin-panel">
            <div className="panel-title">
              <ShieldCheck size={20} />
              <h3>Suivi candidatures</h3>
            </div>
            <div className="candidate-list">
              {candidates.map((candidate) => (
                <article key={candidate.name}>
                  <div>
                    <strong>{candidate.name}</strong>
                    <span>{candidate.profile}</span>
                  </div>
                  <small>{candidate.status}</small>
                </article>
              ))}
            </div>
          </div>

          <div className="admin-panel quick-actions">
            <div className="panel-title">
              <FilePlus2 size={20} />
              <h3>Prochaines briques</h3>
            </div>
            <button type="button"><CalendarDays size={18} /> Ajouter un creneau</button>
            <button type="button"><Dumbbell size={18} /> Declarer un interclub</button>
            <button type="button"><Trophy size={18} /> Publier un resultat</button>
          </div>
        </div>
      </section>
    </main>
  );
}

export { App };
