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

/** Formato numérico de México: 15,000 y 0.25 */
export const fmt = (n: number, dec = 0) =>
  n.toLocaleString("es-MX", {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  });

/** Etiqueta fija de la serie arriba del video. */
export const Etiqueta: React.FC<{ parte: number }> = ({ parte }) => (
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
        border: `3px solid ${COLOR_SERIE}`,
        borderRadius: 40,
        padding: "10px 26px",
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: 34,
        color: C.ink,
        letterSpacing: 1,
      }}
    >
      <span>{SERIE}</span>
      <span
        style={{
          background: COLOR_SERIE,
          color: C.bg,
          borderRadius: 24,
          padding: "2px 16px",
        }}
      >
        {parte}/{TOTAL_PARTES}
      </span>
    </div>
    <div style={{ fontFamily: MONO, fontSize: 28, color: C.dim }}>{HANDLE}</div>
  </div>
);

/** Fórmula en una caja tipo pizarrón. */
export const Formula: React.FC<{
  children: React.ReactNode;
  delay?: number;
  size?: number;
}> = ({ children, delay = 0, size = 58 }) => {
  const p = useIn(delay, 12);
  return (
    <div
      style={{
        fontFamily: MONO,
        fontWeight: 700,
        fontSize: size,
        color: C.ink,
        background: "#0a0d1a",
        border: `4px solid ${COLOR_SERIE}`,
        borderRadius: 24,
        padding: "22px 34px",
        textAlign: "center",
        opacity: p,
        scale: 0.85 + 0.15 * p,
        boxShadow: `0 0 50px ${COLOR_SERIE}33`,
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
  const pulso = 1 + 0.03 * Math.sin(frame / 6);
  return (
    <Stage gap={36}>
      <Words text={gancho} size={78} stagger={2} accent={COLOR_SERIE} />
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
          background: COLOR_SERIE,
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
}> = ({ parte, short, escenas, acento = C.blue }) => {
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
