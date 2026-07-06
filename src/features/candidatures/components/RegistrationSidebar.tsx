import { ChangeEvent } from "react";
import { RegistrationMode } from "../../../types";
import { Download, ExternalLink, FileText } from "lucide-react";
import { ADULT_DOCUMENTS, YOUTH_DOCUMENTS } from "../../../data/constants";

type RegistrationSidebarProps = {
  registrationMode: RegistrationMode;
  onModeChange: (mode: RegistrationMode) => void;
  applicationPdf: string;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function RegistrationSidebar({
  registrationMode,
  onModeChange,
  applicationPdf,
  onFileChange,
}: RegistrationSidebarProps) {
  const currentDocs =
    registrationMode === "mineur" ? YOUTH_DOCUMENTS : ADULT_DOCUMENTS;
  return (
    <aside className="registration-sidebar">
      <p className="notice">Aucun document papier ne sera pris en compte.</p>

      <div className="mode-switcher">
        <button
          className={registrationMode === "mineur" ? "filter-active" : ""}
          type="button"
          onClick={() => onModeChange("mineur")}
        >
          Mineurs ({YOUTH_DOCUMENTS.length} docs)
        </button>
        <button
          className={registrationMode === "adulte" ? "filter-active" : ""}
          type="button"
          onClick={() => onModeChange("adulte")}
        >
          Adultes ({ADULT_DOCUMENTS.length} docs)
        </button>
      </div>

      <p className="section-copy">
        Veuillez telecharger et completer **l'ensemble des pieces** ci-dessous
        avant de retourner votre dossier.
      </p>

      <div className="download-docs-list">
        {currentDocs.map((doc, index) => (
          <a
            key={index}
            href={doc.url}
            download={doc.fileName}
            className="secondary-action"
          >
            <span>{doc.label}</span>
            <Download size={14} />
          </a>
        ))}
      </div>

      <div className="pdf-upload">
        <label>
          Retourner vos documents (compresses en un seul PDF ou ZIP)
          <input
            accept="application/pdf,.pdf,.zip"
            type="file"
            onChange={onFileChange}
          />
        </label>
        <div className="pdf-status">
          <FileText size={18} />
          <span>{applicationPdf || "Aucun fichier selectionne"}</span>
        </div>
        <button className="primary-action full-width" type="button">
          Envoyer le dossier complété
        </button>
      </div>
    </aside>
  );
}
