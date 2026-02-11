import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    if (!res.ok) throw new Error("Tasa no disponible");
    const data = await res.json();
    const cop = data?.rates?.COP;
    if (typeof cop !== "number") throw new Error("COP no encontrado");
    return NextResponse.json(
      { usdToCop: cop },
      {
        headers: {
          "Cache-Control": "public, max-age=0, s-maxage=3600",
        },
      }
    );
  } catch (e) {
    return NextResponse.json(
      { usdToCop: 4000 },
      { status: 200 }
    );
  }
}
