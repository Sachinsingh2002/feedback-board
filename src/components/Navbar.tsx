
import { Link, useLocation } from "react-router-dom";

const navs = [
  { label: "Leave Feedback", to: "/" },
  { label: "Admin Dashboard", to: "/dashboard" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <nav className="flex items-center justify-between py-6 px-8 shadow bg-background">
      <div className="text-xl font-bold tracking-tight">📝 Feedback Tool</div>
      <div className="flex gap-3">
        {navs.map(nav => (
          <Link
            key={nav.to}
            to={nav.to}
            className={`px-3 py-2 font-medium text-base rounded-md transition-colors ${
              pathname === nav.to
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            {nav.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
