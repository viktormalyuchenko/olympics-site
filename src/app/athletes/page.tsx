import fs from "fs";
import path from "path";
import Link from "next/link";
import { ChevronRight, User } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Наши атлеты (AIN) на Олимпиаде 2026 — Состав и расписание",
  description:
    "Список нейтральных атлетов (AIN) из России, допущенных к зимним Олимпийским играм 2026 в Милане. Профили спортсменов и их личные календари.",
};

function getAthletes() {
  const filePath = path.join(process.cwd(), "data", "athletes.json");
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export default function AthletesPage() {
  const athletes = getAthletes();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-16 text-center">
        <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
          Индивидуальные нейтральные атлеты
        </span>
        <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mt-4 mb-6">
          Команда <span className="text-primary">AIN</span>
        </h1>
        <p className="max-w-2xl mx-auto text-muted-foreground font-medium text-lg leading-relaxed">
          В 2026 году 13 спортсменов получили допуск в нейтральном статусе.
          Следите за их стартами и болейте за лучших.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {athletes.map((athlete: any) => (
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
