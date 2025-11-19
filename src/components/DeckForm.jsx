import { useState } from 'react'

const defaultValues = {
  name: '',
  industry: '',
  audience: 'seed investors',
  tone: 'concise',
  problem: '',
  solution: '',
  market: '',
  traction: '',
}

function DeckForm({ onCreated }) {
  const [values, setValues] = useState(defaultValues)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/decks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const data = await res.json()
      onCreated?.(data.deck)
      setValues(defaultValues)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      {error && (
        <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">Name</label>
          <input name="name" value={values.name} onChange={handleChange} required placeholder="Acme AI" className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50" />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Industry</label>
          <input name="industry" value={values.industry} onChange={handleChange} placeholder="Fintech, SaaS, Healthcare" className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50" />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Audience</label>
          <input name="audience" value={values.audience} onChange={handleChange} placeholder="Seed investors" className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50" />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Tone</label>
          <input name="tone" value={values.tone} onChange={handleChange} placeholder="Concise, visionary" className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">Problem</label>
          <textarea name="problem" value={values.problem} onChange={handleChange} rows={3} placeholder="What's broken today?" className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50" />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Solution</label>
          <textarea name="solution" value={values.solution} onChange={handleChange} rows={3} placeholder="How do you fix it?" className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">Market</label>
          <textarea name="market" value={values.market} onChange={handleChange} rows={3} placeholder="TAM, ICP, wedge" className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50" />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Traction</label>
          <textarea name="traction" value={values.traction} onChange={handleChange} rows={3} placeholder="Growth, revenue, users" className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button disabled={loading} className="rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 px-4 py-2 font-medium text-slate-900 transition-colors">
          {loading ? 'Generating…' : 'Generate Deck'}
        </button>
        <span className="text-xs text-slate-400">Data is saved automatically</span>
      </div>
    </form>
  )
}

export default DeckForm
