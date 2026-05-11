import React, { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── SVG Balloon ─── */
function Balloon({ color, x, size, duration, delay, wobble, id, onDone }) {
  const isLight = true;
  return (
    <motion.div
      key={id}
      style={{
        position: 'absolute',
        bottom: '-10%',
        left: `${x}%`,
        pointerEvents: 'none',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      initial={{ y: 0, opacity: 0.9, rotate: wobble }}
      animate={{
        y: [0, -(window.innerHeight * 1.3)],
        opacity: [0.95, 0.95, 0.7, 0],
        rotate: [wobble, wobble + 8, wobble - 8, wobble + 5, wobble],
        x: [0, 12, -10, 8, 0],
      }}
      transition={{
        duration,
        delay,
        ease: 'easeInOut',
        opacity: { times: [0, 0.6, 0.85, 1], duration },
        rotate: { duration: duration * 0.9, repeat: 0, ease: 'easeInOut' },
        x: { duration: duration * 0.9, repeat: 0, ease: 'easeInOut' },
      }}
      onAnimationComplete={onDone}
    >
      {/* Balloon body SVG */}
      <svg
        width={size}
        height={size * 1.15}
        viewBox="0 0 60 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shadow/depth */}
        <ellipse cx="30" cy="52" rx="14" ry="6" fill="rgba(0,0,0,0.06)" />
        {/* Body */}
        <ellipse cx="30" cy="28" rx="22" ry="26"
          fill={color}
          style={{ filter: 'saturate(1.1)' }}
        />
        {/* Highlight */}
        <ellipse cx="22" cy="18" rx="6" ry="8" fill="rgba(255,255,255,0.32)" />
        {/* Knot */}
        <path d="M28.5 53 Q30 57 31.5 53" stroke={color} strokeWidth="2" fill="none" />
        {/* String */}
        <path d="M30 56 Q34 62 28 68" stroke="rgba(120,100,80,0.4)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}

/* ─── Floating burst particle ─── */
function BurstParticle({ id, emoji, x, y, angle, onDone }) {
  const rad = (angle * Math.PI) / 180;
  const dist = 55 + Math.random() * 55;
  const tx = Math.cos(rad) * dist;
  const ty = Math.sin(rad) * dist;

  return (
    <motion.span
      style={{
        position: 'absolute',
        left: x,
        top: y,
        fontSize: `${14 + Math.random() * 14}px`,
        pointerEvents: 'none',
        zIndex: 50,
        userSelect: 'none',
      }}
      initial={{ opacity: 1, x: 0, y: 0, scale: 0.5 }}
      animate={{ opacity: 0, x: tx, y: ty - 30, scale: 1.3 }}
      transition={{ duration: 1.1 + Math.random() * 0.5, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={onDone}
    >
      {emoji}
    </motion.span>
  );
}

const EMOJIS = ['🌸', '✨', '🌸', '🌸', '🌸', '🌸', '💫', '🌷', '🌸', '💗'];

/* Balloon colors — light pink & light blue */
const BALLOON_COLORS = [
  '#f9c6d0', // light pink
  '#f7b8c4', // soft rose pink
  '#bde0fe', // light sky blue
  '#c5e8ff', // pale blue
  '#fcd5e0', // blush pink
  '#a8d8f0', // powder blue
];

const Hero = () => {
  const [particles, setParticles] = useState([]);
  const [balloons, setBalloons] = useState([]);
  const [popped, setPopped] = useState(false);
  const zoneRef = useRef(null);
  const nextId = useRef(0);
  const balloonId = useRef(0);

  const spawnBalloons = useCallback(() => {
    const count = 10 + Math.floor(Math.random() * 6); // 10–15 balloons
    const fresh = Array.from({ length: count }, (_, i) => ({
      id: balloonId.current++,
      color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
      x: 2 + Math.random() * 96,           // spread across full width
      size: 38 + Math.random() * 28,        // 38–66px
      duration: 5 + Math.random() * 4,      // 5–9s float time
      delay: i * 0.18 + Math.random() * 0.3,
      wobble: (Math.random() - 0.5) * 18,  // initial tilt
    }));
    setBalloons(prev => [...prev, ...fresh]);
  }, []);

  const handleInteract = useCallback((clientX, clientY) => {
    const rect = zoneRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // emoji burst
    const count = 14;
    const fresh = Array.from({ length: count }, (_, i) => ({
      id: nextId.current++,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      x,
      y,
      angle: (i / count) * 360 + Math.random() * 20,
    }));
    setParticles(prev => [...prev, ...fresh]);

    // balloon burst
    spawnBalloons();

    setPopped(true);
    setTimeout(() => setPopped(false), 600);
  }, [spawnBalloons]);

  const onClick = (e) => handleInteract(e.clientX, e.clientY);
  const onTouch = (e) => {
    e.preventDefault();
    const t = e.touches[0];
    handleInteract(t.clientX, t.clientY);
  };

  const removeParticle = (id) =>
    setParticles(prev => prev.filter(p => p.id !== id));

  const removeBalloon = (id) =>
    setBalloons(prev => prev.filter(b => b.id !== id));

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-6 overflow-hidden text-center bg-cream-200">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/hero_image.png"
          alt="Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-cream-200/60 backdrop-blur-[1px]" />
      </div>

      {/* ── Floating balloons layer (behind content) ── */}
      <AnimatePresence>
        {balloons.map(b => (
          <Balloon
            key={b.id}
            {...b}
            onDone={() => removeBalloon(b.id)}
          />
        ))}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto z-10">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.5, ease: "easeOut" }}
          className="font-sans text-sm uppercase tracking-[0.5em] text-charcoal/40 mb-6 block"
        >
          A Secret is Blooming
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.5, ease: "easeOut" }}
          className="text-7xl md:text-8xl lg:text-9xl font-serif text-charcoal leading-none mb-4"
        >
          He or <span className="italic">She</span>?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1.5, ease: "easeOut" }}
          className="font-script text-4xl md:text-5xl text-charcoal/80 mb-10"
        >
          What will baby be?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
          className="mb-12"
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-charcoal/30 mb-3">Celebrating with</p>
          <p className="font-script text-4xl text-charcoal">Kavi &amp; Dumi</p>
        </motion.div>

        {/* ── Cute interactive touch zone ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center mb-16"
        >
          {/* Touch zone */}
          <div
            ref={zoneRef}
            onClick={onClick}
            onTouchStart={onTouch}
            className="relative cursor-pointer select-none"
            style={{ width: 160, height: 160 }}
          >
            {/* Outer breathing ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: '1.5px solid rgba(45,45,45,0.12)' }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Second ring */}
            <motion.div
              className="absolute rounded-full"
              style={{ inset: 16, border: '1px solid rgba(45,45,45,0.08)' }}
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />

            {/* Inner glowing orb */}
            <motion.div
              className="absolute rounded-full"
              style={{
                inset: 34,
                background: 'radial-gradient(circle at 38% 38%, rgba(255,245,235,0.95), rgba(210,185,160,0.5))',
                boxShadow: '0 0 32px rgba(180,140,100,0.18), inset 0 0 20px rgba(255,255,255,0.6)',
              }}
              animate={
                popped
                  ? { scale: [1, 1.22, 0.92, 1], rotate: [0, -8, 8, 0] }
                  : { scale: [1, 1.04, 1] }
              }
              transition={
                popped
                  ? { duration: 0.5, ease: 'easeOut' }
                  : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
              }
            />

            {/* Centre emoji — idle bounce */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={popped ? { scale: [1, 1.4, 0.9, 1] } : { y: [0, -4, 0] }}
              transition={
                popped
                  ? { duration: 0.45, ease: 'easeOut' }
                  : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
              }
            >
              <span style={{ fontSize: 38 }} role="img" aria-label="baby">👶</span>
            </motion.div>

            {/* Burst particles */}
            <AnimatePresence>
              {particles.map(p => (
                <BurstParticle
                  key={p.id}
                  {...p}
                  onDone={() => removeParticle(p.id)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Hint text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 1.2 }}
            className="font-sans text-[9px] uppercase tracking-[0.5em] text-charcoal/28 mt-5"
          >
            tap for a surprise ✨
          </motion.p>
        </motion.div>

        <div className="flex flex-col items-center gap-8">
          <p className="font-serif text-2xl text-charcoal/60 tracking-widest">
            MAY 24, 2026 &bull; 10:00 AM
          </p>

          <motion.a
            href="#rsvp"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-16 py-5 bg-[#6F4E37] text-white font-sans text-xs uppercase tracking-[0.4em] hover:bg-[#5a3e2c] transition-all shadow-xl rounded-full"
          >
            Save the Date
          </motion.a>
        </div>
      </div>

      {/* Decorative Floating Petals/Dust */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, 50, 0],
              rotate: [0, 360],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bg-blush-100 rounded-full blur-xl"
            style={{
              width: `${20 + i * 10}px`,
              height: `${20 + i * 10}px`,
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
