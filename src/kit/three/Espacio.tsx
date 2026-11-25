import React, { useMemo } from "react";
import * as THREE from "three";

// Piezas 3D de espacio para los Shorts (todo generado en código, sin texturas externas).

/** Generador pseudoaleatorio con semilla (mulberry32): mismo resultado en cada cuadro. */
export const azar = (semilla: number) => {
  let a = semilla >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const texturas = new Map<string, THREE.Texture>();
/** Textura de brillo radial (para estrellas y partículas), generada en un canvas. */
export const texBrillo = (color = "#ffffff") => {
  const t = texturas.get(color);
  if (t) return t;
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0, color);
  gr.addColorStop(0.25, color);
  gr.addColorStop(0.5, `${color}55`);
  gr.addColorStop(1, `${color}00`);
  g.fillStyle = gr;
  g.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  texturas.set(color, tex);
  return tex;
};

/** Halo plano que siempre mira a la cámara. */
export const Halo: React.FC<{
  color: string;
  tam: number;
  opacidad?: number;
}> = ({ color, tam, opacidad = 1 }) => (
  <sprite scale={[tam, tam, 1]}>
    <spriteMaterial
      map={texBrillo(color)}
      transparent
      opacity={opacidad}
      depthWrite={false}
      blending={THREE.AdditiveBlending}
    />
  </sprite>
);

/** Estrella: esfera emisiva con halo. */
export const Estrella3D: React.FC<{
  r: number;
  color?: string;
  halo?: string;
}> = ({ r, color = "#fff3bf", halo = "#ffa94d" }) => (
  <group>
    <mesh>
      <sphereGeometry args={[r, 40, 30]} />
      <meshBasicMaterial color={color} />
    </mesh>
    <Halo color={halo} tam={r * 6} opacidad={0.9} />
  </group>
);

/** Planeta con un poco de relieve de luz. */
export const Planeta: React.FC<{
  r: number;
  color: string;
  emisivo?: number;
}> = ({ r, color, emisivo = 0 }) => (
  <mesh castShadow>
    <sphereGeometry args={[r, 32, 24]} />
    <meshStandardMaterial
      color={color}
      roughness={0.7}
      emissive={color}
      emissiveIntensity={emisivo}
    />
  </mesh>
);

/** Órbita circular en el plano XZ. */
export const Orbita: React.FC<{
  r: number;
  color?: string;
  grosor?: number;
  opacidad?: number;
}> = ({ r, color = "#5c6393", grosor = 0.006, opacidad = 0.8 }) => (
  <mesh rotation={[Math.PI / 2, 0, 0]}>
    <torusGeometry args={[r, grosor, 6, 160]} />
    <meshBasicMaterial color={color} transparent opacity={opacidad} />
  </mesh>
);

/** Cielo: cientos de estrellas en una esfera grande alrededor de la cámara. */
export const Cielo: React.FC<{ n?: number; radio?: number }> = ({
  n = 900,
  radio = 40,
}) => {
  const geo = useMemo(() => {
    const pos = new Float32Array(n * 3);
    const rnd = azar(7);
    for (let i = 0; i < n; i++) {
      const u = rnd();
      const v = rnd();
      const th = 2 * Math.PI * u;
      const ph = Math.acos(2 * v - 1);
      pos[3 * i] = radio * Math.sin(ph) * Math.cos(th);
      pos[3 * i + 1] = radio * Math.cos(ph);
      pos[3 * i + 2] = radio * Math.sin(ph) * Math.sin(th);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [n, radio]);
  return (
    <points geometry={geo}>
      <pointsMaterial
        size={0.35}
        map={texBrillo("#e7f5ff")}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#c5cae9"
      />
    </points>
  );
};

/** Datos de una galaxia espiral: radio y ángulo inicial de cada estrella (determinista). */
export const datosGalaxia = (n: number, brazos = 2) => {
  const rnd = azar(11);
  return Array.from({ length: n }).map((_, i) => {
    const u = rnd();
    const v = rnd();
    const w = rnd();
    const r = 0.15 + Math.pow(u, 0.8) * 2.6;
    const brazo = i % brazos;
    const a0 =
      Math.log(r + 0.3) * 2.4 +
      (brazo * 2 * Math.PI) / brazos +
      (v - 0.5) * (0.5 + 1.2 * rnd());
    const y = (w - 0.5) * 0.25 * Math.exp(-r * 0.8);
    return { r, a0, y, bulbo: r < 0.5 };
  });
};

/**
 * Galaxia de partículas que gira. `t` en segundos. `plana`: todas las estrellas con la misma
 * velocidad lineal (curva medida); si es false, velocidad de Kepler v ∝ 1/√r (lo esperado).
 */
export const Galaxia3D: React.FC<{
  t: number;
  n?: number;
  plana?: boolean;
  v?: number;
  tam?: number;
}> = ({ t, n = 5000, plana = true, v = 0.35, tam = 0.09 }) => {
  const datos = useMemo(() => datosGalaxia(n), [n]);
  const colores = useMemo(() => {
    const c = new Float32Array(n * 3);
    const a = new THREE.Color("#fff3bf");
    const b = new THREE.Color("#a5c8ff");
    datos.forEach((d, i) => {
      const k = Math.min(1, d.r / 2.2);
      const col = a.clone().lerp(b, k);
      c[3 * i] = col.r;
      c[3 * i + 1] = col.g;
      c[3 * i + 2] = col.b;
    });
    return c;
  }, [datos, n]);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(n * 3), 3),
    );
    g.setAttribute("color", new THREE.BufferAttribute(colores, 3));
    return g;
  }, [colores, n]);
  const pos = geo.getAttribute("position") as THREE.BufferAttribute;
  datos.forEach((d, i) => {
    const vel = plana ? v : v * Math.sqrt(0.6 / d.r);
    const a = d.a0 - (vel / d.r) * t;
    pos.setXYZ(i, d.r * Math.cos(a), d.y, d.r * Math.sin(a));
  });
  pos.needsUpdate = true;
  return (
    <group>
      <points geometry={geo}>
        <pointsMaterial
          size={tam}
          map={texBrillo("#ffffff")}
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <Halo color="#ffe8cc" tam={1.6} opacidad={0.8} />
    </group>
  );
};

/** Flecha 3D (cilindro + cono) apuntando a +X desde el origen. */
export const Flecha: React.FC<{
  largo: number;
  color: string;
  grosor?: number;
}> = ({ largo, color, grosor = 0.03 }) => (
  <group>
    <mesh position={[largo / 2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
      <cylinderGeometry args={[grosor, grosor, largo, 10]} />
      <meshBasicMaterial color={color} />
    </mesh>
    <mesh position={[largo + grosor * 2, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
      <coneGeometry args={[grosor * 3, grosor * 6, 14]} />
      <meshBasicMaterial color={color} />
    </mesh>
  </group>
);

/** Observatorio: edificio, cúpula con rendija abierta y telescopio grande que apunta según `alt`/`az`. */
export const Observatorio: React.FC<{
  alt: number;
  az: number;
  destello?: number;
}> = ({ alt, az, destello = 0 }) => {
  const R = 1.2;
  return (
    <group>
      <mesh receiveShadow castShadow position={[0, 0.6, 0]}>
        <cylinderGeometry args={[R, R, 1.2, 48]} />
        <meshStandardMaterial color="#dee2e6" roughness={0.8} />
      </mesh>
      <group position={[0, 1.2, 0]} rotation={[0, az, 0]}>
        <mesh castShadow>
          <sphereGeometry
            args={[
              R,
              48,
              24,
              Math.PI / 2 + 0.55,
              Math.PI * 2 - 1.1,
              0,
              Math.PI / 2,
            ]}
          />
          <meshStandardMaterial
            color="#f1f3f5"
            roughness={0.35}
            metalness={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* telescopio: pilar, horquilla y tubo de armazón */}
        <mesh castShadow position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.16, 0.22, 0.24, 24]} />
          <meshStandardMaterial
            color="#495057"
            roughness={0.5}
            metalness={0.5}
          />
        </mesh>
        <group position={[0, 0.42, 0]} rotation={[0, 0, 0]}>
          {[-1, 1].map((s) => (
            <mesh key={s} castShadow position={[0, 0, s * 0.3]}>
              <boxGeometry args={[0.12, 0.42, 0.06]} />
              <meshStandardMaterial
                color="#343a40"
                roughness={0.4}
                metalness={0.6}
              />
            </mesh>
          ))}
          <group position={[0, 0.12, 0]} rotation={[0, 0, Math.PI / 2 - alt]}>
            {[0.42, -0.25].map((y, i) => (
              <mesh
                key={i}
                castShadow
                position={[0, y, 0]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <torusGeometry args={[0.24, 0.035, 10, 32]} />
                <meshStandardMaterial
                  color="#212529"
                  roughness={0.3}
                  metalness={0.7}
                />
              </mesh>
            ))}
            {[0, 1, 2, 3].map((i) => {
              const a = (i * Math.PI) / 2 + Math.PI / 4;
              return (
                <mesh
                  key={i}
                  castShadow
                  position={[0.24 * Math.cos(a), 0.085, 0.24 * Math.sin(a)]}
                  rotation={[0, 0, 0]}
                >
                  <cylinderGeometry args={[0.012, 0.012, 0.67, 8]} />
                  <meshStandardMaterial
                    color="#adb5bd"
                    metalness={0.8}
                    roughness={0.3}
                  />
                </mesh>
              );
            })}
            <mesh position={[0, -0.27, 0]}>
              <cylinderGeometry args={[0.22, 0.22, 0.03, 32]} />
              <meshStandardMaterial
                color="#4dabf7"
                metalness={0.95}
                roughness={0.05}
                emissive="#4dabf7"
                emissiveIntensity={0.3 + destello}
              />
            </mesh>
            {destello > 0 ? (
              <group position={[0, 0.5, 0]}>
                <Halo
                  color="#ffffff"
                  tam={1.2 * destello}
                  opacidad={destello}
                />
              </group>
            ) : null}
          </group>
        </group>
      </group>
    </group>
  );
};

/** Red neuronal 3D: capas de nodos unidas por líneas. */
export const RedNeuronal: React.FC<{ capas: number[]; activa?: number }> = ({
  capas,
  activa = -1,
}) => {
  const nodos = capas.map((n, c) =>
    Array.from({ length: n }).map(
      (_, i) =>
        new THREE.Vector3(
          (c - (capas.length - 1) / 2) * 0.9,
          (i - (n - 1) / 2) * 0.32,
          0,
        ),
    ),
  );
  const lineas = useMemo(() => {
    const pts: number[] = [];
    for (let c = 0; c < nodos.length - 1; c++)
      for (const a of nodos[c])
        for (const b of nodos[c + 1]) pts.push(a.x, a.y, a.z, b.x, b.y, b.z);
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(pts), 3),
    );
    return g;
  }, [capas.join(",")]);
  return (
    <group>
      <lineSegments geometry={lineas}>
        <lineBasicMaterial color="#5c6393" transparent opacity={0.45} />
      </lineSegments>
      {nodos.flatMap((capa, c) =>
        capa.map((p, i) => (
          <mesh key={`${c}-${i}`} position={p}>
            <sphereGeometry args={[0.07, 18, 14]} />
            <meshStandardMaterial
              color={c === activa ? "#ffd43b" : "#a5c8ff"}
              emissive={c === activa ? "#ffd43b" : "#4c6ef5"}
              emissiveIntensity={c === activa ? 0.9 : 0.3}
            />
          </mesh>
        )),
      )}
    </group>
  );
};
