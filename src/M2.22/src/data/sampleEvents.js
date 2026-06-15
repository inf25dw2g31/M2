export const sampleEvents = [
  {
    id: 'sample-madrid-festival',
    name: 'Madrid Summer Sounds',
    url: 'https://www.ticketmaster.es/',
    dates: {
      start: {
        localDate: '2026-07-18',
        localTime: '20:30:00',
      },
      status: { code: 'onsale' },
    },
    sales: {
      public: {
        startDateTime: '2026-03-10T10:00:00Z',
        endDateTime: '2026-07-18T18:00:00Z',
      },
    },
    priceRanges: [{ min: 45, max: 120, currency: 'EUR' }],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
        ratio: '16_9',
      },
    ],
    classifications: [
      {
        segment: { name: 'Music' },
        genre: { name: 'Pop' },
      },
    ],
    _embedded: {
      venues: [
        {
          name: 'WiZink Center',
          address: { line1: 'Av. de Felipe II' },
          postalCode: '28009',
          city: { name: 'Madrid' },
          country: { name: 'Spain' },
        },
      ],
      attractions: [{ name: 'The Midnight Set' }, { name: 'Sofia Norte' }],
    },
  },
  {
    id: 'sample-madrid-indie',
    name: 'Madrid Indie Nights',
    url: 'https://www.ticketmaster.es/',
    dates: {
      start: {
        localDate: '2026-08-02',
        localTime: '21:00:00',
      },
      status: { code: 'onsale' },
    },
    sales: {
      public: {
        startDateTime: '2026-04-15T09:00:00Z',
        endDateTime: '2026-08-02T19:00:00Z',
      },
    },
    priceRanges: [{ min: 32, max: 74, currency: 'EUR' }],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1200&q=80',
        ratio: '16_9',
      },
    ],
    classifications: [
      {
        segment: { name: 'Music' },
        genre: { name: 'Indie' },
      },
    ],
    _embedded: {
      venues: [
        {
          name: 'La Riviera',
          address: { line1: 'Paseo Bajo de la Virgen del Puerto' },
          postalCode: '28005',
          city: { name: 'Madrid' },
          country: { name: 'Spain' },
        },
      ],
      attractions: [{ name: 'Mirror Coast' }],
    },
  },
  {
    id: 'sample-madrid-theatre',
    name: 'Noite de Teatro e Luz',
    url: 'https://www.ticketmaster.es/',
    dates: {
      start: {
        localDate: '2026-09-12',
        localTime: '19:00:00',
      },
      status: { code: 'onsale' },
    },
    sales: {
      public: {
        startDateTime: '2026-05-01T10:00:00Z',
        endDateTime: '2026-09-12T17:00:00Z',
      },
    },
    priceRanges: [{ min: 18, max: 38, currency: 'EUR' }],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=80',
        ratio: '16_9',
      },
    ],
    classifications: [
      {
        segment: { name: 'Arts & Theatre' },
        genre: { name: 'Theatre' },
      },
    ],
    _embedded: {
      venues: [
        {
          name: 'Teatro Rialto',
          address: { line1: 'Gran Via 54' },
          postalCode: '28013',
          city: { name: 'Madrid' },
          country: { name: 'Spain' },
        },
      ],
      attractions: [{ name: 'Companhia Atlantica' }],
    },
  },
];
