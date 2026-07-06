import { LayoutDashboard } from "lucide-react";
import { SyntheticEvent } from "react";
import { AddNewsForm } from "./components/AddNewsForm";
import { CandidateList } from "./components/CandidateList";
import { QuickActions } from "./components/QuickActions";
import { Candidate } from "../../types";

type AdminSectionProps = {
  onAddNews: (event: SyntheticEvent<HTMLFormElement>) => void;
  candidates: Candidate[];
};

export function AdminSection({ onAddNews, candidates }: AdminSectionProps) {
  return (
    <section id="admin" className="content-section admin-section">
      <div className="section-heading">
        <span className="section-icon">
          <LayoutDashboard size={20} />
        </span>
        <div>
          <p className="eyebrow">Vue administrateur</p>
          <h2>Gestion du contenu</h2>
        </div>
      </div>

      <div className="admin-grid">
        <AddNewsForm onSubmit={onAddNews} />

        <CandidateList candidates={candidates} />

        <QuickActions />
      </div>
    </section>
  );
}
