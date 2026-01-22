"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  X,
  Zap
} from "lucide-react";

const collections = [
  {
    title: "Negocios",
    books: ["El Método Lean Startup", "Padre Rico Padre Pobre", "Los 7 hábitos"],
    price: "2.500 COP"
  },
  {
    title: "Estoicismo",
    books: ["Meditaciones", "Sobre la Brevedad de la Vida", "Cartas a Lucilio"],
    price: "2.500 COP"
  },
  {
    title: "Desarrollo Personal",
    books: ["El Poder del Ahora", "Atomic Habits", "Piense y Hágase Rico"],
    price: "2.500 COP"
  }
];

const testimonials = [
  {
    name: "Camila R.",
    quote:
      "En menos de 5 minutos ya tenía mis libros. El orden y la calidad PDF es impecable."
  },
  {
    name: "Juan D.",
    quote:
      "El combo es un regalo. Me ayudó a estructurar mi plan de lectura para todo el año."
  },
  {
    name: "Laura G.",
    quote:
      "Súper claro el proceso de pago y entrega inmediata. Recomendado para aprender rápido."
  }
];

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: true, amount: 0.3 }
};

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-night">
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
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
              >
                Comprar ahora
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
                className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 transition md:hover:border-electric/60"
              >
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
                  <p className="text-2xl font-semibold text-white">
                    {collection.price}
                  </p>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="w-full rounded-full bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20 md:group-hover:bg-electric"
                  >
                    Comprar colección
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          {...fadeUp}
          className="relative overflow-hidden rounded-3xl border border-gold/40 bg-gradient-to-br from-white/5 via-white/5 to-gold/10 p-8 shadow-glow"
        >
          <div className="absolute inset-0 opacity-40">
            <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-electric/30 blur-2xl" />
          </div>
          <div className="relative space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs uppercase tracking-widest text-gold">
              <Sparkles className="h-4 w-4" />
              Oferta estrella
            </div>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              The Mega Bundle
            </h2>
            <p className="max-w-2xl text-sm text-slate-200 sm:text-base">
              Llévate las 3 colecciones completas: 60 libros, 3 categorías, acceso
              inmediato. Ideal para avanzar rápido y ahorrar más.
            </p>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <p className="text-3xl font-semibold text-white">7.500 COP</p>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs text-slate-200">
                Ahorra frente a compras individuales
              </span>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:scale-[1.02]"
            >
              Quiero el combo completo
              <ArrowRight className="h-4 w-4" />
            </button>
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
                <p className="text-sm text-slate-200">“{testimonial.quote}”</p>
                <p className="mt-4 text-sm font-semibold text-white">
                  {testimonial.name}
                </p>
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
            onClick={() => setIsOpen(true)}
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
          <span>Soporte: WhatsApp 3161770893</span>
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

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 px-5 pb-6 pt-24 sm:items-center sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md rounded-3xl border border-white/10 bg-ink p-6 text-left"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold">
                  Completa tu compra
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-white">
                  Datos de pago
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-slate-300 transition hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-4 text-sm text-slate-200">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-widest text-slate-400">
                  Nequi
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  3147162957
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-widest text-slate-400">
                  Daviplata
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  3147162957
                </p>
              </div>
              <p className="text-xs text-slate-400">
                Envía tu comprobante al WhatsApp 3161770893 y recibe tu acceso
                inmediato.
              </p>
            </div>

            <a
              href="https://wa.me/573161770893?text=Hola%20ya%20realic%C3%A9%20el%20pago%20y%20env%C3%ADo%20mi%20comprobante."
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-electric px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
            >
              Enviar comprobante por WhatsApp
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      )}
    </div>
  );
}
