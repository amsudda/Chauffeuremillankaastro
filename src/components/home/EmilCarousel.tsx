import { useState, useEffect } from 'react';

interface Props {
  images: { src: string; caption: string }[];
  title: string;
  subtitle: string;
  experience: string;
}

export default function EmilCarousel({ images, title, subtitle, experience }: Props) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent(i => (i + 1) % images.length);
        setFading(false);
      }, 400);
    }, 3500);
    return () => clearInterval(id);
  }, [images.length]);

  const goTo = (i: number) => {
    if (i === current) return;
    setFading(true);
    setTimeout(() => { setCurrent(i); setFading(false); }, 400);
  };

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-card-hover">
      {/* Images */}
      <div className="relative h-[500px]">
        {images.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={`Emil Jayasekara — ${img.caption}`}
            className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-400"
            style={{ opacity: i === current ? (fading ? 0 : 1) : 0 }}
          />
        ))}
      </div>

      {/* Dot indicators */}
      <div className="absolute top-4 left-0 right-0 flex justify-center gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to photo ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'w-5 bg-gold-400' : 'w-1.5 bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Caption badge */}
      <div className="absolute top-4 right-4 z-10 bg-black/40 backdrop-blur-sm text-white text-xs
                      px-3 py-1.5 rounded-full transition-opacity duration-300"
           style={{ opacity: fading ? 0 : 1 }}>
        {images[current].caption}
      </div>

      {/* Overlay card */}
      <div className="absolute bottom-0 left-0 right-0 p-6 glass-card-dark">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-white font-display font-semibold text-lg">{title}</p>
            <p className="text-gold-300 text-sm">{subtitle}</p>
          </div>
          <div className="text-right">
            <p className="text-white font-bold text-2xl font-display">{experience}</p>
            <p className="text-gold-300 text-xs">Experience</p>
          </div>
        </div>
      </div>
    </div>
  );
}
