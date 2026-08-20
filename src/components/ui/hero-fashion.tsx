"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

export function HeroFashion({ onBack }: { onBack?: () => void }) {
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-50 overflow-y-auto bg-white min-h-screen"
        >
            {onBack && (
                <button 
                    onClick={onBack}
                    className="absolute top-6 left-6 md:top-10 md:left-10 z-50 flex items-center gap-2 text-black/60 hover:text-black transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="font-medium tracking-tight">Back</span>
                </button>
            )}
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
                <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-32 relative overflow-x-hidden">
                    <div className="md:order-2 relative">
                        <div className="absolute -z-10 w-64 h-64 rounded-full bg-[#f8b3c4] blur-3xl opacity-20 -top-10 -left-10"></div>
                        <img
                            src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/portrait2-x5MjJSaQ9ed0HZrewEhH7TkZwjZ66K.jpeg"
                            alt="Fashion model"
                            className="rounded-2xl shadow-xl w-full max-h-[500px] md:max-h-[450px] lg:max-h-[600px] object-cover filter brightness-105"
                        />
                    </div>
                    <div className="md:order-1 flex flex-col justify-between mt-8 md:mt-0">
                        <div className="flex flex-col h-full justify-between">
                            <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold text-black leading-tight tracking-tighter">
                                Kokonut.
                            </h1>
                            <ul className="space-y-1.5 tracking-tighter text-base text-black/90 my-8 md:my-0">
                                {[
                                    "Ready-to-wear",
                                    "Accessories",
                                    "Footwear",
                                    "Leather goods",
                                    "Jewelry",
                                ].map((item, index) => (
                                    <motion.li
                                        key={item}
                                        initial={{ opacity: 0.8 }}
                                        whileHover={{
                                            opacity: 1,
                                            y: -3,
                                            transition: {
                                                duration: 0.4,
                                                ease: "easeOut",
                                            },
                                        }}
                                        transition={{
                                            delay: index * 0.1,
                                        }}
                                    >
                                        <a href="#" className="cursor-pointer">
                                            {item}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                            <div>
                                <h2 className="text-xl font-medium text-black mt-auto pt-6">
                                    SUMMER 2025
                                </h2>
                                <p className="text-sm text-black/90 max-w-sm pt-3 tracking-tight leading-relaxed">
                                    <a
                                        href="https://kokonutui.com/"
                                        className="underline hover:text-black/70 transition-colors"
                                    >
                                        "The Bright Young"
                                    </a>{" "}
                                    draws inspiration from Anglomania,
                                    redefining sartorial elegance and school
                                    uniforms with a nod to British heritage.
                                    Suits of the collection are tailored out of
                                    English cloth, crafted from 1920's inspired
                                    cashmeres and wools, rewoven...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
