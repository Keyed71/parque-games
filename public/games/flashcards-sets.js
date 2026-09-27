// Flashcards — card sets.
// Each set appears as a card on the Flashcards selector screen.
//
// To add a new set:
//   1. Put its images in public/games/flashcards/{set-id}/
//   2. Add an entry below. Each set has one or more question TYPES; a card
//      gives the answer for each type in its `answers` object (same keys).
//      In "Mixed" mode the game picks one of the types at random for each card.
//   3. `{who}` in a question is replaced with the card's `who` value
//      and {be} with is/are to match it: "What nationality {be} {who}?" → "What nationality is she?".
//      {Who's} becomes She's / He's / They're, and {a} is the card's answer.

window.FLASHCARD_SETS = [
  {
    id: 'countries-nationalities',
    title: 'Countries & Nationalities',
    level: 'Junior 2',
    description: 'Look at the picture. What country is this? What nationality are they?',
    cover: '/games/flashcards/countries/uk.jpg',
    types: [
      { key: 'country',     label: 'Countries',     question: 'What country is this?',    answer: "It's {a}." },
      { key: 'nationality', label: 'Nationalities', question: 'What nationality {be} {who}?', answer: "{Who's} {a}." },
    ],
    cards: [
      { image: '/games/flashcards/countries/argentina.jpg', who: 'they', answers: { country: 'Argentina',   nationality: 'Argentinian' } },
      { image: '/games/flashcards/countries/china.jpg',     who: 'they', answers: { country: 'China',       nationality: 'Chinese' } },
      { image: '/games/flashcards/countries/france.jpg',    who: 'they', answers: { country: 'France',      nationality: 'French' } },
      { image: '/games/flashcards/countries/germany.jpg',   who: 'they', answers: { country: 'Germany',     nationality: 'German' } },
      { image: '/games/flashcards/countries/italy.jpg',     who: 'they', answers: { country: 'Italy',       nationality: 'Italian' } },
      { image: '/games/flashcards/countries/poland.jpg',    who: 'she',  answers: { country: 'Poland',      nationality: 'Polish' } },
      { image: '/games/flashcards/countries/spain.jpg',     who: 'they', answers: { country: 'Spain',       nationality: 'Spanish' } },
      { image: '/games/flashcards/countries/turkey.jpg',    who: 'they', answers: { country: 'Turkey',      nationality: 'Turkish' } },
      { image: '/games/flashcards/countries/uk.jpg',        who: 'they', answers: { country: 'the UK',      nationality: 'British' } },
      { image: '/games/flashcards/countries/usa.jpg',       who: 'they', answers: { country: 'the USA',     nationality: 'American' } },
    ],
  },
]
