import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import { C, FONT, HANDLE, MONO } from "./theme";

/** Spring de entrada (0 → 1) que arranca en `delay` frames. */
export const useIn = (delay = 0, damping = 13) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, mass: 0.6, stiffness: 160 } });
};

/** Fondo: degradado con una rejilla de puntos que se desplaza lento (movimiento continuo). */
export const Bg: React.FC<{ accent?: string }> = ({ accent = C.blue }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 900px 1100px at 50% 40%, ${accent}33, transparent 70%)`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(${C.dim}30 2.5px, transparent 2.5px)`,
          backgroundSize: "54px 54px",
          backgroundPosition: `0px ${(frame * 0.6) % 54}px`,
          opacity: 0.7,
        }}
      />
    </AbsoluteFill>
  );
};

export const Handle: React.FC = () => (
  <div
    style={{
      position: "absolute",
      top: 120,
      left: 0,
      right: 0,
      textAlign: "center",
      fontFamily: MONO,
      fontSize: 34,
      color: C.dim,
      letterSpacing: 1,
    }}
  >
    {HANDLE}
  </div>
);

/**
 * Texto que entra palabra por palabra. Las palabras entre *asteriscos* se
 * resaltan con el color de acento.
 */
export const Words: React.FC<{
  text: string;
  delay?: number;
  stagger?: number;
  size?: number;
  color?: string;
  accent?: string;
  weight?: number;
  style?: React.CSSProperties;
}> = ({ text, delay = 0, stagger = 3, size = 92, color = C.ink, accent = C.yellow, weight = 900, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");
  return (
    <div
      style={{
        fontFamily: FONT,
        fontWeight: weight,
        fontSize: size,
        lineHeight: 1.12,
        color,
        textAlign: "center",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        columnGap: size * 0.26,
        letterSpacing: -1,
        ...style,
      }}
    >
      {words.map((w, i) => {
        const hl = w.startsWith("*");
        const clean = w.replace(/\*/g, "");
        const p = spring({ frame: frame - delay - i * stagger, fps, config: { damping: 12, mass: 0.5, stiffness: 180 } });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              color: hl ? accent : undefined,
              opacity: interpolate(p, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
              scale: interpolate(p, [0, 1], [0.55, 1]),
              translate: `0px ${interpolate(p, [0, 1], [40, 0])}px`,
            }}
          >
            {clean}
          </span>
        );
      })}
    </div>
  );
};

/** Número que cuenta de `from` a `to`. */
export const Counter: React.FC<{
  from?: number;
  to: number;
  start?: number;
  dur?: number;
  decimals?: number;
  suffix?: string;
  style?: React.CSSProperties;
}> = ({ from = 0, to, start = 0, dur = 30, decimals = 0, suffix = "", style }) => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [start, start + dur], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <span style={{ fontVariantNumeric: "tabular-nums", ...style }}>
      {v.toFixed(decimals).replace(".", ",")}
      {suffix}
    </span>
  );
};

/** Efecto de sonido en un frame dado. */
export const Sfx: React.FC<{ src: string; at: number; volume?: number }> = ({ src, at, volume = 0.6 }) => (
  <Sequence from={at} layout="none" name={`sfx ${src}`}>
    <Audio src={staticFile(src)} volume={volume} />
  </Sequence>
);

/** Columna central con márgenes seguros para Shorts. */
export const Stage: React.FC<{ children: React.ReactNode; top?: number; gap?: number }> = ({
  children,
  top = 300,
  gap = 40,
}) => (
  <AbsoluteFill
    style={{
      padding: `${top}px 90px 420px 90px`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap,
    }}
  >
    {children}
  </AbsoluteFill>
);

/** Etiqueta tipo "sticker" que entra con rebote. */
export const Sticker: React.FC<{
  children: React.ReactNode;
  delay?: number;
  bg?: string;
  color?: string;
  rotate?: number;
  size?: number;
}> = ({ children, delay = 0, bg = C.yellow, color = C.bg, rotate = -3, size = 52 }) => {
  const p = useIn(delay, 9);
  return (
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: size,
        background: bg,
        color,
        padding: "14px 34px",
        borderRadius: 22,
        rotate: `${rotate}deg`,
        opacity: interpolate(p, [0, 0.2], [0, 1], { extrapolateRight: "clamp" }),
        scale: interpolate(p, [0, 1], [0.3, 1]),
        boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
};
