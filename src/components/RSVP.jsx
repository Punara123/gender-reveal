import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: 'yes',
    message: '',
    prediction: null
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!formData.prediction) newErrors.prediction = 'Prediction is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await fetch('https://formsubmit.co/ajax/punaraganehiarachchi628@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: "✨ New RSVP: Kavi & Dumi's Gender Reveal! ✨",
            _template: "box",
            Name: formData.name,
            Email: formData.email,
            Attendance: formData.attendance === 'yes' ? 'Happily Attend' : 'Regretfully Decline',
            Message: formData.message || 'No message left.',
            Prediction: formData.prediction ? `Team ${formData.prediction}` : 'No prediction'
          })
        });
      } catch (error) {
        console.error('Submission failed:', error);
      }
      setSubmitted(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  return (
    <section id="rsvp" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-blush-100/10 -skew-y-3 origin-right -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-2xl mx-auto organic-card relative z-10 p-8 md:p-12"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-charcoal mb-4">RSVP</h2>
          <p className="font-sans text-charcoal/60 italic">We can't wait to celebrate with you!</p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-sans text-[10px] uppercase tracking-widest text-charcoal/40 ml-1">
                  Your Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-white border ${errors.name ? 'border-red-200' : 'border-charcoal/5'} rounded-2xl px-6 py-4 focus:border-babyBlue-200 outline-none transition-all font-sans text-charcoal shadow-sm`}
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="font-sans text-[10px] uppercase tracking-widest text-charcoal/40 ml-1">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-white border ${errors.email ? 'border-red-200' : 'border-charcoal/5'} rounded-2xl px-6 py-4 focus:border-babyBlue-200 outline-none transition-all font-sans text-charcoal shadow-sm`}
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="font-sans text-[10px] uppercase tracking-widest text-charcoal/40 ml-1">
                Attendance <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-4">
                {['yes', 'no'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, attendance: option }))}
                    className={`flex-1 py-4 rounded-2xl border font-sans text-xs uppercase tracking-widest transition-all shadow-sm ${formData.attendance === option
                      ? 'bg-[#967d6e] text-white border-[#967d6e]'
                      : 'bg-white text-charcoal/50 border-charcoal/5 hover:border-charcoal/20'
                      }`}
                  >
                    {option === 'yes' ? 'Happily Attend' : 'Regretfully Decline'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-sans text-[10px] uppercase tracking-widest text-charcoal/40 ml-1">
                A Note for Baby <span className="text-red-400">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                className="w-full bg-white border border-charcoal/5 rounded-2xl px-6 py-4 focus:border-babyBlue-200 outline-none transition-all font-sans text-charcoal shadow-sm resize-none"
                placeholder="Share a warm wish..."
              />
            </div>

            <div className="space-y-8 pt-4 text-center">
              <p className="font-serif text-xl text-charcoal italic">
                Cast your prediction! <span className="text-red-400 text-sm">*</span>
              </p>
              <div className="flex justify-center gap-8 md:gap-12">
                {['boy', 'girl'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, prediction: type }))}
                    className={`flex flex-col items-center gap-3 transition-all duration-500 ${formData.prediction === type ? 'scale-110' : 'opacity-40 grayscale'}`}
                  >
                    <div className={`w-16 h-16 md:w-20 md:h-20 ${type === 'boy' ? 'bg-babyBlue-50' : 'bg-blush-50'} rounded-full flex items-center justify-center text-3xl shadow-soft border border-white`}>
                      {type === 'boy' ? '💙' : '💖'}
                    </div>
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold">Team {type}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-8 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-16 py-5 bg-[#967d6e] text-white font-sans text-[10px] uppercase tracking-[0.4em] hover:bg-[#5a3e2c] transition-all rounded-full shadow-premium"
              >
                Send Invitation Response
              </motion.button>
            </div>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 text-center space-y-6"
          >
            <div className="text-6xl animate-bounce">💌</div>
            <h3 className="text-3xl font-serif text-charcoal">Thank you!</h3>
            <p className="font-sans text-charcoal/60 leading-relaxed max-w-sm mx-auto">
              We've received your response and can't wait to share this magical day with you.
            </p>
            {formData.prediction && (
              <p className="font-script text-3xl text-charcoal mt-8">
                Team {formData.prediction === 'boy' ? 'Boy' : 'Girl'} is lucky to have you!
              </p>
            )}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default RSVP;
