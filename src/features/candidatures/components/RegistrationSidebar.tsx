import { ChangeEvent } from "react";
import { RegistrationMode } from "../../../types";
import { Download, ExternalLink, FileText } from "lucide-react";
import { ADULT_DOCUMENTS, YOUTH_DOCUMENTS } from "../../../data/constants";

type RegistrationSidebarProps = {
  registrationMode: RegistrationMode;
  onModeChange: (mode: RegistrationMode) => void;
  applicationPdf: string;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedDocUrl: string;
  onSelectDoc: (url: string) => void;
};

export function RegistrationSidebar({
  registrationMode,
  onModeChange,
  selectedDocUrl,
  onSelectDoc,
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
          Mineurs ({YOUTH_DOCUMENTS.length} Docs)
        </button>
        <button
          className={registrationMode === "adulte" ? "filter-active" : ""}
          type="button"
          onClick={() => onModeChange("adulte")}
        >
          Adultes ({ADULT_DOCUMENTS.length} Docs)
        </button>
      </div>

      <p className="section-copy" style={{ fontSize: "13px" }}>
        Cliquez sur un document pour l'éditer à droite. Remplissez-le,
        téléchargez-le sur votre PC, puis renvoyez-le complété.
      </p>

      <div className="download-docs-list">
        {currentDocs.map((doc, index) => {
          const isActive = selectedDocUrl === doc.url;
          return (
            <button
              key={index}
              type="button"
              className={`secondary-action download-doc-link ${isActive ? "filter-active" : ""}`}
              onClick={() => onSelectDoc(doc.url)} // Change le PDF affiché au clic
            >
              <span>{doc.label}</span>
              <a
                href={doc.url}
                download={doc.fileName}
                title="Télécharger le fichier brut"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: "flex",
                  color: isActive ? "white" : "var(--green)",
                }}
              >
                <Download size={14} className="download-icon" />
              </a>
            </button>
          );
        })}
      </div>

      <div className="pdf-upload">
        <label>
          Sélectionnez vos documents complétés (PDF, ZIP)
          <input
            accept="application/pdf,.pdf,.zip"
            type="file"
            multiple
            onChange={onFileChange}
          />
        </label>

        <div className="pdf-status">
          <div>
            <FileText size={18} style={{ flexShrink: 0 }} />
            <span style={{ fontSize: "13px" }}>
              {applicationPdf || "Aucun fichier sélectionné"}
            </span>
          </div>
        </div>

        <button
          className="primary-action full-width"
          type="button"
          onClick={() => {
            if (!applicationPdf) {
              alert("⚠️ Veuillez sélectionner au moins un document complété !");
              return;
            }
            alert(
              `🎉 Coté Serveur (Bientôt) : Les fichiers vont être regroupés dans un ZIP unique, puis envoyés par mail au club !`,
            );
          }}
        >
          Envoyer le dossier complet
        </button>
      </div>
    </aside>
  );
}
