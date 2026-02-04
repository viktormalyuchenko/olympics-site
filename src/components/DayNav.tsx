// src/components/DayNav.tsx
import Link from "next/link";

interface DayNavProps {
  dates: string[];
  selectedDate: string;
  currentSport?: string;
  currentGender?: string;
}

export function DayNav({
  dates,
  selectedDate,
  currentSport,
  currentGender,
}: DayNavProps) {
  return (
    // Добавляем py-4 (отступы сверху и снизу), чтобы scale-105 не резался
    <div className="flex gap-2 overflow-x-auto py-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
      {dates.map((date) => {
        const d = new Date(date);
        const isActive = selectedDate === date;

        // Формируем параметры
        const params = new URLSearchParams();
        params.set("date", date);
        if (currentSport) params.set("sport", currentSport);
        if (currentGender) params.set("gender", currentGender);

        return (
          <Link
            key={date}
            href={`/?${params.toString()}`}
            // Добавляем z-10 для активного элемента
            className={`shrink-0 w-16 h-20 flex flex-col items-center justify-center rounded-2xl border transition-all duration-300 ${
              isActive
                ? "bg-primary text-white border-primary shadow-xl shadow-primary/30 scale-105 z-10"
                : "bg-card text-muted-foreground border-border hover:border-primary/50"
            }`}
          >
            <span className="text-[10px] font-black uppercase tracking-widest opacity-70">
              {d.toLocaleDateString("ru-RU", { month: "short" })}
            </span>
            <span className="text-2xl font-black italic tracking-tighter">
              {d.getDate()}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
