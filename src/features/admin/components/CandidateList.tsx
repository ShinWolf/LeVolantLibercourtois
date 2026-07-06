import { ShieldCheck } from "lucide-react";
import { Candidate } from "../../../types";

type CandidateListProps = {
  candidates: Candidate[];
};

export function CandidateList({ candidates }: CandidateListProps) {
  return (
    <div className="admin-panel">
      <div className="panel-title">
        <ShieldCheck size={20} />
        <h3>Suivi candidatures</h3>
      </div>
      <div className="candidate-list">
        {candidates.map((candidate) => (
          <article key={candidate.name}>
            <div>
              <strong>{candidate.name}</strong>
              <span>{candidate.profile}</span>
            </div>
            <small>{candidate.status}</small>
          </article>
        ))}
      </div>
    </div>
  );
}
