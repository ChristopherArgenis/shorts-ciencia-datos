import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Sfx } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import { prog } from "../../kit/serie";
import {
  Centro,
  Corto,
  type EscenaCorta,
  Grande,
  linea,
  Pie,
  Sub,
  usePop,
} from "../../kit/corto";

// "El portero que no se mueve ataja más". Bar-Eli et al. (2007), Journal of Economic Psychology:
// 286 penaltis; los porteros se lanzan el 93.7 % de las veces; atajan 33.3 % quedándose al centro,
// 14.2 % lanzándose a la izquierda y 12.6 % a la derecha. Ilustración propia.

const S = "portero" as const;
const GW = 860; // ancho de la portería en pantalla
const GH = 320;

/** Portero: de pie (ángulo 0) o lanzándose (ángulo ±70). */
const Portero: React.FC<{
  x: number;
  y: number;
  ang?: number;
  color?: string;
  s?: number;
}> = ({ x, y, ang = 0, color = C.yellow, s = 1 }) => (
  <svg
    width={140 * s}
    height={200 * s}
    viewBox="0 0 70 100"
    style={{
      position: "absolute",
      left: x - 70 * s,
      top: y - 200 * s,
      rotate: `${ang}deg`,
      transformOrigin: "50% 100%",
    }}
  >
    <circle cx={35} cy={14} r={11} fill="#f1d3b3" />
    <rect x={22} y={26} width={26} height={36} rx={8} fill={color} />
    <path
      d="M22 32 L4 18 M48 32 L66 18"
      stroke={color}
      strokeWidth={8}
      strokeLinecap="round"
    />
    <circle cx={4} cy={17} r={5} fill="#eef0fb" />
    <circle cx={66} cy={17} r={5} fill="#eef0fb" />
    <path
      d="M28 60 L24 96 M42 60 L46 96"
      stroke="#1b1f33"
      strokeWidth={9}
      strokeLinecap="round"
    />
  </svg>
);

/** Portería con red. */
const Porteria: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "relative", width: GW, height: GH + 40 }}>
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: GW,
        height: GH,
        border: "16px solid #f1f3f5",
        borderBottom: "none",
        borderRadius: "10px 10px 0 0",
        backgroundImage:
          "linear-gradient(#ffffff22 2px, transparent 2px), linear-gradient(90deg, #ffffff22 2px, transparent 2px)",
        backgroundSize: "34px 34px",
        boxSizing: "border-box",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: -60,
        right: -60,
        top: GH,
        height: 40,
        background: "#2f9e44",
        borderRadius: 8,
      }}
    />
    {children}
  </div>
);

const Cifra: React.FC<{ v: string; t: string; color: string }> = ({
  v,
  t,
  color,
}) => (
  <div
    style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
  >
    <span
      style={{
        fontFamily: MONO,
        fontWeight: 700,
        fontSize: 120,
        color,
        lineHeight: 1,
      }}
    >
      {v}
    </span>
    <span
      style={{ fontFamily: FONT, fontWeight: 800, fontSize: 40, color: C.ink }}
    >
      {t}
    </span>
  </div>
);

/** Portero al centro con las dos cifras: cuadro 0 y final (bucle). */
const Portada: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <>
      <Centro top={300}>
        <Grande mono={false} size={100} color={C.ink}>
          ataja <span style={{ color: C.green }}>más del doble</span>
        </Grande>
      </Centro>
      <Centro top={480}>
        <div style={{ display: "flex", gap: 120 }}>
          <Cifra v="33 %" t="quieto al centro" color={C.green} />
          <Cifra v="13 %" t="lanzándose" color={C.coral} />
        </div>
      </Centro>
      <Centro top={760}>
        <Porteria>
          <Portero
            x={GW / 2}
            y={GH + 6 + 3 * Math.sin(f / 6)}
            color={C.green}
            s={1.3}
          />
          {[-1, 1].map((d) => (
            <div
              key={d}
              style={{
                position: "absolute",
                top: GH / 2,
                left: GW / 2 + d * 150 - (d < 0 ? 170 : 0),
                width: 170,
                height: 12,
                borderRadius: 6,
                background: `${C.coral}aa`,
              }}
            />
          ))}
        </Porteria>
      </Centro>
      <Pie top={1250}>probabilidad de atajar · Bar-Eli et al., 2007</Pie>
    </>
  );
};

const Gancho = () => <Portada />;

// Puntos de los 286 penaltis (posición fija, como una nube dentro de la portería).
const BALONES = Array.from({ length: 286 }).map((_, i) => {
  const a = (((i * 2654435761) >>> 0) % 1000) / 1000;
  const b = (((i * 40503 + 17) >>> 0) % 1000) / 1000;
  return { x: 30 + a * (GW - 60), y: 30 + b * (GH - 50) };
});

// 2 · En 286 penaltis…
const Penaltis = () => {
  const f = useCurrentFrame();
  const n = Math.round(
    interpolate(f, [2, 60], [0, 286], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  return (
    <>
      <Centro top={300}>
        <Grande size={170} color={C.ink}>
          {n}
        </Grande>
        <Sub size={56}>penaltis de primer nivel</Sub>
      </Centro>
      <Centro top={700}>
        <Porteria>
          {BALONES.slice(0, n).map((p, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: p.x - 9,
                top: p.y - 9,
                width: 18,
                height: 18,
                borderRadius: 9,
                background: "#f1f3f5",
              }}
            />
          ))}
        </Porteria>
      </Centro>
      <Sfx src="whoosh.wav" at={2} volume={0.3} />
    </>
  );
};

// 3 · Se lanzaron a un lado 94 de cada 100 veces.
const SeLanzan = () => {
  const f = useCurrentFrame();
  const sep = prog(f, 6, 40);
  return (
    <>
      <Centro top={300}>
        <Grande size={150} color={C.coral}>
          94 / 100
        </Grande>
        <Sub size={54}>se lanzaron a un lado</Sub>
      </Centro>
      <Centro top={700}>
        <Porteria>
          {BALONES.slice(0, 100).map((p, i) => {
            const centro = i < 6;
            const lado = i % 2 ? 1 : -1;
            const destinoX = centro
              ? GW / 2 + ((i % 3) - 1) * 26
              : GW / 2 + lado * (180 + (i % 13) * 22);
            const x = p.x + (destinoX - p.x) * sep;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: x - 10,
                  top: p.y - 10,
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  background: centro ? C.green : C.coral,
                }}
              />
            );
          })}
        </Porteria>
      </Centro>
      <Centro top={1130}>
        <Sub size={46} color={C.dim}>
          solo <span style={{ color: C.green }}>6 de cada 100</span> se quedaron
          al centro
        </Sub>
      </Centro>
      <Sfx src="whoosh.wav" at={6} volume={0.3} />
    </>
  );
};

// 4 · Lanzándose atajaron 1 de cada 7; quietos, 1 de cada 3.
const Barras = () => {
  const f = useCurrentFrame();
  const datos: [string, number, string, number][] = [
    ["izquierda", 14.2, C.coral, 4],
    ["centro", 33.3, C.green, 50],
    ["derecha", 12.6, C.coral, 10],
  ];
  return (
    <>
      <Centro top={300}>
        <Sub size={62}>¿cuántos atajaron?</Sub>
      </Centro>
      <Centro top={460}>
        <div
          style={{
            display: "flex",
            gap: 50,
            alignItems: "flex-end",
            height: 760,
          }}
        >
          {datos.map(([t, v, c, d]) => {
            const p = prog(f, d, d + 22);
            const brilla = t === "centro" && f > d + 22;
            return (
              <div
                key={t}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <span
                  style={{
                    fontFamily: MONO,
                    fontWeight: 700,
                    fontSize: 64,
                    color: c,
                    opacity: p,
                  }}
                >
                  {(v * p).toFixed(1)} %
                </span>
                <div
                  style={{
                    width: 220,
                    height: (v / 35) * 560 * p,
                    borderRadius: "24px 24px 0 0",
                    background: c,
                    boxShadow: brilla ? `0 0 60px ${c}` : undefined,
                  }}
                />
                <span
                  style={{
                    fontFamily: FONT,
                    fontWeight: 900,
                    fontSize: 46,
                    color: C.ink,
                  }}
                >
                  {t}
                </span>
              </div>
            );
          })}
        </div>
      </Centro>
      <Pie top={1280}>Bar-Eli et al., 2007 · 286 penaltis</Pie>
      <Sfx src="pop.wav" at={4} volume={0.35} />
      <Sfx src="ding.wav" at={72} volume={0.4} />
    </>
  );
};

// 5 · ¿Por qué saltan? Si te meten gol quieto, parece que no hiciste nada.
const PorQue = () => {
  const f = useCurrentFrame();
  const a = usePop(20);
  const b = usePop(60);
  const etiqueta = (t: string, color: string, p: number, d: number) => (
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: 52,
        color: C.bg,
        background: color,
        borderRadius: 20,
        padding: "8px 24px",
        opacity: f >= d ? 1 : 0,
        scale: interpolate(p, [0, 1], [0.5, 1]),
      }}
    >
      {t}
    </div>
  );
  return (
    <>
      <Centro top={300}>
        <Sub size={64}>si te meten gol…</Sub>
      </Centro>
      <Centro top={460}>
        <div style={{ display: "flex", gap: 60 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div
              style={{
                position: "relative",
                width: 400,
                height: 420,
                background: "#141a36",
                borderRadius: 26,
              }}
            >
              <Portero x={260} y={380} ang={-68} color={C.blue} s={1.3} />
            </div>
            {etiqueta("lo intentó", C.green, a, 20)}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div
              style={{
                position: "relative",
                width: 400,
                height: 420,
                background: "#141a36",
                borderRadius: 26,
              }}
            >
              <Portero x={200} y={380} color={C.blue} s={1.3} />
              <span
                style={{
                  position: "absolute",
                  top: 30,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  fontFamily: FONT,
                  fontWeight: 900,
                  fontSize: 54,
                  color: C.coral,
                  opacity: f >= 60 ? 1 : 0,
                  rotate: `${3 * Math.sin(f / 3)}deg`,
                }}
              >
                ¡buuu!
              </span>
            </div>
            {etiqueta("no hizo nada", C.coral, b, 60)}
          </div>
        </div>
      </Centro>
      <Sfx src="pop.wav" at={20} volume={0.35} />
      <Sfx src="boom.wav" at={60} volume={0.3} />
    </>
  );
};

// 6 · Se llama sesgo de acción.
const Sesgo = () => {
  const p = usePop(4, 9);
  return (
    <>
      <Centro top={560}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 110,
            lineHeight: 1.05,
            textAlign: "center",
            color: C.bg,
            background: C.yellow,
            borderRadius: 36,
            padding: "30px 50px",
            scale: interpolate(p, [0, 1], [0.4, 1]),
            rotate: "-3deg",
          }}
        >
          SESGO
          <br />
          DE ACCIÓN
        </div>
        <Sub size={52}>preferimos fallar haciendo algo</Sub>
      </Centro>
      <Sfx src="ding.wav" at={4} volume={0.4} />
    </>
  );
};

const Final = () => <Portada />;

const ESCENAS: EscenaCorta[] = [
  { nombre: "Gancho", voz: "q1", Comp: Gancho, aire: 8 },
  { nombre: "286 penaltis", voz: "q2", Comp: Penaltis, aire: 6 },
  { nombre: "Se lanzan", voz: "q3", Comp: SeLanzan, aire: 10 },
  { nombre: "Barras", voz: "q4", Comp: Barras, aire: 14 },
  { nombre: "Por qué", voz: "q5", Comp: PorQue, aire: 10 },
  { nombre: "Sesgo", voz: "q6", Comp: Sesgo, aire: 10 },
  { nombre: "Final", voz: "q7", Comp: Final, aire: 6 },
];

export const TOTAL_PORTERO = linea(S, ESCENAS).total;

export const PorteroQuieto: React.FC = () => (
  <Corto short={S} escenas={ESCENAS} acento={C.green} />
);

/** Portería con el portero al centro, para la miniatura. */
export const PorteriaQuieta: React.FC = () => (
  <Porteria>
    <Portero x={GW / 2} y={GH + 6} color={C.green} s={1.4} />
  </Porteria>
);
