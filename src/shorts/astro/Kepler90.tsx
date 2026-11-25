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
import { Lienzo } from "../../kit/three/Lienzo";
import {
  azar,
  Cielo,
  Estrella3D,
  Halo,
  Orbita,
  Planeta,
  RedNeuronal,
} from "../../kit/three/Espacio";

// "Una IA encontró un planeta que nadie vio". NASA (14/12/2017): red neuronal de Shallue (Google AI)
// y Vanderburg (UT Austin), entrenada con 15,000 señales revisadas; buscó en 670 señales débiles y
// halló Kepler-90i. Kepler-90 (2,545 años luz) tiene 8 planetas, como el Sistema Solar.
// Sistemas en 3D (Three.js) ilustrativos: radios orbitales comprimidos y velocidades de Kepler.

const S = "kepler90" as const;
const FONDO = "#070a18";
const VERDE = "#69db7c";

// Kepler-90 b, c, i, d, e, f, g, h: semieje (UA), tamaño en pantalla y color.
const K90: [number, number, string][] = [
  [0.074, 0.045, "#adb5bd"],
  [0.089, 0.045, "#ced4da"],
  [0.107, 0.05, VERDE],
  [0.32, 0.07, "#74c0fc"],
  [0.42, 0.07, "#91a7ff"],
  [0.48, 0.072, "#a5d8ff"],
  [0.71, 0.12, "#e8c39e"],
  [1.01, 0.14, "#ffd8a8"],
];
const SOLAR: [number, number, string][] = [
  [0.39, 0.035, "#adb5bd"],
  [0.72, 0.05, "#ffd8a8"],
  [1.0, 0.052, "#4dabf7"],
  [1.52, 0.042, "#ff8787"],
  [5.2, 0.12, "#e8c39e"],
  [9.54, 0.1, "#ffe066"],
  [19.2, 0.075, "#99e9f2"],
  [30.1, 0.075, "#748ffc"],
];

/** Sistema planetario: estrella y 8 planetas en órbita (radios comprimidos con √a). */
const Sistema: React.FC<{
  datos: [number, number, string][];
  t: number;
  escala: number;
  marca?: number;
  vel?: number;
}> = ({ datos, t, escala, marca = -1, vel = 0.25 }) => {
  const amax = datos[datos.length - 1][0];
  return (
    <group>
      <Estrella3D r={0.16} />
      {datos.map(([a, rp, col], i) => {
        const R = 0.3 + Math.sqrt(a / amax) * escala;
        const w = vel * Math.pow(a / amax, -1.5) * 0.12;
        const ang = i * 1.3 + w * t;
        const m = i === marca;
        return (
          <group key={i}>
            <Orbita
              r={R}
              color={m ? VERDE : "#3b4170"}
              grosor={m ? 0.014 : 0.006}
            />
            <group position={[R * Math.cos(ang), 0, -R * Math.sin(ang)]}>
              <Planeta r={rp} color={col} emisivo={m ? 0.8 : 0.25} />
              {m ? <Halo color={VERDE} tam={0.6} opacidad={0.9} /> : null}
            </group>
          </group>
        );
      })}
    </group>
  );
};

const Portada: React.FC = () => {
  const f = useCurrentFrame();
  const t = (f + 90) / 30;
  return (
    <>
      <Lienzo
        cam={{ pos: [0, 3.4, 3.4], mira: [0, -0.2, 0], fov: 55 }}
        fondo={FONDO}
        ambiente={0.3}
        luz={{ pos: [0, 3, 0], intensidad: 2 }}
      >
        <Cielo />
        <Sistema datos={K90} t={t} escala={1.9} marca={2} />
      </Lienzo>
      <Centro top={290}>
        <Grande mono={false} size={92} color={C.ink}>
          lo encontró una <span style={{ color: VERDE }}>IA</span>
        </Grande>
      </Centro>
      <Centro top={1350}>
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 52,
            color: VERDE,
          }}
        >
          Kepler-90i
        </div>
      </Centro>
    </>
  );
};

const Gancho = () => <Portada />;

/** Mini curva de luz; `bache` 0..1 (profundidad visual). */
const Curva: React.FC<{
  bache: number;
  color: string;
  w?: number;
  h?: number;
}> = ({ bache, color, w = 150, h = 70 }) => {
  const y0 = 18;
  const y1 = y0 + bache * (h - 30);
  return (
    <svg
      width={w}
      height={h}
      style={{ background: "#0a0d1a", borderRadius: 10 }}
    >
      <polyline
        points={`6,${y0} ${w * 0.4},${y0} ${w * 0.44},${y1} ${w * 0.56},${y1} ${w * 0.6},${y0} ${w - 6},${y0}`}
        fill="none"
        stroke={color}
        strokeWidth={4}
      />
    </svg>
  );
};

const CURVAS = (() => {
  const rnd = azar(3);
  return Array.from({ length: 48 }).map(() => {
    const fuerte = rnd() < 0.35;
    return { fuerte, bache: fuerte ? 0.6 + rnd() * 0.4 : 0.05 + rnd() * 0.12 };
  });
})();

// 2 · Kepler juntó millones de curvas de luz.
const Lluvia = () => {
  const f = useCurrentFrame();
  return (
    <>
      <Centro top={290}>
        <Sub size={62}>millones de curvas de luz</Sub>
      </Centro>
      <Centro top={430}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 150px)",
            gap: 10,
          }}
        >
          {CURVAS.map((c, i) => {
            const d = (i % 6) * 2 + Math.floor(i / 6) * 5;
            return (
              <div
                key={i}
                style={{
                  opacity: prog(f, d, d + 6),
                  translate: `0px ${(1 - prog(f, d, d + 8)) * -80}px`,
                }}
              >
                <Curva bache={c.bache} color="#a5c8ff" />
              </div>
            );
          })}
        </div>
      </Centro>
      <Pie top={1330}>curvas ilustrativas</Pie>
      <Sfx src="whoosh.wav" at={2} volume={0.3} />
    </>
  );
};

// 3 · Las fuertes las revisaron personas; las débiles, nadie.
const Separar = () => {
  const f = useCurrentFrame();
  const k = prog(f, 6, 40);
  const fuertes = CURVAS.filter((c) => c.fuerte).slice(0, 12);
  const debiles = CURVAS.filter((c) => !c.fuerte).slice(0, 12);
  const col = (lista: typeof CURVAS, t: string, color: string, dx: number) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        translate: `${dx * (1 - k)}px 0px`,
      }}
    >
      <span style={{ fontFamily: FONT, fontWeight: 900, fontSize: 52, color }}>
        {t}
      </span>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 150px)",
          gap: 10,
        }}
      >
        {lista.map((c, i) => (
          <Curva key={i} bache={c.bache} color={color} />
        ))}
      </div>
    </div>
  );
  return (
    <>
      <Centro top={300}>
        <div style={{ display: "flex", gap: 60 }}>
          {col(fuertes, "personas", C.yellow, 120)}
          <div style={{ opacity: 0.4 + 0.6 * prog(f, 50, 60) }}>
            {col(debiles, "nadie", "#5c6393", -120)}
          </div>
        </div>
      </Centro>
      <Pie top={1330}>señales débiles: bache casi invisible</Pie>
      <Sfx src="whoosh.wav" at={6} volume={0.3} />
    </>
  );
};

// 4 · Una red neuronal aprendió con 15,000 señales revisadas.
const Red = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const n = Math.round(
    interpolate(f, [4, 90], [0, 15000], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  return (
    <>
      <Lienzo
        cam={{
          pos: [Math.sin(t * 0.5) * 2.2, 0.4, 9.5],
          mira: [0, 0, 0],
          fov: 45,
        }}
        fondo={FONDO}
        ambiente={0.4}
      >
        <Cielo n={400} />
        <group rotation={[0, Math.sin(t * 0.6) * 0.4, 0]}>
          <RedNeuronal capas={[6, 8, 8, 4, 1]} activa={Math.floor(f / 8) % 5} />
        </group>
      </Lienzo>
      <Centro top={290}>
        <Grande size={130} color={C.yellow}>
          {n.toLocaleString("en-US")}
        </Grande>
        <Sub size={48}>señales ya revisadas para aprender</Sub>
      </Centro>
      <Centro top={1330}>
        <Sub size={46} color={C.dim}>
          red neuronal (Google AI y U. de Texas)
        </Sub>
      </Centro>
    </>
  );
};

// 5 · Revisó 670 señales débiles y halló Kepler-90i.
const Hallazgo = () => {
  const f = useCurrentFrame();
  const n = Math.round(
    interpolate(f, [2, 70], [0, 670], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const encontrado = f >= 80;
  return (
    <>
      <Centro top={290}>
        <Grande size={150} color={C.ink}>
          {n}
        </Grande>
        <Sub size={48}>señales débiles revisadas</Sub>
      </Centro>
      <Centro top={640}>
        <div
          style={{
            scale: encontrado ? 1 : 0.9,
            outline: encontrado ? `8px solid ${VERDE}` : "none",
            borderRadius: 16,
            boxShadow: encontrado ? `0 0 60px ${VERDE}` : undefined,
          }}
        >
          <Curva
            bache={0.14}
            color={encontrado ? VERDE : "#5c6393"}
            w={860}
            h={300}
          />
        </div>
      </Centro>
      <Centro top={1020}>
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 70,
            color: VERDE,
            opacity: encontrado ? 1 : 0,
          }}
        >
          ¡Kepler-90i!
        </div>
      </Centro>
      <Sfx src="ding.wav" at={80} volume={0.45} />
    </>
  );
};

// 6 · 8 planetas: empata con el Sistema Solar (dos sistemas en 3D).
const Empate = () => {
  const f = useCurrentFrame();
  const t = (f + 40) / 30;
  return (
    <>
      <Lienzo
        cam={{ pos: [0, 5.4, 4.6], mira: [0, -0.4, 0], fov: 60 }}
        fondo={FONDO}
        ambiente={0.3}
        luz={{ pos: [0, 3, 0], intensidad: 2 }}
      >
        <Cielo />
        <group position={[0, 0, -1.55]} scale={0.62}>
          <Sistema datos={K90} t={t} escala={1.9} marca={2} />
        </group>
        <group position={[0, 0, 1.55]} scale={0.62}>
          <Sistema datos={SOLAR} t={t} escala={1.9} />
        </group>
      </Lienzo>
      <Centro top={290}>
        <Grande mono={false} size={86} color={C.ink}>
          8 planetas <span style={{ color: VERDE }}>=</span> 8 planetas
        </Grande>
      </Centro>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 520,
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 46,
          color: VERDE,
        }}
      >
        Kepler-90
      </div>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 1310,
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 46,
          color: "#74c0fc",
        }}
      >
        Sistema Solar
      </div>
      <Sfx src="ding.wav" at={20} volume={0.35} />
    </>
  );
};

const Final = () => <Portada />;

const ESCENAS: EscenaCorta[] = [
  { nombre: "Gancho 3D", voz: "k1", Comp: Gancho, aire: 8 },
  { nombre: "Lluvia de curvas", voz: "k2", Comp: Lluvia, aire: 8 },
  { nombre: "Fuertes y débiles", voz: "k3", Comp: Separar, aire: 12 },
  { nombre: "Red neuronal 3D", voz: "k4", Comp: Red, aire: 10 },
  { nombre: "Hallazgo", voz: "k5", Comp: Hallazgo, aire: 14 },
  { nombre: "Empate 3D", voz: "k6", Comp: Empate, aire: 12 },
  { nombre: "Final", voz: "k7", Comp: Final, aire: 6 },
];

export const TOTAL_KEPLER90 = linea(S, ESCENAS).total;

export const Kepler90: React.FC = () => (
  <Corto short={S} escenas={ESCENAS} acento={VERDE} />
);

/** Los dos sistemas (fijo), para la miniatura. */
export const EmpateMini: React.FC = () => (
  <Lienzo
    cam={{ pos: [0, 5.4, 4.6], mira: [0, -0.4, 0], fov: 60 }}
    fondo={FONDO}
    ambiente={0.3}
    luz={{ pos: [0, 3, 0], intensidad: 2 }}
  >
    <Cielo />
    <group position={[0, 0, -1.55]} scale={0.62}>
      <Sistema datos={K90} t={3} escala={1.9} marca={2} />
    </group>
    <group position={[0, 0, 1.55]} scale={0.62}>
      <Sistema datos={SOLAR} t={3} escala={1.9} />
    </group>
  </Lienzo>
);
