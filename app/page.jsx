"use client";

import { useState, useEffect, useMemo } from "react";
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
  Check,
  CreditCard,
  List,
  Smartphone
} from "lucide-react";

const PACK_USD = 1;
const COMBO_USD = 2.5;
const COMBO_WAS_USD = 3; // 3 packs sin descuento

const roundToNearest100 = (n) => Math.round(n / 100) * 100;
const formatCOP = (n) => roundToNearest100(n).toLocaleString("es-CO");

const collections = [
  {
    title: "Negocios",
    books: [
      "Vendes o vendes",
      "El método Lean Startup",
      "El líder que no tenía cargo",
      "El ejecutivo al minuto y la organización del tiempo",
      "La semana laboral de 4 horas",
      "Influencia: La psicología de la persuasión",
      "El manual del emprendedor",
      "Administración En una página",
      "El cuadrante del flujo de dinero",
      "Rompe la barrera del no",
      "La estrategia del océano azul",
      "Empresas que sobresalen (Good to Great)",
      "El mito del emprendedor",
      "El millonario de la puerta de al lado",
      "Padre rico, padre pobre",
      "El dilema de los innovadores",
      "De cero a uno",
      "Organizaciones exponenciales",
      "El arte de la guerra",
      "Rework"
    ],
    priceUsd: PACK_USD,
    image: "/images/pack-negocios.jpg",
    badge: "Nuevo"
  },
  {
    title: "Estoicismo",
    books: [
      "La disciplina marcará tu destino",
      "Escuela de Estoicismo Moderno",
      "De la Tranquilidad del Ánimo",
      "El pequeño libro de la filosofía estoica",
      "Pequeño Manual Estóico",
      "Meditaciones",
      "Cartas a Lucilio",
      "Los Estoicos y el Problema de la Libertad",
      "Diario para Estoicos",
      "Invicto",
      "Ecos Estoicos",
      "De la Ira",
      "Cómo ser un estoico",
      "El estoico en práctica",
      "El arte de vivir como un estoico",
      "Los Estoicos: Epicteto, Séneca, Marco Aurelio",
      "El arte de la buena vida",
      "El obstáculo es el camino",
      "La sabiduría de los estoicos",
      "De la Brevedad de la Vida"
    ],
    priceUsd: PACK_USD,
    image: "/images/pack-estoicismo.jpg",
    badge: "Más popular"
  },
  {
    title: "Desarrollo Personal",
    books: [
      "Las 48 Leyes del Poder",
      "Tus zonas erróneas",
      "La magia del orden",
      "El Club de las 5 de la mañana",
      "¿Quién se ha llevado mi queso?",
      "Los 7 hábitos de la gente altamente efectiva",
      "Despierta tu héroe interior",
      "Cree en ti",
      "El sutil arte de que (casi todo) te importe una mierda",
      "Ámate a ti mismo como si tu vida dependiera de ello",
      "Piense y hágase rico",
      "El hombre en busca de sentido",
      "Si lo crees, lo creas",
      "Cómo ganar amigos e influir sobre las personas",
      "El monje que vendió su Ferrari",
      "La Vaca",
      "Más agudo, más rápido y mejor",
      "El poder del ahora",
      "Hábitos Atómicos",
      "¡Hazlo con miedo!"
    ],
    priceUsd: PACK_USD,
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
  const [usdToCopRate, setUsdToCopRate] = useState(null);
  const [viewingList, setViewingList] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("/api/exchange-rate")
      .then((res) => res.json())
      .then((data) => setUsdToCopRate(data.usdToCop))
      .catch(() => setUsdToCopRate(4000));
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

  const comboCopPrice = usdToCopRate != null
    ? roundToNearest100(COMBO_USD * usdToCopRate)
    : null;
  const jsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Combo Súper Éxito - 60 Libros PDF",
    "description": "Pack completo de 60 libros PDF de Negocios, Estoicismo y Desarrollo Personal. Acceso de por vida.",
    "image": "https://libros.blandondev.com/images/mega-bundle.jpg",
    "offers": {
      "@type": "Offer",
      "price": comboCopPrice != null ? String(comboCopPrice) : "10000",
      "priceCurrency": "COP",
      "availability": "https://schema.org/InStock",
      "url": "https://libros.blandondev.com"
    }
  }), [comboCopPrice]);

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

        <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-5 pb-10 pt-10 sm:gap-10 sm:px-6 sm:pb-20 sm:pt-16">
          <motion.div {...fadeUp} className="space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wider text-slate-200">
              <Sparkles className="h-4 w-4 text-gold" />
              Biblioteca digital premium
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Tu Biblioteca del Éxito en tu Bolsillo
            </h1>
            <p className="max-w-xl text-base text-slate-300 sm:text-lg">
              60 libros top de Negocios y Desarrollo Personal. <span className="text-white font-bold">Pago único. Acceso de por vida.</span>
            </p>
            
            {/* Trust Badges Hero */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded border border-white/10">
                <Smartphone className="h-3 w-3 text-electric" /> Nequi
              </span>
              <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded border border-white/10">
                <CreditCard className="h-3 w-3 text-blue-400" /> PayPal / Tarjeta
              </span>
              <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded border border-white/10">
                <ShieldCheck className="h-3 w-3 text-green-400" /> Garantía
              </span>
            </div>

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

          <motion.div {...fadeUp} className="hidden sm:grid gap-4 text-sm text-slate-200 sm:grid-cols-3">
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

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-5 pb-24 pt-2 sm:gap-20 sm:px-6 sm:pt-8">
        <motion.section {...fadeUp} id="precios" className="space-y-4 sm:space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl mt-0">
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
                <div className="relative h-48 sm:h-72 overflow-hidden bg-ink">
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
                    
                    <button
                      onClick={() => setViewingList(collection.title)}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 py-3 text-xs font-bold text-electric uppercase tracking-wider transition hover:bg-white/10 hover:border-electric/30 hover:shadow-lg hover:shadow-electric/10"
                    >
                      <List className="h-3 w-3" />
                      Ver lista completa de libros
                    </button>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="space-y-1">
                      <p className="text-2xl font-semibold text-white">
                        {usdToCopRate != null ? (
                          <>{formatCOP(collection.priceUsd * usdToCopRate)} COP / {collection.priceUsd} USD</>
                        ) : (
                          <>… COP / 1 USD</>
                        )}
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
                  {usdToCopRate != null ? (
                    <>
                      <span className="text-sm text-slate-400 line-through font-medium">
                        {formatCOP(COMBO_WAS_USD * usdToCopRate)} COP / {COMBO_WAS_USD} USD
                      </span>
                      <div className="space-y-1">
                        <p className="text-5xl font-black text-white tracking-tighter shadow-sm">
                          {formatCOP(COMBO_USD * usdToCopRate)} COP / {COMBO_USD.toLocaleString("es-CO", { minimumFractionDigits: 2 })} USD
                        </p>
                        <p className="text-[10px] text-slate-500 font-medium">Precio único - Sin suscripciones</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="text-sm text-slate-400 line-through font-medium">… COP / 3 USD</span>
                      <div className="space-y-1">
                        <p className="text-5xl font-black text-white tracking-tighter shadow-sm">… COP / 2,50 USD</p>
                        <p className="text-[10px] text-slate-500 font-medium">Precio único - Sin suscripciones</p>
                      </div>
                    </>
                  )}
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

      <footer className="border-t border-white/10 bg-black/20 py-8 mb-20 md:mb-0">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 text-center text-xs text-slate-400 sm:flex-row sm:justify-between sm:text-left">
          <span>© 2026 Bibliotecas Digitales. Todos los derechos reservados.</span>
          <span>Nequi: 3147162957 | WhatsApp 3161770893</span>
        </div>
      </footer>

      {/* Mobile Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-night/90 backdrop-blur-lg border-t border-white/10 p-4 md:hidden safe-area-pb">
        <div className="flex gap-3">
          <a
            href="https://wa.me/573161770893?text=Hola%20quiero%20informaci%C3%B3n%20sobre%20los%20packs%20de%20libros."
            target="_blank"
            rel="noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-white border border-white/10 active:scale-95 transition"
          >
            <MessageCircle className="h-6 w-6 text-green-500" />
          </a>
          <button
            onClick={() => openModal("Combo Súper Éxito")}
            className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/20 active:scale-[0.98] transition flex items-center justify-center gap-2 animate-pulse-slow"
          >
            QUIERO ACCESO YA
            <Zap className="h-4 w-4 fill-white" />
          </button>
        </div>
      </div>

      {/* Desktop WhatsApp Button */}
      <a
        href="https://wa.me/573161770893?text=Hola%20quiero%20informaci%C3%B3n%20sobre%20los%20packs%20de%20libros."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-40 hidden md:inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/30 transition hover:scale-[1.02]"
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
              <a
                href="https://www.paypal.com/ncp/payment/4E2E82TCVMRSN"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#0070BA] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#005ea6] hover:border-white/20 active:scale-[0.98] shadow-lg shadow-[#0070BA]/20"
              >
                <CreditCard className="h-5 w-5" />
                Pagar con PayPal o tarjeta débito/crédito
              </a>

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
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-3 py-2.5 text-[10px] font-bold text-white transition active:scale-95 shadow-lg shadow-orange-500/20 sm:gap-2 sm:px-5 sm:py-4 sm:text-xs"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        ¡Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        Copiar
                      </>
                    )}
                  </button>
                </div>
              </div>

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
                  `Hola, he realizado el pago del pack: ${selectedPack}. Adjunto mi comprobante para recibir acceso.`
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

      <AnimatePresence>
        {viewingList && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 px-5 pb-6 pt-24 backdrop-blur-sm sm:items-center sm:pb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-ink p-7 text-left shadow-2xl h-[80vh] flex flex-col"
            >
              <div className="flex items-start justify-between mb-4 shrink-0">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                    Contenido del Pack
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-white">
                    {viewingList}
                  </h3>
                </div>
                <button
                  onClick={() => setViewingList(null)}
                  className="rounded-full bg-white/5 p-2 text-slate-300 transition hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                <p className="text-sm text-slate-300">
                  Aquí encontrarás la lista detallada de los libros incluidos en este pack.
                </p>

                <div className="grid gap-3">
                  {collections
                    .find((c) => c.title === viewingList)
                    ?.books.map((book, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5"
                    >
                      <div className="h-10 w-10 bg-slate-800 rounded shadow-sm shrink-0 flex items-center justify-center">
                         <BookOpen className="h-5 w-5 text-slate-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white leading-tight">
                          {book}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 shrink-0">
                <button
                  onClick={() => {
                    const packToBuy = viewingList; // Capture current viewing list
                    setViewingList(null); // Close list modal
                    openModal(packToBuy); // Open buy modal
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-electric px-4 py-3 text-sm font-bold text-white shadow-lg transition hover:brightness-110 active:scale-95"
                >
                  Obtener este pack ahora
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
