// convert_v8.mjs
import ical from "ical.js";
import fs from "fs";
import slugify from "slugify";

const ICS_FILE = "./data/schedule.ics";
const JSON_FILE = "./data/schedule_raw.json";

const removeEmojis = (str) =>
  str.replace(/[\u1000-\uFFFF]|[^\x00-\x7F]/g, "").trim();

const knownSports = [
  "Ice Hockey",
  "Curling",
  "Biathlon",
  "Figure Skating",
  "Alpine Skiing",
  "Cross-Country Skiing",
  "Snowboard",
  "Ski Jumping",
  "Skeleton",
  "Luge",
  "Bobsleigh",
  "Short Track",
  "Speed Skating",
  "Freestyle Skiing",
];

function convert() {
  console.log("🚀 Конвертация v8 (With Descriptions & End Times)...");

  const icsData = fs.readFileSync(ICS_FILE, "utf-8");
  const jcalData = ical.parse(icsData);
  const comp = new ical.Component(jcalData);
  const vevents = comp.getAllSubcomponents("vevent");

  const finalEvents = [];

  vevents.forEach((vevent) => {
    const ev = new ical.Event(vevent);
    const summary = ev.summary || "";
    const description = ev.description || ""; // ДОСТАЕМ ОПИСАНИЕ

    let sportEn = "Other";
    let body = summary;

    for (const s of knownSports) {
      if (summary.toLowerCase().includes(s.toLowerCase())) {
        sportEn = s;
        body = summary
          .replace(new RegExp(`${s}\\s*[:\\-—/]?\\s*`, "i"), "")
          .trim();
        break;
      }
    }

    let gender = "mixed";
    const lowSummary = summary.toLowerCase();
    if (
      lowSummary.includes("women") ||
      lowSummary.includes(" w ") ||
      lowSummary.includes(" w/")
    )
      gender = "women";
    else if (
      lowSummary.includes("men") ||
      lowSummary.includes(" m ") ||
      lowSummary.includes(" m/")
    )
      gender = "men";

    const processItem = (titleText, index = null) => {
      const cleanTitle = removeEmojis(titleText);
      const cleanSport = removeEmojis(sportEn);

      let slugSource = cleanTitle
        .toLowerCase()
        .startsWith(cleanSport.toLowerCase())
        ? cleanTitle
        : `${cleanSport} ${cleanTitle}`;

      const eventSlug = slugify(slugSource, { lower: true, strict: true });
      const isMatch = ["vs", "Final", "Play-off", "Medal"].some((kw) =>
        cleanTitle.includes(kw),
      );

      return {
        id: index !== null ? `${ev.uid}-${index}` : ev.uid,
        slug: eventSlug,
        sport_en: cleanSport,
        sport_ru: "",
        title_en: cleanTitle,
        title_ru: "",
        description_en: description.trim(), // ОРИГИНАЛЬНОЕ ОПИСАНИЕ
        description_ru: "", // ДЛЯ ЧАТА
        gender: gender,
        start: ev.startDate.toJSDate().toISOString(),
        end: ev.endDate.toJSDate().toISOString(), // ВРЕМЯ ЗАВЕРШЕНИЯ
        location: ev.location || "Milan/Cortina",
        isMedal: /🥇|Gold|Final/i.test(summary),
        type: isMatch ? "match" : "event",
        stream_url: "",
        teams: isMatch
          ? [
              { code: "", name: "" },
              { code: "", name: "" },
            ]
          : [],
      };
    };

    if (body.includes(" vs ") && body.includes(" / ")) {
      const parts = body.split(" / ");
      const prefix = parts.filter((p) => !p.includes(" vs ")).join(" / ");
      const matchups = parts.filter((p) => p.includes(" vs "));

      matchups.forEach((m, idx) => {
        const fullItemTitle = prefix ? `${prefix} / ${m}` : m;
        finalEvents.push(processItem(fullItemTitle, idx));
      });
    } else {
      finalEvents.push(processItem(body));
    }
  });

  fs.writeFileSync(JSON_FILE, JSON.stringify(finalEvents, null, 2), "utf-8");
  console.log(`✅ JSON v8 готов. Описания добавлены!`);
}

convert();
