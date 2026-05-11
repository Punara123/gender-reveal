import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

/* ── floating confetti dots ── */
const dots = [
  { x: '10%',  y: '20%', color: '#FADADD', size: 8,  delay: 0 },
  { x: '85%',  y: '15%', color: '#D6EAF8', size: 6,  delay: 0.4 },
  { x: '75%',  y: '70%', color: '#FADADD', size: 10, delay: 0.8 },
  { x: '20%',  y: '75%', color: '#D6EAF8', size: 7,  delay: 1.2 },
  { x: '50%',  y: '10%', color: '#FADADD', size: 5,  delay: 0.6 },
  { x: '92%',  y: '50%', color: '#D6EAF8', size: 9,  delay: 1.0 },
  { x: '5%',   y: '50%', color: '#FADADD', size: 6,  delay: 0.2 },
];

/* ── stagger parent ── */
const wrapVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const Footer = () => {
  return (
    <footer className="py-24 px-6 bg-cream-50/50 text-center relative overflow-hidden">

      {/* ── soft radial glow ── */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-blush-100/30 rounded-full blur-[110px] -z-10"
      />

      {/* ── floating confetti dots ── */}
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: dot.x,
            top: dot.y,
            width: dot.size,
            height: dot.size,
            borderRadius: '50%',
            backgroundColor: dot.color,
            pointerEvents: 'none',
          }}
          animate={{ y: [-6, 6, -6], opacity: [0.4, 0.8, 0.4] }}
          transition={{
            duration: 3 + i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: dot.delay,
          }}
        />
      ))}

      {/* ── content ── */}
      <motion.div
        variants={wrapVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-4xl mx-auto"
      >
        {/* pulsing heart */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-6"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart className="w-7 h-7 text-blush-200" fill="currentColor" />
          </motion.div>
        </motion.div>

        {/* animated name */}
        <motion.p
          variants={itemVariants}
          whileHover={{ scale: 1.04, textShadow: '0 0 20px #FADADD' }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
          className="font-script text-4xl md:text-5xl text-charcoal mb-6 cursor-default"
        >
          Kavi &amp; Dumi
        </motion.p>

        {/* shimmer divider */}
        <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 mb-12">
          <p className="font-sans text-xs uppercase tracking-[0.4em] text-charcoal/40">
            May 24, 2026 &bull; Ahas Pokuna Holiday Resort
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            style={{ originX: 0.5 }}
            className="w-16 h-px"
          >
            <div
              className="w-full h-full"
              style={{
                background:
                  'linear-gradient(90deg, transparent, #FADADD, #D6EAF8, #FADADD, transparent)',
              }}
            />
          </motion.div>
        </motion.div>

        {/* tagline */}
        <motion.h3
          variants={itemVariants}
          className="font-serif text-2xl text-charcoal mb-12 italic opacity-60"
        >
          Thank you for being part of our story.
        </motion.h3>

        {/* copyright */}
        <motion.div
          variants={itemVariants}
          className="pt-12 border-t border-charcoal/5"
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.5em] text-charcoal/20">
            &copy; 2026 &bull; Made with Love
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
