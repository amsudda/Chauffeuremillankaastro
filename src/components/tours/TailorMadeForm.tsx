import { useState } from 'react';

interface Interest {
  id:     string;
  label:  string;
  icon:   React.ReactElement;
  badge?: string;
}

const INTERESTS: Interest[] = [
  {
    id: 'wildlife',
    label: 'Wildlife & Safaris',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="13" r="3"/>
        <circle cx="18" cy="13" r="3"/>
        <path d="M3 13V9a3 3 0 016 0v4M15 13V9a3 3 0 016 0v4M9 13h6"/>
      </svg>
    ),
  },
  {
    id: 'culture',
    label: 'Temples & Culture',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 21h20M4 21V10m4 11V10m8 11V10m4 11V10M2 10l10-8 10 8"/>
      </svg>
    ),
  },
  {
    id: 'beach',
    label: 'Beach & Relaxation',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
      </svg>
    ),
  },
  {
    id: 'tea',
    label: 'Tea Plantations',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 010 8h-1"/>
        <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/>
        <path d="M6 1v3M10 1v3M14 1v3"/>
      </svg>
    ),
  },
  {
    id: 'adventure',
    label: 'Hiking & Adventure',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 20h18L13 6 9 13l-3-3-3 10z"/>
      </svg>
    ),
  },
  {
    id: 'train',
    label: 'Scenic Train Ride',
    badge: '4 free tickets',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="6" width="18" height="13" rx="2"/>
        <path d="M8 2h8M12 2v4"/>
        <path d="M5 21l2-2M19 21l-2-2M3 13h18"/>
        <circle cx="8.5" cy="17" r="1" fill="currentColor" stroke="none"/>
        <circle cx="15.5" cy="17" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    id: 'whales',
    label: 'Whale Watching',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 10c1.5-3 3-3 4.5 0s3 3 4.5 0 3-3 4.5 0 3 3 4.5 0"/>
        <path d="M2 17c1.5-3 3-3 4.5 0s3 3 4.5 0 3-3 4.5 0 3 3 4.5 0"/>
      </svg>
    ),
  },
  {
    id: 'food',
    label: 'Local Food & Markets',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h2a2 2 0 002-2V2M7 2v20"/>
        <path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
      </svg>
    ),
  },
  {
    id: 'photography',
    label: 'Photography',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
    ),
  },
];

const OCCASIONS = [
  'Honeymoon / Romance',
  'Family Holiday',
  'Solo Adventure',
  'Friends Trip',
  'Anniversary',
  'Birthday Celebration',
  'Corporate / Group',
  'Other',
];

const TRAVEL_STYLES = [
  { value: 'budget',    label: 'Budget',    sub: 'Guesthouses & B&Bs', icon: '🎒' },
  { value: 'mid-range', label: 'Mid-Range', sub: '3–4★ Hotels',        icon: '🏨' },
  { value: 'luxury',    label: 'Luxury',    sub: '5★ & Boutique',      icon: '✨' },
];

interface Props { whatsapp: string; }

const WEB3FORMS_KEY = import.meta.env.PUBLIC_WEB3FORMS_KEY as string;

export default function TailorMadeForm({ whatsapp }: Props) {
  const [name,          setName]          = useState('');
  const [email,         setEmail]         = useState('');
  const [phone,         setPhone]         = useState('');
  const [arrivalDate,   setArrivalDate]   = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [adults,        setAdults]        = useState('2');
  const [children,      setChildren]      = useState('0');
  const [interests,     setInterests]     = useState<string[]>([]);
  const [travelStyle,   setTravelStyle]   = useState('mid-range');
  const [occasion,      setOccasion]      = useState('');
  const [notes,         setNotes]         = useState('');
  const [sent,          setSent]          = useState(false);
  const [submitting,    setSubmitting]    = useState(false);
  const [honeypot,      setHoneypot]      = useState('');

  const toggleInterest = (id: string) =>
    setInterests(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    setSubmitting(true);

    const selectedInterests = interests
      .map(id => {
        const item = INTERESTS.find(i => i.id === id);
        return item ? (item.badge ? `${item.label} (${item.badge})` : item.label) : null;
      })
      .filter(Boolean)
      .join(', ');

    const styleLabel = TRAVEL_STYLES.find(s => s.value === travelStyle)?.label ?? travelStyle;

    const lines: string[] = [
      `Hello Emil! I'd like to plan a tailor-made Sri Lanka tour.`,
      ``,
      `*About Me*`,
      `Name: ${name}`,
      `Email: ${email}`,
      ...(phone ? [`WhatsApp/Phone: ${phone}`] : []),
      ``,
      `*Trip Details*`,
      `Arrival: ${arrivalDate || 'Flexible / TBD'}`,
      `Departure: ${departureDate || 'Flexible / TBD'}`,
      `Adults: ${adults}`,
      ...(children !== '0' ? [`Children: ${children}`] : []),
      ``,
      `*Preferences*`,
      `Travel Style: ${styleLabel}`,
      ...(selectedInterests ? [`Interests: ${selectedInterests}`] : []),
      ...(occasion ? [`Occasion: ${occasion}`] : []),
      ...(notes ? [``, `*Additional Notes*`, notes] : []),
    ];

    const msg = lines.join('\n');

    // Send email via Web3Forms
    if (WEB3FORMS_KEY && WEB3FORMS_KEY !== 'your_access_key_here') {
      const emailBody = [
        `New Tailor-Made Tour Request from ${name}`,
        ``,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone / WhatsApp: ${phone || 'Not provided'}`,
        ``,
        `TRIP DETAILS`,
        `Arrival Date: ${arrivalDate || 'Flexible / TBD'}`,
        `Departure Date: ${departureDate || 'Flexible / TBD'}`,
        `Adults: ${adults}`,
        `Children: ${children === '0' ? 'None' : children}`,
        ``,
        `PREFERENCES`,
        `Travel Style: ${styleLabel}`,
        `Interests: ${selectedInterests || 'Not specified'}`,
        `Occasion: ${occasion || 'None'}`,
        ``,
        `ADDITIONAL NOTES`,
        notes || 'None',
      ].join('\n');

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            botcheck: false,
            subject: `New Tour Request from ${name} — Chauffeur Emil Lanka Tour`,
            from_name: name,
            reply_to: email,
            message: emailBody,
          }),
        });
        const data = await res.json();
        console.log('Web3Forms response:', data);
      } catch (err) {
        console.error('Web3Forms error:', err);
      }

    }

    // Open WhatsApp
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
    setSubmitting(false);
    setSent(true);
  };

  const input = `w-full px-4 py-3 rounded-xl border border-stone bg-ivory text-warmbrown text-sm
    focus:outline-none focus:ring-2 focus:ring-forest-600/30 focus:border-forest-600
    placeholder:text-warmgray/50 transition-colors`;

  const lbl = `block text-xs font-semibold text-forest-700 mb-1.5`;

  const SectionHeading = ({ n, text }: { n: number; text: string }) => (
    <h3 className="font-display text-forest-700 text-lg mb-4 flex items-center gap-2.5">
      <span className="w-7 h-7 rounded-full bg-forest-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
        {n}
      </span>
      {text}
    </h3>
  );

  if (sent) {
    return (
      <div className="bg-[#25D366]/10 border border-[#25D366]/40 rounded-2xl p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>
        <h3 className="font-display text-forest-700 text-2xl mb-2">WhatsApp Opened!</h3>
        <p className="text-warmgray text-sm leading-relaxed max-w-sm mx-auto">
          Your tour request has been prepared. Send it to Emil on WhatsApp and he'll
          reply with your personalised itinerary within 2 hours.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 text-sm text-forest-600 underline hover:text-sunset-400 transition-colors"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Honeypot — invisible to humans, filled by bots */}
      <input
        type="text" name="website" value={honeypot}
        onChange={e => setHoneypot(e.target.value)}
        style={{ display: 'none' }} aria-hidden="true" tabIndex={-1} autoComplete="off"
      />
      <input type="checkbox" name="botcheck" style={{ display: 'none' }} aria-hidden="true" />

      {/* 1 — About You */}
      <div>
        <SectionHeading n={1} text="About You" />
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={lbl}>Full Name <span className="text-sunset-400">*</span></label>
              <input
                type="text" required value={name} onChange={e => setName(e.target.value)}
                placeholder="Jane Smith" className={input}
              />
            </div>
            <div>
              <label className={lbl}>Email <span className="text-sunset-400">*</span></label>
              <input
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="jane@example.com" className={input}
              />
            </div>
          </div>
          <div>
            <label className={lbl}>
              Phone / WhatsApp{' '}
              <span className="text-warmgray/60 font-normal">(optional — for faster replies)</span>
            </label>
            <input
              type="tel" value={phone} onChange={e => setPhone(e.target.value)}
              placeholder="+1 234 567 8900" className={input}
            />
          </div>
        </div>
      </div>

      {/* 2 — Your Trip */}
      <div>
        <SectionHeading n={2} text="Your Trip" />
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={lbl}>Arrival Date <span className="text-sunset-400">*</span></label>
              <input
                type="date" required value={arrivalDate} onChange={e => setArrivalDate(e.target.value)}
                className={input}
              />
            </div>
            <div>
              <label className={lbl}>Departure Date</label>
              <input
                type="date" value={departureDate} onChange={e => setDepartureDate(e.target.value)}
                className={input}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={lbl}>Adults</label>
              <select value={adults} onChange={e => setAdults(e.target.value)} className={input}>
                {['1','2','3','4','5','6','7','8+'].map(n => (
                  <option key={n} value={n}>{n} adult{n !== '1' ? 's' : ''}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={lbl}>Children</label>
              <select value={children} onChange={e => setChildren(e.target.value)} className={input}>
                {['0','1','2','3','4','5+'].map(n => (
                  <option key={n} value={n}>{n === '0' ? 'None' : `${n} child${n !== '1' ? 'ren' : ''}`}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 3 — Interests */}
      <div>
        <SectionHeading n={3} text="What Excites You Most?" />
        <p className="text-warmgray text-xs mb-3">Select all that apply — Emil will weave these into your itinerary.</p>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map(interest => {
            const active = interests.includes(interest.id);
            return (
              <button
                key={interest.id}
                type="button"
                onClick={() => toggleInterest(interest.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium border-2 transition-all duration-200
                  ${active
                    ? 'bg-forest-600 border-forest-600 text-white shadow-sm'
                    : 'bg-white border-stone text-warmbrown hover:border-forest-600/50 hover:bg-forest-600/5'
                  }`}
              >
                {interest.icon}
                {interest.label}
                {interest.badge && (
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full leading-none transition-colors
                      ${active
                        ? 'bg-white/20 text-white'
                        : 'bg-gold-400/20 text-gold-600'
                      }`}
                  >
                    {interest.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4 — Travel Style */}
      <div>
        <SectionHeading n={4} text="Travel Style" />
        <div className="grid grid-cols-3 gap-3">
          {TRAVEL_STYLES.map(s => {
            const active = travelStyle === s.value;
            return (
              <button
                key={s.value}
                type="button"
                onClick={() => setTravelStyle(s.value)}
                className={`p-4 rounded-xl border-2 text-center transition-all duration-200
                  ${active
                    ? 'border-forest-600 bg-forest-600/8 shadow-sm'
                    : 'border-stone bg-white hover:border-forest-600/40'
                  }`}
              >
                <span className="text-2xl block mb-1.5" role="img" aria-hidden="true">{s.icon}</span>
                <p className={`text-sm font-semibold ${active ? 'text-forest-700' : 'text-warmbrown'}`}>{s.label}</p>
                <p className="text-xs text-warmgray mt-0.5">{s.sub}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5 — Special Details */}
      <div>
        <SectionHeading n={5} text="Anything Special?" />
        <div className="space-y-4">
          <div>
            <label className={lbl}>
              Occasion{' '}
              <span className="text-warmgray/60 font-normal">(optional)</span>
            </label>
            <select value={occasion} onChange={e => setOccasion(e.target.value)} className={input}>
              <option value="">No special occasion</option>
              {OCCASIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className={lbl}>
              Additional Notes{' '}
              <span className="text-warmgray/60 font-normal">(optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={4}
              placeholder="Specific destinations, dietary requirements, mobility considerations, must-see experiences, budget range, or anything else Emil should know..."
              className={`${input} resize-none`}
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-3 bg-forest-600 hover:bg-forest-700
                     text-white font-semibold py-4 px-8 rounded-full text-base transition-all duration-300
                     shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-70 disabled:scale-100 disabled:cursor-wait"
        >
          {submitting ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Sending…
            </>
          ) : (
            'Send My Tour Request to Emil'
          )}
        </button>
        <p className="text-xs text-warmgray text-center mt-3">
          Emil responds within 2 hours · Free itinerary planning · No obligation
        </p>
      </div>

    </form>
  );
}
