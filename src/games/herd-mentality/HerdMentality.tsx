import type { GameProps } from '../../types'
import { useGameState } from './hooks/useGameState'
import SetupScreen from './components/SetupScreen'
import GameScreen from './components/GameScreen'

export default function HerdMentality({ onExit }: GameProps) {
  const {
    state, loading, loadError,
    currentQuestion, isOutOfQuestions, winners,
    startGame, restartGame, scoreRound, nextQuestion,
    addPlayer, removePlayer, reset,
  } = useGameState()

  if (state.phase === 'setup') {
    return (
      <SetupScreen
        onStart={startGame}
        onExit={onExit}
        loading={loading}
        loadError={loadError}
      />
    )
  }

  return (
    <GameScreen
      state={state}
      currentQuestion={currentQuestion}
      isOutOfQuestions={isOutOfQuestions}
      winners={winners}
      loading={loading}
      onScore={scoreRound}
      onNext={nextQuestion}
      onRestart={restartGame}
      onReset={reset}
      onExit={onExit}
      onAddPlayer={addPlayer}
      onRemovePlayer={removePlayer}
    />
  )
}
