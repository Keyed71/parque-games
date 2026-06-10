import type { CefrLevel, Question } from '../types'

const SHEETS_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRMZ-VR-OyW5gsYtSvVE3hNYjZlJFhe7QP0ue0V4IxSbgQKMOvPCYIkSLSn1y4d04gYmagwbcroJJKw/pub?gid=2013736668&single=true&output=csv'

function parseCsv(text: string): Question[] {
  const [headerLine, ...rows] = text.trim().split('\n')
  const headers = headerLine.split(',').map(h => h.trim().toLowerCase())
  const qi = headers.indexOf('question')
  const li = headers.indexOf('level')
  const ci = headers.indexOf('category')

  return rows
    .map(row => {
      const cols = row.split(',')
      return {
        question: cols[qi]?.trim() ?? '',
        level: (cols[li]?.trim() ?? '') as CefrLevel,
        category: cols[ci]?.trim() ?? '',
      }
    })
    .filter(q => q.question && q.level)
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export async function fetchQuestions(level: CefrLevel): Promise<Question[]> {
  const res = await fetch(SHEETS_URL)
  if (!res.ok) throw new Error('Could not load questions from Google Sheets')
  const text = await res.text()
  const all = parseCsv(text)
  return shuffle(all.filter(q => q.level === level))
}
