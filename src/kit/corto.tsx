import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Bg, Handle } from "./kit";
import { C, FONT, MONO } from "./theme";
import { Musica, Narracion, type Linea } from "./voz";
import duraciones from "../voz-duraciones.json";

// Kit para los Shorts con la plantilla de retención (ver CLAUDE.md):
// cuadro 0 lleno, sin etiqueta de serie, cortes con golpe de cámara y cierre en bucle.

type Short = keyof typeof duraciones;
export type EscenaCorta = {
  nombre: string;
  voz: string;
  Comp: React.FC;
  /** Cuadros de silencio después de la frase (por defecto 5). */
  aire?: number;
};

/** Inicio de cada escena (= de su frase) y duración total, en cuadros. */
export const linea = (short: Short, escenas: EscenaCorta[]) => {
  const d = duraciones[short] as Record<string, number>;
  const inicios: number[] = [];
  let t = 0;
  for (const e of escenas) {
    inicios.push(t);
    t += Math.ceil(d[e.voz] * 30) + (e.aire ?? 5);
  }
  return { inicios, total: t };
};

/** Golpe de cámara al entrar a cada escena (sustituye a la transición). */
export const Golpe: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [0, 7], [1.05, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return <AbsoluteFill style={{ scale: s }}>{children}</AbsoluteFill>;
};

export const Corto: React.FC<{
  short: Short;
  escenas: EscenaCorta[];
  acento?: string;
  musica?: string;
}> = ({ short, escenas, acento = C.yellow, musica = "music-curious.wav" }) => {
  const { inicios, total } = linea(short, escenas);
  const voz: Linea[] = escenas.map((e, i) => ({ id: e.voz, at: inicios[i] }));
  return (
    <AbsoluteFill>
      <Bg accent={acento} />
      {escenas.map(({ nombre, Comp }, i) => {
        const hasta = i < escenas.length - 1 ? inicios[i + 1] : total;
        return (
          <Sequence
            key={nombre}
            name={nombre}
            from={inicios[i]}
            durationInFrames={hasta - inicios[i]}
          >
            {i === 0 ? (
              <Comp />
            ) : (
              <Golpe>
                <Comp />
              </Golpe>
            )}
          </Sequence>
        );
      })}
      <Handle />
      <Narracion short={short} lineas={voz} />
      <Sequence layout="none" name="Música">
        <Musica src={musica} short={short} lineas={voz} />
      </Sequence>
    </AbsoluteFill>
  );
};

export const Centro: React.FC<{ top: number; children: React.ReactNode }> = ({
  top,
  children,
}) => (
  <div
    style={{
      position: "absolute",
      top,
      left: 0,
      right: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    {children}
  </div>
);

/** Número o palabra grande (MONO para cifras, FONT para palabras). */
export const Grande: React.FC<{
  children: React.ReactNode;
  color?: string;
  size?: number;
  mono?: boolean;
}> = ({ children, color = C.yellow, size = 150, mono = true }) => (
  <div
    style={{
      fontFamily: mono ? MONO : FONT,
      fontWeight: mono ? 700 : 900,
      fontSize: size,
      color,
      lineHeight: 1,
      letterSpacing: mono ? -4 : -2,
      whiteSpace: "nowrap",
      fontVariantNumeric: "tabular-nums",
    }}
  >
    {children}
  </div>
);

export const Sub: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
}> = ({ children, size = 48, color = C.ink }) => (
  <div
    style={{
      fontFamily: FONT,
      fontWeight: 800,
      fontSize: size,
      color,
      textAlign: "center",
      marginTop: 18,
    }}
  >
    {children}
  </div>
);

/** Fuente o aviso al pie (zona segura, arriba de la interfaz de YouTube). */
export const Pie: React.FC<{ children: React.ReactNode; top?: number }> = ({
  children,
  top = 1452,
}) => (
  <Centro top={top}>
    <div style={{ fontFamily: MONO, fontSize: 30, color: C.dim }}>
      {children}
    </div>
  </Centro>
);

/** Entrada con rebote (0 → 1) desde `delay`; para elementos que no están en el cuadro 0. */
export const usePop = (delay: number, damping = 11) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: f - delay, fps, config: { damping } });
};

/** Sello de ✗ que cae encima de algo (la intuición equivocada). */
export const Tache: React.FC<{ delay: number; size?: number }> = ({
  delay,
  size = 420,
}) => {
  const f = useCurrentFrame();
  const p = usePop(delay, 9);
  if (f < delay) return null;
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          scale: interpolate(p, [0, 1], [2.2, 1]),
          filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.6))",
        }}
      >
        {[45, -45].map((r) => (
          <div
            key={r}
            style={{
              position: "absolute",
              left: -size * 0.05,
              top: size / 2 - size * 0.07,
              width: size * 1.1,
              height: size * 0.14,
              borderRadius: size * 0.07,
              background: C.coral,
              rotate: `${r}deg`,
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
