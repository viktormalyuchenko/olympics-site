export function getFlagEmoji(countryCode: string) {
  if (!countryCode) return "";

  const codeUpper = countryCode.toUpperCase().trim();

  // Словарь соответствия Олимпийских кодов (IOC) и кодов флагов (ISO)
  const iocToIso: Record<string, string> = {
    KOR: "KR", // Южная Корея
    USA: "US", // США
    SWE: "SE", // Швеция
    JPN: "JP", // Япония
    ITA: "IT", // Италия
    FIN: "FI", // Финляндия
    SVK: "SK", // Словакия
    GER: "DE", // Германия
    CAN: "CA", // Канада
    GBR: "GB", // Великобритания
    EST: "EE", // Эстония
    SUI: "CH", // Швейцария
    NOR: "NO", // Норвегия
    CZE: "CZ", // Чехия
    FRA: "FR", // Франция
    CHN: "CN", // Китай
    AUT: "AT", // Австрия
    RU: "RU", // Россия
    BY: "BY", // Беларусь
    AIN: "UN", // Нейтральные атлеты (покажем нейтральный или белый флаг)
  };

  // Если кода нет в словаре, пробуем взять первые две буквы
  // (работает для многих: DE, FR, IT), но для KOR, GBR, SUI нужен словарь выше.
  const isoCode = iocToIso[codeUpper] || codeUpper.slice(0, 2);

  // Магия превращения букв в эмодзи-флаг
  return isoCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}
