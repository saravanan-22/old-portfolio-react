import { motion } from "motion/react";
import { FaArrowUpRightFromSquare, FaCode, FaGithub } from "react-icons/fa6";
import { featuredProjects, miniProjects, type FeaturedProject } from "../../data/projects";
import { tech } from "../../data/tech";
import { ImageCarousel } from "../ui/ImageCarousel";
import { LinkButton } from "../ui/LinkButton";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";

export function Projects() {
  return (
    <Section id="projects" index="04" title="Some of My Works">
      <div className="space-y-28">
        {featuredProjects.map((p, i) => (
          <FeaturedCard key={p.slug} project={p} index={i} />
        ))}
      </div>

      <Reveal className="mt-32 mb-10 text-center">
        <h3 className="font-display text-3xl font-semibold text-fg">JavaScript Mini Projects</h3>
        <p className="mt-2 font-mono text-sm text-muted">
          Small, focused builds from my learning journey
        </p>
      </Reveal>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {miniProjects.map((p, i) => (
          <motion.li
            key={p.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface transition duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_18px_40px_-20px_rgba(244,194,107,0.35)]"
          >
            <div className="relative overflow-hidden">
              <img
                src={p.image}
                alt={`${p.title} screenshot`}
                loading="lazy"
                className="aspect-[16/10] w-full bg-white object-cover object-top transition duration-700 group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent opacity-60 transition duration-500 group-hover:opacity-0" />
            </div>
            <div className="flex flex-1 flex-col gap-4 p-5">
              <h4 className="font-display text-lg font-semibold text-fg transition-colors group-hover:text-accent">
                {p.title}
              </h4>
              <div className="mt-auto flex gap-2">
                {p.demo && (
                  <LinkButton
                    href={p.demo}
                    external
                    size="sm"
                    variant="primary"
                    icon={<FaArrowUpRightFromSquare />}
                  >
                    Demo
                  </LinkButton>
                )}
                <LinkButton href={p.code} external size="sm" icon={<FaCode />}>
                  Code
                </LinkButton>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </Section>
  );
}

function FeaturedCard({ project: p, index }: { project: FeaturedProject; index: number }) {
  const flip = index % 2 === 1;
  return (
    <article className="grid items-center gap-10 lg:grid-cols-12">
      <Reveal
        from={flip ? "right" : "left"}
        className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
      >
        <div className="relative">
          <div className="absolute -inset-3 -z-10 rounded-2xl bg-gradient-to-br from-accent/20 via-transparent to-accent-2/20 blur-2xl" />
          <ImageCarousel images={p.images} label={p.title} />
        </div>
      </Reveal>

      <Reveal delay={0.15} className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <p className="font-mono text-sm text-accent">
          {String(index + 1).padStart(2, "0")} · {p.category}
        </p>
        <h3 className="mt-2 font-display text-3xl font-bold text-fg">{p.title}</h3>
        <p className="mt-5 rounded-xl border border-line bg-surface/70 p-5 leading-relaxed text-muted backdrop-blur">
          {p.description}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technology stack">
          {p.stack.map((key) => {
            const { name, icon: Icon } = tech[key];
            return (
              <li
                key={key}
                className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1 font-mono text-xs text-fg/80"
              >
                <Icon className="text-accent" aria-hidden="true" />
                {name}
              </li>
            );
          })}
        </ul>
        <div className="mt-7 flex gap-3">
          {p.demo && (
            <LinkButton
              href={p.demo}
              external
              variant="primary"
              icon={<FaArrowUpRightFromSquare />}
            >
              Live demo
            </LinkButton>
          )}
          <LinkButton href={p.code} external icon={<FaGithub />}>
            Source
          </LinkButton>
        </div>
      </Reveal>
    </article>
  );
}
