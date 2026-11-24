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
import { Lienzo } from "../../kit/three/Lienzo";
import {
  Cielo,
  Estrella3D,
  Flecha,
  Galaxia3D,
  Orbita,
  Planeta,
} from "../../kit/three/Espacio";

// "Las galaxias giran demasiado rápido". Rubin y Ford (años 70, Andrómeda): curvas de rotación planas.
// Mercurio 47.4 km/s, Neptuno 5.4 km/s (≈ 8.7×). Materia oscura ≈ 85 % de la materia (5 % normal, 27 % oscura).
// Galaxia en 3D (Three.js), ilustrativa; el Sistema Solar gira con la 3.ª ley de Kepler (proporciones reales).

const S = "galaxias" as const;
const FONDO = "#070a18";

/** Flechas de velocidad tangentes, a dos radios, con la misma longitud (rotación plana). */
const Flechas: React.FC<{ t: number; v?: number }> = ({ t, v = 0.35 }) => (
  <>
    {[0.8, 2.2].map((r) => {
      const a = 0 - (v / r) * t;
      return (
        <group
          key={r}
          position={[r * Math.cos(a), 0.05, r * Math.sin(a)]}
          rotation={[0, Math.PI / 2 - a, 0]}
        >
          <Flecha largo={0.55} color={r < 1 ? "#ffd43b" : "#74c0fc"} />
        </group>
      );
    })}
  </>
);

const Escena3D: React.FC<{
  t: number;
  plana?: boolean;
  incl?: number;
  dist?: number;
  children?: React.ReactNode;
}> = ({ t, plana = true, incl = 0, dist = 10, children }) => (
  <Lienzo
    cam={{ pos: [0, dist * 0.62, dist * 0.8], mira: [0, -0.2, 0], fov: 50 }}
    fondo={FONDO}
    ambiente={0.2}
  >
    <Cielo />
    <group rotation={[incl, 0, 0]}>
      <Galaxia3D t={t} plana={plana} />
      {children}
    </group>
  </Lienzo>
);

const Portada: React.FC = () => {
  const f = useCurrentFrame();
  const t = (f + 60) / 30;
  return (
    <>
      <Escena3D t={t}>
        <Flechas t={t} />
      </Escena3D>
      <Centro top={290}>
        <Grande mono={false} size={78} color={C.ink}>
          giran <span style={{ color: C.yellow }}>demasiado</span> rápido
        </Grande>
      </Centro>
      <Centro top={1380}>
        <div
          style={{
            display: "flex",
            gap: 40,
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 42,
          }}
        >
          <span style={{ color: "#ffd43b" }}>adentro</span>
          <span style={{ color: C.ink }}>=</span>
          <span style={{ color: "#74c0fc" }}>afuera</span>
        </div>
      </Centro>
    </>
  );
};

const Gancho = () => <Portada />;

// 2 · En el Sistema Solar sí: Neptuno ≈ 9 veces más lento que Mercurio (Kepler).
const PLANETAS: [number, number, string][] = [
  [0.39, 0.035, "#adb5bd"],
  [0.72, 0.05, "#ffd8a8"],
  [1.0, 0.052, "#4dabf7"],
  [1.52, 0.042, "#ff8787"],
  [5.2, 0.12, "#e8c39e"],
  [9.54, 0.1, "#ffe066"],
  [19.2, 0.075, "#99e9f2"],
  [30.1, 0.075, "#748ffc"],
];
const SistemaSolar = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <>
      <Lienzo
        cam={{ pos: [0, 4.6, 3.6], mira: [0, 0, 0.3], fov: 52 }}
        fondo={FONDO}
        ambiente={0.3}
        luz={{ pos: [0, 3, 0], intensidad: 2 }}
      >
        <Cielo />
        <Estrella3D r={0.16} />
        {PLANETAS.map(([au, rp, col], i) => {
          const R = 0.35 + Math.sqrt(au) * 0.48;
          const w = 2.2 * Math.pow(au, -1.5);
          const a = i * 0.9 + w * t;
          const marcado = i === 0 || i === 7;
          return (
            <group key={i}>
              <Orbita
                r={R}
                color={marcado ? (i === 0 ? "#ffd43b" : "#74c0fc") : "#3b4170"}
                grosor={marcado ? 0.012 : 0.006}
              />
              <group position={[R * Math.cos(a), 0, -R * Math.sin(a)]}>
                <Planeta r={rp} color={col} emisivo={0.25} />
              </group>
            </group>
          );
        })}
      </Lienzo>
      <Centro top={290}>
        <Sub size={58}>en el Sistema Solar, sí frena</Sub>
      </Centro>
      <Centro top={1330}>
        <div
          style={{
            display: "flex",
            gap: 50,
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 44,
          }}
        >
          <span style={{ color: "#ffd43b" }}>Mercurio 47 km/s</span>
          <span style={{ color: "#74c0fc" }}>Neptuno 5 km/s</span>
        </div>
      </Centro>
    </>
  );
};

// 3 · Vera Rubin midió Andrómeda en los años 70.
const Andromeda = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <>
      <Escena3D t={t} incl={-0.45} dist={9}>
        {[-2.2, -1.4, -0.7, 0.7, 1.4, 2.2].map((x, i) => {
          const d = 20 + i * 10;
          const s = prog(f, d, d + 8);
          return (
            <mesh key={i} position={[x, 0.06, 0]} scale={[s, s, s]}>
              <sphereGeometry args={[0.11, 20, 14]} />
              <meshBasicMaterial color="#ff8787" />
            </mesh>
          );
        })}
      </Escena3D>
      <Centro top={290}>
        <div
          style={{
            background: "#070a18d9",
            borderRadius: 28,
            padding: "14px 30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grande mono={false} size={86} color={C.ink}>
            Vera Rubin · <span style={{ color: C.yellow }}>años 70</span>
          </Grande>
          <Sub size={46} color={C.dim}>
            midió la velocidad de las estrellas de Andrómeda
          </Sub>
        </div>
      </Centro>
      {[20, 30, 40, 50, 60, 70].map((d) => (
        <Sfx key={d} src="tick.wav" at={d} volume={0.35} />
      ))}
    </>
  );
};

// 4 · Gráfica: esperada (cae) vs medida (plana). Ilustrativa.
const Curvas = () => {
  const f = useCurrentFrame();
  const W = 900;
  const H = 620;
  const x = (r: number) => 60 + (r / 10) * (W - 90);
  const y = (v: number) => H - 70 - (v / 260) * (H - 130);
  const esperada = (r: number) =>
    r < 2 ? 220 * Math.sqrt(r / 2) : 220 * Math.sqrt(2 / r);
  const medida = (r: number) =>
    r < 2 ? 220 * Math.sqrt(r / 2) : 220 + 8 * Math.log(r / 2);
  const linea = (fn: (r: number) => number, p: number) =>
    Array.from({ length: Math.max(2, Math.round(100 * p)) })
      .map((_, i) => {
        const r = 0.05 + (i / 99) * 9.9;
        return `${x(r)},${y(fn(r))}`;
      })
      .join(" ");
  const p1 = prog(f, 4, 40);
  const p2 = prog(f, 40, 76);
  return (
    <>
      <Centro top={290}>
        <Sub size={60}>
          lo de afuera <span style={{ color: "#74c0fc" }}>no frena</span>
        </Sub>
      </Centro>
      <Centro top={460}>
        <svg
          width={W}
          height={H}
          style={{ background: "#0a0d1a", borderRadius: 24 }}
        >
          <line
            x1={60}
            y1={H - 70}
            x2={W - 20}
            y2={H - 70}
            stroke={C.dim}
            strokeWidth={3}
          />
          <line
            x1={60}
            y1={40}
            x2={60}
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
            distancia al centro →
          </text>
          <text
            x={30}
            y={H / 2}
            textAnchor="middle"
            fontFamily={FONT}
            fontWeight={800}
            fontSize={30}
            fill={C.dim}
            transform={`rotate(-90 30 ${H / 2})`}
          >
            velocidad →
          </text>
          <polyline
            points={linea(esperada, p1)}
            fill="none"
            stroke={C.coral}
            strokeWidth={8}
            strokeDasharray="18 12"
          />
          <polyline
            points={linea(medida, p2)}
            fill="none"
            stroke="#74c0fc"
            strokeWidth={9}
          />
          {p1 >= 1 ? (
            <text
              x={x(7.5)}
              y={y(esperada(7.5)) + 50}
              textAnchor="middle"
              fontFamily={FONT}
              fontWeight={900}
              fontSize={38}
              fill={C.coral}
            >
              esperada
            </text>
          ) : null}
          {p2 >= 1 ? (
            <text
              x={x(7.5)}
              y={y(medida(7.5)) - 24}
              textAnchor="middle"
              fontFamily={FONT}
              fontWeight={900}
              fontSize={38}
              fill="#74c0fc"
            >
              medida
            </text>
          ) : null}
        </svg>
      </Centro>
      <Pie top={1120}>curvas ilustrativas (Rubin y Ford)</Pie>
      <Sfx src="whoosh.wav" at={40} volume={0.3} />
    </>
  );
};

// 5 · Falta masa que no vemos: halo de materia oscura.
const Halo = () => {
  const f = useCurrentFrame();
  const t = (f + 200) / 30;
  const k = interpolate(f, [20, 70], [0.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <>
      <Escena3D t={t} dist={10.5}>
        <mesh scale={[3 * k, 1.6 * k, 3 * k]}>
          <sphereGeometry args={[1, 48, 32]} />
          <meshStandardMaterial
            color="#5f3dc4"
            transparent
            opacity={0.22 * prog(f, 20, 40)}
            depthWrite={false}
            emissive="#3b2b8f"
            emissiveIntensity={0.6}
          />
        </mesh>
      </Escena3D>
      <Centro top={290}>
        <Grande mono={false} size={92} color={C.ink}>
          materia <span style={{ color: "#b197fc" }}>oscura</span>
        </Grande>
        <Sub size={46} color={C.dim}>
          masa que no vemos, pero que jala
        </Sub>
      </Centro>
      <Sfx src="whoosh.wav" at={20} volume={0.3} />
    </>
  );
};

// 6 · 85 % de toda la materia.
const Porcentaje = () => {
  const f = useCurrentFrame();
  const p = prog(f, 6, 46);
  const sello = usePop(50);
  return (
    <>
      <Centro top={300}>
        <Grande size={200} color="#b197fc">
          {Math.round(85 * p)} %
        </Grande>
        <Sub size={52}>de toda la materia sería oscura</Sub>
      </Centro>
      <Centro top={760}>
        <div
          style={{
            width: 880,
            height: 120,
            borderRadius: 60,
            overflow: "hidden",
            display: "flex",
            background: "#141a36",
          }}
        >
          <div style={{ width: `${85 * p}%`, background: "#5f3dc4" }} />
          <div style={{ width: `${15 * p}%`, background: C.yellow }} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: 880,
            marginTop: 16,
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 40,
          }}
        >
          <span style={{ color: "#b197fc" }}>oscura</span>
          <span style={{ color: C.yellow }}>la que vemos: 15 %</span>
        </div>
      </Centro>
      <Centro top={1080}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 42,
            color: C.dim,
            opacity: f >= 50 ? 1 : 0,
            scale: interpolate(sello, [0, 1], [0.7, 1]),
          }}
        >
          y aún no sabemos qué es
        </div>
      </Centro>
      <Pie top={1300}>27 % ÷ (27 % + 5 %) ≈ 85 % · NASA/Planck</Pie>
      <Sfx src="ding.wav" at={46} volume={0.35} />
    </>
  );
};

const Final = () => <Portada />;

const ESCENAS: EscenaCorta[] = [
  { nombre: "Gancho 3D", voz: "g1", Comp: Gancho, aire: 8 },
  { nombre: "Sistema Solar 3D", voz: "g2", Comp: SistemaSolar, aire: 8 },
  { nombre: "Andrómeda 3D", voz: "g3", Comp: Andromeda, aire: 8 },
  { nombre: "Curvas", voz: "g4", Comp: Curvas, aire: 14 },
  { nombre: "Halo 3D", voz: "g5", Comp: Halo, aire: 10 },
  { nombre: "85 %", voz: "g6", Comp: Porcentaje, aire: 10 },
  { nombre: "Final", voz: "g7", Comp: Final, aire: 6 },
];

export const TOTAL_GALAXIAS = linea(S, ESCENAS).total;

export const Galaxias: React.FC = () => (
  <Corto short={S} escenas={ESCENAS} acento="#7048e8" />
);

/** Galaxia con halo (fija), para la miniatura. */
export const GalaxiaMini: React.FC = () => (
  <Escena3D t={2} dist={10.5}>
    <mesh scale={[3, 1.6, 3]}>
      <sphereGeometry args={[1, 48, 32]} />
      <meshStandardMaterial
        color="#5f3dc4"
        transparent
        opacity={0.22}
        depthWrite={false}
        emissive="#3b2b8f"
        emissiveIntensity={0.6}
      />
    </mesh>
  </Escena3D>
);
