import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import type { PointerEvent } from "react";
import { FaArrowDown, FaFileArrowDown } from "react-icons/fa6";
import resume from "../../assets/resume.pdf";
import { showcaseShots } from "../../data/projects";
import { site } from "../../data/site";
import { LinkButton } from "../ui/LinkButton";
import { HeroPortrait } from "./HeroPortrait";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};
const letter: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

interface HeroProps {
  /** Start the entrance animation (after the intro screen finishes). */
  ready: boolean;
}

export function Hero({ ready }: HeroProps) {
  const reducedMotion = useReducedMotion();

  // Cursor-following spotlight (pixels) and a normalised, spring-smoothed position
  // (-1…1) that drives the 3D portrait.
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${mx}px ${my}px, rgba(244,194,107,0.10), transparent 70%)`;
  const spring = { stiffness: 120, damping: 20, mass: 0.6 };
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const nx = useSpring(rawX, spring);
  const ny = useSpring(rawY, spring);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
    if (reducedMotion) return;
    rawX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    rawY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };
  const onPointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  // Gentle parallax as the hero scrolls away.
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 600], [0, 120]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section
      id="top"
      aria-label="Introduction"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative isolate flex min-h-svh flex-col overflow-hidden"
    >
      {/* Background layers */}
      <div className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <div className="animate-float absolute -top-40 -left-40 -z-10 size-[36rem] rounded-full bg-accent-3/10 blur-3xl" />
      <div className="animate-float absolute -right-40 bottom-0 -z-10 size-[34rem] rounded-full bg-accent-2/20 blur-3xl [animation-delay:-7s]" />
      <div className="animate-float absolute top-1/3 left-1/3 -z-10 size-[22rem] rounded-full bg-accent/[0.07] blur-3xl [animation-delay:-3s]" />
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{ background: spotlight }}
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        variants={container}
        initial="hidden"
        animate={ready ? "show" : "hidden"}
        className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-14 px-6 pt-28 pb-12 lg:grid-cols-[1.25fr_0.75fr]"
      >
        <div>
          <motion.p variants={item} className="mb-5 font-mono text-accent sm:text-lg">
            {site.kicker}
          </motion.p>

          <h1 className="font-display text-6xl leading-none font-bold tracking-tight text-fg sm:text-8xl">
            <span className="sr-only">{site.name}</span>
            <motion.span
              aria-hidden="true"
              variants={container}
              className="inline-flex overflow-hidden pb-2"
            >
              {[...`${site.name}.`].map((ch, i) => (
                <motion.span
                  key={i}
                  variants={letter}
                  className={`inline-block ${ch === "." ? "text-accent" : ""}`}
                >
                  {ch}
                </motion.span>
              ))}
            </motion.span>
          </h1>

          <motion.p
            variants={item}
            className="text-gradient animate-shine mt-4 max-w-3xl font-display text-3xl leading-tight font-semibold sm:text-5xl lg:text-[2.75rem]"
          >
            {site.tagline}
          </motion.p>

          <motion.p variants={item} className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            {site.intro}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
            <LinkButton href="#projects" variant="primary" icon={<FaArrowDown />}>
              View my work
            </LinkButton>
            <LinkButton href={resume} download="Saravanan_Resume.pdf" icon={<FaFileArrowDown />}>
              Download resume
            </LinkButton>
          </motion.div>
        </div>

        <div className="order-first lg:order-none">
          <HeroPortrait nx={nx} ny={ny} ready={ready} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.1, duration: 1 }}
      >
        <ShowcaseMarquee />
      </motion.div>
    </section>
  );
}

/** Endless strip of project screenshots; pauses on hover. */
function ShowcaseMarquee() {
  const shots = [...showcaseShots, ...showcaseShots];
  return (
    <a
      href="#projects"
      aria-label="Jump to projects"
      className="group relative block overflow-hidden py-8 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]"
    >
      <div className="animate-marquee flex w-max gap-5 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {shots.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-28 w-auto rounded-lg border border-line object-cover opacity-60 shadow-lg shadow-black/40 transition duration-500 hover:scale-105 hover:opacity-100 sm:h-36"
          />
        ))}
      </div>
    </a>
  );
}
