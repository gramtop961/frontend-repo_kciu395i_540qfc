import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Glass morphic gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/50 to-slate-950"></div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200 mb-4">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            3D fintech aesthetic • Glassmorphic
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Pitchdeck Maker
          </h1>
          <p className="mt-4 text-slate-200 text-lg">
            Turn a short idea into a clean, investor-ready deck in seconds. Modern design, clear narrative, zero fuss.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
