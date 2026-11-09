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
  SERIE_SUP,
} from "../../kit/serie";
import { AvanceML, Respuesta, Reto } from "../../kit/ml";
import { Grande, NAR } from "./comun";
import datos from "../../datos/ml_sup.json";

const D = datos.s6;
const S = "sup6" as const;
const ET = D.etapas as Record<string, number>;

const Grafica: React.FC<{ hasta: number; marcas?: number[] }> = ({
  hasta,
  marcas = [],
}) => {
  const W = 880,
    H = 540,
    L = 90,
    B = 70;
  const x = (v: number) => L + ((W - L - 80) * Math.log10(v)) / Math.log10(200);
  const y = (v: number) => H - B - ((H - B - 70) * v) / 30;
  const pts = (D.curva as [number, number][]).filter(([i]) => i <= hasta);
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <line
        x1={L}
        y1={H - B}
        x2={W - 10}
        y2={H - B}
        stroke={C.dim}
        strokeWidth={4}
      />
      <line x1={L} y1={20} x2={L} y2={H - B} stroke={C.dim} strokeWidth={4} />
      {[1, 10, 100, 200].map((v) => (
        <text
          key={v}
          x={x(v)}
          y={H - 30}
          fill={C.dim}
          fontFamily={MONO}
          fontSize={28}
          textAnchor="middle"
        >
          {v}
        </text>
      ))}
      {[0, 10, 20, 30].map((v) => (
        <text
          key={v}
          x={L - 14}
          y={y(v) + 10}
          fill={C.dim}
          fontFamily={MONO}
          fontSize={28}
          textAnchor="end"
        >
          {v}
        </text>
      ))}
      <text
        x={(W + L) / 2}
        y={H}
        fill={C.dim}
        fontFamily={FONT}
        fontWeight={800}
        fontSize={30}
        textAnchor="middle"
      >
        árboles en la cadena
      </text>
      <path
        d={pts
          .map(
            ([a, b], i) =>
              `${i ? "L" : "M"}${x(a).toFixed(1)},${y(b).toFixed(1)}`,
          )
          .join(" ")}
        fill="none"
        stroke={NAR}
        strokeWidth={8}
      />
      {marcas.map((m) => (
        <g key={m}>
          <circle
            cx={x(m)}
            cy={y(ET[String(m)])}
            r={14}
            fill="#fff"
            stroke={NAR}
            strokeWidth={5}
          />
          <text
            x={x(m)}
            y={y(ET[String(m)]) - 24}
            fill={C.ink}
            fontFamily={FONT}
            fontWeight={900}
            fontSize={34}
            textAnchor="middle"
          >
            {ET[String(m)]}
          </text>
        </g>
      ))}
    </svg>
  );
};

const Gancho = () => (
  <Stage gap={40}>
    <Words
      text="Cada modelo nuevo corrige al *anterior*"
      size={88}
      stagger={1}
      accent={NAR}
    />
    <div
      style={{
        display: "flex",
        gap: 14,
        alignItems: "center",
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: 60,
        color: NAR,
      }}
    >
      {["▲", "→", "▲", "→", "▲", "→", "…"].map((t, i) => (
        <span key={i}>{t}</span>
      ))}
    </div>
  </Stage>
);
const RetoE = () => (
  <Stage>
    <Reto pregunta="¿Más modelos en la cadena siempre es mejor?" />
  </Stage>
);
const Primero = () => (
  <Stage gap={30}>
    <Words text="El primer árbol falla por…" size={84} />
    <Grande valor={ET["1"]} dec={1} pre="± " color={C.coral} />
    <div
      style={{ fontFamily: FONT, fontWeight: 800, fontSize: 48, color: C.dim }}
    >
      tazas al día
    </div>
    <Nota>Ventas ficticias de Café Datos · modelo entrenado de verdad</Nota>
  </Stage>
);
const Cadena = () => {
  const f = useCurrentFrame();
  const hasta = Math.round(1 + prog(f, 10, 120) * 19);
  return (
    <Stage gap={26}>
      <Words text="Cada uno aprende de los *errores*" size={80} accent={NAR} />
      <Grafica hasta={hasta} marcas={hasta >= 20 ? [1, 5, 20] : [1]} />
      <Codigo
        lineas={[
          "from sklearn.ensemble import GradientBoostingRegressor",
          "GradientBoostingRegressor(n_estimators=200)",
        ]}
        delay={60}
        size={24}
      />
      <Sfx src="tick.wav" at={30} />
    </Stage>
  );
};
const Mas = () => {
  const f = useCurrentFrame();
  return (
    <Stage gap={30}>
      <Words text="Más *no* siempre es mejor" size={88} accent={C.coral} />
      <Grafica hasta={200} marcas={f > 40 ? [20, 100, 200] : [20]} />
      <Respuesta texto="no: después de 100, empeora" delay={100} />
      <Sfx src="pop.wav" at={40} />
    </Stage>
  );
};

const E = [
  { nombre: "Gancho", voz: "f1", el: <Gancho /> },
  { nombre: "Reto", voz: "f2", el: <RetoE /> },
  { nombre: "Primero", voz: "f3", el: <Primero />, min: 150 },
  { nombre: "Cadena", voz: "f4", el: <Cadena />, min: 190 },
  { nombre: "Más no es mejor", voz: "f5", el: <Mas />, min: 190 },
  {
    nombre: "Mapa",
    voz: "f6",
    el: (
      <AvanceML
        actual="S6"
        siguiente="S7"
        tema="Redes neuronales"
        color={NAR}
      />
    ),
    min: 150,
  },
];
const ESC = E.map((e) => ({ ...e, dur: durVoz(S, e.voz, e.min ?? 120) }));
export const Sup6Boosting: React.FC = () => (
  <Capitulo parte={6} short={S} serie={SERIE_SUP} acento={NAR} escenas={ESC} />
);
export const TOTAL_SUP6 = duracionTotal(ESC.map((e) => e.dur));
