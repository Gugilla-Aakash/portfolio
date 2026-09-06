"use client";

import { motion, useMotionValue } from "framer-motion";
import { Mouse } from "lucide-react";
import Background from "./Background";
import HeroContent from "./HeroContent";
import Navbar from "./Navbar";
import StatsBar from "./StatsBar";

export default function Hero() {
  // -0.5 .. 0.5 normalized cursor for parallax + spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const onMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX / window.innerWidth - 0.5);
    mouseY.set(e.clientY / window.innerHeight - 0.5);
  };

  return (
    <main
      onMouseMove={onMouseMove}
      className="relative flex min-h-screen flex-col overflow-hidden bg-[#05010f]"
    >
      <Background mouseX={mouseX} mouseY={mouseY} />
      <Navbar />

      {/* Content */}
      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-5 pb-28 pt-[130px] sm:px-8 lg:pb-24">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <HeroContent />
            <StatsBar />
          </div>
          {/* Right column intentionally empty — lets the developer / globe art breathe. */}
          <div className="hidden lg:block" aria-hidden="true">
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="animate-float-slow glass ml-auto max-w-[240px] rounded-2xl border-violet-400/25 p-[1px]"
            >
              <div className="rounded-2xl bg-[#0a0618]/70 px-5 py-4 shadow-[0_0_40px_rgba(139,92,246,0.25)]">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-violet-300/70">
                  {"// mindset"}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  Build <span className="text-violet-300">·</span> Learn{" "}
                  <span className="text-violet-300">·</span> Improve{" "}
                  <span className="text-violet-300">·</span> Repeat
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scroll cue */}
      <motion.a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollBy({ top: window.innerHeight * 0.6, behavior: "smooth" });
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/50 transition-colors hover:text-white md:flex"
        aria-label="Scroll to explore"
      >
        <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
          <span className="animate-scroll-dot h-2 w-1 rounded-full bg-violet-300" />
        </span>
        <span className="text-xs tracking-wide">Scroll to explore</span>
        <span className="h-8 w-px bg-gradient-to-b from-violet-400/70 to-transparent" />
      </motion.a>

      {/* Bottom-left live badge (mobile shows here to avoid overlap) */}
      <div className="absolute bottom-6 left-5 z-10 flex items-center gap-2 text-xs text-white/40 md:hidden">
        <Mouse className="h-4 w-4" /> Scroll to explore
      </div>
    </main>
  );
}
