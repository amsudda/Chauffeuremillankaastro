import { useState } from 'react';

const WEB3FORMS_KEY = import.meta.env.PUBLIC_WEB3FORMS_KEY as string;

interface Props {
  tourName?: string;
  sticky?:   boolean;
}

export default function InquiryForm({ tourName = '', sticky = false }: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName,  setLastName]  = useState('');
  const [email,     setEmail]     = useState('');
  const [message,   setMessage]   = useState('');
  const [sent,      setSent]      = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [honeypot,  setHoneypot]  = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Honeypot — bots fill hidden fields, humans don't
    if (honeypot) return;
    setLoading(true);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          botcheck: false,
          subject: `Message from ${firstName} ${lastName} — Chauffeur Emil Lanka Tour`,
          from_name: `${firstName} ${lastName}`,
          reply_to: email,
          cc: 'induwaraudula123@gmail.com',
          message: [
            `Name:    ${firstName} ${lastName}`,
            `Email:   ${email}`,
            tourName ? `Tour:    ${tourName}` : '',
            ``,
            `Message:`,
            message,
          ].filter(Boolean).join('\n'),
        }),
      });
      const data = await res.json();
      console.log('Web3Forms response:', data);
    } catch (err) {
      console.error('Web3Forms error:', err);
    }

    setLoading(false);
    setSent(true);
  };

  const inputCls = `w-full px-4 py-3 rounded-xl border border-stone bg-ivory text-warmbrown text-sm
    focus:outline-none focus:ring-2 focus:ring-forest-600/30 focus:border-forest-600
    placeholder:text-warmgray/50 transition-colors`;

  const labelCls = `block text-xs font-semibold text-forest-700 mb-1.5`;

  if (sent) {
    return (
      <div className="bg-forest-600/8 border border-forest-200 rounded-2xl p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-forest-600 text-white flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h3 className="font-display text-forest-700 text-xl mb-2">Message Sent!</h3>
        <p className="text-warmgray text-sm leading-relaxed">
          Emil will get back to you within 24 hours. For a faster reply, you can also reach him on WhatsApp.
        </p>
        <button
          onClick={() => { setSent(false); setFirstName(''); setLastName(''); setEmail(''); setMessage(''); }}
          className="mt-5 text-sm text-forest-600 underline underline-offset-2 hover:text-sunset-400 transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-card border border-stone overflow-hidden`}>
      {/* Header */}
      <div className="bg-forest-gradient px-6 py-5">
        <p className="text-gold-300 text-xs font-semibold tracking-[0.2em] uppercase mb-1">Get in Touch</p>
        <h3 className="font-display text-white text-xl leading-tight">
          {tourName ? `Enquire About This Tour` : 'Send Emil a Message'}
        </h3>
        <p className="text-white/60 text-xs mt-1">Emil responds within 24 hours</p>
      </div>

      <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
        {/* Honeypot — hidden from humans, filled by bots */}
        <input
          type="text" name="website" value={honeypot}
          onChange={e => setHoneypot(e.target.value)}
          style={{ display: 'none' }} aria-hidden="true" tabIndex={-1} autoComplete="off"
        />
        {/* Web3Forms bot protection */}
        <input type="checkbox" name="botcheck" style={{ display: 'none' }} aria-hidden="true" />
        {tourName && <input type="hidden" name="tour" value={tourName} />}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>First Name <span className="text-sunset-400">*</span></label>
            <input
              type="text" required placeholder="Jane"
              value={firstName} onChange={e => setFirstName(e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Last Name <span className="text-sunset-400">*</span></label>
            <input
              type="text" required placeholder="Smith"
              value={lastName} onChange={e => setLastName(e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        <div>
          <label className={labelCls}>Email <span className="text-sunset-400">*</span></label>
          <input
            type="email" required placeholder="jane@example.com"
            value={email} onChange={e => setEmail(e.target.value)}
            className={inputCls}
          />
        </div>

        <div>
          <label className={labelCls}>Message <span className="text-sunset-400">*</span></label>
          <textarea
            required rows={5}
            placeholder="Write your message to Emil here — questions about Sri Lanka, a specific tour, availability, or anything else..."
            value={message} onChange={e => setMessage(e.target.value)}
            className={`${inputCls} resize-none`}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary justify-center py-3.5 text-sm"
        >
          {loading ? (
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
              Send Message
            </>
          )}
        </button>

        <p className="text-xs text-warmgray text-center">
          Want to plan a tour?{' '}
          <a href="/tailor-made" className="text-forest-600 font-medium hover:text-sunset-400 transition-colors">
            Use the Tour Planner →
          </a>
        </p>
      </form>
    </div>
  );
}
