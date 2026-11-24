import React, { useMemo } from "react";
import * as THREE from "three";

/**
 * Figura humanoide articulada, sin rasgos faciales (tipo maniquí), para las escenas 3D.
 * Todas las medidas en metros. La figura mira hacia +Z; su lado izquierdo es +X.
 * Cada articulación es un <group> que gira; las extremidades cuelgan hacia -Y desde la articulación.
 * La pose es un dato puro (sale del fotograma), como pide la skill threejs-remotion.
 */
export type V3 = [number, number, number];
export type Pose = {
  pos: V3; // posición de la pelvis
  rotY: number; // giro de todo el cuerpo
  columna: V3;
  cabeza: V3;
  hombroI: V3;
  codoI: number;
  munecaI: V3;
  hombroD: V3;
  codoD: number;
  munecaD: V3;
  caderaI: V3;
  rodillaI: number;
  tobilloI: number;
  caderaD: V3;
  rodillaD: number;
  tobilloD: number;
  agarreI: number;
  agarreD: number; // 0 mano abierta → 1 cerrada
};

export type Aspecto = {
  piel: string;
  torso: string; // suéter / blusa
  brazos?: string;
  pantalon: string;
  zapatos: string;
  cabello: string;
  peinado: "canas" | "chongo";
  lentes?: boolean;
  escala?: number;
  cuello?: string; // cuello de la camisa
};

const smooth = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerp3 = (a: V3, b: V3, t: number): V3 => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
  lerp(a[2], b[2], t),
];

export const mezclaPose = (a: Pose, b: Pose, t: number): Pose => {
  const out = {} as Record<string, unknown>;
  for (const k of Object.keys(a) as (keyof Pose)[]) {
    const va = a[k],
      vb = b[k];
    out[k] = Array.isArray(va)
      ? lerp3(va as V3, vb as V3, t)
      : lerp(va as number, vb as number, t);
  }
  return out as Pose;
};

/** Pose en el segundo `s` a partir de fotogramas clave [segundo, pose] ordenados (transición suave). */
export const poseEn = (claves: [number, Pose][], s: number): Pose => {
  if (s <= claves[0][0]) return claves[0][1];
  for (let i = 0; i < claves.length - 1; i++) {
    const [t0, p0] = claves[i],
      [t1, p1] = claves[i + 1];
    if (s <= t1)
      return mezclaPose(p0, p1, smooth((s - t0) / Math.max(1e-6, t1 - t0)));
  }
  return claves[claves.length - 1][1];
};

const deg = (d: number) => (d * Math.PI) / 180;
export const D = (x: number, y = 0, z = 0): V3 => [deg(x), deg(y), deg(z)];

/** Extremidad que se adelgaza: cápsula torneada de radio r1 (arriba) a r2 (abajo), largo `largo`, colgando hacia -Y. */
const geoExtremidad = (largo: number, r1: number, r2: number) => {
  const pts: THREE.Vector2[] = [];
  const n = 10;
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * (Math.PI / 2);
    pts.push(
      new THREE.Vector2(
        Math.max(0.0001, r2 * Math.sin(a)),
        -largo - r2 * Math.cos(a),
      ),
    );
  }
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * (Math.PI / 2);
    pts.push(
      new THREE.Vector2(
        Math.max(0.0001, r1 * Math.cos(a)),
        r1 * Math.sin(a) * 0.9,
      ),
    );
  }
  const g = new THREE.LatheGeometry(pts, 28);
  g.computeVertexNormals();
  return g;
};

/** Torso torneado (cintura → pecho → hombros), aplanado en profundidad. */
const geoTorso = (mujer: boolean) => {
  const perfil: [number, number][] = mujer
    ? [
        [0.001, -0.02],
        [0.13, 0.0],
        [0.125, 0.1],
        [0.115, 0.2],
        [0.135, 0.3],
        [0.15, 0.38],
        [0.155, 0.44],
        [0.13, 0.49],
        [0.07, 0.52],
        [0.001, 0.525],
      ]
    : [
        [0.001, -0.02],
        [0.15, 0.0],
        [0.15, 0.1],
        [0.148, 0.2],
        [0.158, 0.3],
        [0.17, 0.38],
        [0.175, 0.44],
        [0.15, 0.5],
        [0.075, 0.53],
        [0.001, 0.535],
      ];
  const g = new THREE.LatheGeometry(
    perfil.map(([r, y]) => new THREE.Vector2(r, y)),
    36,
  );
  g.scale(1, 1, 0.62);
  g.computeVertexNormals();
  return g;
};

const Mat: React.FC<{
  color: string;
  rough?: number;
  metal?: number;
  emissive?: string;
  ei?: number;
}> = ({ color, rough = 0.85, metal = 0, emissive, ei = 0 }) => (
  <meshStandardMaterial
    color={color}
    roughness={rough}
    metalness={metal}
    emissive={emissive ?? "#000"}
    emissiveIntensity={ei}
  />
);

/** Mano simple: palma, bloque de dedos que se cierra con `agarre` y pulgar. `lado` = 1 izquierda, -1 derecha. */
const Mano: React.FC<{
  piel: string;
  agarre: number;
  lado: 1 | -1;
  children?: React.ReactNode;
}> = ({ piel, agarre, lado, children }) => (
  <group>
    <mesh castShadow position={[0, -0.045, 0]} scale={[0.042, 0.05, 0.018]}>
      <sphereGeometry args={[1, 20, 14]} />
      <Mat color={piel} rough={0.5} />
    </mesh>
    {/* dedos */}
    <group position={[0, -0.085, 0.004]} rotation={[deg(-75 * agarre), 0, 0]}>
      {[-0.024, -0.008, 0.008, 0.024].map((x, i) => (
        <mesh
          key={i}
          castShadow
          position={[x, -0.032 + (i === 0 || i === 3 ? 0.006 : 0), 0]}
          rotation={[0, 0, 0]}
        >
          <capsuleGeometry
            args={[0.0085, i === 0 || i === 3 ? 0.036 : 0.046, 4, 10]}
          />
          <Mat color={piel} rough={0.5} />
        </mesh>
      ))}
    </group>
    {/* pulgar */}
    <group
      position={[0.036 * lado, -0.03, 0.012]}
      rotation={[deg(-30 - 30 * agarre), 0, deg(28 * lado)]}
    >
      <mesh castShadow position={[0, -0.025, 0]}>
        <capsuleGeometry args={[0.01, 0.034, 4, 10]} />
        <Mat color={piel} rough={0.5} />
      </mesh>
    </group>
    {/* punto donde se sostienen objetos (centro del puño) */}
    <group position={[0, -0.075, 0.035]}>{children}</group>
  </group>
);

export const Humanoide: React.FC<{
  pose: Pose;
  aspecto: Aspecto;
  /** Objeto en la mano izquierda / derecha (se dibuja en el centro del puño). */
  enManoI?: React.ReactNode;
  enManoD?: React.ReactNode;
  /** Algo en la muñeca izquierda (el reloj). */
  enMunecaI?: React.ReactNode;
}> = ({ pose: p, aspecto: a, enManoI, enManoD, enMunecaI }) => {
  const mujer = a.peinado === "chongo";
  const geo = useMemo(
    () => ({
      torso: geoTorso(mujer),
      brazo: geoExtremidad(0.27, mujer ? 0.046 : 0.052, mujer ? 0.038 : 0.043),
      ante: geoExtremidad(0.24, mujer ? 0.037 : 0.042, mujer ? 0.028 : 0.032),
      muslo: geoExtremidad(0.41, mujer ? 0.07 : 0.076, mujer ? 0.052 : 0.056),
      pierna: geoExtremidad(0.4, mujer ? 0.05 : 0.054, mujer ? 0.034 : 0.038),
    }),
    [mujer],
  );
  const brazos = a.brazos ?? a.torso;
  const hx = mujer ? 0.165 : 0.185; // ancho de hombros
  const pierna = (
    lado: 1 | -1,
    cadera: V3,
    rodilla: number,
    tobillo: number,
  ) => (
    <group position={[0.09 * lado, -0.02, 0]} rotation={cadera}>
      <mesh castShadow geometry={geo.muslo}>
        <Mat color={a.pantalon} />
      </mesh>
      <group position={[0, -0.41, 0]} rotation={[rodilla, 0, 0]}>
        <mesh castShadow geometry={geo.pierna}>
          <Mat color={a.pantalon} />
        </mesh>
        <group position={[0, -0.42, 0]} rotation={[tobillo, 0, 0]}>
          <mesh
            castShadow
            position={[0, -0.035, 0.06]}
            scale={[0.048, 0.04, 0.125]}
          >
            <sphereGeometry args={[1, 20, 14]} />
            <Mat color={a.zapatos} rough={0.5} />
          </mesh>
        </group>
      </group>
    </group>
  );
  const brazo = (
    lado: 1 | -1,
    hombro: V3,
    codo: number,
    muneca: V3,
    agarre: number,
    enMano?: React.ReactNode,
    enMuneca?: React.ReactNode,
  ) => (
    <group position={[hx * lado, 0.445, 0]} rotation={hombro}>
      <mesh castShadow position={[0, 0.01, 0]} scale={[0.06, 0.055, 0.06]}>
        <sphereGeometry args={[1, 18, 12]} />
        <Mat color={brazos} />
      </mesh>
      <mesh castShadow geometry={geo.brazo}>
        <Mat color={brazos} />
      </mesh>
      <group position={[0, -0.27, 0]} rotation={[codo, 0, 0]}>
        <mesh castShadow geometry={geo.ante}>
          <Mat color={brazos} />
        </mesh>
        {/* puño de la manga */}
        <mesh castShadow position={[0, -0.225, 0]}>
          <cylinderGeometry args={[0.036, 0.034, 0.03, 20]} />
          <Mat color={brazos} />
        </mesh>
        <group position={[0, -0.255, 0]} rotation={muneca}>
          <mesh castShadow position={[0, 0.0, 0]}>
            <cylinderGeometry args={[0.025, 0.026, 0.03, 16]} />
            <Mat color={a.piel} rough={0.5} />
          </mesh>
          {enMuneca}
          <group position={[0, -0.01, 0]}>
            <Mano piel={a.piel} agarre={agarre} lado={lado}>
              {enMano}
            </Mano>
          </group>
        </group>
      </group>
    </group>
  );
  return (
    <group position={p.pos} rotation={[0, p.rotY, 0]} scale={a.escala ?? 1}>
      {/* pelvis */}
      <mesh
        castShadow
        position={[0, 0.02, 0]}
        scale={[mujer ? 0.165 : 0.17, 0.11, 0.115]}
      >
        <sphereGeometry args={[1, 28, 18]} />
        <Mat color={a.pantalon} />
      </mesh>
      {pierna(1, p.caderaI, p.rodillaI, p.tobilloI)}
      {pierna(-1, p.caderaD, p.rodillaD, p.tobilloD)}
      {/* columna: torso, brazos, cuello y cabeza */}
      <group position={[0, 0.06, 0]} rotation={p.columna}>
        <mesh castShadow geometry={geo.torso}>
          <Mat color={a.torso} />
        </mesh>
        {/* cuello de la camisa */}
        <mesh
          castShadow
          position={[0, 0.5, 0]}
          rotation={[deg(90), 0, 0]}
          scale={[1, 0.8, 1]}
        >
          <torusGeometry args={[0.058, 0.018, 10, 24]} />
          <Mat color={a.cuello ?? a.torso} />
        </mesh>
        {brazo(1, p.hombroI, p.codoI, p.munecaI, p.agarreI, enManoI, enMunecaI)}
        {brazo(-1, p.hombroD, p.codoD, p.munecaD, p.agarreD, enManoD)}
        <group position={[0, 0.52, 0]} rotation={p.cabeza}>
          <mesh castShadow position={[0, 0.03, 0]}>
            <cylinderGeometry args={[0.046, 0.052, 0.08, 18]} />
            <Mat color={a.piel} rough={0.5} />
          </mesh>
          {/* cabeza lisa, sin rostro */}
          <group position={[0, 0.15, 0.012]}>
            <mesh castShadow scale={[0.084, 0.108, 0.098]}>
              <sphereGeometry args={[1, 32, 24]} />
              <Mat color={a.piel} rough={0.45} />
            </mesh>
            {/* orejas */}
            {[1, -1].map((s) => (
              <mesh
                key={s}
                castShadow
                position={[0.083 * s, -0.005, -0.004]}
                scale={[0.012, 0.026, 0.017]}
              >
                <sphereGeometry args={[1, 12, 10]} />
                <Mat color={a.piel} rough={0.5} />
              </mesh>
            ))}
            {/* cabello */}
            {a.peinado === "canas" ? (
              <>
                <mesh
                  castShadow
                  position={[0, 0.012, -0.012]}
                  scale={[0.09, 0.104, 0.1]}
                  rotation={[deg(-18), 0, 0]}
                >
                  <sphereGeometry
                    args={[1, 28, 18, 0, Math.PI * 2, 0, Math.PI * 0.5]}
                  />
                  <Mat color={a.cabello} rough={0.95} />
                </mesh>
                {[1, -1].map((s) => (
                  <mesh
                    key={s}
                    castShadow
                    position={[0.07 * s, -0.01, -0.03]}
                    scale={[0.03, 0.05, 0.06]}
                  >
                    <sphereGeometry args={[1, 14, 10]} />
                    <Mat color={a.cabello} rough={0.95} />
                  </mesh>
                ))}
              </>
            ) : (
              <>
                <mesh
                  castShadow
                  position={[0, 0.006, -0.008]}
                  scale={[0.092, 0.115, 0.104]}
                  rotation={[deg(-12), 0, 0]}
                >
                  <sphereGeometry
                    args={[1, 28, 18, 0, Math.PI * 2, 0, Math.PI * 0.56]}
                  />
                  <Mat color={a.cabello} rough={0.8} />
                </mesh>
                <mesh
                  castShadow
                  position={[0, 0.05, -0.105]}
                  scale={[0.05, 0.048, 0.045]}
                >
                  <sphereGeometry args={[1, 20, 14]} />
                  <Mat color={a.cabello} rough={0.8} />
                </mesh>
              </>
            )}
            {/* lentes */}
            {a.lentes && (
              <group position={[0, 0.012, 0.094]}>
                {[1, -1].map((s) => (
                  <mesh key={s} position={[0.033 * s, 0, 0]}>
                    <torusGeometry args={[0.022, 0.0035, 8, 28]} />
                    <Mat color="#2b2f33" rough={0.3} metal={0.6} />
                  </mesh>
                ))}
                <mesh position={[0, 0.004, 0]} rotation={[0, 0, deg(90)]}>
                  <cylinderGeometry args={[0.0025, 0.0025, 0.022, 8]} />
                  <Mat color="#2b2f33" rough={0.3} metal={0.6} />
                </mesh>
                {[1, -1].map((s) => (
                  <mesh
                    key={s}
                    position={[0.08 * s, 0.004, -0.05]}
                    rotation={[deg(90), 0, 0]}
                  >
                    <cylinderGeometry args={[0.0025, 0.0025, 0.1, 8]} />
                    <Mat color="#2b2f33" rough={0.3} metal={0.6} />
                  </mesh>
                ))}
              </group>
            )}
          </group>
        </group>
      </group>
    </group>
  );
};

/** Pose sentada neutra (manos sobre los muslos). */
export const SENTADO: Pose = {
  pos: [0, 0.5, 0],
  rotY: 0,
  columna: D(-4),
  cabeza: D(4),
  hombroI: D(-28, 0, 6),
  codoI: deg(-48),
  munecaI: D(0, 0, 0),
  hombroD: D(-28, 0, -6),
  codoD: deg(-48),
  munecaD: D(0, 0, 0),
  caderaI: D(-88, 0, 4),
  rodillaI: deg(86),
  tobilloI: deg(-2),
  caderaD: D(-88, 0, -4),
  rodillaD: deg(86),
  tobilloD: deg(-2),
  agarreI: 0.25,
  agarreD: 0.25,
};

export const conPose = (base: Pose, cambios: Partial<Pose>): Pose => ({
  ...base,
  ...cambios,
});
