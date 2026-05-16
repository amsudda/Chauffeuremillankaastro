import { useState, useEffect } from 'react';

interface Chip {
  icon: string;
  label: string;
}

interface Props {
  images:        string[];
  title:         string;
  subtitle:      string;
  chips:         Chip[];
  description:   string;
}

export default function TourHeroGallery({ images, title, subtitle, chips, description }: Props) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setIdx(c => (c + 1) % images.length), 4500);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <section className="relative h-[56vh] md:h-[64vh] overflow-hidden">
      {/* Gallery slides */}
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`${title} — image ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
          loading={i === 0 ? 'eager' : 'lazy'}
          fetchPriority={i === 0 ? 'high' : 'auto'}
        />
      ))}

      {/* Cinematic overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(7,21,16,0.82) 0%, rgba(7,21,16,0.35) 50%, rgba(7,21,16,0.18) 100%)' }} />

      {/* Dot navigation */}
      {images.length > 1 && (
        <div className="absolute top-6 right-6 z-20 flex items-center gap-1.5 bg-black/25 backdrop-blur-md border border-white/25 rounded-full px-2.5 py-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Image ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${i === idx ? 'w-4 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/45 hover:bg-white/70'}`}
            />
          ))}
        </div>
      )}

      {/* Back link */}
      <a
        href="/tours"
        className="absolute top-24 left-5 sm:left-10 z-20 inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
        All Tours
      </a>

      {/* Title — cinematic typography directly on the gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 px-5 sm:px-10 lg:px-14 pb-8 sm:pb-12 z-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-gold-400 text-xs font-semibold tracking-[0.22em] uppercase mb-2.5"
             style={{ fontFamily: "'Inter',sans-serif" }}>
            {subtitle}
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4 tracking-tight"
              style={{ fontFamily: "'Playfair Display',serif", textShadow: '0 2px 28px rgba(0,0,0,0.5)' }}>
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {chips.map((chip, i) => (
              <span key={i}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-white/90 bg-black/25 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/20">
                <span>{chip.icon}</span>
                {chip.label}
              </span>
            ))}
          </div>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-2xl line-clamp-2"
             style={{ textShadow: '0 1px 10px rgba(0,0,0,0.4)' }}>
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
