import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts'
import { mockAnalytics } from '@/utils/mockData'

const ACCENT_COLORS = ['#8a6cff', '#44d1ff', '#ff5c8a', '#5cff9d', '#ffd95c']

export default function AnalyticsPage() {
  const { listeningHours, topGenres, topArtists, moodDistribution } = mockAnalytics

  return (
    <div className="space-y-10">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-dhwani-muted">Your listening habits at a glance.</p>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Hours this week', value: '22.4h' },
          { label: 'Tracks played', value: '186' },
          { label: 'Top genre', value: 'Electronic' },
          { label: 'Streak', value: '14 days' },
        ].map(({ label, value }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl bg-white/[0.02] border border-white/[0.04] p-5"
          >
            <p className="text-xs text-dhwani-muted uppercase tracking-wider mb-1">{label}</p>
            <p className="text-2xl font-bold gradient-text">{value}</p>
          </motion.div>
        ))}
      </div>

      {/* Listening hours chart */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="rounded-2xl bg-white/[0.02] border border-white/[0.04] p-6"
      >
        <h2 className="text-lg font-bold mb-4">Listening Hours</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={listeningHours}>
              <XAxis dataKey="day" stroke="#9aa0b4" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9aa0b4" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: '#1c1c3a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, color: '#eaeaf2' }}
              />
              <Bar dataKey="hours" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8a6cff" />
                  <stop offset="100%" stopColor="#44d1ff" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.section>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top genres */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-white/[0.02] border border-white/[0.04] p-6"
        >
          <h2 className="text-lg font-bold mb-4">Top Genres</h2>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topGenres}
                  dataKey="pct"
                  nameKey="genre"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={4}
                  stroke="none"
                >
                  {topGenres.map((_, i) => (
                    <Cell key={i} fill={ACCENT_COLORS[i % ACCENT_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#1c1c3a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, color: '#eaeaf2' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {topGenres.map((g, i) => (
              <div key={g.genre} className="flex items-center gap-1.5 text-xs text-dhwani-muted">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: ACCENT_COLORS[i] }} />
                {g.genre} ({g.pct}%)
              </div>
            ))}
          </div>
        </motion.section>

        {/* Mood distribution */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-white/[0.02] border border-white/[0.04] p-6"
        >
          <h2 className="text-lg font-bold mb-4">Mood Distribution</h2>
          <div className="space-y-4 mt-6">
            {moodDistribution.map((m, i) => (
              <div key={m.mood}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{m.mood}</span>
                  <span className="text-xs text-dhwani-muted">{m.value}%</span>
                </div>
                <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${m.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="h-full rounded-full"
                    style={{ background: ACCENT_COLORS[i % ACCENT_COLORS.length] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Top artists */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="rounded-2xl bg-white/[0.02] border border-white/[0.04] p-6"
      >
        <h2 className="text-lg font-bold mb-4">Most Played Artists</h2>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={topArtists}>
              <XAxis dataKey="name" stroke="#9aa0b4" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9aa0b4" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: '#1c1c3a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, color: '#eaeaf2' }}
              />
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8a6cff" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#8a6cff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="plays" stroke="#8a6cff" fill="url(#areaGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.section>
    </div>
  )
}
