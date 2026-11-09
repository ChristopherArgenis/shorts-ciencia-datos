import React from "react";
import { useCurrentFrame } from "remotion";
import { Sfx, Stage, Words } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import {
  Capitulo,
  Codigo,
  duracionTotal,
  durVoz,
  Nota,
  prog,
  SERIE_NOS,
} from "../../kit/serie";
import { AvanceML, Respuesta, Reto } from "../../kit/ml";
import { Grande, MOR } from "./comun";
import datos from "../../datos/ml_nosup.json";

const S = "nos7" as const;
const D = datos.u7;
const R = D.reglas[0]; // latte → pan dulce

const TICKETS = [
  ["latte", "pan dulce"],
  ["americano", "galleta"],
  ["latte"],
  ["latte", "pan dulce", "té"],
  ["té"],
  ["latte", "pan dulce"],
  ["americano"],
  ["latte", "galleta"],
];

const Ticket: React.FC<{ items: string[]; delay: number }> = ({
  items,
  delay,
}) => {
  const f = useCurrentFrame();
  const par = items.includes("latte") && items.includes("pan dulce");
  return (
    <div
      style={{
        width: 200,
        background: "#f4f6ff",
        borderRadius: 14,
        padding: "12px 14px",
        fontFamily: MONO,
        fontSize: 24,
        color: "#0b1020",
        opacity: prog(f, delay, delay + 8),
        outline: par && f > 90 ? `6px solid ${MOR}` : "none",
      }}
    >
      {items.map((i) => (
        <div key={i}>{i}</div>
      ))}
    </div>
  );
};

const Gancho = () => (
  <Stage gap={40}>
    <Words
      text="Quien compra *latte*… ¿qué más compra?"
      size={88}
      stagger={1}
      accent={MOR}
    />
  </Stage>
);
const RetoE = () => (
  <Stage>
    <Reto pregunta="¿Qué producto acompaña más al latte?" />
  </Stage>
);
const Tickets = () => (
  <Stage gap={30}>
    <Words
      text={`*${D.n.toLocaleString("es-MX")}* tickets de Café Datos`}
      size={84}
      accent={MOR}
    />
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 200px)",
        gap: 16,
      }}
    >
      {TICKETS.map((t, i) => (
        <Ticket key={i} items={t} delay={10 + i * 6} />
      ))}
    </div>
    <Nota>Tickets ficticios · reglas calculadas de verdad</Nota>
  </Stage>
);
const Regla = () => (
  <Stage gap={26}>
    <div
      style={{ fontFamily: FONT, fontWeight: 900, fontSize: 80, color: C.ink }}
    >
      latte → <span style={{ color: MOR }}>pan dulce</span>
    </div>
    <div style={{ display: "flex", gap: 50 }}>
      <div style={{ textAlign: "center" }}>
        <Grande valor={R.soporte} dec={1} suf="%" size={130} />
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 38,
            color: C.ink,
          }}
        >
          soporte
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 600,
            fontSize: 28,
            color: C.dim,
          }}
        >
          tickets con los dos
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Grande
          valor={R.confianza}
          dec={0}
          suf="%"
          size={130}
          color={C.green}
          delay={30}
        />
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 38,
            color: C.ink,
          }}
        >
          confianza
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 600,
            fontSize: 28,
            color: C.dim,
          }}
        >
          de quien pide latte
        </div>
      </div>
    </div>
    <Sfx src="ding.wav" at={40} volume={0.35} />
  </Stage>
);
const Lift = () => (
  <Stage gap={30}>
    <Grande valor={R.lift} dec={2} suf="×" size={190} color={C.yellow} />
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: 46,
        color: C.dim,
        textAlign: "center",
      }}
    >
      más de lo esperado por azar (lift)
    </div>
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: 60,
        color: C.bg,
        background: MOR,
        borderRadius: 24,
        padding: "16px 32px",
      }}
    >
      Combo: latte + pan dulce
    </div>
    <Codigo
      lineas={[
        'soporte = (t["latte"] & t["pan"]).mean()',
        'confianza = soporte / t["latte"].mean()',
      ]}
      delay={60}
      size={28}
    />
    <Respuesta texto="el pan dulce" delay={100} />
  </Stage>
);

const E = [
  { nombre: "Gancho", voz: "g1", el: <Gancho /> },
  { nombre: "Reto", voz: "g2", el: <RetoE /> },
  { nombre: "Tickets", voz: "g3", el: <Tickets />, min: 160 },
  { nombre: "Regla", voz: "g4", el: <Regla />, min: 200 },
  { nombre: "Lift", voz: "g5", el: <Lift />, min: 200 },
  {
    nombre: "Mapa",
    voz: "g6",
    el: (
      <AvanceML actual="U7" siguiente="F" tema="Gran Final" color={C.green} />
    ),
    min: 150,
  },
];
const ESC = E.map((e) => ({ ...e, dur: durVoz(S, e.voz, e.min ?? 120) }));
export const Nos7Asociacion: React.FC = () => (
  <Capitulo parte={7} short={S} serie={SERIE_NOS} acento={MOR} escenas={ESC} />
);
export const TOTAL_NOS7 = duracionTotal(ESC.map((e) => e.dur));
