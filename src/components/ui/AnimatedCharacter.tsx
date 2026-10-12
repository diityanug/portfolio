import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import './AnimatedCharacter.css';

type Mouse = { mx: MotionValue<number>; my: MotionValue<number> };

// Helper for CSS custom properties
const cv = (vars: Record<string, string | number>, extra?: CSSProperties) =>
  ({ ...vars, ...extra }) as CSSProperties;

const SPRING = { stiffness: 200, damping: 22, mass: 0.6 };

// Normalized mouse position (0-1) without triggering React re-renders
const useMouse = () => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX / window.innerWidth);
      y.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [x, y]);

  return { mx: sx, my: sy };
};

// Eye pupil tracking mouse coordinates
const TrackEye = ({
  cx, cy, r = 9, pr = 4, mx, my,
}: { cx: number; cy: number; r?: number; pr?: number } & Mouse) => {
  const ox = useTransform(mx, (v) => (v - 0.5) * r * 0.7);
  const oy = useTransform(my, (v) => (v - 0.5) * r * 0.7);
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="white" />
      <motion.circle cx={cx} cy={cy} r={pr} fill="#1a1a2e" style={{ x: ox, y: oy }} />
      <circle cx={cx - r * 0.28} cy={cy - r * 0.3} r={pr * 0.38} fill="white" />
    </g>
  );
};

// Legs with subtle walking motion
const Legs = ({
  x1, x2, yTop, yBottom, delay = 0,
}: { x1: number; x2: number; yTop: number; yBottom: number; delay?: number }) => {
  const style = cv({ '--d': '2s', '--dl': `${delay}s` });
  return (
    <g>
      <g className="ac-legl" style={style}>
        <line x1={x1} y1={yTop} x2={x1} y2={yBottom} stroke="#134e4a" strokeWidth={7} strokeLinecap="round" />
        <ellipse cx={x1} cy={yBottom} rx={9} ry={6} fill="#2dd4bf" />
      </g>
      <g className="ac-legr" style={style}>
        <line x1={x2} y1={yTop} x2={x2} y2={yBottom} stroke="#134e4a" strokeWidth={7} strokeLinecap="round" />
        <ellipse cx={x2} cy={yBottom} rx={9} ry={6} fill="#2dd4bf" />
      </g>
    </g>
  );
};

// Arm swinging from shoulder joint
const Arm = ({
  ox, oy, dx, dy, delay = 0, flip = false,
}: { ox: number; oy: number; dx: number; dy: number; delay?: number; flip?: boolean }) => {
  const sign = flip ? -1 : 1;
  return (
    <line
      className="ac-arm"
      x1={ox} y1={oy} x2={ox + dx * sign} y2={oy + dy}
      stroke="#134e4a" strokeWidth={7} strokeLinecap="round"
      style={cv(
        { '--d': '2.5s', '--dl': `${delay}s`, '--r': flip ? '-8deg' : '8deg' },
        { transformOrigin: `${ox}px ${oy}px` },
      )}
    />
  );
};

const svgProps = {
  fill: 'none',
  'aria-hidden': true,
  focusable: 'false',
  style: { width: '100%', height: '100%', overflow: 'visible' } as CSSProperties,
} as const;

// Character 1: Square Coder (pink, headphones)
const SquareCoder = ({ mx, my }: Mouse) => (
  <svg viewBox="0 0 200 280" {...svgProps}>
    <Legs x1={75} x2={108} yTop={196} yBottom={252} />

    <rect x="42" y="104" width="116" height="100" rx="28" fill="#f472b6" />
    <rect x="42" y="150" width="116" height="54" rx="0" fill="#ec4899" opacity="0.35" />
    <rect x="42" y="176" width="116" height="28" rx="28" fill="#ec4899" opacity="0.35" />

    <Arm ox={42} oy={138} dx={-32} dy={22} delay={0.3} />
    <Arm ox={158} oy={138} dx={32} dy={22} flip delay={0.7} />

    <rect x="52" y="36" width="96" height="78" rx="22" fill="#f472b6" />
    <rect x="52" y="36" width="96" height="28" rx="22" fill="#fb923c" />
    <rect x="52" y="52" width="96" height="12" fill="#fb923c" />

    <path d="M56 64 Q100 28 144 64" stroke="#2dd4bf" strokeWidth="9" fill="none" strokeLinecap="round" />
    <rect x="42" y="60" width="22" height="22" rx="8" fill="#2dd4bf" />
    <rect x="136" y="60" width="22" height="22" rx="8" fill="#2dd4bf" />

    <TrackEye cx={80} cy={84} r={10} pr={5} mx={mx} my={my} />
    <TrackEye cx={120} cy={84} r={10} pr={5} mx={mx} my={my} />
    <ellipse cx={65} cy={97} rx={9} ry={6} fill="#fb7185" opacity={0.6} />
    <ellipse cx={135} cy={97} rx={9} ry={6} fill="#fb7185" opacity={0.6} />
    <path d="M85 103 Q100 115 115 103" stroke="#9d174d" strokeWidth="3.5" strokeLinecap="round" fill="none" />

    <text x="68" y="162" fontSize="22" fontFamily="monospace" fontWeight="bold" fill="white" opacity="0.85">
      {'</>'}
    </text>

    <ellipse cx="100" cy="260" rx="46" ry="9" fill="rgba(0,0,0,0.08)" />
  </svg>
);

// Character 2: Star Designer (yellow, center & tallest)
const starPoints = (cx: number, cy: number, r: number, ir: number, pts: number) => {
  const coords: string[] = [];
  for (let i = 0; i < pts * 2; i++) {
    const angle = (i * Math.PI) / pts - Math.PI / 2;
    const rad = i % 2 === 0 ? r : ir;
    coords.push(`${cx + Math.cos(angle) * rad},${cy + Math.sin(angle) * rad}`);
  }
  return coords.join(' ');
};

const STAR_BODY = starPoints(100, 130, 72, 44, 7);
const STAR_BODY_SHADE = starPoints(100, 150, 72, 44, 7);
const STAR_HEAD = starPoints(100, 62, 54, 30, 7);
const STAR_HEAD_SHADE = starPoints(100, 72, 54, 30, 7);

const StarDesigner = ({ mx, my }: Mouse) => (
  <svg viewBox="0 0 200 320" {...svgProps}>
    <Legs x1={82} x2={118} yTop={220} yBottom={292} delay={0.4} />

    <polygon points={STAR_BODY} fill="#fbbf24" />
    <polygon points={STAR_BODY_SHADE} fill="#f59e0b" opacity={0.4} />

    <Arm ox={38} oy={108} dx={-30} dy={18} delay={0.2} />
    {/* Right arm raised holding tablet */}
    <g
      className="ac-arm"
      style={cv({ '--d': '2.5s', '--r': '4deg' }, { transformOrigin: '162px 100px' })}
    >
      <line x1={162} y1={100} x2={190} y2={58} stroke="#134e4a" strokeWidth={7} strokeLinecap="round" />
      <rect x={184} y={34} width={28} height={32} rx={6} fill="#1e293b" />
      <rect x={188} y={38} width={20} height={22} rx={4} fill="#7c3aed" />
    </g>

    <polygon points={STAR_HEAD} fill="#fbbf24" />
    <polygon points={STAR_HEAD_SHADE} fill="#f59e0b" opacity={0.3} />

    <TrackEye cx={88} cy={60} r={10} pr={5} mx={mx} my={my} />
    <TrackEye cx={115} cy={58} r={10} pr={5} mx={mx} my={my} />
    <ellipse cx={76} cy={74} rx={9} ry={6} fill="#fb923c" opacity={0.7} />
    <ellipse cx={124} cy={74} rx={9} ry={6} fill="#fb923c" opacity={0.7} />
    <path d="M86 80 Q100 96 114 80" stroke="#92400e" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <ellipse cx={100} cy={86} rx={10} ry={8} fill="#ec4899" opacity={0.5} />

    <ellipse cx="100" cy="300" rx="50" ry="10" fill="rgba(0,0,0,0.08)" />
  </svg>
);

// Character 3: Triangle Thinker (purple)
const RAY_ANGLES = [0, 60, 120, 180, 240, 300] as const;
const BUBBLES = [
  { cx: 28, cy: 90, r: 6 },
  { cx: 20, cy: 74, r: 4 },
  { cx: 16, cy: 62, r: 2.5 },
] as const;

const TriangleThinker = ({ mx, my }: Mouse) => (
  <svg viewBox="0 0 200 280" {...svgProps}>
    <Legs x1={80} x2={114} yTop={196} yBottom={250} delay={0.8} />

    <polygon points="100,40 188,196 12,196" fill="#a855f7" />
    <polygon points="100,120 188,196 12,196" fill="#7e22ce" opacity={0.35} />

    <Arm ox={36} oy={160} dx={-28} dy={16} delay={0.5} />
    <g
      className="ac-arm"
      style={cv({ '--d': '3s', '--r': '4deg' }, { transformOrigin: '164px 154px' })}
    >
      <line x1={164} y1={154} x2={194} y2={124} stroke="#134e4a" strokeWidth={7} strokeLinecap="round" />
      {/* Lightbulb */}
      <g className="ac-float" style={cv({ '--d': '2.5s', '--amp': '-5px' })}>
        <ellipse cx={202} cy={108} rx={14} ry={16} fill="#fef3c7" />
        <ellipse cx={202} cy={106} rx={10} ry={11} fill="#fbbf24" />
        <rect x={197} y={122} width={10} height={5} rx={2} fill="#d97706" />
        {RAY_ANGLES.map((deg, i) => (
          <line
            key={deg}
            className="ac-fade"
            style={cv({ '--d': '1.2s', '--dl': `${i * 0.15}s`, '--o': 0.3 })}
            x1={202 + Math.cos((deg * Math.PI) / 180) * 14}
            y1={106 + Math.sin((deg * Math.PI) / 180) * 14}
            x2={202 + Math.cos((deg * Math.PI) / 180) * 22}
            y2={106 + Math.sin((deg * Math.PI) / 180) * 22}
            stroke="#fbbf24" strokeWidth={2.5} strokeLinecap="round"
          />
        ))}
      </g>
    </g>

    <TrackEye cx={85} cy={148} r={10} pr={5} mx={mx} my={my} />
    <TrackEye cx={115} cy={148} r={10} pr={5} mx={mx} my={my} />
    <ellipse cx={72} cy={162} rx={9} ry={6} fill="#c084fc" opacity={0.7} />
    <ellipse cx={128} cy={162} rx={9} ry={6} fill="#c084fc" opacity={0.7} />
    <path d="M88 166 Q100 176 112 166" stroke="#581c87" strokeWidth="3" strokeLinecap="round" fill="none" />
    <ellipse
      className="ac-fade" style={cv({ '--d': '2s', '--o': 0.5 })}
      cx={134} cy={142} rx={5} ry={7} fill="#93c5fd" opacity={0.8}
    />

    {BUBBLES.map((b, i) => (
      <circle
        key={i}
        className="ac-rise" style={cv({ '--d': '2.5s', '--dl': `${i * 0.25}s` })}
        cx={b.cx} cy={b.cy} r={b.r} fill="white" stroke="#a855f7" strokeWidth={1.5}
      />
    ))}

    <ellipse cx="100" cy="258" rx="46" ry="9" fill="rgba(0,0,0,0.08)" />
  </svg>
);

// Character 4: Terminal Robot
const TerminalRobot = ({ mx, my }: Mouse) => (
  <svg viewBox="0 0 200 260" {...svgProps}>
    <Legs x1={78} x2={110} yTop={188} yBottom={242} delay={1.0} />
    <rect x="38" y="96" width="124" height="100" rx="18" fill="#3b5bdb" />
    <rect x="52" y="112" width="96" height="68" rx="10" fill="#0f172a" />
    <rect x="60" y="120" width="50" height="7" rx="3" fill="#4ade80" opacity={0.9} />
    <rect x="60" y="132" width="36" height="6" rx="3" fill="#4ade80" opacity={0.6} />
    <rect x="60" y="143" width="44" height="6" rx="3" fill="#4ade80" opacity={0.4} />
    <rect className="ac-blink" style={cv({ '--d': '0.7s' })} x="106" y="143" width="5" height="6" rx="1.5" fill="#4ade80" />
    <circle cx="68" cy="170" r="5" fill="#ef4444" />
    <circle className="ac-fade" style={cv({ '--d': '1.4s', '--o': 0.5 })} cx="84" cy="170" r="5" fill="#22c55e" />
    <Arm ox={38} oy={128} dx={-28} dy={20} delay={0.2} />
    <Arm ox={162} oy={128} dx={28} dy={20} flip delay={0.6} />
    <rect x="44" y="28" width="112" height="78" rx="18" fill="#3b5bdb" />
    <line x1="100" y1="28" x2="100" y2="10" stroke="#3b5bdb" strokeWidth="6" strokeLinecap="round" />
    <circle className="ac-ping" style={cv({ '--d': '1.2s' })} cx="100" cy="8" r="7" fill="#60a5fa" />
    <rect x="52" y="36" width="96" height="62" rx="10" fill="#0f172a" />
    <text x="62" y="72" fontSize="14" fontFamily="monospace" fontWeight="bold" fill="#4ade80" opacity={0.95}>{'>'}</text>
    <text x="80" y="72" fontSize="14" fontFamily="monospace" fontWeight="bold" fill="#4ade80" opacity={0.95}>{'_'}</text>
    <TrackEye cx={122} cy={65} r={11} pr={5} mx={mx} my={my} />
    <ellipse cx="100" cy="250" rx="46" ry="8" fill="rgba(0,0,0,0.08)" />
  </svg>
);

// Character 5: Circle Cyclops
const BROW = 'M80 54 Q100 48 120 54';
const BROW_ALT = 'M80 52 Q100 58 120 52';
const MOUTH = 'M80 102 Q100 94 120 102';
const MOUTH_ALT = 'M80 98 Q100 114 120 98';

const CircleCyclops = ({ mx, my, active }: Mouse & { active: boolean }) => {
  const px = useTransform(mx, (v) => (v - 0.5) * 10);
  const py = useTransform(my, (v) => (v - 0.5) * 8);
  return (
    <svg viewBox="0 0 200 280" {...svgProps}>
      <Legs x1={80} x2={114} yTop={200} yBottom={256} delay={1.4} />
      <circle cx="100" cy="158" r="58" fill="#fb923c" />
      <circle cx="100" cy="174" r="58" fill="#f97316" opacity={0.35} />
      <Arm ox={44} oy={148} dx={-30} dy={16} delay={0.9} />
      <g
        className="ac-arm"
        style={cv({ '--d': '2.2s', '--r': '4deg' }, { transformOrigin: '156px 136px' })}
      >
        <line x1={156} y1={136} x2={186} y2={102} stroke="#134e4a" strokeWidth={7} strokeLinecap="round" />
        <circle cx={188} cy={100} r={10} fill="#fb923c" />
      </g>

      <circle cx="100" cy="82" r="52" fill="#fb923c" />
      <circle cx="100" cy="94" r="52" fill="#f97316" opacity={0.3} />
      <circle cx="100" cy="78" r="22" fill="white" />
      <motion.circle cx={100} cy={78} r={11} fill="#1a1a2e" style={{ x: px, y: py }} />
      <circle cx="92" cy="69" r="5" fill="white" />

      {/* Morph path: only active when in view and reduced motion is disabled */}
      <motion.path
        d={BROW} stroke="#c2410c" strokeWidth="5" strokeLinecap="round" fill="none"
        animate={{ d: active ? [BROW, BROW_ALT, BROW] : BROW }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        d={MOUTH} stroke="#c2410c" strokeWidth="4" strokeLinecap="round" fill="none"
        animate={{ d: active ? [MOUTH, MOUTH_ALT, MOUTH] : MOUTH }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      <ellipse cx="70" cy="96" rx="11" ry="8" fill="#fb7185" opacity={0.55} />
      <ellipse cx="130" cy="96" rx="11" ry="8" fill="#fb7185" opacity={0.55} />
      <circle cx="78" cy="88" r="2.5" fill="#ea580c" opacity={0.5} />
      <circle cx="122" cy="88" r="2.5" fill="#ea580c" opacity={0.5} />
      <ellipse cx="100" cy="264" rx="46" ry="9" fill="rgba(0,0,0,0.08)" />
    </svg>
  );
};

// Floating decorative shapes
const FLOATING_SHAPES = [
  {
    shape: (<>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </>),
    color: '#2dd4bf', style: { top: '15%', left: '10%' }, rotate: -15, delay: 0.4, dur: 3.5,
  },
  {
    shape: (<>
      <path d="M9 4v4c0 2-2 2-2 4s2 2 2 4v4" />
      <path d="M15 4v4c0 2 2 2 2 4s-2 2-2 4v4" />
    </>),
    color: '#f472b6', style: { top: '12%', right: '12%' }, rotate: 10, delay: 1.2, dur: 4.0,
  },
  {
    shape: <circle cx="12" cy="12" r="8" />,
    color: '#a855f7', style: { bottom: '25%', left: '8%' }, rotate: 0, delay: 0.8, dur: 3.8,
  },
  {
    shape: <path d="M12 2v20M2 12h20" />,
    color: '#fbbf24', style: { bottom: '30%', right: '10%' }, rotate: 45, delay: 1.6, dur: 4.2,
  },
  {
    shape: <polygon points="12,2 22,20 2,20" />,
    color: '#3b5bdb', style: { top: '40%', left: '4%' }, rotate: 20, delay: 0.2, dur: 3.1,
  },
] as const;

const SPARKLES = [
  { left: '20%', top: '65%', delay: 0, dur: 2.4, color: '#fbbf24' },
  { left: '80%', top: '55%', delay: 0.8, dur: 3, color: '#a855f7' },
  { left: '50%', top: '8%', delay: 1.4, dur: 2.8, color: '#f472b6' },
  { left: '32%', top: '85%', delay: 0.4, dur: 2.6, color: '#34d399' },
  { left: '68%', top: '85%', delay: 1.8, dur: 3.2, color: '#60a5fa' },
] as const;

// Character slot: absolute positioning with vertical float motion
const Slot = ({
  bottom, ml, w, h, amp, dur, delay = 0, children,
}: {
  bottom: string; ml: number; w: number; h: number;
  amp: number; dur: number; delay?: number; children: ReactNode;
}) => (
  <div
    className={`ac-float absolute ${bottom}`}
    style={cv(
      { '--amp': `${-amp}px`, '--d': `${dur}s`, '--dl': `${delay}s` },
      { left: '50%', marginLeft: ml, width: w, height: h },
    )}
  >
    {children}
  </div>
);

// Main component 
const AnimatedCharacter = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '100px' });
  const reduce = useReducedMotion();
  const mouse = useMouse();

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-paused={!inView}
      className="ac-root relative w-full select-none"
      style={{ height: 600 }}
    >
      {/* Ambient blobs */}
      <div
        className="ac-blob absolute rounded-full pointer-events-none"
        style={cv(
          { '--d': '7s', '--sc': 1.18, '--o0': 0.15, '--o1': 0.35 },
          { width: 280, height: 280, top: 10, left: '15%', background: 'radial-gradient(circle, #f472b620 0%, transparent 70%)' },
        )}
      />
      <div
        className="ac-blob absolute rounded-full pointer-events-none"
        style={cv(
          { '--d': '8s', '--dl': '1.5s', '--sc': 1.15, '--o0': 0.12, '--o1': 0.3 },
          { width: 240, height: 240, top: 40, right: '15%', background: 'radial-gradient(circle, #a855f720 0%, transparent 70%)' },
        )}
      />

      {/* Characters */}
      <div className="absolute bottom-0 left-1/2 w-full max-w-4xl -translate-x-1/2" style={{ height: 500 }}>
        {/* Back row */}
        <Slot bottom="bottom-17.5" ml={-310} w={170} h={290} amp={10} dur={3.8} delay={0.1}>
          <TerminalRobot {...mouse} />
        </Slot>
        <Slot bottom="bottom-27.5" ml={-110} w={210} h={400} amp={16} dur={5} delay={0.5}>
          <StarDesigner {...mouse} />
        </Slot>
        <Slot bottom="bottom-15" ml={140} w={180} h={300} amp={9} dur={4.5} delay={0.3}>
          <TriangleThinker {...mouse} />
        </Slot>

        {/* Front row */}
        <Slot bottom="bottom-0" ml={-230} w={230} h={380} amp={13} dur={4}>
          <SquareCoder {...mouse} />
        </Slot>
        <Slot bottom="bottom-2.5" ml={-10} w={230} h={400} amp={11} dur={4.2} delay={0.7}>
          <CircleCyclops {...mouse} active={inView && !reduce} />
        </Slot>
      </div>

      {/* Floating shapes */}
      {FLOATING_SHAPES.map((item, i) => (
        <div
          key={i}
          className="ac-drift absolute pointer-events-none z-30"
          style={cv(
            { '--d': `${item.dur}s`, '--dl': `${item.delay}s`, '--r0': `${item.rotate}deg`, '--r1': `${item.rotate + 15}deg` },
            { ...item.style },
          )}
        >
          <svg
            width="36" height="36" viewBox="0 0 24 24" fill="none"
            stroke={item.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            focusable="false"
          >
            {item.shape}
          </svg>
        </div>
      ))}

      {/* Sparkle */}
      {SPARKLES.map((s, i) => (
        <div
          key={i}
          className="ac-twinkle absolute pointer-events-none text-2xl font-bold"
          style={cv(
            { '--d': `${s.dur}s`, '--dl': `${s.delay}s` },
            { left: s.left, top: s.top, color: s.color, lineHeight: 1 },
          )}
        >
          ✦
        </div>
      ))}
    </div>
  );
};

export default AnimatedCharacter;