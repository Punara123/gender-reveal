import React from 'react';
import { motion } from 'framer-motion';

const Gallery = () => {
  const images = [
    {
      url: '/journey10_image.jpeg',
      span: 'md:col-span-6 md:row-span-2',
      rotation: '-rotate-1',
    },
    {
      url: 'journey12_image.jpeg',
      span: 'md:col-span-3',
      rotation: 'rotate-2',
    },
    {
      url: 'journey4_image.jpeg',
      span: 'md:col-span-3',
      rotation: '-rotate-2',
    },
    {
      url: 'journey16_image.jpeg',
      span: 'md:col-span-3',
      rotation: 'rotate-1',
    },
    {
      url: 'journey7_image.jpeg',
      span: 'md:col-span-3',
      rotation: '-rotate-1',
    },
    {
      url: 'journey3_image.jpeg',
      span: 'md:col-span-6',
      rotation: 'rotate-1',
    },
    {
      url: 'journey14_image.jpeg',
      span: 'md:col-span-3',
      rotation: '-rotate-1',
    },
    {
      url: 'journey13_image.jpeg',
      span: 'md:col-span-3',
      rotation: '-rotate-1',
    },
    {
      url: '/journey2_image.jpeg',
      span: 'md:col-span-6 md:row-span-2',
      rotation: '-rotate-1',
    },
    {
      url: 'journey9_image.jpeg',
      span: 'md:col-span-6',
      rotation: 'rotate-1',
    },
    {
      url: 'journey11_image.jpeg',
      span: 'md:col-span-3',
      rotation: '-rotate-1',
    },
    {
      url: 'journey15_image.jpeg',
      span: 'md:col-span-3',
      rotation: '-rotate-1',
    },


  ];

  return (
    <section id="gallery" className="py-24 px-6 bg-cream-100/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-sans text-sm uppercase tracking-[0.4em] text-charcoal/30 mb-4 block">
            The Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal italic">Beautiful Moments</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:auto-rows-[220px]">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className={`${img.span} relative group overflow-hidden rounded-2xl shadow-premium ${img.rotation} hover:rotate-0 transition-all duration-1000 z-0 hover:z-10`}
            >
              <div className="absolute inset-0 bg-charcoal/5 z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-700" />
              <motion.img
                src={img.url}
                alt={`Moment ${index + 1}`}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/20 z-20 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="font-script text-3xl text-charcoal/50">
            &bull; &nbsp; Captured with love &nbsp; &bull;
          </p>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
