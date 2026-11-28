import React, { useMemo } from "react";
import * as THREE from "three";
import { interpolate, useCurrentFrame } from "remotion";
import { Sfx } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import {
  Centro,
  Corto,
  type EscenaCorta,
  Grande,
  linea,
  Sub,
  usePop,
} from "../../kit/corto";
import { Lienzo, type Camara } from "../../kit/three/Lienzo";
import { Humanoide, poseEn, type Pose } from "../../kit/three/Humanoide";
import { Multitud, Reflector, Sala } from "../../kit/three/Escenario";
import { camaraEn, temblor } from "../../kit/three/Camara";
import { frenado, resorte } from "../../kit/three/Fisica";
import {
  ASPECTO_CONCURSANTE,
  ASPECTO_OBSERVADOR,
  ASPECTO_PACIENTE,
  ASPECTO_PRESENTADOR,
  CELEBRA,
  DE_PIE,
  PREOCUPADO,
  SENALA_FRENTE,
} from "../../kit/three/poses";

// "Salió negro 26 veces seguidas y todos perdieron". Casino de Montecarlo, 18 de agosto de 1913 (falacia de
// Montecarlo). Calculado: (18/37)^26 ≈ 1 en 137 millones contando el cero; rojo en cualquier giro = 18/37 = 48.6 %.
// Ruleta europea en 3D (Three.js) con el orden real de sus 37 casillas; la bola frena con fricción constante.

const S = "ruleta" as const;
const FONDO = "#0d0a08";
const ORDEN = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
  16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];
const ROJOS = new Set([
  1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
]);
const ROJO = "#c92a2a";
const NEGRO = "#151515";
const PASO = (2 * Math.PI) / 37;
const colorDe = (n: number) =>
  n === 0 ? "#2b8a3e" : ROJOS.has(n) ? ROJO : NEGRO;
const RUEDA: [number, number, number] = [0, 0.95, -1.15];

/** Textura del plato: 37 casillas con número (y brillo opcional en las rojas). */
const usePlato = (brilloRojo: boolean) =>
  useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 1024;
    const g = c.getContext("2d")!;
    const m = 512;
    g.fillStyle = "#5c3a1e";
    g.fillRect(0, 0, 1024, 1024);
    ORDEN.forEach((n, i) => {
      const a0 = (i - 0.5) * PASO;
      const a1 = (i + 0.5) * PASO;
      g.beginPath();
      g.moveTo(m, m);
      g.arc(m, m, 512, a0, a1);
      g.closePath();
      g.fillStyle = brilloRojo && ROJOS.has(n) ? "#ff4d4d" : colorDe(n);
      g.fill();
      g.strokeStyle = "#d4a017";
      g.lineWidth = 4;
      g.stroke();
      g.save();
      g.translate(m, m);
      g.rotate(i * PASO);
      g.translate(455, 0);
      g.rotate(Math.PI / 2);
      g.fillStyle = "#ffffff";
      g.font = "bold 44px sans-serif";
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillText(String(n), 0, 0);
      g.restore();
    });
    // centro de madera
    g.beginPath();
    g.arc(m, m, 330, 0, Math.PI * 2);
    g.fillStyle = "#7a4a24";
    g.fill();
    g.strokeStyle = "#d4a017";
    g.lineWidth = 10;
    g.stroke();
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, [brilloRojo]);

/** Estado de un giro: ángulo del plato y posición de la bola, que cae en `casilla` al tiempo T. */
const giro = (s: number, casilla: number, T = 2.2, fase = 0) => {
  const idx = ORDEN.indexOf(casilla);
  const rueda = fase + frenado(s, 3.2, 0.55);
  const cae = idx * PASO - (fase + frenado(T, 3.2, 0.55));
  let ang: number;
  let r: number;
  if (s >= T) {
    ang = idx * PASO - rueda;
    r = 0.79;
  } else {
    const q = T - s; // la bola gira al revés y frena
    ang = cae + 9 * q * q * 0.55 + 4.5 * q;
    const baja = Math.min(1, q / 0.7);
    const salto = s > T - 0.7 ? Math.abs(Math.sin(q * 14)) * 0.05 * baja : 0;
    r = 0.79 + 0.27 * baja + salto;
  }
  return {
    rueda,
    bola: [Math.cos(ang) * r, Math.sin(ang) * r] as const,
    cayo: s >= T,
  };
};

const Rueda: React.FC<{
  rueda: number;
  bola?: readonly [number, number];
  brilloRojo?: boolean;
}> = ({ rueda, bola, brilloRojo = false }) => {
  const tex = usePlato(brilloRojo);
  return (
    <group position={RUEDA}>
      {/* base y pista de la bola */}
      <mesh castShadow receiveShadow position={[0, -0.06, 0]}>
        <cylinderGeometry args={[1.22, 1.3, 0.14, 64]} />
        <meshStandardMaterial color="#4a2c14" roughness={0.5} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[0.93, 1.16, 64]} />
        <meshStandardMaterial
          color="#6b4423"
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <torusGeometry args={[1.18, 0.05, 12, 64]} />
        <meshStandardMaterial color="#3b2210" roughness={0.4} />
      </mesh>
      {/* plato que gira */}
      <group rotation={[0, rueda, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
          <circleGeometry args={[0.93, 74]} />
          <meshStandardMaterial
            map={tex}
            roughness={0.35}
            emissive={brilloRojo ? "#ff2020" : "#000000"}
            emissiveMap={brilloRojo ? tex : null}
            emissiveIntensity={brilloRojo ? 0.35 : 0}
          />
        </mesh>
        <mesh castShadow position={[0, 0.12, 0]}>
          <coneGeometry args={[0.22, 0.22, 24]} />
          <meshStandardMaterial
            color="#d4a017"
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>
        {[0, 1, 2, 3].map((k) => (
          <mesh
            key={k}
            castShadow
            position={[0, 0.2, 0]}
            rotation={[0, (k * Math.PI) / 2, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.025, 0.025, 0.6, 8]} />
            <meshStandardMaterial
              color="#d4a017"
              metalness={0.85}
              roughness={0.25}
            />
          </mesh>
        ))}
      </group>
      {bola ? (
        <mesh castShadow position={[bola[0], 0.09, bola[1]]}>
          <sphereGeometry args={[0.05, 20, 14]} />
          <meshStandardMaterial color="#ffffff" roughness={0.15} />
        </mesh>
      ) : null}
    </group>
  );
};

/** Torre de fichas. */
const Fichas: React.FC<{
  x: number;
  z: number;
  alto: number;
  color: string;
}> = ({ x, z, alto, color }) => {
  const n = Math.max(0, Math.round(alto));
  return (
    <group position={[x, 0.95, z]}>
      {Array.from({ length: n }).map((_, i) => (
        <mesh key={i} castShadow position={[0, 0.012 + i * 0.024, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.022, 20]} />
          <meshStandardMaterial
            color={i % 2 ? "#f8f9fa" : color}
            roughness={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};

const TORRES: [number, number, string][] = [
  [-0.95, 0.75, "#1971c2"],
  [-0.7, 1.0, "#f08c00"],
  [-0.45, 0.7, "#2f9e44"],
  [-0.8, 1.35, "#7048e8"],
  [-0.5, 1.25, "#1971c2"],
  [-1.05, 1.2, "#e8590c"],
  [-0.25, 1.05, "#f08c00"],
];

/** Gente alrededor de la mesa: posición, giro y aspecto. */
const JUGADORES: { x: number; z: number; rot: number; a: number }[] = [
  { x: -1.85, z: 0.7, rot: Math.PI / 2, a: 0 },
  { x: -1.855, z: -0.6, rot: Math.PI / 2, a: 1 },
  { x: -1.85, z: 1.9, rot: Math.PI / 2 - 0.3, a: 2 },
  { x: 1.85, z: 0.9, rot: -Math.PI / 2, a: 3 },
  { x: 1.855, z: -0.5, rot: -Math.PI / 2, a: 2 },
  { x: 1.85, z: 2.0, rot: -Math.PI / 2 + 0.3, a: 0 },
  { x: -0.7, z: 3.3, rot: Math.PI, a: 1 },
  { x: 0.75, z: 3.35, rot: Math.PI, a: 3 },
];
const ASPECTOS = [
  ASPECTO_CONCURSANTE,
  ASPECTO_PRESENTADOR,
  ASPECTO_OBSERVADOR,
  ASPECTO_PACIENTE,
];

const Casino: React.FC<{
  cam: Camara;
  g: ReturnType<typeof giro>;
  apuesta?: number;
  pose?: Pose;
  gente?: boolean;
  brilloRojo?: boolean;
}> = ({ cam, g, apuesta = 1, pose = DE_PIE, gente = true, brilloRojo }) => (
  <Lienzo
    cam={cam}
    fondo={FONDO}
    ambiente={0.35}
    luz={{ pos: [1.5, 7, 2], intensidad: 1.6, color: "#ffe8cc" }}
  >
    <Sala piso="#2a1a12" pared="#24130c" ancho={30} fondo={7} />
    <Reflector
      pos={[0, 6.5, 0.5]}
      objetivo={[0, 0.9, -0.3]}
      intensidad={40}
      color="#ffe8a8"
    />
    {/* mesa de paño verde */}
    <mesh castShadow receiveShadow position={[0, 0.45, 0.2]}>
      <boxGeometry args={[3.2, 0.9, 5.4]} />
      <meshStandardMaterial color="#3b2210" roughness={0.6} />
    </mesh>
    <mesh receiveShadow position={[0, 0.905, 0.2]}>
      <boxGeometry args={[3.0, 0.02, 5.2]} />
      <meshStandardMaterial color="#1f6b3a" roughness={0.95} />
    </mesh>
    {/* casillas de apuesta ROJO y NEGRO */}
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.68, 0.92, 1.05]}>
      <planeGeometry args={[1.1, 1.2]} />
      <meshStandardMaterial color={ROJO} roughness={0.9} />
    </mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.68, 0.92, 1.05]}>
      <planeGeometry args={[1.1, 1.2]} />
      <meshStandardMaterial color={NEGRO} roughness={0.9} />
    </mesh>
    {TORRES.map(([x, z, c], i) => (
      <Fichas
        key={i}
        x={x}
        z={z}
        color={c}
        alto={(4 + ((i * 5) % 7)) * apuesta}
      />
    ))}
    <Rueda rueda={g.rueda} bola={g.bola} brilloRojo={brilloRojo} />
    {gente ? (
      <>
        {JUGADORES.map((j, i) => (
          <Humanoide
            key={i}
            pose={{ ...pose, pos: [j.x, 0.925, j.z], rotY: j.rot }}
            aspecto={ASPECTOS[j.a]}
          />
        ))}
        <group position={[0, 0, -4.8]}>
          <Multitud filas={4} columnas={14} sep={0.6} semilla={13} />
        </group>
      </>
    ) : null}
  </Lienzo>
);

const Velo: React.FC<{ alto?: number }> = ({ alto = 760 }) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      height: alto,
      background: "linear-gradient(#0d0a08f2 0%, #0d0a08bb 60%, transparent)",
    }}
  />
);

/** Ficha 2D: círculo negro con el contador. */
const Contador: React.FC<{ n: number; size?: number }> = ({
  n,
  size = 230,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 28,
      background: "#0d0a08cc",
      borderRadius: size,
      padding: `${size * 0.06}px ${size * 0.25}px ${size * 0.06}px ${size * 0.1}px`,
      border: "4px solid #d4a017",
    }}
  >
    <div
      style={{
        width: size * 0.62,
        height: size * 0.62,
        borderRadius: "50%",
        background: "radial-gradient(#3a3a3a 0%, #000 70%)",
        border: `${size * 0.05}px dashed #f8f9fa`,
        boxShadow: "0 0 0 6px #000",
      }}
    />
    <div
      style={{
        fontFamily: MONO,
        fontWeight: 800,
        fontSize: size,
        color: C.ink,
        lineHeight: 1,
      }}
    >
      {n}
    </div>
  </div>
);

const CAM_MESA: Camara = { pos: [0, 4.7, 3.4], mira: [0, 0.5, -2.2], fov: 52 };

// 1 y 7 · La ruleta desde arriba; la bola cae en negro.
const Portada: React.FC = () => {
  const f = useCurrentFrame();
  const s = f / 30;
  const g = giro(s + 0.9, 26, 2.2);
  const cam = temblor(
    camaraEn(
      [
        [0, CAM_MESA],
        [4, { pos: [0, 4.3, 2.9], mira: [0, 0.5, -2.3], fov: 50 }],
      ],
      s,
    ),
    s,
    Math.max(0, 1 - Math.abs(s + 0.9 - 2.2) * 5) * 0.5,
  );
  return (
    <>
      <Casino cam={cam} g={g} pose={SENALA_FRENTE} />
      <Velo />
      <Centro top={250}>
        <Contador n={26} />
        <Sub size={58} color={C.ink}>
          negros <span style={{ color: C.yellow }}>seguidos</span>
        </Sub>
      </Centro>
      <Sfx src="tick.wav" at={Math.round((2.2 - 0.9) * 30)} volume={0.4} />
    </>
  );
};

const Gancho = () => <Portada />;

// 2 · Montecarlo 1913: tres giros rápidos, cada uno en negro.
const NEGROS = [17, 8, 33];
const Racha = () => {
  const f = useCurrentFrame();
  const k = Math.min(2, Math.floor(f / 38));
  const s = (f - k * 38) / 30 + 0.45;
  const g = giro(s, NEGROS[k], 1.0, k * 2.1);
  const CAMS: Camara[] = [
    { pos: [1.6, 2.6, 0.9], mira: [0, 0.95, -1.15], fov: 46 },
    { pos: [-1.5, 2.9, 1.2], mira: [0, 0.95, -1.15], fov: 44 },
    { pos: [0, 4.0, 1.4], mira: [0, 0.95, -1.15], fov: 44 },
  ];
  const cuenta = 3 + k + (g.cayo ? 0 : -1);
  return (
    <>
      <Casino
        cam={temblor(
          CAMS[k],
          s,
          g.cayo ? Math.max(0, 1 - (s - 1) * 6) * 0.4 : 0,
        )}
        g={g}
        gente={false}
      />
      <Velo alto={700} />
      <Centro top={250}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 54,
            color: C.yellow,
            letterSpacing: 4,
          }}
        >
          MONTECARLO · 1913
        </div>
        <Contador n={Math.max(2, cuenta)} size={190} />
      </Centro>
      {[0, 1, 2].map((i) => (
        <Sfx key={i} src="tick.wav" at={i * 38 + 17} volume={0.4} />
      ))}
    </>
  );
};

// 3 · "Ya toca rojo": la gente apuesta más y más.
const Apuestan = () => {
  const f = useCurrentFrame();
  const s = f / 30;
  const g = giro(s + 3, 6, 2.2, 1.3);
  const apuesta = 1 + 1.4 * resorte(s - 0.6) + 1.2 * resorte(s - 1.8);
  const cam = camaraEn(
    [
      [0, { pos: [0, 3.2, 3.4], mira: [-0.6, 0.95, 1.0], fov: 46 }],
      [3.2, { pos: [0.5, 6.4, 6.6], mira: [0, 0.9, -0.3], fov: 50 }],
    ],
    s,
  );
  const pose = poseEn(
    [
      [0, DE_PIE],
      [0.8, SENALA_FRENTE],
      [2.2, CELEBRA],
    ],
    s,
  );
  return (
    <>
      <Casino cam={cam} g={g} apuesta={apuesta} pose={pose} />
      <Velo />
      <Centro top={270}>
        <Grande mono={false} size={110} color={C.ink}>
          "ya toca <span style={{ color: "#ff6b6b" }}>ROJO</span>"
        </Grande>
        <Sub size={50} color={C.dim}>
          y apostaron más y más
        </Sub>
      </Centro>
      <Sfx src="pop.wav" at={20} volume={0.35} />
      <Sfx src="pop.wav" at={56} volume={0.35} />
    </>
  );
};

// 4 · La ruleta no tiene memoria: todo se congela y la racha se borra.
const Memoria = () => {
  const f = useCurrentFrame();
  const borra = interpolate(f, [12, 55], [0, 26], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const g = giro(4, 26, 2.2);
  const cam = camaraEn(
    [
      [0, { pos: [0, 4.2, 1.6], mira: [0, 0.95, -1.15], fov: 46 }],
      [2.5, { pos: [0, 3.4, 0.6], mira: [0, 0.95, -1.15], fov: 42 }],
    ],
    f / 30,
  );
  return (
    <>
      <div
        style={{ position: "absolute", inset: 0, filter: "grayscale(0.85)" }}
      >
        <Casino cam={cam} g={g} gente={false} />
      </div>
      <Velo alto={820} />
      <Centro top={260}>
        <Grande mono={false} size={96} color={C.ink}>
          no tiene <span style={{ color: C.yellow }}>memoria</span>
        </Grande>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 12,
            width: 880,
            marginTop: 30,
            background: "#0d0a08dd",
            borderRadius: 30,
            padding: 22,
          }}
        >
          {Array.from({ length: 26 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "radial-gradient(#3a3a3a 0%, #000 70%)",
                border: "5px dashed #f8f9fa",
                boxShadow: "0 0 0 3px #000",
                opacity: i < 26 - borra ? 1 : 0.08,
              }}
            />
          ))}
        </div>
      </Centro>
      <Sfx src="whoosh.wav" at={12} volume={0.3} />
    </>
  );
};

// 5 · Giro 27: el rojo sigue en 48.6 %.
const Igual = () => {
  const f = useCurrentFrame();
  const s = f / 30;
  const g = giro(s + 4, 0, 2.2, 0.7);
  const cam = {
    pos: [0, 3.9, 1.5] as [number, number, number],
    mira: [0, 0.4, -3.0] as [number, number, number],
    fov: 44,
  };
  const GIROS = [1, 15, 27];
  return (
    <>
      <Casino cam={cam} g={{ ...g, bola: g.bola }} gente={false} brilloRojo />
      <Velo alto={900} />
      <Centro top={240}>
        <Sub size={50} color={C.dim}>
          probabilidad de rojo
        </Sub>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            marginTop: 14,
            background: "#0d0a08e6",
            borderRadius: 30,
            padding: "18px 24px",
          }}
        >
          {GIROS.map((n, i) => {
            const on = f >= 10 + i * 30;
            const ultimo = i === 2;
            return (
              <div
                key={n}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 30,
                  opacity: on ? 1 : 0,
                  scale: on
                    ? interpolate(f - (10 + i * 30), [0, 6], [1.3, 1], {
                        extrapolateRight: "clamp",
                      })
                    : 1,
                  background: ultimo ? "#ff6b6b22" : "transparent",
                  border: ultimo
                    ? "4px solid #ff6b6b"
                    : "4px solid transparent",
                  borderRadius: 20,
                  padding: "2px 30px",
                }}
              >
                <span
                  style={{
                    fontFamily: FONT,
                    fontWeight: 700,
                    fontSize: 50,
                    color: C.dim,
                    width: 230,
                  }}
                >
                  giro {n}
                </span>
                <span
                  style={{
                    fontFamily: MONO,
                    fontWeight: 800,
                    fontSize: 110,
                    color: "#ff6b6b",
                  }}
                >
                  48.6 %
                </span>
              </div>
            );
          })}
          <div
            style={{
              fontFamily: MONO,
              fontSize: 30,
              color: C.dim,
              textAlign: "center",
            }}
          >
            18 casillas rojas de 37 · calculado
          </div>
        </div>
      </Centro>
      {GIROS.map((_, i) => (
        <Sfx key={i} src="tick.wav" at={10 + i * 30} volume={0.35} />
      ))}
    </>
  );
};

// 6 · El negro 26: 1 en 137 millones. La gente, preocupada.
const Raro = () => {
  const f = useCurrentFrame();
  const s = f / 30;
  const g = giro(s + 1.2, 26, 2.2, 2.4);
  const p = usePop(30, 9);
  const pose = poseEn(
    [
      [0, SENALA_FRENTE],
      [1.1, PREOCUPADO],
    ],
    s,
  );
  const cam = temblor(
    camaraEn(
      [
        [0, { pos: [0.6, 3.4, 6.2], mira: [0, 0.6, -1.6], fov: 54 }],
        [3.5, { pos: [0.3, 3.1, 5.4], mira: [0, 0.6, -1.6], fov: 52 }],
      ],
      s,
    ),
    s,
    Math.max(0, 1 - Math.abs(s - 1.0) * 5) * 0.5,
  );
  return (
    <>
      <Casino cam={cam} g={g} pose={pose} apuesta={3.6} />
      <Velo alto={860} />
      <Centro top={250}>
        <Contador n={26} size={170} />
        <div
          style={{
            marginTop: 20,
            background: C.ink,
            color: C.bg,
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 84,
            borderRadius: 26,
            padding: "6px 36px",
            opacity: f >= 30 ? 1 : 0,
            scale: interpolate(p, [0, 1], [1.7, 1]),
          }}
        >
          1 en 137 millones
        </div>
        <div
          style={{
            marginTop: 12,
            fontFamily: MONO,
            fontSize: 30,
            color: C.ink,
            background: "#0d0a08cc",
            borderRadius: 14,
            padding: "4px 18px",
            opacity: f >= 30 ? 1 : 0,
          }}
        >
          contando el cero · calculado · (18/37)²⁶
        </div>
      </Centro>
      <Sfx src="tick.wav" at={30} volume={0.4} />
      <Sfx src="boom.wav" at={30} volume={0.35} />
    </>
  );
};

const Final = () => <Portada />;

const ESCENAS: EscenaCorta[] = [
  { nombre: "26 negros 3D", voz: "r1", Comp: Gancho, aire: 5 },
  { nombre: "Montecarlo 1913 3D", voz: "r2", Comp: Racha, aire: 5 },
  { nombre: "Ya toca rojo 3D", voz: "r3", Comp: Apuestan, aire: 6 },
  { nombre: "Sin memoria", voz: "r4", Comp: Memoria, aire: 10 },
  { nombre: "48.6 %", voz: "r5", Comp: Igual, aire: 8 },
  { nombre: "1 en 137 millones", voz: "r6", Comp: Raro, aire: 8 },
  { nombre: "Final", voz: "r7", Comp: Final, aire: 6 },
];

export const TOTAL_RULETA = linea(S, ESCENAS).total;

export const Ruleta: React.FC = () => (
  <Corto short={S} escenas={ESCENAS} acento={ROJO} musica="music-tension.wav" />
);

/** Ruleta vista desde arriba con la bola en negro, para la miniatura. */
export const RuletaMini: React.FC = () => (
  <Casino
    cam={{ pos: [0, 4.4, 1.9], mira: [0, 0.95, -0.9], fov: 48 }}
    g={giro(5, 26, 2.2)}
    gente={false}
    apuesta={2.5}
  />
);
