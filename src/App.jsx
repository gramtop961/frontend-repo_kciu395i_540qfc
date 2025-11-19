import { useState } from 'react'
import Hero from './components/Hero'
import DeckForm from './components/DeckForm'
import DeckList from './components/DeckList'

function App() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleCreated = () => {
    // trigger deck list refresh
    setRefreshKey((k) => k + 1)
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Hero />

      <main className="relative -mt-24 z-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <h2 className="text-white text-xl font-semibold mb-4">Describe your startup</h2>
                <DeckForm onCreated={handleCreated} />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <DeckList refreshKey={refreshKey} />
              </div>
            </div>
          </div>
          <div className="py-12 text-center text-slate-400 text-sm">
            Built with a modern, minimalist fintech aesthetic.
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
