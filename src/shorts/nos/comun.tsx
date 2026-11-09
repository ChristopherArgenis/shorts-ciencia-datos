import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { C, FONT, MONO } from "../../kit/theme";

export const MOR = C.purple;
export const G = [C.coral, C.green, C.blue, C.yellow];

/** Dispersión genérica: puntos [x, y, grupo]; grupo -1 = gris. */
export const Scatter: React.FC<{
  pts: [number, number, number][];
  xr: [number, number];
  yr: [number, number];
  xl?: string;
  yl?: string;
  aparicion?: number;
  r?: number;
  extra?: (
    x: (v: number) => number,
    y: (v: number) => number,
  ) => React.ReactNode;
  w?: number;
  h?: number;
  colores?: string[];
}> = ({
  pts,
  xr,
  yr,
  xl,
  yl,
  aparicion = 1,
  r = 8,
  extra,
  w = 880,
  h = 620,
  colores = G,
}) => {
  const L = xl ? 80 : 20,
    B = xl ? 70 : 20;
  const x = (v: number) => L + ((w - L - 20) * (v - xr[0])) / (xr[1] - xr[0]);
  const y = (v: number) =>
    h - B - ((h - B - 20) * (v - yr[0])) / (yr[1] - yr[0]);
  const n = Math.floor(aparicion * pts.length);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      {xl ? (
        <>
          <line
            x1={L}
            y1={h - B}
            x2={w - 10}
            y2={h - B}
            stroke={C.dim}
            strokeWidth={4}
          />
          <line
            x1={L}
            y1={10}
            x2={L}
            y2={h - B}
            stroke={C.dim}
            strokeWidth={4}
          />
          <text
            x={(w + L) / 2}
            y={h - 18}
            fill={C.dim}
            fontFamily={FONT}
            fontWeight={800}
            fontSize={32}
            textAnchor="middle"
          >
            {xl}
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
            {yl}
          </text>
        </>
      ) : null}
      {pts.slice(0, n).map(([a, b, g], i) => (
        <circle
          key={i}
          cx={x(a)}
          cy={y(b)}
          r={r}
          fill={g < 0 ? C.dim : colores[g % colores.length]}
          opacity={g < 0 ? 0.55 : 0.85}
        />
      ))}
      {extra ? extra(x, y) : null}
    </svg>
  );
};

export const Grande: React.FC<{
  valor: number;
  dec?: number;
  pre?: string;
  suf?: string;
  color?: string;
  size?: number;
  delay?: number;
}> = ({
  valor,
  dec = 0,
  pre = "",
  suf = "",
  color = MOR,
  size = 180,
  delay = 10,
}) => {
  const f = useCurrentFrame();
  const v = interpolate(f, [delay, delay + 40], [0, valor], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: size,
        color,
        lineHeight: 1,
      }}
    >
      {pre}
      {v.toLocaleString("es-MX", {
        minimumFractionDigits: dec,
        maximumFractionDigits: dec,
      })}
      {suf}
    </div>
  );
};

export const Sub: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = C.dim,
}) => (
  <div
    style={{
      fontFamily: FONT,
      fontWeight: 800,
      fontSize: 46,
      color,
      textAlign: "center",
    }}
  >
    {children}
  </div>
);

export const Fuente: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    style={{
      fontFamily: MONO,
      fontSize: 26,
      color: C.dim,
      textAlign: "center",
    }}
  >
    {children}
  </div>
);
