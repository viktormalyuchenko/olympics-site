import Link from "next/link";
import { Mail, Github, ExternalLink, Globe } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const sports = [
    "Хоккей",
    "Фигурное катание",
    "Биатлон",
    "Лыжные гонки",
    "Керлинг",
    "Сноуборд",
  ];

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Колонка 1: О проекте */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-white font-black text-sm">
                M
              </div>
              <span className="text-lg font-black italic uppercase tracking-tighter">
                Milano<span className="text-primary">2026</span>
              </span>
            </Link>
            <p className="text-xs text-muted-foreground font-medium leading-relaxed">
              Независимый агрегатор расписания и результатов зимних Олимпийских
              игр 2026 года. Мы помогаем болельщикам следить за любимыми
              атлетами в удобном формате.
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
              Навигация
            </h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Расписание
                </Link>
              </li>
              <li>
                <Link
                  href="/athletes"
                  className="hover:text-primary transition-colors"
                >
                  Наши атлеты
                </Link>
              </li>
              <li>
                <Link
                  href="/medals"
                  className="hover:text-primary transition-colors"
                >
                  Медальный зачет
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 3: Популярные виды (SEO) */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground mb-6">
              Дисциплины
            </h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {sports.map((sport) => (
                <li key={sport}>
                  <Link
                    href={`/?sport=${encodeURIComponent(sport)}`}
                    className="hover:text-primary transition-colors"
                  >
                    {sport}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Колонка 4: Полезные ссылки */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground mb-6">
              Ресурсы
            </h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <li>
                <a
                  href="https://okko.sport/sport"
                  target="_blank"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  Трансляции Okko <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://olympics.com"
                  target="_blank"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  Official Site <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Нижняя часть: Дисклеймер и Копирайт */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-[9px] text-muted-foreground font-medium leading-relaxed uppercase tracking-wider">
              Дисклеймер: Данный сайт является неофициальным сервисом. Все права
              на товарные знаки, логотипы и символику принадлежат их законным
              владельцам (IOC/ОКР). Информация предоставляется исключительно в
              ознакомительных целях.
            </p>
          </div>
          <div className="text-right whitespace-nowrap">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground">
              © {currentYear} viktoor.ru
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
