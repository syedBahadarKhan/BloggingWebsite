import { NavLink } from "react-router-dom";

export default function MobileMenu({ open, links, onClose }) {
  if (!open) return null;

  return (
    <div className="md:hidden border-t border-gray-100 bg-white">
      <div className="px-4 py-3 flex flex-col gap-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={onClose}
            className={({ isActive }) =>
              `py-2.5 text-sm font-medium ${
                isActive ? "text-blue-600" : "text-gray-700"
              }`
            }
            end={link.to === "/"}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
