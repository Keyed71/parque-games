import type { ComponentType } from 'react'

export interface GameDefinition {
  id: string
  title: string
  description: string
  icon: string           // emoji (e.g. '🎯') or public image path (e.g. '/herd_mentality.png')
  dataUrl?: string       // Google Sheets published CSV URL (if game uses sheet data)
  component: ComponentType<GameProps>
}

export interface GameProps {
  data: string[][]       // parsed CSV rows (first row = headers)
  onExit: () => void
}
