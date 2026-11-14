import { sendForm } from "@emailjs/browser";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState, type FormEvent } from "react";
import { FaCircleCheck, FaCircleExclamation, FaPaperPlane } from "react-icons/fa6";
import { emailJs, socials } from "../../data/site";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "peer w-full rounded-lg border border-line bg-ink/60 px-4 pt-6 pb-2 text-fg placeholder-transparent transition outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(244,194,107,0.15)]";
const labelClass =
  "pointer-events-none absolute top-2 left-4 font-mono text-xs text-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent";

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current || status === "sending") return;
    setStatus("sending");
    try {
      await sendForm(emailJs.serviceId, emailJs.templateId, formRef.current, {
        publicKey: emailJs.publicKey,
      });
      formRef.current.reset();
      setStatus("sent");
    } catch (err) {
      console.error("EmailJS send failed", err);
      setStatus("error");
    }
  }

  return (
    <Section id="contact" index="05" title="Get In Touch">
      <div className="grid gap-12 md:grid-cols-2">
        <Reveal from="left" className="space-y-6">
          <p className="font-display text-3xl leading-snug font-semibold text-fg sm:text-4xl">
            Have a project, a role, or just want to say{" "}
            <span className="text-gradient animate-shine">hello?</span>
          </p>
          <p className="max-w-md text-lg text-muted">
            My inbox is always open. Send a message and I'll get back to you as soon as I can.
          </p>
          <ul className="flex gap-4 pt-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-line px-4 py-2 font-mono text-sm text-fg/80 transition hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                >
                  <Icon className="text-lg" aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal from="right" delay={0.1}>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative space-y-5 rounded-2xl border border-line bg-surface/70 p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-8"
          >
            <div className="relative">
              <input
                id="from_name"
                name="from_name"
                required
                placeholder="Name"
                autoComplete="name"
                className={fieldClass}
              />
              <label htmlFor="from_name" className={labelClass}>
                Name
              </label>
            </div>
            <div className="relative">
              <input
                id="from_email"
                name="from_email"
                type="email"
                required
                placeholder="Email"
                autoComplete="email"
                className={fieldClass}
              />
              <label htmlFor="from_email" className={labelClass}>
                Email
              </label>
            </div>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Message"
                className={`${fieldClass} resize-none`}
              />
              <label htmlFor="message" className={labelClass}>
                Message
              </label>
            </div>

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileTap={{ scale: 0.97 }}
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-mono font-medium text-ink transition hover:shadow-[0_0_32px_-4px_var(--color-accent)] disabled:cursor-wait disabled:opacity-70"
            >
              {status === "sending" ? "Sending…" : "Send message"}
              <FaPaperPlane
                aria-hidden="true"
                className={`transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ${status === "sending" ? "animate-pulse" : ""}`}
              />
            </motion.button>

            <div aria-live="polite" className="min-h-6">
              <AnimatePresence mode="wait">
                {(status === "sent" || status === "error") && (
                  <motion.p
                    key={status}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className={`flex items-center gap-2 text-sm ${status === "sent" ? "text-accent" : "text-red-400"}`}
                  >
                    {status === "sent" ? <FaCircleCheck /> : <FaCircleExclamation />}
                    {status === "sent"
                      ? "Thanks! Your message has been sent."
                      : "Something went wrong. Please try again, or reach me on LinkedIn."}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
