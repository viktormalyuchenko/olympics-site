import { getEvents } from "@/lib/events";
import { EventCard } from "@/components/EventCard";
import fs from "fs";
import path from "path";
import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, User } from "lucide-react";

// Типизация для Next.js 15/16
interface AthletePageProps {
  params: Promise<{ slug: string }>;
}

function getAthletes() {
  const filePath = path.join(process.cwd(), "data", "athletes.json");
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export async function generateMetadata({
  params,
}: AthletePageProps): Promise<Metadata> {
  const { slug } = await params;
  const athlete = getAthletes().find((a: any) => a.slug === slug);
  return {
    title: `${athlete?.name || "Атлет"} на Олимпиаде 2026 — Расписание`,
    description: `Следите за выступлениями ${athlete?.name} на зимних Олимпийских играх.`,
  };
}

export default async function AthletePage({ params }: AthletePageProps) {
  // 1. Ждем параметры (Критически важно!)
  const { slug } = await params;

  const athletes = getAthletes();
  const athlete = athletes.find((a: any) => a.slug === slug);
  const allEvents = getEvents();

  if (!athlete) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Спортсмен не найден</h1>
        <Link
          href="/athletes"
          className="text-primary hover:underline mt-4 block"
        >
          Вернуться к списку
        </Link>
      </div>
    );
  }

  const athleteEvents = allEvents.filter((event) => {
    // 1. Проверяем совпадение по тегам (Вид спорта)
    const matchTag = athlete.tags.some(
      (tag: string) =>
        event.sport_en.toLowerCase().includes(tag.toLowerCase()) ||
        event.title_en.toLowerCase().includes(tag.toLowerCase()),
    );

    // 2. Умная проверка по полу
    // Если атлет женщина, показываем только 'women' и 'mixed'. Если мужчина — 'men' и 'mixed'.
    const isFemale =
      athlete.slug.includes("petrosian") ||
      athlete.slug.includes("pantrina") ||
      athlete.slug.includes("shevchenko") ||
      athlete.slug.includes("faleeva") ||
      athlete.slug.includes("efremenkova");
    const athleteGender = isFemale ? "women" : "men";

    const matchGender =
      event.gender === athleteGender || event.gender === "mixed";

    return matchTag && matchGender;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link
        href="/athletes"
        className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary mb-10"
      >
        <ChevronLeft size={14} /> Все атлеты
      </Link>

      <header className="mb-12 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
        <div className="w-48 h-48 rounded-[3rem] bg-muted overflow-hidden border-4 border-primary/20 shadow-2xl shrink-0">
          {athlete.image ? (
            <img
              src={athlete.image}
              alt={athlete.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-200">
              <User size={64} className="text-slate-400" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
            Нейтральный атлет (AIN)
          </span>
          <h1 className="text-5xl font-black uppercase italic tracking-tighter mt-4 mb-4">
            {athlete.name}
          </h1>
          <p className="text-muted-foreground font-medium leading-relaxed italic">
            {athlete.bio}
          </p>
        </div>
      </header>

      <section className="mt-16">
        <h2 className="text-sm font-black uppercase tracking-[0.3em] text-muted-foreground mb-8 border-b pb-4 flex items-center gap-2">
          Личный календарь стартов
        </h2>

        <div className="space-y-4">
          {athleteEvents.length > 0 ? (
            athleteEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div className="p-10 text-center bg-muted/30 rounded-[2rem] border-2 border-dashed">
              <p className="text-muted-foreground font-bold italic">
                Событий для данного атлета пока не найдено в общем расписании
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
