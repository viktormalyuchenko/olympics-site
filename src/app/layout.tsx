import { ThemeProvider } from "next-themes"; // Используем напрямую или через ваш компонент-обертку
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        {/* В next-themes v0.4+ атрибут называется 'class' */}
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
