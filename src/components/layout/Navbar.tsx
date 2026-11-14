import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState, type MouseEvent } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import resume from "../../assets/resume.pdf";
import { navItems } from "../../data/site";
import { useActiveSection } from "../../hooks/useActiveSection";
import { Logo } from "../ui/Logo";

const ids = navItems.map((n) => n.id);

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(ids);

  // Close the mobile menu first, then scroll on the next frame so the menu's exit
  // animation can't interrupt the browser's smooth scroll to the section.
  const goTo = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView();
      history.pushState(null, "", `#${id}`);
    });
  };

  // Hide when scrolling down, reveal when scrolling up (replaces react-headroom).
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160 && !open);
    setScrolled(y > 24);
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.header
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled || open ? "bg-ink/75 shadow-lg shadow-black/30 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        <a href="#top" aria-label="Back to top" className="group text-accent">
          <Logo className="size-10 transition-transform duration-500 group-hover:rotate-[360deg]" />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className="relative block rounded-md px-4 py-2 font-mono text-sm text-fg/80 transition-colors hover:text-accent aria-[current=true]:text-accent"
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-md bg-accent/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="mr-1 text-accent">0{i + 1}.</span>
                {item.label}
              </a>
            </li>
          ))}
          <li className="ml-3">
            <a
              href={resume}
              download="Saravanan_Resume.pdf"
              className="rounded-md border border-accent/60 px-4 py-2 font-mono text-sm text-accent transition hover:bg-accent/10"
            >
              Resume
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="grid size-10 place-items-center text-2xl text-accent md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {open ? <FaXmark /> : <FaBars />}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line px-6 md:hidden"
          >
            {navItems.map((item, i) => (
              <motion.li
                key={item.id}
                initial={{ x: -16, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.05 * i }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => goTo(e, item.id)}
                  className="block py-3 font-mono text-fg/90 hover:text-accent"
                >
                  <span className="mr-2 text-accent">0{i + 1}.</span>
                  {item.label}
                </a>
              </motion.li>
            ))}
            <li className="pt-2 pb-5">
              <a
                href={resume}
                download="Saravanan_Resume.pdf"
                className="inline-block rounded-md border border-accent/60 px-4 py-2 font-mono text-sm text-accent"
              >
                Resume
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
