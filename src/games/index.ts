import type { GameDefinition } from '../types'
import HerdMentality from './herd-mentality/HerdMentality'

const games: GameDefinition[] = [
  {
    id: 'herd-mentality',
    title: 'Herd Mentality',
    description: 'Think like the herd — or face the pink cow!',
    icon: '/herd_mentality.png',
    component: HerdMentality,
  },
]

export default games
