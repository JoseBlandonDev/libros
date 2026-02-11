"use client";

import { MessageCircle, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const WHATSAPP_NUMBER = "573161770893";
const WHATSAPP_MSG = "Hola, ya pagué mi paquete y espero recibirlo.";

export default function GraciasPage() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

  return (
    <div className="min-h-screen bg-night flex flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-ink p-8 text-center shadow-xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
          <CheckCircle2 className="h-10 w-10 text-green-400" />
        </div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Tu pago fue recibido
        </h1>
        <p className="mt-3 text-sm text-slate-300 sm:text-base">
          Gracias por tu compra. Contacta por WhatsApp para recibir tu paquete
          de libros y el enlace de acceso.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-green-500 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-green-500/30 transition hover:scale-[1.02] hover:brightness-110 active:scale-[0.98]"
        >
          <MessageCircle className="h-5 w-5" />
          Contactar por WhatsApp para recibir mi paquete
          <ArrowRight className="h-4 w-4" />
        </a>
        <Link
          href="/"
          className="mt-4 inline-block text-sm text-slate-400 underline underline-offset-2 transition hover:text-slate-200"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
