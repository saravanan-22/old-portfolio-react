import { motion, type HTMLMotionProps } from "motion/react";

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
  /** Direction the element travels in from. */
  from?: "up" | "left" | "right";
}

const offsets = { up: { y: 32 }, left: { x: -40 }, right: { x: 40 } } as const;

/** Fades and slides its children in the first time they scroll into view. */
export function Reveal({ delay = 0, from = "up", children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, ...offsets[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
