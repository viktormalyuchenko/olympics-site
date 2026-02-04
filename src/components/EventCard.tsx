import { Clock, MapPin, Trophy, Info, PlayCircle } from "lucide-react";
import { LocalTime } from "./LocalTime";
import { getFlagEmoji } from "@/lib/utils";

export function EventCard({ event }: { event: any }) {
  const isMatch = event.type === "match";
  const hasTeams =
    event.teams && event.teams.length === 2 && event.teams[0].code;

  return (
    <div
      className={`group relative overflow-hidden rounded-4xl border p-6 transition-all bg-card hover:shadow-2xl hover:border-primary/30 ${
        event.isMedal
          ? "ring-2 ring-amber-500/20 border-amber-500/30 bg-amber-50/5"
          : "border-border"
      }`}
    >
      {/* Метка Медалей */}
      {event.isMedal && (
        <div className="absolute top-0 right-10 transform -translate-y-1/2 bg-amber-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-amber-500/40">
          ФИНАЛ 🥇
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Время начала */}
        <div className="flex lg:flex-col items-center lg:items-start gap-4 min-w-[100px] lg:border-r border-border/50 pr-6">
          <div className="text-4xl font-black tracking-tighter italic text-foreground leading-none">
            {/* Местное время пользователя */}
            <LocalTime isoDate={event.start} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
              Ваше время
            </span>
            <span className="text-[9px] text-muted-foreground font-bold uppercase">
              Италия: <LocalTime isoDate={event.start} timeZone="Europe/Rome" />
            </span>
          </div>
        </div>

        {/* Контент события */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-[10px] font-black uppercase tracking-widest">
              {event.sport_ru}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
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

          {/* Заголовок или Матч */}
          {isMatch && hasTeams ? (
            <div className="flex items-center gap-4 py-2">
              <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-2xl flex-1 border border-border/50">
                <span className="text-3xl">
                  {getFlagEmoji(event.teams[0].code)}
                </span>
                <span className="text-lg font-black tracking-tight">
                  {event.teams[0].name}
                </span>
              </div>
              <span className="font-black text-primary italic">VS</span>
              <div className="flex items-center justify-end gap-3 bg-muted/30 p-3 rounded-2xl flex-1 border border-border/50">
                <span className="text-lg font-black tracking-tight text-right">
                  {event.teams[1].name}
                </span>
                <span className="text-3xl">
                  {getFlagEmoji(event.teams[1].code)}
                </span>
              </div>
            </div>
          ) : (
            <h3 className="text-2xl font-black text-foreground leading-none tracking-tight">
              {event.title_ru}
            </h3>
          )}

          {/* Описание (скрыто на мобилках, видно на десктопе через hover или всегда) */}
          {event.description_ru && (
            <div className="flex items-start gap-2 p-4 bg-muted/20 rounded-2xl border border-dashed border-border/50">
              <Info size={16} className="text-primary mt-1 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed font-medium italic">
                {event.description_ru}
              </p>
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-muted-foreground font-bold">
            <MapPin size={14} className="text-primary" />
            {event.location.split(",")[0]}{" "}
            {/* Показываем только название арены до запятой */}
          </div>
        </div>

        {/* Кнопка Okko */}
        <div className="flex items-center">
          <a
            href={event.stream_url || "https://okko.sport/sport"}
            target="_blank"
            className="w-full lg:w-auto px-8 py-5 rounded-[1.5rem] bg-primary text-primary-foreground font-black text-sm flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
          >
            <PlayCircle size={20} />
            СМОТРЕТЬ
          </a>
        </div>
      </div>
    </div>
  );
}
