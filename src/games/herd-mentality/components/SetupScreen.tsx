import { useState } from 'react'
import type { CefrLevel } from '../types'

const LEVELS: CefrLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
const SCHOOL_LEVELS: Record<CefrLevel, string> = {
  A1: 'Level 2', A2: 'Level 3', B1: 'Level 4',
  B2: 'Level 5–6', C1: 'Level 7–8', C2: 'Level 9',
}

interface Props {
  onStart: (playerNames: string[], level: CefrLevel, winThreshold: number) => void
  onExit: () => void
  loading: boolean
  loadError: string | null
}

export default function SetupScreen({ onStart, onExit, loading, loadError }: Props) {
  const [names, setNames] = useState<string[]>(['', '', ''])
  const [level, setLevel] = useState<CefrLevel>('B1')
  const [winThreshold, setWinThreshold] = useState(8)

  const updateName = (i: number, val: string) =>
    setNames(prev => prev.map((n, idx) => (idx === i ? val : n)))

  const addPlayer = () => setNames(prev => [...prev, ''])
  const removePlayer = (i: number) => setNames(prev => prev.filter((_, idx) => idx !== i))

  const validNames = names.map(n => n.trim()).filter(Boolean)
  const canStart = validNames.length >= 2

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl">

        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-2">
            <img src="/brown_cow.png" alt="" className="w-16 h-16 object-contain" />
            <h1 className="text-5xl font-black text-amber-900 tracking-tight">Herd Mentality</h1>
            <img src="/pink_cow.png" alt="" className="w-16 h-16 object-contain" />
          </div>
          <p className="text-amber-700 text-lg">Think like the herd — or face the pink cow!</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 space-y-8">

          <div>
            <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">
              Class Level
            </label>
            <div className="flex flex-wrap gap-2">
              {LEVELS.map(l => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`px-4 py-2 rounded-full font-bold text-sm transition-all border-2 ${
                    level === l
                      ? 'bg-amber-500 border-amber-500 text-white shadow-md scale-105'
                      : 'bg-white border-amber-200 text-amber-700 hover:border-amber-400'
                  }`}
                >
                  {l}
                  <span className="ml-1.5 font-normal text-xs opacity-70">{SCHOOL_LEVELS[l]}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">
              Brown Cows to Win
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setWinThreshold(t => Math.max(3, t - 1))}
                className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-black text-xl hover:bg-amber-200 transition-colors"
              >−</button>
              <span className="text-4xl font-black text-amber-900 w-12 text-center">{winThreshold}</span>
              <button
                onClick={() => setWinThreshold(t => Math.min(15, t + 1))}
                className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-black text-xl hover:bg-amber-200 transition-colors"
              >+</button>
              <img src="/brown_cow.png" alt="" className="w-10 h-10 object-contain opacity-60" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">
              Players <span className="font-normal normal-case text-gray-400">({validNames.length} added)</span>
            </label>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {names.map((name, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={name}
                    onChange={e => updateName(i, e.target.value)}
                    placeholder={`Player ${i + 1}`}
                    className="flex-1 px-3 py-2 rounded-xl border-2 border-amber-100 focus:border-amber-400 outline-none text-gray-800 font-medium placeholder:text-gray-300 transition-colors"
                  />
                  {names.length > 2 && (
                    <button
                      onClick={() => removePlayer(i)}
                      className="w-8 h-8 rounded-full text-gray-300 hover:text-red-400 hover:bg-red-50 font-bold text-lg transition-colors flex items-center justify-center"
                    >×</button>
                  )}
                </div>
              ))}
            </div>
            {names.length < 15 && (
              <button onClick={addPlayer} className="text-sm text-amber-600 hover:text-amber-800 font-semibold transition-colors">
                + Add player
              </button>
            )}
          </div>

          {loadError && (
            <p className="text-sm text-red-500 font-medium text-center">{loadError}</p>
          )}

          <div className="flex gap-3">
            <button
              onClick={onExit}
              className="px-6 py-4 rounded-2xl text-lg font-black border-2 border-amber-200 text-amber-600 hover:bg-amber-50 transition-all"
            >
              ← Hub
            </button>
            <button
              onClick={() => onStart(validNames, level, winThreshold)}
              disabled={!canStart || loading}
              className={`flex-1 py-4 rounded-2xl text-xl font-black tracking-wide transition-all ${
                canStart && !loading
                  ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0'
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
              }`}
            >
              {loading ? 'Loading questions…' : 'Start Game'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
