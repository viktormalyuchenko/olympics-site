export function getFlagEmoji(countryCode: string) {
  if (!countryCode || countryCode.length !== 3) return "";
  // Превращаем 3-буквенный код (типа JPN) в 2-буквенный стандарт (JP) для эмодзи,
  // но для Олимпиады проще всего иметь мапу или использовать коды напрямую, если они 2-буквенные.
  // Если коды в JSON 3-буквенные (IOC), нам нужна небольшая мапа.
  const iocToIso: Record<string, string> = {
    USA: "US",
    SWE: "SE",
    JPN: "JP",
    ITA: "IT",
    FIN: "FI",
    SVK: "SK",
    GER: "DE",
    CAN: "CA",
    // Добавите остальные по мере перевода
  };

  const code = iocToIso[countryCode.toUpperCase()] || countryCode.slice(0, 2);
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}
