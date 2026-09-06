"use client";

import { useMotionValue } from "framer-motion";
import Background from "../components/Background";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Projects from "../components/Projects";

export default function Home() {
  // -0.5 .. 0.5 normalized cursor for parallax + spotlight (fixed video bg)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const onMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX / window.innerWidth - 0.5);
    mouseY.set(e.clientY / window.innerHeight - 0.5);
  };

  return (
    <div onMouseMove={onMouseMove} className="relative flex min-h-screen flex-col bg-[#05010f]">
      <Background mouseX={mouseX} mouseY={mouseY} />
      <Navbar />
      <main className="relative flex flex-1 flex-col">
        <div className="flex min-h-screen flex-col">
          <Hero />
        </div>
        <Projects />
      </main>
    </div>
  );
}
