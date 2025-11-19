import { useEffect, useState } from 'react'

function SlideCard({ slide }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs uppercase tracking-wide text-slate-400">{slide.kind || 'slide'}</div>
      <h4 className="mt-1 text-lg font-semibold text-white">{slide.title}</h4>
      {slide.content && <p className="mt-2 text-slate-300 text-sm">{slide.content}</p>}
      {slide.bullets && slide.bullets.length > 0 && (
        <ul className="mt-2 list-disc pl-5 text-slate-300 text-sm space-y-1">
          {slide.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

function DeckItem({ deck }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white">{deck.name}</h3>
          <p className="text-sm text-slate-300">{deck.industry} • {deck.audience}</p>
        </div>
        <span className="text-xs text-slate-400">{new Date(deck.created_at || deck.updated_at || Date.now()).toLocaleString()}</span>
      </div>
      {deck.slides && deck.slides.length > 0 && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {deck.slides.map((s, idx) => (
            <SlideCard key={idx} slide={s} />
          ))}
        </div>
      )}
    </div>
  )
}

function DeckList({ refreshKey = 0 }) {
  const [decks, setDecks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadDecks = async () => {
    setLoading(true)
    setError('')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/decks`)
      if (!res.ok) throw new Error(`Failed to load decks: ${res.status}`)
      const data = await res.json()
      setDecks(data.decks || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDecks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-semibold">Your Decks</h2>
        <button onClick={loadDecks} className="text-sm text-emerald-400 hover:text-emerald-300">Refresh</button>
      </div>
      {error && (<div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-200">{error}</div>)}
      {loading ? (
        <div className="text-slate-400 text-sm">Loading…</div>
      ) : decks.length === 0 ? (
        <div className="text-slate-400 text-sm">No decks yet. Create one to get started.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {decks.map((d) => (
            <DeckItem key={d._id} deck={d} />
          ))}
        </div>
      )}
    </div>
  )
}

export default DeckList
