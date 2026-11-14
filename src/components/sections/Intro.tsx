import { motion } from "motion/react";
import { useEffect } from "react";
import { Logo } from "../ui/Logo";

interface IntroProps {
  onDone: () => void;
}

const DURATION_MS = 2200;

/**
 * Splash screen: draws the hexagon logo, then hands off to the page.
 * Click or press any key to skip.
 */
export function Intro({ onDone }: IntroProps) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, DURATION_MS);
    const skip = () => onDone();
    window.addEventListener("keydown", skip, { once: true });
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", skip);
      document.body.style.overflow = "";
    };
  }, [onDone]);

  return (
    <motion.div
      role="presentation"
      onClick={onDone}
      className="fixed inset-0 z-[100] grid cursor-pointer place-items-center bg-ink"
      exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.15 } }}
    >
      <motion.div
        className="text-accent drop-shadow-[0_0_24px_rgba(244,194,107,0.45)]"
        exit={{
          scale: 0.25,
          opacity: 0,
          rotate: 90,
          transition: { duration: 0.5, ease: "easeIn" },
        }}
      >
        <Logo animate className="size-28 sm:size-36" />
      </motion.div>
      <motion.p
        className="absolute bottom-10 font-mono text-xs tracking-widest text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        click or press any key to skip
      </motion.p>
    </motion.div>
  );
}
