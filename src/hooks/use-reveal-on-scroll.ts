import { useEffect } from "react";

type Options = {
  /** Disable reveals on small screens for performance. Default: true */
  disableOnMobile?: boolean;
  /** Tailwind `sm` breakpoint ~ 640px. */
  mobileMaxWidthPx?: number;
};

export function useRevealOnScroll(options: Options = {}) {
  const { disableOnMobile = true, mobileMaxWidthPx = 640 } = options;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    if (disableOnMobile && window.matchMedia?.(`(max-width: ${mobileMaxWidthPx}px)`).matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.reveal = "in";
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );

    for (const el of els) io.observe(el);

    return () => io.disconnect();
  }, [disableOnMobile, mobileMaxWidthPx]);
}
