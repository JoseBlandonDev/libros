"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Copy,
  FileText,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  X,
  Zap,
  Check
} from "lucide-react";

const collections = [
  {
    title: "Negocios",
    books: ["El Método Lean Startup", "Padre Rico Padre Pobre", "Los 7 hábitos"],
    price: "3.000 COP",
    image: "/images/pack-negocios.jpg",
    badge: "Nuevo"
  },
  {
    title: "Estoicismo",
    books: ["Meditaciones", "Sobre la Brevedad de la Vida", "Cartas a Lucilio"],
    price: "3.000 COP",
    image: "/images/pack-estoicismo.jpg",
    badge: "Más popular"
  },
  {
    title: "Desarrollo Personal",
    books: ["El Poder del Ahora", "Atomic Habits", "Piense y Hágase Rico"],
    price: "3.000 COP",
    image: "/images/pack-desarrollo.jpg"
  }
];

const testimonials = [
  {
    name: "Camila R.",
    quote:
      "En menos de 5 minutos ya tenía mis libros. El orden y la calidad PDF es impecable.",
    verified: true
  },
  {
    name: "Juan D.",
    quote:
      "El combo es un regalo. Me ayudó a estructurar mi plan de lectura para todo el año.",
    verified: true
  },
  {
    name: "Laura G.",
    quote:
      "Súper claro el proceso de pago y entrega inmediata. Recomendado para aprender rápido.",
    verified: true
  }
];

const fadeUp = {
  initial: { opacity: 1, y: 0 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0 },
  viewport: { once: true, amount: 0.3 }
};

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPack, setSelectedPack] = useState("Combo Súper Éxito");
  const [copied, setCopied] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openModal = (packName) => {
    setSelectedPack(packName);
    setIsOpen(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText("3147162957");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Combo Súper Éxito - 60 Libros PDF",
    "description": "Pack completo de 60 libros PDF de Negocios, Estoicismo y Desarrollo Personal. Acceso de por vida.",
    "image": "https://libros.blandondev.com/images/mega-bundle.jpg",
    "offers": {
      "@type": "Offer",
      "price": "7500",
      "priceCurrency": "COP",
      "availability": "https://schema.org/InStock",
      "url": "https://libros.blandondev.com"
    }
  };

  return (
    <div className="min-h-screen bg-night">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Sticky Mobile Header */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 right-0 z-50 bg-night/80 backdrop-blur-md border-b border-white/10 px-5 py-3 flex items-center justify-between md:hidden"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-gold" />
              <span className="font-bold text-sm text-white">Libros Digitales</span>
            </div>
            <button
              onClick={() => openModal("Combo Súper Éxito")}
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg"
            >
              Obtener acceso
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-night to-night opacity-90" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-electric/20 blur-3xl" />
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-5 pb-20 pt-16 sm:px-6">
          <motion.div {...fadeUp} className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wider text-slate-200">
              <Sparkles className="h-4 w-4 text-gold" />
              Biblioteca digital premium
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Tu Biblioteca del Éxito en tu Bolsillo
            </h1>
            <p className="max-w-xl text-base text-slate-300 sm:text-lg">
              60 libros curados en Negocios, Estoicismo y Desarrollo Personal. Acceso
              inmediato, pago único y lectura de por vida desde Google Drive.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#precios"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-electric px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-electric/30 transition hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-electric/60"
              >
                Ver precios
                <ArrowRight className="h-4 w-4" />
              </a>
              <button
                onClick={() => openModal("Combo Súper Éxito")}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
              >
                Obtener acceso inmediato
                <BookOpen className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="grid gap-4 text-sm text-slate-200 sm:grid-cols-3">
            {[
              "Pago único, acceso de por vida",
              "Recibe el enlace a Google Drive al instante",
              "Libros organizados y listos para leer"
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <CheckCircle2 className="h-4 w-4 text-gold" />
                {item}
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-20 px-5 pb-24 pt-8 sm:px-6">
        <motion.section {...fadeUp} id="precios" className="space-y-8">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              Paquetes digitales
            </p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Elige tu colección ideal
            </h2>
            <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
              Cada pack incluye 20 libros seleccionados y ordenados para que aprendas
              sin perder tiempo.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {collections.map((collection) => (
              <motion.div
                key={collection.title}
                whileHover={{ y: -6 }}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition md:hover:border-electric/60 relative"
              >
                {collection.badge && (
                  <div className="absolute top-4 right-4 z-10 bg-gold text-ink text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-tighter">
                    {collection.badge}
                  </div>
                )}
                <div className="relative h-72 overflow-hidden bg-ink">
                  <img
                    src={collection.image}
                    alt={`Colección de Libros PDF: ${collection.title}`}
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/40 to-transparent opacity-40" />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gold">
                      <Star className="h-4 w-4" />
                      <h3 className="text-lg font-semibold text-white">
                        {collection.title}
                      </h3>
                    </div>
                    <ul className="space-y-2 text-sm text-slate-300">
                      {collection.books.map((book) => (
                        <li key={book} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-electric" />
                          {book}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="space-y-1">
                      <p className="text-2xl font-semibold text-white">
                        {collection.price}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium">Precio único - Sin suscripciones</p>
                    </div>
                    <button
                      onClick={() => openModal(`Pack ${collection.title}`)}
                      className="w-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110 active:scale-95"
                    >
                      Obtener acceso inmediato
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          {...fadeUp}
          className="relative overflow-hidden rounded-3xl border border-gold/50 bg-ink shadow-glow"
        >
          <div className="flex flex-col md:flex-row">
            {/* Imagen para el Combo */}
            <div className="relative h-64 w-full md:h-auto md:w-1/2 overflow-hidden bg-ink">
              <img
                src="/images/mega-bundle.jpg"
                alt="Mejor Valor: Pack Completo 60 Libros PDF Negocios Estoicismo Desarrollo Personal"
                className="h-full w-full object-contain md:object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-ink" />
              <div className="absolute top-4 left-4 bg-gold text-ink text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-tighter">
                Mejor valor
              </div>
            </div>

            {/* Contenido del Combo */}
            <div className="relative flex-1 p-8 md:p-12 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs uppercase tracking-widest text-gold font-bold">
                <Sparkles className="h-4 w-4" />
                La mejor opción
              </div>
              <h2 className="text-3xl font-bold text-white sm:text-5xl tracking-tight">
                Combo Súper Éxito (3 Packs)
              </h2>
              <p className="text-sm text-slate-200 sm:text-lg leading-relaxed font-medium">
                Llévate las 3 colecciones completas: 60 libros seleccionados, 3 categorías fundamentales, acceso
                inmediato. La opción preferida por quienes buscan un cambio real.
              </p>
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center py-2">
                <div className="flex flex-col">
                  <span className="text-sm text-slate-400 line-through font-medium">9.000 COP</span>
                  <div className="space-y-1">
                    <p className="text-5xl font-black text-white tracking-tighter shadow-sm">7.500 COP</p>
                    <p className="text-[10px] text-slate-500 font-medium">Precio único - Sin suscripciones</p>
                  </div>
                </div>
                <span className="rounded-full border border-gold/30 bg-gold/20 px-4 py-2 text-sm font-bold text-gold backdrop-blur-sm">
                  Ahorras un 17% hoy
                </span>
              </div>
              <motion.button
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                onClick={() => openModal("Combo Súper Éxito")}
                className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-10 py-5 text-base font-black text-white transition shadow-2xl shadow-orange-500/30 active:scale-95 w-full sm:w-auto justify-center"
              >
                Obtener acceso inmediato
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </motion.section>

        <motion.section {...fadeUp} className="space-y-8">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              Beneficios clave
            </p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Acceso inmediato, lectura fluida
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <Zap className="h-6 w-6 text-electric" />
              <h3 className="mt-4 text-lg font-semibold text-white">
                Acceso inmediato
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Recibe el enlace a Google Drive apenas completes el pago.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <FileText className="h-6 w-6 text-electric" />
              <h3 className="mt-4 text-lg font-semibold text-white">
                Formato PDF optimizado
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                PDFs livianos, legibles y perfectos para móvil.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <ShieldCheck className="h-6 w-6 text-electric" />
              <h3 className="mt-4 text-lg font-semibold text-white">
                Pago seguro y guiado
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Nequi: 3147162957. Envía tu comprobante al WhatsApp 3161770893.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section {...fadeUp} className="space-y-8">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              Resultados reales
            </p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Lo que dicen nuestros lectores
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <p className="text-sm font-semibold text-white">
                    {testimonial.name}
                  </p>
                  {testimonial.verified && (
                    <div className="bg-blue-500/20 p-0.5 rounded-full">
                      <Check className="h-3 w-3 text-blue-400" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-slate-200 italic">“{testimonial.quote}”</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          {...fadeUp}
          className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center"
        >
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Pago único. Acceso de por vida.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
            Invierte una sola vez y obtén tu biblioteca organizada para estudiar,
            emprender y crecer a tu ritmo.
          </p>
          <button
            onClick={() => openModal("Combo Súper Éxito")}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-electric px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
          >
            Comprar ahora
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.section>
      </main>

      <footer className="border-t border-white/10 bg-black/20 py-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 text-center text-xs text-slate-400 sm:flex-row sm:justify-between sm:text-left">
          <span>© 2026 Bibliotecas Digitales. Todos los derechos reservados.</span>
          <span>Nequi: 3147162957 | WhatsApp 3161770893</span>
        </div>
      </footer>

      <a
        href="https://wa.me/573161770893?text=Hola%20quiero%20informaci%C3%B3n%20sobre%20los%20packs%20de%20libros."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/30 transition hover:scale-[1.02]"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 px-5 pb-6 pt-24 backdrop-blur-sm sm:items-center sm:pb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md rounded-3xl border border-white/10 bg-ink p-7 text-left shadow-2xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                    Paso final
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-white">
                    Instrucciones de Pago
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-white/5 p-2 text-slate-300 transition hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

            <div className="mt-8 space-y-5">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 relative group transition hover:border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                      Número Nequi
                    </p>
                    <p className="mt-1 text-2xl font-mono font-bold text-white tracking-wider">
                      3147162957
                    </p>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-4 text-xs font-bold text-white transition active:scale-95 shadow-lg shadow-orange-500/20"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        ¡Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copiar
                      </>
                    )}
                  </button>
                </div>
              </div>

              <a
                href="https://www.paypal.com/ncp/payment/4E2E82TCVMRSN"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#00457C] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#003b6a] hover:border-white/20 active:scale-[0.98]"
              >
                Pagar con PayPal, o tarjetas débito o crédito a través de PayPal
                <ArrowRight className="h-4 w-4" />
              </a>

                <div className="space-y-3 px-1">
                  <p className="text-sm font-medium text-slate-300">
                    Estás adquiriendo: <span className="text-white font-bold">{selectedPack}</span>
                  </p>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-electric/20">
                      <div className="h-2 w-2 rounded-full bg-electric" />
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Realiza la transferencia al número de arriba.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-electric/20">
                      <div className="h-2 w-2 rounded-full bg-electric" />
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Haz una captura de pantalla del comprobante exitoso.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-electric/20">
                      <div className="h-2 w-2 rounded-full bg-electric" />
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Presiona el botón de abajo para enviar el comprobante y recibir tu acceso.
                    </p>
                  </div>
                </div>
              </div>

              <a
                href={`https://wa.me/573161770893?text=${encodeURIComponent(
                  `Hola, acabo de realizar el pago para el ${selectedPack}. Aquí envío el comprobante.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-electric px-6 py-4 text-sm font-bold text-white transition hover:scale-[1.02] shadow-lg shadow-electric/20"
              >
                Enviar Comprobante por WhatsApp
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
