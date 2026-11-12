import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
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

// "La pantalla verde es una sola línea de código". Cada píxel responde una pregunta:
// ¿G > R + B? Sí → se cambia por el fondo nuevo. El recorte sale de los números de verdad.
// Personaje en pixel art propio (ejemplo simplificado: el cine real además suaviza bordes).

const S = "verde" as const;
type RGB = [number, number, number];

const MAPA = [
  "..................",
  "..................",
  "......hhhhhh......",
  ".....hhhhhhhh.....",
  ".....hssssssh.....",
  ".....sesssses.....",
  ".....ssssssss.....",
  "......ssmmss......",
  "........ss........",
  "....rrrrrrrrrr....",
  "...srrrrrrrrrrs...",
  "...srrrrrrrrrrs...",
  "...s.rrrrrrrr.s...",
  ".....pppppppp.....",
  ".....pppppppp.....",
  ".....ppp..ppp.....",
  ".....ppp..ppp.....",
  ".....zzz..zzz.....",
];
const N = 18;
const PALETA: Record<string, RGB> = {
  h: [70, 45, 30],
  s: [224, 172, 140],
  e: [30, 30, 40],
  m: [170, 60, 70],
  r: [210, 60, 70],
  p: [40, 60, 140],
  z: [25, 25, 30],
};
const verde = (x: number, y: number): RGB => [
  40 + ((x * 7 + y * 3) % 3) * 6,
  196 + ((x + y) % 2) * 8,
  64,
];
const FOTO: RGB[][] = MAPA.map((fila, y) =>
  fila.split("").map((ch, x) => PALETA[ch] ?? verde(x, y)),
);

/** La única pregunta. */
const esFondo = ([r, g, b]: RGB) => g > r + b;

const espacio = (x: number, y: number): RGB =>
  (x * 13 + y * 7) % 11 === 0 ? [240, 240, 255] : [14, 16, 44 + (y % 3) * 4];
const playa = (_x: number, y: number): RGB =>
  y < 7 ? [130, 200, 250] : y < 11 ? [40, 140, 205] : [240, 212, 150];

const css = ([r, g, b]: RGB) => `rgb(${r},${g},${b})`;

const Rejilla: React.FC<{
  lado: number;
  celda: (x: number, y: number, c: RGB) => RGB;
}> = ({ lado, celda }) => (
  <div
    style={{
      position: "relative",
      width: lado * N,
      height: lado * N,
      borderRadius: 18,
      overflow: "hidden",
    }}
  >
    {FOTO.flatMap((fila, y) =>
      fila.map((c, x) => (
        <div
          key={`${x}-${y}`}
          style={{
            position: "absolute",
            left: x * lado,
            top: y * lado,
            width: lado,
            height: lado,
            background: css(celda(x, y, c)),
            boxShadow: "inset 0 0 0 1px rgba(11,16,32,0.15)",
          }}
        />
      )),
    )}
  </div>
);

/** Fondo cambiado solo donde el píxel responde "sí". */
const recorte =
  (nuevo: (x: number, y: number) => RGB, hasta: number) =>
  (x: number, _y: number, c: RGB): RGB =>
    x + 0.5 < hasta && esFondo(c) ? nuevo(x, _y) : c;

const Paloma: React.FC<{ ok: boolean; size?: number }> = ({
  ok,
  size = 70,
}) => (
  <svg width={size} height={size} viewBox="0 0 40 40">
    <circle cx={20} cy={20} r={19} fill={ok ? C.green : C.coral} />
    {ok ? (
      <path
        d="M11 21 L18 28 L30 13"
        stroke="#0b1020"
        strokeWidth={5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ) : (
      <path
        d="M13 13 L27 27 M27 13 L13 27"
        stroke="#0b1020"
        strokeWidth={5}
        strokeLinecap="round"
      />
    )}
  </svg>
);

/** Código de la pregunta con G, R y B en su color. */
const Pregunta: React.FC<{ size?: number }> = ({ size = 110 }) => (
  <div
    style={{
      fontFamily: MONO,
      fontWeight: 700,
      fontSize: size,
      color: C.ink,
      background: "#0a0d1a",
      border: `4px solid ${C.green}88`,
      borderRadius: 28,
      padding: "14px 40px",
      whiteSpace: "nowrap",
    }}
  >
    <span style={{ color: "#34dc5a" }}>G</span> &gt;{" "}
    <span style={{ color: "#ff3b30" }}>R</span> +{" "}
    <span style={{ color: "#4678ff" }}>B</span>
  </div>
);

/** Mitad verde, mitad espacio, con el borde moviéndose: cuadro 0 y final (bucle). */
const Portada: React.FC = () => {
  const f = useCurrentFrame();
  const borde = 9 + 3 * Math.sin(f / 20);
  return (
    <>
      <Centro top={300}>
        <Grande mono={false} size={104} color={C.ink}>
          <span style={{ color: C.green }}>1</span> sola pregunta
        </Grande>
      </Centro>
      <Centro top={470}>
        <div style={{ position: "relative" }}>
          <Rejilla lado={48} celda={recorte(espacio, borde)} />
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: borde * 48 - 3,
              width: 6,
              background: C.ink,
            }}
          />
        </div>
      </Centro>
      <Pie top={1360}>Ejemplo simplificado · personaje de 18 × 18 píxeles</Pie>
    </>
  );
};

const Gancho = () => <Portada />;

const Claqueta: React.FC = () => (
  <svg width={300} height={250} viewBox="0 0 120 100">
    <rect x={8} y={36} width={104} height={58} rx={6} fill="#1b1f33" />
    <g transform="rotate(-14 8 34)">
      <rect x={8} y={14} width={104} height={20} rx={4} fill="#eef0fb" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M${16 + i * 21} 14 l12 0 l-8 20 l-12 0 z`}
          fill="#1b1f33"
        />
      ))}
    </g>
    <text
      x={60}
      y={74}
      textAnchor="middle"
      fill="#eef0fb"
      fontSize={16}
      fontFamily={FONT}
      fontWeight={900}
    >
      ESCENA 1
    </text>
  </svg>
);

// 2 · Parece magia de cine.
const Magia = () => {
  const f = useCurrentFrame();
  const p = usePop(2, 9);
  return (
    <>
      <Centro top={300}>
        <div
          style={{
            rotate: `${-8 + 8 * p}deg`,
            scale: interpolate(p, [0, 1], [0.4, 1]),
          }}
        >
          <Claqueta />
        </div>
      </Centro>
      <Centro top={600}>
        <div style={{ position: "relative" }}>
          <Rejilla lado={44} celda={(_x, _y, c) => c} />
          {[
            [120, 90],
            [640, 160],
            [90, 600],
            [680, 640],
            [400, 40],
          ].map(([x, y], i) => {
            const t = (f + i * 7) % 24;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  width: 46,
                  height: 46,
                  background: C.yellow,
                  clipPath:
                    "polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%)",
                  scale: 0.4 + 0.8 * Math.sin((t / 24) * Math.PI),
                }}
              />
            );
          })}
        </div>
      </Centro>
      <Sfx src="whoosh.wav" at={2} volume={0.3} />
    </>
  );
};

const Terna: React.FC<{ c: RGB; size?: number }> = ({ c, size = 52 }) => (
  <span
    style={{
      fontFamily: MONO,
      fontWeight: 700,
      fontSize: size,
      whiteSpace: "nowrap",
    }}
  >
    (<span style={{ color: "#ff5b50" }}>{c[0]}</span>,{" "}
    <span style={{ color: "#34dc5a" }}>{c[1]}</span>,{" "}
    <span style={{ color: "#6b96ff" }}>{c[2]}</span>)
  </span>
);

const MUESTRAS: { c: RGB; t: string }[] = [
  { c: FOTO[1][2], t: "fondo" },
  { c: PALETA.s, t: "piel" },
  { c: PALETA.p, t: "pantalón" },
];

// 3 · La computadora no ve a la persona: solo números.
const Numeros = () => {
  const f = useCurrentFrame();
  return (
    <>
      <Centro top={300}>
        <Sub size={68}>
          no ve personas: <span style={{ color: C.yellow }}>ve números</span>
        </Sub>
      </Centro>
      <Centro top={470}>
        <Rejilla lado={26} celda={(_x, _y, c) => c} />
      </Centro>
      <Centro top={970}>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {MUESTRAS.map(({ c }, i) => {
            const d = 30 + i * 12;
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 30,
                  opacity: prog(f, d, d + 6),
                  translate: `${(1 - prog(f, d, d + 8)) * 80}px 0px`,
                }}
              >
                <div
                  style={{
                    width: 110,
                    height: 110,
                    borderRadius: 18,
                    background: css(c),
                    border: `4px solid ${C.dim}`,
                  }}
                />
                <span style={{ color: C.ink }}>
                  <Terna c={c} size={62} />
                </span>
              </div>
            );
          })}
        </div>
      </Centro>
      {[30, 42, 54].map((d) => (
        <Sfx key={d} src="tick.wav" at={d} volume={0.45} />
      ))}
    </>
  );
};

// 4 · ¿El verde gana a rojo y azul juntos?
const PreguntaEsc = () => {
  const f = useCurrentFrame();
  const c = MUESTRAS[0].c;
  const crece = prog(f, 40, 70);
  const barra = (v: number, color: string, t: string) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
      }}
    >
      <div style={{ height: 520, display: "flex", alignItems: "flex-end" }}>
        <div
          style={{
            width: 220,
            height: (v / 400) * 520 * crece,
            borderRadius: "20px 20px 0 0",
            background: color,
          }}
        />
      </div>
      <span
        style={{
          fontFamily: MONO,
          fontWeight: 700,
          fontSize: 58,
          color: C.ink,
        }}
      >
        {Math.round(v * crece)}
      </span>
      <span
        style={{
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 40,
          color: C.dim,
        }}
      >
        {t}
      </span>
    </div>
  );
  return (
    <>
      <Centro top={320}>
        <Pregunta />
      </Centro>
      <Centro top={620}>
        <div style={{ display: "flex", gap: 90, alignItems: "flex-end" }}>
          {barra(c[1], "#34dc5a", "verde")}
          {barra(
            c[0] + c[2],
            "linear-gradient(#ff3b30 0 50%, #4678ff 50%)",
            "rojo + azul",
          )}
        </div>
      </Centro>
      <Sfx src="pop.wav" at={4} volume={0.4} />
      <Sfx src="whoosh.wav" at={40} volume={0.3} />
    </>
  );
};

// 5 · Sí → fondo nuevo. No → persona.
const SiNo = () => {
  const f = useCurrentFrame();
  return (
    <>
      <Centro top={300}>
        <Pregunta size={80} />
      </Centro>
      <Centro top={500}>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {MUESTRAS.map(({ c, t }, i) => {
            const d = 6 + i * 34;
            const ok = esFondo(c);
            const p = prog(f, d, d + 8);
            return (
              <div
                key={t}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 22,
                  width: 900,
                  background: "#141a36",
                  borderRadius: 24,
                  padding: "18px 24px",
                  border: `4px solid ${ok ? C.green : C.coral}`,
                  opacity: p,
                  scale: interpolate(p, [0, 1], [0.85, 1]),
                }}
              >
                <div
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 14,
                    background: css(c),
                  }}
                />
                <div
                  style={{
                    flex: 1,
                    fontFamily: MONO,
                    fontWeight: 700,
                    fontSize: 46,
                    color: C.ink,
                  }}
                >
                  {c[1]} &gt; {c[0] + c[2]}
                  <div
                    style={{
                      fontFamily: FONT,
                      fontWeight: 800,
                      fontSize: 36,
                      color: ok ? C.green : C.coral,
                    }}
                  >
                    {ok ? "sí → fondo nuevo" : `no → ${t}`}
                  </div>
                </div>
                <Paloma ok={ok} size={86} />
              </div>
            );
          })}
        </div>
      </Centro>
      <Centro top={1130}>
        <Rejilla
          lado={14}
          celda={recorte(
            espacio,
            interpolate(f, [80, 110], [0, N], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          )}
        />
      </Centro>
      <Sfx src="ding.wav" at={6} volume={0.3} />
      <Sfx src="boom.wav" at={40} volume={0.25} />
      <Sfx src="boom.wav" at={74} volume={0.25} />
    </>
  );
};

// 6 · Se usa verde porque casi nada en la piel es tan verde.
const PIELES: RGB[] = [
  [255, 224, 196],
  [241, 194, 160],
  [224, 172, 140],
  [198, 134, 98],
  [141, 85, 60],
  [86, 50, 36],
];
const Piel = () => {
  const f = useCurrentFrame();
  const sello = usePop(80, 9);
  return (
    <>
      <Centro top={300}>
        <Sub size={64}>
          ¿alguna piel pasa <span style={{ color: C.green }}>G &gt; R + B</span>
          ?
        </Sub>
      </Centro>
      <Centro top={470}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 280px)",
            gap: 24,
          }}
        >
          {PIELES.map((c, i) => {
            const d = 8 + i * 8;
            const p = prog(f, d, d + 6);
            return (
              <div
                key={i}
                style={{
                  height: 300,
                  borderRadius: 26,
                  background: css(c),
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  paddingBottom: 18,
                  opacity: p,
                  scale: interpolate(p, [0, 1], [0.7, 1]),
                }}
              >
                <div
                  style={{
                    background: "#0b1020dd",
                    borderRadius: 16,
                    padding: "6px 14px",
                    fontFamily: MONO,
                    fontWeight: 700,
                    fontSize: 36,
                    color: C.ink,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  {c[1]} &gt; {c[0] + c[2]}
                  {f >= d + 12 ? <Paloma ok={esFondo(c)} size={44} /> : null}
                </div>
              </div>
            );
          })}
        </div>
      </Centro>
      <Centro top={1150}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 64,
            color: C.bg,
            background: C.green,
            borderRadius: 24,
            padding: "12px 36px",
            opacity: f >= 80 ? 1 : 0,
            scale: interpolate(sello, [0, 1], [0.4, 1]),
          }}
        >
          ninguna: la persona se queda
        </div>
      </Centro>
      <Sfx src="ding.wav" at={80} volume={0.35} />
    </>
  );
};

// 7 · Dos millones de veces por cuadro… y vuelta al cuadro 0 (bucle).
const Final = () => {
  const f = useCurrentFrame();
  if (f >= 100) return <Portada />;
  const barre = interpolate(f, [4, 60], [0, N], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const n = Math.round(
    interpolate(f, [4, 60], [0, 2073600], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  return (
    <>
      <Centro top={300}>
        <Grande size={130} color={C.ink}>
          {n.toLocaleString("en-US")}
        </Grande>
        <Sub size={52}>preguntas en cada cuadro</Sub>
      </Centro>
      <Centro top={560}>
        <Rejilla lado={46} celda={recorte(playa, barre)} />
      </Centro>
      <Pie top={1430}>1080 × 1920 = 2,073,600 píxeles por cuadro</Pie>
      <Sfx src="whoosh.wav" at={4} volume={0.3} />
    </>
  );
};

const ESCENAS: EscenaCorta[] = [
  { nombre: "Gancho", voz: "v1", Comp: Gancho, aire: 6 },
  { nombre: "Magia", voz: "v2", Comp: Magia, aire: 6 },
  { nombre: "Números", voz: "v3", Comp: Numeros, aire: 8 },
  { nombre: "Pregunta", voz: "v4", Comp: PreguntaEsc, aire: 10 },
  { nombre: "Sí / No", voz: "v5", Comp: SiNo, aire: 10 },
  { nombre: "Piel", voz: "v6", Comp: Piel, aire: 10 },
  { nombre: "Final", voz: "v7", Comp: Final, aire: 4 },
];

export const TOTAL_VERDE = linea(S, ESCENAS).total;

export const PantallaVerde: React.FC = () => (
  <Corto short={S} escenas={ESCENAS} acento={C.green} />
);

/** Mitad verde, mitad espacio (fijo), para la miniatura. */
export const VerdeMitad: React.FC<{ lado: number }> = ({ lado }) => (
  <Rejilla lado={lado} celda={recorte(espacio, 9)} />
);
