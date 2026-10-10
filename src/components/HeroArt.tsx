// Hero picture: a phone with a map, plus your people floating around it.
export function HeroArt() {
  return (
    <svg viewBox="0 0 440 420" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e0efef" />
          <stop offset="1" stopColor="#ece8f5" />
        </linearGradient>
        <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6fbfb" />
          <stop offset="1" stopColor="#eef3f3" />
        </linearGradient>
        <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2e8b8b" />
          <stop offset="1" stopColor="#9a8cc2" />
        </linearGradient>
      </defs>

      <circle cx="220" cy="210" r="195" fill="url(#bg)" />
      <circle
        className="art-ring"
        cx="220"
        cy="210"
        r="150"
        fill="none"
        stroke="url(#ring)"
        strokeWidth="2"
        strokeOpacity="0.5"
        strokeDasharray="4 10"
        strokeLinecap="round"
      />

      {/* phone */}
      <g transform="translate(140 70)">
        <rect x="0" y="0" width="160" height="290" rx="28" fill="#1f2a2e" />
        <rect x="8" y="8" width="144" height="274" rx="22" fill="url(#screen)" />

        <path d="M18 70 L60 48 L104 70 L144 50" stroke="#cfe0e0" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M22 110 L70 92 L118 112" stroke="#dfe9e9" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path
          className="art-route"
          d="M30 150 C 60 130, 95 175, 130 150"
          stroke="#2e8b8b"
          strokeWidth="4"
          strokeDasharray="2 10"
          strokeLinecap="round"
          fill="none"
        />

        <g className="art-pin">
          <g transform="translate(66 96)">
            <path d="M14 0C21.7 0 28 6 28 13.4 28 23 14 34 14 34S0 23 0 13.4C0 6 6.3 0 14 0Z" fill="#e05260" />
            <circle cx="14" cy="13" r="5" fill="#fff" />
          </g>
        </g>

        <rect x="20" y="196" width="120" height="66" rx="14" fill="#fff" stroke="#e1e8e8" />
        <circle className="art-sos" cx="46" cy="229" r="16" fill="#e05260" />
        <path d="M46 222 L46 231 M46 235 h0.01" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
        <rect x="70" y="219" width="54" height="7" rx="3.5" fill="#cfe0e0" />
        <rect x="70" y="233" width="38" height="7" rx="3.5" fill="#e4ddf2" />
      </g>

      {/* your people */}
      <g className="art-float">
        <circle cx="86" cy="150" r="26" fill="#fff" stroke="#2e8b8b" strokeWidth="2" />
        <circle cx="86" cy="143" r="8" fill="#9a8cc2" />
        <path d="M74 164a12 12 0 0 1 24 0Z" fill="#9a8cc2" />
      </g>
      <g className="art-float d2">
        <circle cx="360" cy="120" r="24" fill="#fff" stroke="#9a8cc2" strokeWidth="2" />
        <circle cx="360" cy="114" r="7.5" fill="#2e8b8b" />
        <path d="M349 140a11 11 0 0 1 22 0Z" fill="#2e8b8b" />
      </g>
      <g className="art-float d3">
        <circle cx="352" cy="300" r="22" fill="#fff" stroke="#2e8b8b" strokeWidth="2" />
        <path d="M352 290l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8Z" fill="#e05260" />
      </g>
    </svg>
  )
}
