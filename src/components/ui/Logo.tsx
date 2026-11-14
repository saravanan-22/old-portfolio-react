import { motion } from "motion/react";

export const HEXAGON_PATH = "M50 4 L90 27 L90 73 L50 96 L10 73 L10 27 Z";

interface LogoProps {
  className?: string;
  /** Draw the outline and fade in the letter (used by the intro screen). */
  animate?: boolean;
}

export function Logo({ className, animate = false }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <motion.path
        d={HEXAGON_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth={animate ? 3 : 5}
        strokeLinejoin="round"
        initial={animate ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
      <motion.text
        x="50"
        y="51"
        textAnchor="middle"
        dominantBaseline="central"
        fill="currentColor"
        className="font-display"
        fontSize="46"
        fontWeight="700"
        initial={animate ? { opacity: 0, scale: 0.6 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: animate ? 1 : 0, duration: 0.5, ease: "backOut" }}
        style={{ transformOrigin: "50px 50px" }}
      >
        S
      </motion.text>
    </svg>
  );
}
