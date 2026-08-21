// components/ui/trail-card.tsx
import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "../../lib/utils"; // Your utility for merging class names

// Define the props interface for type safety and reusability
interface TrailCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  mapImageUrl: string;
  title: string;
  location: string;
  difficulty: string;
  creators: string;
  dimension: string;
  material: string;
  color: string;
  onDirectionsClick?: () => void;
}

// Define stat item component for DRY principle
const StatItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <span className="text-sm font-semibold text-foreground">{value}</span>
    <span className="text-xs text-muted-foreground">{label}</span>
  </div>
);

const TrailCard = React.forwardRef<HTMLDivElement, TrailCardProps>(
  (
    {
      className,
      imageUrl,
      mapImageUrl,
      title,
      location,
      difficulty,
      creators,
      dimension,
      material,
      color,
      onDirectionsClick,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "w-full max-w-sm overflow-hidden rounded-2xl bg-white text-gray-900 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100",
          className
        )}
        whileHover={{ y: -5, scale: 1.02 }} // Subtle lift and scale animation on hover
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        {...props}
      >
        {/* Top section with background image and content */}
        <div className="relative h-60 w-full">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-4">
            <div className="text-white">
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-sm text-white/90">{location}</p>
            </div>
          </div>
        </div>

        {/* Bottom section with trail details */}
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-foreground">{difficulty}</p>
              <p className="text-xs text-muted-foreground">{creators}</p>
            </div>
          </div>
          <div className="my-4 h-px w-full bg-gray-100" />
          <div className="flex justify-between">
            <StatItem label="Dimension" value={dimension} />
            <StatItem label="Material" value={material} />
            <StatItem label="Color" value={color} />
          </div>
        </div>
      </motion.div>
    );
  }
);

TrailCard.displayName = "TrailCard";

export { TrailCard };

// --- Demo ---
// demo.tsx
const CARDS = [
  {
    title: "Embercrest Ridge",
    location: "Silverpine Mountains",
    difficulty: "Hard",
    creators: "1886 by Helen Rowe & Elias Mendez",
    dimension: "12.4km",
    material: "870m",
    color: "4h 45m",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Velvet Lounge Sofa",
    location: "Modern Living Collection",
    difficulty: "Premium",
    creators: "2023 by Studio Design",
    dimension: "220cm x 95cm",
    material: "Italian Velvet",
    color: "Deep Ocean",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Oak Dining Table",
    location: "Heritage Series",
    difficulty: "Classic",
    creators: "2022 by Crafted Woods",
    dimension: "200cm x 100cm",
    material: "Solid Oak",
    color: "Natural",
    imageUrl: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Minimalist Lounge Chair",
    location: "Nordic Collection",
    difficulty: "Bestseller",
    creators: "2024 by Aalto Studio",
    dimension: "85cm x 75cm",
    material: "Ash & Leather",
    color: "Tan",
    imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=2070&auto=format&fit=crop"
  }
];

export function TrailCardDemo({ onClick }: { onClick?: () => void }) {
  return (
    <div className="relative z-20 flex w-full items-center justify-center bg-white px-6 md:px-12 lg:px-16 pt-16 pb-24 md:pt-20 md:pb-32 -mt-[60px] md:mt-0">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 place-items-center md:place-items-start">
        {CARDS.map((card, idx) => (
          <TrailCard
            key={idx}
            onClick={onClick}
            className={onClick ? "cursor-pointer w-full max-w-sm" : "w-full max-w-sm"}
            title={card.title}
            location={card.location}
            difficulty={card.difficulty}
            creators={card.creators}
            dimension={card.dimension}
            material={card.material}
            color={card.color}
            imageUrl={card.imageUrl}
            mapImageUrl=""
          />
        ))}
      </div>
    </div>
  );
}
