import React from "react";
import { useCurrentFrame } from "remotion";
import { Sfx, Stage, Words } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import {
  Capitulo,
  Codigo,
  duracionTotal,
  durVoz,
  prog,
  SERIE_SUP,
} from "../../kit/serie";
import { AvanceML, Respuesta, Reto } from "../../kit/ml";
import { FuentePinguinos } from "../../kit/pinguinos";
import { Grande, NAR } from "./comun";
import datos from "../../datos/ml_sup.json";

const D = datos.s7;
const S = "sup7" as const;
const ENT = ["pico largo", "pico grueso", "aleta", "peso"];
const SAL = ["Adelia", "Barbijo", "Papúa"];

const Red: React.FC<{ p?: number; pulso?: number }> = ({
  p = 1,
  pulso = 0,
}) => {
  const W = 880,
    H = 640;
  const capas = D.capas;
  const xs = capas.map((_, i) => 230 + (i * (W - 420)) / (capas.length - 1));
  const ys = (n: number) =>
    Array.from({ length: n }).map((_, j) => 40 + ((j + 0.5) * (H - 80)) / n);
  const lineas: React.ReactNode[] = [];
  capas.slice(0, -1).forEach((n, i) => {
    ys(n).forEach((ya, a) =>
      ys(capas[i + 1]).forEach((yb, b) => {
        const k = (a * 7 + b * 3 + i) % 10;
        lineas.push(
          <line
            key={`${i}-${a}-${b}`}
            x1={xs[i]}
            y1={ya}
            x2={xs[i + 1]}
            y2={yb}
            stroke={k < 5 ? NAR : C.blue}
            strokeWidth={1 + ((k + Math.floor(pulso)) % 4)}
            opacity={0.35 * p}
          />,
        );
      }),
    );
  });
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {lineas}
      {capas.map((n, i) =>
        ys(n).map((y, j) => (
          <circle
            key={`${i}-${j}`}
            cx={xs[i]}
            cy={y}
            r={i === 1 ? 13 : 18}
            fill={i === 0 ? C.yellow : i === capas.length - 1 ? C.green : NAR}
            opacity={p}
          />
        )),
      )}
      {ENT.map((t, j) => (
        <text
          key={t}
          x={xs[0] - 28}
          y={ys(4)[j] + 10}
          fill={C.ink}
          fontFamily={FONT}
          fontWeight={800}
          fontSize={26}
          textAnchor="end"
        >
          {t}
        </text>
      ))}
      {SAL.map((t, j) => (
        <text
          key={t}
          x={xs[3] + 30}
          y={ys(3)[j] + 10}
          fill={C.ink}
          fontFamily={FONT}
          fontWeight={800}
          fontSize={28}
        >
          {t}
        </text>
      ))}
    </svg>
  );
};

const Gancho = () => (
  <Stage gap={30}>
    <Grande valor={D.params} color={NAR} size={240} />
    <Words
      text="perillas que se *ajustan* *solas*"
      size={80}
      delay={30}
      accent={NAR}
    />
  </Stage>
);
const RetoE = () => (
  <Stage>
    <Reto pregunta="¿Cuántas medidas de cada pingüino necesita la red?" />
  </Stage>
);
const Capas = () => {
  const f = useCurrentFrame();
  return (
    <Stage gap={20}>
      <Words text="Capas de *neuronas*" size={88} accent={NAR} />
      <Red p={prog(f, 10, 50)} />
      <div style={{ fontFamily: MONO, fontSize: 32, color: C.dim }}>
        4 → 16 → 8 → 3
      </div>
      <Respuesta texto="solo 4 medidas" delay={90} />
    </Stage>
  );
};
const Perillas = () => {
  const f = useCurrentFrame();
  const W = 860,
    H = 380,
    L = 70;
  const pl = D.perdida;
  const n = Math.max(2, Math.round(prog(f, 40, 160) * pl.length));
  const mx = Math.max(...pl);
  return (
    <Stage gap={20}>
      <Red pulso={f / 6} />
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <line
          x1={L}
          y1={H - 50}
          x2={W - 10}
          y2={H - 50}
          stroke={C.dim}
          strokeWidth={4}
        />
        <line
          x1={L}
          y1={10}
          x2={L}
          y2={H - 50}
          stroke={C.dim}
          strokeWidth={4}
        />
        <text
          x={30}
          y={(H - 50) / 2}
          fill={C.dim}
          fontFamily={FONT}
          fontWeight={800}
          fontSize={30}
          textAnchor="middle"
          transform={`rotate(-90 30 ${(H - 50) / 2})`}
        >
          error
        </text>
        <text
          x={(W + L) / 2}
          y={H - 10}
          fill={C.dim}
          fontFamily={FONT}
          fontWeight={800}
          fontSize={30}
          textAnchor="middle"
        >
          entrenamiento ({D.epocas} rondas) →
        </text>
        <path
          d={pl
            .slice(0, n)
            .map(
              (v, i) =>
                `${i ? "L" : "M"}${(L + ((W - L - 20) * i) / (pl.length - 1)).toFixed(1)},${(H - 50 - ((H - 70) * v) / mx).toFixed(1)}`,
            )
            .join(" ")}
          fill="none"
          stroke={NAR}
          strokeWidth={7}
        />
      </svg>
    </Stage>
  );
};
const Resultado = () => (
  <Stage gap={30}>
    <Grande valor={D.acc} dec={1} suf="%" color={C.green} size={200} />
    <div
      style={{ fontFamily: FONT, fontWeight: 800, fontSize: 48, color: C.dim }}
    >
      aciertos con pingüinos que no vio
    </div>
    <Codigo
      lineas={[
        "from sklearn.neural_network import MLPClassifier",
        "MLPClassifier(hidden_layer_sizes=(16, 8))",
      ]}
      delay={40}
      size={24}
    />
    <FuentePinguinos />
    <Sfx src="ding.wav" at={40} volume={0.35} />
  </Stage>
);

const E = [
  { nombre: "Gancho", voz: "g1", el: <Gancho /> },
  { nombre: "Reto", voz: "g2", el: <RetoE /> },
  { nombre: "Capas", voz: "g3", el: <Capas />, min: 170 },
  { nombre: "Perillas", voz: "g4", el: <Perillas />, min: 220 },
  { nombre: "Resultado", voz: "g5", el: <Resultado /> },
  {
    nombre: "Mapa",
    voz: "g6",
    el: (
      <AvanceML
        actual="S7"
        siguiente="S8"
        tema="Proyecto completo"
        color={NAR}
      />
    ),
    min: 150,
  },
];
const ESC = E.map((e) => ({ ...e, dur: durVoz(S, e.voz, e.min ?? 120) }));
export const Sup7Red: React.FC = () => (
  <Capitulo parte={7} short={S} serie={SERIE_SUP} acento={NAR} escenas={ESC} />
);
export const TOTAL_SUP7 = duracionTotal(ESC.map((e) => e.dur));
