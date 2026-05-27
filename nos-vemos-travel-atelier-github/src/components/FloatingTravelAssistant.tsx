import { FormEvent, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ExternalLink, MessageCircle, Send, X } from 'lucide-react';

interface ChatMessage {
  id: number;
  sender: 'assistant' | 'user';
  text: string;
}

const whatsappUrl =
  'https://wa.me/13051234567?text=Hola%20Nos%20Vemos%2C%20quiero%20dise%C3%B1ar%20una%20propuesta%20de%20viaje%20personalizada.';

const getAssistantReply = (message: string) => {
  const lower = message.toLowerCase();

  if (lower.includes('honduras') || lower.includes('roatan') || lower.includes('roatán') || lower.includes('utila')) {
    return 'Honduras funciona muy bien si buscas Caribe, arrecifes, cultura garífuna y una ruta con islas y naturaleza. Te sugeriría combinar Roatán, Utila y Copán si quieres equilibrio entre mar e historia.';
  }

  if (lower.includes('costa rica')) {
    return 'Costa Rica es ideal para viajeros que quieren naturaleza, lodges con intención, selva, volcanes y playas. La ruta puede sentirse tranquila o más aventurera según el ritmo que prefieras.';
  }

  if (lower.includes('turqu') || lower.includes('capadocia') || lower.includes('estambul')) {
    return 'Turquía es una ruta muy cinematográfica: Estambul, Capadocia y la costa o sitios clásicos como Éfeso. Es perfecta para historia, hoteles con carácter y experiencias privadas.';
  }

  if (lower.includes('malta')) {
    return 'Malta combina mar Mediterráneo, piedra dorada, historia y hoteles boutique. Es una gran opción para una escapada elegante con buen ritmo y mucho carácter visual.';
  }

  if (lower.includes('precio') || lower.includes('presupuesto') || lower.includes('cuánto') || lower.includes('cuanto')) {
    return 'Los estimados dependen de fechas, hoteles, número de viajeros y estilo de viaje. Como punto de partida, nuestras rutas suelen partir desde $2,800 a $4,100 USD por persona.';
  }

  if (lower.includes('whatsapp') || lower.includes('asesor') || lower.includes('propuesta')) {
    return 'Puedo ayudarte a perfilar destino, fechas y estilo. Para cerrar una propuesta personalizada, lo mejor es continuar por WhatsApp con el equipo del atelier.';
  }

  return 'Puedo orientarte por destino, estilo de viaje, presupuesto o duración. Dime si buscas Caribe, naturaleza, cultura, Mediterráneo o una ruta más privada y tranquila.';
};

const FloatingTravelAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'assistant',
      text: 'Hola, soy el asistente de Nos Vemos. Puedo ayudarte a elegir destino, estimar estilo de ruta y llevarte a WhatsApp para una propuesta personalizada.',
    },
  ]);

  const suggestedPrompts = useMemo(
    () => ['Quiero Caribe', 'Viaje cultural', 'Presupuesto aproximado', 'Hablar por WhatsApp'],
    [],
  );

  const sendMessage = (text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    setMessages((current) => [
      ...current,
      { id: Date.now(), sender: 'user', text: trimmedText },
      { id: Date.now() + 1, sender: 'assistant', text: getAssistantReply(trimmedText) },
    ]);
    setInput('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            className="mb-4 w-[calc(100vw-3rem)] overflow-hidden rounded-lg border border-white/20 bg-[#223040] text-white shadow-[0_24px_80px_rgba(34,48,64,0.35)] sm:w-[390px]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-sand">Travel assistant</p>
                <h3 className="mt-1 font-bold">Diseñemos tu ruta</h3>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} aria-label="Cerrar asistente">
                <X className="h-5 w-5 text-white/70 transition hover:text-sand" />
              </button>
            </div>

            <div className="max-h-[360px] space-y-3 overflow-y-auto px-5 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`rounded-lg px-4 py-3 text-sm leading-6 ${
                    message.sender === 'assistant'
                      ? 'bg-white/10 text-white/90'
                      : 'ml-auto max-w-[86%] bg-sand text-[#223040]'
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 px-5 pb-4">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="rounded-md border border-white/10 px-3 py-2 text-left text-xs font-semibold text-white/80 transition hover:border-sand hover:text-sand"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2 border-t border-white/10 p-4">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                className="min-w-0 flex-1 rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm text-white outline-none placeholder:text-white/50 focus:border-sand"
                placeholder="Escribe tu idea de viaje"
              />
              <button type="submit" className="rounded-md bg-sand px-3 text-[#223040] transition hover:bg-mutedGold hover:text-white">
                <Send className="h-4 w-4" />
              </button>
            </form>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-white px-5 py-3 text-sm font-bold text-[#223040] transition hover:bg-sand"
            >
              Continuar por WhatsApp
              <ExternalLink className="h-4 w-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex items-center gap-3 rounded-full bg-charcoal px-5 py-3 text-sm font-semibold text-white shadow-2xl transition hover:-translate-y-0.5 hover:bg-[#223040]"
      >
        <MessageCircle className="h-4 w-4 text-sand" />
        Asistente de viaje
        <ArrowRight className={`h-4 w-4 transition ${isOpen ? '-rotate-90' : 'rotate-0'}`} />
      </button>
    </div>
  );
};

export default FloatingTravelAssistant;
