import { ChangeEvent, useState } from "react";
import { candidates } from "./data/InitialCandidates";
import { Header } from "./components/layout/Header";
import { Hero } from "./components/ui/Hero";
import { StatsBand } from "./components/ui/StatsBand";
import { NewsSection } from "./features/news/NewsSection";
import { useNews } from "./features/news/hooks/useNews";
import { AdminSection } from "./features/admin/AdminSection";
import { PlanningSection } from "./features/planning/PlanningSection";
import { RegistrationSection } from "./features/candidatures/RegistrationSection";

function App() {
  const [stats, setStats] = useState({
    licenceCount: 120,
    slotsCount: 5,
    teamsCount: 3,
  });

  const { news, handleAddNews } = useNews();

  const [isAdmin, setIsAdmin] = useState(false);

  const handleUnlockAdmin = () => {
    const password = prompt("Entrez le mot de passe administrateur :");
    if (password === "lvl2026") {
      setIsAdmin(true);
      window.location.hash = "admin";
    } else {
      alert("Mot de passe incorrect ❌");
    }
  };
  return (
    <main>
      {/* Header */}
      <Header isAdmin={isAdmin} onUnlockAdmin={handleUnlockAdmin} />

      {/* Hero section */}
      <Hero />

      {/* Stats band */}
      <StatsBand
        licenceCount={stats.licenceCount}
        slotsCount={stats.slotsCount}
        teamsCount={stats.teamsCount}
      />

      {/* News section */}
      <NewsSection news={news} />

      {/* Planning section */}
      <PlanningSection />

      {/* Registration section */}
      <RegistrationSection />

      {/* Admin panel */}
      {isAdmin && (
        <AdminSection onAddNews={handleAddNews} candidates={candidates} />
      )}
    </main>
  );
}

export { App };
