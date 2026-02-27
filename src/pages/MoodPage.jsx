import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrackRow } from '@/components'
import { mockTracks } from '@/utils/mockData'
import { HiSparkles } from 'react-icons/hi2'

export default function MoodPage() {
  const [moodText, setMoodText] = useState('')
  const [energy, setEnergy] = useState(50)
  const [calmness, setCalmness] = useState(50)
  const [intensity, setIntensity] = useState(50)
  const [generated, setGenerated] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setGenerated(true)
    setLoading(false)
  }

  const generatedTracks = mockTracks.slice(0, 8)

  return (
    <div className="space-y-10 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
            <HiSparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold">AI Mood Playlist</h1>
        </div>
        <p className="text-dhwani-muted">Describe your mood, adjust the sliders, and let Dhwani generate the perfect playlist.</p>
      </motion.div>

      {/* Input section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl bg-white/[0.02] border border-white/[0.04] p-6 space-y-6"
      >
        <div>
          <label className="text-sm font-medium mb-2 block">How are you feeling?</label>
          <textarea
            value={moodText}
            onChange={(e) => setMoodText(e.target.value)}
            placeholder="E.g. Relaxed but creative, like a rainy afternoon with coffee…"
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-white text-sm placeholder-dhwani-muted focus:outline-none focus:border-dhwani-accent/40 transition-colors resize-none"
          />
        </div>

        {/* Sliders */}
        <div className="space-y-5">
          <SliderRow label="Energy" value={energy} onChange={setEnergy} />
          <SliderRow label="Calmness" value={calmness} onChange={setCalmness} />
          <SliderRow label="Intensity" value={intensity} onChange={setIntensity} />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3 rounded-xl gradient-accent text-white font-semibold hover-lift disabled:opacity-60 transition-opacity flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Generating…
            </>
          ) : (
            <>
              <HiSparkles className="w-4 h-4" /> Generate Playlist
            </>
          )}
        </button>
      </motion.div>

      {/* Generated playlist */}
      {generated && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Your Mood Playlist</h2>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/[0.04] text-dhwani-muted hover:text-white transition-colors">
                Save
              </button>
              <button
                onClick={handleGenerate}
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/[0.04] text-dhwani-muted hover:text-white transition-colors"
              >
                Regenerate
              </button>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.01] border border-white/[0.04] overflow-hidden">
            {generatedTracks.map((t, i) => (
              <TrackRow key={t.id} track={t} index={i} />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

function SliderRow({ label, value, onChange }) {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <label className="text-sm text-dhwani-muted">{label}</label>
        <span className="text-xs text-dhwani-muted tabular-nums">{value}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  )
}
