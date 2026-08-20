"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "../../lib/utils";
import type { StreamImage } from "./image-stream-hero";

const fanSlots = [
  { width: 'w-[38%]', layout: '-mr-8 z-10', rotate: -6, x: 48, ty: 24 },
  { width: 'w-[42%]', layout: 'z-20', rotate: 0, x: 0, ty: -8 },
  { width: 'w-[38%]', layout: '-ml-8 z-10', rotate: 6, x: -48, ty: 24 },
];

const fanContainer: Variants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.4,
      delayChildren: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const fanCard: Variants = {
  hidden: (slot: (typeof fanSlots)[number]) => ({
    x: slot.x,
    rotate: slot.rotate,
    y: slot.ty,
  }),
  visible: (slot: (typeof fanSlots)[number]) => ({
    x: 0,
    rotate: slot.rotate,
    y: slot.ty,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function MobileHeroFan({
  images,
  className
}: {
  images: StreamImage[];
  className?: string;
}) {
  return (
    <motion.div
      className={cn("relative flex w-full max-w-sm items-center justify-center", className)}
      variants={fanContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {images.slice(0, 3).map((img, i) => {
        const slot = fanSlots[i] ?? fanSlots[1];
        return (
          <motion.div
            key={i}
            custom={slot}
            variants={fanCard}
            className={cn(
              'relative shrink-0 overflow-hidden rounded-xl shadow-xl outline outline-black/10 aspect-[4/5]',
              slot.width,
              slot.layout,
            )}
          >
            <img
              src={img.src}
              alt={img.alt ?? ''}
              className="size-full object-cover"
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
