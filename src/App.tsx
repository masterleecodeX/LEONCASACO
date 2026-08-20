import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { ImageStreamHero } from "./components/ui/image-stream-hero";
import { PerspectiveMarquee } from "./components/ui/remocn-perspective-marquee";

import { CircularTestimonialsDemo } from "./components/ui/circular-testimonials";
import { TrailCardDemo } from "./components/ui/trail-card";
import { HeroFashion } from "./components/ui/hero-fashion";
import { Footer7 } from "./components/ui/footer-7";
import { MobileHeroFan } from "./components/ui/mobile-hero-fan";
import { cn } from "./lib/utils";

const CDN = "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev";
 
const IMAGES = [
  {
    src: `${CDN}/stock-images/767d99bb371a54d0d36751e8cecae43c.jpg`,
    alt: "Diver silhouetted inside a sunset seascape shaped like a profile",
  },
  {
    src: `${CDN}/gradients/hero_gradient/hero-gradients-01.png`,
    alt: "Soft multi-tone gradient wash",
  },
  {
    src: `${CDN}/stock-images/821d815affa6496c39cbdeeec7a84603.jpg`,
    alt: "Double-exposure portrait blended with a city skyline at dusk",
  },
  {
    src: `${CDN}/gradients/crimson_aura/crimson-aura-02.png`,
    alt: "Crimson aura gradient",
  },
  {
    src: `${CDN}/stock-images/937438c560ada1c83317f2c11b3454b0.jpg`,
    alt: "Motion-blurred side-profile portrait against a deep orange backdrop",
  },
  {
    src: `${CDN}/gradients/hue-flow/hue-flow-01.png`,
    alt: "Flowing hue gradient",
  },
  {
    src: `${CDN}/stock-images/98f89cb9994f5c382ab964062c4039db.jpg`,
    alt: "Figure holding a racket that dissolves into a swirling colourful cloud",
  },
  {
    src: `${CDN}/gradients/moon/moon-grade-03.png`,
    alt: "Moon-toned gradient",
  },
  {
    src: `${CDN}/stock-images/ddcbee38be8b7274e19e132d7ab35b53.jpg`,
    alt: "Hand gesture with a colourful cutout of a bird flying through the fingers",
  },
  {
    src: `${CDN}/gradients/hero_gradient/hero-gradients-03.png`,
    alt: "Layered hero gradient",
  },
  {
    src: `${CDN}/gradients/hue-flow/hue-flow-02.png`,
    alt: "Second flowing hue gradient",
  },
  {
    src: `${CDN}/gradients/moon/moon-grade-05.png`,
    alt: "Deep moon-toned gradient",
  },
];

const CATEGORIES = [
  "Living room",
  "Bedroom",
  "Dining room",
  "Kitchen",
  "Bathroom",
  "Office",
  "Outdoor",
  "Lighting & decoration"
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentView, setCurrentView] = useState<"home" | "fashion">("home");

  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [marqueeFontSize, setMarqueeFontSize] = useState(100);
  const [marqueeSpeed, setMarqueeSpeed] = useState(1);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(Math.ceil(scrollLeft) < scrollWidth - clientWidth - 5);
    }
  };

  const handleResize = () => {
    handleScroll();
    setMarqueeFontSize(window.innerWidth < 768 ? 50 : 100);
    setMarqueeSpeed(window.innerWidth < 768 ? 0.3 : 1);
  };

  useEffect(() => {
    handleResize(); // Call initially
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 250;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      className="min-h-screen w-full bg-white font-sans antialiased overflow-x-hidden"
      onContextMenu={(e) => e.preventDefault()}
    >
      <AnimatePresence>
        {currentView === "fashion" && (
          <HeroFashion onBack={() => setCurrentView("home")} />
        )}
      </AnimatePresence>
      <ImageStreamHero
        images={IMAGES}
        className="h-[100svh] md:h-[70svh] lg:h-screen w-full bg-white"
      >
        <div className="relative z-10 flex h-full flex-col items-center justify-between pt-12 pb-8 md:pt-28 md:pb-16 lg:py-24 text-center overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="px-6 w-full max-w-4xl mx-auto">
            <motion.h1 
              className="text-4xl sm:text-5xl font-medium tracking-tight text-foreground md:text-6xl lg:text-7xl -mt-[12px] md:-mt-[23px]"
              variants={{
                hidden: { opacity: 1 },
                visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
              }}
              initial="hidden"
              animate="visible"
            >
              {"LeonCasa & Co.".split("").map((char, i) => (
                <motion.span key={`l1-${i}`} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <br />
              {"Furniture Meets Art".split("").map((char, i) => (
                <motion.span key={`l2-${i}`} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>
          </div>
          
          <div className="md:hidden w-full px-4 max-w-sm mx-auto mt-12 mb-6 shrink-0">
             <MobileHeroFan images={IMAGES} className="w-full mt-[20px]" />
          </div>

          <div className="flex flex-col items-center mb-[-4px] shrink-0">
            <p className="hidden md:block max-w-lg text-balance px-6 text-sm sm:text-base text-muted-foreground mb-3 mx-auto md:max-w-xl">
              A hero that leads with the images instead of describing them. Swap in
              your own and the corridor rebuilds around them.
            </p>
            
            <div className="md:hidden h-[90px] w-[100vw] relative flex items-center justify-center overflow-hidden mt-12">
              <PerspectiveMarquee
                className="mt-0"
                items={CATEGORIES}
                rotateY={-32}
                rotateX={9}
                perspective={870}
                pixelsPerFrame={5}
                speed={marqueeSpeed}
                fontSize={marqueeFontSize}
                fadeColor="#ffffff"
                background="#ffffff"
                color="#000000"
              />
            </div>

            <div className="animate-bounce mt-10 md:mt-8 text-black opacity-60">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </div>
          </div>
        </div>
      </ImageStreamHero>
      
      <div className="hidden md:flex h-[140px] md:h-[250px] lg:h-[400px] w-full relative -mt-4 md:-mt-12 lg:-mt-24 z-20 items-center justify-center overflow-hidden">
        <PerspectiveMarquee
          className="mt-0 md:mt-[16px] lg:mt-[32px]"
          items={CATEGORIES}
          rotateY={-32}
          rotateX={9}
          perspective={870}
          pixelsPerFrame={5}
          speed={marqueeSpeed}
          fontSize={marqueeFontSize}
          fadeColor="#ffffff"
          background="#ffffff"
          color="#000000"
        />
      </div>
      <CircularTestimonialsDemo />
      
      <footer className="w-full pb-8 pt-12 px-6 flex flex-col items-center justify-center bg-white relative z-20">
        <div className="w-full max-w-7xl h-px bg-border mb-8 mx-auto" />
        <div className="relative w-full max-w-full xl:max-w-7xl mx-auto flex items-center xl:justify-center">
          <AnimatePresence>
            {showLeftArrow && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 z-10 flex h-full items-center bg-gradient-to-r from-white via-white/80 to-transparent pr-8 pointer-events-none"
              >
                <button 
                  onClick={() => scroll('left')} 
                  className="pointer-events-auto p-1.5 text-gray-400 hover:text-black transition-colors flex items-center justify-center"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <ul 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex justify-start xl:justify-center gap-x-8 max-w-full mx-auto overflow-x-auto whitespace-nowrap no-scrollbar px-4 py-2 scroll-smooth"
          >
            {["All", ...CATEGORIES].map(item => (
              <li key={item} className="flex-shrink-0">
                <button
                  onClick={() => setActiveCategory(item)}
                  className={cn(
                    "transition-colors text-lg tracking-tight font-medium cursor-pointer",
                    activeCategory === item ? "text-black" : "text-muted-foreground hover:text-black"
                  )}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>

          <AnimatePresence>
            {showRightArrow && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 z-10 flex h-full items-center justify-end bg-gradient-to-l from-white via-white/80 to-transparent pl-8 pointer-events-none"
              >
                <button 
                  onClick={() => scroll('right')} 
                  className="pointer-events-auto p-1.5 text-gray-400 hover:text-black transition-colors flex items-center justify-center"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </footer>
      {activeCategory === "All" && (
        <TrailCardDemo onClick={() => setCurrentView("fashion")} />
      )}
      <Footer7 />
    </div>
  );
}
