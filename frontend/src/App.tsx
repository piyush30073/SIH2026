import { BrowserRouter, Route, Routes } from 'react-router-dom'

function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white">
          SIH 2026
        </h1>

        <p className="mt-4 text-xl text-slate-400">
          AI-Powered Athlete Injury Prevention & Recovery
        </p>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App