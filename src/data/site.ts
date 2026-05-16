export const SITE = {
  name:        'ChauffeurEmilLankaTour',
  tagline:     'Sri Lanka Through The Eyes of Emil',
  description: 'Private chauffeur-guided Sri Lanka tours with Emil Jayasekara — wildlife safaris, cultural journeys, beach escapes & custom itineraries crafted for discerning travellers.',
  url:         'https://www.chauffeuremillankatour.com',
  phone:       '+94 76 191 7039',
  whatsapp:    '94761917039',
  email:       'emiljayasekara5@gmail.com',
  guide: {
    name:       'Emil Jayasekara',
    shortName:  'Emil',
    title:      'Senior Private Chauffeur Guide',
    experience: '14+ Years',
    bio:        'Born and raised on the island, Emil Jayasekara brings 14 years of private guiding expertise and an unrivalled passion for Sri Lanka\'s hidden stories. A fluent English speaker and certified wildlife tracker, Emil transforms every journey into a deeply personal, unforgettable experience.',
    photo:      '/images/emil-guide.jpg',
  },
  social: {
    instagram: 'https://instagram.com/chauffeuremillankatour',
    facebook:  'https://facebook.com/chauffeuremillankatour',
    tripadvisor: '#',
  },
  trustBadges: [
    { icon: '⭐', label: '5-Star Rated', sub: '300+ Reviews' },
    { icon: '🏅', label: 'Certified Guide', sub: 'SLTDA Licensed' },
    { icon: '🌿', label: 'Eco Responsible', sub: 'Sustainable Travel' },
    { icon: '🔒', label: 'Fully Insured', sub: 'Peace of Mind' },
  ],
} as const;
