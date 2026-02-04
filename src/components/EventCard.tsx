"use client";

import { useEffect, useState } from "react";
import { Clock, MapPin, Trophy, Info, PlayCircle, Circle } from "lucide-react";
import { LocalTime } from "./LocalTime";
import { getFlagEmoji } from "@/lib/utils";
import Link from "next/link";

export function EventCard({ event }: { event: any }) {
  const isMatch = event.type === "match";
  const hasTeams =
    event.teams && event.teams.length === 2 && event.teams[0].code;

  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const checkLive = () => {
      const now = new Date();
      const start = new Date(event.start);
      const end = new Date(event.end);
      setIsLive(now >= start && now <= end);
    };

    checkLive();
    const interval = setInterval(checkLive, 60000); // Проверяем каждую минуту
    return () => clearInterval(interval);
  }, [event.start, event.end]);

  return (
    <div
      className={`group relative overflow-hidden rounded-[2.5rem] border p-6 pt-10 transition-all bg-card hover:shadow-2xl ${
        isLive
          ? "ring-2 ring-red-500 border-transparent shadow-lg shadow-red-500/10"
          : event.isMedal
            ? "bg-amber-50/30 border-amber-200 shadow-sm"
            : "border-border"
      }`}
    >
      {/* 1. Блок статусов (По углам) */}
      <div className="absolute top-4 left-0 right-0 px-6 flex justify-between items-center pointer-events-none">
        {/* LIVE Слева */}
        {isLive ? (
          <div className="flex items-center gap-1.5 bg-red-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider animate-pulse shadow-lg shadow-red-500/20">
            <Circle size={8} fill="currentColor" /> ПРЯМОЙ ЭФИР
          </div>
        ) : (
          <div />
        )}

        {/* МЕДАЛИ Справа */}
        {event.isMedal && (
          <div className="flex items-center gap-1.5 bg-amber-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-lg shadow-amber-500/20">
            ФИНАЛ 🥇
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* 2. Левая колонка: Время (теперь с отступом сверху за счет pt-10 в родителе) */}
        <div className="flex flex-row lg:flex-col items-center lg:items-start gap-4 min-w-[110px] lg:border-r border-border/50 pr-6">
          <div className="space-y-1">
            <div className="text-4xl font-black tracking-tighter italic text-foreground leading-none">
              <LocalTime isoDate={event.start} />
            </div>
            <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] leading-none">
              Ваше время
            </div>
          </div>

          <div className="lg:mt-2 lg:pt-2 lg:border-t lg:border-border/50 w-full">
            <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight flex items-center gap-1.5 whitespace-nowrap">
              <span className="opacity-50 text-[8px]">🇮🇹</span>
              Италия:{" "}
              <span className="text-foreground/80">
                <LocalTime isoDate={event.start} timeZone="Europe/Rome" />
              </span>
            </div>
          </div>
        </div>

        {/* 3. Контент события */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                event.isMedal
                  ? "bg-amber-100 text-amber-700"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {event.sport_ru}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                event.gender === "men"
                  ? "bg-blue-100 text-blue-600"
                  : event.gender === "women"
                    ? "bg-pink-100 text-pink-600"
                    : "bg-slate-100 text-slate-600"
              }`}
            >
              {event.gender === "men"
                ? "Мужчины"
                : event.gender === "women"
                  ? "Женщины"
                  : "Смешанные"}
            </span>
          </div>

          <Link href={`/event/${event.slug}`} className="block group/title">
            {isMatch && hasTeams ? (
              <div className="flex items-center gap-4 py-2">
                <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-2xl flex-1 border border-border/50 group-hover/title:border-primary/30 transition-colors">
                  <span className="text-3xl">
                    {getFlagEmoji(event.teams[0].code)}
                  </span>
                  <span className="text-base font-black tracking-tight truncate">
                    {event.teams[0].name}
                  </span>
                </div>
                <span className="font-black text-primary italic text-xs">
                  VS
                </span>
                <div className="flex items-center justify-end gap-3 bg-muted/30 p-3 rounded-2xl flex-1 border border-border/50 group-hover/title:border-primary/30 transition-colors">
                  <span className="text-base font-black tracking-tight text-right truncate">
                    {event.teams[1].name}
                  </span>
                  <span className="text-3xl">
                    {getFlagEmoji(event.teams[1].code)}
                  </span>
                </div>
              </div>
            ) : (
              <h3 className="text-2xl font-black text-foreground leading-tight tracking-tight group-hover/title:text-primary transition-colors">
                {event.title_ru}
              </h3>
            )}
          </Link>

          {event.description_ru && (
            <div className="flex items-start gap-2 p-3 bg-muted/20 rounded-2xl border border-dashed border-border/50">
              <Info size={14} className="text-primary mt-0.5 shrink-0" />
              <p className="text-[11px] text-muted-foreground leading-relaxed font-medium italic">
                {event.description_ru}
              </p>
            </div>
          )}

          <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-wide">
            <MapPin size={12} className="text-primary" />
            {event.location.split(",")[0]}
          </div>
        </div>

        {/* 4. Кнопка действия */}
        <div className="flex items-center">
          <a
            href={event.stream_url || "https://okko.sport/sport"}
            target="_blank"
            className={`w-full lg:w-auto px-8 py-5 rounded-[1.5rem] font-black text-sm flex items-center justify-center gap-3 shadow-xl transition-all hover:scale-[1.02] active:scale-95 ${
              isLive
                ? "bg-red-500 text-white shadow-red-500/20"
                : "bg-primary text-primary-foreground shadow-primary/20"
            }`}
          >
            <PlayCircle size={20} />
            {isLive ? "СМОТРЕТЬ LIVE" : "СМОТРЕТЬ"}
          </a>
        </div>
      </div>
    </div>
  );
}
