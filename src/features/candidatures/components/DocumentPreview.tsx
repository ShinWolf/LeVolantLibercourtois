import { RegistrationMode } from "../../../types";

type DocumentPreviewProps = {
  registrationMode: RegistrationMode;
};

export function DocumentPreview({ registrationMode }: DocumentPreviewProps) {
  const fields = [
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
  ];

  return (
    <div className="document-preview">
      <h3>« Dossier d'inscription pour les {registrationMode} »</h3>
      <div className="pdf-viewer" aria-label="Apercu du formulaire PDF">
        <div className="pdf-toolbar">
          <span>☰</span>
          <strong>
            {registrationMode === "mineur"
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
            {fields.map((field) => (
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
            <p>
              J'accepte que la federation utilise mes informations pour mon
              adhesion.
            </p>
            <span />
            <p>
              Je reconnais avoir pris connaissance des conditions de licence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
