import { useState } from "react";
import { RegistrationMode } from "../../../types";
import { pdfPlaceholderHref } from "../../../data/constants";

export function useRegistration() {
  const [registrationMode, setRegistrationMode] =
    useState<RegistrationMode>("mineur");
  const [applicationPdf, setApplicationPdf] = useState("");

  const registrationFileName =
    registrationMode === "mineur"
      ? "dossier-inscription-mineurs-ffbad.pdf"
      : "dossier-inscription-adultes-ffbad.pdf";

  function handlePdfSelection(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    setApplicationPdf(file ? file.name : "");
  }

  return {
    registrationMode,
    setRegistrationMode,
    applicationPdf,
    setApplicationPdf,
    registrationFileName,
    pdfPlaceholderHref,
    handlePdfSelection,
  };
}
