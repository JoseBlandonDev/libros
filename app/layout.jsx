import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

export const metadata = {
  title: "Pack de 60 Libros PDF: Negocios, Estoicismo y Desarrollo Personal en Colombia",
  description:
    "Descarga la colección definitiva de Libros PDF en Colombia. 60 títulos de Negocios, Estoicismo y Desarrollo Personal. Pago seguro por Nequi y acceso inmediato.",
  metadataBase: new URL("https://libros.blandondev.com"),
  openGraph: {
    title: "📚 Tu Biblioteca del Éxito: 60 Libros PDF por solo 7.500 COP",
    description: "Acceso inmediato de por vida a las mejores colecciones de Negocios, Estoicismo y Desarrollo Personal.",
    url: "/",
    siteName: "Bibliotecas Digitales",
    images: [
      {
        url: "/images/mega-bundle.jpg",
        width: 1200,
        height: 630,
        alt: "Mega Bundle 60 Libros PDF - Negocios, Estoicismo y Desarrollo Personal",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pack de 60 Libros PDF: Éxito y Crecimiento Personal",
    description: "Colección curada de 60 libros. Pago por Nequi, acceso instantáneo.",
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
