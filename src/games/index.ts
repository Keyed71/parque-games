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
    id: 'word-family',
    title: 'Word Family',
    description: 'Group words by the suffix or prefix that connects them.',
    icon: '/affixation.png',
    externalUrl: 'https://word-family-game.vercel.app',
  },
]

export default games
