import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hub from './components/Hub'
import GameLoader from './components/GameLoader'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/:gameId" element={<GameLoader />} />
      </Routes>
    </BrowserRouter>
  )
}
