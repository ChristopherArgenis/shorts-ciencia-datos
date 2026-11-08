import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FONT, MONO } from "../../kit/theme";
import { prog } from "../../kit/serie";

// Elementos compartidos de la serie "Programación en Ciencia de Datos" (caso: Café Datos, ficticio).

/** Logo simple de Café Datos. */
export const LogoCafe: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
    <svg width={size} height={size} viewBox="0 0 100 100">
      <path d="M18 38 H72 V62 Q72 84 45 84 Q18 84 18 62 Z" fill={C.coral} />
      <path
        d="M72 44 Q90 44 88 58 Q86 70 72 68"
        fill="none"
        stroke={C.coral}
        strokeWidth={7}
      />
      <path
        d="M32 30 Q28 20 34 12 M46 30 Q42 20 48 12"
        fill="none"
        stroke={C.dim}
        strokeWidth={5}
        strokeLinecap="round"
      />
    </svg>
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: size * 0.55,
        color: C.ink,
      }}
    >
      Café <span style={{ color: C.green }}>Datos</span>
    </div>
  </div>
);

/**
 * Tabla animada. celdas: filas de texto. resaltar: { fila, color } por fila.
 * tachar: filas que se tachan. aparicion: frame de inicio.
 */
export const Tabla: React.FC<{
  cols: string[];
  filas: (string | number)[][];
  delay?: number;
  anchos?: number[];
  resaltar?: Record<number, string>;
  celdaColor?: Record<string, string>; // "fila,col" → color
  tachar?: number[];
  size?: number;
}> = ({
  cols,
  filas,
  delay = 0,
  anchos,
  resaltar = {},
  celdaColor = {},
  tachar = [],
  size = 34,
}) => {
  const frame = useCurrentFrame();
  const w = anchos ?? cols.map(() => Math.floor(880 / cols.length));
  return (
    <div
      style={{
        borderRadius: 18,
        overflow: "hidden",
        border: "3px solid #2a3366",
        fontFamily: MONO,
        fontSize: size,
      }}
    >
      <div style={{ display: "flex", background: "#222b5c" }}>
        {cols.map((c, j) => (
          <div
            key={c}
            style={{
              width: w[j],
              padding: "12px 14px",
              color: C.green,
              fontWeight: 700,
            }}
          >
            {c}
          </div>
        ))}
      </div>
      {filas.map((f, i) => {
        const p = prog(frame, delay + i * 5, delay + i * 5 + 8);
        return (
          <div
            key={i}
            style={{
              display: "flex",
              background: resaltar[i]
                ? `${resaltar[i]}33`
                : i % 2
                  ? "#141a3a"
                  : "#10152f",
              opacity: tachar.includes(i) ? 0.35 : p,
              textDecoration: tachar.includes(i) ? "line-through" : "none",
            }}
          >
            {f.map((v, j) => (
              <div
                key={j}
                style={{
                  width: w[j],
                  padding: "10px 14px",
                  color: celdaColor[`${i},${j}`] ?? C.ink,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {String(v)}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
