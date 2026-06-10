import { useNavigate } from 'react-router-dom'
import games from '../games'
import GameCard from './GameCard'

export default function Hub() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-8 py-5">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Parque Games</h1>
      </header>

      <main className="flex-1 px-8 py-10">
        {games.length === 0 ? (
          <p className="text-slate-400 text-center mt-20">No games registered yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
            {games.map(game => (
              <GameCard
                key={game.id}
                game={game}
                onClick={() => navigate(`/${game.id}`)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
