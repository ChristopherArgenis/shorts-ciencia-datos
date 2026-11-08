import React from "react";
import { useCurrentFrame } from "remotion";
import { Sfx, Stage, Words } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import {
  Capitulo,
  Codigo,
  duracionTotal,
  fmt,
  Nota,
  prog,
  SERIE_ML,
} from "../../kit/serie";
import { AvanceML, ORO, Respuesta, Reto } from "../../kit/ml";
import datos from "../../datos/ml_tronco.json";

// Tronco 2: Sobreajuste. Curvas y errores reales de scripts/ml/tronco.py (ventas por hora, ficticias).
const D = datos.p2;
type G = "1" | "3" | "9";
const INFO: Record<G, { nombre: string; color: string }> = {
  "1": { nombre: "Recta", color: C.blue },
  "3": { nombre: "Curva suave", color: C.green },
  "9": { nombre: "Curva loca", color: C.coral },
};

/** Gráfica de ventas por hora con puntos de entrenamiento/prueba y curvas. */
const Grafica: React.FC<{
  grados: G[];
  prueba?: number;
  dibujo?: number;
  w?: number;
  h?: number;
}> = ({ grados, prueba = 0, dibujo = 1, w = 880, h = 560 }) => {
  const L = 70;
  const B = 60;
  const x = (v: number) => L + ((w - L - 20) * (v - 7)) / 14;
  const y = (v: number) => h - B - ((h - B - 20) * (v - 0)) / 100;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <defs>
        <clipPath id="area">
          <rect x={L} y={10} width={w - L - 10} height={h - B - 10} />
        </clipPath>
      </defs>
      <line
        x1={L}
        y1={h - B}
        x2={w - 10}
        y2={h - B}
        stroke={C.dim}
        strokeWidth={4}
      />
      <line x1={L} y1={10} x2={L} y2={h - B} stroke={C.dim} strokeWidth={4} />
      {[7, 11, 15, 19].map((t) => (
        <text
          key={t}
          x={x(t)}
          y={h - 20}
          fill={C.dim}
          fontFamily={MONO}
          fontSize={26}
          textAnchor="middle"
        >
          {t}h
        </text>
      ))}
      <g clipPath="url(#area)">
        {grados.map((g) => (
          <path
            key={g}
            d={D.grados[g].curva
              .map(
                ([a, b], i) =>
                  `${i ? "L" : "M"}${x(a).toFixed(1)},${y(b).toFixed(1)}`,
              )
              .join(" ")}
            fill="none"
            stroke={INFO[g].color}
            strokeWidth={7}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - dibujo}
          />
        ))}
      </g>
      {D.train.map(([a, b], i) => (
        <circle
          key={`t${i}`}
          cx={x(a)}
          cy={y(b)}
          r={13}
          fill={C.ink}
          stroke={C.bg}
          strokeWidth={3}
        />
      ))}
      {D.test.map(([a, b], i) => (
        <rect
          key={`p${i}`}
          x={x(a) - 12}
          y={y(b) - 12}
          width={24}
          height={24}
          fill={ORO}
          stroke={C.bg}
          strokeWidth={3}
          opacity={prueba}
          transform={`rotate(45 ${x(a)} ${y(b)})`}
        />
      ))}
    </svg>
  );
};

const Leyenda: React.FC<{ prueba?: boolean }> = ({ prueba }) => (
  <div
    style={{
      display: "flex",
      gap: 30,
      fontFamily: FONT,
      fontWeight: 800,
      fontSize: 36,
      color: C.ink,
    }}
  >
    <span>● entrenamiento</span>
    {prueba ? <span style={{ color: ORO }}>◆ datos nuevos</span> : null}
  </div>
);

const Gancho: React.FC = () => (
  <Stage gap={40}>
    <Words
      text="Este modelo acierta el *100%*… y es pésimo"
      size={86}
      stagger={1}
      accent={C.coral}
    />
    <Grafica grados={["9"]} />
    <Nota>Ventas por hora ficticias de Café Datos</Nota>
  </Stage>
);

const RetoEsc: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={30}>
      <Reto pregunta="¿Cuál de las 3 curvas es la mejor?" />
      <Grafica
        grados={["1", "3", "9"]}
        dibujo={prog(frame, 10, 60)}
        w={820}
        h={480}
      />
      <div
        style={{
          display: "flex",
          gap: 26,
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 40,
        }}
      >
        {(["1", "3", "9"] as G[]).map((g) => (
          <span key={g} style={{ color: INFO[g].color }}>
            {INFO[g].nombre}
          </span>
        ))}
      </div>
    </Stage>
  );
};

const ErrorTxt: React.FC<{ g: G; prueba: boolean }> = ({ g, prueba }) => (
  <div
    style={{
      display: "flex",
      gap: 40,
      fontFamily: FONT,
      fontWeight: 900,
      fontSize: 50,
    }}
  >
    <span style={{ color: C.ink }}>
      entrenamiento: {fmt(D.grados[g].mae_train, 1)}
    </span>
    {prueba ? (
      <span style={{ color: ORO }}>nuevos: {fmt(D.grados[g].mae_test, 1)}</span>
    ) : null}
  </div>
);

const Subajuste: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={30}>
      <Words text="La recta: muy *simple*" size={88} accent={C.blue} />
      <Grafica grados={["1"]} prueba={prog(frame, 40, 55)} />
      <Leyenda prueba />
      <ErrorTxt g="1" prueba />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 62,
          color: C.blue,
        }}
      >
        Subajuste
      </div>
    </Stage>
  );
};

const Sobre: React.FC = () => {
  const frame = useCurrentFrame();
  const nuevo = frame > 90;
  return (
    <Stage gap={30}>
      <Words text="La curva loca: *memorizó*" size={88} accent={C.coral} />
      <Grafica grados={["9"]} prueba={prog(frame, 90, 105)} />
      <Leyenda prueba={nuevo} />
      <ErrorTxt g="9" prueba={nuevo} />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 62,
          color: C.coral,
          opacity: prog(frame, 120, 130),
        }}
      >
        Sobreajuste
      </div>
      <Sfx src="boom.wav" at={95} volume={0.4} />
    </Stage>
  );
};

const Justo: React.FC = () => (
  <Stage gap={26}>
    <Words text="La de en medio *gana*" size={88} accent={C.green} />
    <Grafica grados={["3"]} prueba={1} w={840} h={470} />
    <ErrorTxt g="3" prueba />
    <Codigo
      lineas={[
        "from sklearn.model_selection import cross_val_score",
        "cross_val_score(modelo, X, y, cv=5)",
      ]}
      delay={60}
      size={24}
    />
    <Respuesta texto="la curva suave" delay={100} />
    <Sfx src="ding.wav" at={100} volume={0.4} />
  </Stage>
);

export const DUR_ML2 = [140, 210, 175, 250, 235, 135];

export const ML2Sobreajuste: React.FC = () => (
  <Capitulo
    parte={2}
    short="ml2"
    serie={SERIE_ML}
    acento={C.coral}
    escenas={[
      { nombre: "Gancho", dur: DUR_ML2[0], voz: "c1", el: <Gancho /> },
      { nombre: "Reto", dur: DUR_ML2[1], voz: "c2", el: <RetoEsc /> },
      { nombre: "Subajuste", dur: DUR_ML2[2], voz: "c3", el: <Subajuste /> },
      { nombre: "Sobreajuste", dur: DUR_ML2[3], voz: "c4", el: <Sobre /> },
      { nombre: "Justo", dur: DUR_ML2[4], voz: "c5", el: <Justo /> },
      {
        nombre: "Mapa",
        dur: DUR_ML2[5],
        voz: "c6",
        el: <AvanceML actual="T2" siguiente="T3" tema="Variables" />,
      },
    ]}
  />
);

export const TOTAL_ML2 = duracionTotal(DUR_ML2);
