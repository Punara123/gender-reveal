import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Countdown = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date(2026, 4, 24, 10, 0, 0); // May 24, 2026, 10:00 AM
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timerItems = [
    { label: 'Days', value: timeLeft.days || 0, color: 'bg-blush-50' },
    { label: 'Hours', value: timeLeft.hours || 0, color: 'bg-babyBlue-50' },
    { label: 'Minutes', value: timeLeft.minutes || 0, color: 'bg-cream-100' },
    { label: 'Seconds', value: timeLeft.seconds || 0, color: 'bg-white' },
  ];

  return (
    <section className="py-24 bg-white/40 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="font-sans text-xs uppercase tracking-[0.4em] text-charcoal/30 mb-4 block"
        >
          Counting the Heartbeats
        </motion.span>
        <h3 className="font-serif text-4xl text-charcoal mb-16 italic">Until we know the secret...</h3>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {timerItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="relative group"
            >
              {/* Outer Glow/Ring */}
              <div className="absolute -inset-4 bg-white/40 rounded-full blur-xl group-hover:bg-white/60 transition-all duration-700" />

              <div className={`relative w-24 h-24 md:w-32 md:h-32 flex flex-col items-center justify-center ${item.color} rounded-full shadow-premium border border-white/50 transition-transform duration-700 group-hover:scale-105`}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={item.value}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-3xl md:text-4xl font-serif text-charcoal"
                  >
                    {item.value.toString().padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
                <span className="text-[10px] uppercase tracking-widest text-charcoal/40 font-medium mt-1">
                  {item.label}
                </span>
              </div>

              {/* Subtle decorative dot */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-soft border border-charcoal/5" />
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-charcoal/40 font-sans text-sm italic">
          &bull; &nbsp; Join us in the celebration of life &nbsp; &bull;
        </div>
      </div>
    </section>
  );
};

export default Countdown;
