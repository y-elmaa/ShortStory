import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useTokens";
import { useState } from "react";

const Layout = () => {
  const logout = useAuth((state) => state.logout);
  const user = useAuth((state) => state.name);
  const role = useAuth((state) => state.role);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
const NavLinks = () => (
    <>
      <Link to="/" className="hover:text-blue-400" onClick={() => setMenuOpen(false)}>
        Home
      </Link>
      {user ? (
        <>
          {role === "manager" && (
            <Link to="/dashboard" className="hover:text-blue-400" onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>
          )}
          <Link to="/create-post" className="hover:text-blue-400" onClick={() => setMenuOpen(false)}>
            Create Post
          </Link>
          <span className="text-sm font-bold text-slate-300"> {user}</span>
          <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="cursor-pointer bg-black text-white hover:bg-gray-500  p-1 rounded-lg">
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/register" className="hover:text-blue-400" onClick={() => setMenuOpen(false)}>
            Register
          </Link>
          <Link to="/login" className="hover:text-blue-400" onClick={() => setMenuOpen(false)}>
            Login
          </Link>
        </>
      )}
    </>
  );

  return (
    <>
      <nav className="bg-slate-800 text-white sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">My App</h1>

            {/* Desktop links */}
            <div className="hidden md:flex gap-6 items-center">
              <NavLinks />
            </div>

            {/* Hamburger button */}
            <button
              className="md:hidden flex flex-col gap-1.5"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
                ☰
            </button>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden flex flex-col gap-4 pt-4 pb-2 border-t border-slate-700 mt-4">
              <NavLinks />
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-5xl mx-auto p-6">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;