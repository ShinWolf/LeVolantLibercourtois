type DocumentPreviewProps = {
  selectedDocUrl?: string;
};

export function DocumentPreview({ selectedDocUrl }: DocumentPreviewProps) {
  return (
    <div className="document-preview">
      <h3>Aperçu & Remplissage en ligne</h3>

      <div
        className="pdf-viewer"
        style={{ border: "none", background: "transparent" }}
      >
        <div className="pdf-container-embed" style={{ height: "780px" }}>
          {selectedDocUrl ? (
            <embed
              src={`${selectedDocUrl}#toolbar=1&navpanes=0`}
              type="application/pdf"
              width="100%"
              height="100%"
              className="actual-pdf-embed"
            />
          ) : (
            <div className="pdf-error-placeholder">
              Sélectionnez un document à gauche pour l'afficher.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
