import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Navigation } from "./Navigation";

type HeaderProps = {
  isAdmin: boolean;
  onUnlockAdmin: () => void;
};

export function Header({ isAdmin, onUnlockAdmin }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="site-header">
      <a
        className="brand"
        href="#top"
        aria-label="Accueil Le Volant Libercourtois"
      >
        <span className="brand-mark">LVL</span>
        <span>
          <strong>Le Volant Libercourtois</strong>
          <small>Badminton club</small>
        </span>
      </a>

      <button
        className="icon-button mobile-only"
        type="button"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <Navigation
        isAdmin={isAdmin}
        onUnlockAdmin={onUnlockAdmin}
        isOpen={isOpen}
        setMenuOpen={setIsOpen}
      />
    </header>
  );
}
