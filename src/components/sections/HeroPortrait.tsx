import { motion, useMotionTemplate, useTransform, type MotionValue } from "motion/react";
import type { IconType } from "react-icons";
import { SiExpress, SiMongodb, SiNodedotjs, SiReact } from "react-icons/si";
import profile from "../../assets/images/profile.webp";
import { HEXAGON_PATH } from "../ui/Logo";

interface HeroPortraitProps {
  /** Smoothed cursor position across the hero, from -1 (left/top) to 1 (right/bottom). */
  nx: MotionValue<number>;
  ny: MotionValue<number>;
  ready: boolean;
}

interface Badge {
  icon: IconType;
  label: string;
  color: string;
  className: string;
  depth: number;
  delay: number;
}

const badges: Badge[] = [
  {
    icon: SiReact,
    label: "React",
    color: "#61dafb",
    className: "top-[16%] -left-[6%]",
    depth: 38,
    delay: 0,
  },
  {
    icon: SiNodedotjs,
    label: "Node.js",
    color: "#5fa04e",
    className: "top-[30%] -right-[8%]",
    depth: 52,
    delay: 1.2,
  },
  {
    icon: SiMongodb,
    label: "MongoDB",
    color: "#47a248",
    className: "bottom-[24%] -left-[10%]",
    depth: 46,
    delay: 0.6,
  },
  {
    icon: SiExpress,
    label: "Express",
    color: "#f5efe6",
    className: "top-[4%] right-[2%]",
    depth: 30,
    delay: 1.8,
  },
];

/** Moves a layer with the cursor; negative depth moves it the opposite way (further back). */
function useDepth(v: MotionValue<number>, depth: number) {
  return useTransform(v, (n) => n * depth);
}

/**
 * Layered 3D portrait: the whole card tilts toward the cursor while each layer
 * (glow, hexagon, frame, photo, badges) shifts by a different amount for parallax.
 * The cut-out photo rises above the arch frame for a pop-out effect.
 */
export function HeroPortrait({ nx, ny, ready }: HeroPortraitProps) {
  const rotateY = useTransform(nx, [-1, 1], [-16, 16]);
  const rotateX = useTransform(ny, [-1, 1], [14, -14]);

  const glowX = useDepth(nx, -36);
  const glowY = useDepth(ny, -36);
  const hexX = useDepth(nx, -20);
  const hexY = useDepth(ny, -20);
  const photoX = useDepth(nx, 14);
  const photoY = useDepth(ny, 10);

  // Light sheen that tracks the cursor across the frame.
  const glareX = useTransform(nx, [-1, 1], ["15%", "85%"]);
  const glareY = useTransform(ny, [-1, 1], ["10%", "70%"]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,240,215,0.32), transparent 55%)`;
  // Drop shadow falls away from the light.
  const shadowX = useDepth(nx, -24);
  const shadowY = useDepth(ny, -18);
  const shadow = useMotionTemplate`drop-shadow(${shadowX}px ${shadowY}px 28px rgba(0,0,0,0.55))`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 40 }}
      animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[15rem] [perspective:1100px] sm:max-w-xs lg:max-w-sm"
    >
      {/* Idle float, so the portrait feels alive on touch screens too */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="relative aspect-[4/5]"
        >
          {/* Back: colour glow */}
          <motion.div
            style={{ x: glowX, y: glowY, z: -80 }}
            className="absolute inset-[6%]"
            aria-hidden="true"
          >
            <div className="animate-spin-slow size-full rounded-full bg-[conic-gradient(from_0deg,var(--color-accent),var(--color-accent-3),var(--color-accent-2),var(--color-accent))] opacity-45 blur-3xl" />
          </motion.div>

          {/* Back: rotating hexagon outlines (echo of the logo) */}
          <motion.div
            style={{ x: hexX, y: hexY, z: -40 }}
            className="absolute -inset-[8%]"
            aria-hidden="true"
          >
            <svg viewBox="0 0 100 100" className="animate-spin-slow size-full text-accent/35">
              <path d={HEXAGON_PATH} fill="none" stroke="currentColor" strokeWidth="0.5" />
              <path
                d={HEXAGON_PATH}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.4"
                strokeDasharray="2 3"
                transform="translate(50 50) scale(0.86) translate(-50 -50)"
              />
            </svg>
          </motion.div>

          {/* Middle: arch frame */}
          <motion.div
            style={{ z: 0 }}
            className="absolute inset-x-[6%] top-[36%] bottom-0 overflow-hidden rounded-t-full rounded-b-[2rem] border border-accent/40 bg-gradient-to-b from-accent-2/40 via-surface-2 to-surface shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]"
            aria-hidden="true"
          >
            <div className="absolute inset-3 rounded-t-full rounded-b-[1.6rem] border border-accent/15" />
            <div className="bg-grid absolute inset-0 opacity-30" />
          </motion.div>

          {/* Front: the cut-out photo, clipped only at the bottom so the head pops out */}
          <div
            className="absolute inset-x-[6%] -top-[10%] bottom-0 overflow-hidden rounded-b-[2rem]"
            style={{ transform: "translateZ(40px)" }}
          >
            <motion.img
              src={profile}
              alt="Portrait of Saravanan"
              draggable={false}
              style={{ x: photoX, y: photoY, filter: shadow }}
              className="absolute bottom-0 left-[2%] w-[96%] select-none"
            />
            {/* Glare over the photo and frame */}
            <motion.div
              aria-hidden="true"
              style={{ background: glare }}
              className="pointer-events-none absolute inset-0 top-[20%] mix-blend-soft-light"
            />
          </div>

          {/* Front-most: floating tech badges */}
          {badges.map((b) => (
            <FloatingBadge key={b.label} badge={b} nx={nx} ny={ny} />
          ))}

          {/* Status plate */}
          <motion.div
            style={{ z: 90 }}
            className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-accent/40 bg-ink/85 px-4 py-2 font-mono text-xs whitespace-nowrap text-fg shadow-lg shadow-black/40 backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Open to opportunities
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function FloatingBadge({
  badge: b,
  nx,
  ny,
}: {
  badge: Badge;
  nx: MotionValue<number>;
  ny: MotionValue<number>;
}) {
  const x = useDepth(nx, b.depth);
  const y = useDepth(ny, b.depth);
  const Icon = b.icon;
  return (
    <motion.div style={{ x, y, z: 70 }} className={`absolute ${b.className}`} aria-hidden="true">
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 4 + b.delay, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
        title={b.label}
        className="grid size-11 place-items-center rounded-xl border border-white/10 bg-surface/80 text-xl shadow-lg shadow-black/40 backdrop-blur sm:size-12 sm:text-2xl"
        style={{ color: b.color }}
      >
        <Icon />
      </motion.div>
    </motion.div>
  );
}
