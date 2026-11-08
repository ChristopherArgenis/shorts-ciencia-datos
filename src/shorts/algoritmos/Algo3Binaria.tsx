import React from "react";
import { useCurrentFrame } from "remotion";
import { Sfx, Stage, Sticker, Words } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import {
  Avance,
  Capitulo,
  Codigo,
  duracionTotal,
  fmt,
  Formula,
  Nota,
  prog,
  SERIE_ALGORITMOS,
  Tarjeta,
} from "../../kit/serie";

// Parte 3: Búsqueda binaria. Número secreto de ejemplo: 742,861 (se encuentra en 18 intentos).
const MAX = 1000000;
const SECRETO = 742861;
type Paso = {
  lo: number;
  hi: number;
  g: number;
  dir: "alto" | "bajo" | "¡sí!";
};
const PASOS: Paso[] = (() => {
  const out: Paso[] = [];
  let lo = 1;
  let hi = MAX;
  for (;;) {
    const g = Math.floor((lo + hi) / 2);
    if (g === SECRETO) {
      out.push({ lo, hi, g, dir: "¡sí!" });
      break;
    }
    out.push({ lo, hi, g, dir: g < SECRETO ? "alto" : "bajo" });
    if (g < SECRETO) lo = g + 1;
    else hi = g - 1;
  }
  return out;
})();

/** Recta del 1 al millón con el rango vivo resaltado. */
const Rango: React.FC<{ paso: Paso; mostrarIntento?: boolean }> = ({
  paso,
  mostrarIntento = true,
}) => {
  const W = 860;
  const x = (v: number) => 30 + ((W - 60) * (v - 1)) / (MAX - 1);
  return (
    <svg width={W} height={170} viewBox={`0 0 ${W} 170`}>
      <rect x={30} y={70} width={W - 60} height={34} rx={17} fill={C.bg2} />
      <rect
        x={x(paso.lo)}
        y={70}
        width={Math.max(6, x(paso.hi) - x(paso.lo))}
        height={34}
        rx={17}
        fill={C.blue}
      />
      {mostrarIntento ? (
        <g>
          <line
            x1={x(paso.g)}
            y1={50}
            x2={x(paso.g)}
            y2={124}
            stroke={C.yellow}
            strokeWidth={6}
          />
          <text
            x={Math.min(W - 120, Math.max(120, x(paso.g)))}
            y={40}
            fill={C.yellow}
            fontFamily={MONO}
            fontWeight={700}
            fontSize={36}
            textAnchor="middle"
          >
            {fmt(paso.g)}
          </text>
        </g>
      ) : null}
      <text x={30} y={160} fill={C.dim} fontFamily={MONO} fontSize={28}>
        1
      </text>
      <text
        x={W - 30}
        y={160}
        fill={C.dim}
        fontFamily={MONO}
        fontSize={28}
        textAnchor="end"
      >
        1,000,000
      </text>
    </svg>
  );
};

const Gancho: React.FC = () => (
  <Stage gap={50}>
    <Words
      text="Piensa un número del *1* al *1,000,000*"
      size={88}
      stagger={1}
      accent={C.yellow}
    />
    <Words
      text="Lo adivino en *20* intentos o menos."
      size={76}
      delay={40}
      accent={C.green}
    />
    <Rango
      paso={{ lo: 1, hi: MAX, g: 1, dir: "alto" }}
      mostrarIntento={false}
    />
    <Sfx src="pop.wav" at={40} />
  </Stage>
);

const Primero: React.FC = () => {
  const frame = useCurrentFrame();
  const p0 = PASOS[0];
  const ya = frame > 60;
  return (
    <Stage gap={40}>
      <Words text="Intento 1: la *mitad*" size={92} accent={C.yellow} />
      <Rango paso={ya ? { ...p0, lo: p0.g + 1 } : p0} />
      <div
        style={{
          display: "flex",
          gap: 30,
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 60,
        }}
      >
        <span style={{ color: C.green, opacity: prog(frame, 50, 60) }}>
          ¿Más alto? ✓
        </span>
      </div>
      <Words
        text="Adiós a la mitad de abajo"
        size={60}
        weight={800}
        delay={70}
        color={C.dim}
      />
      <Sfx src="whoosh.wav" at={60} volume={0.35} />
    </Stage>
  );
};

const Descartes: React.FC = () => {
  const frame = useCurrentFrame();
  const i = Math.min(
    PASOS.length - 1,
    Math.floor(prog(frame, 15, 190) * (PASOS.length - 1)),
  );
  const p = PASOS[i];
  const restantes = p.hi - p.lo + 1;
  return (
    <Stage gap={36}>
      <Words
        text="Cada respuesta descarta la *mitad*"
        size={84}
        accent={C.yellow}
      />
      <Rango paso={p} />
      <div
        style={{ display: "flex", gap: 40, fontFamily: FONT, fontWeight: 900 }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 44, color: C.dim }}>intento</div>
          <div style={{ fontSize: 120, color: C.yellow }}>{i + 1}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 44, color: C.dim }}>quedan</div>
          <div
            style={{
              fontSize: 120,
              color: C.blue,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {fmt(restantes)}
          </div>
        </div>
      </div>
      <Nota>Número secreto de ejemplo: {fmt(SECRETO)}</Nota>
      {PASOS.slice(0, 12).map((_, k) => (
        <Sfx
          key={k}
          src="tick.wav"
          at={15 + Math.round((k * 175) / (PASOS.length - 1))}
          volume={0.25}
        />
      ))}
    </Stage>
  );
};

const Encontrado: React.FC = () => {
  return (
    <Stage gap={36}>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 140,
          color: C.green,
        }}
      >
        ¡{fmt(SECRETO)}!
      </div>
      <Words
        text={`En *${PASOS.length}* intentos`}
        size={80}
        accent={C.green}
      />
      <Formula delay={40} size={60}>
        log₂(1,000,000) ≈ 20
      </Formula>
      <Words
        text="Se llama *búsqueda* *binaria*"
        size={72}
        delay={70}
        accent={C.yellow}
      />
      <Sticker delay={130} bg={C.coral} color={C.ink}>
        Solo funciona con datos ordenados
      </Sticker>
      <Sfx src="ding.wav" at={2} volume={0.45} />
      <Sfx src="pop.wav" at={130} />
    </Stage>
  );
};

const Aplicacion: React.FC = () => (
  <Stage gap={30}>
    <Words
      text="Así la usa un *científico* *de* *datos*"
      size={78}
      accent={C.blue}
    />
    <Tarjeta
      titulo="Buscar en datos ordenados"
      texto="fechas, precios o identificadores, sin revisar fila por fila"
      color={C.blue}
      delay={20}
    />
    <Codigo
      lineas={[
        'fechas.searchsorted("2026-03-01")',
        "# ¿en qué posición cae esta fecha?",
      ]}
      delay={70}
      size={38}
    />
    <Tarjeta
      titulo="Millones de filas"
      texto="unos 20 pasos en vez de un millón"
      color={C.green}
      delay={120}
    />
    <Sfx src="pop.wav" at={20} />
    <Sfx src="pop.wav" at={120} />
  </Stage>
);

export const DUR_A3 = [185, 160, 210, 245, 280, 175];

export const Algo3Binaria: React.FC = () => (
  <Capitulo
    parte={3}
    short="algo3"
    serie={SERIE_ALGORITMOS}
    acento={C.blue}
    escenas={[
      { nombre: "Gancho", dur: DUR_A3[0], voz: "c1", el: <Gancho /> },
      { nombre: "Primer intento", dur: DUR_A3[1], voz: "c2", el: <Primero /> },
      { nombre: "Descartes", dur: DUR_A3[2], voz: "c3", el: <Descartes /> },
      { nombre: "Encontrado", dur: DUR_A3[3], voz: "c4", el: <Encontrado /> },
      { nombre: "Aplicación", dur: DUR_A3[4], voz: "c5", el: <Aplicacion /> },
      {
        nombre: "Avance",
        dur: DUR_A3[5],
        voz: "c6",
        el: (
          <Avance
            parte={4}
            tema="Tablas hash"
            gancho="¿Cómo te encuentran entre *millones*?"
          />
        ),
      },
    ]}
  />
);

export const TOTAL_A3 = duracionTotal(DUR_A3);
