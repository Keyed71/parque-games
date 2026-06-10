import type { Player } from '../types'

interface Props {
  player: Player
  brownSelected: boolean
  pinkSelected: boolean
  onToggleBrown: () => void
  onSelectPink: () => void
  scoring: boolean
  gameOver?: boolean
  isWinner?: boolean
}

function cowGridCols(n: number): number {
  if (n <= 1) return 1
  if (n <= 3) return n
  if (n <= 4) return 2
  if (n <= 9) return 3
  return 4
}

export default function PlayerCard({ player, brownSelected, pinkSelected, onToggleBrown, onSelectPink, scoring, gameOver, isWinner }: Props) {
  const allCows = [
    ...Array.from({ length: player.brownCows }, () => 'brown' as const),
    ...(player.hasPinkCow ? ['pink' as const] : []),
  ]
  const cols = cowGridCols(allCows.length)

  return (
    <div
      className={`h-full flex flex-col overflow-hidden rounded-2xl shadow-md border-2 transition-all relative ${
        isWinner
          ? 'border-yellow-400 ring-2 ring-yellow-400'
          : brownSelected
          ? 'border-amber-400 ring-2 ring-amber-400'
          : pinkSelected
          ? 'border-pink-400 ring-2 ring-pink-400'
          : player.hasPinkCow
          ? 'border-pink-300'
          : 'border-white/60'
      }`}
      style={{ backgroundImage: 'url(/hills.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {brownSelected && <div className="absolute inset-0 bg-amber-300/25 pointer-events-none z-10" />}
      {pinkSelected  && <div className="absolute inset-0 bg-pink-300/25 pointer-events-none z-10" />}

      {/* Sky zone — name, and score when game is over */}
      <div className="h-[40%] shrink-0 flex flex-col items-center justify-start pt-2 px-2 gap-1">
        <span className="bg-white/80 backdrop-blur-sm rounded-full font-black text-gray-800 text-sm px-3 py-0.5 truncate max-w-full">
          {player.name}
        </span>
        {gameOver && (
          <div className="flex-1 flex items-center justify-center">
            <span className="bg-white/90 rounded-xl font-black text-amber-800 text-3xl px-3 py-1 flex items-center gap-1.5 shadow-sm">
              {player.brownCows}
              <img src="/brown_cow.png" alt="" className="h-8 w-8 object-contain" />
            </span>
          </div>
        )}
      </div>

      {/* Grass zone */}
      <div className="flex-1 min-h-0 w-full relative">
        {allCows.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1/3 max-w-[3rem] aspect-square rounded-full border-2 border-dashed border-green-400/60" />
          </div>
        ) : (
          <div
            className="absolute inset-1 grid"
            style={{
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gridAutoRows: '1fr',
            }}
          >
            {allCows.map((type, i) => (
              <div key={i} className="min-h-0 min-w-0 flex items-end justify-center p-[3%]">
                <img
                  src={type === 'brown' ? '/brown_cow.png' : '/pink_cow.png'}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Winner stamp */}
      {isWinner && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div
            className="border-4 border-red-600 rounded-lg px-3 py-1"
            style={{ transform: 'rotate(-15deg)' }}
          >
            <span className="text-red-600 font-black text-4xl tracking-widest uppercase" style={{ textShadow: '0 0 1px rgba(220,38,38,0.3)' }}>
              WINNER
            </span>
          </div>
        </div>
      )}

      {/* Scoring strip */}
      {scoring ? (
        <div className="shrink-0 bg-white/80 backdrop-blur-sm flex justify-center gap-1.5 py-1.5 px-2">
          <button
            onClick={onToggleBrown}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border-2 ${
              brownSelected
                ? 'bg-amber-500 border-amber-500 text-white'
                : 'bg-white border-amber-200 text-amber-600 hover:border-amber-400'
            }`}
          >
            🐄
          </button>
          <button
            onClick={onSelectPink}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border-2 ${
              pinkSelected
                ? 'bg-pink-400 border-pink-400 text-white'
                : 'bg-white border-pink-200 text-pink-400 hover:border-pink-300'
            }`}
          >
            🩷
          </button>
        </div>
      ) : (
        <div className="shrink-0 h-9" />
      )}
    </div>
  )
}
