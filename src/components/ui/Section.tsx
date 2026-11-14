import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionProps {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, index, title, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`mx-auto max-w-6xl px-6 py-24 sm:py-32 ${className}`}
    >
      <Reveal className="mb-12 flex items-center gap-4">
        <h2
          id={`${id}-title`}
          className="font-display text-3xl font-bold whitespace-nowrap text-fg sm:text-4xl"
        >
          <span className="mr-3 font-mono text-xl font-normal text-accent sm:text-2xl">
            {index}.
          </span>
          {title}
        </h2>
        <span className="h-px w-full max-w-xs bg-gradient-to-r from-line to-transparent" />
      </Reveal>
      {children}
    </section>
  );
}
