// src/app/event/[slug]/page.tsx
import { getEvents } from "@/lib/events";
import { EventCard } from "@/components/EventCard";
import { MedalTable } from "@/components/MedalTable";
import { ChevronLeft, MapPin, Info, Share2, Calendar } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

// Генерация SEO мета-тегов
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvents().find((e) => e.slug === slug);
  if (!event) return { title: "Событие не найдено" };

  const title = `${event.sport_ru}: ${event.title_ru} — Олимпиада 2026`;
  return {
    title,
    description: `${event.description_ru || event.title_ru}. Прямая трансляция, время начала и подробности соревнований в Милане 2026.`,
    openGraph: {
      title,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const allEvents = getEvents();
  const event = allEvents.find((e) => e.slug === slug);

  if (!event) notFound();

  // 1. Формируем объект разметки
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${event.sport_ru}: ${event.title_ru}`,
    startDate: event.start,
    endDate: event.end,
    description: event.description_ru,
    location: {
      "@type": "Place",
      name: event.location,
      address: "Milan, Italy",
    },
    image: "https://olympics.viktoor.ru/og-image.jpg",
  };

  // Находим другие события в этот же день для блока рекомендаций
  const eventDate = event.start.split("T")[0];
  const similarEvents = allEvents
    .filter((e) => e.start.startsWith(eventDate) && e.id !== event.id)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary mb-10 transition-colors"
      >
        <ChevronLeft size={14} /> Назад к расписанию
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <main className="lg:col-span-8 space-y-10">
          {/* Главная карточка события */}
          <section>
            <EventCard event={event} />
          </section>

          {/* Детальное инфо для SEO */}
          <section className="bg-card border border-border rounded-[3rem] p-8 md:p-12 space-y-8">
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-2">
                <Info size={16} /> О событии
              </h2>
              <p className="text-xl font-medium leading-relaxed italic text-muted-foreground">
                {event.description_ru ||
                  "Информация о формате соревнований и участниках обновляется в реальном времени."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-border/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                    Локация
                  </div>
                  <div className="font-bold">{event.location}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-primary">
                  <Calendar size={24} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                    Дата проведения
                  </div>
                  <div className="font-bold">
                    {new Date(event.start).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Рекомендации */}
          <section className="space-y-6">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter">
              Другие старты <span className="text-primary">в этот день</span>
            </h3>
            <div className="space-y-4">
              {similarEvents.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </section>
        </main>

        {/* <aside className="lg:col-span-4 space-y-8">
          <MedalTable />
          <div className="sticky top-28 p-8 rounded-[2.5rem] bg-primary text-white text-center">
            <h4 className="text-lg font-black uppercase italic mb-4">
              Нужна помощь?
            </h4>
            <p className="text-sm opacity-80 mb-6">
              Следите за обновлениями в нашем Telegram канале или пишите нам на
              почту.
            </p>
            <button className="w-full py-4 bg-white text-primary rounded-2xl font-black uppercase text-[10px] tracking-widest">
              Связаться с нами
            </button>
          </div>
        </aside> */}
      </div>
    </div>
  );
}
