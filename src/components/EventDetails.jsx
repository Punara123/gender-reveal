import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';

/* ── simple card ────────────────────────────────────────── */
const EventCard = ({ item }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.98 }}
      animate={{
        y: hovered ? -8 : 0,
        boxShadow: hovered
          ? `0 20px 40px -12px ${item.accent}88`
          : '0 4px 20px rgba(0,0,0,0.04)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '1.5rem',
        border: '1px solid rgba(255,255,255,0.9)',
        backgroundColor: hovered ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.65)',
        cursor: 'default',
      }}
      className="p-10 text-center"
    >
      {/* ── subtle border ring on hover ── */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          inset: -1,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          background: `linear-gradient(135deg, ${item.accent}66, ${item.accent2}66)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1.5px',
        }}
      />

      {/* ── icon ── */}
      <div className="flex justify-center mb-6">
        {item.icon}
      </div>

      {/* label */}
      <span className="font-sans text-xs uppercase tracking-[0.2em] text-charcoal/40 mb-2 block">
        {item.label}
      </span>

      {/* title */}
      <h3 className="text-2xl font-serif text-charcoal mb-2">
        {item.title}
      </h3>

      {/* subtitle */}
      <p className="font-sans text-sm text-charcoal/60 mt-1">
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-4xl md:text-5xl font-serif text-charcoal mb-4"
          >
            The Big Day
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {details.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <EventCard item={item} />
            </motion.div>
          ))}
        </div>

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
