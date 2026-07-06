export const navItems = [
  { id: "actualites", label: "Actualites" },
  { id: "planning", label: "Planning" },
  { id: "candidatures", label: "Candidatures" },
  { id: "admin", label: "Admin" },
];

export const pdfPlaceholderHref =
  "data:application/pdf;charset=utf-8,%25PDF-1.4%0A%25%20Formulaire%20d'inscription%20placeholder%20-%20remplacer%20par%20le%20PDF%20FFBad%20officiel%0A";

export type RegistrationDoc = {
  label: string;
  fileName: string;
  url: string;
};

export const ADULT_DOCUMENTS: RegistrationDoc[] = [
  {
    label: "1. Formulaire d'inscription Adulte (Obligatoire)",
    fileName: "inscription_adulte_2026.pdf",
    url: "/docs/adultes/Inscriptions_LVL_2025_2026_adulte_modifiable.pdf",
  },
  {
    label: "2. Formulaire Licence FFBad",
    fileName: "licence_ffbad_adulte.pdf",
    url: "/docs/adultes/ADULTES_Formulaire_inscription_FFBAD_c4d922215c.pdf",
  },
  {
    label: "3. Questionnaire de Sante",
    fileName: "questionnaire_sante_adulte.pdf",
    url: "/docs/adultes/ADULTES_Formulaire_sante_FFBAD_4105279405.pdf",
  },
  {
    label: "4. Certificat Medical (si necessaire)",
    fileName: "ADULTES_Certificat_Medical.pdf",
    url: "/docs/adultes/ADULTES_Certificat_Medical_95ce174f6b.pdf",
  },
  {
    label: "5. Inscription Competiteur (si necessaire)",
    fileName: "adulte_competiteur.pdf",
    url: "/docs/adultes/Fiche_Adulte_Competiteur_Loisir_2025_2026_modifiable.pdf",
  },
  {
    label: "6. Acces aux complexes sportifs",
    fileName: "acces_complexes_sportifs.pdf",
    url: "/docs/adultes/Acces_Complexe_sportif_Adulte_Modifiable.pdf",
  },
];

export const YOUTH_DOCUMENTS: RegistrationDoc[] = [
  {
    label: "1. Formulaire d'inscription Mineur (Obligatoire)",
    fileName: "inscription_mineur_2026.pdf",
    url: "/docs/mineurs/Inscriptions_LVL_2025_2026_enfant_modifiable.pdf",
  },
  {
    label: "2. Formulaire Licence FFBad Jeune",
    fileName: "licence_ffbad_jeune.pdf",
    url: "/docs/mineurs/JEUNES_Formulaire_inscription_FFBAD_4263ef3ccc.pdf",
  },
  {
    label: "3. Certificat Medical",
    fileName: "certificat_medicale.pdf",
    url: "/docs/mineurs/JEUNES_Certificat_medicale_d4ebcd011f.pdf",
  },
  {
    label: "4. Questionnaire de Sante",
    fileName: "questionnaire_sante_ffbad.pdf",
    url: "/docs/mineurs/JEUNES_Formulaire_sante_FFBAD_4cd00beff4.pdf",
  },
  {
    label: "5. Jeune Competiteur (si necessaire)",
    fileName: "jeune_competiteur.pdf",
    url: "/docs/mineurs/Fiche_Enfant_Competiteur_Loisir_2025_2026_modifiable.pdf",
  },
];
