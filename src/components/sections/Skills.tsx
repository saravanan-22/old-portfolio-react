import { motion, type Variants } from "motion/react";
import { useCallback, useState, type CSSProperties } from "react";
import { FaAward, FaMagnifyingGlassPlus } from "react-icons/fa6";
import { certifications } from "../../data/education";
import { skills, tech } from "../../data/tech";
import { Lightbox } from "../ui/Lightbox";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";

const grid: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const tile: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 20 } },
};

export function Skills() {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const cert = open === null ? null : certifications[open];

  return (
    <Section id="skills" index="03" title="Skills & Certifications">
      <motion.ul
        variants={grid}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-7"
      >
        {skills.map((key) => {
          const { name, icon: Icon, color } = tech[key];
          return (
            <motion.li
              key={key}
              variants={tile}
              whileHover={{ y: -6 }}
              style={{ "--brand": color } as CSSProperties}
              className="group flex flex-col items-center gap-3 rounded-xl border border-line bg-surface/60 px-3 py-5 transition-colors duration-300 hover:border-[var(--brand)]/50 hover:bg-surface-2"
            >
              <Icon className="text-4xl text-muted transition-all duration-300 group-hover:scale-110 group-hover:text-[var(--brand)] group-hover:drop-shadow-[0_0_14px_var(--brand)]" />
              <span className="text-center font-mono text-xs text-fg/80">{name}</span>
            </motion.li>
          );
        })}
      </motion.ul>

      <Reveal className="mt-20 mb-8 flex items-center gap-3">
        <FaAward className="text-2xl text-accent" />
        <h3 className="font-display text-2xl font-semibold text-fg">Certifications</h3>
      </Reveal>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => (
          <motion.li
            key={c.title}
            className="h-full"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-line bg-surface/60 text-left transition duration-300 hover:-translate-y-1 hover:border-accent/40"
            >
              <div className="relative overflow-hidden">
                <motion.img
                  layoutId={`cert-${i}`}
                  src={c.image}
                  alt={`${c.title} certificate`}
                  loading="lazy"
                  className="aspect-[4/3] w-full bg-white object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 grid place-items-center bg-ink/60 text-3xl text-accent opacity-0 transition group-hover:opacity-100">
                  <FaMagnifyingGlassPlus />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h4 className="font-display font-semibold text-fg">{c.title}</h4>
                <p className="mt-auto pt-2 font-mono text-xs text-muted">
                  {c.issuer} · {c.date}
                </p>
              </div>
            </button>
          </motion.li>
        ))}
      </ul>

      <Lightbox
        image={
          cert && open !== null
            ? { src: cert.image, alt: `${cert.title} certificate`, layoutId: `cert-${open}` }
            : null
        }
        onClose={close}
      />
    </Section>
  );
}
