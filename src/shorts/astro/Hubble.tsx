import React, { useMemo } from "react";
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
import { Lienzo } from "../../kit/three/Lienzo";
import { azar, Cielo, Halo } from "../../kit/three/Espacio";
import { Espectro, H_NM, NA_NM } from "./comun";

// "Hubble falló por 7× (y aun así tenía razón)". Hubble (1929): ≈ 500 km/s/Mpc; hoy ≈ 67 (Planck) a 73
// (escalera de distancias): 500 ÷ 70 ≈ 7. Corrimiento al rojo y pan de pasas: ilustrativos (3D con Three.js).

const S = "hubble" as const;
const FONDO = "#070a18";
const ROJO = "#ff8787";

/** Galaxias (sprites de colores) alrededor de la cámara que se alejan con el tiempo. */
const GALAXIAS = (() => {
  const r = azar(21);
  return Array.from({ length: 220 }).map(() => {
    const th = r() * Math.PI * 2;
    const ph = Math.acos(2 * r() - 1);
    const d = 1.5 + r() * 5.5;
    return {
      dir: [
        Math.sin(ph) * Math.cos(th),
        Math.cos(ph) * 0.7,
        Math.sin(ph) * Math.sin(th),
      ] as const,
      d,
      color: ["#a5c8ff", "#ffe8cc", "#d0bfff", "#c3fae8"][Math.floor(r() * 4)],
      tam: 0.25 + r() * 0.35,
    };
  });
})();

const Universo: React.FC<{ t: number }> = ({ t }) => (
  <Lienzo
    cam={{ pos: [0, 0, 0.01], mira: [0, 0, -1], fov: 70 }}
    fondo={FONDO}
    ambiente={0.2}
  >
    <Cielo n={500} />
    {GALAXIAS.map((g, i) => {
      const k = 1 + 0.12 * ((t % 6) + 0);
      const d = g.d * k;
      return (
        <group key={i} position={[g.dir[0] * d, g.dir[1] * d, g.dir[2] * d]}>
          <Halo color={d > 5 ? ROJO : g.color} tam={g.tam} opacidad={0.95} />
        </group>
      );
    })}
  </Lienzo>
);

const Portada: React.FC = () => {
  const f = useCurrentFrame();
  const t = (f + 30) / 30;
  return (
    <>
      <Universo t={t} />
      <Centro top={290}>
        <Grande mono={false} size={84} color={C.ink}>
          todas se <span style={{ color: ROJO }}>alejan</span>
        </Grande>
        <Sub size={46} color={C.dim}>
          …y no eres el centro
        </Sub>
      </Centro>
      <div
        style={{
          position: "absolute",
          left: 540 - 60,
          top: 960 - 60,
          width: 120,
          height: 120,
          borderRadius: 60,
          border: `6px solid ${C.yellow}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 40,
          color: C.yellow,
        }}
      >
        TÚ
      </div>
    </>
  );
};

const Gancho = () => <Portada />;

// 2 · Su luz llega más roja: se alejan.
const Rojo = () => {
  const f = useCurrentFrame();
  const z = interpolate(f, [10, 50], [0, 0.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rayas = [...H_NM, ...NA_NM].map((nm) => nm * (1 + z));
  return (
    <>
      <Centro top={300}>
        <Grande mono={false} size={96} color={C.ink}>
          luz <span style={{ color: ROJO }}>estirada</span>
        </Grande>
      </Centro>
      <Centro top={600}>
        <Sub size={42} color={C.dim}>
          galaxia quieta
        </Sub>
        <Espectro w={900} h={120} oscuras={[...H_NM, ...NA_NM]} />
        <div style={{ height: 60 }} />
        <Sub size={42} color={ROJO}>
          galaxia que se aleja
        </Sub>
        <Espectro w={900} h={120} oscuras={rayas} />
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 90,
            color: ROJO,
            marginTop: 20,
            opacity: prog(f, 30, 40),
          }}
        >
          → rojo
        </div>
      </Centro>
      <Pie top={1330}>corrimiento al rojo · ilustración</Pie>
      <Sfx src="whoosh.wav" at={10} volume={0.3} />
    </>
  );
};

// 3 · 1929: las lejanas huyen más rápido (gráfica ilustrativa).
const PUNTOS = (() => {
  const r = azar(4);
  return Array.from({ length: 24 }).map(() => {
    const d = 0.1 + r() * 1.9;
    return { d, v: d * 500 + (r() - 0.5) * 300 };
  });
})();
const Grafica = () => {
  const f = useCurrentFrame();
  const W = 900;
  const H = 620;
  const x = (d: number) => 80 + (d / 2.1) * (W - 110);
  const y = (v: number) => H - 70 - (Math.max(-100, v) / 1200) * (H - 120);
  const linea = prog(f, 60, 90);
  return (
    <>
      <Centro top={290}>
        <Grande size={130} color={C.yellow}>
          1929
        </Grande>
        <Sub size={48}>las más lejanas huyen más rápido</Sub>
      </Centro>
      <Centro top={560}>
        <svg
          width={W}
          height={H}
          style={{ background: "#0a0d1a", borderRadius: 24 }}
        >
          <line
            x1={80}
            y1={H - 70}
            x2={W - 20}
            y2={H - 70}
            stroke={C.dim}
            strokeWidth={3}
          />
          <line
            x1={80}
            y1={30}
            x2={80}
            y2={H - 70}
            stroke={C.dim}
            strokeWidth={3}
          />
          <text
            x={W / 2}
            y={H - 22}
            textAnchor="middle"
            fontFamily={FONT}
            fontWeight={800}
            fontSize={30}
            fill={C.dim}
          >
            distancia →
          </text>
          <text
            x={36}
            y={H / 2}
            textAnchor="middle"
            fontFamily={FONT}
            fontWeight={800}
            fontSize={30}
            fill={C.dim}
            transform={`rotate(-90 36 ${H / 2})`}
          >
            velocidad →
          </text>
          {PUNTOS.map((p, i) => (
            <circle
              key={i}
              cx={x(p.d)}
              cy={y(p.v)}
              r={12}
              fill={ROJO}
              opacity={prog(f, 6 + i * 2, 12 + i * 2)}
            />
          ))}
          <line
            x1={x(0)}
            y1={y(0)}
            x2={x(0) + (x(2.05) - x(0)) * linea}
            y2={y(0) + (y(2.05 * 500) - y(0)) * linea}
            stroke={C.yellow}
            strokeWidth={8}
          />
        </svg>
      </Centro>
      <Pie top={1250}>ilustración de la ley de Hubble</Pie>
    </>
  );
};

// 4 · Calculó 500 km/s por megapársec.
const Quinientos = () => {
  const p = usePop(4, 9);
  return (
    <>
      <Centro top={500}>
        <div style={{ scale: interpolate(p, [0, 1], [0.4, 1]) }}>
          <Grande size={380} color={C.yellow}>
            500
          </Grande>
        </div>
        <Sub size={52}>km/s por cada megapársec</Sub>
        <Sub size={40} color={C.dim}>
          (1 megapársec = 3.26 millones de años luz)
        </Sub>
      </Centro>
      <Sfx src="ding.wav" at={4} volume={0.35} />
    </>
  );
};

// 5 · Hoy ≈ 70: falló 7 veces, pero acertó la idea.
const Siete = () => {
  const f = useCurrentFrame();
  const v = Math.round(
    interpolate(f, [6, 50], [500, 70], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const sello = usePop(100, 9);
  return (
    <>
      <Centro top={400}>
        <Grande size={300} color={f >= 50 ? C.green : C.ink}>
          {v}
        </Grande>
        <Sub size={52}>hoy: entre 67 y 73</Sub>
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 110,
            color: C.coral,
            marginTop: 20,
            opacity: prog(f, 50, 60),
          }}
        >
          ÷ 7
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
            padding: "10px 36px",
            rotate: "-4deg",
            opacity: f >= 100 ? 1 : 0,
            scale: interpolate(sello, [0, 1], [1.8, 1]),
          }}
        >
          acertó: el universo se expande
        </div>
      </Centro>
      <Sfx src="boom.wav" at={50} volume={0.3} />
      <Sfx src="ding.wav" at={100} volume={0.4} />
    </>
  );
};

// 6 · Pan con pasas que crece (3D): cada pasa ve a las demás alejarse.
const PASAS = (() => {
  const r = azar(9);
  return Array.from({ length: 22 }).map(
    () => [(r() - 0.5) * 1.6, (r() - 0.5) * 0.9, (r() - 0.5) * 1.0] as const,
  );
})();
/** Pan de pasas en 3D: `k` = tamaño (crece), `giro` en radianes. */
const PanLienzo: React.FC<{ k: number; giro: number }> = ({ k, giro }) => {
  const flechas = useMemo(() => PASAS.slice(1, 9), []);
  return (
    <Lienzo
      cam={{ pos: [0, 1.2, 4.2], mira: [0, 0, 0], fov: 45 }}
      fondo={FONDO}
      ambiente={0.6}
    >
      <group scale={k} rotation={[0, giro, 0]}>
        <mesh scale={[1.05, 0.62, 0.68]}>
          <sphereGeometry args={[1, 48, 32]} />
          <meshStandardMaterial
            color="#e0a86a"
            roughness={0.9}
            transparent
            opacity={0.35}
            depthWrite={false}
          />
        </mesh>
        {PASAS.map((p, i) => (
          <mesh key={i} position={p}>
            <sphereGeometry args={[0.055, 16, 12]} />
            <meshStandardMaterial
              color={i === 0 ? C.yellow : "#5c3317"}
              emissive={i === 0 ? C.yellow : "#000"}
              emissiveIntensity={i === 0 ? 0.8 : 0}
            />
          </mesh>
        ))}
        {flechas.map((p, i) => {
          const a = PASAS[0];
          const pts = new Float32Array([a[0], a[1], a[2], p[0], p[1], p[2]]);
          return (
            <line key={i}>
              <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[pts, 3]} />
              </bufferGeometry>
              <lineBasicMaterial color={C.yellow} />
            </line>
          );
        })}
      </group>
    </Lienzo>
  );
};

export const PanMini: React.FC = () => <PanLienzo k={0.95} giro={0.6} />;

const Pan = () => {
  const f = useCurrentFrame();
  const k = interpolate(f, [0, 120], [0.6, 1.02], {
    extrapolateRight: "clamp",
  });
  return (
    <>
      <PanLienzo k={k} giro={f / 90} />
      <Centro top={290}>
        <Grande mono={false} size={84} color={C.ink}>
          pan con <span style={{ color: "#c8955c" }}>pasas</span>
        </Grande>
        <Sub size={46} color={C.dim}>
          cada pasa ve a las demás alejarse
        </Sub>
      </Centro>
      <Sfx src="whoosh.wav" at={4} volume={0.3} />
    </>
  );
};

const Final = () => <Portada />;

const ESCENAS: EscenaCorta[] = [
  { nombre: "Gancho 3D", voz: "h1", Comp: Gancho, aire: 6 },
  { nombre: "Luz roja", voz: "h2", Comp: Rojo, aire: 12 },
  { nombre: "1929", voz: "h3", Comp: Grafica, aire: 10 },
  { nombre: "500", voz: "h4", Comp: Quinientos, aire: 6 },
  { nombre: "÷7", voz: "h5", Comp: Siete, aire: 12 },
  { nombre: "Pan 3D", voz: "h6", Comp: Pan, aire: 10 },
  { nombre: "Final", voz: "h7", Comp: Final, aire: 6 },
];

export const TOTAL_HUBBLE = linea(S, ESCENAS).total;

export const Hubble: React.FC = () => (
  <Corto short={S} escenas={ESCENAS} acento={ROJO} />
);
