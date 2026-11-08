import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Sfx, Stage, Sticker, Words, useIn } from "./kit";
import { C, FONT, MONO } from "./theme";

// Componentes propios de la serie "Aprendizaje Automático": mapa de metro y reto.

export const ORO = "#f2c14e";
export const NARANJA = "#ff9f43";
export const MORADO = C.purple;

type Est = { id: string; x: number; y: number; c: string };
const TRONCO: Est[] = [0, 1, 2, 3].map((i) => ({
  id: `T${i}`,
  x: 90 + i * 120,
  y: 300,
  c: ORO,
}));
const SUP: Est[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `S${i + 1}`,
  x: 520 + Math.min(i, 3) * 0 + 0,
  y: 0,
  c: NARANJA,
}));
// Coordenadas: tras el tronco, la rama naranja sube y la morada baja, y se juntan en el final.
const pos = (rama: "S" | "U", i: number, n: number): [number, number] => {
  const t = (i + 1) / (n + 1);
  const x = 470 + t * 330;
  const y =
    rama === "S"
      ? 300 - 190 * Math.sin(Math.PI * t)
      : 300 + 190 * Math.sin(Math.PI * t);
  return [x, y];
};
const RAMA_S: Est[] = SUP.map((_, i) => {
  const [x, y] = pos("S", i, 8);
  return { id: `S${i + 1}`, x, y, c: NARANJA };
});
const RAMA_U: Est[] = Array.from({ length: 7 }).map((_, i) => {
  const [x, y] = pos("U", i, 7);
  return { id: `U${i + 1}`, x, y, c: MORADO };
});
const FINAL: Est = { id: "F", x: 860, y: 300, c: C.green };
const TODAS = [...TRONCO, ...RAMA_S, ...RAMA_U, FINAL];

const camino = (ests: Est[]) =>
  ests.map((e, i) => `${i ? "L" : "M"}${e.x},${e.y}`).join(" ");

/** Mapa de la serie. `actual` = id de la estación actual; `siguiente` = hacia dónde viaja el punto. */
export const MapaML: React.FC<{
  actual: string;
  siguiente: string;
  delay?: number;
}> = ({ actual, siguiente, delay = 20 }) => {
  const frame = useCurrentFrame();
  const a = TODAS.find((e) => e.id === actual)!;
  const b = TODAS.find((e) => e.id === siguiente)!;
  const t = interpolate(frame, [delay, delay + 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const px = a.x + (b.x - a.x) * t;
  const py = a.y + (b.y - a.y) * t;
  const ultimoT = TRONCO[3];
  return (
    <svg width={940} height={600} viewBox="0 0 940 600">
      <path
        d={camino(TRONCO)}
        fill="none"
        stroke={ORO}
        strokeWidth={14}
        strokeLinecap="round"
      />
      <path
        d={camino([ultimoT, ...RAMA_S, FINAL])}
        fill="none"
        stroke={NARANJA}
        strokeWidth={12}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={camino([ultimoT, ...RAMA_U, FINAL])}
        fill="none"
        stroke={MORADO}
        strokeWidth={12}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {TODAS.map((e) => {
        const on = e.id === actual;
        return (
          <circle
            key={e.id}
            cx={e.x}
            cy={e.y}
            r={on ? 20 : 13}
            fill={on ? e.c : C.bg}
            stroke={e.c}
            strokeWidth={6}
          />
        );
      })}
      <text
        x={210}
        y={360}
        fill={ORO}
        fontFamily={FONT}
        fontWeight={900}
        fontSize={30}
        textAnchor="middle"
      >
        Tronco
      </text>
      <text
        x={640}
        y={70}
        fill={NARANJA}
        fontFamily={FONT}
        fontWeight={900}
        fontSize={30}
        textAnchor="middle"
      >
        Supervisado
      </text>
      <text
        x={640}
        y={560}
        fill={MORADO}
        fontFamily={FONT}
        fontWeight={900}
        fontSize={30}
        textAnchor="middle"
      >
        No supervisado
      </text>
      <text
        x={890}
        y={260}
        fill={C.green}
        fontFamily={FONT}
        fontWeight={900}
        fontSize={30}
        textAnchor="end"
      >
        Final
      </text>
      <circle
        cx={px}
        cy={py}
        r={26}
        fill="#ffffff"
        stroke={C.bg}
        strokeWidth={6}
      />
      <circle cx={px} cy={py} r={10} fill={b.c} />
    </svg>
  );
};

/** Escena final de cada capítulo: el mapa con el punto viajando a la siguiente estación. */
export const AvanceML: React.FC<{
  actual: string;
  siguiente: string;
  tema: string;
  color?: string;
}> = ({ actual, siguiente, tema, color = ORO }) => {
  const p = useIn(55, 11);
  return (
    <Stage gap={30}>
      <Words text="Siguiente *estación*" size={80} accent={color} />
      <MapaML actual={actual} siguiente={siguiente} />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 70,
          color: C.bg,
          background: color,
          borderRadius: 26,
          padding: "14px 36px",
          opacity: p,
          scale: 0.85 + 0.15 * p,
          textAlign: "center",
        }}
      >
        {tema}
      </div>
      <Sfx src="whoosh.wav" at={20} volume={0.35} />
    </Stage>
  );
};

/** Tarjeta "Tú vs. el modelo": el reto que se lanza al inicio. */
export const Reto: React.FC<{ pregunta: string; delay?: number }> = ({
  pregunta,
  delay = 10,
}) => {
  const p = useIn(delay, 10);
  return (
    <div
      style={{
        width: 880,
        borderRadius: 30,
        border: `5px solid ${ORO}`,
        background: `${ORO}1f`,
        padding: "26px 32px",
        opacity: p,
        scale: 0.85 + 0.15 * p,
      }}
    >
      <div
        style={{ fontFamily: MONO, fontWeight: 700, fontSize: 32, color: ORO }}
      >
        TÚ vs. EL MODELO
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 60,
          color: C.ink,
          marginTop: 8,
        }}
      >
        {pregunta}
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 34,
          color: C.dim,
          marginTop: 6,
        }}
      >
        Adivina antes del final
      </div>
    </div>
  );
};

export const Respuesta: React.FC<{ texto: string; delay?: number }> = ({
  texto,
  delay = 0,
}) => (
  <Sticker delay={delay} bg={ORO} color={C.bg} rotate={-2}>
    Respuesta: {texto}
  </Sticker>
);
