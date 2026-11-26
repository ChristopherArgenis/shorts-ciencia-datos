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
import { Lienzo } from "../../kit/three/Lienzo";
import { Cielo, Halo } from "../../kit/three/Espacio";

// "La foto del agujero negro viajó en avión". Event Horizon Telescope: 8 radiotelescopios en 6 sitios,
// abril de 2017; ≈ 4 PB en discos de helio, enviados por avión/barco/tren/auto a MIT y Bonn; los del
// Polo Sur esperaron meses (llegaron al MIT el 13/12/2017). Imagen de M87* publicada el 10/04/2019.
// Cálculo: 4 PB a 100 Mb/s ≈ 10 años. Tierra, antenas y aviones en 3D (Three.js), ilustrativos.

const S = "agujero" as const;
const FONDO = "#070a18";
const NAR = "#ff922b";

/** Anillo del agujero negro (3D): disco brillante con centro oscuro. */
const Anillo: React.FC<{ giro: number }> = ({ giro }) => (
  <group rotation={[0.35, 0, giro]}>
    <Halo color="#ff922b" tam={4.2} opacidad={0.55} />
    <mesh>
      <torusGeometry args={[1, 0.28, 32, 96]} />
      <meshBasicMaterial color="#ffa94d" />
    </mesh>

    <mesh position={[0, 0, 0.1]}>
      <circleGeometry args={[0.72, 48]} />
      <meshBasicMaterial color="#000000" />
    </mesh>
  </group>
);

/** Avión sencillo (apunta a +X) con una caja de discos. */
const Avion: React.FC = () => (
  <group>
    <mesh rotation={[0, 0, Math.PI / 2]}>
      <capsuleGeometry args={[0.09, 0.6, 6, 16]} />
      <meshStandardMaterial color="#f1f3f5" roughness={0.4} />
    </mesh>
    <mesh position={[0.02, 0, 0]}>
      <boxGeometry args={[0.18, 0.02, 0.9]} />
      <meshStandardMaterial color="#dee2e6" />
    </mesh>
    <mesh position={[-0.33, 0.1, 0]}>
      <boxGeometry args={[0.1, 0.18, 0.02]} />
      <meshStandardMaterial color={C.blue} />
    </mesh>
    <mesh position={[-0.33, 0.02, 0]}>
      <boxGeometry args={[0.08, 0.02, 0.3]} />
      <meshStandardMaterial color="#dee2e6" />
    </mesh>
    <mesh position={[0.05, -0.16, 0]}>
      <boxGeometry args={[0.14, 0.1, 0.12]} />
      <meshStandardMaterial color="#8d6e4c" />
    </mesh>
  </group>
);

const Portada: React.FC = () => {
  const f = useCurrentFrame();
  const t = (f + 45) / 30;
  const x = ((t * 0.8) % 5) - 2.5;
  return (
    <>
      <Lienzo
        cam={{ pos: [0, 0, 10.5], mira: [0, 0, 0], fov: 45 }}
        fondo={FONDO}
        ambiente={0.6}
      >
        <Cielo />
        <Anillo giro={t * 0.05} />
        <group
          position={[x, -1.75, 1.2]}
          rotation={[0.2, -0.35, 0.05]}
          scale={1.3}
        >
          <Avion />
        </group>
      </Lienzo>
      <Centro top={290}>
        <Grande mono={false} size={84} color={C.ink}>
          viajó en <span style={{ color: NAR }}>avión</span>
        </Grande>
        <Sub size={46} color={C.dim}>
          no por internet
        </Sub>
      </Centro>
      <Pie top={1500}>M87* · Event Horizon Telescope · ilustración</Pie>
    </>
  );
};

const Gancho = () => <Portada />;

// Sitios del EHT en 2017 (lat, lon): 8 telescopios en 6 lugares.
const SITIOS: [number, number][] = [
  [19.8, -155.5],
  [19.8, -155.45],
  [32.7, -109.9],
  [19.0, -97.3],
  [-23.0, -67.8],
  [-23.0, -67.7],
  [37.1, -3.4],
  [-89.9, 0],
];
const R = 1.6;
const xyz = (lat: number, lon: number, r = R): [number, number, number] => {
  const la = (lat * Math.PI) / 180;
  const lo = (lon * Math.PI) / 180;
  return [
    r * Math.cos(la) * Math.sin(lo),
    r * Math.sin(la),
    r * Math.cos(la) * Math.cos(lo),
  ];
};

/** Tierra (océano y meridianos) que gira; `on` antenas encendidas; `unidas` líneas entre ellas. */
const Tierra: React.FC<{
  giro: number;
  on: number;
  unidas?: number;
  children?: React.ReactNode;
}> = ({ giro, on, unidas = 0, children }) => (
  <group rotation={[0.35, giro, 0]}>
    <mesh>
      <sphereGeometry args={[R, 64, 48]} />
      <meshStandardMaterial
        color="#1c4e80"
        roughness={0.6}
        emissive="#0b2545"
        emissiveIntensity={0.4}
      />
    </mesh>
    {Array.from({ length: 12 }).map((_, i) => (
      <mesh key={`m${i}`} rotation={[0, (i * Math.PI) / 12, 0]}>
        <torusGeometry args={[R + 0.002, 0.004, 6, 96]} />
        <meshBasicMaterial color="#3d6fa5" />
      </mesh>
    ))}
    {[-60, -30, 0, 30, 60].map((lat) => (
      <mesh
        key={`p${lat}`}
        position={[0, R * Math.sin((lat * Math.PI) / 180), 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <torusGeometry
          args={[R * Math.cos((lat * Math.PI) / 180) + 0.002, 0.004, 6, 96]}
        />
        <meshBasicMaterial color="#3d6fa5" />
      </mesh>
    ))}
    {SITIOS.map(([la, lo], i) => {
      const p = xyz(la, lo, R + 0.04);
      const vivo = i < on;
      return (
        <group key={i} position={p}>
          <mesh>
            <sphereGeometry args={[0.06, 16, 12]} />
            <meshBasicMaterial color={vivo ? C.yellow : "#495057"} />
          </mesh>
          {vivo ? <Halo color="#ffd43b" tam={0.45} opacidad={0.9} /> : null}
        </group>
      );
    })}
    {unidas > 0
      ? SITIOS.flatMap(([la, lo], i) =>
          SITIOS.slice(i + 1).map(([lb, lob], j) => {
            const a = xyz(la, lo, R + 0.05);
            const b = xyz(lb, lob, R + 0.05);
            const pts = new Float32Array([...a, ...b]);
            return (
              <line key={`${i}-${j}`}>
                <bufferGeometry>
                  <bufferAttribute
                    attach="attributes-position"
                    args={[pts, 3]}
                  />
                </bufferGeometry>
                <lineBasicMaterial
                  color={C.yellow}
                  transparent
                  opacity={0.6 * unidas}
                />
              </line>
            );
          }),
        )
      : null}
    {children}
  </group>
);

// 2 · Ocho radiotelescopios a la vez (2017).
const Ocho = () => {
  const f = useCurrentFrame();
  const on = Math.min(8, Math.floor(f / 12) + 1);
  return (
    <>
      <Lienzo
        cam={{ pos: [0, 0.4, 10.5], mira: [0, 0, 0], fov: 45 }}
        fondo={FONDO}
        ambiente={0.7}
      >
        <Cielo />
        <Tierra giro={2.1 + f / 140} on={on} />
      </Lienzo>
      <Centro top={290}>
        <Grande size={170} color={C.yellow}>
          {on}
        </Grande>
        <Sub size={48}>radiotelescopios a la vez · 2017</Sub>
      </Centro>
      {Array.from({ length: 8 }).map((_, i) => (
        <Sfx key={i} src="tick.wav" at={i * 12} volume={0.3} />
      ))}
    </>
  );
};

// 3 · Juntos: un telescopio del tamaño de la Tierra.
const Gigante = () => {
  const f = useCurrentFrame();
  const u = prog(f, 4, 40);
  return (
    <>
      <Lienzo
        cam={{ pos: [0, 0.4, 11], mira: [0, 0, 0], fov: 45 }}
        fondo={FONDO}
        ambiente={0.7}
      >
        <Cielo />
        <Tierra giro={2.6 + f / 140} on={8} unidas={u} />
        <mesh rotation={[0.35, 0, 0]} scale={u}>
          <torusGeometry args={[R + 0.35, 0.03, 8, 128]} />
          <meshBasicMaterial color={C.yellow} transparent opacity={0.8} />
        </mesh>
      </Lienzo>
      <Centro top={290}>
        <Grande mono={false} size={80} color={C.ink}>
          un telescopio del tamaño
        </Grande>
        <Grande mono={false} size={80} color={C.yellow}>
          de la Tierra
        </Grande>
      </Centro>
      <Sfx src="whoosh.wav" at={4} volume={0.3} />
    </>
  );
};

// 4 · 4 petabytes: demasiado para internet (≈ 10 años a 100 Mb/s).
const Petabytes = () => {
  const f = useCurrentFrame();
  const barra = interpolate(f, [10, 100], [0, 0.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <>
      <Centro top={300}>
        <Grande size={240} color={NAR}>
          4 PB
        </Grande>
        <Sub size={48}>= 4,000,000 GB grabados</Sub>
      </Centro>
      <Centro top={760}>
        <div style={{ position: "relative" }}>
          <svg width={300} height={240} viewBox="0 0 100 80">
            {[36, 24, 12].map((r, i) => (
              <path
                key={i}
                d={`M ${50 - r} ${66 - r * 0.2} A ${r} ${r} 0 0 1 ${50 + r} ${66 - r * 0.2}`}
                stroke="#a5c8ff"
                strokeWidth={7}
                fill="none"
                strokeLinecap="round"
              />
            ))}
            <circle cx={50} cy={68} r={6} fill="#a5c8ff" />
          </svg>
          <Tache delay={40} size={260} />
        </div>
      </Centro>
      <Centro top={1080}>
        <div style={{ width: 860 }}>
          <div
            style={{
              height: 40,
              borderRadius: 20,
              background: "#141a36",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${barra * 100}%`,
                height: "100%",
                background: C.blue,
              }}
            />
          </div>
          <div
            style={{
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 38,
              color: C.ink,
              marginTop: 14,
              textAlign: "center",
            }}
          >
            a 100 Mb/s: ≈ <span style={{ color: C.coral }}>10 años</span> de
            descarga
          </div>
        </div>
      </Centro>
      <Sfx src="boom.wav" at={40} volume={0.3} />
    </>
  );
};

// 5 · Los discos viajaron en avión; los del Polo Sur esperaron meses.
const MIT: [number, number] = [42.4, -71.1];
const BONN: [number, number] = [50.7, 7.1];
const Vuelos = () => {
  const f = useCurrentFrame();
  const p = prog(f, 4, 80);
  const rutas: [number, number, [number, number]][] = [
    [19.8, -155.5, MIT],
    [32.7, -109.9, MIT],
    [-23, -67.8, BONN],
    [37.1, -3.4, BONN],
  ];
  const mes = Math.floor(
    interpolate(f, [40, 120], [0, 8], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const MESES = ["abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return (
    <>
      <Lienzo
        cam={{ pos: [0, 1.6, 10.5], mira: [0, 0, 0], fov: 45 }}
        fondo={FONDO}
        ambiente={0.7}
      >
        <Cielo />
        <Tierra giro={1.6} on={8}>
          {rutas.map(([la, lo, d], i) => {
            const a = xyz(la, lo, R + 0.3);
            const b = xyz(d[0], d[1], R + 0.3);
            const q = Math.min(1, Math.max(0, p * 1.3 - i * 0.1));
            const m = [
              a[0] + (b[0] - a[0]) * q,
              a[1] + (b[1] - a[1]) * q,
              a[2] + (b[2] - a[2]) * q,
            ];
            const n = Math.hypot(m[0], m[1], m[2]);
            const k = (R + 0.3 + 0.4 * Math.sin(Math.PI * q)) / n;
            return (
              <group
                key={i}
                position={[m[0] * k, m[1] * k, m[2] * k]}
                scale={0.35}
              >
                <Avion />
              </group>
            );
          })}
        </Tierra>
      </Lienzo>
      <Centro top={290}>
        <Grande mono={false} size={84} color={C.ink}>
          discos en <span style={{ color: NAR }}>avión</span>
        </Grande>
        <Sub size={44} color={C.dim}>
          hacia el MIT (EE. UU.) y Bonn (Alemania)
        </Sub>
      </Centro>
      <Centro top={1350}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            opacity: prog(f, 36, 46),
          }}
        >
          <span
            style={{
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 40,
              color: C.ink,
            }}
          >
            Polo Sur:
          </span>
          {MESES.map((m, i) => (
            <span
              key={m}
              style={{
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: 30,
                color: i <= mes ? (i === 8 ? C.green : C.coral) : "#3b4170",
              }}
            >
              {m}
            </span>
          ))}
        </div>
      </Centro>
      <Pie top={1430}>
        sin vuelos de febrero a octubre · llegaron en diciembre
      </Pie>
      <Sfx src="whoosh.wav" at={4} volume={0.3} />
    </>
  );
};

// 6 · Algoritmos llenaron los huecos: una foto también son números.
const N = 16;
const brillo = (x: number, y: number) => {
  const r = Math.hypot(x - 7.5, y - 7.5) / 7.5;
  const anillo = Math.exp(-((r - 0.62) ** 2) / 0.02);
  const lado = 1 + 0.5 * Math.sin(Math.atan2(y - 7.5, x - 7.5) + 1.2);
  return Math.min(255, Math.round(255 * anillo * lado * 0.75));
};
const Numeros = () => {
  const f = useCurrentFrame();
  const k = prog(f, 30, 90);
  return (
    <>
      <Centro top={290}>
        <Sub size={58}>
          una foto también son <span style={{ color: NAR }}>números</span>
        </Sub>
      </Centro>
      <Centro top={470}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${N}, 54px)`,
            gap: 2,
          }}
        >
          {Array.from({ length: N * N }).map((_, i) => {
            const x = i % N;
            const y = Math.floor(i / N);
            const v = brillo(x, y);
            const hueco = (x * 7 + y * 13) % 5 === 0 && f < 60;
            const col = `rgb(${Math.round(v * k)},${Math.round(v * 0.55 * k)},${Math.round(v * 0.12 * k)})`;
            return (
              <div
                key={i}
                style={{
                  height: 54,
                  background: hueco ? "#0a0d1a" : col,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: MONO,
                  fontWeight: 700,
                  fontSize: 16,
                  color: v > 120 && k > 0.5 ? "#0b1020" : "#5c6393",
                  opacity: 1 - 0.6 * k * (hueco ? 1 : 0),
                }}
              >
                {hueco ? "?" : k < 0.9 ? v : ""}
              </div>
            );
          })}
        </div>
      </Centro>
      <Pie top={1400}>ilustración de la reconstrucción de la imagen</Pie>
      <Sfx src="ding.wav" at={90} volume={0.4} />
    </>
  );
};

const Final = () => <Portada />;

const ESCENAS: EscenaCorta[] = [
  { nombre: "Gancho 3D", voz: "a1", Comp: Gancho, aire: 6 },
  { nombre: "8 telescopios 3D", voz: "a2", Comp: Ocho, aire: 8 },
  { nombre: "Tamaño Tierra 3D", voz: "a3", Comp: Gigante, aire: 8 },
  { nombre: "4 PB", voz: "a4", Comp: Petabytes, aire: 10 },
  { nombre: "Vuelos 3D", voz: "a5", Comp: Vuelos, aire: 12 },
  { nombre: "Números", voz: "a6", Comp: Numeros, aire: 12 },
  { nombre: "Final", voz: "a7", Comp: Final, aire: 6 },
];

export const TOTAL_AGUJERO = linea(S, ESCENAS).total;

export const AgujeroNegro: React.FC = () => (
  <Corto short={S} escenas={ESCENAS} acento={NAR} />
);

/** Anillo con avión (fijo), para la miniatura. */
export const AnilloMini: React.FC = () => (
  <Lienzo
    cam={{ pos: [0, 0, 10.5], mira: [0, 0, 0], fov: 45 }}
    fondo={FONDO}
    ambiente={0.6}
  >
    <Cielo />
    <Anillo giro={0.1} />
    <group
      position={[0.6, -1.75, 1.2]}
      rotation={[0.2, -0.35, 0.05]}
      scale={1.3}
    >
      <Avion />
    </group>
  </Lienzo>
);
