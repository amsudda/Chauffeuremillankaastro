import { useState } from 'react';

interface Props {
  tourTitle:    string;
  destinations: string[];
  priceNote?:   string;
  whatsapp:     string;
}

type PassengerKey = 'adults' | 'children' | 'infants';

const vehiclePresets = [
  { label: '1–3 People', min: 1, max: 3, adults: 2,  icon: '🚗' },
  { label: '4–6 People', min: 4, max: 6, adults: 5,  icon: '🚐' },
  { label: '7–9 People', min: 7, max: 9, adults: 8,  icon: '🚌' },
];

export default function BookingForm({ tourTitle, destinations, priceNote, whatsapp }: Props) {
  const [passengerOpen, setPassengerOpen] = useState(false);
  const [passengers, setPassengers] = useState({ adults: 2, children: 0, infants: 0, babySeat: false });
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', checkIn: '', checkOut: '', notes: '' });

  const total = passengers.adults + passengers.children + passengers.infants;
  const passengerSummary = [
    `${passengers.adults} Adult${passengers.adults !== 1 ? 's' : ''}`,
    passengers.children > 0 ? `${passengers.children} Child${passengers.children !== 1 ? 'ren' : ''}` : null,
    passengers.infants  > 0 ? `${passengers.infants} Infant${passengers.infants  !== 1 ? 's' : ''}` : null,
  ].filter(Boolean).join(', ');

  const updatePassenger = (key: PassengerKey, dir: 'inc' | 'dec') => {
    setPassengers(prev => {
      const min = key === 'adults' ? 1 : 0;
      const val = dir === 'inc' ? prev[key] + 1 : Math.max(min, prev[key] - 1);
      return { ...prev, [key]: val };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      `Hi Emil! I'd like to book: ${tourTitle}`,
      `Name: ${form.fullName}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Passengers: ${passengerSummary} (Total: ${total})`,
      passengers.babySeat ? `Baby seat: Yes` : null,
      form.checkIn  ? `Check-in: ${form.checkIn}` : null,
      form.checkOut ? `Check-out: ${form.checkOut}` : null,
      form.notes    ? `Notes: ${form.notes}` : null,
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  const inputCls = 'w-full h-12 rounded-xl border border-stone bg-ivory/60 px-4 text-sm text-warmbrown focus:outline-none focus:ring-2 focus:ring-forest-600/30 focus:border-forest-600 transition-colors placeholder:text-warmgray/50';

  return (
    <aside className="bg-white border border-stone rounded-3xl p-6 shadow-card space-y-5">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-forest-700" style={{ fontFamily: "'Playfair Display',serif" }}>
          Tour At A Glance
        </h2>
        <p className="text-sm text-warmgray mt-1 leading-snug">
          {priceNote || 'Contact Emil for a custom quote based on your dates and group size.'}
        </p>
      </div>

      {/* Route pills */}
      {destinations.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider text-warmgray font-semibold">Route</p>
          <div className="flex flex-wrap gap-1.5">
            {destinations.map((d, i) => (
              <span key={`${d}-${i}`} className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-full bg-stone/60 text-forest-700 font-medium">
                <svg className="w-3 h-3 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                {d}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-stone pt-5">
        <h3 className="text-xl font-bold text-forest-700 mb-0.5 tracking-tight" style={{ fontFamily: "'Playfair Display',serif" }}>
          Book This Tour
        </h3>
        <p className="text-sm text-warmgray mb-5">Reserve your spot with Emil today</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full name */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-sm font-semibold text-forest-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              Full Name *
            </label>
            <input type="text" required placeholder="Your full name" value={form.fullName}
                   onChange={e => setForm(p => ({ ...p, fullName: e.target.value }))} className={inputCls} />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-sm font-semibold text-forest-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Email Address *
            </label>
            <input type="email" required placeholder="your@email.com" value={form.email}
                   onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className={inputCls} />
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-sm font-semibold text-forest-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              Phone Number *
            </label>
            <input type="tel" required placeholder="+94 XX XXX XXXX" value={form.phone}
                   onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className={inputCls} />
          </div>

          {/* Passenger picker */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-sm font-semibold text-forest-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Passengers *
            </label>
            <button type="button" onClick={() => setPassengerOpen(p => !p)}
                    className={`${inputCls} flex items-center justify-between`}>
              <span>{passengerSummary}</span>
              <svg className={`w-4 h-4 text-warmgray transition-transform duration-200 ${passengerOpen ? 'rotate-180' : ''}`}
                   fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            {passengerOpen && (
              <div className="rounded-xl border border-stone bg-white p-4 space-y-4 shadow-card">
                {([
                  { key: 'adults' as PassengerKey,   label: 'Adults',   sub: '13+ years' },
                  { key: 'children' as PassengerKey, label: 'Children', sub: '2–12 years' },
                  { key: 'infants' as PassengerKey,  label: 'Infants',  sub: '0–1 years' },
                ]).map(row => (
                  <div key={row.key} className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-forest-700">{row.label}</p>
                      <p className="text-xs text-warmgray">{row.sub}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => updatePassenger(row.key, 'dec')}
                              className="w-8 h-8 rounded-lg border border-stone flex items-center justify-center text-forest-700 hover:bg-stone transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4"/>
                        </svg>
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-forest-700">
                        {passengers[row.key]}
                      </span>
                      <button type="button" onClick={() => updatePassenger(row.key, 'inc')}
                              className="w-8 h-8 rounded-lg border border-stone flex items-center justify-center text-forest-700 hover:bg-stone transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}

                {/* Baby seat toggle */}
                <label className="flex items-center justify-between gap-2 pt-1 cursor-pointer">
                  <span className="text-sm text-forest-700">Baby seat required</span>
                  <input type="checkbox" checked={passengers.babySeat}
                         onChange={e => setPassengers(p => ({ ...p, babySeat: e.target.checked }))}
                         className="w-4 h-4 rounded accent-forest-600 cursor-pointer" />
                </label>

                {/* Vehicle presets */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {vehiclePresets.map(preset => {
                    const active = total >= preset.min && total <= preset.max;
                    return (
                      <button key={preset.label} type="button"
                              onClick={() => setPassengers(p => ({ ...p, adults: preset.adults, children: 0, infants: 0 }))}
                              className={`rounded-xl border px-2 py-2.5 text-[11px] font-medium transition-colors text-center ${active ? 'border-forest-600/50 bg-forest-600/10 text-forest-700' : 'border-stone text-warmgray hover:bg-stone/50'}`}>
                        <span className="flex flex-col items-center gap-1">
                          <span className="text-base">{preset.icon}</span>
                          {preset.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-forest-700">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                Arrival *
              </label>
              <input type="date" required value={form.checkIn}
                     onChange={e => setForm(p => ({ ...p, checkIn: e.target.value }))} className={inputCls} />
            </div>
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-forest-700">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                Departure *
              </label>
              <input type="date" required value={form.checkOut}
                     onChange={e => setForm(p => ({ ...p, checkOut: e.target.value }))} className={inputCls} />
            </div>
          </div>

          {/* Notes */}
          <textarea rows={3} placeholder="Special requests, dietary needs, or questions for Emil..."
                    value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                    className="w-full rounded-xl border border-stone bg-ivory/60 px-4 py-3 text-sm text-warmbrown resize-none focus:outline-none focus:ring-2 focus:ring-forest-600/30 focus:border-forest-600 transition-colors placeholder:text-warmgray/50" />

          {/* Submit */}
          <button type="submit"
                  className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5a] text-white font-semibold py-4 rounded-xl text-sm transition-all duration-200 hover:shadow-lg">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Book This Tour
          </button>

          <p className="text-xs text-warmgray text-center">
            Your details are sent directly to Emil on WhatsApp.
          </p>
        </form>
      </div>
    </aside>
  );
}
