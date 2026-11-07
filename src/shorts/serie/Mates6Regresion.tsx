import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Sfx, Stage, Sticker, Words } from "../../kit/kit";
import { C, FONT } from "../../kit/theme";
import {
  Avance,
  Capitulo,
  Dispersion,
  duracionTotal,
  fmt,
  Formula,
  Nota,
  prog,
} from "../../kit/serie";

// Parte 6: Regresión lineal. Casas ilustrativas: m² → precio (millones de pesos).
const M2 = [60, 75, 90, 100, 120, 140, 160, 180];
const PRECIO = [1.3, 1.5, 1.9, 2.0, 2.5, 2.8, 3.3, 3.6];

// Mínimos cuadrados.
const n = M2.length;
const mx = M2.reduce((a, b) => a + b, 0) / n;
const my = PRECIO.reduce((a, b) => a + b, 0) / n;
const M =
  M2.reduce((s, x, i) => s + (x - mx) * (PRECIO[i] - my), 0) /
  M2.reduce((s, x) => s + (x - mx) ** 2, 0);
const B = my - M * mx;
const PRED_130 = M * 130 + B; // ≈ 2.65

const XR: [number, number] = [40, 200];
const YR: [number, number] = [0, 4.5];

const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={30}>
      <Words
        text="Con una *línea* puedes adivinar el precio de una casa"
        size={80}
        stagger={1}
        accent={C.yellow}
      />
      <Dispersion
        xs={M2}
        ys={PRECIO}
        xr={XR}
        yr={YR}
        xLabel="Tamaño (m²)"
        yLabel="Precio (millones)"
        color={C.blue}
        recta={{ m: M, b: B, p: prog(frame, 30, 80) }}
      />
      <Nota>Ejemplo simplificado</Nota>
      <Sfx src="whoosh.wav" at={30} volume={0.35} />
    </Stage>
  );
};

const Puntos: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={30}>
      <Words text="Cada punto es una *casa*" size={90} accent={C.blue} />
      <Dispersion
        xs={M2}
        ys={PRECIO}
        xr={XR}
        yr={YR}
        xLabel="Tamaño (m²)"
        yLabel="Precio (millones)"
        color={C.blue}
        aparicion={prog(frame, 15, 70)}
      />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 48,
          color: C.dim,
          opacity: prog(frame, 80, 90),
        }}
      >
        más metros → más precio… más o menos
      </div>
      {M2.map((_, i) => (
        <Sfx key={i} src="tick.wav" at={15 + i * 7} volume={0.3} />
      ))}
    </Stage>
  );
};

const Recta: React.FC = () => {
  const frame = useCurrentFrame();
  // La recta "busca": empieza mal y se acomoda en la de mínimo error.
  const t = interpolate(frame, [40, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const m =
    0.002 + (M - 0.002) * t + 0.006 * Math.sin(t * Math.PI * 2) * (1 - t);
  const b = 2.4 + (B - 2.4) * t;
  return (
    <Stage gap={30}>
      <Words text="La *regresión* *lineal*" size={92} accent={C.yellow} />
      <Formula delay={10} size={66}>
        y = m·x + b
      </Formula>
      <Dispersion
        xs={M2}
        ys={PRECIO}
        xr={XR}
        yr={YR}
        xLabel="Tamaño (m²)"
        yLabel="Precio (millones)"
        color={C.blue}
        recta={{ m, b, p: 1 }}
      />
      <Words
        text="Busca la recta más *cercana* a todos"
        size={60}
        weight={800}
        delay={60}
        accent={C.green}
      />
    </Stage>
  );
};

const ErrorEscena: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={30}>
      <Words text="¿Cuál recta es la *mejor*?" size={90} accent={C.yellow} />
      <Dispersion
        xs={M2}
        ys={PRECIO}
        xr={XR}
        yr={YR}
        xLabel="Tamaño (m²)"
        yLabel="Precio (millones)"
        color={C.blue}
        recta={{ m: M, b: B, p: 1 }}
        residuos={prog(frame, 20, 60)}
      />
      <Formula delay={60} size={48}>
        Error = Σ (real − predicho)²
      </Formula>
      <Sticker delay={110} bg={C.green} color={C.bg}>
        La de menor error gana
      </Sticker>
      <Sfx src="pop.wav" at={110} />
    </Stage>
  );
};

const Prediccion: React.FC = () => {
  const frame = useCurrentFrame();
  const L = 90;
  const W = 860;
  const H = 620;
  const px = (x: number) => L + ((W - L - 30) * (x - XR[0])) / (XR[1] - XR[0]);
  const py = (y: number) =>
    H - 80 - ((H - 80 - 30) * (y - YR[0])) / (YR[1] - YR[0]);
  const a = prog(frame, 20, 50);
  const b = prog(frame, 50, 80);
  const extra = (
    <g>
      <line
        x1={px(130)}
        y1={py(0)}
        x2={px(130)}
        y2={py(0) + (py(PRED_130) - py(0)) * a}
        stroke={C.green}
        strokeWidth={6}
        strokeDasharray="14 10"
      />
      <line
        x1={px(130)}
        y1={py(PRED_130)}
        x2={px(130) + (px(XR[0]) - px(130)) * b}
        y2={py(PRED_130)}
        stroke={C.green}
        strokeWidth={6}
        strokeDasharray="14 10"
      />
      <circle cx={px(130)} cy={py(PRED_130)} r={20 * a} fill={C.green} />
      <text
        x={px(130)}
        y={py(0) + 0}
        dy={-14}
        fill={C.green}
        fontFamily={FONT}
        fontWeight={900}
        fontSize={34}
        textAnchor="middle"
        opacity={a}
      >
        130 m²
      </text>
    </g>
  );
  return (
    <Stage gap={30}>
      <Words text="Ahora *predice*" size={96} accent={C.green} />
      <Dispersion
        xs={M2}
        ys={PRECIO}
        xr={XR}
        yr={YR}
        xLabel="Tamaño (m²)"
        yLabel="Precio (millones)"
        color={C.blue}
        recta={{ m: M, b: B, p: 1 }}
        extra={extra}
      />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 100,
          color: C.green,
          opacity: prog(frame, 80, 92),
        }}
      >
        ≈ ${fmt(PRED_130, 2)} millones
      </div>
      <Words
        text="También se usa para estimar ventas, demanda y más."
        size={52}
        weight={800}
        delay={120}
        color={C.dim}
      />
      <Sfx src="ding.wav" at={82} volume={0.4} />
    </Stage>
  );
};

export const DUR_M6 = [140, 170, 200, 190, 230, 150];

export const Mates6Regresion: React.FC = () => (
  <Capitulo
    parte={6}
    short="mates6"
    acento={C.blue}
    escenas={[
      { nombre: "Gancho", dur: DUR_M6[0], voz: "r1", el: <Gancho /> },
      { nombre: "Puntos", dur: DUR_M6[1], voz: "r2", el: <Puntos /> },
      { nombre: "Recta", dur: DUR_M6[2], voz: "r3", el: <Recta /> },
      { nombre: "Error", dur: DUR_M6[3], voz: "r4", el: <ErrorEscena /> },
      { nombre: "Predicción", dur: DUR_M6[4], voz: "r5", el: <Prediccion /> },
      {
        nombre: "Avance",
        dur: DUR_M6[5],
        voz: "r6",
        el: (
          <Avance
            parte={7}
            tema="Vectores y similitud"
            gancho="¿Y si tus gustos fueran *flechas*?"
          />
        ),
      },
    ]}
  />
);

export const TOTAL_M6 = duracionTotal(DUR_M6);
