import { useState } from 'react';
import type { ItineraryDay } from '../../data/tours';

interface Props { days: ItineraryDay[]; }

function DayCard({ day, isOpen, onToggle, isLast }: {
  day: ItineraryDay; isOpen: boolean; onToggle: () => void; isLast: boolean;
}) {
  return (
    <div className="relative pl-14">
      {/* Vertical timeline connector */}
      {!isLast && (
        <span className="absolute left-[15px] top-9 bottom-[-24px] w-px bg-stone" />
      )}

      {/* Day circle badge */}
      <span className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-forest-600 text-white
                       text-xs font-bold flex items-center justify-center shadow-sm z-10">
        {day.day}
      </span>

      {/* Collapsible card */}
      <button
        onClick={onToggle}
        className={`w-full text-left border rounded-2xl p-4 md:p-5 transition-all duration-200
                    ${isOpen
                      ? 'border-forest-600/30 bg-stone/30 shadow-card'
                      : 'border-stone bg-stone/15 hover:bg-stone/30'}`}
        aria-expanded={isOpen}
      >
        {/* Card header */}
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base md:text-lg font-semibold text-forest-700 leading-tight"
              style={{ fontFamily: "'Playfair Display',serif" }}>
            {day.title}
          </h3>
          <svg className={`w-5 h-5 text-warmgray flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
               fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>

        {/* Collapsed preview: route + drive chips */}
        {!isOpen && (
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {day.from !== day.to && (
              <span className="inline-flex items-center gap-1 text-xs text-warmgray">
                <span className="font-medium text-forest-600">{day.from}</span>
                <svg className="w-3 h-3 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
                <span className="font-medium text-forest-600">{day.to}</span>
              </span>
            )}
            {day.driveTime && day.driveKm > 0 && (
              <span className="text-xs text-warmgray/70">· {day.driveTime}</span>
            )}
          </div>
        )}

        {/* Expanded content */}
        <div className={`overflow-hidden transition-all duration-400 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          {/* Day overview text */}
          <p className="text-sm md:text-base text-warmgray leading-relaxed mb-4">
            {day.description}
          </p>

          {/* Hotel stay card */}
          {day.hotelStay?.name && day.hotelStay.name !== 'Departure day — no overnight' && (
            <div className="inline-flex items-start gap-2.5 rounded-xl border border-stone bg-white/80 px-3.5 py-2.5 mb-4">
              <svg className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              <div>
                <p className="text-xs text-warmgray">Accommodation</p>
                <p className="text-sm font-semibold text-forest-700">{day.hotelStay.name}</p>
                {day.hotelStay.note && <p className="text-xs text-warmgray">{day.hotelStay.note}</p>}
              </div>
            </div>
          )}

          {/* Rich activity details */}
          {day.activityDetails && day.activityDetails.length > 0 ? (
            <div className="space-y-3 mt-2">
              {day.activityDetails.map((act, i) => (
                <div key={i} className="rounded-xl border border-stone bg-white p-3.5 md:p-4">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <p className="text-sm md:text-base font-semibold text-forest-700">{act.title}</p>
                    {act.destination && (
                      <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-forest-600/10 text-forest-600 font-medium">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        {act.destination}
                      </span>
                    )}
                  </div>
                  <p className="text-xs md:text-sm text-warmgray leading-relaxed mb-3">{act.description}</p>
                  {act.images && act.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {act.images.map((img, j) => (
                        <div key={j} className="rounded-lg overflow-hidden border border-stone bg-stone/20">
                          <img src={img} alt={`${act.title} ${j + 1}`} loading="lazy"
                               className="w-full h-24 md:h-28 object-cover transition-transform duration-500 hover:scale-105" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* Fallback: simple activity chips */
            day.activities.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {day.activities.map(a => (
                  <span key={a} className="activity-chip">{a}</span>
                ))}
              </div>
            )
          )}

          {/* Drive + meals strip */}
          <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-stone">
            {day.driveKm > 0 && (
              <span className="inline-flex items-center gap-1.5 text-xs text-warmgray">
                <svg className="w-3.5 h-3.5 text-forest-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                </svg>
                {day.driveTime} · {day.driveKm} km
              </span>
            )}
            {day.meals.map(m => (
              <span key={m} className="inline-flex items-center gap-1 text-xs text-warmgray bg-stone/40 px-2.5 py-1 rounded-full">
                {m === 'Breakfast' ? '☀️' : m === 'Lunch' || m === 'Lunch box' ? '☕' : '🌙'} {m}
              </span>
            ))}
          </div>
        </div>
      </button>
    </div>
  );
}

export default function ItineraryAccordion({ days }: Props) {
  const [openDay, setOpenDay] = useState<number>(0);

  if (!days || days.length === 0) {
    return (
      <div className="bg-stone/30 rounded-2xl p-8 text-center text-warmgray border border-stone">
        <p className="font-display text-xl text-forest-700 mb-2">Custom Itinerary</p>
        <p className="text-sm">Contact Emil to create your personalised day-by-day plan.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {days.map((day, idx) => (
        <DayCard
          key={day.day}
          day={day}
          isOpen={openDay === idx}
          onToggle={() => setOpenDay(openDay === idx ? -1 : idx)}
          isLast={idx === days.length - 1}
        />
      ))}
    </div>
  );
}
