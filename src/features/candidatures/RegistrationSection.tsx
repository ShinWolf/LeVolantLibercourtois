import { ClipboardList } from "lucide-react";
import { useRegistration } from "./hooks/useRegistration";
import { RegistrationSidebar } from "./components/RegistrationSidebar";
import { DocumentPreview } from "./components/DocumentPreview";

export function RegistrationSection() {
  const {
    registrationMode,
    setRegistrationMode,
    applicationPdf,
    registrationFileName,
    pdfPlaceholderHref,
    handlePdfSelection,
  } = useRegistration();

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
          onModeChange={setRegistrationMode}
          applicationPdf={applicationPdf}
          registrationFileName={registrationFileName}
          pdfPlaceholderHref={pdfPlaceholderHref}
          onFileChange={handlePdfSelection}
        />

        <DocumentPreview registrationMode={registrationMode} />
      </div>
    </section>
  );
}
