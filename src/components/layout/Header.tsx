"use client";
import { motion } from "framer-motion";
import { MainNav } from "./MainNav";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="w-full border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4 w-full mx-auto">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <div className="rounded-full flex items-center justify-center w-8 h-8">
            <img src="/logo-pakar.png" alt="" />
          </div>
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 hidden sm:block">
            Gynovia
          </span>
        </motion.div>
        <MainNav />
        <MobileNav />
      </div>
    </header>
  );
}
