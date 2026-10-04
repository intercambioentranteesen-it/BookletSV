"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface CarouselProps {
  heading: ReactNode;
  prevLabel: string;
  nextLabel: string;
  children: ReactNode;
}

/** Carrusel con scroll-snap. Los botones solo aparecen si hay contenido fuera de la vista. */
export function Carousel({ heading, prevLabel, nextLabel, children }: CarouselProps) {
  const ref = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const [edge, setEdge] = useState({ start: true, end: true });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft <= 2,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
    });
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: reduce ? "auto" : "smooth" });
  };

  const overflowing = !(edge.start && edge.end);
  const btn =
    "inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors duration-150 hover:border-ink disabled:opacity-35 disabled:hover:border-line";

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        {heading}
        <div className={cn("flex gap-2", !overflowing && "hidden")}>
          <button type="button" aria-label={prevLabel} disabled={edge.start} onClick={() => go(-1)} className={btn}>
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          <button type="button" aria-label={nextLabel} disabled={edge.end} onClick={() => go(1)} className={btn}>
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      </div>
      <ul ref={ref} onScroll={update} role="list" className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-1">
        {children}
      </ul>
    </div>
  );
}
