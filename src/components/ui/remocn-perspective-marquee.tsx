"use client";

import { useEffect, useRef } from "react";

export interface PerspectiveMarqueeProps {
  items?: string[];
  fontSize?: number;
  color?: string;
  fontWeight?: number;
  pixelsPerFrame?: number;
  rotateY?: number;
  rotateX?: number;
  perspective?: number;
  fadeColor?: string;
  background?: string;
  speed?: number;
  className?: string;
}

const FONT_FAMILY =
  "var(--font-sans), -apple-system, BlinkMacSystemFont, sans-serif";

const DEFAULT_ITEMS = [
  "Vercel",
  "Linear",
  "Stripe",
  "Figma",
  "Notion",
  "Raycast",
  "Arc",
  "Cursor",
];

export function PerspectiveMarquee({
  items = DEFAULT_ITEMS,
  fontSize = 84,
  color = "#fafafa",
  fontWeight = 700,
  pixelsPerFrame = 2,
  rotateY = -28,
  rotateX = 8,
  perspective = 1200,
  fadeColor = "#050505",
  background = "#050505",
  speed = 1,
  className,
}: PerspectiveMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const itemPadding = fontSize * 0.9;
  const approxItemWidth = items.reduce(
    (acc, item) => acc + item.length * fontSize * 0.6 + itemPadding,
    0,
  );

  // Render 8 cycles to ensure we never run out of items on the left or right during rotation
  const rendered = [
    ...items, ...items, ...items, ...items,
    ...items, ...items, ...items, ...items
  ];

  useEffect(() => {
    let frame = 0;
    let animationFrameId: number;
    let containerWidth = 1200;

    if (containerRef.current) {
      containerWidth = containerRef.current.getBoundingClientRect().width;
    }

    let isInitialized = false;
    let cycleWidth = approxItemWidth;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === containerRef.current) {
          containerWidth = entry.contentRect.width;
        }
        if (entry.target === wrapperRef.current) {
          isInitialized = false;
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    if (wrapperRef.current) {
      resizeObserver.observe(wrapperRef.current);
    }

    const cachedDims: { left: number; width: number }[] = [];

    const render = () => {
      if (!isInitialized) {
        let allMeasured = true;
        itemsRef.current.forEach((el, i) => {
          if (!el) {
            allMeasured = false;
            return;
          }
          cachedDims[i] = {
            left: el.offsetLeft,
            width: el.offsetWidth,
          };
        });

        if (allMeasured && cachedDims[items.length] && cachedDims[0]) {
          cycleWidth = cachedDims[items.length].left - cachedDims[0].left;
          isInitialized = true;
        }
      }

      frame += speed;
      // Multiplying by 0.5 because requestAnimationFrame runs at 60-120fps natively 
      // compared to the 30fps of the original Remotion Player
      const actualSpeed = frame * pixelsPerFrame * 0.5;
      
      // Shift base offset to the left by 3 full cycles. 
      // This ensures there are always 3 cycles of items visible to the left of the origin,
      // preventing the left side of the screen from going blank when the loop resets.
      const offset = -(cycleWidth * 3) - (actualSpeed % cycleWidth);

      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translateX(${offset}px)`;
      }

      itemsRef.current.forEach((el, i) => {
        if (!el || !cachedDims[i]) return;

        const itemCenter = cachedDims[i].left + cachedDims[i].width / 2 + offset;

        const centerPoint = containerWidth / 2;
        const norm = (itemCenter - centerPoint) / centerPoint;
        const distance = Math.min(1, Math.abs(norm));
        const blurPx = distance * 6;
        const opacity = 1 - distance * 0.4;

        el.style.filter = `blur(${blurPx}px)`;
        el.style.opacity = opacity.toString();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [approxItemWidth, items.length, pixelsPerFrame, speed]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        perspective: `${perspective}px`,
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          ref={wrapperRef}
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            willChange: "transform",
            position: "relative",
          }}
        >
          {rendered.map((item, i) => (
            <span
              key={i}
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              style={{
                display: "inline-block",
                fontFamily: FONT_FAMILY,
                fontSize,
                fontWeight,
                color,
                letterSpacing: "-0.03em",
                paddingRight: itemPadding,
                willChange: "filter, opacity",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `linear-gradient(90deg, ${fadeColor} 0%, transparent 18%, transparent 82%, ${fadeColor} 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `linear-gradient(180deg, ${fadeColor} 0%, transparent 25%, transparent 75%, ${fadeColor} 100%)`,
        }}
      />
    </div>
  );
}

export default PerspectiveMarquee;
