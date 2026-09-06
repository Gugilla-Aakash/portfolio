"use client";

import { motion, useInView } from "framer-motion";
import { CalendarDays, GraduationCap, Infinity as InfinityIcon, Layers } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { icon: CalendarDays, value: 5, suffix: "+", label: "Projects Completed" },
  { icon: GraduationCap, value: 2, suffix: "+", label: "Years of Learning" },
  { icon: Layers, value: 5, suffix: "+", label: "Technologies" },
  { icon: InfinityIcon, value: null, suffix: "∞", label: "Curiosity Always" },
];

function CountUp({ target, start }: { target: number; start: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target]);
  return <>{n}</>;
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className="glass mt-10 grid max-w-3xl grid-cols-2 gap-y-6 rounded-3xl px-6 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.4)] sm:px-8 lg:grid-cols-4"
    >
      {STATS.map((s, i) => (
        <div
          key={s.label}
          className={`group flex cursor-default items-center gap-3.5 ${
            i !== 0 ? "lg:border-l lg:border-white/10 lg:pl-7" : ""
          }`}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300 transition-all duration-300 group-hover:bg-violet-500/25 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]">
            <s.icon className="h-5 w-5" />
          </span>
          <span>
            <span className="font-display block text-xl font-bold text-white">
              {s.value === null ? (
                <span className="text-gradient-tomorrow text-2xl">{s.suffix}</span>
              ) : (
                <>
                  <CountUp target={s.value} start={inView} />
                  {s.suffix}
                </>
              )}
            </span>
            <span className="block text-xs text-white/50">{s.label}</span>
          </span>
        </div>
      ))}
    </motion.div>
  );
}
