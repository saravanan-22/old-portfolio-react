import { motion } from "motion/react";
import { BsFillRocketFill } from "react-icons/bs";
import { site, socials } from "../../data/site";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-line/60 bg-surface/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:justify-between">
        <ul className="flex gap-5">
          {socials.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="block text-2xl text-muted transition hover:-translate-y-1 hover:text-accent"
              >
                <Icon />
              </a>
            </li>
          ))}
        </ul>

        <p className="text-center font-mono text-xs text-muted">
          © {year} Portfolio of {site.name}. Designed &amp; built with React.
        </p>

        <motion.a
          href="#top"
          aria-label="Back to top"
          className="group flex items-center gap-2 font-mono text-sm text-muted hover:text-accent"
          whileHover="lift"
        >
          <motion.span
            variants={{ lift: { y: -6 } }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-block"
          >
            <BsFillRocketFill className="-rotate-45" />
          </motion.span>
          Back to top
        </motion.a>
      </div>
    </footer>
  );
}
