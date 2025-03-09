import { useState } from "react";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { NavLink } from "react-router";
import useIsMobile from "../hooks/UseIsMobile";

export const SideNav = () => {
  const [isOpen, setIsOpen] = useState(true);
  const isMobile = useIsMobile();

  const links = [
    { path: "/", title: "Home" },
    { path: "/encrypt", title: "Encrypt" },
    { path: "/decrypt", title: "Decrypt" },
    { path: "/disclaimer", title: "Disclaimer" },
  ];

  return (
    <div
      className={`
        ${
          isMobile
            ? isOpen
              ? "fixed w-full h-full pt-15 bg-slate-950 text-2xl"
              : "fixed w-0 h-full border-0 pt-15 bg-slate-950 text-2xl"
            : "fixed left-0 top-0 bottom-0 w-64 h-full"
        }  bg-slate-950 z-20 pt-15 text-2xl flex flex-col border-r-2 border-green-200/40 shadow-2xl transition-all ease-in-out
        `}
    >
      {isMobile && (
        <div className={isOpen ? "w-full flex justify-end" : ""}>
          <button
            className="h-8 w-10 text-green-300 flex justify-center items-center transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
          </button>
        </div>
      )}
      <nav
        className={
          isMobile
            ? "w-full overflow-hidden"
            : "w-64 h-full z-10 py-5 text-2xl flex flex-col space-y-2"
        }
      >
        {links.map((link) => {
          return (
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "w-full flex justify-start py-1 pl-12 text-green-300 border-l-2 border-green-300 bg-zinc-400/20"
                  : "w-full flex justify-start py-1 pl-12 text-green-200 border-l-2 border-slate-950"
              }
              end
            >
              {link.title}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
