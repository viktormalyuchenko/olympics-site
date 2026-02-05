// src/app/page.tsx
import { getEvents } from "@/lib/events";
import { EventCard } from "@/components/EventCard";
import { DayNav } from "@/components/DayNav";
import { MedalTable } from "@/components/MedalTable";
import { Tv, Search, Filter, Zap, Info } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { AINWidget } from "@/components/AINWidget";

interface PageProps {
  searchParams: Promise<{
    date?: string;
    sport?: string;
    gender?: string;
  }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const { date, sport, gender } = params;

  const allEvents = getEvents();
  const dates = Array.from(
    new Set(allEvents.map((e) => e.start.split("T")[0])),
  ).sort();

  // 1. Определяем текущую дату и выбранную дату
  const todayISO = new Date().toLocaleDateString("en-CA", {
    timeZone: "Europe/Moscow",
  });
  const selectedDate = date || (dates.includes(todayISO) ? todayISO : dates[0]);

  // 2. БАЗОВАЯ ФИЛЬТРАЦИЯ (по дате, спорту и полу)
  const allFilteredEvents = allEvents.filter((e) => {
    const matchDate = e.start.startsWith(selectedDate);
    const eventSport = e.sport_ru || e.sport_en;
    const matchSport = sport ? eventSport === sport : true;
    const matchGender = gender ? e.gender === gender : true;
    return matchDate && matchSport && matchGender;
  });

  // 3. ГРУППИРОВКА ФИЛЬТРОВАННЫХ СОБЫТИЙ
  const now = new Date();

  const liveEvents = allFilteredEvents.filter((e) => {
    const start = new Date(e.start);
    const end = new Date(e.end);
    return now >= start && now <= end;
  });

  const upcomingEvents = allFilteredEvents.filter((e) => {
    const start = new Date(e.start);
    return now < start;
  });

  const completedEvents = allFilteredEvents.filter((e) => {
    const end = new Date(e.end);
    return now > end;
  });

  const sports = Array.from(
    new Set(allEvents.map((e) => e.sport_ru || e.sport_en)),
  )
    .filter(Boolean)
    .sort();

  // Проверяем, смотрим ли мы "сегодняшний" день
  const isToday =
    selectedDate ===
    new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Moscow" });

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

          {/* ЛОГИКА ОТОБРАЖЕНИЯ СПИСКОВ */}
          {allFilteredEvents.length > 0 ? (
            <div className="space-y-12">
              {/* 1. СЕКЦИЯ LIVE */}
              {liveEvents.length > 0 && (
                <section className="space-y-4">
                  <div className="flex items-center gap-2 px-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
                      Сейчас в эфире
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {liveEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </section>
              )}

              {/* 2. СЕКЦИЯ ПРЕДСТОЯЩИЕ */}
              {upcomingEvents.length > 0 && (
                <section className="space-y-4">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-2">
                    {liveEvents.length > 0
                      ? "Далее сегодня"
                      : "Ближайшие старты"}
                  </h2>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </section>
              )}

              {/* 3. СЕКЦИЯ ЗАВЕРШЕННЫЕ */}
              {completedEvents.length > 0 && (
                <section className="pt-10 border-t border-dashed border-border">
                  <details className="group">
                    <summary className="list-none cursor-pointer flex items-center justify-between px-2 text-muted-foreground hover:text-foreground transition-colors">
                      <h2 className="text-[10px] font-black uppercase tracking-[0.2em]">
                        Завершенные события ({completedEvents.length})
                      </h2>
                      <span className="text-[10px] font-black group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>
                    <div className="mt-6 space-y-4 opacity-60 grayscale-[0.4] hover:opacity-100 hover:grayscale-0 transition-all">
                      {completedEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  </details>
                </section>
              )}
            </div>
          ) : (
            /* ЛОГИКА "НИЧЕГО НЕ НАЙДЕНО" */
            <div className="py-32 text-center bg-card border-2 border-dashed border-border rounded-[3rem]">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4 text-muted-foreground">
                <Search size={24} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight">
                Ничего не найдено
              </h3>
              <p className="text-muted-foreground text-sm mt-2 font-medium">
                Попробуйте сбросить фильтры или выбрать другую дату
              </p>
              <Link
                href="/"
                className="mt-6 inline-block text-primary font-black uppercase text-xs hover:underline tracking-widest"
              >
                Сбросить все фильтры
              </Link>
            </div>
          )}
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
          <AINWidget />

          {/* Инфо-карточка */}
          <div className="bg-card border border-border rounded-[2.5rem] p-8">
            <h4 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-muted-foreground">
              <Info size={14} className="text-primary" /> Полезная информация
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/watch"
                  className="flex items-center justify-between text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors group"
                >
                  Где смотреть LIVE{" "}
                  <Zap size={14} className="group-hover:animate-bounce" />
                </Link>
              </li>
              <li>
                <Link
                  href="/info/ain"
                  className="flex items-center justify-between text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors group"
                >
                  Как болеть за AIN{" "}
                  <span className="opacity-0 group-hover:opacity-100">🇷🇺</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/info/venues"
                  className="flex items-center justify-between text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors group"
                >
                  Арены Олимпиады{" "}
                  <span className="opacity-0 group-hover:opacity-100">🇮🇹</span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

interface PageProps {
  searchParams: Promise<{
    date?: string;
    sport?: string;
    gender?: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const { date, sport, gender } = params;

  // 1. ПОДГОТОВКА ДАННЫХ
  const baseUrl = "https://olympics.viktoor.ru";
  const formattedDate = date
    ? new Date(date).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
      })
    : "";

  const sportTitle = sport ? `${sport}: ` : "";
  const genderTitle =
    gender === "men" ? "мужчины " : gender === "women" ? "женщины " : "";

  // 2. ФОРМИРУЕМ TITLE И DESCRIPTION
  let title = "";
  let description = "";

  if (!date && !sport) {
    title =
      "Олимпиада 2026: Расписание зимних Олимпийских игр в Милане, трансляции и результаты";
    description =
      "Полное расписание зимней Олимпиады 2026 в Милане и Кортине. Следите за медальным зачетом, результатами выступлений атлетов и прямыми трансляциями онлайн на viktoor.ru.";
  } else if (sport && !date) {
    title = `${sport}: ${genderTitle}расписание на Олимпиаде 2026, результаты и трансляции`;
    description = `Смотреть онлайн ${sport.toLowerCase()} на зимних Олимпийских играх 2026. Полный календарь соревнований ${genderTitle}и результаты заездов в Италии.`;
  } else {
    title = `${sportTitle}${genderTitle}Расписание Олимпиады 2026 на ${formattedDate} — Календарь игр`;
    description = `Все события Олимпиады 2026 на ${formattedDate}. Время начала ${sport ? sport.toLowerCase() : "соревнований"}, кто выступает и где смотреть трансляции онлайн.`;
  }

  // 3. ФОРМИРУЕМ KEYWORDS (для Яндекса)
  const keywords = [
    "олимпиада 2026",
    "расписание",
    "милан кортина",
    "результаты",
    "трансляции",
    "смотреть онлайн",
    sport,
    gender === "men" ? "мужчины" : gender === "women" ? "женщины" : null,
  ].filter(Boolean) as string[];

  // 4. СБОРКА ИТОГОВОГО ОБЪЕКТА
  return {
    title,
    description,
    keywords: keywords.join(", "),

    // Каноническая ссылка (защита от дублей контента)
    alternates: {
      canonical: sport
        ? `${baseUrl}/?sport=${encodeURIComponent(sport)}`
        : date
          ? `${baseUrl}/?date=${date}`
          : baseUrl,
    },

    // Соцсети (OpenGraph) - как ссылка будет выглядеть в Telegram/VK
    openGraph: {
      title,
      description,
      url: baseUrl,
      siteName: "Олимпиада 2026 — Milano Cortina",
      locale: "ru_RU",
      type: "website",
      images: [
        {
          url: "/og-image.jpg", // Ссылка на вашу картинку в public
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    // Карточка для Twitter (X)
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },

    // Запрет индексации мусорных страниц (например, если параметров слишком много)
    robots: {
      index: true,
      follow: true,
      nocache: true,
    },
  };
}
