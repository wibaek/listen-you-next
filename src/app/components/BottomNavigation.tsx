"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navItems = [
  { href: "/consult", label: "홈", icon: "/icon-home.png" },
  { href: "/center", label: "센터", icon: "/icon-center.png" },
  { href: "/", label: "캘린더", icon: "/icon-calendar.png" },
  { href: "/my", label: "마이", icon: "/icon-my.png" },
];

export default function BottomNavigation() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-t border-blue-100 shadow-[0_-2px_16px_0_rgba(80,120,200,0.06)]">
      <div className="flex justify-between items-center max-w-md mx-auto px-2 sm:px-6 py-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center flex-1 py-2 transition-all select-none active:scale-95 ${
                isActive ? "text-blue-600 font-bold" : "text-gray-400"
              }`}
              style={{ minWidth: 0 }}
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={28}
                height={28}
                className={`mb-0.5 transition-all ${
                  isActive
                    ? "drop-shadow-[0_2px_8px_rgba(0,102,255,0.18)] scale-110"
                    : ""
                }`}
                style={{ objectFit: "contain" }}
                priority={isActive}
              />
              <span className="text-xs sm:text-sm leading-none tracking-tight mt-0.5">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
