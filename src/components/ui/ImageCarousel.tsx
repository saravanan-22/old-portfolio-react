import { AnimatePresence, motion, useInView, type PanInfo } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface ImageCarouselProps {
  images: string[];
  label: string;
  interval?: number;
}

const slide = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0.4 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0.4 }),
};

/**
 * Accessible, swipeable screenshot carousel. Autoplay pauses while hovered,
 * focused (WCAG 2.2.2), or scrolled out of view.
 */
export function ImageCarousel({ images, label, interval = 4000 }: ImageCarouselProps) {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-20%" });

  const go = useCallback(
    (dir: number) =>
      setState(([i]) => [(i + dir + images.length) % images.length, dir] as [number, number]),
    [images.length],
  );

  useEffect(() => {
    if (paused || !inView || images.length < 2) return;
    const id = window.setInterval(() => go(1), interval);
    return () => window.clearInterval(id);
  }, [paused, inView, go, interval, images.length]);

  const onDragEnd = (_: unknown, { offset, velocity }: PanInfo) => {
    const swipe = offset.x * velocity.x;
    if (swipe < -4000 || offset.x < -80) go(1);
    else if (swipe > 4000 || offset.x > 80) go(-1);
  };

  return (
    // Hover/focus handlers only pause autoplay (WCAG 2.2.2); controls are real buttons.
    // oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <section
      ref={ref}
      aria-roledescription="carousel"
      aria-label={`${label} screenshots`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="group relative aspect-[2.16/1] w-full overflow-hidden rounded-xl border border-line bg-surface"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={index}
          src={images[index]}
          alt={`${label} screenshot ${index + 1} of ${images.length}`}
          custom={direction}
          variants={slide}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 260, damping: 32 },
            opacity: { duration: 0.3 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          onDragEnd={onDragEnd}
          draggable={false}
          className="absolute inset-0 h-full w-full cursor-grab object-cover object-top select-none active:cursor-grabbing"
        />
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

      {images.length > 1 && (
        <>
          {(["prev", "next"] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              aria-label={dir === "prev" ? "Previous screenshot" : "Next screenshot"}
              onClick={() => go(dir === "prev" ? -1 : 1)}
              className={`absolute top-1/2 ${dir === "prev" ? "left-3" : "right-3"} grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-ink/60 text-fg opacity-0 backdrop-blur transition group-hover:opacity-100 group-focus-within:opacity-100 hover:text-accent focus-visible:opacity-100`}
            >
              {dir === "prev" ? <FaChevronLeft /> : <FaChevronRight />}
            </button>
          ))}

          <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to screenshot ${i + 1}`}
                aria-current={i === index}
                onClick={() => setState([i, i > index ? 1 : -1])}
                className="relative h-1.5 w-4 overflow-hidden rounded-full bg-white/25 transition-all hover:bg-white/50 aria-[current=true]:w-8"
              >
                {i === index && (
                  <motion.span
                    layoutId={`${label}-dot`}
                    className="absolute inset-0 rounded-full bg-accent"
                  />
                )}
              </button>
            ))}
          </div>
          <span className="absolute top-3 right-3 rounded-md bg-ink/70 px-2 py-0.5 font-mono text-xs text-muted backdrop-blur">
            {index + 1} / {images.length}
          </span>
        </>
      )}
    </section>
  );
}
