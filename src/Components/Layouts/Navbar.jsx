import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import { useCategories } from "../../Hooks/UseCategories";

const links = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: categories } = useCategories();
  const categoryLinks = (categories || []).map((category) => ({
    to: `/category/${category.fields.slug}`,
    label: category.fields.title,
  }));
  const allLinks = [...links, ...categoryLinks];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg text-gray-900">
          The<span className="text-blue-600">Blog</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {allLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"
                }`
              }
              end={link.to === "/"}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="block w-6 h-0.5 bg-gray-900 mb-1.5" />
          <span className="block w-6 h-0.5 bg-gray-900 mb-1.5" />
          <span className="block w-6 h-0.5 bg-gray-900" />
        </button>
      </nav>

      <MobileMenu open={menuOpen} links={allLinks} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
