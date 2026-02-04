// src/app/page.tsx
import { getEvents } from "@/lib/events";
import { EventCard } from "@/components/EventCard";
import { DayNav } from "@/components/DayNav";
import { MedalTable } from "@/components/MedalTable";
import { Tv, Search, Filter } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface PageProps {
  searchParams: Promise<{
    date?: string;
    sport?: string;
    gender?: string;
  }>;
}

export default async function Home({ searchParams }: PageProps) {
  // 1. Разворачиваем параметры поиска (Next.js 16)
  const params = await searchParams;
  const { date, sport, gender } = params;

  // 2. Получаем все события из JSON
  const allEvents = getEvents();

  // 3. Собираем данные для фильтров
  const sports = Array.from(new Set(allEvents.map((e) => e.sport_ru)))
    .filter(Boolean)
    .sort();
  const dates = Array.from(
    new Set(allEvents.map((e) => e.start.split("T")[0])),
  ).sort();

  // 4. Логика фильтрации
  const selectedDate = date || (dates.length > 0 ? dates[0] : "2026-02-06");

  const filteredEvents = allEvents.filter((e) => {
    const matchDate = e.start.startsWith(selectedDate);
    const matchSport = sport ? e.sport_ru === sport : true;
    const matchGender = gender ? e.gender === gender : true;
    return matchDate && matchSport && matchGender;
  });

  // 5. Динамические SEO данные
  const pageTitle = sport
    ? `${sport} — расписание Олимпиады 2026`
    : `Расписание Олимпиады на ${new Date(selectedDate).getDate()} февраля`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
      {/* СЕКЦИЯ ФИЛЬТРОВ */}
      <section className="mb-10 space-y-6">
        {/* Виды спорта (Чипсы с горизонтальным скроллом) */}
        <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar">
          <Link
            href={`/?date=${selectedDate}${gender ? `&gender=${gender}` : ""}`}
            className={`shrink-0 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
              !sport
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                : "bg-card border-border hover:border-primary/40"
            }`}
          >
            Все дисциплины
          </Link>
          {sports.map((s) => (
            <Link
              key={s}
              href={`/?sport=${encodeURIComponent(s)}&date=${selectedDate}${gender ? `&gender=${gender}` : ""}`}
              className={`shrink-0 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                sport === s
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                  : "bg-card border-border hover:border-primary/40"
              }`}
            >
              {s}
            </Link>
          ))}
        </div>

        {/* Навигация по дням (передаем sport и gender чтобы они не сбрасывались) */}
        <DayNav
          dates={dates}
          selectedDate={selectedDate}
          currentSport={sport}
          currentGender={gender}
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* ЛЕВАЯ КОЛОНКА: СПИСОК СОБЫТИЙ */}
        <main className="lg:col-span-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase leading-none">
                {pageTitle}
              </h1>
              <p className="text-muted-foreground mt-3 font-medium">
                Прямые трансляции и результаты соревнований в Милане.
              </p>
            </div>

            {/* Быстрый фильтр по полу */}
            <div className="flex bg-muted p-1 rounded-xl">
              {[
                { id: "", label: "Все" },
                { id: "men", label: "М" },
                { id: "women", label: "Ж" },
              ].map((g) => (
                <Link
                  key={g.id}
                  href={`/?date=${selectedDate}${sport ? `&sport=${sport}` : ""}${g.id ? `&gender=${g.id}` : ""}`}
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${
                    (gender || "") === g.id
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {g.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className="py-32 text-center bg-card border-2 border-dashed border-border rounded-[3rem]">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Search className="text-muted-foreground" size={24} />
                </div>
                <h3 className="text-xl font-black uppercase">
                  Ничего не найдено
                </h3>
                <p className="text-muted-foreground text-sm mt-2">
                  Попробуйте сбросить фильтры или выбрать другую дату
                </p>
                <Link
                  href="/"
                  className="mt-6 inline-block text-primary font-black uppercase text-xs hover:underline"
                >
                  Сбросить всё
                </Link>
              </div>
            )}
          </div>
        </main>

        {/* ПРАВАЯ КОЛОНКА: САЙДБАР */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Медальный зачет (уже работает с Google Sheets) */}
          <MedalTable limit={5} />

          {/* Промо Okko */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl shadow-slate-900/20">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-black tracking-widest mb-4 border border-primary/30">
                LIVE STREAM
              </span>
              <h3 className="text-2xl font-black italic uppercase mb-4 leading-tight">
                Смотри Олимпиаду <br />в прямом эфире
              </h3>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                Официальные трансляции всех дисциплин 2026 года эксклюзивно на
                Okko. Без рекламы и в 4K качестве.
              </p>
              <a
                href="https://okko.sport"
                target="_blank"
                className="flex items-center justify-center w-full py-4 bg-primary rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-primary/90 transition-all active:scale-95 shadow-xl shadow-primary/20"
              >
                Открыть трансляцию
              </a>
            </div>
          </div>

          {/* Инфо-карточка */}
          <div className="bg-card border border-border rounded-[2.5rem] p-8">
            <h4 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
              <Filter size={14} className="text-primary" /> Полезное
            </h4>
            <ul className="space-y-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
              <li className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                Как болеть за наших (AIN)
              </li>
              <li className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                Все арены Милана 2026
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const { date, sport, gender } = params;

  // Форматируем дату для заголовка
  const day = date ? new Date(date).getDate() : 5; // По умолчанию 5, если дата не выбрана
  const formattedDate = `${day} февраля`;

  // Логика формирования Title
  let title = "Расписание Олимпиады 2026 — Милан-Кортина";
  if (sport) {
    title = `${sport} на Олимпиаде 2026 — Расписание на ${formattedDate}`;
  } else {
    title = `Олимпиада 2026: Расписание соревнований на ${formattedDate}`;
  }

  // Логика формирования Description
  const genderText =
    gender === "men" ? "мужчин" : gender === "women" ? "женщин" : "";
  const description = `Следите за зимней Олимпиадой 2026 в Италии. ${sport || "Все виды спорта"} ${genderText}, расписание на ${formattedDate}, прямые трансляции, медальный зачет и результаты матчей в реальном времени.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://olympics.viktoor.ru/${sport ? `?sport=${encodeURIComponent(sport)}` : ""}`,
    },
    openGraph: {
      title,
      description,
      url: "https://olympics.viktoor.ru",
      siteName: "Олимпиада 2026 на viktoor.ru",
      locale: "ru_RU",
      type: "website",
      images: [
        {
          url: "/og-image.png", // Создайте простую картинку 1200x630
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
