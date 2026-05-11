import React from 'react';
import { motion } from 'framer-motion';

import { Cloud, Heart, Star } from 'lucide-react';

const Story = () => {
  return (
    <section id="story" className="py-32 px-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-[10%] opacity-10 animate-pulse">
        <Cloud className="w-16 h-16 text-babyBlue-200" />
      </div>
      <div className="absolute bottom-20 right-[15%] opacity-10 animate-bounce">
        <Cloud className="w-20 h-20 text-blush-200" />
      </div>
      <div className="absolute top-1/4 right-[20%] opacity-20">
        <Star className="w-6 h-6 text-yellow-200" fill="currentColor" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative rounded-[2rem] shadow-premium overflow-hidden border border-white"
        >
          {/* Info Box Background Image */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage: "url('/journey_image.jpeg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* White overlay to ensure text is readable */}
            <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px]" />
          </div>

          <div className="relative z-10 p-12 md:p-20">
            <Heart className="w-8 h-8 text-blush-200 mx-auto mb-8" fill="currentColor" />

            <span className="font-sans text-xs uppercase tracking-[0.4em] text-charcoal/30 mb-6 block">
              Our Little Miracle
            </span>

            <h2 className="text-4xl md:text-5xl font-serif text-charcoal mb-10 italic">
              A Journey of Love
            </h2>

            <div className="space-y-8 font-sans text-lg text-charcoal/70 leading-relaxed max-w-2xl mx-auto">
              <p>
                From the very first moment we saw that tiny heartbeat, our world changed forever. It hasn't been just about the months of waiting, but about the countless dreams we've shared, imagining who you'll become.
              </p>
              <p>
                Whether you bring a dash of pink or a splash of blue, you are already the center of our universe. We are so incredibly grateful to share this magical reveal with the people who have walked this beautiful path beside us.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mt-12 pt-12 border-t border-charcoal/5"
            >
              <p className="font-script text-4xl text-charcoal">
                With all our love,
              </p>
              <p className="font-script text-3xl text-blush-200 mt-2">
                Kavi & Dumi
              </p>
            </motion.div>
          </div>

          {/* Decorative Corner */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 opacity-5 pointer-events-none">
            <Heart className="w-full h-full text-babyBlue-200" fill="currentColor" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Story;
