'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const testimonials = [
  {
    quote: "IT WRITES CODE BETTER THAN I DO.",
    author: "SARAH JENKINS",
    role: "CTO @ TECHFLOW"
  },
  {
    quote: "ABSOLUTELY INSANE VELOCITY.",
    author: "MARCUS CHEN",
    role: "LEAD @ VERTEX"
  },
  {
    quote: "THE FUTURE IS ALREADY HERE.",
    author: "ELENA R.",
    role: "ARCHITECT @ NEXUS"
  }
];

export default function Testimonials() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section ref={ref} className="py-32 bg-black border-y border-white/10 overflow-hidden">
      <div className="container mx-auto px-6 mb-20">
        <h2 className="font-display text-4xl font-bold text-white uppercase tracking-widest text-center">
          Verified <span className="text-orange-500">Intel</span>
        </h2>
      </div>

      <div className="relative flex overflow-x-hidden">
        <motion.div style={{ x }} className="animate-marquee whitespace-nowrap flex gap-16">
          {[...testimonials, ...testimonials].map((item, index) => (
            <div key={index} className="w-[80vw] md:w-[600px] shrink-0 p-8 md:p-12 border border-white/20 bg-white/5 rounded-3xl backdrop-blur-sm hover:border-orange-500 transition-colors duration-500 group whitespace-normal">
              <p className="font-display text-3xl md:text-5xl font-bold text-white mb-8 leading-tight group-hover:text-orange-500 transition-colors break-words">
                &quot;{item.quote}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse" />
                <div>
                  <div className="font-bold text-white tracking-widest">{item.author}</div>
                  <div className="text-sm text-white/50 tracking-widest">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}