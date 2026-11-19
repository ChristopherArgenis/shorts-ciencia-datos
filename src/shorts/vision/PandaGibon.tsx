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
  Tache,
  usePop,
} from "../../kit/corto";

// "Un ruido invisible engaña a la IA al 99 %". Porcentajes de Goodfellow, Shlens y Szegedy (2015),
// "Explaining and Harnessing Adversarial Examples": panda 57.7 % → gibón 99.3 % con ε = 0.007.
// Panda en pixel art propio; el ruido de ±2 por canal es ilustrativo (no es el gradiente real).

const S = "panda" as const;
const N = 20;
type RGB = [number, number, number];
const MAPA = [
  "....................",
  "...kkk.......kkk....",
  "...kkkwwwwwwwkkk....",
  "....wwwwwwwwwww.....",
  "...wwwwwwwwwwwww....",
  "...wwkkkwwwkkkww....",
  "...wkkwkwwwkwkkw....",
  "...wwkkkwwwkkkww....",
  "...wwwwwwkwwwwww....",
  "....wwwwkkkwwww.....",
  ".....wwwwwwwwww.....",
  "....kkkwwwwwwkkk....",
  "...kkkkwwwwwwkkkk...",
  "...kkkwwwwwwwwkkk...",
  "....kwwwwwwwwwwk....",
  "....wwwwwwwwwwww....",
  "....kkkwwwwwwkkk....",
  "...kkkk......kkkk...",
  "....................",
  "....................",
];
const fondo = (x: number, y: number): RGB =>
  x % 6 === 0
    ? [96, 160, 80]
    : (x + y) % 9 === 0
      ? [150, 200, 120]
      : [176, 214, 150];
const PANDA: RGB[][] = MAPA.map((f, y) =>
  f
    .split("")
    .map((ch, x) =>
      ch === "w" ? [236, 236, 232] : ch === "k" ? [30, 30, 36] : fondo(x, y),
    ),
);

/** Signo pseudoaleatorio fijo por píxel y canal (ilustra el ruido de ±ε). */
const signo = (x: number, y: number, c: number) =>
  (((x * 73 + y * 151 + c * 37) * 2654435761) >>> 0) % 2 ? 1 : -1;
const t = (v: number) => Math.max(0, Math.min(255, v));
const EPS = 2; // 0.007 × 255 ≈ 1.8
const ENGANO: RGB[][] = PANDA.map((f, y) =>
  f.map((c, x) => [0, 1, 2].map((i) => t(c[i] + EPS * signo(x, y, i))) as RGB),
);
const RUIDO: RGB[][] = PANDA.map((f, y) =>
  f.map((_, x) => [0, 1, 2].map((i) => 128 + 110 * signo(x, y, i)) as RGB),
);

const css = ([r, g, b]: RGB) => `rgb(${r},${g},${b})`;
const gris = ([r, g, b]: RGB) => Math.round(0.299 * r + 0.587 * g + 0.114 * b);

const Img: React.FC<{
  img: RGB[][];
  lado: number;
  numeros?: (x: number) => boolean;
}> = ({ img, lado, numeros }) => (
  <div
    style={{
      position: "relative",
      width: lado * N,
      height: lado * N,
      borderRadius: 14,
      overflow: "hidden",
    }}
  >
    {img.flatMap((fila, y) =>
      fila.map((c, x) => {
        const n = numeros?.(x);
        return (
          <div
            key={`${x}-${y}`}
            style={{
              position: "absolute",
              left: x * lado,
              top: y * lado,
              width: lado,
              height: lado,
              background: n ? "#0a0d1a" : css(c),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: lado * 0.36,
              color: n ? (gris(c) < 60 ? "#6b7299" : css(c)) : undefined,
            }}
          >
            {n ? gris(c) : null}
          </div>
        );
      }),
    )}
  </div>
);

const Etiqueta: React.FC<{ t: string; pct: string; color: string }> = ({
  t,
  pct,
  color,
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 16,
    }}
  >
    <span style={{ fontFamily: FONT, fontWeight: 900, fontSize: 58, color }}>
      {t}
    </span>
    <span
      style={{ fontFamily: MONO, fontWeight: 700, fontSize: 52, color: C.ink }}
    >
      {pct}
    </span>
  </div>
);

/** Dos pandas iguales con sus etiquetas: cuadro 0 y final (bucle). */
const Portada: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <>
      <Centro top={300}>
        <Grande mono={false} size={110} color={C.ink}>
          ¿<span style={{ color: C.yellow }}>iguales</span>?
        </Grande>
      </Centro>
      <Centro top={500}>
        <div style={{ display: "flex", gap: 40 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Img img={PANDA} lado={22} />
            <Etiqueta t="panda" pct="57.7 %" color={C.green} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              scale: 1 + 0.01 * Math.sin(f / 5),
            }}
          >
            <Img img={ENGANO} lado={22} />
            <Etiqueta t="gibón" pct="99.3 %" color={C.coral} />
          </div>
        </div>
      </Centro>
      <Pie top={1330}>lo que dijo la IA · Goodfellow et al., 2015</Pie>
    </>
  );
};

const Gancho = () => <Portada />;

// 2 · Creemos que una IA ve como nosotros.
const Ojos = () => (
  <>
    <Centro top={320}>
      <Sub size={66}>¿ve como tú?</Sub>
    </Centro>
    <Centro top={620}>
      <div style={{ display: "flex", alignItems: "center", gap: 60 }}>
        <svg width={300} height={180} viewBox="0 0 150 90">
          <path d="M5 45 Q75 -15 145 45 Q75 105 5 45 Z" fill="#eef0fb" />
          <circle cx={75} cy={45} r={26} fill={C.blue} />
          <circle cx={75} cy={45} r={12} fill="#0b1020" />
        </svg>
        <span
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 130,
            color: C.dim,
          }}
        >
          =
        </span>
        <svg width={240} height={240} viewBox="0 0 120 120">
          <rect x={10} y={20} width={100} height={84} rx={18} fill="#c9cde0" />
          <rect x={56} y={4} width={8} height={18} fill="#c9cde0" />
          <circle cx={60} cy={6} r={7} fill={C.coral} />
          <circle cx={40} cy={56} r={13} fill="#0b1020" />
          <circle cx={80} cy={56} r={13} fill="#0b1020" />
          <circle cx={40} cy={56} r={5} fill={C.green} />
          <circle cx={80} cy={56} r={5} fill={C.green} />
          <rect x={34} y={80} width={52} height={8} rx={4} fill="#0b1020" />
        </svg>
      </div>
    </Centro>
    <Tache delay={40} size={440} />
    <Sfx src="boom.wav" at={40} volume={0.35} />
  </>
);

// 3 · Pero solo ve números.
const Numeros = () => {
  const f = useCurrentFrame();
  const borde = interpolate(f, [0, 40], [N, 0], { extrapolateRight: "clamp" });
  return (
    <>
      <Centro top={300}>
        <Sub size={70}>
          solo ve <span style={{ color: C.yellow }}>números</span>
        </Sub>
      </Centro>
      <Centro top={460}>
        <Img img={PANDA} lado={44} numeros={(x) => x + 0.5 >= borde} />
      </Centro>
      <Sfx src="whoosh.wav" at={0} volume={0.3} />
    </>
  );
};

// 4 · Le sumaron un ruido diminuto: menos del 1 %.
const Ruido = () => {
  const f = useCurrentFrame();
  const encoge = prog(f, 40, 80);
  const igual = usePop(84);
  return (
    <>
      <Centro top={300}>
        <Grande size={100} color={C.ink}>
          + <span style={{ color: C.yellow }}>0.007</span> × ruido
        </Grande>
      </Centro>
      <Centro top={480}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Img img={PANDA} lado={13} />
          <span
            style={{
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 80,
              color: C.dim,
            }}
          >
            +
          </span>
          <div style={{ opacity: 1 - 0.85 * encoge, scale: 1 - 0.35 * encoge }}>
            <Img img={RUIDO} lado={13} />
          </div>
          <span
            style={{
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 80,
              color: C.dim,
              opacity: f >= 84 ? 1 : 0,
            }}
          >
            =
          </span>
          <div
            style={{
              opacity: f >= 84 ? 1 : 0,
              scale: interpolate(igual, [0, 1], [0.6, 1]),
            }}
          >
            <Img img={ENGANO} lado={13} />
          </div>
        </div>
      </Centro>
      <Centro top={900}>
        <div
          style={{
            display: "flex",
            gap: 50,
            alignItems: "center",
            opacity: prog(f, 10, 20),
          }}
        >
          {[PANDA[5][4], ENGANO[5][4]].map((c, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: 20,
                  background: css(c),
                  border: `4px solid ${C.dim}`,
                }}
              />
              <span
                style={{
                  fontFamily: MONO,
                  fontWeight: 700,
                  fontSize: 40,
                  color: C.ink,
                }}
              >
                ({c[0]}, {c[1]}, {c[2]})
              </span>
            </div>
          ))}
        </div>
        <Sub size={44} color={C.dim}>
          cada número cambia ±2 de 255
        </Sub>
      </Centro>
      <Pie top={1400}>ruido ilustrativo, mostrado aumentado</Pie>
      <Sfx src="pop.wav" at={10} volume={0.35} />
      <Sfx src="whoosh.wav" at={40} volume={0.3} />
      <Sfx src="pop.wav" at={84} volume={0.4} />
    </>
  );
};

// 5 · Calculado justo para engañarla.
const Calculado = () => {
  const f = useCurrentFrame();
  const flecha = prog(f, 6, 30);
  return (
    <>
      <Centro top={320}>
        <Sub size={66}>
          no es al azar: <span style={{ color: C.coral }}>está calculado</span>
        </Sub>
      </Centro>
      <Centro top={520}>
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <Img img={RUIDO} lado={20} />
          <div
            style={{
              width: 200 * flecha,
              height: 16,
              background: C.coral,
              borderRadius: 8,
            }}
          />
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 64,
              color: C.bg,
              background: C.coral,
              borderRadius: 22,
              padding: "8px 26px",
              opacity: f >= 30 ? 1 : 0,
            }}
          >
            gibón
          </div>
        </div>
      </Centro>
      <Sfx src="whoosh.wav" at={6} volume={0.3} />
    </>
  );
};

// 6 · Mismo panda para ti. Gibón con 99 % de seguridad.
const Confianza = () => {
  const f = useCurrentFrame();
  const cambio = f >= 50;
  const v = interpolate(f, [50, 90], [57.7, 99.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <>
      <Centro top={300}>
        <Img img={cambio ? ENGANO : PANDA} lado={26} />
      </Centro>
      <Centro top={900}>
        <div style={{ width: 880 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 64,
              color: cambio ? C.coral : C.green,
            }}
          >
            <span>{cambio ? "gibón" : "panda"}</span>
            <span style={{ fontFamily: MONO }}>{v.toFixed(1)} %</span>
          </div>
          <div
            style={{
              height: 60,
              borderRadius: 30,
              background: "#141a36",
              marginTop: 16,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${v}%`,
                height: "100%",
                borderRadius: 30,
                background: cambio ? C.coral : C.green,
              }}
            />
          </div>
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 40,
              color: C.dim,
              marginTop: 16,
              textAlign: "center",
            }}
          >
            seguridad de la IA
          </div>
        </div>
      </Centro>
      <Pie top={1360}>Goodfellow, Shlens y Szegedy, 2015</Pie>
      <Sfx src="boom.wav" at={50} volume={0.35} />
      <Sfx src="ding.wav" at={90} volume={0.35} />
    </>
  );
};

// 7 · Cambiaron apenas unos números… (vuelta al cuadro 0).
const Final = () => {
  const f = useCurrentFrame();
  if (f >= 50) return <Portada />;
  return (
    <Centro top={500}>
      <Img img={ENGANO} lado={44} numeros={(x) => x >= 10} />
    </Centro>
  );
};

const ESCENAS: EscenaCorta[] = [
  { nombre: "Gancho", voz: "p1", Comp: Gancho, aire: 10 },
  { nombre: "Ojos", voz: "p2", Comp: Ojos, aire: 10 },
  { nombre: "Números", voz: "p3", Comp: Numeros, aire: 12 },
  { nombre: "Ruido", voz: "p4", Comp: Ruido, aire: 14 },
  { nombre: "Calculado", voz: "p5", Comp: Calculado, aire: 12 },
  { nombre: "Confianza", voz: "p6", Comp: Confianza, aire: 14 },
  { nombre: "Final", voz: "p7", Comp: Final, aire: 4 },
];

export const TOTAL_PANDA = linea(S, ESCENAS).total;

export const PandaGibon: React.FC = () => (
  <Corto short={S} escenas={ESCENAS} acento={C.coral} />
);

/** Los dos pandas, para la miniatura. */
export const DosPandas: React.FC<{ lado: number }> = ({ lado }) => (
  <div style={{ display: "flex", gap: 30 }}>
    <Img img={PANDA} lado={lado} />
    <Img img={ENGANO} lado={lado} />
  </div>
);
