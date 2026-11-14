import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { FaGraduationCap } from "react-icons/fa6";
import { education } from "../../data/education";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";

export function Education() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <Section id="education" index="02" title="Education">
      <ol ref={listRef} className="relative ml-3 space-y-12 sm:ml-0">
        {/* Track + progress line that fills as you scroll */}
        <span
          className="absolute top-2 bottom-2 left-0 w-px bg-line sm:left-1/2"
          aria-hidden="true"
        />
        <motion.span
          aria-hidden="true"
          style={{ scaleY }}
          className="absolute top-2 bottom-2 left-0 w-px origin-top bg-gradient-to-b from-accent to-accent-2 sm:left-1/2"
        />

        {education.map((e, i) => {
          const right = i % 2 === 1;
          return (
            <li key={e.year} className="relative pl-10 sm:grid sm:grid-cols-2 sm:gap-16 sm:pl-0">
              <span
                aria-hidden="true"
                className="absolute top-1 left-0 grid size-8 -translate-x-1/2 place-items-center rounded-full border border-accent/50 bg-ink text-sm text-accent shadow-[0_0_18px_-2px_var(--color-accent)] sm:left-1/2"
              >
                <FaGraduationCap />
              </span>
              <Reveal
                from={right ? "right" : "left"}
                className={right ? "sm:col-start-2" : "sm:text-right"}
              >
                <div className="rounded-xl border border-line bg-surface/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_10px_40px_-15px_rgba(244,194,107,0.3)]">
                  <time className="font-mono text-sm text-accent">{e.year}</time>
                  <h3 className="mt-1 font-display text-xl font-semibold text-fg">{e.level}</h3>
                  <p className="mt-2 text-muted">{e.institution}</p>
                  <p className="mt-3 inline-block rounded-md bg-accent/10 px-2.5 py-1 font-mono text-sm text-accent">
                    {e.result}
                  </p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
