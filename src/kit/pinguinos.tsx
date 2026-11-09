import React from "react";
import { C, FONT, MONO } from "./theme";

// Pingüinos de Palmer (datos reales: Gorman, Williams & Fraser 2014, Palmer Station LTER).
export const ESPECIE: Record<string, { nombre: string; color: string }> = {
  Adelie: { nombre: "Adelia", color: C.coral },
  Chinstrap: { nombre: "Barbijo", color: C.blue },
  Gentoo: { nombre: "Papúa", color: C.green },
};

export const FuentePinguinos: React.FC = () => (
  <div
    style={{
      fontFamily: MONO,
      fontSize: 26,
      color: C.dim,
      textAlign: "center",
    }}
  >
    Datos reales: pingüinos de Palmer (Gorman et al., 2014)
  </div>
);

export const Leyenda: React.FC = () => (
  <div
    style={{
      display: "flex",
      gap: 28,
      fontFamily: FONT,
      fontWeight: 800,
      fontSize: 38,
    }}
  >
    {Object.values(ESPECIE).map((e) => (
      <span key={e.nombre} style={{ color: e.color }}>
        ● {e.nombre}
      </span>
    ))}
  </div>
);

/** Silueta de pingüino. */
export const Pinguino: React.FC<{ color?: string; size?: number }> = ({
  color = C.ink,
  size = 120,
}) => (
  <svg width={size} height={size * 1.25} viewBox="0 0 80 100">
    <ellipse
      cx={40}
      cy={58}
      rx={28}
      ry={38}
      fill="#1b2238"
      stroke={color}
      strokeWidth={4}
    />
    <ellipse cx={40} cy={64} rx={18} ry={28} fill="#f4f6ff" />
    <circle
      cx={40}
      cy={22}
      r={16}
      fill="#1b2238"
      stroke={color}
      strokeWidth={4}
    />
    <circle cx={34} cy={20} r={3} fill="#fff" />
    <circle cx={46} cy={20} r={3} fill="#fff" />
    <path d="M36 27 L44 27 L40 34 Z" fill={C.yellow} />
    <path d="M28 96 L36 90 L40 96 Z M40 96 L44 90 L52 96 Z" fill={C.yellow} />
  </svg>
);

/** Dispersión de pingüinos (largo × profundidad del pico). */
export const PicoPlot: React.FC<{
  puntos: [number, number, string][];
  aparicion?: number;
  extra?: (
    x: (v: number) => number,
    y: (v: number) => number,
  ) => React.ReactNode;
  gris?: boolean;
  w?: number;
  h?: number;
}> = ({ puntos, aparicion = 1, extra, gris = false, w = 880, h = 640 }) => {
  const L = 80;
  const B = 70;
  const x = (v: number) => L + ((w - L - 20) * (v - 32)) / (60 - 32);
  const y = (v: number) => h - B - ((h - B - 20) * (v - 13)) / (22 - 13);
  const n = Math.floor(aparicion * puntos.length);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <line
        x1={L}
        y1={h - B}
        x2={w - 10}
        y2={h - B}
        stroke={C.dim}
        strokeWidth={4}
      />
      <line x1={L} y1={10} x2={L} y2={h - B} stroke={C.dim} strokeWidth={4} />
      <text
        x={(w + L) / 2}
        y={h - 18}
        fill={C.dim}
        fontFamily={FONT}
        fontWeight={800}
        fontSize={32}
        textAnchor="middle"
      >
        largo del pico (mm) →
      </text>
      <text
        x={30}
        y={(h - B) / 2}
        fill={C.dim}
        fontFamily={FONT}
        fontWeight={800}
        fontSize={32}
        textAnchor="middle"
        transform={`rotate(-90 30 ${(h - B) / 2})`}
      >
        grosor del pico (mm) →
      </text>
      {puntos.slice(0, n).map(([a, b, s], i) => (
        <circle
          key={i}
          cx={x(a)}
          cy={y(b)}
          r={7}
          fill={gris ? C.dim : ESPECIE[s].color}
          opacity={gris ? 0.5 : 0.85}
        />
      ))}
      {extra ? extra(x, y) : null}
    </svg>
  );
};
