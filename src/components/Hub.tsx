import { useNavigate } from 'react-router-dom'
import games from '../games'
import GameCard from './GameCard'

export default function Hub() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen" style={{ background: '#fdf6ec' }}>

      {/* Hero header */}
      <header
        style={{
          background: 'linear-gradient(150deg, #7a2e1a 0%, #c4592a 45%, #d4845a 100%)',
        }}
      >
        {/* Decorative top stripe */}
        <div style={{ background: 'rgba(255,255,255,0.08)', height: 6 }} />

        <div className="max-w-5xl mx-auto px-8 py-14 text-center">
          <h1
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              color: '#fff8ee',
              margin: 0,
              lineHeight: 1.1,
              textShadow: '0 2px 12px rgba(80,20,0,0.3)',
              letterSpacing: '0.01em',
            }}
          >
            Parque Games
          </h1>
          <p
            style={{
              fontFamily: "'Nunito', sans-serif",
              color: 'rgba(255,245,230,0.80)',
              fontSize: '1.05rem',
              marginTop: '0.6rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Classroom games for language learners
          </p>
        </div>

        {/* Wave divider */}
        <svg
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: 48, marginBottom: -1 }}
        >
          <path d="M0,32 C360,0 1080,64 1440,16 L1440,48 L0,48 Z" fill="#fdf6ec" />
        </svg>
      </header>

      {/* Game grid */}
      <main className="max-w-5xl mx-auto px-8 py-10">
        {games.length === 0 ? (
          <p
            className="text-center mt-20"
            style={{ color: '#b07a5a', fontFamily: "'Nunito', sans-serif" }}
          >
            No games registered yet.
          </p>
        ) : (
          <>
            <p
              className="text-center mb-8"
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#b07a5a',
              }}
            >
              Choose a game
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {games.map(game => (
                <GameCard
                  key={game.id}
                  game={game}
                  onClick={() =>
                    game.externalUrl
                      ? window.open(game.externalUrl, '_blank', 'noopener,noreferrer')
                      : navigate(`/${game.id}`)
                  }
                />
              ))}
            </div>
          </>
        )}
      </main>

      <footer
        className="text-center py-8"
        style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: '0.78rem',
          color: '#c9a07a',
          letterSpacing: '0.04em',
        }}
      >
        Cambridge School — Parque das Nações
      </footer>
    </div>
  )
}
