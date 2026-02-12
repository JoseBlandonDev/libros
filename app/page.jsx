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
  Smartphone,
  ChevronDown,
  ChevronUp
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
      { title: "Vendes o vendes", author: "Grant Cardone", tags: ["Persuasión", "Convicción"], desc: "Sostiene que vender es una habilidad vital y que el éxito depende de tu capacidad para convencer a los demás." },
      { title: "El método Lean Startup", author: "Eric Ries", tags: ["Validación", "Experimentación"], desc: "Propone un método científico para lanzar negocios basado en crear un producto mínimo viable y aprender de datos reales." },
      { title: "El líder que no tenía cargo", author: "Robin Sharma", tags: ["Autorresponsabilidad", "Influencia"], desc: "Explica que el liderazgo es una actitud personal y que puedes influir positivamente sin importar tu jerarquía oficial." },
      { title: "El ejecutivo al minuto y la organización del tiempo", author: "Kenneth Blanchard", tags: ["Delegación", "Enfoque"], desc: "Enseña a gestionar las tareas de forma que cada persona asuma su responsabilidad, evitando cargar con problemas ajenos." },
      { title: "La semana laboral de 4 horas", author: "Timothy Ferriss", tags: ["Automatización", "Libertad"], desc: "Un manual para rediseñar tu vida eliminando lo innecesario, automatizando ingresos y trabajando desde cualquier lugar." },
      { title: "Influencia: La psicología de la persuasión", author: "Robert B. Cialdini", tags: ["Gatillos mentales", "Reciprocidad"], desc: "Analiza los seis principios psicológicos que nos impulsan a decir que sí y cómo funcionan en la comunicación." },
      { title: "El manual del emprendedor", author: "Steve Blank", tags: ["Validación", "Clientes"], desc: "Una guía técnica que prioriza salir a la calle para validar hipótesis con clientes reales antes de invertir tiempo y dinero." },
      { title: "Administración En una página", author: "Riaz Khadem", tags: ["Control visual", "Simplicidad"], desc: "Presenta una metodología para dirigir organizaciones usando tres informes clave que resumen la información crítica del negocio." },
      { title: "El cuadrante del flujo de dinero", author: "Robert T. Kiyosaki", tags: ["Libertad financiera", "Activos"], desc: "Clasifica las fuentes de ingresos y explica la mentalidad necesaria para pasar de ser empleado a ser un inversionista libre." },
      { title: "Rompe la barrera del no", author: "Chris Voss", tags: ["Negociación", "Empatía"], desc: "Tácticas de negociación que usan la psicología y la escucha activa para obtener acuerdos favorables en situaciones difíciles." },
      { title: "La estrategia del océano azul", author: "W. Chan Kim", tags: ["Diferenciación", "Innovación"], desc: "Propone crear mercados nuevos y sin competencia en lugar de pelear por los mismos clientes en sectores saturados." },
      { title: "Empresas que sobresalen (Good to Great)", author: "Jim Collins", tags: ["Excelencia", "Liderazgo"], desc: "Estudia cómo empresas comunes se transformaron en extraordinarias mediante líderes humildes y un enfoque disciplinado." },
      { title: "El mito del emprendedor", author: "Michael E. Gerber", tags: ["Sistematización", "Procesos"], desc: "Desmonta la idea de que saber un oficio basta para emprender, enfatizando sistemas que no dependan del dueño." },
      { title: "El millonario de la puerta de al lado", author: "Thomas J. Stanley", tags: ["Frugalidad", "Ahorro"], desc: "Revela que la mayoría de los millonarios basan su riqueza en el ahorro constante y la vida modesta, no en el lujo." },
      { title: "Padre rico, padre pobre", author: "Robert T. Kiyosaki", tags: ["Educación financiera", "Inversión"], desc: "Enseña a diferenciar activos de pasivos y subraya que la riqueza nace de hacer que el dinero trabaje para ti." },
      { title: "El dilema de los innovadores", author: "Clayton M. Christensen", tags: ["Disrupción", "Adaptación"], desc: "Analiza por qué grandes compañías fracasan cuando ignoran innovaciones disruptivas que terminan cambiando las reglas del juego." },
      { title: "De cero a uno", author: "Peter Thiel", tags: ["Monopolio", "Originalidad"], desc: "Argumenta que las mejores empresas crean cosas únicas y logran un monopolio creativo en lugar de copiar lo existente." },
      { title: "Organizaciones exponenciales", author: "Salim Ismail", tags: ["Escalabilidad", "Tecnología"], desc: "Describe cómo las empresas modernas usan la tecnología para crecer masivamente con muy pocos activos físicos." },
      { title: "El arte de la guerra", author: "Sun Tzu", tags: ["Estrategia", "Preparación"], desc: "Tratado milenario sobre cómo ganar conflictos mediante el conocimiento del rival, la planificación y la astucia." },
      { title: "Rework", author: "Jason Fried", tags: ["Productividad", "Agilidad"], desc: "Propone formas de trabajar más sencillas y rápidas, eliminando reuniones, burocracia y planes innecesarios." }
    ],
    priceUsd: PACK_USD,
    image: "/images/pack-negocios.jpg",
    badge: "Nuevo"
  },
  {
    title: "Estoicismo",
    books: [
      { title: "La disciplina marcará tu destino", author: "Ryan Holiday", tags: ["Autocontrol", "Templanza"], desc: "Explora cómo la virtud estoica de la moderación y el dominio de los impulsos son la base de la libertad." },
      { title: "Escuela de Estoicismo Moderno", author: "Isra García", tags: ["Práctica", "Resiliencia"], desc: "Un curso práctico para aplicar los principios estoicos a los problemas actuales, enfocándose en la acción real." },
      { title: "De la Tranquilidad del Ánimo", author: "Lucio Anneo Séneca", tags: ["Serenidad", "Desapego"], desc: "Séneca enseña cómo evitar el desasosiego mental y encontrar la paz interior frente a las presiones externas." },
      { title: "El pequeño libro de la filosofía estoica", author: "Javier G. Recuenco", tags: ["Dicotomía control", "Virtud"], desc: "Sintetiza los pilares del estoicismo, enfatizando preocuparse solo por lo que depende de uno mismo." },
      { title: "Pequeño Manual Estóico", author: "Isra García", tags: ["Objetividad", "Consciencia"], desc: "Guía rápida para desarrollar un juicio racional sobre los eventos de la vida y vivir con mayor atención plena." },
      { title: "Meditaciones", author: "Marco Aurelio", tags: ["Rectitud", "Introspección"], desc: "Reflexiones personales de Marco Aurelio sobre el deber, la brevedad de la vida y la integridad moral." },
      { title: "Cartas a Lucilio", author: "Séneca", tags: ["Sabiduría", "Tiempo"], desc: "Consejos de Séneca sobre el uso correcto del tiempo, la amistad y la búsqueda diaria de la excelencia ética." },
      { title: "Los Estoicos y el Problema de la Libertad", author: "Ricardo Salles", tags: ["Albedrío", "Determinismo"], desc: "Análisis filosófico sobre cómo los estoicos lograban sentirse libres en un universo que consideraban predestinado." },
      { title: "Diario para Estoicos", author: "Ryan Holiday", tags: ["Hábito", "Reflexión"], desc: "Ofrece una cita y una reflexión diaria para integrar la sabiduría antigua en la rutina de cada día." },
      { title: "Invicto", author: "Marcos Vázquez", tags: ["Fortaleza", "Mentalidad"], desc: "Combina la filosofía antigua con la psicología moderna para mejorar la resistencia mental ante el caos." },
      { title: "Ecos Estoicos", author: "Pedro Vivar Núñez", tags: ["Claridad", "Integridad"], desc: "Profundiza en las lecciones de los maestros para encontrar un eje ético en un mundo lleno de distracciones." },
      { title: "De la Ira", author: "Lucio Anneo Séneca", tags: ["Dominio", "Razón"], desc: "Ensayo que explica por qué la ira es destructiva y ofrece métodos para razonar antes de reaccionar." },
      { title: "Cómo ser un estoico", author: "Massimo Pigliucci", tags: ["Guía ética", "Carácter"], desc: "Narra cómo la aplicación de principios racionales ayuda a navegar los dilemas modernos con elegancia y calma." },
      { title: "El estoico en práctica", author: "Ward Farnsworth", tags: ["Acción", "Lógica"], desc: "Presenta la filosofía como un conjunto de ejercicios lógicos para actuar correctamente en cada situación." },
      { title: "El arte de vivir como un estoico", author: "David Fideler", tags: ["Suficiencia", "Gratitud"], desc: "Se enfoca en aprender a querer lo que ya se tiene y a no depender de circunstancias externas para ser feliz." },
      { title: "Los Estoicos", author: "Selecciones de Nueva Acrópolis", tags: ["Deber", "Naturaleza"], desc: "Selección de los textos más importantes de Epicteto, Séneca y Marco Aurelio sobre la ética y la ley natural." },
      { title: "El arte de la buena vida", author: "William B. Irvine", tags: ["Tranquilidad", "Perspectiva"], desc: "Propone técnicas mentales para evitar la insatisfacción crónica y encontrar alegría en la sencillez del presente." },
      { title: "El obstáculo es el camino", author: "Ryan Holiday", tags: ["Percepción", "Voluntad"], desc: "Demuestra que los problemas son en realidad las herramientas para avanzar y fortalecer el carácter." },
      { title: "La sabiduría de los estoicos", author: "Frances y Henry Hazlitt", tags: ["Autodominio", "Destino"], desc: "Recopilación de enseñanzas sobre la importancia de gobernar la propia mente para enfrentar cualquier circunstancia." },
      { title: "De la Brevedad de la Vida", author: "Lucio Anneo Séneca", tags: ["Urgencia", "Prioridad"], desc: "Reflexión sobre cómo el tiempo es lo más valioso y cómo desperdiciarlo es el mayor error humano." }
    ],
    priceUsd: PACK_USD,
    image: "/images/pack-estoicismo.jpg",
    badge: "Más popular"
  },
  {
    title: "Desarrollo Personal",
    books: [
      { title: "Las 48 Leyes del Poder", author: "Robert Greene", tags: ["Poder", "Prudencia"], desc: "Estudio sobre las reglas que rigen las jerarquías y la influencia, enfocado en entender cómo funciona el mando." },
      { title: "Tus zonas erróneas", author: "Wayne Dyer", tags: ["Independencia emocional", "Presente"], desc: "Identifica pensamientos autodestructivos y enseña a eliminarlos para vivir sin culpas ni miedos innecesarios." },
      { title: "La magia del orden", author: "Marie Kondo", tags: ["Espacio", "Minimalismo"], desc: "Enseña que ordenar el entorno físico ayuda a poner en orden la mente y a rodearse solo de lo que aporta felicidad." },
      { title: "El Club de las 5 de la mañana", author: "Robin Sharma", tags: ["Rutina", "Disciplina"], desc: "Propone levantarse temprano para realizar una rutina de crecimiento personal que potencie el éxito y la salud." },
      { title: "¿Quién se ha llevado mi queso?", author: "Spencer Johnson", tags: ["Adaptabilidad", "Cambio"], desc: "Parábola sobre la resistencia al cambio y la importancia de adaptarse rápidamente a las nuevas situaciones." },
      { title: "Los 7 hábitos de la gente altamente efectiva", author: "Stephen Covey", tags: ["Proactividad", "Sinergia"], desc: "Presenta un sistema de principios éticos para lograr efectividad personal e interpersonal duradera." },
      { title: "Despierta tu héroe interior", author: "Victor Hugo Manzanilla", tags: ["Actitud", "Propósito"], desc: "Motiva a vivir con actitud positiva y a desarrollar virtudes humanas para alcanzar una vida con significado." },
      { title: "Cree en ti", author: "Rut Nieves", tags: ["Autoconfianza", "Reprogramación"], desc: "Explora cómo nuestras creencias limitantes crean nuestra realidad y cómo cambiarlas para alcanzar el éxito." },
      { title: "El sutil arte de que (casi todo) te importe una mierda", author: "Mark Manson", tags: ["Priorización", "Aceptación"], desc: "Aboga por elegir cuidadosamente nuestras batallas y aceptar el dolor como parte natural del crecimiento." },
      { title: "Ámate a ti mismo como si tu vida dependiera de ello", author: "Kamal Ravikant", tags: ["Autoestima", "Amor"], desc: "Relato sobre la autoaceptación y cómo cambiar el diálogo interno puede transformar radicalmente tu vida." },
      { title: "Piense y hágase rico", author: "Napoleon Hill", tags: ["Deseo", "Planificación"], desc: "Sintetiza los principios mentales y de planificación necesarios para convertir el deseo en riqueza material." },
      { title: "El hombre en busca de sentido", author: "Viktor Frankl", tags: ["Propósito", "Resiliencia"], desc: "Narra la supervivencia en campos de concentración concluyendo que el propósito es la mayor fuerza humana." },
      { title: "Si lo crees, lo creas", author: "Brian Tracy", tags: ["Autoimagen", "Acción"], desc: "Ofrece una guía para eliminar pensamientos negativos y potenciar la autoconfianza para lograr metas ambiciosas." },
      { title: "Cómo ganar amigos e influir sobre las personas", author: "Dale Carnegie", tags: ["Carisma", "Relaciones"], desc: "Enseña habilidades de comunicación fundamentales para conectar con otros y liderar de forma persuasiva." },
      { title: "El monje que vendió su Ferrari", author: "Robin Sharma", tags: ["Equilibrio", "Espiritualidad"], desc: "Fábula que narra la transformación de un abogado exitoso hacia una vida de paz, salud y propósito claro." },
      { title: "La Vaca", author: "Camilo Cruz", tags: ["Excusas", "Superación"], desc: "Usa la metáfora de una vaca para representar las excusas que nos mantienen estancados en la mediocridad." },
      { title: "Más agudo, más rápido y mejor", author: "Charles Duhigg", tags: ["Eficiencia", "Decisión"], desc: "Explora la ciencia de la productividad y cómo el enfoque y la toma de decisiones determinan los resultados." },
      { title: "El poder del ahora", author: "Eckhart Tolle", tags: ["Presencia", "Consciencia"], desc: "Enseña a vivir en el presente para liberarse del sufrimiento causado por el ego y la rumiación mental." },
      { title: "Hábitos Atómicos", author: "James Clear", tags: ["Sistemas", "Identidad"], desc: "Explica cómo pequeños cambios diarios se acumulan para generar transformaciones extraordinarias a largo plazo." },
      { title: "¡Hazlo con miedo!", author: "Ruth Soukup", tags: ["Valentía", "Acción"], desc: "Un llamado a la acción que insta a no esperar a que desaparezca el miedo para perseguir metas importantes." }
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
  const [expandedBook, setExpandedBook] = useState(null);

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

  const closeViewingList = () => {
    setViewingList(null);
    setExpandedBook(null);
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
                className="hidden sm:inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
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

      <footer className="border-t border-white/10 bg-black/20 py-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 text-center text-xs text-slate-400 sm:flex-row sm:justify-between sm:text-left">
          <span>© 2026 Bibliotecas Digitales. Todos los derechos reservados.</span>
          <span>Nequi: 3147162957 | WhatsApp 3161770893</span>
        </div>
      </footer>

      {/* Desktop WhatsApp Button */}
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
                  onClick={closeViewingList}
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
                    ?.books.map((book, i) => {
                      const isExpanded = expandedBook === i;
                      
                      return (
                        <div
                          key={i}
                          className="overflow-hidden rounded-xl bg-white/5 border border-white/5 transition-all"
                        >
                          <button
                            onClick={() => setExpandedBook(isExpanded ? null : i)}
                            className="flex items-center gap-4 p-3 w-full text-left"
                          >
                            <div className="h-10 w-10 bg-slate-800 rounded shadow-sm shrink-0 flex items-center justify-center border border-white/5">
                               <BookOpen className="h-5 w-5 text-slate-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-white leading-tight truncate">
                                {book.title}
                              </p>
                              <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                                {book.author}
                              </p>
                            </div>
                            <div className="text-slate-500 px-2">
                              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </div>
                          </button>
                          
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="px-4 pb-4 border-t border-white/5 bg-white/[0.02]"
                              >
                                <div className="pt-3 space-y-3">
                                  <p className="text-xs text-slate-300 leading-relaxed italic">
                                    {book.desc}
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {book.tags.map((tag) => (
                                      <span key={tag} className="text-[9px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full border border-orange-500/30 font-medium">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 shrink-0">
                <button
                  onClick={() => {
                    const packToBuy = viewingList; // Capture current viewing list
                    closeViewingList(); // Close list modal
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
