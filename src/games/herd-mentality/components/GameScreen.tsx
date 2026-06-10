import { useEffect, useRef, useState } from 'react'
import type { Player, GameState, Question } from '../types'
import PlayerCard from './PlayerCard'

interface Props {
  state: GameState
  currentQuestion: Question | null
  isOutOfQuestions: boolean
  winners: Player[]
  loading: boolean
  onScore: (brownCowIds: string[], pinkCowId: string | null) => void
  onNext: () => void
  onRestart: () => void
  onReset: () => void
  onExit: () => void
  onAddPlayer: (name: string) => void
  onRemovePlayer: (id: string) => void
}

function gridCols(playerCount: number): number {
  if (playerCount <= 3) return playerCount
  if (playerCount <= 4) return 2
  if (playerCount <= 6) return 3
  if (playerCount <= 8) return 4
  if (playerCount === 9) return 3
  if (playerCount <= 12) return 4
  return 5
}

export default function GameScreen({
  state, currentQuestion, isOutOfQuestions, winners, loading,
  onScore, onNext, onRestart, onExit, onAddPlayer, onRemovePlayer,
}: Props) {
  const [brownSelected, setBrownSelected] = useState<Set<string>>(new Set())
  const [pinkSelected, setPinkSelected] = useState<string | null>(null)
  const [scored, setScored] = useState(false)
  const [showEditPlayers, setShowEditPlayers] = useState(false)
  const [newPlayerName, setNewPlayerName] = useState('')
  const mooRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    mooRef.current = new Audio('/cow_moo.mp3')
  }, [])

  const playMoo = () => {
    if (!mooRef.current) return
    mooRef.current.currentTime = 0
    mooRef.current.play().catch(() => {})
  }

  const toggleBrown = (id: string) => {
    setBrownSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const selectPink = (id: string) => {
    setPinkSelected(prev => (prev === id ? null : id))
  }

  const handleConfirm = () => {
    if (brownSelected.size > 0) playMoo()
    onScore(Array.from(brownSelected), pinkSelected)
    setScored(true)
  }

  const handleNext = () => {
    setBrownSelected(new Set())
    setPinkSelected(null)
    setScored(false)
    onNext()
  }

  const handleAddPlayer = () => {
    const name = newPlayerName.trim()
    if (!name) return
    onAddPlayer(name)
    setNewPlayerName('')
  }

  const { players, selectedLevel, currentIndex, questions, winThreshold } = state
  const cols = gridCols(players.length)
  const gameOver = state.phase === 'gameover'
  const winnerIds = new Set(winners.map(w => w.id))

  return (
    <div className="h-screen bg-amber-50 flex flex-col overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b-2 border-amber-100 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <img src="/brown_cow.png" alt="" className="w-9 h-9 object-contain" />
          <span className="font-black text-amber-900 text-xl tracking-tight">Herd Mentality</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-bold text-sm">
            {selectedLevel}
          </span>
          {!gameOver && (
            <span className="text-gray-400 text-sm font-medium">
              {currentIndex + 1} / {questions.length}
            </span>
          )}
          <button
            onClick={() => setShowEditPlayers(true)}
            className="text-xs text-amber-600 hover:text-amber-800 font-semibold px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors border border-amber-200"
          >
            Edit Players
          </button>
          <button
            onClick={onRestart}
            disabled={loading}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors font-medium px-2 py-1 disabled:opacity-40"
          >
            New Game
          </button>
          <button
            onClick={onExit}
            className="text-xs text-amber-600 hover:text-amber-800 transition-colors font-medium px-2 py-1"
          >
            ← Hub
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 min-h-0 flex flex-col px-6 pt-4 pb-3 gap-3">

        {/* Question card / game over banner */}
        <div className="shrink-0 w-full bg-white rounded-3xl shadow-lg border-2 border-amber-100 px-10 py-6 text-center">
          {gameOver ? (
            <>
              <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">Game Over</p>
              <p className="text-4xl font-black text-gray-900">
                {winners.map(w => w.name).join(' & ')} wins!
              </p>
            </>
          ) : isOutOfQuestions ? (
            <p className="text-3xl font-black text-amber-900">No more questions!</p>
          ) : (
            <>
              <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">
                {currentQuestion?.category}
              </p>
              <p className="text-5xl font-black text-gray-900 leading-tight">
                {currentQuestion?.question}
              </p>
              <p className="text-xs text-gray-300 mt-3 font-medium">
                First to {winThreshold} brown cows wins
              </p>
            </>
          )}
        </div>

        {/* Score grid */}
        <div
          className="flex-1 min-h-0 max-h-[55vh] grid gap-2"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridAutoRows: '1fr' }}
        >
          {players.map(player => (
            <PlayerCard
              key={player.id}
              player={player}
              brownSelected={brownSelected.has(player.id)}
              pinkSelected={pinkSelected === player.id}
              onToggleBrown={() => toggleBrown(player.id)}
              onSelectPink={() => selectPink(player.id)}
              scoring={!scored && !gameOver}
              gameOver={gameOver}
              isWinner={winnerIds.has(player.id)}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="shrink-0 bg-white rounded-2xl border-2 border-amber-100 px-5 py-3">
          {gameOver ? (
            <div className="flex justify-center">
              <button
                onClick={onRestart}
                disabled={loading}
                className={`px-8 py-2.5 rounded-xl font-black text-sm transition-colors shadow-md ${
                  loading
                    ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    : 'bg-amber-500 text-white hover:bg-amber-600'
                }`}
              >
                {loading ? 'Loading questions…' : 'Play Again'}
              </button>
            </div>
          ) : !scored ? (
            <div className="flex items-center gap-4">
              <p className="flex-1 text-sm text-gray-500">
                Tap <span className="font-bold text-amber-600">🐄</span> for each herd answer ·
                <span className="font-bold text-pink-500"> 🩷</span> for the lone answer
              </p>
              <button
                onClick={handleConfirm}
                className="px-6 py-2.5 bg-amber-500 text-white rounded-xl font-black text-sm hover:bg-amber-600 transition-colors shadow-md whitespace-nowrap"
              >
                Confirm Round
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {brownSelected.size > 0
                  ? `${brownSelected.size} player${brownSelected.size > 1 ? 's' : ''} joined the herd`
                  : 'No majority — no brown cows awarded'}
                {pinkSelected && ' · Pink cow reassigned'}
              </p>
              <button
                onClick={handleNext}
                disabled={isOutOfQuestions}
                className={`px-6 py-2.5 rounded-xl font-black text-sm transition-colors shadow-md whitespace-nowrap ${
                  isOutOfQuestions
                    ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                Next Question →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Players modal */}
      {showEditPlayers && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-xl w-80 max-h-[80vh] flex flex-col">

            <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-gray-100">
              <h2 className="font-black text-gray-900 text-lg">Edit Players</h2>
              <button
                onClick={() => setShowEditPlayers(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold text-lg flex items-center justify-center transition-colors"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
              {players.map(p => (
                <div key={p.id} className="flex items-center gap-2 bg-amber-50 rounded-xl px-3 py-2">
                  <span className="flex-1 font-bold text-gray-800 text-sm truncate">{p.name}</span>
                  <span className="text-xs text-amber-600 font-bold shrink-0">{p.brownCows} 🐄</span>
                  {p.hasPinkCow && <span className="text-xs shrink-0">🩷</span>}
                  <button
                    onClick={() => onRemovePlayer(p.id)}
                    disabled={players.length <= 2}
                    className="w-6 h-6 rounded-full bg-red-100 hover:bg-red-200 text-red-500 font-bold text-sm flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="px-4 pb-5 pt-3 border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPlayerName}
                  onChange={e => setNewPlayerName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddPlayer()}
                  placeholder="New player name"
                  className="flex-1 px-3 py-2 rounded-xl border-2 border-amber-100 focus:border-amber-400 outline-none text-sm font-medium text-gray-800 placeholder:text-gray-300"
                />
                <button
                  onClick={handleAddPlayer}
                  disabled={!newPlayerName.trim()}
                  className="px-4 py-2 bg-amber-500 text-white rounded-xl font-bold text-sm hover:bg-amber-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
