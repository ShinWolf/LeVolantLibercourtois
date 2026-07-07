import { ClipboardList } from "lucide-react";
import { useState } from "react";
import { useRegistration } from "./hooks/useRegistration";
import { RegistrationSidebar } from "./components/RegistrationSidebar";
import { DocumentPreview } from "./components/DocumentPreview";
import { ADULT_DOCUMENTS, YOUTH_DOCUMENTS } from "../../data/constants";
import { RegistrationMode } from "../../types";

export function RegistrationSection() {
  const {
    registrationMode,
    setRegistrationMode,
    currentDocs,
    applicationPdf,
    handlePdfSelection,
  } = useRegistration();

  const [selectedDocUrl, setSelectedDocUrl] = useState<string>(
    currentDocs[0]?.url || "",
  );

  function handleModeChange(mode: RegistrationMode) {
    setRegistrationMode(mode);
    const docsForMode = mode === "mineur" ? YOUTH_DOCUMENTS : ADULT_DOCUMENTS;
    setSelectedDocUrl(docsForMode[0]?.url || "");
  }

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
        <RegistrationSidebar
          registrationMode={registrationMode}
          onModeChange={handleModeChange}
          currentDocs={currentDocs}
          selectedDocUrl={selectedDocUrl}
          onSelectDoc={setSelectedDocUrl}
          applicationPdf={applicationPdf}
          onFileChange={handlePdfSelection}
        />

        <DocumentPreview selectedDocUrl={selectedDocUrl} />
      </div>
    </section>
  );
}
