import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

export const metadata = {
  title: "Bibliotecas Digitales | Packs de libros PDF para tu Éxito",
  description:
    "Más de 60 libros curados de Negocios, Estoicismo y Desarrollo Personal. Acceso inmediato de por vida por solo 7.500 COP.",
  metadataBase: new URL("https://libros-landing.vercel.app"), // Reemplaza con tu dominio real
  openGraph: {
    title: "Bibliotecas Digitales | Packs de libros PDF para tu Éxito",
    description: "Más de 60 libros curados de Negocios, Estoicismo y Desarrollo Personal. Acceso inmediato de por vida.",
    url: "/",
    siteName: "Bibliotecas Digitales",
    images: [
      {
        url: "/images/mega-bundle.jpg",
        width: 1200,
        height: 630,
        alt: "Bibliotecas Digitales - Packs de libros PDF",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bibliotecas Digitales | Packs de libros PDF para tu Éxito",
    description: "Más de 60 libros curados de Negocios, Estoicismo y Desarrollo Personal.",
    images: ["/images/mega-bundle.jpg"],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📚</text></svg>",
  },
};

export const viewport = {
  themeColor: "#0B0F1A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
