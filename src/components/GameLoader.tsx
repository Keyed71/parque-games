import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import games from '../games'
import { fetchCsv } from '../utils/fetchCsv'

export default function GameLoader() {
  const { gameId } = useParams<{ gameId: string }>()
  const navigate = useNavigate()
  const game = games.find(g => g.id === gameId)

  const [data, setData] = useState<string[][] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!game) return
    if (!game.dataUrl) {
      setData([])
      return
    }
    fetchCsv(game.dataUrl)
      .then(setData)
      .catch(err => setError(err.message))
  }, [game])

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Game not found.</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500">Could not load game data: {error}</p>
        <button onClick={() => navigate('/')} className="text-blue-600 underline">
          Back to hub
        </button>
      </div>
    )
  }

  if (data === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-400 animate-pulse">Loading {game.title}…</p>
      </div>
    )
  }

  const GameComponent = game.component
  return <GameComponent data={data} onExit={() => navigate('/')} />
}
