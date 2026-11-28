import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Sfx } from "../../kit/kit";
import { C, FONT } from "../../kit/theme";
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
import { Humanoide, poseEn } from "../../kit/three/Humanoide";
import { Multitud, Reflector, Sala } from "../../kit/three/Escenario";
import { azar } from "../../kit/three/Espacio";
import { camaraEn, orbita, temblor } from "../../kit/three/Camara";
import { resorte } from "../../kit/three/Fisica";
import {
  ASPECTO_DOCTORA,
  ASPECTO_PACIENTE,
  LEE,
  PREOCUPADO,
  SENALA_FRENTE,
} from "../../kit/three/poses";

// "Diste positivo al 99 %… y casi seguro estás sano". Ejemplo simplificado (calculado): prevalencia 1/1,000,
// sensibilidad y especificidad 99 %. En 1,000 personas: 1 enfermo positivo + ≈10 sanos positivos → 1 de 11 ≈ 9 %.
// Consultorio y multitud en 3D (Three.js).

const S = "positivo" as const;
const FONDO = "#0b1020";
const FILAS = 25;
const COLS = 40;
const ENFERMO = 12 * COLS + 20; // al centro
const FALSOS = (() => {
  const r = azar(33);
  const set = new Set<number>();
  while (set.size < 10) {
    const i = Math.floor(r() * FILAS * COLS);
    if (i !== ENFERMO) set.add(i);
  }
  return [...set];
})();

/** Hoja de resultado en la mano. */
const Hoja: React.FC = () => (
  <mesh rotation={[-0.3, 0, 0]} position={[0, -0.02, 0.06]}>
    <boxGeometry args={[0.16, 0.22, 0.004]} />
    <meshStandardMaterial color="#ffffff" roughness={0.9} />
  </mesh>
);
const Tubo: React.FC = () => (
  <mesh position={[0, 0.06, 0.02]}>
    <cylinderGeometry args={[0.018, 0.018, 0.16, 14]} />
    <meshStandardMaterial
      color="#ff8787"
      transparent
      opacity={0.85}
      roughness={0.2}
    />
  </mesh>
);

/** Consultorio: doctora entrega el resultado; el paciente se preocupa. */
const Consultorio: React.FC<{ s: number; tubo?: boolean }> = ({ s, tubo }) => {
  const doc = poseEn(
    [
      [0, SENALA_FRENTE],
      [2, LEE],
    ],
    tubo ? 2 : 0,
  );
  const pac = poseEn(
    [
      [0, LEE],
      [1.2, PREOCUPADO],
    ],
    s + 1,
  );
  const cam = camaraEn(
    [
      [0, { pos: [0.3, 1.7, 5.6], mira: [0, 1.15, 0], fov: 44 }],
      [5, { pos: [0.15, 1.6, 4.4], mira: [0, 1.2, 0], fov: 36 }],
    ],
    s,
  );
  return (
    <Lienzo
      cam={cam}
      fondo="#dfe7ef"
      ambiente={0.7}
      luz={{ pos: [2, 5, 3], intensidad: 2 }}
    >
      <Sala piso="#e9ecef" pared="#cfe3f3" fondo={3} />
      <mesh castShadow receiveShadow position={[0.1, 0.4, -0.9]}>
        <boxGeometry args={[1.8, 0.8, 0.7]} />
        <meshStandardMaterial color="#adb5bd" roughness={0.6} />
      </mesh>
      <Humanoide
        pose={{ ...doc, pos: [0.65, 0.925, -0.2], rotY: -1.2 }}
        aspecto={ASPECTO_DOCTORA}
        enManoD={tubo ? <Tubo /> : <Hoja />}
      />
      <Humanoide
        pose={{ ...pac, pos: [-0.55, 0.925, 0.1], rotY: 1.0 }}
        aspecto={ASPECTO_PACIENTE}
      />
    </Lienzo>
  );
};

const Portada: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <>
      <Consultorio s={(f + 60) / 30} />
      <Centro top={290}>
        <div
          style={{
            background: C.coral,
            color: C.ink,
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 96,
            borderRadius: 24,
            padding: "6px 40px",
            rotate: "-3deg",
          }}
        >
          POSITIVO
        </div>
        <Sub size={52} color={C.bg}>
          prueba que acierta el <span style={{ color: "#c92a2a" }}>99 %</span>
        </Sub>
      </Centro>
    </>
  );
};

const Gancho = () => <Portada />;

/** Multitud de 1,000 con cámara que se aleja y orbita; `luz` decide quién se ilumina. */
const Gente: React.FC<{
  s: number;
  resaltar?: (i: number) => string | null;
  apagar?: (i: number) => boolean;
  sube?: number;
  cam?: "aleja" | "orbita";
  foco?: boolean;
  temb?: number;
}> = ({ s, resaltar, apagar, sube = 1, cam = "orbita", foco, temb = 0 }) => {
  const c =
    cam === "aleja"
      ? camaraEn(
          [
            [0, { pos: [0, 2.2, 3], mira: [0, 1, 0], fov: 40 }],
            [2.2, { pos: [0, 13, 13], mira: [0, 0, 0], fov: 42 }],
          ],
          s,
        )
      : orbita([0, 0, 0], 15, 11, 0.3 + s * 0.12, 42);
  return (
    <>
      <Lienzo cam={temblor(c, s, temb)} fondo={FONDO} ambiente={0.55}>
        <Sala ancho={40} piso="#1b1f33" />
        {foco ? (
          <Reflector
            pos={[0, 8, 0.6]}
            objetivo={[0.27, 0, 0.27]}
            color="#ff8787"
            intensidad={60}
          />
        ) : null}
        <group scale={[1, Math.max(0.01, sube), 1]}>
          <Multitud
            filas={FILAS}
            columnas={COLS}
            resaltar={resaltar}
            apagar={apagar}
          />
        </group>
      </Lienzo>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 820,
          background:
            "linear-gradient(#0b1020f2 0%, #0b1020cc 55%, transparent 100%)",
        }}
      />
    </>
  );
};

// 2 · Imagina mil personas (la cámara se aleja y la multitud sube con resorte).
const Mil = () => {
  const f = useCurrentFrame();
  const s = f / 30;
  return (
    <>
      <Gente s={s} cam="aleja" sube={resorte(s - 0.3)} />
      <Centro top={290}>
        <Grande size={170} color={C.ink}>
          1,000
        </Grande>
        <Sub size={48}>personas</Sub>
      </Centro>
      <Sfx src="whoosh.wav" at={6} volume={0.3} />
    </>
  );
};

// 3 · Una de cada mil está enferma.
const Uno = () => {
  const f = useCurrentFrame();
  const s = f / 30;
  const on = f >= 20;
  return (
    <>
      <Gente
        s={s}
        foco={on}
        resaltar={(i) => (on && i === ENFERMO ? "#ff2d2d" : null)}
      />
      <Centro top={290}>
        <Grande size={140} color="#ff6b6b">
          1 enfermo
        </Grande>
        <Sub size={46}>de cada 1,000 (ejemplo)</Sub>
      </Centro>
      <Sfx src="ding.wav" at={20} volume={0.35} />
    </>
  );
};

// 4 · La prueba falla con el 1 % de los sanos: 10 más.
const Diez = () => {
  const f = useCurrentFrame();
  const s = (f + 90) / 30;
  const n = Math.min(10, Math.max(0, Math.floor((f - 40) / 9) + 1));
  const ult = 40 + (n - 1) * 9;
  return (
    <>
      <Gente
        s={s}
        foco
        temb={n > 0 ? Math.max(0, 1 - (f - ult) / 6) * 0.6 : 0}
        resaltar={(i) =>
          i === ENFERMO
            ? "#ff2d2d"
            : FALSOS.slice(0, n).includes(i)
              ? "#ffd43b"
              : null
        }
      />
      <Centro top={290}>
        <Grande size={140} color="#ffd43b">
          +{n} sanos
        </Grande>
        <Sub size={44}>que dan positivo por error (1 % de 999)</Sub>
      </Centro>
      {Array.from({ length: 10 }).map((_, i) => (
        <Sfx key={i} src="tick.wav" at={40 + i * 9} volume={0.35} />
      ))}
    </>
  );
};

// 5 · Once positivos, solo uno enfermo.
const Once = () => {
  const f = useCurrentFrame();
  const s = (f + 220) / 30;
  const p = usePop(30, 9);
  return (
    <>
      <Gente
        s={s}
        foco
        resaltar={(i) =>
          i === ENFERMO ? "#ff2d2d" : FALSOS.includes(i) ? "#ffd43b" : null
        }
        apagar={(i) => f >= 10 && i !== ENFERMO && !FALSOS.includes(i)}
      />
      <Centro top={290}>
        <Grande mono={false} size={90} color={C.ink}>
          11 positivos
        </Grande>
        <div
          style={{
            marginTop: 20,
            background: C.ink,
            color: C.bg,
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 110,
            borderRadius: 28,
            padding: "4px 40px",
            opacity: f >= 30 ? 1 : 0,
            scale: interpolate(p, [0, 1], [1.8, 1]),
          }}
        >
          1 de 11
        </div>
      </Centro>
      <Sfx src="boom.wav" at={30} volume={0.35} />
    </>
  );
};

// 6 · 9 %: por eso se confirma con otra prueba.
const Nueve = () => {
  const f = useCurrentFrame();
  const v = Math.round(
    interpolate(f, [0, 30], [99, 9], { extrapolateRight: "clamp" }),
  );
  return (
    <>
      <Consultorio s={4} tubo />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(#0b1020ee 0%, #0b102099 45%, transparent 70%)",
        }}
      />
      <Centro top={290}>
        <Grande size={300} color={f >= 30 ? C.green : C.coral}>
          {v} %
        </Grande>
        <Sub size={48}>de probabilidad de estar enfermo</Sub>
        <Sub size={44} color={C.yellow}>
          → se confirma con otra prueba
        </Sub>
      </Centro>
      <Pie top={1450}>Ejemplo simplificado · teorema de Bayes</Pie>
      <Sfx src="ding.wav" at={30} volume={0.4} />
    </>
  );
};

const Final = () => <Portada />;

const ESCENAS: EscenaCorta[] = [
  { nombre: "Consultorio 3D", voz: "p1", Comp: Gancho, aire: 6 },
  { nombre: "Mil personas 3D", voz: "p2", Comp: Mil, aire: 8 },
  { nombre: "Un enfermo 3D", voz: "p3", Comp: Uno, aire: 8 },
  { nombre: "Diez falsos 3D", voz: "p4", Comp: Diez, aire: 10 },
  { nombre: "1 de 11 3D", voz: "p5", Comp: Once, aire: 12 },
  { nombre: "9 %", voz: "p6", Comp: Nueve, aire: 8 },
  { nombre: "Final", voz: "p7", Comp: Final, aire: 6 },
];

export const TOTAL_POSITIVO = linea(S, ESCENAS).total;

export const Positivo: React.FC = () => (
  <Corto short={S} escenas={ESCENAS} acento={C.coral} />
);

/** Multitud con los 11 positivos (fija), para la miniatura. */
export const MultitudMini: React.FC = () => (
  <Gente
    s={1}
    foco
    resaltar={(i) =>
      i === ENFERMO ? "#ff2d2d" : FALSOS.includes(i) ? "#ffd43b" : null
    }
    apagar={(i) => i !== ENFERMO && !FALSOS.includes(i)}
  />
);
