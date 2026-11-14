import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { FaXmark } from "react-icons/fa6";

interface LightboxProps {
  image: { src: string; alt: string; layoutId: string } | null;
  onClose: () => void;
}

/** Full-screen image viewer that morphs out of the clicked thumbnail. */
export function Lightbox({ image, onClose }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!image) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [image, onClose]);

  return (
    <AnimatePresence>
      {image && (
        // A native <dialog> closes instantly from the top layer, which would cut off the
        // exit animation, so this uses an ARIA dialog with manual focus/Escape handling.
        <motion.div
          // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          className="fixed inset-0 z-[60] grid place-items-center bg-ink/85 p-4 backdrop-blur-md sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.img
            layoutId={image.layoutId}
            src={image.src}
            alt={image.alt}
            className="max-h-full max-w-full rounded-xl shadow-2xl shadow-black/60"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 grid size-11 place-items-center rounded-full border border-white/10 bg-surface/80 text-xl text-fg transition hover:rotate-90 hover:text-accent"
          >
            <FaXmark />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
