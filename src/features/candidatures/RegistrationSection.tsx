import { ClipboardList } from "lucide-react";
import { useState, useEffect } from "react";
import { useRegistration } from "./hooks/useRegistration";
import { RegistrationSidebar } from "./components/RegistrationSidebar";
import { DocumentPreview } from "./components/DocumentPreview";
import { ADULT_DOCUMENTS, YOUTH_DOCUMENTS } from "../../data/constants";

export function RegistrationSection() {
  const {
    registrationMode,
    setRegistrationMode,
    applicationPdf,
    handlePdfSelection,
  } = useRegistration();

  // 1. On initialise l'URL du PDF affiché avec le premier document de la liste par défaut
  const defaultDocs =
    registrationMode === "mineur" ? YOUTH_DOCUMENTS : ADULT_DOCUMENTS;
  const [selectedDocUrl, setSelectedDocUrl] = useState<string>(
    defaultDocs[0]?.url || "",
  );

  // 2. Dès que l'utilisateur change de mode (Mineurs <-> Adultes), on met automatiquement à jour l'aperçu avec le premier PDF du nouveau mode
  useEffect(() => {
    const docs =
      registrationMode === "mineur" ? YOUTH_DOCUMENTS : ADULT_DOCUMENTS;
    setSelectedDocUrl(docs[0]?.url || "");
  }, [registrationMode]);

  return (
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
        {/* 3. On passe les nouvelles propriétés de sélection à la Sidebar */}
        <RegistrationSidebar
          registrationMode={registrationMode}
          onModeChange={setRegistrationMode}
          selectedDocUrl={selectedDocUrl}
          onSelectDoc={setSelectedDocUrl}
          applicationPdf={applicationPdf}
          onFileChange={handlePdfSelection}
        />

        {/* 4. On passe l'URL du document sélectionné à l'Aperçu au lieu du mode global */}
        <DocumentPreview
          selectedDocUrl={selectedDocUrl}
          registrationMode={"mineur"}
        />
      </div>
    </section>
  );
}
