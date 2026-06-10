import { useReducer, useState } from 'react'
import type { GameState, CefrLevel, Player } from '../types'
import { fetchQuestions } from '../data/questions'

type Action =
  | { type: 'START_GAME'; playerNames: string[]; level: CefrLevel; winThreshold: number; questions: import('../types').Question[] }
  | { type: 'RESTART_GAME'; questions: import('../types').Question[] }
  | { type: 'SCORE_ROUND'; brownCowIds: string[]; pinkCowId: string | null }
  | { type: 'NEXT_QUESTION' }
  | { type: 'ADD_PLAYER'; name: string }
  | { type: 'REMOVE_PLAYER'; id: string }
  | { type: 'RESET' }

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'START_GAME': {
      const players: Player[] = action.playerNames.map((name, i) => ({
        id: String(i),
        name,
        brownCows: 0,
        hasPinkCow: false,
      }))
      return {
        phase: 'playing',
        players,
        questions: action.questions,
        currentIndex: 0,
        selectedLevel: action.level,
        winThreshold: action.winThreshold,
      }
    }

    case 'RESTART_GAME':
      return {
        ...state,
        phase: 'playing',
        players: state.players.map(p => ({ ...p, brownCows: 0, hasPinkCow: false })),
        questions: action.questions,
        currentIndex: 0,
      }

    case 'SCORE_ROUND': {
      const updatedPlayers = state.players.map(p => ({
        ...p,
        hasPinkCow: action.pinkCowId !== null ? p.id === action.pinkCowId : p.hasPinkCow,
        brownCows: action.brownCowIds.includes(p.id) ? p.brownCows + 1 : p.brownCows,
      }))

      const eligible = updatedPlayers.filter(
        p => p.brownCows >= state.winThreshold && !p.hasPinkCow
      )
      if (eligible.length === 1) {
        const finalPlayers = updatedPlayers.map(p => ({
          ...p,
          brownCows: p.hasPinkCow ? Math.floor(p.brownCows / 2) : p.brownCows,
        }))
        return { ...state, players: finalPlayers, phase: 'gameover' }
      }

      return { ...state, players: updatedPlayers }
    }

    case 'NEXT_QUESTION':
      return { ...state, currentIndex: state.currentIndex + 1 }

    case 'ADD_PLAYER':
      return {
        ...state,
        players: [...state.players, {
          id: `p_${Date.now()}`,
          name: action.name,
          brownCows: 0,
          hasPinkCow: false,
        }],
      }

    case 'REMOVE_PLAYER':
      return {
        ...state,
        players: state.players.filter(p => p.id !== action.id),
      }

    case 'RESET':
      return { ...initialState }

    default:
      return state
  }
}

const initialState: GameState = {
  phase: 'setup',
  players: [],
  questions: [],
  currentIndex: 0,
  selectedLevel: 'B1',
  winThreshold: 8,
}

export function useGameState() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)

  const startGame = async (playerNames: string[], level: CefrLevel, winThreshold: number) => {
    setLoading(true)
    setLoadError(null)
    try {
      const questions = await fetchQuestions(level)
      dispatch({ type: 'START_GAME', playerNames, level, winThreshold, questions })
    } catch {
      setLoadError('Could not load questions. Check your internet connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const restartGame = async () => {
    setLoading(true)
    setLoadError(null)
    try {
      const questions = await fetchQuestions(state.selectedLevel)
      dispatch({ type: 'RESTART_GAME', questions })
    } catch {
      setLoadError('Could not reload questions. Check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const scoreRound = (brownCowIds: string[], pinkCowId: string | null) =>
    dispatch({ type: 'SCORE_ROUND', brownCowIds, pinkCowId })

  const nextQuestion = () => dispatch({ type: 'NEXT_QUESTION' })
  const addPlayer = (name: string) => dispatch({ type: 'ADD_PLAYER', name })
  const removePlayer = (id: string) => dispatch({ type: 'REMOVE_PLAYER', id })
  const reset = () => dispatch({ type: 'RESET' })

  const currentQuestion = state.questions[state.currentIndex] ?? null
  const isOutOfQuestions = state.currentIndex >= state.questions.length

  const winners =
    state.phase === 'gameover'
      ? [...state.players]
          .sort((a, b) => b.brownCows - a.brownCows)
          .filter((p, _, arr) => p.brownCows === arr[0].brownCows)
      : []

  return {
    state, loading, loadError,
    currentQuestion, isOutOfQuestions, winners,
    startGame, restartGame, scoreRound, nextQuestion,
    addPlayer, removePlayer, reset,
  }
}
