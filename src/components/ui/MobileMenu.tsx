import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface NavLink { label: string; href: string; }
interface Props   { links: NavLink[]; whatsapp: string; }

export default function MobileMenu({ links, whatsapp }: Props) {
  const [open, setOpen]       = useState(false);
  const [mounted, setMounted] = useState(false);

  // Only render the portal after mount (avoids SSR `document` reference).
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape for accessibility.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const waUrl = `https://wa.me/${whatsapp}?text=Hello%20Emil%2C%20I%27d%20like%20to%20enquire%20about%20a%20Sri%20Lanka%20tour`;

  // Overlay + drawer are portalled to <body> so they escape the fixed header's
  // z-40 stacking context and can layer above the announcement bar (z-50).
  const drawer = (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[90] bg-black/60 xl:hidden transition-opacity duration-300
                    ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <nav
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        style={{ backgroundColor: '#0D2118' }}
        className={`fixed top-0 right-0 bottom-0 z-[100] w-72 max-w-[85vw] flex flex-col
                    transition-transform duration-300 ease-out xl:hidden
                    ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <div className="text-white font-semibold" style={{ fontFamily: "'Playfair Display',serif" }}>
              Emillan Katour
            </div>
            <div className="text-gold-400 text-xs tracking-widest uppercase mt-0.5">Sri Lanka Private Tours</div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10
                       text-white hover:bg-white/20 transition-colors"
            aria-label="Close navigation"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <div className="flex-1 flex flex-col px-6 py-8 gap-1">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 py-4 text-white/80 hover:text-white text-lg
                         border-b border-white/5 hover:pl-2 transition-all duration-200"
              style={{ fontFamily: "'Playfair Display',serif", animationDelay: `${i * 80}ms` }}
            >
              {link.label}
            </a>
          ))}
        </div>


      </nav>
    </>
  );

  return (
    <>
      {/* Hamburger — stays in the header */}
      <button
        onClick={() => setOpen(!open)}
        className="xl:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg
                   text-white hover:bg-white/10 transition-colors"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Overlay + drawer portalled to <body> so they layer above the header & announcement bar */}
      {mounted && createPortal(drawer, document.body)}
    </>
  );
}
