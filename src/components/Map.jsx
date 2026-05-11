import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink } from 'lucide-react';

const Map = () => {
  return (
    <section id="location" className="py-24 px-6 bg-white/40">
      <div className="max-w-5xl mx-auto text-center">
        <div className="mb-12">
          <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-charcoal/30 mb-4 block">
            Where to Find Us
          </span>
          <h2 className="text-4xl font-serif text-charcoal mb-4 italic">Ahas Pokuna Holiday Resort</h2>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-charcoal/60">
              <MapPin className="w-4 h-4 text-babyBlue-200" />
              <p className="font-sans text-sm uppercase tracking-widest">Ranthatiuyana Rd, Barandana, Sri Lanka</p>
            </div>
            <a
              href="https://www.google.com/maps?daddr=Ranthatiuyana+Rd,+Barandana&geocode=KcFPyOp5OeM6MXp9N-L7rc5a"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-sans uppercase tracking-[0.2em] text-charcoal/40 hover:text-babyBlue-200 transition-colors underline underline-offset-4"
            >
              Open in Google Maps
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] overflow-hidden shadow-premium border-[12px] border-white group"
        >
          {/* Google Maps Embed — Ahas Pokuna Holiday Resort, Barandana, Sri Lanka */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.5!2d80.0!3d7.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2f8b1ea79e3c1%3A0x4b9d6f7e8a0c1d2e!2sAhas%20Pokuna%20Holiday%20Resort!5e0!3m2!1sen!2slk!4v1714986000000!5m2!1sen!2slk"
            width="100%"
            height="450"
            style={{ border: 0, filter: 'grayscale(0.2) contrast(0.9) brightness(1.05)' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale-[0.2] contrast-[0.9] group-hover:grayscale-0 transition-all duration-1000"
          ></iframe>

          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-charcoal/5 rounded-[2.5rem]" />
        </motion.div>

        <p className="mt-12 font-sans text-[10px] uppercase tracking-[0.4em] text-charcoal/20">
          Plenty of parking available on-site
        </p>
      </div>
    </section>
  );
};

export default Map;
