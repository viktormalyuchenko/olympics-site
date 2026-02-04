"use client";
import { useEffect, useState } from "react";

interface LocalTimeProps {
  isoDate: string;
  timeZone?: string; // Необязательный параметр
}

export function LocalTime({ isoDate, timeZone }: LocalTimeProps) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const date = new Date(isoDate);

    // Если timeZone не передан, браузер покажет местное время пользователя
    // Если передан 'Europe/Rome', покажет время в Италии
    setTime(
      date.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: timeZone,
      }),
    );
  }, [isoDate, timeZone]);

  return <span>{time || "--:--"}</span>;
}
