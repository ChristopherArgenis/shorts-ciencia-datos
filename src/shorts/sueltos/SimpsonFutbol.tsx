import React from "react";
import { useCurrentFrame } from "remotion";
import { Sfx, Stage, Sticker, Words } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import {
  Capitulo,
  duracionTotal,
  durVoz,
  Nota,
  prog,
  Tarjeta,
} from "../../kit/serie";
import { Reto } from "../../kit/ml";

// Paradoja de Simpson en el fútbol. Ejemplo simplificado (tiros ficticios).
const S = "simfut" as const;
const A = { dentro: [18, 60], fuera: [2, 40] };
const B = { dentro: [5, 15], fuera: [10, 85] };
const pct = ([g, t]: number[]) => (100 * g) / t;
const tot = (d: typeof A) => [
  d.dentro[0] + d.fuera[0],
  d.dentro[1] + d.fuera[1],
];

const Barra: React.FC<{
  nom: string;
  v: [number, number];
  color: string;
  gana?: boolean;
  delay: number;
}> = ({ nom, v, color, gana, delay }) => {
  const f = useCurrentFrame();
  const p = pct(v);
  return (
    <div style={{ width: 860, fontFamily: FONT }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: 900,
          fontSize: 56,
          color: C.ink,
        }}
      >
        <span style={{ color }}>Delantero {nom}</span>
        <span style={{ color: gana ? C.green : C.ink }}>{p.toFixed(1)}%</span>
      </div>
      <div
        style={{
          height: 58,
          borderRadius: 29,
          background: C.bg2,
          overflow: "hidden",
          marginTop: 6,
        }}
      >
        <div
          style={{
            width: `${p * 2.6 * prog(f, delay, delay + 30)}%`,
            height: "100%",
            background: color,
            borderRadius: 29,
          }}
        />
      </div>
      <div
        style={{ fontFamily: MONO, fontSize: 32, color: C.dim, marginTop: 6 }}
      >
        {v[0]} goles de {v[1]} tiros
      </div>
    </div>
  );
};

const Gancho = () => (
  <Stage gap={40}>
    <Words
      text="Mejor efectividad… y aun así es *peor*"
      size={92}
      stagger={1}
      accent={C.coral}
    />
    <div
      style={{ display: "flex", gap: 30, fontFamily: FONT, fontWeight: 900 }}
    >
      <div style={{ fontSize: 120, color: C.blue }}>A 20%</div>
      <div style={{ fontSize: 120, color: C.dim }}>B 15%</div>
    </div>
  </Stage>
);
const RetoE = () => (
  <Stage>
    <Reto pregunta="Eres el director deportivo. ¿A quién fichas?" />
  </Stage>
);
const Total = () => (
  <Stage gap={36}>
    <Words text="Efectividad *total*" size={96} accent={C.yellow} />
    <Barra
      nom="A"
      v={tot(A) as [number, number]}
      color={C.blue}
      gana
      delay={10}
    />
    <Barra nom="B" v={tot(B) as [number, number]} color={C.purple} delay={25} />
    <Sticker delay={110} bg={C.blue} color={C.ink}>
      ¿Fichamos a A?
    </Sticker>
    <Nota>Ejemplo simplificado · tiros ficticios</Nota>
  </Stage>
);
const Area: React.FC<{ zona: "dentro" | "fuera"; titulo: string }> = ({
  zona,
  titulo,
}) => (
  <Stage gap={36}>
    <Words text={titulo} size={92} accent={C.green} />
    <Barra nom="A" v={A[zona] as [number, number]} color={C.blue} delay={10} />
    <Barra
      nom="B"
      v={B[zona] as [number, number]}
      color={C.purple}
      gana
      delay={25}
    />
    <Sticker delay={70} bg={C.green} color={C.bg}>
      Gana B
    </Sticker>
    <Sfx src="ding.wav" at={70} volume={0.35} />
  </Stage>
);

/** Cancha con los tiros de cada delantero. */
const Mapa = () => {
  const f = useCurrentFrame();
  let s = 9;
  const r = () => ((s = (s * 16807) % 2147483647), (s - 1) / 2147483646);
  const tiros = (n: number, cerca: boolean) =>
    Array.from({ length: n }).map(() =>
      cerca
        ? [270 + r() * 140, 30 + r() * 110]
        : [80 + r() * 520, 170 + r() * 220],
    );
  const ta = [...tiros(60, true), ...tiros(40, false)];
  const tb = [...tiros(15, true), ...tiros(85, false)];
  const Can: React.FC<{ pts: number[][]; c: string; t: string }> = ({
    pts,
    c,
    t,
  }) => (
    <div
      style={{
        textAlign: "center",
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: 44,
        color: c,
      }}
    >
      {t}
      <svg
        width={470}
        height={290}
        viewBox="0 0 680 420"
        style={{ display: "block" }}
      >
        <rect width={680} height={420} rx={14} fill="#123a2a" />
        <rect
          x={180}
          y={0}
          width={320}
          height={160}
          fill="none"
          stroke="#d7f5e5"
          strokeWidth={5}
          opacity={0.8}
        />
        <rect x={300} y={0} width={80} height={10} fill="#fff" />
        {pts
          .slice(0, Math.floor(prog(f, 10, 70) * pts.length))
          .map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={11} fill={c} opacity={0.85} />
          ))}
      </svg>
    </div>
  );
  return (
    <Stage gap={30}>
      <Words
        text="¿El truco? *Desde* *dónde* tira"
        size={84}
        accent={C.yellow}
      />
      <div style={{ display: "flex", gap: 30 }}>
        <Can pts={ta} c={C.blue} t="A: casi todo cerca" />
        <Can pts={tb} c={C.purple} t="B: casi todo lejos" />
      </div>
    </Stage>
  );
};
const Cierre = () => (
  <Stage gap={30}>
    <Words text="*Paradoja* *de* *Simpson*" size={104} accent={C.yellow} />
    <Tarjeta
      titulo="Antes de fichar"
      texto="pregunta desde dónde tiró, contra quién y en qué minuto"
      color={C.green}
      delay={30}
    />
    <Sticker delay={80} bg={C.yellow} rotate={2}>
      ¿Y tú a quién fichabas?
    </Sticker>
    <Sfx src="pop.wav" at={80} />
  </Stage>
);

const E = [
  { nombre: "Gancho", voz: "a1", el: <Gancho /> },
  { nombre: "Reto", voz: "a2", el: <RetoE /> },
  { nombre: "Total", voz: "a3", el: <Total />, min: 210 },
  {
    nombre: "Dentro",
    voz: "a4",
    el: <Area zona="dentro" titulo="Dentro del *área*" />,
    min: 170,
  },
  {
    nombre: "Fuera",
    voz: "a5",
    el: <Area zona="fuera" titulo="Fuera del *área*" />,
    min: 160,
  },
  { nombre: "Mapa", voz: "a6", el: <Mapa />, min: 190 },
  { nombre: "Cierre", voz: "a7", el: <Cierre />, min: 170 },
];
const ESC = E.map((e) => ({ ...e, dur: durVoz(S, e.voz, e.min ?? 120) }));
export const SimpsonFutbol: React.FC = () => (
  <Capitulo parte={1} short={S} suelto acento={C.green} escenas={ESC} />
);
export const TOTAL_SIMFUT = duracionTotal(ESC.map((e) => e.dur));
