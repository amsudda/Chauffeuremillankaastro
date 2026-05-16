import { useRef, useState } from 'react';

const TESTIMONIALS = [
  {
    name: 'fabienne P', country: '🇮🇪 Dublin, Ireland', date: 'January 2026', avatar: 'FP', avatarBg: '#1B3A2D',
    title: 'A human encounter',
    review: 'Emil greeted us at the airport for our stay in Sri Lanka. He organized our tour according to our desires and also booked us hotels. Everything was perfect Emil is always available even in the evening to help us or inquire.',
  },
  {
    name: 'PH d', country: '🌍 Verified Guest', date: 'December 2025', avatar: 'PH', avatarBg: '#C9A84C',
    title: 'Fantastic',
    review: 'We made a tour through Sri Lanka with Emil and he really showed us a lot of beautiful places. Emil also came up with many good suggestions, told a lot about his Country and also organized the excursions at the right time and place. Apart from that, Emil is a very nice and pleasant man to have with you as a traveling companion. We had a great time with you!!!',
  },
  {
    name: 'Maykel R', country: '🌍 Verified Guest', date: 'August 2025', avatar: 'MR', avatarBg: '#E07B39',
    title: 'Best guide',
    review: 'We had an unforgettable holiday, partly because of Emil. What a top guide! Thinks very much along, helps you plan your trip. Has good tips, keeps all his appointments and a great safe driver. While traveling he tells all kinds of background info about SriLanka, which is super interesting. He speaks good English. For my birthday I was even surprised with a birthday cake. We can definitely recommend him and can\'t imagine a better guide.',
  },
  {
    name: 'Sylvia S', country: '🌍 Verified Guest', date: 'November 2024', avatar: 'SS', avatarBg: '#267d5d',
    title: 'Outstanding Tour Guide in Sri Lanka!',
    review: 'We had the privilege of exploring Sri Lanka with Emil, and it was an unforgettable experience! From the moment we met, he was warm, friendly, and professional, making us feel comfortable and excited for the journey ahead. Emil possesses an incredible depth of knowledge about Sri Lanka\'s history, culture, and natural beauty. Whether it was the ancient ruins of Sigiriya, the serene tea plantations of Nuwara Eliya, or the vibrant streets of Ella, he brought each location to life with captivating stories and interesting facts. What stood out the most was Emil\'s attention to detail and ability to adapt the itinerary to suit our preferences. He recommended hidden gems that weren\'t on the usual tourist trail, giving us a unique perspective on this beautiful country. Logistics were seamless – every transfer, hotel check-in, and excursion was well-organized, leaving us free to enjoy our trip without stress. Emil also ensured that we tried authentic Sri Lankan cuisine, which was a highlight of the journey! If you\'re planning a trip to Sri Lanka, we highly recommend Emil. He turned an already incredible destination into a once-in-a-lifetime experience.',
  },
  {
    name: 'Erwan L', country: '🌍 Verified Guest', date: 'January 2025', avatar: 'EL', avatarBg: '#1B3A2D',
    title: 'Good trip with Emil',
    review: 'I\'ve been on a trip of 2 weeks with my brother and mother Emil is always on time, has a funny laugh and is very friendly. He knows his country, his way around and will be of good advice. You can definitly trust him, he isn\'t there just for money ! Treat him like a human being and at the end you will have great memories with Emil ! And bonus, he takes lots of photos so you\'ll have some extra pictures and footage. Thank you Emil :)',
  },
  {
    name: 'Mike E', country: '🌍 Verified Guest', date: 'January 2024', avatar: 'ME', avatarBg: '#C9A84C',
    title: 'Great driver',
    review: 'Took us to and from Sigiriya. He drives neatly and is a very friendly and cheerful man. Very comfortable to sit in the car with him.',
  },
  {
    name: 'FarAway53947008606', country: '🇩🇪 Germany', date: 'October 2023', avatar: 'FA', avatarBg: '#E07B39',
    title: 'Book Emil, best driver!',
    review: 'From Germany (via Facebook) we looked for a driver for the Sigiriya to Arugam Bay route and found Emil. Our first hotel was in Anaradhapura and the hotel picked us up from the airport. Funnily enough, it was Emil, what a crazy coincidence :) Emil is great and we liked him a lot and he is a safe driver. Somehow it came about that he accompanied us for a longer period of time from Anaradhapura via Sigiriya to Arugam Bay, then to Ella. Later again from Nuwara Eliya to Udawalawe National Park and down to the south, where our paths then parted. We can highly recommend Emil, book a tour with him!',
  },
  {
    name: 'Vincent R', country: '🌍 Verified Guest', date: 'September 2023', avatar: 'VR', avatarBg: '#267d5d',
    title: '2 weeks and a few thousand KM of excellence',
    review: 'We (myself, 5 sisters and various extended family members) all descended on Sri Lanka for a memorial service, a milestone birthday, and a vacation all rolled into one. Between meeting up with arriving and departing family members, sightseeing, running errands, attending planned and impromptu gatherings, and changing residences as part of our tour, there was hardly a day of the trip where we weren\'t on the move, taking both short and long trips the entire time. Throughout it all, Emil handled pre-planned logistics and spontaneous changes (both ones we requested, and ones he suggested we\'d like) with equal ease, making it all look easy along the way. By the end of the trip, it felt like Emil was a trusted member of the family, and he\'ll be one of the first to know the details when we plan our next return trip. :) Thanks again, Emil!',
  },
  {
    name: 'Petr C', country: '🌍 Verified Guest', date: 'September 2023', avatar: 'PC', avatarBg: '#1B3A2D',
    title: 'Great experience having Emil with us',
    review: 'Me and my girlfriend were looking for a driver from Anuradhapura to Sigiriya. The hotel owner recommended Emil. What started as a one-way trip turned to hiring Emil for 6 days. Emil is not only a safe and experienced driver, but also a proactive and skilled guide and wonderful person. He\'s a humble and loving guy, always honest and ready to help. His recommendations along the way were 100% true, so we saved our precious time and money. Our trip got even more effective thanks to him. We\'re grateful we had Emil by our side in Sri Lanka and we would recommend him to any traveller who wants to enjoy his Sri Lanka trip to the maximum.',
  },
  {
    name: 'Raquel Victoria D', country: '🇪🇸 Barcelona, Spain', date: 'July 2023', avatar: 'RD', avatarBg: '#C9A84C',
    title: 'Great driver service!',
    review: 'Emil is an excellent driver, a better person. He took us to visit Aukana Buddha and Dambulla caves to Sigiriya. The next day, for a really good price, he took us to the Polonnaruwa temples. He also helped us to negotiate the safari in Kaudulla Park. In every moment, he was very attentive, respectful and cheerful. Also, he knows a a lot about Sri Lanka history, cultural places and gave us very usefull information and recommendations. I recommend him 100%.',
  },
  {
    name: 'Akvile G', country: '🌍 Verified Guest', date: 'February 2023', avatar: 'AG', avatarBg: '#E07B39',
    title: 'A wonderful and comfy ride',
    review: 'We booked a ride from Kandy to Ella with a stop at Pidurangala, so this was a custom route with waiting time. We loved this experience. It wasn\'t expensive, totally wort every penny, the driver is super nice, comunicates in English very well and told us a lot of interesting stories. The car is super comfortable and I would book this expwrience again in a heartbeat.',
  },
  {
    name: 'Deborah W', country: '🌍 Verified Guest', date: 'July 2022', avatar: 'DW', avatarBg: '#267d5d',
    title: 'Perfekt Trip',
    review: 'Emil arranged two Trips by car throughout our Sri Lankan Journey. Everything went perfectly fine, as scheduled. We can recommend going with Emil to anybody.',
  },
  {
    name: 'Marie M', country: '🌍 Verified Guest', date: 'January 2020', avatar: 'MM', avatarBg: '#1B3A2D',
    title: 'Best guide in Sri Lanka!',
    review: 'We had a wonderful trip together with Emil through Sri Lanka. He picked us up from the airport and took excellent care of us the whole trip. We left the planning of the tour to him to a large extent, but nevertheless he was always happy to take care of special wishes. The accommodations he chose for us were always very nice and clean and during the day we had a great program every day. We can recommend the trip with Emil one hundred percent!',
  },
  {
    name: 'Florence S', country: '🇫🇷 Aigues-Mortes, France', date: 'January 2020', avatar: 'FS', avatarBg: '#C9A84C',
    title: 'Perfect Driver',
    review: 'Emil is a super driver. Discreet. always in a good mood. lots of good advice. he knows his job perfectly. places to see and the history of the country. a pleasure to travel with him. I recommend it to you.',
  },
  {
    name: 'Antoine P', country: '🇦🇪 Dubai, UAE', date: 'December 2019', avatar: 'AP', avatarBg: '#E07B39',
    title: 'Road trip Sri Lanka',
    review: 'A big thank you to our friend Emil, he organized perfectly our trip, gave us good advice and showed us wonderful spots, he made our trip amazing. It was a real pleasure to spend our week with him. Thank you very much Emil for your kindness and availability!',
  },
  {
    name: 'pvdv77', country: '🌍 Verified Guest', date: 'October 2019', avatar: 'PV', avatarBg: '#267d5d',
    title: 'Sri Lanka August 2019',
    review: 'Family-Holiday with grand-parents, wife and 4 year old son (5 persons). We were on tour 17 days with our guide Emil. He picked us up at colombo airport, organized all accomodations, helped us with the trip coming accross the whole island, gave us tons of tips and even some nice surprises. He is such a nice person. Helpful, polite, very respectful, a great person to talk and listen to. Very cautious and discreet. His english is very good and it is no problem to talk to him. Emil is the perfect guide! Highly recommended! Thank you, Emil!!!',
  },
  {
    name: 'Kodama7', country: '🇬🇧 Leeds, United Kingdom', date: 'April 2019', avatar: 'K7', avatarBg: '#1B3A2D',
    title: 'Very professional driver and guide.',
    review: 'Our family had the great pleasure of meeting Emil in April after another transfer driver recommended him for our onward travels. Emil was friendly, courteous and informative, without ever being imposing. Emil was very discreet and didn\'t want to get in the way of the family\'s experience, which was much appreciated. This, together with Emil\'s professional, safe driving and competitive pricing make Emil an ideal choice for any other families planning their Sri Lankan holiday. While we contacted Emil mainly for transfers, he recommended we visit Ritigala Forest Monestary when we were in the Haberana area and he could act as a guide. This proved to be one of the highlights of our trip — our little Indiana Jones moment, surrounded by wildlife and no tourists at all! The Monkeys in the forest were especially popular with our children! Emil also drove us around the Anuradhapura Sacred City, with the air con being a godsend in one of the hottest April\'s on record. All in all, we wouldn\'t hesitate to recommend Emil for transfers or as a guide. Thanks for all your help.',
  },
  {
    name: 'sylvie h', country: '🌍 Verified Guest', date: 'December 2018', avatar: 'SH', avatarBg: '#C9A84C',
    title: 'A very competent driver',
    review: 'I travelled with my daughter and we feel really secure with Emil. He knows very well his country and helps us to make our tour. We had wonderful holidays. Thanks so much Emil !',
  },
  {
    name: 'Mélanie H', country: '🌍 Verified Guest', date: 'November 2018', avatar: 'MH', avatarBg: '#E07B39',
    title: 'AN EXCELLENT DRIVER !',
    review: 'We traveled with our 2 children 8 years old in july 2016. Emil was more than a chauffeur. He was a great help in shaping our trip. He\'s always been careful on the road. He respected our wishes with respect. He knew to be discreet in our family. He was able to find us an excellent accommodation in Haputale, which will remain the best memory. He was attentive with our children. He made us discover Sri Lanka and we are very grateful to him. If you have to go to Sri Lanka, call him! I recommend it! He is the BEST !',
  },
  {
    name: 'Hugues D', country: '🇮🇳 Gulmarg, India', date: 'November 2018', avatar: 'HD', avatarBg: '#267d5d',
    title: 'Tour of Sri Lanka',
    review: 'Wonderful ! Emile has organized everything for us and thank to him our holidays were great. He is very kind, you can trust him !',
  },
];

const Stars = () => (
  <div className="flex gap-0.5 mb-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    ))}
  </div>
);

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft]   = useState(false);
  const [canRight, setCanRight] = useState(true);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    const amount = card ? card.offsetWidth + 20 : 320;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="py-20 sm:py-28 bg-forest-gradient overflow-hidden" aria-labelledby="testimonial-heading">
      <div className="section-wrap">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3"
             style={{ fontFamily: "'Inter',sans-serif" }}>
            Guest Stories
          </p>
          <h2 id="testimonial-heading" className="font-display text-section text-ivory mb-4">
            Words From Our Travellers
          </h2>
          <p className="text-white/60 max-w-md mx-auto">
            {TESTIMONIALS.length} real reviews from guests who experienced Sri Lanka with Emil — straight from TripAdvisor.
          </p>
        </div>

        {/* Scroll track */}
        <div className="relative">

          {/* Left arrow */}
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10
                        w-10 h-10 rounded-full border border-white/20 bg-forest-800/80 backdrop-blur-sm
                        flex items-center justify-center text-white transition-all duration-200
                        ${canLeft ? 'opacity-100 hover:bg-white/10' : 'opacity-0 pointer-events-none'}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          {/* Cards row */}
          <div
            ref={scrollRef}
            onScroll={onScroll}
            className="flex gap-5 overflow-x-auto pb-3"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollSnapType: 'x mandatory' }}
          >
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                data-card
                className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col relative flex-shrink-0"
                style={{ width: 'clamp(270px, 78vw, 340px)', scrollSnapAlign: 'start' }}
              >
                {/* Decorative quote */}
                <div className="absolute top-3 right-4 text-5xl text-gold-400/12 font-serif leading-none select-none">"</div>

                <Stars />

                {/* Title */}
                <p className="text-gold-300 text-xs font-semibold mb-2 truncate">{t.title}</p>

                {/* Review text */}
                <blockquote
                  className="text-white/80 leading-relaxed flex-1 mb-5 text-sm"
                  style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '0.95rem' }}
                >
                  "{t.review}"
                </blockquote>

                {/* Footer */}
                <div className="border-t border-white/10 pt-4 flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                    style={{ backgroundColor: t.avatarBg }}
                  >
                    {t.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm leading-tight truncate">{t.name}</p>
                    <p className="text-white/45 text-xs truncate">{t.country}</p>
                  </div>
                  <p className="text-white/30 text-xs flex-shrink-0">{t.date}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10
                        w-10 h-10 rounded-full border border-white/20 bg-forest-800/80 backdrop-blur-sm
                        flex items-center justify-center text-white transition-all duration-200
                        ${canRight ? 'opacity-100 hover:bg-white/10' : 'opacity-0 pointer-events-none'}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* Mobile swipe hint */}
        <p className="text-center text-white/30 text-xs mt-5 sm:hidden">← Swipe to read more reviews →</p>

        {/* Attribution */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <span className="text-white/40 text-xs">Reviews from</span>
          <span className="text-white/60 text-sm font-semibold">TripAdvisor</span>
          <span className="text-white/20 text-xs">·</span>
          <a
            href="https://www.tripadvisor.com/Attraction_Review-g1500185-d15242639-Reviews-Chauffeur_Emil_Lanka_Tours-Katunayake_Negombo_Western_Province.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-400/70 text-xs hover:text-gold-400 transition-colors underline underline-offset-2"
          >
            View all reviews on TripAdvisor →
          </a>
        </div>

      </div>
    </section>
  );
}
