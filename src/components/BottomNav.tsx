"use client";

import Link from "next/link";
import { Compass, Home, Info, ListChecks, Map } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "首页", icon: Home },
  { href: "/louvre", label: "卢浮宫", icon: Map },
  { href: "/progress", label: "进度", icon: ListChecks },
  { href: "/about", label: "关于", icon: Info }
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-3xl border-t border-ink/10 bg-paper/95 px-4 pb-[calc(0.6rem+env(safe-area-inset-bottom))] pt-2 backdrop-blur">
      <div className="grid grid-cols-4 gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center rounded-[0.5rem] px-3 py-2 text-xs font-medium transition ${
                active ? "bg-ink text-white" : "text-ink/55 hover:bg-white/70 hover:text-ink"
              }`}
            >
              <Icon size={20} aria-hidden="true" />
              <span className="mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
      <div className="pointer-events-none absolute left-1/2 top-3 hidden -translate-x-1/2 items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-[0.65rem] text-ink/45 sm:flex">
        <Compass size={12} aria-hidden="true" />
        一路听
      </div>
    </nav>
  );
}
