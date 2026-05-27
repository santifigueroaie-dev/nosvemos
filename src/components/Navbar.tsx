import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/20 bg-white/85 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-5 md:px-6">
        <Link to="/" onClick={closeMenu} className="text-xl font-semibold tracking-tight text-charcoal">
          Nos Vemos
        </Link>

        <div className="hidden items-center space-x-6 md:flex">
          <Link to="/" className="text-sm font-medium text-warmGray transition hover:text-charcoal">
            Inicio
          </Link>
          <Link to="/destinos" className="text-sm font-medium text-warmGray transition hover:text-charcoal">
            Destinos
          </Link>
          <Link to="/experiencias" className="text-sm font-medium text-warmGray transition hover:text-charcoal">
            Experiencias
          </Link>
          <Link to="/#propuesta" className="text-sm font-medium text-warmGray transition hover:text-charcoal">
            Contacto
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to="/destinos"
            className="hidden rounded-md border border-mutedGold/50 px-4 py-2 text-xs font-bold text-charcoal transition hover:bg-mutedGold hover:text-white md:inline-flex"
          >
            Diseña tu viaje
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="rounded p-2 transition hover:bg-warmGray/10 md:hidden"
            aria-label={isOpen ? 'Cerrar navegación' : 'Abrir navegación'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5 text-charcoal" /> : <Menu className="h-5 w-5 text-charcoal" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-charcoal/10 bg-white px-5 py-4 shadow-soft md:hidden">
          <div className="grid gap-3 text-sm font-semibold text-charcoal">
            <Link onClick={closeMenu} to="/" className="rounded-md px-3 py-3 transition hover:bg-ivory">
              Inicio
            </Link>
            <Link onClick={closeMenu} to="/destinos" className="rounded-md px-3 py-3 transition hover:bg-ivory">
              Destinos
            </Link>
            <Link onClick={closeMenu} to="/experiencias" className="rounded-md px-3 py-3 transition hover:bg-ivory">
              Experiencias
            </Link>
            <Link onClick={closeMenu} to="/#propuesta" className="rounded-md px-3 py-3 transition hover:bg-ivory">
              Contacto
            </Link>
            <Link
              onClick={closeMenu}
              to="/destinos"
              className="mt-2 rounded-md bg-sand px-4 py-3 text-center text-sm font-bold text-charcoal"
            >
              Diseña tu viaje
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
