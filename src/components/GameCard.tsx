import type { GameDefinition } from '../types'

interface Props {
  game: GameDefinition
  onClick: () => void
}

const isImagePath = (icon: string) => icon.startsWith('/')

export default function GameCard({ game, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group overflow-hidden"
    >
      {isImagePath(game.icon) ? (
        <img
          src={game.icon}
          alt={game.title}
          className="w-full aspect-square object-cover rounded-xl"
        />
      ) : (
        <span className="text-5xl">{game.icon}</span>
      )}
      <div className="text-center">
        <h2 className="text-lg font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
          {game.title}
        </h2>
        <p className="text-sm text-slate-500 mt-1">{game.description}</p>
      </div>
    </button>
  )
}
