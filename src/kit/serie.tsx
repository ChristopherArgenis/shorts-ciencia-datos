import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { Narracion, Musica, type Linea } from "./voz";
import { Bg, Sfx, Stage, Sticker, Words, useIn } from "./kit";
import { C, FONT, HANDLE, MONO } from "./theme";
import duraciones from "../voz-duraciones.json";

// Plantilla de la serie "Matemáticas que sí usa un científico de datos".

export const SERIE = "MATES DE CIENTÍFICO DE DATOS";
export const TOTAL_PARTES = 8;
export const COLOR_SERIE = C.yellow;
const T = 8; // duración de cada transición (frames)

/** Datos de la serie (nombre en la etiqueta, total de partes, color). */
export type SerieInfo = { nombre: string; total: number; color: string };
export const SERIE_MATES: SerieInfo = {
  nombre: SERIE,
  total: TOTAL_PARTES,
  color: COLOR_SERIE,
};
export const SERIE_ALGORITMOS: SerieInfo = {
  nombre: "ESTRUCTURAS Y ALGORITMOS",
  total: 10,
  color: C.blue,
};
const SerieCtx = React.createContext<SerieInfo>(SERIE_MATES);
export const useSerie = () => React.useContext(SerieCtx);

/** Formato numérico de México: 15,000 y 0.25 */
export const fmt = (n: number, dec = 0) =>
  n.toLocaleString("es-MX", {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  });

/** Etiqueta fija de la serie arriba del video. */
export const Etiqueta: React.FC<{ parte: number }> = ({ parte }) => {
  const serie = useSerie();
  return (
    <div
      style={{
        position: "absolute",
        top: 96,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: "#0b1020cc",
          border: `3px solid ${serie.color}`,
          borderRadius: 40,
          padding: "10px 26px",
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 34,
          color: C.ink,
          letterSpacing: 1,
        }}
      >
        <span>{serie.nombre}</span>
        <span
          style={{
            background: serie.color,
            color: C.bg,
            borderRadius: 24,
            padding: "2px 16px",
          }}
        >
          {parte}/{serie.total}
        </span>
      </div>
      <div style={{ fontFamily: MONO, fontSize: 28, color: C.dim }}>
        {HANDLE}
      </div>
    </div>
  );
};

/** Fórmula en una caja tipo pizarrón. */
export const Formula: React.FC<{
  children: React.ReactNode;
  delay?: number;
  size?: number;
}> = ({ children, delay = 0, size = 58 }) => {
  const p = useIn(delay, 12);
  const { color } = useSerie();
  return (
    <div
      style={{
        fontFamily: MONO,
        fontWeight: 700,
        fontSize: size,
        color: C.ink,
        background: "#0a0d1a",
        border: `4px solid ${color}`,
        borderRadius: 24,
        padding: "22px 34px",
        textAlign: "center",
        opacity: p,
        scale: 0.85 + 0.15 * p,
        boxShadow: `0 0 50px ${color}33`,
      }}
    >
      {children}
    </div>
  );
};

export const Nota: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily: MONO,
      fontSize: 28,
      color: C.dim,
      textAlign: "center",
    }}
  >
    {children}
  </div>
);

/** Escena final: avance del siguiente capítulo. */
export const Avance: React.FC<{
  parte: number;
  tema: string;
  gancho: string;
}> = ({ parte, tema, gancho }) => {
  const frame = useCurrentFrame();
  const { color } = useSerie();
  const pulso = 1 + 0.03 * Math.sin(frame / 6);
  return (
    <Stage gap={36}>
      <Words text={gancho} size={78} stagger={2} accent={color} />
      <div style={{ height: 10 }} />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 48,
          color: C.dim,
        }}
      >
        En la parte {parte}:
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 84,
          color: C.bg,
          background: color,
          padding: "16px 40px",
          borderRadius: 28,
          scale: pulso,
          textAlign: "center",
        }}
      >
        {tema}
      </div>
      <Sticker delay={60} bg={C.green} color={C.bg} rotate={-2} size={46}>
        Síguenos para no perderla
      </Sticker>
      <Sfx src="whoosh.wav" at={40} volume={0.35} />
    </Stage>
  );
};

export type Escena = {
  nombre: string;
  dur: number;
  voz: string;
  el: React.ReactNode;
};

/** Arma el capítulo: fondo, escenas con transiciones, etiqueta, voz y música. */
export const Capitulo: React.FC<{
  parte: number;
  short: keyof typeof duraciones;
  escenas: Escena[];
  acento?: string;
  serie?: SerieInfo;
}> = ({ parte, short, escenas, acento = C.blue, serie = SERIE_MATES }) => {
  const inicios: number[] = [];
  let t = 0;
  escenas.forEach((e) => {
    inicios.push(t);
    t += e.dur - T;
  });
  const voz: Linea[] = escenas.map((e, i) => ({
    id: e.voz,
    at: i === 0 ? 2 : inicios[i] + 6,
  }));
  return (
    <SerieCtx.Provider value={serie}>
      <AbsoluteFill>
        <Bg accent={acento} />
        <TransitionSeries>
          {escenas.flatMap((e, i) => {
            const seq = (
              <TransitionSeries.Sequence
                key={`s${i}`}
                name={e.nombre}
                durationInFrames={e.dur}
              >
                {e.el}
              </TransitionSeries.Sequence>
            );
            if (i === escenas.length - 1) return [seq];
            return [
              seq,
              <TransitionSeries.Transition
                key={`t${i}`}
                presentation={slide({
                  direction: i % 2 ? "from-right" : "from-bottom",
                })}
                timing={linearTiming({ durationInFrames: T })}
              />,
            ];
          })}
        </TransitionSeries>
        <Etiqueta parte={parte} />
        <Narracion short={short} lineas={voz} />
        <Sequence layout="none" name="Música">
          <Musica src="music-explica.wav" short={short} lineas={voz} />
        </Sequence>
      </AbsoluteFill>
    </SerieCtx.Provider>
  );
};

/** Duración total (para registrar la composición). */
export const duracionTotal = (durs: number[]) =>
  durs.reduce((a, b) => a + b, 0) - T * (durs.length - 1);

/** Persona simple (silueta). */
export const Persona: React.FC<{
  color: string;
  size?: number;
  style?: React.CSSProperties;
}> = ({ color, size = 90, style }) => (
  <svg width={size} height={size * 1.2} viewBox="0 0 70 84" style={style}>
    <circle cx={35} cy={20} r={17} fill={color} />
    <path d="M8 84 Q8 44 35 44 Q62 44 62 84 Z" fill={color} />
  </svg>
);

/** Interpola un valor 0→1 con clamp (atajo). */
export const prog = (frame: number, a: number, b: number) =>
  interpolate(frame, [a, b], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

/** Tarjeta de aplicación (título + texto) que entra deslizándose. */
export const Tarjeta: React.FC<{
  titulo: string;
  texto: string;
  color: string;
  delay: number;
}> = ({ titulo, texto, color, delay }) => {
  const p = useIn(delay, 12);
  return (
    <div
      style={{
        width: 880,
        background: C.bg2,
        borderRadius: 26,
        padding: "26px 32px",
        borderLeft: `12px solid ${color}`,
        opacity: p,
        translate: `${(1 - p) * 80}px 0px`,
        fontFamily: FONT,
      }}
    >
      <div style={{ fontWeight: 900, fontSize: 56, color: C.ink }}>
        {titulo}
      </div>
      <div
        style={{ fontWeight: 600, fontSize: 40, color: C.dim, marginTop: 6 }}
      >
        {texto}
      </div>
    </div>
  );
};

/** Gráfica de dispersión simple con ejes y etiquetas. */
export const Dispersion: React.FC<{
  xs: number[];
  ys: number[];
  xr: [number, number];
  yr: [number, number];
  xLabel: string;
  yLabel: string;
  color?: string;
  aparicion?: number; // 0..1 cuántos puntos se ven
  recta?: { m: number; b: number; p: number; color?: string };
  residuos?: number; // 0..1
  extra?: React.ReactNode;
  w?: number;
  h?: number;
}> = ({
  xs,
  ys,
  xr,
  yr,
  xLabel,
  yLabel,
  color = C.blue,
  aparicion = 1,
  recta,
  residuos = 0,
  extra,
  w = 860,
  h = 620,
}) => {
  const L = 90;
  const B = 80;
  const px = (x: number) => L + ((w - L - 30) * (x - xr[0])) / (xr[1] - xr[0]);
  const py = (y: number) =>
    h - B - ((h - B - 30) * (y - yr[0])) / (yr[1] - yr[0]);
  const n = Math.floor(aparicion * xs.length + 0.001);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <line
        x1={L}
        y1={h - B}
        x2={w - 20}
        y2={h - B}
        stroke={C.dim}
        strokeWidth={4}
      />
      <line x1={L} y1={20} x2={L} y2={h - B} stroke={C.dim} strokeWidth={4} />
      <text
        x={(w + L) / 2}
        y={h - 22}
        fill={C.dim}
        fontFamily={FONT}
        fontWeight={800}
        fontSize={34}
        textAnchor="middle"
      >
        {xLabel}
      </text>
      <text
        x={34}
        y={(h - B) / 2}
        fill={C.dim}
        fontFamily={FONT}
        fontWeight={800}
        fontSize={34}
        textAnchor="middle"
        transform={`rotate(-90 34 ${(h - B) / 2})`}
      >
        {yLabel}
      </text>
      {recta && residuos > 0
        ? xs
            .slice(0, n)
            .map((x, i) => (
              <line
                key={`r${i}`}
                x1={px(x)}
                y1={py(ys[i])}
                x2={px(x)}
                y2={py(ys[i] + (recta.m * x + recta.b - ys[i]) * residuos)}
                stroke={C.coral}
                strokeWidth={5}
              />
            ))
        : null}
      {recta ? (
        <line
          x1={px(xr[0])}
          y1={py(recta.m * xr[0] + recta.b)}
          x2={px(xr[0] + (xr[1] - xr[0]) * recta.p)}
          y2={py(recta.m * (xr[0] + (xr[1] - xr[0]) * recta.p) + recta.b)}
          stroke={recta.color ?? C.yellow}
          strokeWidth={8}
          strokeLinecap="round"
        />
      ) : null}
      {xs.slice(0, n).map((x, i) => (
        <circle
          key={i}
          cx={px(x)}
          cy={py(ys[i])}
          r={16}
          fill={color}
          stroke="#0b1020"
          strokeWidth={4}
        />
      ))}
      {extra}
    </svg>
  );
};

/** Caja de código Python (líneas que entran una por una). */
export const Codigo: React.FC<{
  lineas: string[];
  delay?: number;
  size?: number;
}> = ({ lineas, delay = 0, size = 40 }) => {
  const frame = useCurrentFrame();
  const { color } = useSerie();
  return (
    <div
      style={{
        width: 880,
        background: "#0a0d1a",
        border: `3px solid ${color}66`,
        borderRadius: 22,
        padding: "22px 28px",
        fontFamily: MONO,
        fontSize: size,
        color: C.ink,
        lineHeight: 1.5,
      }}
    >
      <div style={{ fontSize: 26, color: C.dim, marginBottom: 6 }}>Python</div>
      {lineas.map((l, i) => (
        <div
          key={i}
          style={{
            whiteSpace: "pre",
            opacity: prog(frame, delay + i * 8, delay + i * 8 + 8),
            color: l.trim().startsWith("#") ? C.dim : C.ink,
          }}
        >
          {l}
        </div>
      ))}
    </div>
  );
};
