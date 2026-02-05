import { MapPin, Mountain, Building2, Snowflake } from "lucide-react";

export const metadata = {
  title: "Арены и стадионы Олимпиады 2026: Милан, Кортина и другие кластеры",
  description:
    "Обзор локаций зимних Олимпийских игр 2026. Где пройдут хоккейные матчи, биатлонные гонки и фигурное катание в Италии.",
};

export default function VenuesPage() {
  const venues = [
    {
      cluster: "Милан (Milano)",
      items: [
        { name: "San Siro", sport: "Церемония открытия", icon: Building2 },
        { name: "PalaItalia", sport: "Хоккей (мужчины)", icon: Building2 },
        {
          name: "Milano Ice Park",
          sport: "Фигурное катание, Шорт-трек",
          icon: Snowflake,
        },
      ],
    },
    {
      cluster: "Кортина-д’Ампеццо (Cortina)",
      items: [
        { name: "Olympia delle Tofane", sport: "Горные лыжи", icon: Mountain },
        {
          name: "Cortina Sliding Centre",
          sport: "Бобслей, Сани, Скелетон",
          icon: Snowflake,
        },
        { name: "Olympic Ice Stadium", sport: "Керлинг", icon: Building2 },
      ],
    },
    {
      cluster: "Антерсельва (Antholz)",
      items: [
        {
          name: "Südtirol Arena",
          sport: "Биатлон (легендарная трасса)",
          icon: Mountain,
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-12">
        Арены <span className="text-primary">Италии 2026</span>
      </h1>

      <div className="space-y-12">
        {venues.map((group, idx) => (
          <section key={idx}>
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary mb-6 flex items-center gap-4">
              {group.cluster}{" "}
              <div className="h-[1px] bg-primary/20 flex-1"></div>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.items.map((v, i) => (
                <div
                  key={i}
                  className="p-6 bg-card border border-border rounded-3xl flex items-center gap-5 hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center text-muted-foreground shrink-0">
                    <v.icon size={24} />
                  </div>
                  <div>
                    <div className="text-lg font-black italic uppercase leading-none mb-1">
                      {v.name}
                    </div>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      {v.sport}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 p-8 bg-slate-900 rounded-[3rem] text-white">
        <h3 className="text-xl font-black uppercase italic mb-4">
          География Игр
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed font-medium">
          Олимпиада 2026 года станет одной из самых распределенных в истории.
          Общая площадь кластеров охватывает более 22 000 квадратных километров.
          Это сделано для использования уже существующих арен и минимизации
          вреда экологии Альп.
        </p>
      </div>
    </div>
  );
}
