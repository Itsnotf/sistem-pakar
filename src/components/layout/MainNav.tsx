// components/MainNav.tsx
"use client"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

const mainNavItems = [
  { title: "Beranda", link: "/" },
  { title: "Konsultasi", link: "/konsultasi" },
  { title: "Edukasi", link: "/edukasi" },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center gap-1">
      {mainNavItems.map((item) => (
        <Button
          key={item.link}
          variant="ghost"
          className={cn(
            "px-4 py-6 rounded-none font-medium text-sm transition-all",
            pathname === item.link 
              ? "text-pink-600 border-b-2 border-pink-500"
              : "text-gray-600 hover:text-pink-500 hover:bg-pink-50"
          )}
          asChild
        >
          <Link href={item.link}>
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  )
}