import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EventDetails from './components/EventDetails';
import Story from './components/Story';
import Countdown from './components/Countdown';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import Map from './components/Map';
import Footer from './components/Footer';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative bg-cream-200 min-h-screen">
      {/* Scroll Progress Bar */}

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-babyBlue-200 origin-left z-[60]"
        style={{ scaleX }}
      />

      <Navbar />

      <main>
        <Hero />
        <EventDetails />
        <Story />
        <Countdown />
        <Gallery />
        <RSVP />
        <Map />
        <Footer />
      </main>

      {/* Subtle floating background shapes */}
      <div className="fixed top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-blush-50 rounded-full blur-[120px] -z-20 opacity-50" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-babyBlue-50 rounded-full blur-[120px] -z-20 opacity-50" />
    </div>
  );
}

export default App;
