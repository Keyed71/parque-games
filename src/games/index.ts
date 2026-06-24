import type { GameDefinition } from '../types'
import HerdMentality from './herd-mentality/HerdMentality'
import Jeopardy from './jeopardy/Jeopardy'
import MysterySentence from './mystery-sentence/MysterySentence'
import NoughtsCrosses from './noughts-crosses/NoughtsCrosses'
import ThreeInARow from './three-in-a-row/ThreeInARow'
import FamilyFortunes from './family-fortunes/FamilyFortunes'
import OddOneOut from './odd-one-out/OddOneOut'
import Countdown from './countdown/Countdown'
import Battleships from './battleships/Battleships'

const games: GameDefinition[] = [
  {
    id: 'herd-mentality',
    title: 'Herd Mentality',
    description: 'Think like the herd — or face the pink cow!',
    icon: '/herd_mentality.png',
    dataUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQQOA7JYpQHJPodeWxaoJzUqT1L6vftHr-jjo7Y7Y06lHAecXsk6aw5jFPeQhJgKMro7Wu1vzW5E7PS/pub?gid=2013736668&single=true&output=csv',
    component: HerdMentality,
  },
  {
    id: 'jeopardy',
    title: 'Jeopardy',
    description: 'Pick a category, pick a value, answer the question!',
    icon: '/jeopardy.png',
    dataUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQQOA7JYpQHJPodeWxaoJzUqT1L6vftHr-jjo7Y7Y06lHAecXsk6aw5jFPeQhJgKMro7Wu1vzW5E7PS/pub?gid=2045134284&single=true&output=csv',
    component: Jeopardy,
  },
  {
    id: 'mystery-sentence',
    title: 'Hanging Sentence',
    description: 'Guess letters to reveal the hidden sentence — 10 lives per round!',
    icon: '/hanging_sentence.png',
    dataUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQQOA7JYpQHJPodeWxaoJzUqT1L6vftHr-jjo7Y7Y06lHAecXsk6aw5jFPeQhJgKMro7Wu1vzW5E7PS/pub?gid=1732264731&single=true&output=csv',
    component: MysterySentence,
  },
  {
    id: 'noughts-crosses',
    title: 'Noughts & Crosses',
    description: 'Grammar battle on a 3×3 grid — gap fills and error corrections.',
    icon: '/noughts_and_crosses.png',
    component: NoughtsCrosses,
  },
  {
    id: 'three-in-a-row',
    title: '3 in a Row',
    description: 'Bigger grid, 2–4 teams — score a point for every line of three you make.',
    icon: '/3_in_a_row.png',
    component: ThreeInARow,
  },
  {
    id: 'family-fortunes',
    title: 'Family Fortunes',
    description: 'Guess the top 10 survey answers — teams, steals and a round each to go first.',
    icon: '/family_fortunes.png',
    component: FamilyFortunes,
  },
  {
    id: 'odd-one-out',
    title: 'Odd One Out',
    description: "Spot the odd one out — or fill the gap. Four options, one answer.",
    icon: '🧩',
    component: OddOneOut,
  },
  {
    id: 'countdown',
    title: 'Letters Round',
    description: 'The Countdown word game — pick 9 letters, 30 seconds, longest word wins.',
    icon: '/classroom_countdown.png',
    component: Countdown,
  },
  {
    id: 'battleships',
    title: 'Word Battleships',
    description: 'Hide four words, hunt the other team\'s — guess the words to win, no sinking needed.',
    icon: '⚓',
    component: Battleships,
  },
  {
    id: 'word-family',
    title: 'Word Family',
    description: 'Group words by the suffix or prefix that connects them.',
    icon: '/affixation.png',
    externalUrl: 'https://word-family-game.vercel.app',
  },
]

export default games
