"use client";
import { useEffect, useState } from "react";

export function LocalTime({ isoDate }: { isoDate: string }) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    // Этот код сработает только в браузере
    const date = new Date(isoDate);
    setTime(
      date.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    );
  }, [isoDate]);

  // Пока время не определено (на сервере), показываем прочерк или пустую строку
  return <span>{time || "--:--"}</span>;
}
