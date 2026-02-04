// src/lib/events.ts
import fs from "fs";
import path from "path";

export interface Team {
  code: string;
  name: string;
}

export interface OlympicEvent {
  id: string;
  slug: string;
  sport_en: string;
  sport_ru: string;
  title_en: string;
  title_ru: string;
  description_ru: string;
  gender: "men" | "women" | "mixed";
  start: string;
  end: string;
  location: string;
  isMedal: boolean;
  type: "match" | "event";
  stream_url: string;
  teams: Team[];
}

export function getEvents(): OlympicEvent[] {
  const jsonPath = path.join(process.cwd(), "data", "schedule.json");

  if (!fs.existsSync(jsonPath)) {
    console.error("JSON файл не найден!");
    return [];
  }

  try {
    const data = fs.readFileSync(jsonPath, "utf-8");
    const events: OlympicEvent[] = JSON.parse(data);
    // Сортируем по времени на всякий случай
    return events.sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
    );
  } catch (e) {
    console.error("Ошибка парсинга JSON", e);
    return [];
  }
}
