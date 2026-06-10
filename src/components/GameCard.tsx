import { useState } from 'react'
import type { GameDefinition } from '../types'

interface Props {
  game: GameDefinition
  onClick: () => void
}

const isImagePath = (icon: string) => icon.startsWith('/')

export default function GameCard({ game, onClick }: Props) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fffbf5',
        border: '1px solid #e8d0b0',
        borderRadius: 20,
        padding: 0,
        cursor: 'pointer',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Nunito', sans-serif",
        boxShadow: hovered
          ? '0 16px 36px rgba(139,58,30,0.18), 0 4px 10px rgba(139,58,30,0.10)'
          : '0 2px 8px rgba(139,58,30,0.08)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 0.22s ease, box-shadow 0.22s ease',
      }}
    >
      {isImagePath(game.icon) ? (
        <img
          src={game.icon}
          alt={game.title}
          style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <div
          style={{
            fontSize: '3.5rem',
            aspectRatio: '1 / 1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fdecd6',
          }}
        >
          {game.icon}
        </div>
      )}
      <div style={{ padding: '12px 14px 14px', textAlign: 'center' }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem', color: '#5a2a0e' }}>
          {game.title}
        </p>
        <p style={{ margin: '4px 0 0', fontWeight: 400, fontSize: '0.78rem', color: '#a07050', lineHeight: 1.4 }}>
          {game.description}
        </p>
      </div>
    </button>
  )
}
