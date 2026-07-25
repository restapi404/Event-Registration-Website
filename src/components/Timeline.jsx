import { useEffect, useRef, useState } from 'react'
import { DoorOpen, DoorClosed, Mail, Sparkles } from 'lucide-react'

const SCHEDULE = [
  { date: 'Aug 10', label: 'Registrations open', detail: 'Portal goes live for all departments', icon: DoorOpen },
  { date: 'Aug 28', label: 'Registrations close', detail: 'Last date to submit your entry', icon: DoorClosed },
  { date: 'Sep 02', label: 'Confirmation & passes', detail: 'Entry passes emailed to registered students', icon: Mail },
  { date: 'Sep 12–13', label: 'ZENITH 2026', detail: 'Two days of tech talks, competitions & culture night', icon: Sparkles, highlight: true },
]

export default function Timeline() {
  const containerRef = useRef(null)
  const [fillPercent, setFillPercent] = useState(0)

  // As the section scrolls through the viewport, grow the progress line
  // proportionally — a lightweight scrollytelling effect with no libraries.
  useEffect(() => {
    function onScroll() {
      const node = containerRef.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const viewportH = window.innerHeight
      const total = rect.height + viewportH * 0.6
      const scrolled = viewportH * 0.8 - rect.top
      const percent = Math.min(100, Math.max(0, (scrolled / total) * 100))
      setFillPercent(percent)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      {/* track + animated fill, centered on desktop, left-aligned on mobile */}
      <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-teal-900/10 md:left-1/2 md:-translate-x-1/2">
        <div
          className="w-full bg-gradient-to-b from-mint-400 to-gold transition-[height] duration-300 ease-out"
          style={{ height: `${fillPercent}%` }}
        />
      </div>

      <ol className="space-y-10 md:space-y-14">
        {SCHEDULE.map((item, i) => {
          const Icon = item.icon
          const isRight = i % 2 === 1
          return (
            <li
              key={item.label}
              className={`relative flex items-start gap-5 pl-14 md:w-1/2 md:pl-0 ${
                isRight ? 'md:ml-auto md:flex-row md:pl-10' : 'md:flex-row-reverse md:pr-10 md:text-right'
              }`}
            >
              {/* icon node on the line */}
              <span
                className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-cream md:left-auto ${
                  isRight ? 'md:-left-5' : 'md:-right-5'
                } ${
                  item.highlight
                    ? 'animate-pulse-glow border-gold text-gold'
                    : 'border-mint-400 text-teal-600'
                }`}
              >
                <Icon size={18} strokeWidth={2} />
              </span>

              <div
                className={`flex-1 rounded-2xl border border-teal-900/10 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                  item.highlight ? 'ring-1 ring-gold/40' : ''
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-teal-500">{item.date}</p>
                <h3 className="mt-1 text-lg font-semibold text-teal-900">{item.label}</h3>
                <p className="mt-1 text-sm text-ink/70">{item.detail}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
