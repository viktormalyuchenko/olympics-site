"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { Trophy, Users, Calendar, Award } from "lucide-react";

export function Header() {
  const pathname = usePathname();

  // Список ссылок для навигации
  const navItems = [
    { name: "Расписание", href: "/", icon: Calendar },
    { name: "Наши атлеты", href: "/athletes", icon: Users },
    { name: "Медали", href: "/medals", icon: Award },
  ];

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Логотип */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
            M
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black italic uppercase tracking-tighter">
              Milano<span className="text-primary">2026</span>
            </span>
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.3em] mt-1">
              Olympics Service
            </span>
          </div>
        </Link>

        {/* Навигация (Десктоп) */}
        <nav className="hidden md:flex items-center gap-1 bg-muted/50 p-1.5 rounded-2xl border border-border">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  isActive
                    ? "bg-card text-foreground shadow-sm ring-1 ring-border"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                }`}
              >
                <item.icon
                  size={14}
                  className={isActive ? "text-primary" : ""}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Правая часть: Тема и поиск (опционально) */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-[1px] bg-border mx-2 hidden md:block" />
          <ThemeToggle />

          {/* Мобильная навигация (иконки без текста) */}
          <div className="flex md:hidden items-center gap-1 border-l border-border pl-3 ml-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`p-2.5 rounded-xl transition-all ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground"
                  }`}
                >
                  <item.icon size={20} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
