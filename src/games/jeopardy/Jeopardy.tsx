import { useState, useMemo } from 'react'
import type { GameProps } from '../../types'

interface JeopardyGame {
  id: string
  title: string
  level: string
  theme: string
  description: string
  categories: string
  createdBy: string
}

const LEVEL_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
const LEVEL_COLORS: Record<string, string> = {
  A1: '#16a34a', A2: '#22c55e', B1: '#2563eb', B2: '#7c3aed', C1: '#dc2626', C2: '#9f1239',
}

export default function Jeopardy({ data, onExit }: GameProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [levelFilter, setLevelFilter] = useState('All')
  const [themeFilter, setThemeFilter] = useState('All')

  const games = useMemo<JeopardyGame[]>(() => {
    if (data.length < 2) return []
    const [headers, ...rows] = data
    const idx = (name: string) => headers.findIndex(h => h.toLowerCase().trim() === name)
    return rows
      .map(row => ({
        id:          row[idx('id')]          ?? '',
        title:       row[idx('title')]       ?? '',
        level:       row[idx('level')]       ?? '',
        theme:       row[idx('theme')]       ?? '',
        description: row[idx('description')] ?? '',
        categories:  row[idx('categories')]  ?? '',
        createdBy:   row[idx('created_by')]  ?? '',
      }))
      .filter(g => g.id)
  }, [data])

  const levels = useMemo(() => {
    const present = new Set(games.map(g => g.level).filter(Boolean))
    return ['All', ...LEVEL_ORDER.filter(l => present.has(l))]
  }, [games])

  const themes = useMemo(() => {
    const set = new Set(games.map(g => g.theme).filter(Boolean))
    return ['All', ...Array.from(set).sort()]
  }, [games])

  const filtered = games.filter(g => {
    if (levelFilter !== 'All' && g.level !== levelFilter) return false
    if (themeFilter !== 'All' && g.theme !== themeFilter) return false
    return true
  })

  if (selectedId) {
    return (
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
        <iframe
          src={`/games/${selectedId}.html`}
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          title="Jeopardy"
        />
        <button
          onClick={() => setSelectedId(null)}
          style={{
            position: 'fixed', top: 14, right: 14, zIndex: 9999,
            background: 'rgba(255,255,255,0.95)',
            border: '2px solid #c7d2fe', borderRadius: 10,
            padding: '8px 18px',
            fontFamily: "'Nunito', sans-serif",
            fontSize: '0.85rem', fontWeight: 800, color: '#1e3a8a',
            cursor: 'pointer',
            boxShadow: '0 2px 16px rgba(30,58,138,0.18)',
          }}
        >
          ← Back to Games
        </button>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fdf6ec', fontFamily: "'Nunito', sans-serif" }}>
      <header style={{ background: 'linear-gradient(150deg, #7a2e1a 0%, #c4592a 45%, #d4845a 100%)' }}>
        <div style={{ background: 'rgba(255,255,255,0.08)', height: 6 }} />
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '16px 32px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={onExit}
            style={{
              background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: 8,
              padding: '8px 14px', color: 'rgba(255,245,230,0.9)', cursor: 'pointer',
              fontSize: '0.85rem', fontWeight: 700, fontFamily: 'inherit',
            }}
          >
            ← Hub
          </button>
          <h1
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
              color: '#fff8ee', margin: 0, lineHeight: 1.1,
              textShadow: '0 2px 12px rgba(80,20,0,0.3)',
            }}
          >
            Jeopardy
          </h1>
        </div>
        <svg viewBox="0 0 1440 36" preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: 36, marginBottom: -1 }}>
          <path d="M0,24 C360,0 1080,48 1440,12 L1440,36 L0,36 Z" fill="#fdf6ec" />
        </svg>
      </header>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '24px 32px' }}>
        {games.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ color: '#b07a5a', fontSize: '1.05rem', marginBottom: 8 }}>
              No games found. Add a Google Sheet URL to this game's <code>dataUrl</code> in <code>src/games/index.ts</code>.
            </p>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 28 }}>
              <FilterGroup
                label="Level"
                options={levels}
                active={levelFilter}
                getColor={l => l === 'All' ? '#c4592a' : (LEVEL_COLORS[l] ?? '#c4592a')}
                onChange={setLevelFilter}
              />
              <FilterGroup
                label="Theme"
                options={themes}
                active={themeFilter}
                getColor={() => '#c4592a'}
                onChange={setThemeFilter}
              />
            </div>

            {filtered.length === 0 ? (
              <p style={{ color: '#b07a5a', textAlign: 'center', padding: '60px 0' }}>
                No games match your filters.
              </p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
                {filtered.map(game => (
                  <GameCard key={game.id} game={game} onSelect={() => setSelectedId(game.id)} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}

function FilterGroup({
  label, options, active, getColor, onChange,
}: {
  label: string
  options: string[]
  active: string
  getColor: (o: string) => string
  onChange: (o: string) => void
}) {
  return (
    <div>
      <p style={{
        fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.1em', color: '#b07a5a', marginBottom: 8,
      }}>
        {label}
      </p>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {options.map(o => {
          const isActive = active === o
          const color = getColor(o)
          return (
            <button
              key={o}
              onClick={() => onChange(o)}
              style={{
                padding: '5px 14px', borderRadius: 20, border: '2px solid',
                borderColor: isActive ? color : '#e5d5c8',
                background: isActive ? color : 'white',
                color: isActive ? 'white' : '#8b6050',
                fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer',
                fontFamily: 'inherit', transition: 'all 0.15s',
              }}
            >
              {o}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function GameCard({ game, onSelect }: { game: JeopardyGame; onSelect: () => void }) {
  const [hovered, setHovered] = useState(false)
  const levelColor = LEVEL_COLORS[game.level] ?? '#c4592a'

  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'white',
        border: `2px solid ${hovered ? '#c4592a' : '#e8dcd4'}`,
        borderRadius: 16, padding: 20, textAlign: 'left',
        cursor: 'pointer', fontFamily: 'inherit',
        transform: hovered ? 'translateY(-3px)' : 'none',
        boxShadow: hovered
          ? '0 8px 28px rgba(180,100,60,0.18)'
          : '0 2px 12px rgba(180,100,60,0.08)',
        transition: 'all 0.2s',
      }}
    >
      <div style={{
        display: 'inline-block', background: levelColor,
        color: 'white', borderRadius: 6,
        padding: '2px 8px', fontSize: '0.72rem', fontWeight: 800,
        marginBottom: 10, letterSpacing: '0.05em',
      }}>
        {game.level}
      </div>
      <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#4a2010', marginBottom: 6, lineHeight: 1.3 }}>
        {game.title}
      </h3>
      <p style={{ fontSize: '0.85rem', color: '#8b6050', marginBottom: 10, lineHeight: 1.5 }}>
        {game.description}
      </p>
      {game.categories && (
        <p style={{ fontSize: '0.72rem', color: '#b07a5a', fontStyle: 'italic', lineHeight: 1.4 }}>
          {game.categories}
        </p>
      )}
    </button>
  )
}
