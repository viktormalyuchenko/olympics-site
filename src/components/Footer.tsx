import Link from "next/link";
import {
  Mail,
  Globe,
  ExternalLink,
  Zap,
  ShieldCheck,
  MapPin,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Колонка 1: О проекте */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-lg">
                M
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black italic uppercase tracking-tighter">
                  Milano<span className="text-primary">2026</span>
                </span>
                <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-[0.3em] mt-1">
                  by viktoor.ru
                </span>
              </div>
            </Link>
            <p className="text-xs text-muted-foreground font-medium leading-relaxed">
              Независимый сервис расписания зимних Олимпийских игр 2026. Мы
              объединяем данные о стартах, трансляциях и атлетах в одном удобном
              интерфейсе.
            </p>
            <div className="flex items-center gap-4 text-muted-foreground">
              <Link
                href="mailto:admin@viktoor.ru"
                className="hover:text-primary transition-colors"
              >
                <Mail size={18} />
              </Link>
              <a
                href="https://viktoor.ru"
                target="_blank"
                className="hover:text-primary transition-colors"
              >
                <Globe size={18} />
              </a>
            </div>
          </div>

          {/* Колонка 2: Навигация */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground mb-6">
              Сервис
            </h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary transition-all flex items-center gap-2"
                >
                  Расписание
                </Link>
              </li>
              <li>
                <Link
                  href="/athletes"
                  className="hover:text-primary transition-all flex items-center gap-2"
                >
                  Наши атлеты (AIN)
                </Link>
              </li>
              <li>
                <Link
                  href="/medals"
                  className="hover:text-primary transition-all flex items-center gap-2"
                >
                  Медальный зачет
                </Link>
              </li>
              <li>
                <Link
                  href="/watch"
                  className="text-primary hover:opacity-80 transition-all flex items-center gap-2 tracking-[0.1em]"
                >
                  Где смотреть <Zap size={10} fill="currentColor" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 3: Информация (Новое!) */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground mb-6">
              Информация
            </h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <li>
                <Link
                  href="/info/ain"
                  className="hover:text-primary transition-all flex items-center gap-2"
                >
                  <ShieldCheck size={12} /> О статусе AIN
                </Link>
              </li>
              <li>
                <Link
                  href="/info/venues"
                  className="hover:text-primary transition-all flex items-center gap-2"
                >
                  <MapPin size={12} /> Арены Олимпиады
                </Link>
              </li>
              <li>
                <a
                  href="https://okko.sport/sport"
                  target="_blank"
                  className="hover:text-primary transition-all flex items-center gap-2"
                >
                  Трансляции в РФ <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://qazsporttv.kz/ru/live"
                  target="_blank"
                  className="hover:text-primary transition-all flex items-center gap-2 text-cyan-600"
                >
                  Трансляции в КЗ <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Колонка 4: Дисциплины (SEO) */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground mb-6">
              Дисциплины
            </h4>
            <div className="grid grid-cols-2 gap-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground">
              <Link
                href="/?sport=Хоккей"
                className="hover:text-primary transition-colors"
              >
                Хоккей
              </Link>
              <Link
                href="/?sport=Биатлон"
                className="hover:text-primary transition-colors"
              >
                Биатлон
              </Link>
              <Link
                href="/?sport=Керлинг"
                className="hover:text-primary transition-colors"
              >
                Керлинг
              </Link>
              <Link
                href="/?sport=Сноуборд"
                className="hover:text-primary transition-colors"
              >
                Сноуборд
              </Link>
              <Link
                href="/?sport=Фигурное катание"
                className="hover:text-primary transition-colors"
              >
                Фигурное
              </Link>
              <Link
                href="/?sport=Бобслей"
                className="hover:text-primary transition-colors"
              >
                Бобслей
              </Link>
            </div>
          </div>
        </div>

        {/* Дисклеймер и Копирайт */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="max-w-2xl text-center md:text-left">
            <p className="text-[9px] text-muted-foreground font-medium leading-relaxed uppercase tracking-wider">
              Дисклеймер: olympics.viktoor.ru является независимым
              информационным ресурсом. Все права на использование олимпийской
              символики принадлежат их законным владельцам. Мы не являемся
              официальным вещателем и не несем ответственности за содержание
              внешних ссылок.
            </p>
          </div>
          <div className="whitespace-nowrap">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground">
              © {currentYear} VIKTOOR.RU
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
