import type { GameDefinition } from '../types'
import HerdMentality from './herd-mentality/HerdMentality'
import Jeopardy from './jeopardy/Jeopardy'
import MysterySentence from './mystery-sentence/MysterySentence'

const games: GameDefinition[] = [
  {
    id: 'herd-mentality',
    title: 'Herd Mentality',
    description: 'Think like the herd — or face the pink cow!',
    icon: '/herd_mentality.png',
    component: HerdMentality,
  },
  {
    id: 'jeopardy',
    title: 'Jeopardy',
    description: 'Pick a category, pick a value, answer the question!',
    icon: '/jeopardy.png',
    dataUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRMZ-VR-OyW5gsYtSvVE3hNYjZlJFhe7QP0ue0V4IxSbgQKMOvPCYIkSLSn1y4d04gYmagwbcroJJKw/pub?gid=2045134284&single=true&output=csv',
    component: Jeopardy,
  },
  {
    id: 'mystery-sentence',
    title: 'Mystery Sentence',
    description: 'Guess letters to reveal the hidden sentence — 10 lives per round!',
    icon: '/hanging_sentence.png',
    component: MysterySentence,
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
