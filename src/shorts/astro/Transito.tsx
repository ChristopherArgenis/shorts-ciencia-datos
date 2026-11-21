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
} from "../../kit/corto";
import { PixelCirculo } from "./LuzSol";

// "La Tierra apaga al Sol solo un 0.008 %". Caída de luz = (radio planeta ÷ radio estrella)²:
// Tierra/Sol = 0.0084 % (84 ppm), Júpiter/Sol = 1.0 % (calculado). Kepler: más de 2,600 planetas (NASA).
// Curvas de luz simuladas; en la animación el planeta está agrandado (se avisa en pantalla).

const S = "transito" as const;
const NAR = "#ffa94d";

/** Fracción de la estrella tapada por un disco de radio r a distancia d de su centro (estrella de radio R). */
const tapado = (d: number, r: number, R: number) => {
  if (d >= R + r) return 0;
  if (d <= R - r) return (r * r) / (R * R);
  const a = r * r * Math.acos((d * d + r * r - R * R) / (2 * d * r));
  const b = R * R * Math.acos((d * d + R * R - r * r) / (2 * d * R));
  const c =
    0.5 * Math.sqrt((-d + r + R) * (d + r - R) * (d - r + R) * (d + r + R));
  return (a + b - c) / (Math.PI * R * R);
};

/** Estrella con un planeta (agrandado) cruzando y la curva de luz que se va dibujando. */
const Transito: React.FC<{ p: number; R?: number; r?: number }> = ({
  p,
  R = 230,
  r = 70,
}) => {
  const W = 900;
  const x = -R - r - 40 + p * (2 * (R + r + 40));
  const caida = (pp: number) =>
    tapado(Math.abs(-R - r - 40 + pp * (2 * (R + r + 40))), r, R);
  const max = (r * r) / (R * R);
  const H = 300;
  const y = (pp: number) => 40 + (caida(pp) / max) * (H - 90);
  const pts = Array.from({ length: Math.max(2, Math.round(p * 120)) }).map(
    (_, i) => {
      const pp = (i / 119) * p;
      return `${pp * W},${y(pp)}`;
    },
  );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 40,
      }}
    >
      <div style={{ position: "relative", width: W, height: 2 * R + 40 }}>
        <div style={{ position: "absolute", left: W / 2 - R, top: 20 }}>
          <PixelCirculo
            d={2 * R}
            n={22}
            centro="#fff3bf"
            borde={NAR}
            brillo={NAR}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: W / 2 + x - r,
            top: 20 + R - r,
            width: 2 * r,
            height: 2 * r,
            borderRadius: "50%",
            background: "#10131f",
          }}
        />
      </div>
      <svg
        width={W}
        height={H}
        style={{ background: "#0a0d1a", borderRadius: 20 }}
      >
        <text
          x={20}
          y={34}
          fontFamily={MONO}
          fontWeight={700}
          fontSize={26}
          fill={C.dim}
        >
          luz de la estrella
        </text>
        <polyline
          points={pts.join(" ")}
          fill="none"
          stroke={C.yellow}
          strokeWidth={7}
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

const Portada: React.FC = () => {
  const f = useCurrentFrame();
  const p = ((f + 50) % 150) / 150;
  return (
    <>
      <Centro top={290}>
        <Grande mono={false} size={96} color={C.ink}>
          planetas <span style={{ color: C.yellow }}>sin verlos</span>
        </Grande>
      </Centro>
      <Centro top={450}>
        <Transito p={p} />
      </Centro>
      <Pie top={1330}>planeta agrandado · curva de luz simulada</Pie>
    </>
  );
};

const Gancho = () => <Portada />;

// 2 · Crees que el telescopio ve el planeta.
const Ve = () => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, 40], [0.6, 1.1], { extrapolateRight: "clamp" });
  return (
    <>
      <Centro top={320}>
        <Sub size={68}>¿el telescopio lo ve?</Sub>
      </Centro>
      <Centro top={560}>
        <div
          style={{
            scale: z,
            width: 560,
            height: 560,
            borderRadius: "50%",
            overflow: "hidden",
            background: "#d9a066",
          }}
        >
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              style={{ height: 80, background: i % 2 ? "#b5763f" : "#e8c39e" }}
            />
          ))}
        </div>
      </Centro>
      <Tache delay={44} size={440} />
      <Sfx src="boom.wav" at={44} volume={0.35} />
    </>
  );
};

// 3 · Está lejísimos y su estrella lo deslumbra.
const Deslumbra = () => {
  const f = useCurrentFrame();
  return (
    <>
      <Centro top={320}>
        <Sub size={66}>la estrella lo deslumbra</Sub>
      </Centro>
      <div
        style={{
          position: "absolute",
          left: 300,
          top: 680,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: "#fff9db",
          boxShadow: `0 0 ${200 + 20 * Math.sin(f / 5)}px 120px #ffe8ccaa`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 860,
          top: 880,
          width: 10,
          height: 10,
          borderRadius: 5,
          background: "#343a40",
        }}
      />
      <Centro top={1320}>
        <Sub size={48} color={C.dim}>
          el planeta se pierde en el brillo
        </Sub>
      </Centro>
    </>
  );
};

// 4 · Cuando pasa enfrente, la luz baja.
const Baja = () => {
  const f = useCurrentFrame();
  return (
    <>
      <Centro top={290}>
        <Sub size={66}>
          al pasar enfrente,{" "}
          <span style={{ color: C.yellow }}>la luz baja</span>
        </Sub>
      </Centro>
      <Centro top={450}>
        <Transito p={prog(f, 0, 80)} />
      </Centro>
      <Pie top={1330}>planeta agrandado · curva de luz simulada</Pie>
    </>
  );
};

// 5 · Júpiter: 1 %. Tierra: 0.0084 %. Curvas a escala real.
const Escala = () => {
  const f = useCurrentFrame();
  const W = 900;
  const H = 280;
  const curva = (dip: number, p: number) => {
    const ymin = 0.988;
    const y = (v: number) => 20 + ((1 - v) / (1 - ymin)) * (H - 40);
    return Array.from({ length: Math.max(2, Math.round(121 * p)) })
      .map((_, i) => {
        const t = i / 120;
        const v = t > 0.35 && t < 0.65 ? 1 - dip : 1;
        return `${t * W},${y(v)}`;
      })
      .join(" ");
  };
  const caja = (
    t: string,
    dip: number,
    pct: string,
    color: string,
    d: number,
  ) => (
    <div style={{ opacity: prog(f, d, d + 6) }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 52,
          color,
          marginBottom: 10,
        }}
      >
        <span>{t}</span>
        <span style={{ fontFamily: MONO }}>−{pct}</span>
      </div>
      <svg
        width={W}
        height={H}
        style={{ background: "#0a0d1a", borderRadius: 20 }}
      >
        <polyline
          points={curva(dip, prog(f, d, d + 40))}
          fill="none"
          stroke={color}
          strokeWidth={7}
        />
      </svg>
    </div>
  );
  return (
    <>
      <Centro top={290}>
        <Sub size={56}>frente al Sol, a escala real</Sub>
      </Centro>
      <Centro top={420}>
        <div style={{ display: "flex", flexDirection: "column", gap: 50 }}>
          {caja("Júpiter", 0.01, "1 %", NAR, 4)}
          {caja("Tierra", 0.000084, "0.0084 %", C.blue, 70)}
        </div>
      </Centro>
      <Centro top={1170}>
        <Sub size={48} color={C.dim}>
          {f >= 110 ? "la Tierra: casi no se nota" : " "}
        </Sub>
      </Centro>
      <Pie top={1290}>(radio del planeta ÷ radio del Sol)²</Pie>
      <Sfx src="pop.wav" at={4} volume={0.35} />
      <Sfx src="pop.wav" at={70} volume={0.35} />
    </>
  );
};

// 6 · Así encontró Kepler más de 2,600 planetas.
const Kepler = () => {
  const f = useCurrentFrame();
  const n = Math.round(
    interpolate(f, [4, 70], [0, 2600], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const vis = Math.floor(
    interpolate(f, [4, 70], [0, 80], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  return (
    <>
      <Centro top={290}>
        <Grande size={150} color={C.yellow}>
          {n.toLocaleString("en-US")}
          {f >= 70 ? "+" : ""}
        </Grande>
        <Sub size={48}>planetas de Kepler, sin ver ninguno</Sub>
      </Centro>
      <Centro top={600}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(8, 104px)",
            gap: 8,
          }}
        >
          {Array.from({ length: 80 }).map((_, i) => {
            const con = (i * 7) % 5 === 0;
            return (
              <svg
                key={i}
                width={104}
                height={56}
                style={{
                  background: "#0a0d1a",
                  borderRadius: 8,
                  opacity: i < vis ? 1 : 0,
                }}
              >
                <polyline
                  points={
                    con ? "4,20 40,20 46,38 58,38 64,20 100,20" : "4,24 100,24"
                  }
                  fill="none"
                  stroke={con ? C.yellow : "#3b4170"}
                  strokeWidth={3}
                />
              </svg>
            );
          })}
        </div>
      </Centro>
      <Pie top={1330}>
        NASA: más de 2,600 planetas confirmados · ilustración
      </Pie>
      <Sfx src="whoosh.wav" at={4} volume={0.3} />
      <Sfx src="ding.wav" at={70} volume={0.35} />
    </>
  );
};

const Final = () => <Portada />;

const ESCENAS: EscenaCorta[] = [
  { nombre: "Gancho", voz: "t1", Comp: Gancho, aire: 8 },
  { nombre: "¿Lo ve?", voz: "t2", Comp: Ve, aire: 8 },
  { nombre: "Deslumbra", voz: "t3", Comp: Deslumbra, aire: 8 },
  { nombre: "Baja", voz: "t4", Comp: Baja, aire: 12 },
  { nombre: "Escala", voz: "t5", Comp: Escala, aire: 14 },
  { nombre: "Kepler", voz: "t6", Comp: Kepler, aire: 12 },
  { nombre: "Final", voz: "t7", Comp: Final, aire: 8 },
];

export const TOTAL_TRANSITO = linea(S, ESCENAS).total;

export const TransitoPlanetas: React.FC = () => (
  <Corto short={S} escenas={ESCENAS} acento={NAR} />
);

/** Tránsito a mitad (fijo), para la miniatura. */
export const TransitoMini: React.FC = () => <Transito p={0.56} />;
