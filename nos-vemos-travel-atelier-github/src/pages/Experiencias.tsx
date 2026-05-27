import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Camera, Heart, ImagePlus, Lock, MapPin, Plus, RefreshCcw, Send, X } from 'lucide-react';

interface ExperiencePost {
  id: number;
  author: string;
  location: string;
  title: string;
  text: string;
  category: string;
  time: string;
  likes: number;
  images: string[];
}

const postingCodeHash = 'beab40200f959b060e1ac6b0f369a1e1ae590ca6cb86816cc7d0109cdd975e1b';

const starterPosts: ExperiencePost[] = [
  {
    id: 1,
    author: 'Mariana G.',
    location: 'Roatán, Honduras',
    title: 'Un mar que parecía privado',
    text: 'Aguas turquesas, atardeceres lentos y un ritmo que nos hizo bajar la voz. Una pausa perfecta frente al Caribe.',
    category: 'playas',
    time: '2h',
    likes: 124,
    images: ['https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=900&q=82'],
  },
  {
    id: 2,
    author: 'Carlos M.',
    location: 'Utila, Honduras',
    title: 'Bucear fue entrar en otro mundo',
    text: 'Arrecifes increíbles, vida marina por todas partes y una sensación de calma que no se puede explicar con prisa.',
    category: 'aventura',
    time: '5h',
    likes: 98,
    images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=82'],
  },
  {
    id: 3,
    author: 'Sofía L.',
    location: 'Copán Ruinas, Honduras',
    title: 'Historia viva entre selva',
    text: 'Copán me dejó sin palabras. Cultura, naturaleza y silencio en una misma mañana.',
    category: 'cultura',
    time: '1d',
    likes: 166,
    images: ['https://images.unsplash.com/photo-1585468274952-66591eb14165?auto=format&fit=crop&w=900&q=82'],
  },
  {
    id: 4,
    author: 'Diego R.',
    location: 'Pico Bonito, Honduras',
    title: 'Cataratas y selva',
    text: 'Una caminata suave, agua fría y esa sensación de estar lejos de todo sin sentirse perdido.',
    category: 'aventura',
    time: '2d',
    likes: 87,
    images: ['https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=900&q=82'],
  },
  {
    id: 5,
    author: 'Valeria T.',
    location: 'La Ceiba, Honduras',
    title: 'Mi lugar favorito',
    text: 'Entre mar y montañas encontré un cierre perfecto para el viaje. Todo tuvo una calidez muy humana.',
    category: 'destinos',
    time: '3d',
    likes: 112,
    images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=82'],
  },
  {
    id: 6,
    author: 'Lucía S.',
    location: 'Capadocia, Turquía',
    title: 'Amanecer suspendido',
    text: 'Los globos, la luz dorada y el hotel cueva hicieron que todo se sintiera cinematográfico.',
    category: 'destinos',
    time: '1w',
    likes: 143,
    images: ['https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?auto=format&fit=crop&w=900&q=82'],
  },
  {
    id: 7,
    author: 'Paula N.',
    location: 'La Valeta, Malta',
    title: 'Piedra dorada y mar',
    text: 'Cada rincón cuenta una historia. Malta se siente pequeña, elegante y llena de capas.',
    category: 'cultura',
    time: '1w',
    likes: 101,
    images: ['https://images.unsplash.com/photo-1566386468037-9351a761d3d9?auto=format&fit=crop&w=900&q=82'],
  },
  {
    id: 8,
    author: 'Felipe G.',
    location: 'Monteverde, Costa Rica',
    title: 'Bosque nuboso',
    text: 'Senderos, ríos y vistas que te recuerdan por qué viajar vale tanto la pena.',
    category: 'aventura',
    time: '1w',
    likes: 89,
    images: ['https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=82'],
  },
];

const filters = [
  { value: 'todas', label: 'Todas' },
  { value: 'destinos', label: 'Destinos' },
  { value: 'playas', label: 'Playas' },
  { value: 'aventura', label: 'Aventura' },
  { value: 'cultura', label: 'Cultura' },
];

const countWords = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const hashText = async (value: string) => {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value.trim()));
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
};

const Experiencias = () => {
  const [posts, setPosts] = useState<ExperiencePost[]>(starterPosts);
  const [likedIds, setLikedIds] = useState<number[]>([]);
  const [filter, setFilter] = useState('todas');
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [composer, setComposer] = useState({
    title: '',
    text: '',
    location: '',
    category: 'destinos',
    accessCode: '',
  });
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [composerStatus, setComposerStatus] = useState('');

  const visiblePosts = useMemo(
    () => posts.filter((post) => filter === 'todas' || post.category === filter),
    [filter, posts],
  );

  const toggleLike = (postId: number) => {
    const alreadyLiked = likedIds.includes(postId);
    setLikedIds((current) => (alreadyLiked ? current.filter((id) => id !== postId) : [...current, postId]));
    setPosts((current) =>
      current.map((post) =>
        post.id === postId ? { ...post, likes: Math.max(0, post.likes + (alreadyLiked ? -1 : 1)) } : post,
      ),
    );
  };

  const updateComposer = (field: keyof typeof composer, value: string) => {
    setComposer((current) => ({ ...current, [field]: value }));
  };

  const handleImages = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).slice(0, 10);
    const images = await Promise.all(files.map(fileToDataUrl));
    setSelectedImages(images);
  };

  const resetComposer = () => {
    setComposer({ title: '', text: '', location: '', category: 'destinos', accessCode: '' });
    setSelectedImages([]);
    setComposerStatus('');
  };

  const submitPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const wordCount = countWords(composer.text);

    if (!composer.title.trim() || !composer.text.trim() || !composer.location.trim()) {
      setComposerStatus('Completa título, lugar y texto antes de publicar.');
      return;
    }

    if (wordCount > 250) {
      setComposerStatus('El texto debe tener máximo 250 palabras.');
      return;
    }

    if (selectedImages.length === 0 || selectedImages.length > 10) {
      setComposerStatus('Agrega entre 1 y 10 imágenes.');
      return;
    }

    if ((await hashText(composer.accessCode)) !== postingCodeHash) {
      setComposerStatus('Código de publicación inválido.');
      return;
    }

    const newPost: ExperiencePost = {
      id: Date.now(),
      author: 'Viajero Nos Vemos',
      location: composer.location.trim(),
      title: composer.title.trim(),
      text: composer.text.trim(),
      category: composer.category,
      time: 'Ahora',
      likes: 0,
      images: selectedImages,
    };

    setPosts((current) => [newPost, ...current]);
    resetComposer();
    setIsComposerOpen(false);
  };

  return (
    <main className="bg-ivory pt-16 text-charcoal">
      <section className="relative overflow-hidden text-white">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=84"
          alt="Costa tropical vista desde arriba"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071f34] via-[#071f34]/80 to-[#071f34]/35" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-24">
          <p className="eyebrow text-sand">Experiencias</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Historias reales de viajeros que hacen del mundo algo extraordinario.
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/85 md:text-base">
            Explora experiencias auténticas compartidas por nuestra comunidad. Inspírate, guarda tus favoritas y
            empieza a imaginar tu próxima ruta.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-12">
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.12fr] lg:items-start">
          <button
            type="button"
            onClick={() => setIsComposerOpen(true)}
            className="rounded-lg border border-charcoal/10 bg-white p-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                alt="Viajera"
                className="h-12 w-12 rounded-full object-cover"
              />
              <p className="flex-1 text-sm font-medium text-charcoal/65">Comparte tu experiencia de viaje...</p>
              <span className="inline-flex w-fit items-center gap-2 rounded-md bg-mutedGold px-4 py-2 text-sm font-bold text-white">
                <Plus className="h-4 w-4" />
                Publicar
              </span>
            </div>
            <div className="mt-5 flex flex-wrap gap-6 border-t border-charcoal/10 pt-4 text-sm font-semibold text-charcoal/65">
              <span className="inline-flex items-center gap-2">
                <Camera className="h-4 w-4 text-mutedGold" />
                Foto
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-mutedGold" />
                Destino
              </span>
            </div>
          </button>

          <div className="rounded-lg border border-charcoal/10 bg-white p-4 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex max-w-full gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
                {filters.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setFilter(item.value)}
                    className={`shrink-0 rounded-md px-4 py-2 text-sm font-bold transition ${
                      filter === item.value ? 'bg-ivory text-[#223040]' : 'text-charcoal/60 hover:bg-ivory'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <button type="button" className="inline-flex items-center gap-2 rounded-md border border-charcoal/10 px-4 py-2 text-sm font-semibold text-charcoal/65">
                Más recientes
                <RefreshCcw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {visiblePosts.map((post) => {
            const liked = likedIds.includes(post.id);

            return (
              <article key={post.id} className="overflow-hidden rounded-lg border border-charcoal/10 bg-white shadow-soft">
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-[#223040]">{post.author}</p>
                      <p className="text-xs text-charcoal/55">{post.location}</p>
                    </div>
                    <span className="text-xs text-charcoal/45">{post.time}</span>
                  </div>
                  <h2 className="mt-4 text-base font-bold leading-6 text-[#223040]">{post.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-charcoal/75">{post.text}</p>
                </div>
                <div className="grid">
                  <img src={post.images[0]} alt={post.title} className="h-52 w-full object-cover md:h-56" loading="lazy" />
                  {post.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-px bg-white">
                      {post.images.slice(1, 5).map((image) => (
                        <img key={image} src={image} alt={post.title} className="h-16 w-full object-cover" loading="lazy" />
                      ))}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => toggleLike(post.id)}
                  className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-bold text-charcoal/70 transition hover:bg-ivory"
                >
                  <Heart className={`h-4 w-4 ${liked ? 'fill-mutedGold text-mutedGold' : 'text-mutedGold'}`} />
                  {post.likes}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <AnimatePresence>
        {isComposerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/70 px-3 py-4 backdrop-blur-sm sm:px-4 sm:py-8"
          >
            <motion.form
              onSubmit={submitPost}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-5 shadow-[0_28px_90px_rgba(0,0,0,0.25)] sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow">Nueva experiencia</p>
                  <h2 className="mt-2 text-3xl font-bold text-[#223040]">Comparte tu historia.</h2>
                </div>
                <button type="button" onClick={() => setIsComposerOpen(false)} aria-label="Cerrar publicación">
                  <X className="h-6 w-6 text-charcoal/60" />
                </button>
              </div>

              <div className="mt-6 grid gap-4">
                <input
                  className="rounded-md border border-charcoal/10 bg-ivory px-4 py-3 text-sm outline-none focus:border-mutedGold"
                  placeholder="Título"
                  value={composer.title}
                  onChange={(event) => updateComposer('title', event.target.value)}
                />
                <input
                  className="rounded-md border border-charcoal/10 bg-ivory px-4 py-3 text-sm outline-none focus:border-mutedGold"
                  placeholder="Destino o lugar"
                  value={composer.location}
                  onChange={(event) => updateComposer('location', event.target.value)}
                />
                <select
                  className="rounded-md border border-charcoal/10 bg-ivory px-4 py-3 text-sm outline-none focus:border-mutedGold"
                  value={composer.category}
                  onChange={(event) => updateComposer('category', event.target.value)}
                >
                  {filters.filter((item) => item.value !== 'todas').map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <div>
                  <textarea
                    className="min-h-[170px] w-full resize-none rounded-md border border-charcoal/10 bg-ivory px-4 py-3 text-sm leading-7 outline-none focus:border-mutedGold"
                    placeholder="Escribe hasta 250 palabras"
                    value={composer.text}
                    onChange={(event) => updateComposer('text', event.target.value)}
                  />
                  <p className="mt-2 text-xs font-semibold text-charcoal/55">{countWords(composer.text)} / 250 palabras</p>
                </div>
                <label className="flex cursor-pointer items-center justify-center gap-3 rounded-md border border-dashed border-mutedGold/70 bg-sand/10 px-4 py-5 text-sm font-bold text-[#223040]">
                  <ImagePlus className="h-5 w-5 text-mutedGold" />
                  Agregar hasta 10 imágenes
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handleImages} />
                </label>
                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                    {selectedImages.map((image) => (
                      <img key={image} src={image} alt="Vista previa" className="h-24 w-full rounded-md object-cover sm:h-20" />
                    ))}
                  </div>
                )}
                <label className="grid gap-2 text-sm font-bold text-[#223040]">
                  Código de publicación
                  <span className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mutedGold" />
                    <input
                      className="w-full rounded-md border border-charcoal/10 bg-ivory py-3 pl-10 pr-4 text-sm outline-none focus:border-mutedGold"
                      type="password"
                      placeholder="Código recibido con tu paquete"
                      value={composer.accessCode}
                      onChange={(event) => updateComposer('accessCode', event.target.value)}
                    />
                  </span>
                </label>
              </div>

              {composerStatus && <p className="mt-4 text-sm font-semibold text-mutedGold">{composerStatus}</p>}

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button type="button" onClick={resetComposer} className="rounded-md border border-charcoal/10 px-5 py-3 text-sm font-bold text-[#223040]">
                  Limpiar
                </button>
                <button type="submit" className="inline-flex items-center justify-center gap-3 rounded-md bg-mutedGold px-5 py-3 text-sm font-bold text-white transition hover:bg-[#223040]">
                  Publicar experiencia
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Experiencias;
