export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export interface Player {
  id: string
  name: string
  brownCows: number
  hasPinkCow: boolean
}

export interface Question {
  question: string
  level: CefrLevel
  category: string
}

export type GamePhase = 'setup' | 'playing' | 'gameover'

export interface GameState {
  phase: GamePhase
  players: Player[]
  questions: Question[]
  currentIndex: number
  selectedLevel: CefrLevel
  winThreshold: number
}
