import React, { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { azar } from "./Espacio";

// Escenarios y utilería 3D: multitudes, sala, puertas, cabra y reflectores.

const ROPA = [
  "#e07a5f",
  "#3d5a80",
  "#81b29a",
  "#f2cc8f",
  "#9c6644",
  "#6d597a",
  "#457b9d",
  "#e5989b",
];
const PIEL = ["#e0ac8a", "#c8957a", "#a8785a", "#8d5a3b", "#f1c7a5"];

/**
 * Multitud de personas sencillas (cuerpo + cabeza) con InstancedMesh: miles sin perder velocidad.
 * `resaltar(i)` devuelve un color para destacar a alguien (o null).
 */
export const Multitud: React.FC<{
  filas: number;
  columnas: number;
  sep?: number;
  resaltar?: (i: number) => string | null;
  apagar?: (i: number) => boolean;
  semilla?: number;
}> = ({ filas, columnas, sep = 0.55, resaltar, apagar, semilla = 1 }) => {
  const n = filas * columnas;
  const cuerpos = useRef<THREE.InstancedMesh>(null);
  const cabezas = useRef<THREE.InstancedMesh>(null);
  const datos = useMemo(() => {
    const r = azar(semilla);
    return Array.from({ length: n }).map((_, i) => ({
      x: ((i % columnas) - (columnas - 1) / 2) * sep + (r() - 0.5) * sep * 0.3,
      z:
        (Math.floor(i / columnas) - (filas - 1) / 2) * sep +
        (r() - 0.5) * sep * 0.3,
      alto: 0.9 + r() * 0.2,
      ropa: ROPA[Math.floor(r() * ROPA.length)],
      piel: PIEL[Math.floor(r() * PIEL.length)],
    }));
  }, [n, columnas, filas, sep, semilla]);
  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    const c = new THREE.Color();
    datos.forEach((d, i) => {
      const h = 1.7 * d.alto;
      const destaca = resaltar?.(i) ?? null;
      const off = apagar?.(i) ?? false;
      m.compose(
        new THREE.Vector3(d.x, h * 0.36, d.z),
        new THREE.Quaternion(),
        new THREE.Vector3(1, d.alto, 1),
      );
      cuerpos.current!.setMatrixAt(i, m);
      cuerpos.current!.setColorAt(
        i,
        c.set(off ? "#2b2f45" : (destaca ?? d.ropa)),
      );
      m.compose(
        new THREE.Vector3(d.x, h * 0.83, d.z),
        new THREE.Quaternion(),
        new THREE.Vector3(1, 1, 1),
      );
      cabezas.current!.setMatrixAt(i, m);
      cabezas.current!.setColorAt(
        i,
        c.set(off ? "#2b2f45" : (destaca ?? d.piel)),
      );
    });
    for (const im of [cuerpos.current!, cabezas.current!]) {
      im.instanceMatrix.needsUpdate = true;
      if (im.instanceColor) im.instanceColor.needsUpdate = true;
    }
  });
  return (
    <group>
      <instancedMesh
        ref={cuerpos}
        args={[undefined, undefined, n]}
        castShadow
        receiveShadow
      >
        <capsuleGeometry args={[0.17, 0.85, 4, 10]} />
        <meshStandardMaterial roughness={0.8} />
      </instancedMesh>
      <instancedMesh ref={cabezas} args={[undefined, undefined, n]} castShadow>
        <sphereGeometry args={[0.12, 14, 10]} />
        <meshStandardMaterial roughness={0.6} />
      </instancedMesh>
    </group>
  );
};

/** Sala: piso con reflejo suave y pared de fondo. */
export const Sala: React.FC<{
  piso?: string;
  pared?: string;
  ancho?: number;
  fondo?: number;
}> = ({ piso = "#2b2d42", pared = "#1d1f33", ancho = 14, fondo = 6 }) => (
  <group>
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[ancho, ancho]} />
      <meshStandardMaterial color={piso} roughness={0.35} metalness={0.15} />
    </mesh>
    <mesh receiveShadow position={[0, 3, -fondo]}>
      <planeGeometry args={[ancho, 6]} />
      <meshStandardMaterial color={pared} roughness={0.9} />
    </mesh>
  </group>
);

/** Puerta con marco y bisagra a la izquierda; `abre` 0..1 (gira hasta 100°). */
export const Puerta: React.FC<{
  color: string;
  numero?: number;
  abre?: number;
}> = ({ color, abre = 0 }) => (
  <group>
    {/* marco */}
    {[-0.52, 0.52].map((x) => (
      <mesh key={x} castShadow position={[x, 1.05, 0]}>
        <boxGeometry args={[0.08, 2.1, 0.14]} />
        <meshStandardMaterial color="#e9ecef" roughness={0.5} />
      </mesh>
    ))}
    <mesh castShadow position={[0, 2.14, 0]}>
      <boxGeometry args={[1.12, 0.08, 0.14]} />
      <meshStandardMaterial color="#e9ecef" roughness={0.5} />
    </mesh>
    {/* hoja que gira desde la bisagra */}
    <group position={[-0.48, 0, 0]} rotation={[0, -abre * 1.75, 0]}>
      <mesh castShadow receiveShadow position={[0.48, 1.03, 0]}>
        <boxGeometry args={[0.94, 2.04, 0.06]} />
        <meshStandardMaterial color={color} roughness={0.45} metalness={0.1} />
      </mesh>
      <mesh position={[0.86, 1.0, 0.05]}>
        <sphereGeometry args={[0.035, 12, 10]} />
        <meshStandardMaterial color="#ffd43b" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  </group>
);

/** Cabra sencilla de piezas (mira a +X). */
export const Cabra: React.FC = () => (
  <group scale={0.9}>
    <mesh castShadow position={[0, 0.55, 0]} scale={[0.42, 0.22, 0.2]}>
      <sphereGeometry args={[1, 20, 14]} />
      <meshStandardMaterial color="#e9ecef" roughness={0.9} />
    </mesh>
    <mesh castShadow position={[0.42, 0.78, 0]} scale={[0.16, 0.13, 0.11]}>
      <sphereGeometry args={[1, 16, 12]} />
      <meshStandardMaterial color="#dee2e6" roughness={0.9} />
    </mesh>
    {[-1, 1].map((s) => (
      <mesh
        key={s}
        castShadow
        position={[0.38, 0.93, 0.05 * s]}
        rotation={[0, 0, -0.6]}
      >
        <coneGeometry args={[0.025, 0.16, 8]} />
        <meshStandardMaterial color="#868e96" />
      </mesh>
    ))}
    {[
      [0.28, 0.12],
      [0.28, -0.12],
      [-0.28, 0.12],
      [-0.28, -0.12],
    ].map(([x, z], i) => (
      <mesh key={i} castShadow position={[x, 0.22, z]}>
        <cylinderGeometry args={[0.035, 0.03, 0.45, 8]} />
        <meshStandardMaterial color="#ced4da" />
      </mesh>
    ))}
  </group>
);

/** Reflector de escenario: cono de luz visible + luz real que proyecta sombra. */
export const Reflector: React.FC<{
  pos: [number, number, number];
  objetivo: [number, number, number];
  color?: string;
  intensidad?: number;
}> = ({ pos, objetivo, color = "#fff3bf", intensidad = 30 }) => {
  const target = useMemo(() => new THREE.Object3D(), []);
  target.position.set(...objetivo);
  return (
    <group>
      <primitive object={target} />
      <spotLight
        position={pos}
        target={target}
        angle={0.35}
        penumbra={0.6}
        intensity={intensidad}
        color={color}
        castShadow
        distance={20}
        decay={1.5}
      />
    </group>
  );
};
