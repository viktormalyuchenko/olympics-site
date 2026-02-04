import { MedalTable } from "@/components/MedalTable";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = {
  title: "Медальный зачет Олимпиады 2026 — Все страны",
  description:
    "Таблица медалей зимних Олимпийских игр 2026 в Милане. Узнайте, какая страна лидирует в общем зачете.",
};

export default function MedalsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary mb-8 transition-colors"
      >
        <ChevronLeft size={14} /> Назад к расписанию
      </Link>

      <header className="mb-12">
        <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4">
          Медальный <span className="text-primary">зачет</span>
        </h1>
        <p className="text-muted-foreground font-medium">
          Общий зачет зимних Олимпийских игр 2026. Данные обновляются в реальном
          времени.
        </p>
      </header>

      {/* Показываем до 100 стран и скрываем ссылку на саму себя */}
      <MedalTable limit={100} showLink={false} />

      <div className="mt-12 p-8 rounded-[2.5rem] bg-muted/50 border border-dashed border-border text-center">
        <p className="text-xs text-muted-foreground font-medium leading-relaxed">
          Система зачета: Места распределяются по количеству золотых медалей.{" "}
          <br />
          При равенстве золота учитывается серебро, затем бронза.
        </p>
      </div>
    </div>
  );
}
