import React from "react";
import { useCurrentFrame } from "remotion";
import { Sfx, Stage, Words } from "../../kit/kit";
import { C, FONT } from "../../kit/theme";
import {
  Capitulo,
  Codigo,
  duracionTotal,
  durVoz,
  prog,
  SERIE_SUP,
} from "../../kit/serie";
import { AvanceML, Respuesta, Reto } from "../../kit/ml";
import {
  ESPECIE,
  FuentePinguinos,
  Leyenda,
  PicoPlot,
} from "../../kit/pinguinos";
import { NAR } from "./comun";
import datos from "../../datos/ml_sup.json";

const D = datos.s2;
const S = "sup2" as const;
const P = D.puntos as [number, number, string][];
const Estrella = (x: (v: number) => number, y: (v: number) => number) => (
  <g>
    <circle
      cx={x(D.nuevo[0])}
      cy={y(D.nuevo[1])}
      r={22}
      fill="#fff"
      stroke={NAR}
      strokeWidth={6}
    />
    <text
      x={x(D.nuevo[0])}
      y={y(D.nuevo[1]) + 12}
      fill={C.bg}
      fontFamily={FONT}
      fontWeight={900}
      fontSize={34}
      textAnchor="middle"
    >
      ?
    </text>
  </g>
);

const Gancho = () => (
  <Stage gap={40}>
    <Words text="Dime *con* *quién* *andas*…" size={96} accent={NAR} />
    <Words
      text="…y te diré qué pingüino eres"
      size={70}
      delay={30}
      color={C.dim}
    />
  </Stage>
);
const RetoE = () => (
  <Stage gap={30}>
    <Reto pregunta="¿De qué especie es el pingüino misterioso?" />
    <PicoPlot puntos={P} gris extra={Estrella} w={820} h={560} />
  </Stage>
);
const Puntos = () => {
  const f = useCurrentFrame();
  return (
    <Stage gap={26}>
      <Words text="Cada punto, un pingüino *real*" size={80} accent={NAR} />
      <PicoPlot puntos={P} aparicion={prog(f, 10, 60)} extra={Estrella} />
      <Leyenda />
      <FuentePinguinos />
    </Stage>
  );
};
const Vecinos = () => {
  const f = useCurrentFrame();
  const p = prog(f, 20, 60);
  return (
    <Stage gap={26}>
      <Words text="Los *5* más cercanos votan" size={84} accent={NAR} />
      <PicoPlot
        puntos={P}
        extra={(x, y) => (
          <g>
            <circle
              cx={x(D.nuevo[0])}
              cy={y(D.nuevo[1])}
              r={90 * p}
              fill="none"
              stroke={NAR}
              strokeWidth={5}
              strokeDasharray="10 8"
            />
            {D.vecinos_idx.map(([a, b], i) => (
              <line
                key={i}
                x1={x(D.nuevo[0])}
                y1={y(D.nuevo[1])}
                x2={x(a)}
                y2={y(b)}
                stroke={NAR}
                strokeWidth={4}
                opacity={p}
              />
            ))}
            {Estrella(x, y)}
          </g>
        )}
      />
      <div style={{ display: "flex", gap: 12, opacity: prog(f, 70, 85) }}>
        {D.vecinos.map((v, i) => (
          <span
            key={i}
            style={{
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 34,
              color: C.bg,
              background: ESPECIE[v].color,
              borderRadius: 14,
              padding: "6px 14px",
            }}
          >
            {ESPECIE[v].nombre}
          </span>
        ))}
      </div>
      <Respuesta texto={ESPECIE[D.pred].nombre} delay={110} />
      <Sfx src="ding.wav" at={110} volume={0.35} />
    </Stage>
  );
};
const K = () => {
  const f = useCurrentFrame();
  const acc = D.acc_k as Record<string, number>;
  return (
    <Stage gap={30}>
      <Words text="¿Cuántos *vecinos*?" size={92} accent={NAR} />
      {["1", "5", "25"].map((k, i) => (
        <div
          key={k}
          style={{
            width: 860,
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 48,
          }}
        >
          <span style={{ width: 150, color: C.ink }}>k = {k}</span>
          <div
            style={{
              flex: 1,
              height: 64,
              background: C.bg2,
              borderRadius: 32,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${(acc[k] - 80) * 5 * prog(f, 15 + i * 10, 45 + i * 10)}%`,
                height: "100%",
                background: k === "5" ? C.green : NAR,
              }}
            />
          </div>
          <span style={{ width: 170, color: k === "5" ? C.green : C.ink }}>
            {acc[k].toFixed(1)}%
          </span>
        </div>
      ))}
      <Codigo
        lineas={[
          "from sklearn.neighbors import KNeighborsClassifier",
          "KNeighborsClassifier(n_neighbors=5)",
        ]}
        delay={70}
        size={24}
      />
    </Stage>
  );
};

const E = [
  { nombre: "Gancho", voz: "b1", el: <Gancho /> },
  { nombre: "Reto", voz: "b2", el: <RetoE />, min: 150 },
  { nombre: "Puntos", voz: "b3", el: <Puntos /> },
  { nombre: "Vecinos", voz: "b4", el: <Vecinos />, min: 220 },
  { nombre: "k", voz: "b5", el: <K /> },
  {
    nombre: "Mapa",
    voz: "b6",
    el: (
      <AvanceML
        actual="S2"
        siguiente="S3"
        tema="Regresión logística"
        color={NAR}
      />
    ),
    min: 150,
  },
];
const ESC = E.map((e) => ({ ...e, dur: durVoz(S, e.voz, e.min ?? 120) }));
export const Sup2KNN: React.FC = () => (
  <Capitulo parte={2} short={S} serie={SERIE_SUP} acento={NAR} escenas={ESC} />
);
export const TOTAL_SUP2 = duracionTotal(ESC.map((e) => e.dur));
