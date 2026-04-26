/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useState } from "react";
import { Terminal } from "lucide-react";

const Typewriter = ({ text, delay = 0, speed = 0.05, className = "" }: { text: string; delay?: number; speed?: number; className?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displaytext = useTransform(rounded, (latest) => text.slice(0, latest));
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: "tween",
      duration: text.length * speed,
      delay: delay,
      ease: "linear",
      onComplete: () => setCompleted(true),
    });
    return controls.stop;
  }, [count, text, speed, delay]);

  return (
    <span className={className}>
      <motion.span>{displaytext}</motion.span>
      {!completed && (
        <motion.span
          className="inline-block w-[0.6em] h-[1em] bg-white ml-1 align-middle"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
        />
      )}
    </span>
  );
};

export default function App() {
  const [showDescription, setShowDescription] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowDescription(true), 2000);
    const timer2 = setTimeout(() => setShowFeatures(true), 4000);
    const timer3 = setTimeout(() => setShowFooter(true), 5000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white font-mono relative flex flex-col items-center justify-center p-4 selection:bg-white selection:text-black overflow-hidden">
      {/* Scanline Effect */}
      <div className="scanline pointer-events-none" />
      
      {/* Background Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="terminal-container w-full max-w-3xl border border-zinc-800 rounded-lg bg-zinc-950 flex flex-col z-10 overflow-hidden"
      >
        {/* Terminal Window Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
            <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
            <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
          </div>
          <div className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            <Terminal size={12} />
            rich-presence-manager
          </div>
          <div className="w-12 h-3" /> {/* Spacer */}
        </div>

        {/* Main Content Area */}
        <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center items-start space-y-8">
          <div className="space-y-3 w-full">
            <div className="text-zinc-600 text-sm">$ initialize --service rich_presence</div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
              <Typewriter text="Rich Presence Manager" />
            </h1>
          </div>

          {showDescription && (
            <div className="space-y-2 w-full">
              <div className="text-zinc-600 text-sm">$ status --get bio_status</div>
              <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed">
                <Typewriter text="Trang chỉnh sửa bio hoàn hảo của bạn" speed={0.03} />
              </p>
            </div>
          )}

          {showFeatures && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
            >
              <div className="border border-white/5 p-4 rounded bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300">
                <div className="text-[10px] text-zinc-500 mb-1 tracking-widest uppercase">[01] Customization</div>
                <div className="text-sm text-zinc-400">Tùy biến giao diện Rich Presence tùy ý theo sở thích của bạn.</div>
              </div>
              <div className="border border-white/5 p-4 rounded bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300">
                <div className="text-[10px] text-zinc-500 mb-1 tracking-widest uppercase">[02]</div>
                <div className="text-sm text-zinc-400">Kèm theo 36 tính năng khác...</div>
              </div>
              <div className="border border-white/5 p-4 rounded bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300 md:col-span-2">
                <div className="text-[10px] text-zinc-500 mb-1 tracking-widest uppercase">[03] Active Sessions</div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_theme(colors.emerald.500)]" />
                  <div className="text-sm text-zinc-300">
                    <span className="text-white font-bold">11</span> người dùng đang sử dụng.
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* System Bar */}
        <div className="px-8 py-3 border-t border-zinc-900 bg-zinc-950 flex justify-between items-center opacity-40 text-[10px] uppercase tracking-tighter">
          <span>[Connected: Port 3000]</span>
          <span>Buffer: OK</span>
          <span>Sys: 0x88F2A</span>
        </div>
      </motion.div>

      {/* Footer / Coming Soon Section */}
      <div className="absolute bottom-12 left-0 w-full flex flex-col items-center gap-6 px-6 pointer-events-none">
        {showFooter && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <div className="h-[1px] w-32 bg-zinc-800 mb-6" />
            <div className="flex items-center space-x-6">
              <motion.div 
                className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <div className="text-sm md:text-base tracking-[0.5em] text-zinc-400 uppercase font-light">
                Coming Soon
              </div>
              <motion.div 
                className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ repeat: Infinity, duration: 2, delay: 1 }}
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Extreme Vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,1)]" />
    </main>
  );
}
