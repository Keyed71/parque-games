import type { GameProps } from '../../types'

export default function ThreeInARow({ onExit }: GameProps) {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <iframe
        src="/games/three-in-a-row.html"
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        title="3 in a Row"
      />
      <button
        onClick={onExit}
        style={{
          position: 'fixed', top: 14, right: 14, zIndex: 9999,
          background: 'rgba(255,255,255,0.95)',
          border: '2px solid #e8d0b0', borderRadius: 10,
          padding: '8px 18px',
          fontFamily: "'Nunito', sans-serif",
          fontSize: '0.85rem', fontWeight: 800, color: '#7a2e1a',
          cursor: 'pointer',
          boxShadow: '0 2px 16px rgba(120,46,26,0.15)',
        }}
      >
        ← Hub
      </button>
    </div>
  )
}
