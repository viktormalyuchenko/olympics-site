import { getEvents } from "@/lib/events";
import { Clock, Star, ChevronRight } from "lucide-react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { LocalTime } from "./LocalTime";

function getAthletes() {
  const filePath = path.join(process.cwd(), "data", "athletes.json");
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export async function AINWidget() {
  const athletes = getAthletes();
  const allEvents = getEvents();
  const now = new Date();

  // Находим все предстоящие события для наших атлетов
  const upcomingEvents = allEvents
    .filter((event) => new Date(event.start) > now) // Только будущие
    .map((event) => {
      // Ищем, кто из атлетов подходит под это событие
      const hero = athletes.find((a: any) => {
        const matchSport = event.sport_en
          .toLowerCase()
          .includes(a.sport_en_key?.toLowerCase() || a.tags[0].toLowerCase());
        const isFemale = a.slug.match(
          /petrosian|pantrina|shevchenko|faleeva|efremenkova/,
        );
        const athleteGender = isFemale ? "women" : "men";
        const matchGender =
          event.gender === athleteGender || event.gender === "mixed";
        return matchSport && matchGender;
      });
      return { event, hero };
    })
    .filter((item) => item.hero) // Оставляем только те, где нашли атлета
    .sort(
      (a, b) =>
        new Date(a.event.start).getTime() - new Date(b.event.start).getTime(),
    );

  const nextEntry = upcomingEvents[0];

  if (!nextEntry) return null;

  const { event, hero } = nextEntry;

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white overflow-hidden relative group shadow-2xl shadow-slate-900/20">
      {/* Декор */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/40 transition-all"></div>

      <div className="relative z-10">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-5 flex items-center gap-2">
          <Star size={12} fill="currentColor" /> Следующий старт AIN
        </h3>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/10 shrink-0 shadow-lg">
            <img
              src={hero.image}
              alt={hero.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-xl font-black italic uppercase tracking-tighter leading-tight">
              {hero.name}
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
              {event.sport_ru}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                Ваше время
              </span>
              <div className="flex items-center gap-2 text-sm font-black">
                <Clock size={14} className="text-primary" />
                <LocalTime isoDate={event.start} />
              </div>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                Дата
              </span>
              <div className="text-sm font-black">
                {new Date(event.start).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "short",
                })}
              </div>
            </div>
          </div>

          <Link
            href={`/athletes/${hero.slug}`}
            className="flex items-center justify-center gap-2 w-full py-3 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all active:scale-95"
          >
            Открыть профиль <ChevronRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
