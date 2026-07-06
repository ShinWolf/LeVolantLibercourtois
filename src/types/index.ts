export type NewsItem = {
  title: string;
  category: string;
  date: string;
  description: string;
  image: string;
};

export type PlanningItem = {
  title: string;
  type: "Entrainement" | "Competition" | "Interclub";
  day: string;
  date: string;
  time: string;
  location: string;
};

export type Candidate = {
  name: string;
  profile: string;
  status: "A contacter" | "Dossier FFBad" | "Valide";
};

export type PlanningViewMode = "semaine" | "mois" | "annee";
export type RegistrationMode = "mineur" | "adulte";
