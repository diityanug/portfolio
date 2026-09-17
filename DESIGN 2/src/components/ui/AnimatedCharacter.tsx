import { motion } from 'framer-motion';
import { useEffect, useState, useCallback, useRef } from 'react';

// ─── Global mouse tracker ─────────────────────────────────────────────────────
function useMouse() {
  const [m, setM] = useState({ x: 0.5, y: 0.5 });
  useEffect(() => {
    const h = (e: MouseEvent) =>
      setM({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener('mousemove', h, { passive: true });
    return () => window.removeEventListener('mousemove', h);
  }, []);
  return m;
}

// ─── Dot eye that tracks mouse ────────────────────────────────────────────────
const TrackEye = ({
  cx, cy, r = 9, pr = 4,
  mx, my,                  // mouse 0-1 normalised
}: {
  cx: number; cy: number; r?: number; pr?: number;
  mx: number; my: number;
}) => {
  // Map mouse to a tiny offset inside the eyeball
  const ox = (mx - 0.5) * r * 0.7;
  const oy = (my - 0.5) * r * 0.7;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="white" />
      <motion.circle
        r={pr} fill="#1a1a2e"
        animate={{ cx: cx + ox, cy: cy + oy }}
        transition={{ type: 'spring', stiffness: 200, damping: 22, mass: 0.6 }}
      />
      {/* shine */}
      <circle cx={cx - r * 0.28} cy={cy - r * 0.3} r={pr * 0.38} fill="white" />
    </g>
  );
};

// ─── Leg pair ─────────────────────────────────────────────────────────────────
const Legs = ({
  x1, x2, yTop, yBottom, walkDelay = 0,
}: {
  x1: number; x2: number; yTop: number; yBottom: number; walkDelay?: number;
}) => (
  <g>
    {/* Left leg */}
    <motion.line
      x1={x1} y1={yTop} x2={x1} y2={yBottom}
      stroke="#134e4a" strokeWidth={7} strokeLinecap="round"
      animate={{ x1: [x1, x1 - 4, x1 + 3, x1], x2: [x1, x1 - 4, x1 + 3, x1] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: walkDelay }}
    />
    {/* Right leg */}
    <motion.line
      x1={x2} y1={yTop} x2={x2} y2={yBottom}
      stroke="#134e4a" strokeWidth={7} strokeLinecap="round"
      animate={{ x1: [x2, x2 + 4, x2 - 3, x2], x2: [x2, x2 + 4, x2 - 3, x2] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: walkDelay }}
    />
    {/* Left shoe */}
    <motion.ellipse
      cx={x1} cy={yBottom} rx={9} ry={6} fill="#2dd4bf"
      animate={{ cx: [x1, x1 - 4, x1 + 3, x1] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: walkDelay }}
    />
    {/* Right shoe */}
    <motion.ellipse
      cx={x2} cy={yBottom} rx={9} ry={6} fill="#2dd4bf"
      animate={{ cx: [x2, x2 + 4, x2 - 3, x2] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: walkDelay }}
    />
  </g>
);

// ─── Arm ──────────────────────────────────────────────────────────────────────
const Arm = ({
  ox, oy, dx, dy, delay = 0, flip = false,
}: {
  ox: number; oy: number; dx: number; dy: number; delay?: number; flip?: boolean;
}) => {
  const sign = flip ? -1 : 1;
  return (
    <motion.line
      x1={ox} y1={oy} x2={ox + dx * sign} y2={oy + dy}
      stroke="#134e4a" strokeWidth={7} strokeLinecap="round"
      animate={{ x2: [ox + dx * sign, ox + (dx + 6) * sign, ox + (dx - 4) * sign, ox + dx * sign], y2: [oy + dy, oy + dy - 8, oy + dy + 4, oy + dy] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHARACTER 1 — Square (pink, headphones, coder)
// Inspiration: the pink rounded-square with teal headphones in the reference
// ═══════════════════════════════════════════════════════════════════════════════
const SquareCoder = ({ mx, my }: { mx: number; my: number }) => (
  <svg viewBox="0 0 200 280" fill="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
    {/* Legs */}
    <Legs x1={75} x2={108} yTop={196} yBottom={252} walkDelay={0} />

    {/* Body – pink rounded square */}
    <rect x="42" y="104" width="116" height="100" rx="28" fill="#f472b6" />
    {/* Body shading */}
    <rect x="42" y="150" width="116" height="54" rx="0" fill="#ec4899" opacity="0.35" />
    <rect x="42" y="176" width="116" height="28" rx="28" fill="#ec4899" opacity="0.35" />

    {/* Left arm */}
    <Arm ox={42} oy={138} dx={-32} dy={22} delay={0.3} />
    {/* Right arm */}
    <Arm ox={158} oy={138} dx={32} dy={22} flip delay={0.7} />

    {/* Head – rounded square, orange/amber top */}
    <rect x="52" y="36" width="96" height="78" rx="22" fill="#f472b6" />
    {/* Hair stripe – amber */}
    <rect x="52" y="36" width="96" height="28" rx="22" fill="#fb923c" />
    <rect x="52" y="52" width="96" height="12" fill="#fb923c" />

    {/* Headphones band */}
    <path d="M56 64 Q100 28 144 64" stroke="#2dd4bf" strokeWidth="9" fill="none" strokeLinecap="round" />
    {/* Headphone cups */}
    <rect x="42" y="60" width="22" height="22" rx="8" fill="#2dd4bf" />
    <rect x="136" y="60" width="22" height="22" rx="8" fill="#2dd4bf" />

    {/* Eyes */}
    <TrackEye cx={80}  cy={84} r={10} pr={5} mx={mx} my={my} />
    <TrackEye cx={120} cy={84} r={10} pr={5} mx={mx} my={my} />
    {/* Blush */}
    <ellipse cx={65}  cy={97} rx={9} ry={6} fill="#fb7185" opacity={0.6} />
    <ellipse cx={135} cy={97} rx={9} ry={6} fill="#fb7185" opacity={0.6} />
    {/* Smile */}
    <path d="M85 103 Q100 115 115 103" stroke="#9d174d" strokeWidth="3.5" strokeLinecap="round" fill="none" />

    {/* Code bracket on body */}
    <text x="68" y="162" fontSize="22" fontFamily="monospace" fontWeight="bold" fill="white" opacity="0.85">{"</>"}</text>

    {/* Shadow */}
    <ellipse cx="100" cy="260" rx="46" ry="9" fill="rgba(0,0,0,0.08)" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHARACTER 2 — Star (yellow, designer, center + tallest)
// Inspiration: the spiky yellow star character
// ═══════════════════════════════════════════════════════════════════════════════
const StarDesigner = ({ mx, my }: { mx: number; my: number }) => {
  // Build a star polygon
  const star = (cx: number, cy: number, r: number, ir: number, pts: number) => {
    const coords: string[] = [];
    for (let i = 0; i < pts * 2; i++) {
      const angle = (i * Math.PI) / pts - Math.PI / 2;
      const rad   = i % 2 === 0 ? r : ir;
      coords.push(`${cx + Math.cos(angle) * rad},${cy + Math.sin(angle) * rad}`);
    }
    return coords.join(' ');
  };

  return (
    <svg viewBox="0 0 200 320" fill="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
      {/* Legs – longer for the tall center char */}
      <Legs x1={82} x2={118} yTop={220} yBottom={292} walkDelay={0.4} />

      {/* Body star */}
      <polygon points={star(100, 130, 72, 44, 7)} fill="#fbbf24" />
      {/* Body shading bottom half */}
      <polygon points={star(100, 150, 72, 44, 7)} fill="#f59e0b" opacity={0.4} />

      {/* Left arm */}
      <Arm ox={38} oy={108} dx={-30} dy={18} delay={0.2} />
      {/* Right arm – raised (holding phone/cat like reference) */}
      <motion.line
        x1={162} y1={100} x2={190} y2={58}
        stroke="#134e4a" strokeWidth={7} strokeLinecap="round"
        animate={{ x2: [190, 185, 194, 190], y2: [58, 52, 62, 58] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Little item in hand (tablet) */}
      <motion.rect
        x={184} y={34} width={28} height={32} rx={6} fill="#1e293b"
        animate={{ x: [184, 179, 188, 184], y: [34, 28, 38, 34] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.rect
        x={188} y={38} width={20} height={22} rx={4} fill="#7c3aed"
        animate={{ x: [188, 183, 192, 188], y: [38, 32, 42, 38] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Head – star shape (smaller, on top) */}
      <polygon points={star(100, 62, 54, 30, 7)} fill="#fbbf24" />
      {/* Head shading */}
      <polygon points={star(100, 72, 54, 30, 7)} fill="#f59e0b" opacity={0.3} />

      {/* Eyes */}
      <TrackEye cx={88}  cy={60} r={10} pr={5} mx={mx} my={my} />
      <TrackEye cx={115} cy={58} r={10} pr={5} mx={mx} my={my} />
      {/* Blush */}
      <ellipse cx={76}  cy={74} rx={9} ry={6} fill="#fb923c" opacity={0.7} />
      <ellipse cx={124} cy={74} rx={9} ry={6} fill="#fb923c" opacity={0.7} />
      {/* Happy open mouth */}
      <path d="M86 80 Q100 96 114 80" stroke="#92400e" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <ellipse cx={100} cy={86} rx={10} ry={8} fill="#ec4899" opacity={0.5} />

      {/* Shadow */}
      <ellipse cx="100" cy="300" rx="50" ry="10" fill="rgba(0,0,0,0.08)" />
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// CHARACTER 3 — Triangle (purple, thinker, right)
// Inspiration: the purple triangle with shy expression
// ═══════════════════════════════════════════════════════════════════════════════
const TriangleThinker = ({ mx, my }: { mx: number; my: number }) => (
  <svg viewBox="0 0 200 280" fill="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
    {/* Legs */}
    <Legs x1={80} x2={114} yTop={196} yBottom={250} walkDelay={0.8} />

    {/* Body – triangle */}
    <polygon points="100,40 188,196 12,196" fill="#a855f7" />
    {/* Shading bottom */}
    <polygon points="100,120 188,196 12,196" fill="#7e22ce" opacity={0.35} />

    {/* Left arm */}
    <Arm ox={36} oy={160} dx={-28} dy={16} delay={0.5} />
    {/* Right arm – slightly raised */}
    <motion.line
      x1={164} y1={154} x2={194} y2={124}
      stroke="#134e4a" strokeWidth={7} strokeLinecap="round"
      animate={{ x2: [194, 190, 198, 194], y2: [124, 118, 128, 124] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />
    {/* Lightbulb on raised hand */}
    <motion.g
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <ellipse cx={202} cy={108} rx={14} ry={16} fill="#fef3c7" />
      <ellipse cx={202} cy={106} rx={10} ry={11} fill="#fbbf24" />
      <rect x={197} y={122} width={10} height={5} rx={2} fill="#d97706" />
      {/* Glow rays */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <motion.line key={i}
          x1={202 + Math.cos(deg * Math.PI / 180) * 14}
          y1={106 + Math.sin(deg * Math.PI / 180) * 14}
          x2={202 + Math.cos(deg * Math.PI / 180) * 22}
          y2={106 + Math.sin(deg * Math.PI / 180) * 22}
          stroke="#fbbf24" strokeWidth={2.5} strokeLinecap="round"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </motion.g>

    {/* Face sits in the triangle – roughly centered */}
    {/* Eyes */}
    <TrackEye cx={85}  cy={148} r={10} pr={5} mx={mx} my={my} />
    <TrackEye cx={115} cy={148} r={10} pr={5} mx={mx} my={my} />
    {/* Blush */}
    <ellipse cx={72}  cy={162} rx={9} ry={6} fill="#c084fc" opacity={0.7} />
    <ellipse cx={128} cy={162} rx={9} ry={6} fill="#c084fc" opacity={0.7} />
    {/* Shy closed smile */}
    <path d="M88 166 Q100 176 112 166" stroke="#581c87" strokeWidth="3" strokeLinecap="round" fill="none" />
    {/* Little sweat drop (shy) */}
    <motion.ellipse cx={134} cy={142} rx={5} ry={7} fill="#93c5fd" opacity={0.8}
      animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />

    {/* Idea bubbles */}
    {[
      { cx: 28, cy: 90, r: 6  },
      { cx: 20, cy: 74, r: 4  },
      { cx: 16, cy: 62, r: 2.5 },
    ].map((b, i) => (
      <motion.circle key={i} cx={b.cx} cy={b.cy} r={b.r}
        fill="white" stroke="#a855f7" strokeWidth={1.5}
        animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.25 }}
      />
    ))}

    {/* Shadow */}
    <ellipse cx="100" cy="258" rx="46" ry="9" fill="rgba(0,0,0,0.08)" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHARACTER 4 — Terminal Robot (dark blue square, ">_o" face)
// ═══════════════════════════════════════════════════════════════════════════════
const TerminalRobot = ({ mx, my }: { mx: number; my: number }) => (
  <svg viewBox="0 0 200 260" fill="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
    <Legs x1={78} x2={110} yTop={188} yBottom={242} walkDelay={1.0} />
    {/* Body */}
    <rect x="38" y="96" width="124" height="100" rx="18" fill="#3b5bdb" />
    <rect x="52" y="112" width="96" height="68" rx="10" fill="#0f172a" />
    <rect x="60" y="120" width="50" height="7" rx="3" fill="#4ade80" opacity={0.9} />
    <rect x="60" y="132" width="36" height="6" rx="3" fill="#4ade80" opacity={0.6} />
    <rect x="60" y="143" width="44" height="6" rx="3" fill="#4ade80" opacity={0.4} />
    <motion.rect x="106" y="143" width="5" height="6" rx="1.5" fill="#4ade80"
      animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.7, repeat: Infinity }} />
    <circle cx="68" cy="170" r="5" fill="#ef4444" />
    <motion.circle cx="84" cy="170" r="5" fill="#22c55e"
      animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.4, repeat: Infinity }} />
    <Arm ox={38} oy={128} dx={-28} dy={20} delay={0.2} />
    <Arm ox={162} oy={128} dx={28} dy={20} flip delay={0.6} />
    {/* Head */}
    <rect x="44" y="28" width="112" height="78" rx="18" fill="#3b5bdb" />
    <line x1="100" y1="28" x2="100" y2="10" stroke="#3b5bdb" strokeWidth="6" strokeLinecap="round" />
    <motion.circle cx="100" cy="8" r="7" fill="#60a5fa"
      animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 1.2, repeat: Infinity }} />
    <rect x="52" y="36" width="96" height="62" rx="10" fill="#0f172a" />
    <text x="62" y="72" fontSize="14" fontFamily="monospace" fontWeight="bold" fill="#4ade80" opacity={0.95}>{">"}</text>
    <text x="80" y="72" fontSize="14" fontFamily="monospace" fontWeight="bold" fill="#4ade80" opacity={0.95}>{"_"}</text>
    <TrackEye cx={122} cy={65} r={11} pr={5} mx={mx} my={my} />
    <ellipse cx="100" cy="250" rx="46" ry="8" fill="rgba(0,0,0,0.08)" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════════════════════
// CHARACTER 5 — Circle Cyclops (orange, single big eye, grumpy→grin morph)
// ═══════════════════════════════════════════════════════════════════════════════
const CircleCyclops = ({ mx, my }: { mx: number; my: number }) => (
  <svg viewBox="0 0 200 280" fill="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
    <Legs x1={80} x2={114} yTop={200} yBottom={256} walkDelay={1.4} />
    {/* Body */}
    <circle cx="100" cy="158" r="58" fill="#fb923c" />
    <circle cx="100" cy="174" r="58" fill="#f97316" opacity={0.35} />
    <Arm ox={44} oy={148} dx={-30} dy={16} delay={0.9} />
    <motion.line x1={156} y1={136} x2={186} y2={102} stroke="#134e4a" strokeWidth={7} strokeLinecap="round"
      animate={{ x2: [186, 182, 190, 186], y2: [102, 96, 106, 102] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} />
    <motion.circle cx={188} cy={100} r={10} fill="#fb923c"
      animate={{ cx: [188, 184, 192, 188], cy: [100, 94, 104, 100] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} />
    {/* Head */}
    <circle cx="100" cy="82" r="52" fill="#fb923c" />
    <circle cx="100" cy="94" r="52" fill="#f97316" opacity={0.3} />
    {/* Cyclops eye */}
    <circle cx="100" cy="78" r="22" fill="white" />
    <motion.circle r={11} fill="#1a1a2e"
      animate={{ cx: 100 + (mx - 0.5) * 10, cy: 78 + (my - 0.5) * 8 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }} />
    <circle cx="92" cy="69" r="5" fill="white" />
    {/* Animated eyebrow */}
    <motion.path d="M80 54 Q100 48 120 54" stroke="#c2410c" strokeWidth="5" strokeLinecap="round" fill="none"
      animate={{ d: ['M80 54 Q100 48 120 54', 'M80 52 Q100 58 120 52', 'M80 54 Q100 48 120 54'] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
    {/* Animated mouth grumpy → grin */}
    <motion.path d="M80 102 Q100 94 120 102" stroke="#c2410c" strokeWidth="4" strokeLinecap="round" fill="none"
      animate={{ d: ['M80 102 Q100 94 120 102', 'M80 98 Q100 114 120 98', 'M80 102 Q100 94 120 102'] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
    <ellipse cx="70"  cy="96" rx="11" ry="8" fill="#fb7185" opacity={0.55} />
    <ellipse cx="130" cy="96" rx="11" ry="8" fill="#fb7185" opacity={0.55} />
    <circle cx="78"  cy="88" r="2.5" fill="#ea580c" opacity={0.5} />
    <circle cx="122" cy="88" r="2.5" fill="#ea580c" opacity={0.5} />
    <ellipse cx="100" cy="264" rx="46" ry="9" fill="rgba(0,0,0,0.08)" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
const AnimatedCharacter = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useMouse();

  // Abstract playful shapes replacing text badges
  const floatingShapes = [
    { // Teal code brackets
      shape: (
        <>
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </>
      ),
      color: '#2dd4bf', style: { top: '15%', left: '10%' }, rotate: -15, delay: 0.4, dur: 3.5
    },
    { // Pink curly braces
      shape: (
        <>
          <path d="M9 4v4c0 2-2 2-2 4s2 2 2 4v4"></path>
          <path d="M15 4v4c0 2 2 2 2 4s-2 2-2 4v4"></path>
        </>
      ),
      color: '#f472b6', style: { top: '12%', right: '12%' }, rotate: 10, delay: 1.2, dur: 4.0
    },
    { // Purple circle
      shape: <circle cx="12" cy="12" r="8"></circle>,
      color: '#a855f7', style: { bottom: '25%', left: '8%' }, rotate: 0, delay: 0.8, dur: 3.8
    },
    { // Yellow cross
      shape: <path d="M12 2v20M2 12h20"></path>,
      color: '#fbbf24', style: { bottom: '30%', right: '10%' }, rotate: 45, delay: 1.6, dur: 4.2
    },
    { // Blue triangle
      shape: <polygon points="12,2 22,20 2,20"></polygon>,
      color: '#3b5bdb', style: { top: '40%', left: '4%' }, rotate: 20, delay: 0.2, dur: 3.1
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none"
      style={{ height: 600 }}
    >
      {/* Ambient blobs */}
      <motion.div className="absolute rounded-full pointer-events-none"
        animate={{ scale: [1, 1.18, 1], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: 280, height: 280, top: 10, left: '15%',
          background: 'radial-gradient(circle, #f472b620 0%, transparent 70%)' }} />
      <motion.div className="absolute rounded-full pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.3, 0.12] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        style={{ width: 240, height: 240, top: 40, right: '15%',
          background: 'radial-gradient(circle, #a855f720 0%, transparent 70%)' }} />

      {/* ── CHARACTERS CLUSTER ── */}
      <div className="absolute bottom-0 left-1/2 w-full max-w-4xl -translate-x-1/2" style={{ height: 500 }}>
        
        {/* ── BACK ROW (3 chars) ── */}
        {/* Terminal Robot — back left */}
        <motion.div className="absolute bottom-17.5" style={{ left: '50%', marginLeft: -310, width: 170, height: 290 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}>
          <TerminalRobot mx={mouse.x} my={mouse.y} />
        </motion.div>

        {/* Star Designer — back center (tallest) */}
        <motion.div className="absolute bottom-27.5" style={{ left: '50%', marginLeft: -110, width: 210, height: 400 }}
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
          <StarDesigner mx={mouse.x} my={mouse.y} />
        </motion.div>

        {/* Triangle Thinker — back right */}
        <motion.div className="absolute bottom-15" style={{ left: '50%', marginLeft: 140, width: 180, height: 300 }}
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}>
          <TriangleThinker mx={mouse.x} my={mouse.y} />
        </motion.div>

        {/* ── FRONT ROW (2 chars) ── */}
        {/* Square Coder — front left */}
        <motion.div className="absolute bottom-0" style={{ left: '50%', marginLeft: -230, width: 230, height: 380 }}
          animate={{ y: [0, -13, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
          <SquareCoder mx={mouse.x} my={mouse.y} />
        </motion.div>

        {/* Circle Cyclops — front right */}
        <motion.div className="absolute bottom-2.5" style={{ left: '50%', marginLeft: -10, width: 230, height: 400 }}
          animate={{ y: [0, -11, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}>
          <CircleCyclops mx={mouse.x} my={mouse.y} />
        </motion.div>

      </div>

      {/* ── FLOATING SHAPES (Replacing text badges) ── */}
      {floatingShapes.map((item, i) => (
        <motion.div key={i}
          animate={{ y: [0, -12, 0], rotate: [item.rotate, item.rotate + 15, item.rotate] }}
          transition={{ duration: item.dur, repeat: Infinity, ease: 'easeInOut', delay: item.delay }}
          className="absolute pointer-events-none z-30"
          style={{ ...item.style, filter: `drop-shadow(0 8px 16px ${item.color}40)` }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={item.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            {item.shape}
          </svg>
        </motion.div>
      ))}

      {/* ── Sparkle decorations ── */}
      {[
        { left: '20%', top: '65%', delay: 0,   dur: 2.4, color: '#fbbf24' },
        { left: '80%', top: '55%', delay: 0.8, dur: 3,   color: '#a855f7' },
        { left: '50%', top: '8%',  delay: 1.4, dur: 2.8, color: '#f472b6' },
        { left: '32%', top: '85%', delay: 0.4, dur: 2.6, color: '#34d399' },
        { left: '68%', top: '85%', delay: 1.8, dur: 3.2, color: '#60a5fa' },
      ].map((s, i) => (
        <motion.div key={i}
          animate={{ scale: [0.5, 1.1, 0.5], opacity: [0.3, 1, 0.3], rotate: [0, 180, 360] }}
          transition={{ duration: s.dur, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
          className="absolute pointer-events-none text-2xl font-bold"
          style={{ left: s.left, top: s.top, color: s.color, lineHeight: 1 }}
        >✦</motion.div>
      ))}
    </div>
  );
};

export default AnimatedCharacter;

