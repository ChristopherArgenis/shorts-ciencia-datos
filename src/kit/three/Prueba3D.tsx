import React from "react";
import { useCurrentFrame } from "remotion";
import { Humanoide, poseEn } from "./Humanoide";
import { Lienzo } from "./Lienzo";
import {
  ASPECTO_ASTRONOMA,
  ASPECTO_OBSERVADOR,
  DE_PIE,
  MIRA_CIELO,
  PIENSA,
  SENALA,
} from "./poses";
import { TelescopioAficionado } from "./Telescopio";

/** Prueba del kit 3D en vertical: dos figuras, telescopio, piso y cielo nocturno. */
export const Prueba3D: React.FC = () => {
  const f = useCurrentFrame();
  const s = f / 30;
  const a = poseEn(
    [
      [0, DE_PIE],
      [1, MIRA_CIELO],
      [2.5, MIRA_CIELO],
      [3.5, PIENSA],
    ],
    s,
  );
  const b = poseEn(
    [
      [0, DE_PIE],
      [1.2, SENALA],
      [3, SENALA],
      [4, DE_PIE],
    ],
    s,
  );
  return (
    <Lienzo
      cam={{
        pos: [0.4 + Math.sin(s / 3) * 0.6, 1.4, 4.2],
        mira: [0, 1.05, 0],
        fov: 40,
      }}
      fondo="#0b1020"
      ambiente={0.35}
      luz={{ pos: [2, 5, 3], color: "#dbe4ff", intensidad: 2 }}
    >
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4, 48]} />
        <meshStandardMaterial color="#1b2a1f" roughness={1} />
      </mesh>
      <group position={[-0.55, 0, 0]}>
        <Humanoide pose={{ ...a, rotY: 0.5 }} aspecto={ASPECTO_ASTRONOMA} />
      </group>
      <group position={[0.65, 0, -0.2]}>
        <Humanoide pose={{ ...b, rotY: -0.4 }} aspecto={ASPECTO_OBSERVADOR} />
      </group>
      <group position={[0.05, 0, -0.6]} rotation={[0, -0.6, 0]}>
        <TelescopioAficionado inclina={0.8} />
      </group>
      {Array.from({ length: 160 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            ((i * 37) % 40) / 4 - 5,
            2 + ((i * 53) % 30) / 6,
            -6 - ((i * 13) % 10) / 3,
          ]}
        >
          <sphereGeometry args={[0.015 + (i % 4) * 0.006, 6, 6]} />
          <meshBasicMaterial color={i % 9 ? "#e7f5ff" : "#ffd43b"} />
        </mesh>
      ))}
    </Lienzo>
  );
};
