// src/components/MedalTable.tsx
import { Trophy, ChevronRight } from "lucide-react";
import Link from "next/link";

async function getMedals() {
  const SHEET_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSoEqfxW6K6SVTFyQhHnFzu52QMwHsvKY9WkVye65GUPAqwwJeQYn-W-AyiU7iI4oIK_7Hmv3Nkvgd3/pub?output=csv";
  try {
    const response = await fetch(SHEET_URL, { next: { revalidate: 60 } });
    const csvText = await response.text();
    const lines = csvText.split("\n");

    const data = lines.slice(1).map((line) => {
      const parts = line.split(",");
      return {
        country: parts[1]?.trim() || "",
        gold: parseInt(parts[2]) || 0,
        silver: parseInt(parts[3]) || 0,
        bronze: parseInt(parts[4]) || 0,
        flag: parts[5]?.trim() || "🏳️",
      };
    });

    return data
      .filter((item) => item.country !== "")
      .sort(
        (a, b) => b.gold - a.gold || b.silver - a.silver || b.bronze - a.bronze,
      );
  } catch (e) {
    return [];
  }
}

export async function MedalTable({
  limit = 5,
  showLink = true,
}: {
  limit?: number;
  showLink?: boolean;
}) {
  const medals = await getMedals();
  if (medals.length === 0) return null;

  const displayMedals = medals.slice(0, limit);

  return (
    <div className="bg-card border border-border rounded-[2.5rem] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6 px-1">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
          <Trophy size={14} className="text-amber-500" /> Медальный зачет
        </h2>
      </div>

      <div className="space-y-1">
        {displayMedals.map((item, idx) => (
          <div
            key={item.country}
            className="flex items-center justify-between p-2 rounded-2xl hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-muted-foreground/50 w-4 italic">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="text-xl leading-none">{item.flag}</span>
              <span className="text-sm font-black tracking-tight">
                {item.country}
              </span>
            </div>
            <div className="flex gap-4 font-mono font-black text-sm">
              <span className="text-amber-500 w-3 text-center">
                {item.gold}
              </span>
              <span className="text-slate-400 w-3 text-center">
                {item.silver}
              </span>
              <span className="text-orange-400 w-3 text-center">
                {item.bronze}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Кнопка "Весь список" - показываем только если showLink=true */}
      {showLink && (
        <Link
          href="/medals"
          className="group mt-6 flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-muted hover:bg-primary hover:text-white transition-all duration-300 text-[10px] font-black uppercase tracking-widest"
        >
          Полная таблица
          <ChevronRight
            size={12}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      )}
    </div>
  );
}
