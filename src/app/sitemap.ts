import { MetadataRoute } from "next";
import { getEvents } from "@/lib/events";
import fs from "fs";
import path from "path";

export default function sitemap(): MetadataRoute.Sitemap {
  const events = getEvents();
  const athletes = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "data/athletes.json"), "utf8"),
  );
  const baseUrl = "https://olympics.viktoor.ru";

  // Главные страницы
  const routes = ["", "/athletes", "/medals"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "hourly" as const,
    priority: 1,
  }));

  // Страницы атлетов
  const athleteRoutes = athletes.map((a: any) => ({
    url: `${baseUrl}/athletes/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  // Страницы событий (если решите их создать)
  const eventRoutes = events.map((e: any) => ({
    url: `${baseUrl}/event/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "hourly" as const,
    priority: 0.6,
  }));

  return [...routes, ...athleteRoutes, ...eventRoutes];
}
