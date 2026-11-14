import { motion, type Variants } from "motion/react";
import type { IconType } from "react-icons";
import { FaFileArrowDown, FaGraduationCap, FaLaptopCode, FaRocket, FaShirt } from "react-icons/fa6";
import resume from "../../assets/resume.pdf";
import { LinkButton } from "../ui/LinkButton";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";

interface Fact {
  icon: IconType;
  title: string;
  detail: string;
}

/** My path so far, oldest first. */
const facts: Fact[] = [
  {
    icon: FaGraduationCap,
    title: "BBA Graduate",
    detail: "Nandha Arts and Science College · 2020",
  },
  { icon: FaShirt, title: "Garments Sector", detail: "A few years of industry work experience" },
  { icon: FaLaptopCode, title: "MERN Stack Developer", detail: "Skill Safari, Coimbatore · 2023" },
  {
    icon: FaRocket,
    title: "Open to Opportunities",
    detail: "Ready for my first web development role",
  },
];

const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const row: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function About() {
  return (
    <Section id="about" index="01" title="Who I Am">
      <div className="grid items-center gap-14 md:grid-cols-[3fr_2fr]">
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
          <p>
            👋 Hello, my name is <span className="text-accent">Saravanan</span>. 🎓 I completed my
            BBA degree in 2020 and then gained a few years of work experience in the garments
            sector. I decided to pivot my career and pursue my newfound interest in web development.
          </p>
          <p>
            🌐 I enrolled in a web development course at Skill Safari, where I honed my skills
            across the stack with a focus on <span className="text-fg">React</span>. 🛠️ During the
            course I built numerous projects that let me apply and solidify what I learned.
          </p>
          <p>
            🚀 Now I'm actively seeking opportunities to grow my career and expand my expertise in
            web development.
          </p>
          <div className="pt-4">
            <LinkButton href={resume} download="Saravanan_Resume.pdf" icon={<FaFileArrowDown />}>
              Resume
            </LinkButton>
          </div>
        </Reveal>

        <Reveal from="right" delay={0.15}>
          <div className="rounded-2xl bg-gradient-to-br from-accent/50 via-accent-3/20 to-accent-2/50 p-px">
            <div className="rounded-2xl bg-surface/95 p-6 backdrop-blur sm:p-7">
              <h3 className="mb-5 font-mono text-sm tracking-widest text-accent uppercase">
                My journey
              </h3>
              <motion.ol
                variants={list}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="relative space-y-5 before:absolute before:top-2 before:bottom-2 before:left-5 before:w-px before:bg-gradient-to-b before:from-accent before:via-accent-3 before:to-accent-2"
              >
                {facts.map(({ icon: Icon, title, detail }) => (
                  <motion.li
                    key={title}
                    variants={row}
                    className="group relative flex items-center gap-4"
                  >
                    <span className="relative grid size-10 shrink-0 place-items-center rounded-xl border border-accent/30 bg-ink text-accent transition duration-300 group-hover:scale-110 group-hover:border-accent group-hover:shadow-[0_0_20px_-4px_var(--color-accent)]">
                      <Icon aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-display font-semibold text-fg">{title}</p>
                      <p className="text-sm text-muted">{detail}</p>
                    </div>
                  </motion.li>
                ))}
              </motion.ol>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
