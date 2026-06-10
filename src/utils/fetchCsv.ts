export async function fetchCsv(url: string): Promise<string[][]> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch data: ${res.status}`)
  const text = await res.text()
  return parseCsv(text)
}

function parseCsv(text: string): string[][] {
  return text
    .trim()
    .split('\n')
    .map(row =>
      row.split(',').map(cell => cell.replace(/^"|"$/g, '').trim())
    )
}
