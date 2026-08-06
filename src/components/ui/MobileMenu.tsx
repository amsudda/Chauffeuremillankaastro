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
  // z-40 stacking context.
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
        className={`fixed top-0 right-0 bottom-0 z-[100] w-80 max-w-[85vw] flex flex-col justify-between
                    transition-transform duration-300 ease-out xl:hidden
                    ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div>
          {/* Drawer header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <div>
              <div className="text-white font-semibold text-base" style={{ fontFamily: "'Playfair Display',serif" }}>
                Chauffeur Emil Lanka Tours
              </div>
              <div className="text-gold-400 text-[10px] tracking-widest uppercase mt-0.5">Sri Lanka Private Tours</div>
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
          <div className="flex flex-col px-6 py-6 gap-1">
            {links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-3.5 text-white/85 hover:text-gold-300 text-base
                           border-b border-white/5 transition-all duration-200"
                style={{ fontFamily: "'Playfair Display',serif" }}
              >
                <span>{link.label}</span>
                <span className="text-xs text-white/30">→</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom CTAs inside drawer */}
        <div className="px-6 pb-8 space-y-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full py-3 rounded-full
                       bg-[#25D366] text-white font-semibold text-sm shadow-md hover:bg-[#1fb959] transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Emil
          </a>
          <a
            href="/tailor-made"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center w-full py-3 rounded-full
                       bg-[#2e7d6e] text-white font-semibold text-sm hover:bg-[#256b5f] transition-colors"
          >
            Plan My Tour
          </a>
        </div>
      </nav>
    </>
  );

  return (
    <>
      {/* Hamburger button — text-forest-700 for visibility on white header */}
      <button
        onClick={() => setOpen(!open)}
        className="xl:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg
                   text-forest-700 hover:bg-forest-700/10 transition-colors shrink-0"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Overlay + drawer portalled to <body> */}
      {mounted && createPortal(drawer, document.body)}
    </>
  );
}
