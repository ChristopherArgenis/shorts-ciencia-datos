import React from "react";
import { useCurrentFrame } from "remotion";
import { Humanoide, poseEn } from "./Humanoide";
import { Lienzo } from "./Lienzo";
import { camaraEn, orbita, temblor } from "./Camara";
import { rebote, resorte } from "./Fisica";
import { Cabra, Multitud, Puerta, Reflector, Sala } from "./Escenario";
import {
  ASPECTO_CONCURSANTE,
  ASPECTO_PRESENTADOR,
  CELEBRA,
  DE_PIE,
  PREOCUPADO,
  SENALA_FRENTE,
  caminar,
} from "./poses";

/** Prueba del kit: 0–5 s concurso (caminata, puertas, cabra, rebote, zoom); 5–8 s multitud con órbita. */
export const PruebaKit: React.FC = () => {
  const f = useCurrentFrame();
  const s = f / 30;
  if (s >= 5) {
    const t = s - 5;
    return (
      <Lienzo
        cam={orbita([0, 0.6, 0], 14 - t * 1.2, 7, 0.4 + t * 0.35, 40)}
        fondo="#0b1020"
        ambiente={0.5}
      >
        <Sala ancho={40} />
        <Multitud
          filas={25}
          columnas={40}
          resaltar={(i) => (i === 517 ? "#ff6b6b" : null)}
        />
      </Lienzo>
    );
  }
  const camino = caminar(Math.min(s, 1.6), 1.1);
  const pose =
    s < 1.6
      ? camino
      : poseEn(
          [
            [1.6, { ...camino }],
            [2.2, SENALA_FRENTE],
            [3.6, PREOCUPADO],
            [4.4, CELEBRA],
          ],
          s,
        );
  const pos: [number, number, number] =
    s < 1.6 ? [camino.pos[0], camino.pos[1], camino.pos[2]] : [0, 0.925, 1.76];
  const abre = resorte(s - 2.4);
  const pelota = rebote(Math.max(0, s - 2.6), 1.8, 0.55);
  let cam = camaraEn(
    [
      [0, { pos: [0, 1.7, 9], mira: [0, 1.1, 0], fov: 45 }],
      [2.2, { pos: [1.8, 1.6, 6], mira: [0, 1.2, 0], fov: 40 }],
      [3.4, { pos: [0.8, 1.4, 4.2], mira: [1.4, 1.0, -1], fov: 28 }],
    ],
    s,
  );
  cam = temblor(cam, s, Math.max(0, 1 - Math.abs(s - 2.6) * 4));
  return (
    <Lienzo cam={cam} fondo="#0b1020" ambiente={0.35}>
      <Sala />
      <Reflector pos={[0, 6, 3]} objetivo={[0, 0, 0]} />
      {[-1.4, 0, 1.4].map((x, i) => (
        <group key={i} position={[x, 0, -1.2]}>
          <Puerta
            color={["#e03131", "#1971c2", "#2f9e44"][i]}
            abre={i === 2 ? abre : 0}
          />
        </group>
      ))}
      <group position={[1.4, 0, -1.9]}>
        <Cabra />
      </group>
      <mesh castShadow position={[2.6, 0.15 + pelota, 0.5]}>
        <sphereGeometry args={[0.15, 24, 16]} />
        <meshStandardMaterial color="#ffd43b" roughness={0.4} />
      </mesh>
      <Humanoide
        pose={{
          ...pose,
          pos: [pos[0] - 0.3, pos[1], 3.2 - pos[2]],
          rotY: Math.PI,
        }}
        aspecto={ASPECTO_CONCURSANTE}
      />
      <Humanoide
        pose={{ ...DE_PIE, pos: [2.4, 0.925, -0.6], rotY: -0.6 }}
        aspecto={ASPECTO_PRESENTADOR}
      />
    </Lienzo>
  );
};
