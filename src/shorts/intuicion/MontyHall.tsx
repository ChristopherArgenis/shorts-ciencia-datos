import React, { useMemo } from "react";
import * as THREE from "three";
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
import { Humanoide, poseEn, type Pose } from "../../kit/three/Humanoide";
import { Cabra, Puerta, Reflector, Sala } from "../../kit/three/Escenario";
import { camaraEn, temblor } from "../../kit/three/Camara";
import { resorte } from "../../kit/three/Fisica";
import type { Camara } from "../../kit/three/Lienzo";
import {
  ASPECTO_CONCURSANTE,
  ASPECTO_PRESENTADOR,
  CRUZADO,
  DE_PIE,
  SENALA_FRENTE,
  caminar,
} from "../../kit/three/poses";

// "¿Cambias de puerta? La mayoría elige mal" (problema de Monty Hall). Simulación propia de 10,000 juegos:
// quedarse 3,336 (33.4 %), cambiar 6,664 (66.6 %). La mayoría no cambia (Granberg y Brown, 1995).
// Escenario, puertas, auto, cabras y personas en 3D (Three.js).

const S = "montyhall" as const;
const FONDO = "#0b1020";
const COLORES = ["#e03131", "#1971c2", "#2f9e44"];
const XS = [-1.4, 0, 1.4];

/** Letrero con el número de la puerta (textura de canvas). */
const Letrero: React.FC<{ n: number; color: string }> = ({ n, color }) => {
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const g = c.getContext("2d")!;
    g.fillStyle = color;
    g.fillRect(0, 0, 128, 128);
    g.fillStyle = "#ffffff";
    g.font = "bold 96px sans-serif";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText(String(n), 64, 70);
    return new THREE.CanvasTexture(c);
  }, [n, color]);
  return (
    <mesh position={[0, 2.5, 0.05]}>
      <planeGeometry args={[0.45, 0.45]} />
      <meshBasicMaterial map={tex} />
    </mesh>
  );
};

/** Auto sencillo de piezas. */
const Auto: React.FC = () => (
  <group scale={0.95}>
    <mesh castShadow position={[0, 0.35, 0]}>
      <boxGeometry args={[1.3, 0.35, 0.6]} />
      <meshStandardMaterial color="#ffd43b" metalness={0.4} roughness={0.3} />
    </mesh>
    <mesh castShadow position={[-0.1, 0.65, 0]}>
      <boxGeometry args={[0.7, 0.3, 0.55]} />
      <meshStandardMaterial color="#ffe066" metalness={0.4} roughness={0.25} />
    </mesh>
    {[
      [0.42, 0.3],
      [0.42, -0.3],
      [-0.42, 0.3],
      [-0.42, -0.3],
    ].map(([x, z], i) => (
      <mesh
        key={i}
        castShadow
        position={[x, 0.16, z]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.16, 0.16, 0.1, 20]} />
        <meshStandardMaterial color="#212529" roughness={0.8} />
      </mesh>
    ))}
  </group>
);

/** Escenario: 3 puertas (con lo que hay detrás), letreros, reflector y personas. */
const Show: React.FC<{
  cam: Camara;
  abre?: number[];
  auto?: number;
  concursante?: Pose & { x?: number; z?: number };
  presentador?: Pose;
  conGente?: boolean;
}> = ({
  cam,
  abre = [0, 0, 0],
  auto = 1,
  concursante,
  presentador,
  conGente = true,
}) => (
  <Lienzo cam={cam} fondo={FONDO} ambiente={0.4}>
    <Sala piso="#2b2d42" pared="#1d1f33" />
    <Reflector pos={[0, 6, 3]} objetivo={[0, 0, -0.5]} intensidad={35} />
    {XS.map((x, i) => (
      <group key={i} position={[x, 0, -1.2]}>
        <Puerta color={COLORES[i]} abre={abre[i]} />
        <Letrero n={i + 1} color={COLORES[i]} />
        <group position={[0, 0, -0.75]}>
          {i === auto ? (
            <Auto />
          ) : (
            <group rotation={[0, Math.PI / 2, 0]}>
              <Cabra />
            </group>
          )}
        </group>
      </group>
    ))}
    {conGente && concursante ? (
      <Humanoide
        pose={{
          ...concursante,
          pos: [
            concursante.x ?? -1.4,
            concursante.pos[1],
            concursante.z ?? 1.2,
          ],
          rotY: Math.PI,
        }}
        aspecto={ASPECTO_CONCURSANTE}
      />
    ) : null}
    {conGente ? (
      <Humanoide
        pose={{
          ...(presentador ?? DE_PIE),
          pos: [2.6, 0.925, 0.2],
          rotY: -2.3,
        }}
        aspecto={ASPECTO_PRESENTADOR}
      />
    ) : null}
  </Lienzo>
);

const CAM_ANCHA: Camara = { pos: [0, 2.2, 7.4], mira: [0, 1.2, -0.6], fov: 50 };

const Portada: React.FC = () => {
  const f = useCurrentFrame();
  const s = (f + 60) / 30;
  const cam = camaraEn(
    [
      [0, CAM_ANCHA],
      [6, { pos: [0.4, 2.0, 6.4], mira: [0, 1.2, -0.6], fov: 48 }],
    ],
    s % 6,
  );
  return (
    <>
      <Show cam={cam} concursante={{ ...CRUZADO, x: -0.9, z: 1.6 }} />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 700,
          background:
            "linear-gradient(#0b1020f2 0%, #0b1020aa 60%, transparent)",
        }}
      />
      <Centro top={290}>
        <Grande mono={false} size={84} color={C.ink}>
          si cambias, ganas <span style={{ color: C.yellow }}>×2</span>
        </Grande>
        <Sub size={46} color={C.dim}>
          …y la mayoría no cambia
        </Sub>
      </Centro>
    </>
  );
};

const Gancho = () => <Portada />;

// 2 · Auto y cabras; eliges la 1 (camina y señala).
const Elige = () => {
  const f = useCurrentFrame();
  const s = f / 30;
  const andar = caminar(Math.min(s, 1.8), 0.9);
  const pose =
    s < 1.8
      ? andar
      : poseEn(
          [
            [1.8, andar],
            [2.4, SENALA_FRENTE],
          ],
          s,
        );
  const z = 3.2 - Math.min(s, 1.8) * 0.9;
  const cam = camaraEn(
    [
      [0, CAM_ANCHA],
      [3, { pos: [-2.0, 2.1, 5.6], mira: [-0.7, 1.5, -0.6], fov: 46 }],
    ],
    s,
  );
  return (
    <>
      <Show cam={cam} concursante={{ ...pose, x: -1.4, z }} />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 620,
          background:
            "linear-gradient(#0b1020f2 0%, #0b1020aa 60%, transparent)",
        }}
      />
      <Centro top={290}>
        <Sub size={56} color={C.ink}>
          1 auto · 2 cabras · eliges la{" "}
          <span style={{ color: COLORES[0] }}>1</span>
        </Sub>
      </Centro>
    </>
  );
};

// 3 · El presentador, que sabe, abre otra: cabra.
const Abre = () => {
  const f = useCurrentFrame();
  const s = f / 30;
  const a = resorte(s - 1.2);
  let cam = camaraEn(
    [
      [0, { pos: [1.4, 2.1, 6.2], mira: [0.8, 1.5, -0.8], fov: 46 }],
      [3, { pos: [1.5, 1.9, 5.0], mira: [1.1, 1.4, -1.2], fov: 42 }],
    ],
    s,
  );
  cam = temblor(cam, s, Math.max(0, 1 - Math.abs(s - 1.25) * 4));
  return (
    <>
      <Show
        cam={cam}
        abre={[0, 0, a]}
        concursante={{ ...SENALA_FRENTE, x: -1.4, z: 1.6 }}
        presentador={poseEn(
          [
            [0, DE_PIE],
            [1, SENALA_FRENTE],
          ],
          s,
        )}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 620,
          background:
            "linear-gradient(#0b1020f2 0%, #0b1020aa 60%, transparent)",
        }}
      />
      <Centro top={290}>
        <Sub size={60} color={C.ink}>
          el presentador <span style={{ color: C.yellow }}>sabe</span>
        </Sub>
      </Centro>
      <Sfx src="whoosh.wav" at={36} volume={0.35} />
      <Sfx src="boom.wav" at={40} volume={0.3} />
    </>
  );
};

// 4 · Parece 50/50.
const Cincuenta = () => {
  const f = useCurrentFrame();
  const tacha = prog(f, 40, 52);
  return (
    <>
      <Show
        cam={{ pos: [-0.2, 2.3, 7.2], mira: [-0.2, 1.8, -0.6], fov: 46 }}
        abre={[0, 0, 1]}
        concursante={{ ...CRUZADO, x: -1.4, z: 1.6 }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 700,
          background:
            "linear-gradient(#0b1020f2 0%, #0b1020aa 60%, transparent)",
        }}
      />
      <Centro top={320}>
        <div style={{ position: "relative" }}>
          <Grande size={200} color={C.ink}>
            50 / 50
          </Grande>
          <div
            style={{
              position: "absolute",
              left: -20,
              top: "50%",
              height: 16,
              borderRadius: 8,
              background: C.coral,
              width: `${tacha * 110}%`,
              rotate: "-8deg",
            }}
          />
        </div>
      </Centro>
      <Sfx src="boom.wav" at={40} volume={0.3} />
    </>
  );
};

// 5 · Tres mundos: el auto detrás de la 1, la 2 o la 3.
const Mundos = () => {
  const f = useCurrentFrame();
  return (
    <>
      <Lienzo
        cam={{ pos: [0, 14, 12.5], mira: [0, 0.2, 0.6], fov: 46 }}
        fondo={FONDO}
        ambiente={0.55}
      >
        <Sala ancho={30} piso="#2b2d42" pared="#1d1f33" />
        {[0, 1, 2].map((auto, k) => (
          <group key={k} position={[0, 0, (k - 1) * 4.2 + 2.2]} scale={0.95}>
            {XS.map((x, i) => (
              <group key={i} position={[x, 0, -1.2]}>
                <Puerta
                  color={COLORES[i]}
                  abre={
                    i === [1, 2, 1][auto]
                      ? prog(f, 10 + k * 14, 26 + k * 14)
                      : 0
                  }
                />
                <group position={[0, 0, -0.75]}>
                  {i === auto ? (
                    <Auto />
                  ) : (
                    <group rotation={[0, Math.PI / 2, 0]}>
                      <Cabra />
                    </group>
                  )}
                </group>
              </group>
            ))}
          </group>
        ))}
      </Lienzo>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 560,
          background:
            "linear-gradient(#0b1020f2 0%, #0b1020aa 60%, transparent)",
        }}
      />
      <Centro top={290}>
        <Sub size={52} color={C.ink}>
          tu primera elección acierta{" "}
          <span style={{ color: C.coral }}>1 de 3</span>
        </Sub>
      </Centro>
      <Centro top={420}>
        <div
          style={{
            display: "flex",
            gap: 30,
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 40,
            opacity: prog(f, 60, 70),
          }}
        >
          <span style={{ color: C.coral }}>quedarse: 1</span>
          <span style={{ color: C.green }}>cambiar: 2</span>
        </div>
      </Centro>
      <Pie top={490}>
        auto detrás de la 1, de la 2 o de la 3 · tú elegiste la 1
      </Pie>
    </>
  );
};

// 6 · 10,000 juegos: 33 % vs 67 % (simulación propia).
const Diezmil = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [6, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const barra = (t: string, n: number, color: string) => (
    <div style={{ width: 880 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 52,
          color,
        }}
      >
        <span>{t}</span>
        <span style={{ fontFamily: MONO }}>{((n * p) / 100).toFixed(1)} %</span>
      </div>
      <div
        style={{
          height: 60,
          borderRadius: 30,
          background: "#141a36",
          marginTop: 12,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${(n / 10000) * 100 * p}%`,
            height: "100%",
            borderRadius: 30,
            background: color,
          }}
        />
      </div>
    </div>
  );
  const sello = usePop(92, 9);
  return (
    <>
      <Centro top={290}>
        <Grande size={130} color={C.ink}>
          {Math.round(10000 * p).toLocaleString("en-US")}
        </Grande>
        <Sub size={48}>juegos simulados</Sub>
      </Centro>
      <Centro top={700}>
        <div style={{ display: "flex", flexDirection: "column", gap: 60 }}>
          {barra("quedarse", 3336, C.coral)}
          {barra("cambiar", 6664, C.green)}
        </div>
      </Centro>
      <Centro top={1150}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 70,
            color: C.bg,
            background: C.green,
            borderRadius: 24,
            padding: "8px 36px",
            opacity: f >= 92 ? 1 : 0,
            scale: interpolate(sello, [0, 1], [1.6, 1]),
          }}
        >
          cambia
        </div>
      </Centro>
      <Pie top={1330}>simulación en Python · problema de Monty Hall</Pie>
      <Sfx src="ding.wav" at={92} volume={0.4} />
    </>
  );
};

const Final = () => <Portada />;

const ESCENAS: EscenaCorta[] = [
  { nombre: "Gancho 3D", voz: "m1", Comp: Gancho, aire: 4 },
  { nombre: "Elige 3D", voz: "m2", Comp: Elige, aire: 4 },
  { nombre: "Abre 3D", voz: "m3", Comp: Abre, aire: 6 },
  { nombre: "50/50 3D", voz: "m4", Comp: Cincuenta, aire: 6 },
  { nombre: "Tres mundos 3D", voz: "m5", Comp: Mundos, aire: 6 },
  { nombre: "10,000 juegos", voz: "m6", Comp: Diezmil, aire: 10 },
  { nombre: "Final", voz: "m7", Comp: Final, aire: 6 },
];

export const TOTAL_MONTY = linea(S, ESCENAS).total;

export const MontyHall: React.FC = () => (
  <Corto short={S} escenas={ESCENAS} acento={C.yellow} />
);

/** Escenario con la puerta 3 abierta y la cabra (fijo), para la miniatura. */
export const PuertasMini: React.FC = () => (
  <Show
    cam={{ pos: [0, 2.0, 9.4], mira: [0, 1.0, -0.6], fov: 50 }}
    abre={[0, 0, 1]}
    concursante={{ ...CRUZADO, x: -1.4, z: 1.4 }}
  />
);
