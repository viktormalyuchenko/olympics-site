import { Tv, Zap, Globe, ExternalLink, AlertCircle, Info } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Где смотреть Олимпиаду 2026: Прямые трансляции в СНГ и Европе",
  description:
    "Список официальных каналов и онлайн-платформ для просмотра зимних Олимпийских игр 2026. Информация для России, Казахстана, Латвии, Литвы и других стран.",
};

export default function WatchPage() {
  const regions = [
    {
      country: "Россия",
      code: "RU",
      color: "bg-blue-600",
      channel: "Okko Спорт",
      desc: "Эксклюзивный вещатель на территории РФ. Трансляции всех дисциплин доступны бесплатно после регистрации.",
      url: "https://okko.sport/sport",
      btnText: "Открыть Okko",
    },
    {
      country: "Казахстан",
      code: "KZ",
      color: "bg-cyan-500",
      channel: "Qazsport / Qazaqstan",
      desc: "Национальные каналы обеспечивают полный охват игр с комментариями на казахском и русском языках.",
      url: "https://qazsporttv.kz/ru/live",
      btnText: "Смотреть Qazsport",
    },
    {
      country: "Беларусь",
      code: "BY",
      color: "bg-red-600",
      channel: "Olympics.com (Официально)",
      desc: "В связи с отсутствием прав у госТВ, основным легальным способом просмотра является прямой эфир на сайте МОК.",
      url: "https://olympics.com/en/live/",
      btnText: "Смотреть на МОК",
    },
  ];

  const balticAndOthers = [
    {
      country: "Латвия",
      channel: "LTV / LSM.lv",
      url: "https://www.lsm.lv/lv/",
    },
    {
      country: "Литва",
      channel: "LRT",
      url: "https://www.lrt.lt/mediateka/tiesiogiai/lrt-televizija",
    },
    {
      country: "Эстония",
      channel: "ERR / Jupiter",
      url: "https://jupiter.err.ee/otse",
    },
    { country: "Болгария", channel: "БНТ (BNT)", url: "https://bnt.bg/live" },
    {
      country: "Израиль и мир",
      code: "INT",
      color: "bg-indigo-600",
      channel: "Трансляции на русском",
      desc: "Для тех, кто находится за пределами СНГ, лучший способ — официальный плеер Olympics.com или использование VPN с российским IP для доступа к Okko.",
      url: "https://olympics.com/en/live/",
      btnText: "Смотреть везде",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <header className="mb-12">
        <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
          Live Центр
        </span>
        <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter mt-4 mb-6">
          Прямые <span className="text-primary">трансляции</span>
        </h1>
        <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl italic">
          Официальные способы просмотра зимней Олимпиады 2026 в зависимости от
          вашего местоположения.
        </p>
      </header>

      {/* Важное примечание */}
      <div className="mb-10 p-6 bg-amber-400/10 border border-amber-500/20 rounded-3xl flex items-start gap-4">
        <AlertCircle className="text-amber-600 shrink-0" size={24} />
        <p className="text-sm text-amber-800 font-bold leading-relaxed uppercase tracking-tight">
          Внимание: Прямые эфиры на сайтах телеканалов обычно доступны только
          жителям соответствующих стран (геоблокировка). Если вы находитесь за
          границей, используйте официальный плеер Olympics.com или VPN.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {regions.map((reg) => (
          <section
            key={reg.code}
            className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm group hover:border-primary/30 transition-all"
          >
            <div className="flex items-center gap-4 mb-6">
              <div
                className={`w-14 h-14 ${reg.color} rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg`}
              >
                {reg.code}
              </div>
              <div>
                <h2 className="text-2xl font-black uppercase italic leading-none mb-1">
                  {reg.country}
                </h2>
                <span className="text-xs font-bold text-primary uppercase tracking-widest">
                  {reg.channel}
                </span>
              </div>
            </div>
            <p className="text-muted-foreground mb-8 text-sm font-medium leading-relaxed">
              {reg.desc}
            </p>
            <a
              href={reg.url}
              target="_blank"
              className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-[1.02] transition-transform shadow-xl shadow-primary/20"
            >
              {reg.btnText} <Zap size={14} fill="currentColor" />
            </a>
          </section>
        ))}
      </div>

      {/* Другие страны */}
      <section className="bg-card border border-border rounded-[2.5rem] p-8 md:p-12 mb-12">
        <h3 className="text-2xl font-black italic uppercase mb-8 flex items-center gap-3">
          <Globe className="text-primary" /> Балтия и Восточная Европа
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {balticAndOthers.map((item) => (
            <a
              key={item.country}
              href={item.url}
              target="_blank"
              className="flex items-center justify-between p-5 bg-muted/50 rounded-2xl hover:bg-primary hover:text-white transition-all group"
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100">
                  {item.country}
                </span>
                <span className="font-bold">{item.channel}</span>
              </div>
              <ExternalLink
                size={16}
                className="opacity-40 group-hover:opacity-100"
              />
            </a>
          ))}
        </div>
      </section>

      {/* Технический совет */}
      <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group">
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center shrink-0">
            <Tv size={40} className="text-primary" />
          </div>
          <div>
            <h4 className="text-2xl font-black uppercase italic mb-2 leading-tight">
              Трансляции на официальном сайте
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Международный олимпийский комитет (МОК) предоставляет доступ к
              прямым эфирам на сайте <b>Olympics.com</b> в тех регионах, где не
              проданы эксклюзивные права. Это отличный способ смотреть редкие
              дисциплины, которые не показывают по ТВ.
            </p>
            <Link
              href="https://olympics.com/en/live/"
              target="_blank"
              className="inline-flex items-center gap-2 mt-6 text-primary font-black uppercase text-xs hover:underline tracking-widest"
            >
              Перейти в плеер МОК <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Вспомогательный компонент иконки, если не импортирован выше
function ChevronRight({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
