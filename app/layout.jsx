import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

export const metadata = {
  title: "Bibliotecas Digitales | Packs de libros PDF",
  description:
    "Lleva tu biblioteca del éxito en tu bolsillo. 60 libros en 3 categorías con acceso inmediato y pago único."
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
