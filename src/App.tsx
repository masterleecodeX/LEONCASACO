import { ImageStreamHero } from "./components/ui/image-stream-hero";
import { PerspectiveMarquee } from "./components/ui/remocn-perspective-marquee";

import { CircularTestimonialsDemo } from "./components/ui/circular-testimonials";

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
  return (
    <div 
      className="min-h-screen w-full bg-white font-sans antialiased overflow-x-hidden"
      onContextMenu={(e) => e.preventDefault()}
    >
      <ImageStreamHero
        images={IMAGES}
        className="h-screen w-full bg-white"
      >
        <div className="relative z-10 flex h-full flex-col items-center justify-between py-24 text-center">
          <div className="px-6">
            <h1 className="text-balance text-5xl font-medium tracking-tight text-foreground sm:text-7xl -mt-[23px]">
              LeonCasa &amp; Co.
              <br />
              Furniture Meets Art
            </h1>
          </div>
          <div className="flex flex-col items-center mb-[-4px]">
            <p className="max-w-lg text-balance px-6 text-base text-muted-foreground mb-[13px] mx-auto">
              A hero that leads with the images instead of describing them. Swap in
              your own and the corridor rebuilds around them.
            </p>
            <div className="animate-bounce mt-8 text-black opacity-60">
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
      
      <div className="h-[400px] md:h-[500px] w-full relative -mt-20 md:-mt-32 z-20">
        <PerspectiveMarquee
          className="mt-[32px]"
          items={CATEGORIES}
          rotateY={-32}
          rotateX={9}
          perspective={870}
          pixelsPerFrame={5}
          speed={1}
          fontSize={100}
          fadeColor="#ffffff"
          background="#ffffff"
          color="#000000"
        />
      </div>
      <CircularTestimonialsDemo />
      
      <footer className="w-full pb-32 pt-12 px-6 flex flex-col items-center justify-center bg-white relative z-20">
        <ul className="flex justify-center gap-x-8 max-w-full mx-auto overflow-x-auto whitespace-nowrap scrollbar-hide px-4">
          {["All", ...CATEGORIES].map(item => (
            <li key={item} className="flex-shrink-0">
              <a 
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                className="text-muted-foreground hover:text-black transition-colors text-lg tracking-tight font-medium"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
}
