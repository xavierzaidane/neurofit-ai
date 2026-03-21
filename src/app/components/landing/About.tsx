'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={ref} id="about" className="py-32 bg-orange-500 text-black relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col gap-20">
          
          <motion.div 
            style={{ y }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-[12vw] leading-[0.8] font-bold tracking-tighter uppercase mb-8">
              True <br />
              <span className="text-white">Cognition.</span>
            </h2>
            <div className="h-4 w-full bg-black" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
                NOT JUST A CHATBOT. <br />
                A NEURAL EXTENSION OF YOUR WILL.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col gap-8"
            >
              <p className="text-xl md:text-2xl font-medium leading-relaxed opacity-80">
                NexBot shreds the limitations of traditional LLMs. It doesn&apos;t just predict the next token; it anticipates your next move. Built on a proprietary recursive architecture, it learns, adapts, and evolves in real-time.
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-8 border-t-4 border-black">
                <div>
                  <div className="text-6xl font-display font-bold mb-2">99%</div>
                  <div className="text-sm font-bold uppercase tracking-widest">Accuracy</div>
                </div>
                <div>
                  <div className="text-6xl font-display font-bold mb-2">0ms</div>
                  <div className="text-sm font-bold uppercase tracking-widest">Latency</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}