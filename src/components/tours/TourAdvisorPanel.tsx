import { useState, useEffect } from 'react';

interface FormSnapshot {
  interests:     string[];
  occasion:      string;
  travelStyle:   string;
  arrivalDate:   string;
  departureDate: string;
  totalTravelers: number;
  hasKids:       boolean;
}

interface Suggestion {
  headline: string;
  body:     string;
  route?:   string[];
  tip?:     string;
  mood?:    'default' | 'romantic' | 'wildlife' | 'culture' | 'adventure' | 'wellness';
}

const MOOD_COLORS: Record<string, string> = {
  default:   'from-forest-700 to-forest-600',
  romantic:  'from-rose-700 to-pink-600',
  wildlife:  'from-amber-700 to-orange-600',
  culture:   'from-indigo-700 to-violet-600',
  adventure: 'from-teal-700 to-cyan-600',
  wellness:  'from-emerald-700 to-green-600',
};

function buildSuggestion(data: FormSnapshot): Suggestion {
  const { interests, occasion, travelStyle, arrivalDate, totalTravelers, hasKids } = data;
  const noInput = interests.length === 0 && !occasion && travelStyle === 'mid-range' && !arrivalDate;

  // ─── DEFAULT ──────────────────────────────────────────────────────────────
  if (noInput) {
    return {
      mood: 'default',
      headline: "Your trip starts here ✨",
      body: "Start selecting what excites you — your ideal Sri Lanka route will appear here, live. I'll suggest destinations, highlight the best experiences, and share insider tips as you fill the form.",
      tip: "Most guests start with their top 2–3 interests. Try selecting a few!",
    };
  }

  // ─── HONEYMOON / ROMANCE ──────────────────────────────────────────────────
  if (occasion === 'Honeymoon / Romance' || occasion === 'Anniversary') {
    const hasBeach = interests.includes('beach');
    const hasTea   = interests.includes('tea') || interests.includes('train');
    return {
      mood: 'romantic',
      headline: "A romantic Sri Lanka journey",
      body: `For a ${occasion === 'Anniversary' ? 'special anniversary' : 'honeymoon'}, I love pairing ${hasTea ? 'misty hill country mornings — imagine waking up in a tea estate bungalow above the clouds —' : 'the ancient Cultural Triangle'} with a private beach finale in ${hasBeach ? 'Mirissa or clifftop Tangalle' : 'the south coast'}. I know boutique villas most guests never find online.`,
      route: hasTea ? ['Kandy', 'Nuwara Eliya', 'Ella', 'Mirissa'] : ['Sigiriya', 'Kandy', 'Galle', 'Mirissa'],
      tip: `I arrange private candlelit dinners on the beach and stargazing in the hill country — things that make a trip truly unforgettable.`,
    };
  }

  // ─── FAMILY ──────────────────────────────────────────────────────────────
  if (occasion === 'Family Holiday' || hasKids) {
    return {
      mood: 'wildlife',
      headline: "A family adventure",
      body: "Families absolutely love the gentle elephant safaris at Udawalawe, the elephant orphanage at Pinnawala, and the scenic train ride into the hills. I pace every family trip so children stay energised and delighted — with zero rushed mornings.",
      route: ['Colombo', 'Pinnawala', 'Kandy', 'Ella', 'Yala'],
      tip: "I always have snacks, games, and patience for the road — just ask any family I've guided!",
    };
  }

  // ─── WELLNESS / AYURVEDA ──────────────────────────────────────────────────
  if (interests.includes('ayurveda')) {
    const hasGem = interests.includes('gem-store') || interests.includes('gem-site');
    return {
      mood: 'wellness',
      headline: "A wellness & discovery journey",
      body: `An Ayurvedic retreat along the west coast — Beruwala or Bentota — is deeply restorative. ${hasGem ? "I'd pair this with a visit to a gem mine near Ratnapura, Sri Lanka's gem capital — you can watch master cutters at work." : "Combine it with Galle Fort's colonial charm and a gentle beach stay to finish."}`,
      route: hasGem ? ['Colombo', 'Ratnapura', 'Bentota', 'Galle'] : ['Colombo', 'Bentota', 'Galle', 'Mirissa'],
      tip: hasGem ? "I'll take you inside a working gem mine — an experience 99% of tourists never see." : "The Ayurvedic doctors I recommend have been treating guests for decades. Genuine, not tourist-grade.",
    };
  }

  // ─── WILDLIFE FOCUS ───────────────────────────────────────────────────────
  if (interests.includes('wildlife') && interests.length <= 3) {
    const hasWhale = interests.includes('whales');
    return {
      mood: 'wildlife',
      headline: "A classic wildlife circuit",
      body: `I'm picturing a safari-first trip: Sinharaja rainforest for birds and leopards at dawn, Yala for the highest leopard density in the world, Udawalawe for elephants, and Wilpattu to finish in peaceful solitude.${hasWhale ? " We'll add a morning whale watching boat in Mirissa — blue whales are extraordinary." : ""}`,
      route: hasWhale
        ? ['Sinharaja', 'Yala', 'Udawalawe', 'Mirissa', 'Wilpattu']
        : ['Sinharaja', 'Yala', 'Udawalawe', 'Wilpattu'],
      tip: "Early morning Yala — 5:30am — is when the leopards are most active. I'll get you there before the crowds.",
    };
  }

  // ─── CULTURAL FOCUS ───────────────────────────────────────────────────────
  if (interests.includes('culture') && !interests.includes('wildlife') && !interests.includes('beach')) {
    return {
      mood: 'culture',
      headline: "The Cultural Triangle",
      body: "Sigiriya's lion rock at sunrise. Polonnaruwa's ancient stone buddhas. The sacred Bodhi tree in Anuradhapura. And Kandy's Temple of the Tooth Relic. This is Sri Lanka's 2,500-year history, alive and walking.",
      route: ['Dambulla', 'Sigiriya', 'Polonnaruwa', 'Anuradhapura', 'Kandy'],
      tip: "I climb Sigiriya before 7am. No crowds, golden light, and you'll have the frescoes almost to yourself.",
    };
  }

  // ─── HILL COUNTRY / TRAIN / TEA ──────────────────────────────────────────
  if ((interests.includes('tea') || interests.includes('train')) && !interests.includes('wildlife')) {
    return {
      mood: 'adventure',
      headline: "Hill country & the scenic train",
      body: "The Ella to Kandy train is one of the world's great rail journeys — misty valleys, waterfall ravines, and tea estates sliding past your window. At Nine Arch Bridge, we'll time it perfectly to photograph the blue train arching through the jungle.",
      route: ['Kandy', 'Nuwara Eliya', 'Ella', 'Nine Arch Bridge'],
      tip: "I have 4 complimentary observation saloon train tickets to offer — the best seats in the house. First come, first served.",
    };
  }

  // ─── BEACH / WHALE ───────────────────────────────────────────────────────
  if (interests.includes('beach') && !interests.includes('wildlife') && !interests.includes('culture')) {
    const hasWhale = interests.includes('whales');
    return {
      mood: 'adventure',
      headline: "Sri Lanka's south coast",
      body: `Galle Fort's Dutch ramparts, the surf at Weligama, and the serene bay of Mirissa.${hasWhale ? " Add a dawn whale watching trip — spotting a 30-metre blue whale at sunrise is something you'll never forget." : " The south coast is endlessly beautiful at a relaxed pace."}`,
      route: ['Galle', 'Weligama', 'Mirissa'],
      tip: hasWhale ? "Blue whale sightings peak December to April. Sperm whales are year-round." : "I know a beach restaurant in Mirissa with no sign, no tourists, and the best grilled fish in the country.",
    };
  }

  // ─── GRAND TOUR (many interests) ─────────────────────────────────────────
  if (interests.length >= 4) {
    const days = data.arrivalDate && data.departureDate
      ? Math.round((new Date(data.departureDate).getTime() - new Date(data.arrivalDate).getTime()) / 86400000)
      : null;
    return {
      mood: 'default',
      headline: "A grand Sri Lanka journey",
      body: `With your broad range of interests, this is shaping up to be an unforgettable full-island circuit — wildlife, culture, hill country, coast. ${days && days >= 12 ? `${days} days is perfect for covering everything comfortably.` : "I'd suggest at least 10–12 days to do it justice."} I'll weave every interest in so nothing feels rushed or skipped.`,
      route: ['Colombo', 'Cultural Triangle', 'Hill Country', 'Yala', 'South Coast'],
      tip: travelStyle === 'luxury' ? "With a boutique/luxury style, I'll handpick properties that match the landscape — jungle, mountain, ocean." : "I know the best value stays in every region — beautiful places that won't break the budget.",
    };
  }

  // ─── LUXURY STYLE ────────────────────────────────────────────────────────
  if (travelStyle === 'luxury') {
    return {
      mood: 'default',
      headline: "A luxury private experience",
      body: "With a boutique/luxury preference, I'd arrange the Heritance Kandalama — an architectural masterpiece inside a rock face — a private safari tent camp in Yala, and a clifftop heritage villa in Galle. Every moment, exclusive.",
      route: ['Sigiriya', 'Kandalama', 'Yala', 'Galle'],
      tip: "I have long-standing relationships with the finest properties. I often secure upgrades and exclusive experiences my guests don't expect.",
    };
  }

  // ─── SOLO ADVENTURE ──────────────────────────────────────────────────────
  if (occasion === 'Solo Adventure') {
    return {
      mood: 'adventure',
      headline: "Solo — the best way to discover",
      body: "Solo travellers get the most authentic Sri Lanka. No compromise on pace, no waiting around. Whether it's a 5am leopard safari, a spontaneous side road, or lingering over a local lunch — it's your call, always.",
      route: interests.includes('wildlife') ? ['Yala', 'Udawalawe', 'Minneriya'] : ['Sigiriya', 'Ella', 'Galle'],
      tip: "I've guided hundreds of solo travellers. You'll be in safe, expert hands — and you'll leave with friends.",
    };
  }

  // ─── FALLBACK ─────────────────────────────────────────────────────────────
  return {
    mood: 'default',
    headline: "Your trip is taking shape…",
    body: "Keep selecting your preferences — the more I know, the more precisely I can shape your perfect Sri Lanka journey.",
    tip: "Tell me your occasion or travel style and I can get much more specific.",
  };
}

// ─── ROUTE DOT COMPONENT ──────────────────────────────────────────────────
function RouteDots({ stops }: { stops: string[] }) {
  return (
    <div className="flex items-center gap-1 flex-wrap mt-3">
      {stops.map((stop, i) => (
        <div key={stop} className="flex items-center gap-1">
          <div className="flex items-center gap-1 bg-white/20 rounded-full px-2.5 py-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-gold-300 flex-shrink-0" />
            <span className="text-white text-[10px] font-medium leading-none">{stop}</span>
          </div>
          {i < stops.length - 1 && (
            <svg className="w-2.5 h-2.5 text-white/40 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────
export default function TourAdvisorPanel() {
  const [snapshot,   setSnapshot]   = useState<FormSnapshot>({
    interests: [], occasion: '', travelStyle: 'mid-range',
    arrivalDate: '', departureDate: '', totalTravelers: 0, hasKids: false,
  });
  const [suggestion, setSuggestion] = useState<Suggestion>(buildSuggestion({
    interests: [], occasion: '', travelStyle: 'mid-range',
    arrivalDate: '', departureDate: '', totalTravelers: 0, hasKids: false,
  }));
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const data = (e as CustomEvent<FormSnapshot>).detail;
      setSnapshot(data);
      setIsUpdating(true);
      setTimeout(() => {
        setSuggestion(buildSuggestion(data));
        setIsUpdating(false);
      }, 350);
    };
    window.addEventListener('tailormade-form-update', handler);
    return () => window.removeEventListener('tailormade-form-update', handler);
  }, []);

  const mood = suggestion.mood ?? 'default';
  const gradientClass = MOOD_COLORS[mood] ?? MOOD_COLORS.default;
  const hasInput = snapshot.interests.length > 0 || !!snapshot.occasion || !!snapshot.arrivalDate;

  return (
    <div className={`rounded-2xl overflow-hidden transition-all duration-500`}>
      {/* Header bar */}
      <div className={`bg-gradient-to-r ${gradientClass} px-5 py-4 transition-all duration-700`}>
        <div className="flex items-center gap-2.5 mb-1">
          {/* Icon */}
          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            {/* Live indicator */}
            <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white transition-colors duration-300 ${isUpdating ? 'bg-amber-400' : 'bg-green-400 animate-pulse'}`} />
          </div>
          <div>
            <p className="text-white font-semibold text-xs leading-none">🗺️ Trip Planner</p>
            <p className="text-white/60 text-[10px] leading-none mt-0.5">
              {isUpdating ? 'Thinking…' : hasInput ? 'Updated based on your selections' : 'Fill the form to personalise'}
            </p>
          </div>
        </div>

        {/* Headline + body */}
        <div className={`transition-all duration-300 ${isUpdating ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}`}>
          <h3 className="text-white font-display text-base leading-snug mt-3">
            {suggestion.headline}
          </h3>
          <p className="text-white/80 text-xs leading-relaxed mt-1.5">
            {suggestion.body}
          </p>

          {/* Route dots */}
          {suggestion.route && <RouteDots stops={suggestion.route} />}
        </div>
      </div>

      {/* Tip footer */}
      {suggestion.tip && (
        <div className={`bg-stone/40 border-t border-stone px-5 py-3.5 transition-all duration-300 ${isUpdating ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-gold-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-gold-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-xs text-warmbrown leading-relaxed italic">
              "{suggestion.tip}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
