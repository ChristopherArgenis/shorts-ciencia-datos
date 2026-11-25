import React from "react";

const Mat: React.FC<{
  color: string;
  rough?: number;
  metal?: number;
  ei?: number;
  emissive?: string;
}> = ({ color, rough = 0.6, metal = 0.2, ei = 0, emissive }) => (
  <meshStandardMaterial
    color={color}
    roughness={rough}
    metalness={metal}
    emissive={emissive ?? "#000"}
    emissiveIntensity={ei}
  />
);

/** Telescopio de aficionado sobre tripié; `inclina` en radianes (0 = horizontal). */
export const TelescopioAficionado: React.FC<{
  inclina?: number;
  escala?: number;
}> = ({ inclina = 0.7, escala = 1 }) => (
  <group scale={escala}>
    {[0, 1, 2].map((i) => {
      const a = (i * 2 * Math.PI) / 3;
      return (
        <mesh
          key={i}
          castShadow
          position={[0.18 * Math.cos(a), 0.55, 0.18 * Math.sin(a)]}
          rotation={[-Math.sin(a) * 0.32, 0, Math.cos(a) * 0.32]}
        >
          <cylinderGeometry args={[0.012, 0.016, 1.15, 10]} />
          <Mat color="#adb5bd" metal={0.7} rough={0.35} />
        </mesh>
      );
    })}
    <group position={[0, 1.12, 0]} rotation={[0, 0, inclina]}>
      <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.06, 0.9, 28]} />
        <Mat color="#f1f3f5" rough={0.35} metal={0.1} />
      </mesh>
      <mesh position={[0.46, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.075, 0.075, 0.04, 28]} />
        <Mat color="#212529" rough={0.3} metal={0.5} />
      </mesh>
      <mesh position={[0.48, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.062, 0.062, 0.005, 28]} />
        <Mat
          color="#4dabf7"
          rough={0.05}
          metal={0.9}
          ei={0.4}
          emissive="#4dabf7"
        />
      </mesh>
      <mesh position={[-0.47, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.025, 0.08, 16]} />
        <Mat color="#212529" />
      </mesh>
    </group>
  </group>
);
