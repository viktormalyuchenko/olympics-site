import { ShieldCheck, Info, FlagOff, Music2 } from "lucide-react";

export const metadata = {
  title: "Кто такие атлеты AIN на Олимпиаде 2026: Правила и статус",
  description:
    "Разбор статуса Индивидуальных нейтральных атлетов (AIN) на зимних Олимпийских играх 2026. Почему нет флага, как проходил допуск и кто представляет команду.",
};

export default function AinPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-12">
        <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
          Инфо-центр
        </span>
        <h1 className="text-5xl font-black italic uppercase tracking-tighter mt-4 mb-6">
          Статус <span className="text-primary">AIN</span>
        </h1>
        <p className="text-xl text-muted-foreground font-medium leading-relaxed italic">
          Индивидуальные нейтральные атлеты (Individual Neutral Athletes) —
          статус, под которым на Играх в Италии выступают спортсмены из России и
          Беларуси.
        </p>
      </header>

      <div className="grid gap-6 mb-16">
        {[
          {
            icon: FlagOff,
            title: "Без флага и гимна",
            desc: "Спортсмены выступают под специально созданным флагом AIN. В случае победы исполняется нейтральный гимн без слов.",
          },
          {
            icon: ShieldCheck,
            title: "Строгий отбор",
            desc: "Допуск получали только те, кто не имеет связей с силовыми структурами и не высказывался в поддержку текущих конфликтов.",
          },
          {
            icon: Music2,
            title: "Форма и символика",
            desc: "На экипировке запрещена любая национальная символика. Цвета формы выбраны нейтральными (бирюзовый/белый).",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex gap-6 p-8 bg-card border border-border rounded-[2.5rem]"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
              <item.icon className="text-primary" size={28} />
            </div>
            <div>
              <h3 className="text-lg font-black uppercase mb-2 italic">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <section className="bg-muted/50 p-10 rounded-[3rem] border border-dashed border-border">
        <h2 className="text-2xl font-black uppercase italic mb-6">
          Как болеть за наших?
        </h2>
        <div className="prose prose-slate max-w-none text-muted-foreground font-medium leading-relaxed space-y-4">
          <p>
            Несмотря на отсутствие официального названия «Сборная России», все
            13 атлетов AIN — это лучшие представители своих видов спорта.
            Медали, завоеванные ими, не учитываются в официальном командном
            зачете, но они остаются важными достижениями для самих спортсменов и
            болельщиков.
          </p>
          <p>
            На нашем сайте вы можете найти{" "}
            <a href="/athletes" className="text-primary font-bold underline">
              индивидуальное расписание каждого атлета
            </a>
            , чтобы не пропустить их выступления.
          </p>
        </div>
      </section>
    </div>
  );
}
