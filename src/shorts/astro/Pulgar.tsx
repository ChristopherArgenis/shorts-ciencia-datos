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
} from "../../kit/corto";
import { Estrellas, SolPx } from "./comun";

// "Puedes medir una estrella con tu pulgar". Paralaje de Próxima Centauri (Gaia DR3): 0.768″,
// 1.3012 pc = 4.24 años luz ≈ 40 billones de km; 0.768″ ≈ moneda de 2 cm a 5.4 km (calculado).
// Gaia DR3 (ESA, 2022): paralaje para ≈ 1,460 millones de fuentes. Ilustración propia.

const S = "pulgar" as const;

/** Pulgar levantado (vista desde el ojo). */
const Pulgar: React.FC<{ x: number; s?: number }> = ({ x, s = 1 }) => (
  <svg
    width={220 * s}
    height={620 * s}
    viewBox="0 0 110 310"
    style={{ position: "absolute", left: x - 110 * s, bottom: 0 }}
  >
    <rect x={15} y={20} width={80} height={300} rx={40} fill="#e0a77a" />
    <rect x={28} y={34} width={54} height={70} rx={24} fill="#f4c7a1" />
    <path
      d="M15 170 Q55 185 95 170"
      stroke="#c98d62"
      strokeWidth={5}
      fill="none"
    />
  </svg>
);

/** Ventana de cielo con una estrella al fondo y un pulgar enfrente desplazado `dx`. */
const Cielo: React.FC<{ dx: number; s?: number; h?: number }> = ({
  dx,
  s = 1,
  h = 860,
}) => (
  <div
    style={{
      position: "relative",
      width: 900,
      height: h,
      borderRadius: 30,
      overflow: "hidden",
      background: "#070a18",
    }}
  >
    <Estrellas w={900} h={h} />
    <div
      style={{
        position: "absolute",
        left: 434,
        top: 230,
        width: 32,
        height: 32,
        background: C.yellow,
        boxShadow: `0 0 30px ${C.yellow}`,
      }}
    />
    <Pulgar x={450 + dx} s={s} />
  </div>
);

const Portada: React.FC = () => {
  const f = useCurrentFrame();
  const dx = Math.floor(f / 14) % 2 ? 60 : -60;
  return (
    <>
      <Centro top={290}>
        <Grande size={74} color={C.yellow}>
          40,000,000,000,000 km
        </Grande>
        <Sub size={44}>a la estrella más cercana</Sub>
      </Centro>
      <Centro top={500}>
        <Cielo dx={dx} />
      </Centro>
    </>
  );
};

const Gancho = () => <Portada />;

const Ojos: React.FC<{ izq: boolean }> = ({ izq }) => {
  const ojo = (abierto: boolean) => (
    <svg width={170} height={100} viewBox="0 0 150 90">
      {abierto ? (
        <>
          <path d="M5 45 Q75 -15 145 45 Q75 105 5 45 Z" fill="#eef0fb" />
          <circle cx={75} cy={45} r={24} fill={C.blue} />
          <circle cx={75} cy={45} r={11} fill="#0b1020" />
        </>
      ) : (
        <path
          d="M10 50 Q75 80 140 50"
          stroke="#eef0fb"
          strokeWidth={10}
          fill="none"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
  return (
    <div style={{ display: "flex", gap: 80 }}>
      {ojo(izq)}
      {ojo(!izq)}
    </div>
  );
};

// 2 · Estira el brazo y cierra un ojo. Luego, el otro.
const Brazo = () => {
  const f = useCurrentFrame();
  const izq = f < 50 || Math.floor((f - 50) / 14) % 2 === 0;
  return (
    <>
      <Centro top={300}>
        <Ojos izq={izq} />
        <Sub size={48}>{izq ? "ojo izquierdo" : "ojo derecho"}</Sub>
      </Centro>
      <Centro top={600}>
        <Cielo dx={f < 50 ? 0 : izq ? -60 : 60} h={760} />
      </Centro>
      <Sfx src="tick.wav" at={50} volume={0.4} />
    </>
  );
};

// 3 · Tu pulgar salta. Más cerca, salta más.
const Salta = () => {
  const f = useCurrentFrame();
  const cerca = f >= 44;
  const lado = Math.floor(f / 12) % 2 ? 1 : -1;
  return (
    <>
      <Centro top={300}>
        <Grande mono={false} size={80} color={C.ink}>
          {cerca ? (
            <>
              más cerca = <span style={{ color: C.yellow }}>salta más</span>
            </>
          ) : (
            "salta"
          )}
        </Grande>
      </Centro>
      <Centro top={480}>
        <Cielo dx={lado * (cerca ? 150 : 60)} s={cerca ? 1.4 : 1} />
      </Centro>
      <Sfx src="pop.wav" at={44} volume={0.4} />
    </>
  );
};

// 4 · Los dos ojos de los astrónomos: la Tierra en enero y en julio.
const Orbita = () => {
  const f = useCurrentFrame();
  const julio = f >= 70 ? Math.floor((f - 70) / 16) % 2 === 1 : f >= 40;
  const cx = 540;
  const cy = 1150;
  const R = 320;
  const tierra = julio ? cx + R : cx - R;
  const estrellaX = 540 + (julio ? -40 : 40);
  return (
    <>
      <Centro top={290}>
        <Sub size={60}>
          dos “ojos”: <span style={{ color: C.blue }}>enero</span> y{" "}
          <span style={{ color: C.green }}>julio</span>
        </Sub>
      </Centro>
      <svg
        width={1080}
        height={1500}
        style={{ position: "absolute", left: 0, top: 380 }}
        viewBox="0 380 1080 1500"
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <rect
            key={i}
            x={(i * 151) % 1080}
            y={420 + ((i * 53) % 160)}
            width={5}
            height={5}
            fill="#5c6393"
          />
        ))}
        <rect
          x={estrellaX - 16}
          y={480}
          width={32}
          height={32}
          fill={C.yellow}
        />
        <ellipse
          cx={cx}
          cy={cy}
          rx={R}
          ry={110}
          fill="none"
          stroke="#3b4170"
          strokeWidth={4}
          strokeDasharray="12 10"
        />
        <line
          x1={cx - R}
          y1={cy}
          x2={540}
          y2={496}
          stroke={C.blue}
          strokeWidth={4}
          opacity={julio ? 0.3 : 1}
        />
        <line
          x1={cx + R}
          y1={cy}
          x2={540}
          y2={496}
          stroke={C.green}
          strokeWidth={4}
          opacity={f >= 40 && julio ? 1 : 0.3}
        />
        <rect
          x={tierra - 18}
          y={cy - 18}
          width={36}
          height={36}
          rx={8}
          fill={julio ? C.green : C.blue}
        />
        <text
          x={cx - R}
          y={cy + 70}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={900}
          fontSize={40}
          fill={C.blue}
        >
          enero
        </text>
        <text
          x={cx + R}
          y={cy + 70}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={900}
          fontSize={40}
          fill={C.green}
        >
          julio
        </text>
      </svg>
      <div style={{ position: "absolute", left: cx - 50, top: cy - 50 }}>
        <SolPx d={100} />
      </div>
      <Pie top={1380}>
        dibujo sin escala: la estrella está muchísimo más lejos
      </Pie>
      <Sfx src="whoosh.wav" at={40} volume={0.3} />
    </>
  );
};

// 5 · Próxima Centauri: 0.77″, como una moneda a 5 km.
const Moneda = () => {
  const f = useCurrentFrame();
  const z = interpolate(f, [70, 130], [1, 14], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <>
      <Centro top={290}>
        <Grande size={170} color={C.yellow}>
          0.77″
        </Grande>
        <Sub size={46}>lo que “salta” Próxima Centauri</Sub>
      </Centro>
      <Centro top={700}>
        <div
          style={{
            position: "relative",
            width: 900,
            height: 420,
            borderRadius: 30,
            background: "#141a36",
            overflow: "hidden",
            opacity: prog(f, 60, 70),
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 40,
              right: 40,
              top: 300,
              height: 6,
              background: C.dim,
            }}
          />
          <span
            style={{
              position: "absolute",
              left: 40,
              top: 320,
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 36,
              color: C.dim,
            }}
          >
            tú
          </span>
          <span
            style={{
              position: "absolute",
              right: 40,
              top: 320,
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 36,
              color: C.dim,
            }}
          >
            5.4 km
          </span>
          <div
            style={{
              position: "absolute",
              right: 60,
              top: 296 - 4 * z,
              width: 4 * z,
              height: 4 * z,
              borderRadius: "50%",
              background: "#fcc419",
              border: `${Math.max(1, z / 3)}px solid #e67700`,
            }}
          />
        </div>
      </Centro>
      <Centro top={1160}>
        <Sub size={52}>
          una moneda de 2 cm a <span style={{ color: C.yellow }}>5.4 km</span>
        </Sub>
      </Centro>
      <Pie top={1300}>paralaje de Gaia DR3 · 4.24 años luz</Pie>
      <Sfx src="pop.wav" at={60} volume={0.35} />
      <Sfx src="whoosh.wav" at={70} volume={0.3} />
    </>
  );
};

// 6 · Gaia ya midió así casi 1,500 millones de estrellas.
const Gaia = () => {
  const f = useCurrentFrame();
  const n = Math.round(
    interpolate(f, [4, 100], [0, 1460000000], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const vis = Math.floor(
    interpolate(f, [4, 100], [0, 600], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  return (
    <>
      <Centro top={300}>
        <Grande size={110} color={C.ink}>
          {n.toLocaleString("en-US")}
        </Grande>
        <Sub size={46}>estrellas medidas así por Gaia</Sub>
      </Centro>
      <svg
        width={1080}
        height={700}
        style={{ position: "absolute", left: 0, top: 560 }}
      >
        {Array.from({ length: vis }).map((_, i) => {
          const a = (((i * 2654435761) >>> 0) % 1000) / 1000;
          const b = (((i * 40503 + 7) >>> 0) % 1000) / 1000;
          const y =
            350 +
            (b - 0.5) *
              520 *
              Math.exp(-((a - 0.5) ** 2) * 2.5) *
              (0.35 + 0.65 * Math.abs(Math.sin(i)));
          return (
            <rect
              key={i}
              x={60 + a * 960}
              y={y}
              width={4}
              height={4}
              fill={i % 9 ? "#c5cae9" : C.yellow}
            />
          );
        })}
      </svg>
      <Pie top={1330}>Gaia DR3 (ESA): paralaje de ≈ 1,460 millones</Pie>
    </>
  );
};

const Final = () => <Portada />;

const ESCENAS: EscenaCorta[] = [
  { nombre: "Gancho", voz: "u1", Comp: Gancho, aire: 4 },
  { nombre: "Brazo", voz: "u2", Comp: Brazo, aire: 4 },
  { nombre: "Salta", voz: "u3", Comp: Salta, aire: 4 },
  { nombre: "Órbita", voz: "u4", Comp: Orbita, aire: 6 },
  { nombre: "Moneda", voz: "u5", Comp: Moneda, aire: 6 },
  { nombre: "Gaia", voz: "u6", Comp: Gaia, aire: 6 },
  { nombre: "Final", voz: "u7", Comp: Final, aire: 8 },
];

export const TOTAL_PULGAR = linea(S, ESCENAS).total;

export const PulgarEstrella: React.FC = () => (
  <Corto short={S} escenas={ESCENAS} acento={C.yellow} />
);

/** Pulgar y estrella (fijo), para la miniatura. */
export const PulgarMini: React.FC = () => <Cielo dx={-70} h={900} />;
