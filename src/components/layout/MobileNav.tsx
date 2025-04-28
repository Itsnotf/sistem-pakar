// components/MobileNav.tsx
"use client"
import { useState } from "react"
import { usePathname } from "next/navigation"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu as MenuIcon, X } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const mobileItems = [
  { title: "Beranda", link: "/" },
  { title: "Konsultasi", link: "/konsultasi" },
  { title: "Edukasi", link: "/edukasi" },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden hover:bg-pink-50 hover:text-pink-600"
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[300px]">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-pink-600">Gynovia</SheetTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setOpen(false)}
              className="hover:bg-pink-50 hover:text-pink-600"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>
        <nav className="flex flex-col mt-6 gap-1">
          {mobileItems.map((item) => (
            <Button
              key={item.link}
              variant="ghost"
              className={cn(
                "justify-start px-4 py-6 rounded-none font-medium",
                pathname === item.link
                  ? "text-pink-600 bg-pink-50"
                  : "text-gray-600 hover:text-pink-500 hover:bg-pink-50"
              )}
              asChild
              onClick={() => setOpen(false)}
            >
              <Link href={item.link}>
                {item.title}
              </Link>
            </Button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}