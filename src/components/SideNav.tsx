import { NavLink } from "react-router";

export const SideNav = () => {
  const links = [
    { path: "/", title: "Home" },
    { path: "/encrypt", title: "Encrypt" },
    { path: "/decrypt", title: "Decrypt" },
    { path: "/disclaimer", title: "Disclaimer" },
  ];
  return (
    <nav className="fixed left-0 top-0 bottom-0 w-64 h-full bg-zinc-900 z-20 py-20 text-2xl flex flex-col space-y-2 border-r border-green-200/40 shadow-2xl">
      {links.map((link) => {
        return (
          <NavLink
            to={link.path}
            className={({ isActive }) =>
              isActive
                ? "w-full flex justify-start py-1 pl-12 text-green-300 border-l-2 border-green-300 bg-zinc-400/20"
                : "w-full flex justify-start py-1 pl-12 text-green-200 border-l-2 border-zinc-900"
            }
            end
          >
            {link.title}
          </NavLink>
        );
      })}
    </nav>
  );
};
