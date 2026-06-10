import type { Player } from '../types'

interface Props {
  players: Player[]
  winners: Player[]
  onReset: () => void
  onExit: () => void
}

export default function GameOver({ players, winners, onReset, onExit }: Props) {
  const sorted = [...players].sort((a, b) => b.brownCows - a.brownCows)
  const isMultipleWinners = winners.length > 1

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl text-center">

        {/* Winner announcement */}
        <div className="mb-8">
          <div className="flex justify-center gap-2 mb-4">
            <img src="/brown_cow.png" alt="" className="w-20 h-20 object-contain" />
            <img src="/brown_cow.png" alt="" className="w-24 h-24 object-contain" />
            <img src="/brown_cow.png" alt="" className="w-20 h-20 object-contain" />
          </div>
          <h1 className="text-6xl font-black text-amber-900 mb-2">
            {isMultipleWinners ? "It's a draw!" : 'Winner!'}
          </h1>
          <p className="text-3xl font-bold text-amber-600">
            {winners.map(w => w.name).join(' & ')}
          </p>
          <p className="text-gray-500 mt-2">
            {winners[0].brownCows} brown cow{winners[0].brownCows !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Final scoreboard */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Final Scores</p>
          <div className="space-y-2">
            {sorted.map((player, i) => {
              const isWinner = winners.some(w => w.id === player.id)
              return (
                <div
                  key={player.id}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl ${
                    isWinner ? 'bg-amber-50 border-2 border-amber-300' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-400 w-5">{i + 1}</span>
                    <span className={`font-black ${isWinner ? 'text-amber-900' : 'text-gray-700'}`}>
                      {player.name}
                    </span>
                    {player.hasPinkCow && (
                      <div className="flex items-center gap-1 text-xs text-pink-500 font-bold">
                        <img src="/pink_cow.png" alt="" className="w-5 h-5 object-contain" />
                        <span>−{Math.ceil(player.brownCows / 2)} penalty applied</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-amber-800 text-lg">{player.brownCows}</span>
                    <img src="/brown_cow.png" alt="" className="w-7 h-7 object-contain" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={onReset}
            className="px-10 py-4 bg-amber-500 text-white rounded-2xl text-xl font-black hover:bg-amber-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
          >
            Play Again
          </button>
          <button
            onClick={onExit}
            className="px-10 py-4 bg-white text-amber-700 border-2 border-amber-300 rounded-2xl text-xl font-black hover:bg-amber-50 transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            ← Hub
          </button>
        </div>
      </div>
    </div>
  )
}
