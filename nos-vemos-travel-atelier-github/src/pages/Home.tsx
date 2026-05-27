import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Hotel, Map, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { destinations } from '../data/destinations';

const whatsappUrl =
  'https://wa.me/13051234567?text=Hola%20Nos%20Vemos%2C%20quiero%20dise%C3%B1ar%20una%20propuesta%20de%20viaje%20personalizada.';

const proposalCaptchaAnswer = '12';

const escapeCsv = (value: string) => `"${value.replace(/"/g, '""')}"`;

const downloadProposalCsv = (proposal: Record<string, string>) => {
  const headers = ['Fecha', 'Nombre', 'Correo', 'Destino o estilo', 'Mensaje'];
  const row = [proposal.createdAt, proposal.name, proposal.email, proposal.destination, proposal.message];
  const csv = `${headers.join(',')}\n${row.map(escapeCsv).join(',')}`;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `nos-vemos-propuesta-${Date.now()}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: 'easeOut' },
};

const pillars = [
  {
    title: 'Guías locales',
    text: 'Personas con criterio, sensibilidad cultural y acceso a historias que no aparecen en los mapas.',
    icon: Compass,
  },
  {
    title: 'Hoteles con intención',
    text: 'Alojamientos elegidos por atmósfera, ubicación, hospitalidad y coherencia con cada ruta.',
    icon: Hotel,
  },
  {
    title: 'Logística invisible',
    text: 'Traslados, reservas y tiempos pensados para que el viaje se sienta fluido desde el primer día.',
    icon: Map,
  },
];

const Home = () => {
  const [proposalForm, setProposalForm] = useState({
    name: '',
    email: '',
    destination: '',
    message: '',
    captcha: '',
  });
  const [proposalStatus, setProposalStatus] = useState('');

  const updateProposalField = (field: keyof typeof proposalForm, value: string) => {
    setProposalForm((current) => ({ ...current, [field]: value }));
  };

  const handleProposalSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const values = Object.values(proposalForm).map((value) => value.trim());
    if (values.some((value) => value.length === 0)) {
      setProposalStatus('Completa todos los campos antes de enviar la solicitud.');
      return;
    }

    if (proposalForm.captcha.trim() !== proposalCaptchaAnswer) {
      setProposalStatus('La verificación humana no coincide. Inténtalo otra vez.');
      return;
    }

    const proposal = {
      createdAt: new Date().toLocaleString('es-ES'),
      name: proposalForm.name.trim(),
      email: proposalForm.email.trim(),
      destination: proposalForm.destination.trim(),
      message: proposalForm.message.trim(),
    };
    const stored = JSON.parse(localStorage.getItem('nos-vemos-propuestas') ?? '[]') as Array<Record<string, string>>;
    localStorage.setItem('nos-vemos-propuestas', JSON.stringify([...stored, proposal]));
    downloadProposalCsv(proposal);
    setProposalForm({ name: '', email: '', destination: '', message: '', captcha: '' });
    setProposalStatus('Solicitud guardada. Se descargó un archivo compatible con Excel.');
  };

  return (
    <main className="bg-ivory text-charcoal">
      <section className="relative min-h-[620px] overflow-hidden pt-16 text-white md:min-h-[760px]">
        <img
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1800&q=84"
          alt="Terraza privada frente al mar al atardecer"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ivory to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-center px-5 py-14 sm:px-6 md:min-h-[700px] md:px-12 md:py-16">
          <motion.div {...fadeUp} className="max-w-2xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-sand">
              Nos Vemos Travel Atelier
            </p>
            <h1 className="text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-7xl">
              Viajes que transforman la forma de mirar.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/90 md:text-lg">
              Diseñamos experiencias privadas, cálidas y profundamente cuidadas para viajeros que valoran el detalle,
              la belleza y la calma.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/destinos" className="btn-primary">
                Explorar destinos
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#propuesta" className="btn-secondary">
                Diseñar mi viaje
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 md:grid-cols-[0.85fr_1.15fr] md:px-12 md:py-20">
        <motion.div {...fadeUp}>
          <p className="eyebrow">Nuestra filosofía</p>
          <h2 className="section-title">El lujo está en sentirse acompañado sin perder libertad.</h2>
        </motion.div>
        <motion.div {...fadeUp} className="space-y-6 text-base leading-8 text-charcoal/70">
          <p>
            Nos Vemos nace para convertir la logística en tranquilidad y la inspiración en una ruta concreta. Cada
            propuesta combina narrativa, criterio hotelero y una red local que sostiene el viaje con discreción.
          </p>
          <p>
            No diseñamos itinerarios genéricos. Construimos experiencias con intención: dónde dormir, cuándo moverse,
            qué dejar abierto y qué reservar con precisión.
          </p>
        </motion.div>
      </section>

      <section className="border-y border-charcoal/10 bg-white/60">
          <div className="mx-auto grid max-w-7xl gap-5 px-5 py-12 sm:px-6 md:grid-cols-3 md:px-12 md:py-14">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.article key={pillar.title} {...fadeUp} className="premium-card p-7">
                <Icon className="mb-8 h-7 w-7 text-mutedGold" />
                <h3 className="text-xl font-semibold">{pillar.title}</h3>
                <p className="mt-4 text-sm leading-7 text-charcoal/70">{pillar.text}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 md:px-12 md:py-20">
        <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Destinos destacados</p>
            <h2 className="section-title max-w-2xl">Lugares que despiertan el alma.</h2>
          </div>
          <Link to="/destinos" className="text-sm font-semibold text-mutedGold hover:text-charcoal">
            Ver todos los destinos
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-4">
          {destinations.map((destination) => (
            <Link
              key={destination.id}
              to={`/destinos/${destination.id}`}
              className="group relative min-h-[280px] overflow-hidden rounded-lg bg-charcoal text-white shadow-soft"
            >
              <img
                src={destination.image}
                alt={destination.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-sand">{destination.region}</p>
                <h3 className="mt-2 text-xl font-semibold">{destination.name}</h3>
                <p className="mt-2 text-sm text-white/80">Desde {destination.price} USD</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="propuesta" className="bg-charcoal text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:px-12 md:py-20">
          <div>
            <p className="eyebrow text-sand">Solicitud privada</p>
            <h2 className="section-title text-white">Cuéntanos qué quieres sentir en tu próximo viaje.</h2>
            <div className="mt-8 grid gap-4 text-sm text-white/75">
              <p className="flex gap-3">
                <ShieldCheck className="h-5 w-5 text-sand" /> Asesoría privada y seguimiento humano.
              </p>
              <p className="flex gap-3">
                <Sparkles className="h-5 w-5 text-sand" /> Rutas con hoteles, guías y tiempos cuidadosamente seleccionados.
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-md border border-sand/60 px-5 py-3 text-sm font-bold text-sand transition hover:bg-sand hover:text-[#223040]"
            >
              <MessageCircle className="h-4 w-4" />
              Continuar por WhatsApp
            </a>
          </div>
          <form onSubmit={handleProposalSubmit} className="grid gap-4 rounded-lg border border-white/10 bg-white/10 p-6 backdrop-blur">
            <input
              className="form-field"
              placeholder="Nombre"
              value={proposalForm.name}
              onChange={(event) => updateProposalField('name', event.target.value)}
            />
            <input
              className="form-field"
              placeholder="Correo electrónico"
              type="email"
              value={proposalForm.email}
              onChange={(event) => updateProposalField('email', event.target.value)}
            />
            <input
              className="form-field"
              placeholder="Destino o estilo de viaje"
              value={proposalForm.destination}
              onChange={(event) => updateProposalField('destination', event.target.value)}
            />
            <textarea
              className="form-field min-h-32 resize-none"
              placeholder="Cuéntanos fechas, viajeros e intención del viaje"
              value={proposalForm.message}
              onChange={(event) => updateProposalField('message', event.target.value)}
            />
            <label className="grid gap-2 text-sm font-semibold text-white/80">
              Verificación humana: ¿cuánto es 7 + 5?
              <input
                className="form-field"
                placeholder="Respuesta"
                value={proposalForm.captcha}
                onChange={(event) => updateProposalField('captcha', event.target.value)}
              />
            </label>
            <button className="btn-primary justify-center" type="submit">
              Solicitar propuesta
            </button>
            {proposalStatus && <p className="text-sm leading-6 text-white/75">{proposalStatus}</p>}
          </form>
        </div>
      </section>
    </main>
  );
};

export default Home;
