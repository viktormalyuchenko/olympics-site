import fs from "fs";
import path from "path";
import Link from "next/link";
import { User, Filter, ChevronRight } from "lucide-react";
import { Metadata } from "next";
import { getFlagEmoji } from "@/lib/utils";

interface AthletesPageProps {
  searchParams: Promise<{ country?: string }>;
}

// 1. ДИНАМИЧЕСКОЕ SEO
export async function generateMetadata({
  searchParams,
}: AthletesPageProps): Promise<Metadata> {
  const { country } = await searchParams;

  if (country === "RU") {
    return {
      title: "Российские атлеты (AIN) на Олимпиаде 2026 — Расписание и состав",
      description:
        "Список и личные календари выступлений российских спортсменов, допущенных к зимним Олимпийским играм 2026 в нейтральном статусе.",
    };
  }

  if (country === "BY") {
    return {
      title: "Атлеты Беларуси (AIN) на Олимпиаде 2026 — Расписание и состав",
      description:
        "Следите за выступлениями белорусских спортсменов (Антон Смольский, Анна Сола и др.) на зимней Олимпиаде 2026. Полное расписание стартов.",
    };
  }

  return {
    title: "Наши атлеты на Олимпиаде 2026: Беларусь и Россия (AIN)",
    description:
      "Полный список нейтральных атлетов из России и Беларуси на зимних Олимпийских играх 2026. Расписание их стартов и биографии.",
  };
}

function getAthletes() {
  const filePath = path.join(process.cwd(), "data", "athletes.json");
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export default async function AthletesPage({
  searchParams,
}: AthletesPageProps) {
  const { country } = await searchParams;
  const allAthletes = getAthletes();

  const headerInfo = {
    "": {
      label: "Индивидуальные нейтральные атлеты",
      title: "Команда AIN",
      desc: "В 2026 году лучшие спортсмены получили допуск в нейтральном статусе. Следите за их стартами и болейте за лидеров зимних видов спорта.",
    },
    RU: {
      label: "Нейтральные атлеты из России",
      title: "Наши в Милане",
      desc: "Российские атлеты, выступающие в статусе AIN. Личное расписание Аделии Петросян, Петра Гуменника и других звезд фигурного катания и лыж.",
    },
    BY: {
      label: "Нейтральные атлеты из Беларуси",
      title: "Сборная Беларуси (AIN)",
      desc: "Белорусские лидеры мирового биатлона и фристайла. Следите за выступлениями Антона Смольского, Анны Солы и Анны Гуськовой.",
    },
  };

  const currentHeader =
    headerInfo[country as keyof typeof headerInfo] || headerInfo[""];

  // Фильтрация
  const filteredAthletes = country
    ? allAthletes.filter((a: any) => a.country === country)
    : allAthletes;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-16 text-center">
        <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
          {currentHeader.label}
        </span>
        <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mt-4 mb-6 leading-none">
          {country === "RU"
            ? "Россия"
            : country === "BY"
              ? "Беларусь"
              : "Команда"}{" "}
          <span className="text-primary">{country ? "" : "AIN"}</span>
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground font-medium text-lg leading-relaxed italic">
          {currentHeader.desc}
        </p>

        {/* ФИЛЬТР ПО СТРАНАМ */}
        <div className="flex flex-wrap justify-center gap-2 mt-12">
          {[
            { id: "", label: "Все", flag: "🌍" },
            { id: "RU", label: "Из РФ", flag: "RU" },
            { id: "BY", label: "Из Беларуси", flag: "BY" },
          ].map((c) => (
            <Link
              key={c.id}
              href={c.id ? `/athletes?country=${c.id}` : "/athletes"}
              className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all flex items-center gap-2 ${
                (country || "") === c.id
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                  : "bg-card border-border hover:border-primary/50"
              }`}
            >
              <span className="text-sm">
                {c.id ? getFlagEmoji(c.id) : "🌍"}
              </span>
              {c.label}
            </Link>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAthletes.map((athlete: any) => (
          <Link
            key={athlete.slug}
            href={`/athletes/${athlete.slug}`}
            className="group relative overflow-hidden rounded-[2.5rem] bg-card border border-border transition-all hover:shadow-2xl hover:-translate-y-2"
          >
            {/* Картинка */}
            <div className="aspect-[4/5] overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity" />
              {athlete.image ? (
                <img
                  src={athlete.image}
                  alt={athlete.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <User size={60} className="text-muted-foreground/20" />
                </div>
              )}

              <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary-foreground/70 mb-1">
                  {athlete.sport}
                </p>
                <h3 className="text-2xl font-black uppercase italic leading-none mb-4">
                  {athlete.name}
                </h3>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
                  Личное расписание <ChevronRight size={14} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <footer className="mt-20 p-10 rounded-[3rem] bg-muted/50 border border-dashed border-border text-center">
        <p className="text-sm text-muted-foreground font-medium max-w-xl mx-auto italic">
          Статус AIN (Individual Neutral Athlete) подразумевает выступление под
          нейтральным флагом и гимном. Медали атлетов не учитываются в общем
          командном зачете.
        </p>
      </footer>
    </div>
  );
}
