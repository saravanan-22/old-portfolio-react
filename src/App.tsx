import { AnimatePresence, MotionConfig, useReducedMotion } from "motion/react";
import { useCallback, useState } from "react";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { ScrollProgress } from "./components/layout/ScrollProgress";
import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";
import { Education } from "./components/sections/Education";
import { Hero } from "./components/sections/Hero";
import { Intro } from "./components/sections/Intro";
import { Projects } from "./components/sections/Projects";
import { Skills } from "./components/sections/Skills";

const INTRO_KEY = "intro-seen";

/** Show the splash once per browser session, and never for reduced-motion users. */
function shouldShowIntro(reducedMotion: boolean | null): boolean {
  if (reducedMotion) return false;
  try {
    return sessionStorage.getItem(INTRO_KEY) !== "1";
  } catch {
    return true;
  }
}

export default function App() {
  const reducedMotion = useReducedMotion();
  const [showIntro, setShowIntro] = useState(() => shouldShowIntro(reducedMotion));

  const finishIntro = useCallback(() => {
    setShowIntro(false);
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* storage unavailable (private mode): the intro simply shows again next time */
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{showIntro && <Intro key="intro" onDone={finishIntro} />}</AnimatePresence>
      <a
        href="#main"
        className="sr-only z-[70] rounded-md bg-accent px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero ready={!showIntro} />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
