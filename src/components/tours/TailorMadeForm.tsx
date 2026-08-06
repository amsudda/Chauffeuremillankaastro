import { useState, useEffect } from 'react';

interface Interest {
  id:     string;
  label:  string;
  image:  string;
  badge?: string;
}

const INTERESTS: Interest[] = [
  { id: 'wildlife',   label: 'Wildlife & Safaris',      image: '/images/interests/wildlife.jpg' },
  { id: 'culture',    label: 'Temples & Culture',       image: '/images/interests/culture.jpg' },
  { id: 'beach',      label: 'Beach & Relaxation',      image: '/images/interests/beach.jpg' },
  { id: 'tea',        label: 'Tea Plantations',         image: '/images/interests/tea.jpg' },
  { id: 'adventure',  label: 'Hiking & Adventure',      image: '/images/interests/adventure.jpg' },
  { id: 'train',      label: 'Scenic Train Ride',       image: '/images/interests/train.jpg', badge: '4 free tickets' },
  { id: 'whales',     label: 'Whale Watching',          image: '/images/interests/whales.jpg' },
  { id: 'food',       label: 'Local Food & Markets',    image: '/images/interests/food.jpg' },
  { id: 'ayurveda',   label: 'Ayurvedic Treatment',     image: '/images/interests/ayurveda.jpg' },
  { id: 'gem-store',  label: 'Gem Store Visit',         image: '/images/interests/gem-store.jpg' },
  { id: 'gem-site',   label: 'Gem Site Visit',          image: '/images/interests/gem-site.jpg' },
  { id: 'cooking',    label: 'Traditional Cooking Class', image: '/images/interests/cooking-class.jpg' },
  { id: 'trekking',   label: 'Sinharaja Forest Trekking', image: '/images/interests/trekking.jpg' },
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
  const [infants,       setInfants]       = useState(0);
  const [children,      setChildren]      = useState(0);
  const [teens,         setTeens]         = useState(0);
  const [youngAdults,   setYoungAdults]   = useState(0);
  const [adults,        setAdults]        = useState(0);
  const [interests,     setInterests]     = useState<string[]>([]);
  const [travelStyle,   setTravelStyle]   = useState('mid-range');
  const [occasion,      setOccasion]      = useState('');
  const [notes,         setNotes]         = useState('');
  const [sent,          setSent]          = useState(false);
  const [submitting,    setSubmitting]    = useState(false);
  const [honeypot,      setHoneypot]      = useState('');

  const toggleInterest = (id: string) =>
    setInterests(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  // Broadcast form state to TourAdvisorPanel whenever key fields change
  useEffect(() => {
    const totalTravelers = infants + children + teens + youngAdults + adults;
    const hasKids = (infants + children) > 0;
    window.dispatchEvent(new CustomEvent('tailormade-form-update', {
      detail: { interests, occasion, travelStyle, arrivalDate, departureDate, totalTravelers, hasKids },
    }));
  }, [interests, occasion, travelStyle, arrivalDate, departureDate, infants, children, teens, youngAdults, adults]);


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
      `Total Travelers: ${infants + children + teens + youngAdults + adults}`,
      ...(infants      > 0 ? [`Infants & Toddlers (0-5): ${infants}`]      : []),
      ...(children     > 0 ? [`Children (6-12): ${children}`]              : []),
      ...(teens        > 0 ? [`Teens (13-20): ${teens}`]                   : []),
      ...(youngAdults  > 0 ? [`Young Adults (20-30): ${youngAdults}`]      : []),
      ...(adults       > 0 ? [`Adults (30+): ${adults}`]                   : []),
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
        `Total Travelers: ${infants + children + teens + youngAdults + adults}`,
        `  Infants & Toddlers (0-5): ${infants}`,
        `  Children (6-12): ${children}`,
        `  Teens (13-20): ${teens}`,
        `  Young Adults (20-30): ${youngAdults}`,
        `  Adults (30+): ${adults}`,
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
          <div>
            <p className="text-xs text-warmgray mb-3">Please specify the number of travelers in each age group</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
              {[
                { label: 'Infants & Toddlers (0-5)', value: infants,      setter: setInfants },
                { label: 'Children (6-12)',           value: children,     setter: setChildren },
                { label: 'Teens (13-20)',             value: teens,        setter: setTeens },
                { label: 'Young Adults (20-30)',      value: youngAdults,  setter: setYoungAdults },
              ].map(({ label, value, setter }) => (
                <div key={label}>
                  <label className={lbl}>{label}</label>
                  <input
                    type="number" min={0} max={20} value={value}
                    onChange={e => setter(Math.max(0, parseInt(e.target.value) || 0))}
                    className={input}
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className={lbl}>Adults (30+)</label>
                <input
                  type="number" min={0} max={20} value={adults}
                  onChange={e => setAdults(Math.max(0, parseInt(e.target.value) || 0))}
                  className={input}
                />
              </div>
            </div>
            <div className="mt-3 bg-forest-600/8 border border-forest-200 rounded-xl px-5 py-3 text-center">
              <span className="text-sm font-semibold text-forest-700">
                Total Travelers: {infants + children + teens + youngAdults + adults}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 — Interests */}
      <div>
        <SectionHeading n={3} text="What Excites You Most?" />
        <p className="text-warmgray text-xs mb-3">Select all that apply — Emil will weave these into your itinerary.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {INTERESTS.map(interest => {
            const active = interests.includes(interest.id);
            return (
              <button
                key={interest.id}
                type="button"
                onClick={() => toggleInterest(interest.id)}
                className={`flex flex-col group rounded-xl text-left transition-all duration-300 border-2 bg-white overflow-hidden
                  ${active
                    ? 'border-forest-600 shadow-md scale-[0.98]'
                    : 'border-stone shadow-sm hover:border-forest-600/50 hover:shadow-md'
                  }`}
              >
                <div className="relative aspect-[3/2] overflow-hidden w-full">
                  <img 
                    src={interest.image} 
                    alt={interest.label} 
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${active ? 'opacity-90' : 'opacity-100'}`}
                  />
                  {active && (
                    <div className="absolute top-2 right-2 bg-forest-600 text-white rounded-full p-1 shadow-sm animate-fade-in z-10">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-3 flex flex-col flex-grow justify-center border-t border-stone/30">
                  <span className={`font-medium text-sm leading-tight transition-colors ${active ? 'text-forest-700 font-semibold' : 'text-warmbrown'}`}>
                    {interest.label}
                  </span>
                  {interest.badge && (
                    <span className="inline-block mt-1.5 self-start text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gold-100 text-gold-700 leading-none">
                      {interest.badge}
                    </span>
                  )}
                </div>
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
