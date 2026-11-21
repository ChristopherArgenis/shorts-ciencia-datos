import React from "react";
import { FONT, MONO } from "../../kit/theme";
import { C } from "../../kit/theme";
import { PixelCirculo } from "./LuzSol";

// Piezas compartidas de la serie de astronomía.

/** Color aproximado de una longitud de onda visible (aproximación de Bruton), λ en nm. */
export const colorNm = (nm: number) => {
  let r = 0,
    g = 0,
    b = 0;
  if (nm < 440) {
    r = -(nm - 440) / 60;
    b = 1;
  } else if (nm < 490) {
    g = (nm - 440) / 50;
    b = 1;
  } else if (nm < 510) {
    g = 1;
    b = -(nm - 510) / 20;
  } else if (nm < 580) {
    r = (nm - 510) / 70;
    g = 1;
  } else if (nm < 645) {
    r = 1;
    g = -(nm - 645) / 65;
  } else {
    r = 1;
  }
  const k =
    nm < 420
      ? 0.3 + (0.7 * (nm - 380)) / 40
      : nm > 700
        ? 0.3 + (0.7 * (750 - nm)) / 50
        : 1;
  const f = (v: number) => Math.round(255 * Math.pow(Math.max(0, v) * k, 0.8));
  return `rgb(${f(r)},${f(g)},${f(b)})`;
};

export const NM0 = 380;
export const NM1 = 750;

/** Rayas reales del espectro del Sol (Fraunhofer), en nm. */
export const RAYAS_SOL: { nm: number; el: string }[] = [
  { nm: 393.4, el: "Ca" },
  { nm: 396.8, el: "Ca" },
  { nm: 410.2, el: "H" },
  { nm: 434.0, el: "H" },
  { nm: 486.1, el: "H" },
  { nm: 517.3, el: "Mg" },
  { nm: 518.4, el: "Mg" },
  { nm: 527.0, el: "Fe" },
  { nm: 589.0, el: "Na" },
  { nm: 589.6, el: "Na" },
  { nm: 656.3, el: "H" },
];
export const H_NM = [410.2, 434.0, 486.1, 656.3];
export const NA_NM = [589.0, 589.6];
export const HE_NM = 587.6;

/**
 * Franja de espectro. `oscuras`: rayas negras sobre el arcoíris (absorción).
 * `brillantes`: rayas de color sobre fondo negro (emisión).
 */
export const Espectro: React.FC<{
  w: number;
  h: number;
  oscuras?: number[];
  brillantes?: number[];
  resaltar?: number[];
  grosor?: number;
}> = ({ w, h, oscuras = [], brillantes, resaltar = [], grosor = 5 }) => {
  const x = (nm: number) => ((nm - NM0) / (NM1 - NM0)) * w;
  const pasos = 120;
  return (
    <svg width={w} height={h} style={{ display: "block", borderRadius: 12 }}>
      {brillantes ? (
        <rect width={w} height={h} fill="#05070f" />
      ) : (
        Array.from({ length: pasos }).map((_, i) => {
          const nm = NM0 + ((NM1 - NM0) * i) / pasos;
          return (
            <rect
              key={i}
              x={x(nm)}
              y={0}
              width={w / pasos + 1}
              height={h}
              fill={colorNm(nm)}
            />
          );
        })
      )}
      {oscuras.map((nm, i) => (
        <rect
          key={`o${i}`}
          x={x(nm) - grosor / 2}
          y={0}
          width={grosor}
          height={h}
          fill="#05070f"
        />
      ))}
      {(brillantes ?? []).map((nm, i) => (
        <rect
          key={`b${i}`}
          x={x(nm) - grosor / 2}
          y={0}
          width={grosor}
          height={h}
          fill={colorNm(nm)}
          style={{ filter: `drop-shadow(0 0 6px ${colorNm(nm)})` }}
        />
      ))}
      {resaltar.map((nm, i) => (
        <rect
          key={`r${i}`}
          x={x(nm) - 14}
          y={-2}
          width={28}
          height={h + 4}
          fill="none"
          stroke={C.yellow}
          strokeWidth={4}
          rx={6}
        />
      ))}
    </svg>
  );
};

/** Etiqueta sobre una raya del espectro. */
export const Marca: React.FC<{
  w: number;
  nm: number;
  t: string;
  color?: string;
  arriba?: boolean;
}> = ({ w, nm, t, color = C.ink, arriba }) => (
  <div
    style={{
      position: "absolute",
      left: ((nm - NM0) / (NM1 - NM0)) * w - 60,
      width: 120,
      top: arriba ? -56 : undefined,
      bottom: arriba ? undefined : -56,
      textAlign: "center",
      fontFamily: FONT,
      fontWeight: 900,
      fontSize: 40,
      color,
    }}
  >
    {t}
  </div>
);

export const SolPx: React.FC<{ d: number }> = ({ d }) => (
  <PixelCirculo d={d} centro="#fff3bf" borde="#ffd43b" brillo="#ffa94d" />
);

/** Campo de estrellas fijo (puntos cuadrados). */
export const Estrellas: React.FC<{
  w: number;
  h: number;
  n?: number;
  dx?: number;
}> = ({ w, h, n = 70, dx = 0 }) => (
  <svg width={w} height={h} style={{ position: "absolute", left: 0, top: 0 }}>
    {Array.from({ length: n }).map((_, i) => (
      <rect
        key={i}
        x={((i * 151 + 37) % w) + dx * 0}
        y={(i * 97 + 11) % h}
        width={i % 7 ? 4 : 7}
        height={i % 7 ? 4 : 7}
        fill={i % 5 ? "#5c6393" : "#c5cae9"}
      />
    ))}
  </svg>
);

export const Numero: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
}> = ({ children, size = 90, color = C.ink }) => (
  <span
    style={{
      fontFamily: MONO,
      fontWeight: 700,
      fontSize: size,
      color,
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);
