// A stage-and-signal scene: podium, spotlight beams and a rising "pulse" line,
// standing in for the energy of a live fest — same visual weight as a hero
// illustration, but built from this project's own subject matter.
export default function EventIllustration() {
  return (
    <svg viewBox="0 0 560 640" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B2B26" />
          <stop offset="100%" stopColor="#123832" />
        </linearGradient>
        <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9EE6B8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#9EE6B8" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="560" height="640" fill="url(#sky)" />

      {/* spotlight beams */}
      <polygon points="90,0 210,0 260,640 20,640" fill="url(#beam)" />
      <polygon points="340,0 460,0 520,640 260,640" fill="url(#beam)" />

      {/* distant confetti dots */}
      {[...Array(18)].map((_, i) => (
        <circle
          key={i}
          cx={30 + ((i * 47) % 500)}
          cy={40 + ((i * 83) % 260)}
          r={i % 3 === 0 ? 4 : 2.5}
          fill={i % 2 === 0 ? '#E8B75C' : '#6FCF97'}
          opacity="0.8"
        />
      ))}

      {/* rolling hills as stage floor */}
      <path d="M0 480 Q 140 430 280 470 T 560 460 V640 H0 Z" fill="#155147" />
      <path d="M0 520 Q 160 480 320 515 T 560 505 V640 H0 Z" fill="#1F6F5C" />

      {/* stage podium */}
      <rect x="230" y="430" width="100" height="90" rx="6" fill="#0B2B26" stroke="#6FCF97" strokeWidth="2" />
      <rect x="250" y="400" width="60" height="34" rx="4" fill="#123832" stroke="#6FCF97" strokeWidth="2" />
      <circle cx="280" cy="417" r="7" fill="#E8B75C" />

      {/* mic stand */}
      <line x1="280" y1="400" x2="280" y2="330" stroke="#9EE6B8" strokeWidth="3" />
      <ellipse cx="280" cy="322" rx="10" ry="14" fill="#E8B75C" />

      {/* speaker stack left */}
      <rect x="150" y="440" width="42" height="80" rx="4" fill="#0B2B26" stroke="#2E8B74" strokeWidth="2" />
      <circle cx="171" cy="460" r="9" fill="none" stroke="#6FCF97" strokeWidth="2" />
      <circle cx="171" cy="490" r="9" fill="none" stroke="#6FCF97" strokeWidth="2" />

      {/* speaker stack right */}
      <rect x="368" y="440" width="42" height="80" rx="4" fill="#0B2B26" stroke="#2E8B74" strokeWidth="2" />
      <circle cx="389" cy="460" r="9" fill="none" stroke="#6FCF97" strokeWidth="2" />
      <circle cx="389" cy="490" r="9" fill="none" stroke="#6FCF97" strokeWidth="2" />

      {/* audience silhouettes */}
      {[60, 110, 160, 400, 450, 500].map((x, i) => (
        <g key={x} transform={`translate(${x} 560)`}>
          <circle cx="0" cy="0" r="10" fill="#0B2B26" opacity="0.9" />
          <path d="M-14 40 Q0 5 14 40 Z" fill="#0B2B26" opacity="0.9" />
        </g>
      ))}

      {/* rising signal / pulse line across the sky, echoes a live waveform */}
      <path
        d="M0 120 L60 120 L90 60 L120 170 L150 120 L210 120 L240 90 L270 150 L300 120 L560 120"
        fill="none"
        stroke="#E8B75C"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
    </svg>
  )
}
