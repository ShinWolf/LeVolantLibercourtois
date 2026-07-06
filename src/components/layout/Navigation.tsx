import { navItems } from "../../data/constants";

type NavigationProps = {
  isAdmin: boolean;
  onUnlockAdmin: () => void;
  isOpen: boolean;
  setMenuOpen: (open: boolean) => void;
};

export function Navigation({
  isAdmin,
  onUnlockAdmin,
  isOpen,
  setMenuOpen,
}: NavigationProps) {
  return (
    <nav
      className={isOpen ? "nav nav-open" : "nav"}
      aria-label="Navigation principale"
    >
      {navItems.map((item) => {
        if (item.id === "admin") {
          return (
            <button
              key={item.id}
              type="button"
              className="nav-admin-btn"
              onClick={() => {
                setMenuOpen(false);
                if (!isAdmin) {
                  onUnlockAdmin();
                } else {
                  window.location.hash = "admin";
                }
              }}
            >
              {isAdmin ? "🔒 Admin (Actif)" : "Admin"}
            </button>
          );
        }

        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
