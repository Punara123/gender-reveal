import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';

/* ── sparkle particle ───────────────────────────────────── */
const Sparkle = ({ x, y, color, onDone }) => {
  const size = Math.random() * 7 + 4;
  const angle = Math.random() * 360;
  const dist = Math.random() * 70 + 30;
  const tx = Math.cos((angle * Math.PI) / 180) * dist;
  const ty = Math.sin((angle * Math.PI) / 180) * dist;

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        pointerEvents: 'none',
        zIndex: 10,
        translateX: '-50%',
        translateY: '-50%',
      }}
      initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
      animate={{ scale: [0, 1.2, 0], opacity: [1, 0.9, 0], x: tx, y: ty }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
      onAnimationComplete={onDone}
    />
  );
};

/* ── stagger container ──────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 44 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 110, damping: 15 },
  },
};

/* ── 3-D tilt card ──────────────────────────────────────── */
const TiltCard = ({ item }) => {
  const cardRef = useRef(null);
  const rafRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const nextId = useRef(0);

  /* smooth tilt via rAF */
  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;
      const { left, top, width, height } = card.getBoundingClientRect();
      const nx = (e.clientX - left) / width;   // 0..1
      const ny = (e.clientY - top) / height;  // 0..1
      setTilt({ rx: (ny - 0.5) * -18, ry: (nx - 0.5) * 18 });
      setSpot({ x: nx * 100, y: ny * 100 });
    });
  }, []);

  const handleMouseEnter = useCallback((e) => {
    setHovered(true);
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    /* burst 10 sparkles from cursor entry point */
    const ex = e.clientX - left;
    const ey = e.clientY - top;
    const burst = Array.from({ length: 10 }, () => ({
      id: nextId.current++,
      x: ex,
      y: ey,
      color: Math.random() > 0.5 ? item.accent : item.accent2,
    }));
    setSparkles(prev => [...prev, ...burst]);
  }, [item.accent, item.accent2]);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setHovered(false);
    setTilt({ rx: 0, ry: 0 });
    setSpot({ x: 50, y: 50 });
  }, []);

  const removeSparkle = useCallback((id) =>
    setSparkles(prev => prev.filter(s => s.id !== id)), []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileInView={() => {
        if (!hovered) {
          const burst = Array.from({ length: 15 }, () => ({
            id: nextId.current++,
            x: 100 + Math.random() * 100,
            y: 100 + Math.random() * 100,
            color: Math.random() > 0.5 ? item.accent : item.accent2,
          }));
          setSparkles(prev => [...prev, ...burst]);
        }
      }}
      viewport={{ once: true }}
      whileTap={{ scale: 0.96 }}

      animate={{
        rotateX: tilt.rx,
        rotateY: tilt.ry,
        scale: hovered ? 1.05 : 1,
        boxShadow: hovered
          ? `0 28px 55px -14px ${item.accent}99`
          : '0 4px 24px rgba(0,0,0,0.04)',
      }}
      transition={{ type: 'spring', stiffness: 180, damping: 22 }}
      style={{
        perspective: 900,
        transformStyle: 'preserve-3d',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '1.5rem',
        border: '1px solid rgba(255,255,255,0.9)',
        backgroundColor: hovered ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.62)',
        cursor: 'default',
      }}
      className="p-10 text-center"
    >
      {/* ── spotlight that follows mouse ── */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          borderRadius: 'inherit',
          background: `radial-gradient(circle at ${spot.x}% ${spot.y}%, ${item.accent}55 0%, transparent 65%)`,
        }}
      />

      {/* ── glowing border ring on hover ── */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          inset: -1,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          background: `linear-gradient(135deg, ${item.accent}88, ${item.accent2}88)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1.5px',
        }}
      />

      {/* ── sparkle particles ── */}
      {sparkles.map(s => (
        <Sparkle
          key={s.id}
          x={s.x}
          y={s.y}
          color={s.color}
          onDone={() => removeSparkle(s.id)}
        />
      ))}

      {/* ── icon (lifts in Z) ── */}
      <motion.div
        className="flex justify-center mb-6"
        animate={{
          scale: hovered ? 1.28 : 1,
          y: hovered ? -4 : 0,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        {item.icon}
      </motion.div>

      {/* label */}
      <span
        className="font-sans text-xs uppercase tracking-[0.2em] text-charcoal/40 mb-2 block"
        style={{ position: 'relative', zIndex: 2 }}
      >
        {item.label}
      </span>

      {/* title */}
      <h3
        className="text-2xl font-serif text-charcoal mb-2"
        style={{ position: 'relative', zIndex: 2 }}
      >
        {item.title}
      </h3>

      {/* subtitle */}
      <p
        className="font-sans text-sm text-charcoal/60 mt-1"
        style={{ position: 'relative', zIndex: 2 }}
      >
        {item.subtitle}
      </p>
    </motion.div>
  );
};

/* ── main section ───────────────────────────────────────── */
const EventDetails = () => {
  const details = [
    {
      icon: <Calendar className="w-6 h-6 text-blush-200" />,
      label: 'When',
      title: 'May 24, 2026',
      subtitle: 'Starting at 10:00 AM',
      accent: '#FADADD',
      accent2: '#F7C5CA',
    },
    {
      icon: <MapPin className="w-6 h-6 text-babyBlue-200" />,
      label: 'Where',
      title: 'Ahas Pokuna Holiday Resort',
      subtitle: 'Ranthatiuyana Rd, Barandana, Sri Lanka',
      accent: '#D6EAF8',
      accent2: '#AED6F1',
    },
    {
      icon: <Clock className="w-6 h-6 text-charcoal/30" />,
      label: 'Dress Code',
      title: 'Garden Casual',
      subtitle: (<>Wear your prediction: <br /> Light Pink or Light Blue</>),
      accent: '#FADADD',
      accent2: '#D6EAF8',
    },
  ];

  return (
    <section id="details" className="py-24 px-6 bg-white/30 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-4xl md:text-5xl font-serif text-charcoal mb-4"
          >
            The Big Day
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
            style={{ originX: 0.5 }}
            className="w-24 h-px mx-auto"
          >
            <div
              className="w-full h-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent, #FADADD, #D6EAF8, #FADADD, transparent)',
              }}
            />
          </motion.div>
        </div>

        {/* cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {details.map((item, i) => (
            <motion.div 
              key={i} 
              variants={cardVariants}
              onViewportEnter={() => {
                // We'll trigger a small sparkle burst when it comes into view
                const burst = Array.from({ length: 12 }, () => ({
                  id: Math.random(),
                  x: 100 + Math.random() * 100, // approximate center
                  y: 100 + Math.random() * 100,
                  color: Math.random() > 0.5 ? item.accent : item.accent2,
                }));
                // Since this is in the parent, we might need a way to pass it to TiltCard
                // Or we can just add the sparkles logic to TiltCard's whileInView
              }}
            >
              <TiltCard item={item} />
            </motion.div>
          ))}
        </motion.div>

        {/* decorative blob */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#FADADD"
              d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.6,-31.3,86.9,-15.7,85.5,-0.8C84.1,14.1,78,28.2,69.5,40.4C61,52.6,50.1,62.9,37.3,70.1C24.5,77.3,9.8,81.4,-5.2,80.4C-20.2,79.4,-35.5,73.3,-48.9,64.3C-62.3,55.3,-73.8,43.4,-79.8,29.3C-85.8,15.2,-86.3,-1.1,-82.4,-15.8C-78.5,-30.5,-70.2,-43.6,-59.1,-52.1C-48,-60.6,-34.1,-64.5,-20.7,-71.7C-7.3,-78.9,5.7,-89.4,21.6,-87.4C37.5,-85.4,44.7,-76.4,44.7,-76.4Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
