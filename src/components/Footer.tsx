import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#171512] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.2fr_0.7fr_0.7fr_1fr] md:px-12">
        <div>
          <Link to="/" className="text-2xl font-semibold text-sand">
            Nos Vemos
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-7 text-white/70">
            Viajes privados, experiencias auténticas y recorridos que permanecen para siempre.
          </p>
          <Link to="/#propuesta" className="mt-6 inline-flex rounded border border-sand/60 px-4 py-2 text-sm text-sand">
            Diseña tu viaje
          </Link>
        </div>
        <div>
          <h3 className="footer-heading">Navegación</h3>
          <div className="mt-4 grid gap-3 text-sm text-white/70">
            <Link to="/">Inicio</Link>
            <Link to="/destinos">Destinos</Link>
            <Link to="/#propuesta">Contacto</Link>
          </div>
        </div>
        <div>
          <h3 className="footer-heading">Destinos</h3>
          <div className="mt-4 grid gap-3 text-sm text-white/70">
            <Link to="/destinos/honduras">Honduras</Link>
            <Link to="/destinos/turquia">Turquía</Link>
            <Link to="/destinos/costa-rica">Costa Rica</Link>
            <Link to="/destinos/malta">Malta</Link>
          </div>
        </div>
        <div>
          <h3 className="footer-heading">Contacto</h3>
          <div className="mt-4 grid gap-3 text-sm text-white/70">
            <p className="flex gap-3"><Mail className="h-4 w-4 text-sand" /> hola@nosvemostravel.com</p>
            <p className="flex gap-3"><Phone className="h-4 w-4 text-sand" /> +1 (305) 123 4567</p>
            <p className="flex gap-3"><MapPin className="h-4 w-4 text-sand" /> Miami, FL</p>
          </div>
          <div className="mt-6 flex gap-3">
            <a aria-label="Instagram" className="rounded-full border border-white/20 p-2 text-sand" href="https://instagram.com">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-white/50">
        © 2026 Nos Vemos Travel Atelier. Términos y Condiciones · Privacidad · Cookies
      </div>
    </footer>
  );
};

export default Footer;
