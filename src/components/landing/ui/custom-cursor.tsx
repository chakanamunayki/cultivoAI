"use client";

import { useEffect, useRef } from "react";

const REGION_SELECTOR = "[data-custom-cursor-region]";
const INTERACTIVE_SELECTOR = "a, button, [role='button'], input[type='button'], input[type='submit'], input.btn";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) {
      return;
    }

    const hasFinePointer = window.matchMedia("(any-hover: hover) and (any-pointer: fine)").matches;
    if (!hasFinePointer) {
      return;
    }

    let rafId = 0;
    let lastX = -100;
    let lastY = -100;

    const setPosition = (x: number, y: number) => {
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const resolveTargetElement = (target: EventTarget | null): Element | null => {
      if (!target) {
        return null;
      }
      if (target instanceof Element) {
        return target;
      }
      if (target instanceof Node) {
        return target.parentElement;
      }
      return null;
    };

    const updateCursorState = (target: Element | null) => {
      const inRegion = Boolean(target?.closest(REGION_SELECTOR));
      const overInteractive = Boolean(target?.closest(INTERACTIVE_SELECTOR));

      cursor.classList.toggle("custom-cursor--active", inRegion);
      cursor.classList.toggle("custom-cursor--link", inRegion && overInteractive);
    };

    const render = () => {
      setPosition(lastX, lastY);
      rafId = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      lastX = event.clientX;
      lastY = event.clientY;
      if (!rafId) {
        rafId = window.requestAnimationFrame(render);
      }

      const target = resolveTargetElement(event.target);
      updateCursorState(target);
    };

    const handlePointerLeave = () => {
      cursor.classList.remove("custom-cursor--active", "custom-cursor--link");
    };

    const handleWindowMouseOut = (event: MouseEvent) => {
      if (!event.relatedTarget) {
        handlePointerLeave();
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("mouseout", handleWindowMouseOut);
    window.addEventListener("blur", handlePointerLeave);
    document.addEventListener("visibilitychange", handlePointerLeave);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mouseout", handleWindowMouseOut);
      window.removeEventListener("blur", handlePointerLeave);
      document.removeEventListener("visibilitychange", handlePointerLeave);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
}
