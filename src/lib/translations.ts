export const sportTranslations: Record<string, string> = {
  "Alpine Skiing": "Горнолыжный спорт",
  Biathlon: "Биатлон",
  Bobsleigh: "Бобслей",
  "Cross-Country Skiing": "Лыжные гонки",
  Curling: "Керлинг",
  "Figure Skating": "Фигурное катание",
  "Freestyle Skiing": "Фристайл",
  "Ice Hockey": "Хоккей с шайбой",
  Luge: "Санный спорт",
  "Nordic Combined": "Лыжное двоеборье",
  "Short Track Speed Skating": "Шорт-трек",
  Skeleton: "Скелетон",
  "Ski Jumping": "Прыжки с трамплина",
  Snowboard: "Сноуборд",
  "Speed Skating": "Конькобежный спорт",
  "Opening Ceremony": "Церемония открытия",
  "Closing Ceremony": "Церемония закрытия",
};

export function translateSummary(text: string): string {
  if (!text) return "";

  return text
    .replace(/Men's/g, "Мужчины")
    .replace(/Women's/g, "Женщины")
    .replace(/Men/g, "Мужчины")
    .replace(/Women/g, "Женщины")
    .replace(/Finals/g, "Финал 🥇")
    .replace(/Final/g, "Финал 🥇")
    .replace(/Quarter-final/g, "1/4 финала")
    .replace(/Semi-final/g, "1/2 финала")
    .replace(/Gold Medal Game/g, "Матч за золотую медаль 🥇")
    .replace(/Bronze Medal Game/g, "Матч за бронзу 🥉")
    .replace(/Mixed Team/g, "Смешанные команды")
    .replace(/Qualification/g, "Квалификация")
    .replace(/Run 1/g, "1-й заезд")
    .replace(/Run 2/g, "2-й заезд")
    .replace(/Group A/g, "Группа А")
    .replace(/Group B/g, "Группа B")
    .replace(/Preliminary Round/g, "Предварительный раунд")
    .replace(/Opening Ceremony/g, "Церемония открытия")
    .replace(/Closing Ceremony/g, "Церемония закрытия");
}
