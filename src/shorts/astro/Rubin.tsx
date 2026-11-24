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
import { azar, Cielo, Observatorio } from "../../kit/three/Espacio";
import { D, Humanoide, conPose, poseEn } from "../../kit/three/Humanoide";
import { ASPECTO_OBSERVADOR, DE_PIE } from "../../kit/three/poses";
import { TelescopioAficionado } from "../../kit/three/Telescopio";

// "Este telescopio guarda 20 TB cada noche". Observatorio Vera C. Rubin (Rubin/NOIRLab/SLAC): ≈ 20 TB por noche,
// cámara de 3,200 MP, ≈ 1,000 imágenes por noche durante 10 años, hasta 10 millones de alertas por noche.
// Cálculos: 20 TB ÷ 256 GB ≈ 78 celulares; 3,200 MP ÷ 12 MP ≈ 267. Observatorio y persona en 3D (Three.js), ilustrativos.

const S = "rubin" as const;
const FONDO = "#070a18";

const Piso: React.FC<{ color?: string; r?: number }> = ({
  color = "#1b2230",
  r = 8,
}) => (
  <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
    <circleGeometry args={[r, 64]} />
    <meshStandardMaterial color={color} roughness={1} />
  </mesh>
);

/** Columnas de 0 y 1 que caen (datos). */
const Datos: React.FC<{
  f: number;
  x0: number;
  x1: number;
  top: number;
  alto: number;
}> = ({ f, x0, x1, top, alto }) => {
  const cols = 9;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top,
        width: 1080,
        height: alto,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {Array.from({ length: cols }).map((_, c) => {
        const x = x0 + ((x1 - x0) * c) / (cols - 1);
        const off = ((f * (6 + (c % 3) * 2) + c * 97) % 120) - 120;
        return (
          <div
            key={c}
            style={{
              position: "absolute",
              left: x,
              top: off,
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 30,
              lineHeight: 1.15,
              color: c % 2 ? "#4dabf7" : "#69db7c",
              opacity: 0.75,
              whiteSpace: "pre",
            }}
          >
            {Array.from({ length: 24 })
              .map((__, k) =>
                (c * 7 + k * 3 + Math.floor(f / 4)) % 2 ? "1" : "0",
              )
              .join("\n")}
          </div>
        );
      })}
    </div>
  );
};

const Portada: React.FC = () => {
  const f = useCurrentFrame();
  const t = (f + 60) / 30;
  const destello = Math.max(0, 1 - (f % 45) / 8);
  return (
    <>
      <Lienzo
        cam={{
          pos: [Math.sin(t * 0.25) * 1.2, 2.3, 4.6],
          mira: [0, 1.3, 0],
          fov: 50,
        }}
        fondo={FONDO}
        ambiente={0.3}
        luz={{ pos: [3, 6, 4], color: "#dbe4ff", intensidad: 1.6 }}
      >
        <Cielo />
        <Piso />
        <Observatorio
          alt={0.9 + 0.15 * Math.sin(t * 0.7)}
          az={-0.3 + 0.2 * Math.sin(t * 0.4)}
          destello={destello}
        />
      </Lienzo>
      <Datos f={f} x0={60} x1={1000} top={1150} alto={300} />
      <Centro top={290}>
        <Grande size={220} color={C.yellow}>
          20 TB
        </Grande>
        <Sub size={52}>cada noche</Sub>
      </Centro>
    </>
  );
};

const Gancho = () => <Portada />;

// 2 · Mirar el cielo parece tranquilo (persona con telescopio, en 3D).
const Tranquilo = () => {
  const f = useCurrentFrame();
  const s = f / 30;
  const mira = conPose(DE_PIE, {
    cabeza: D(-32),
    columna: D(-5),
    hombroD: D(-20, 0, -14),
    codoD: -0.6,
    hombroI: D(-10, 0, 10),
  });
  const pose = poseEn(
    [
      [0, DE_PIE],
      [0.8, mira],
    ],
    s,
  );
  return (
    <>
      <Lienzo
        cam={{ pos: [1.6, 1.5, 3.4], mira: [0.2, 1.05, 0], fov: 42 }}
        fondo={FONDO}
        ambiente={0.35}
        luz={{ pos: [2, 5, 3], color: "#dbe4ff", intensidad: 1.8 }}
      >
        <Cielo />
        <Piso color="#1b2a1f" />
        <Humanoide pose={{ ...pose, rotY: 0.4 }} aspecto={ASPECTO_OBSERVADOR} />
        <group position={[0.75, 0, -0.35]} rotation={[0, -0.5, 0]}>
          <TelescopioAficionado inclina={0.9} />
        </group>
      </Lienzo>
      <Centro top={290}>
        <Sub size={66}>¿mirar el cielo es tranquilo?</Sub>
      </Centro>
      <Tache delay={60} size={420} />
      <Sfx src="boom.wav" at={60} volume={0.35} />
    </>
  );
};

/** Celular con nivel de llenado 0..1. */
const Celular: React.FC<{ lleno: number; w?: number }> = ({
  lleno,
  w = 70,
}) => (
  <div
    style={{
      width: w,
      height: w * 1.8,
      borderRadius: w * 0.18,
      border: `${w * 0.06}px solid #ced4da`,
      position: "relative",
      overflow: "hidden",
      background: "#141a36",
    }}
  >
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: `${lleno * 100}%`,
        background: lleno >= 1 ? C.coral : C.blue,
      }}
    />
  </div>
);

// 3 · Cámara de 3,200 MP = 267 cámaras de celular.
const Camara = () => {
  const f = useCurrentFrame();
  const vis = Math.floor(
    interpolate(f, [10, 80], [0, 267], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  return (
    <>
      <Centro top={290}>
        <Grande size={170} color={C.ink}>
          3,200 MP
        </Grande>
        <Sub size={48}>= {vis} cámaras de celular de 12 MP</Sub>
      </Centro>
      <Centro top={620}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(19, 40px)",
            gap: 6,
          }}
        >
          {Array.from({ length: 267 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: i < vis ? C.blue : "#141a36",
              }}
            />
          ))}
        </div>
      </Centro>
      <Pie top={1330}>cámara LSST · la más grande para astronomía</Pie>
    </>
  );
};

// 4 · Unas mil fotos cada noche, durante diez años (el telescopio se mueve y dispara).
const Fotos = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const paso = Math.floor(f / 12);
  const r = azar(paso + 1);
  const az = -0.6 + r() * 1.2;
  const alt = 0.6 + r() * 0.6;
  const destello = Math.max(0, 1 - (f % 12) / 5);
  const n = Math.round(
    interpolate(f, [0, 100], [0, 1000], { extrapolateRight: "clamp" }),
  );
  return (
    <>
      <Lienzo
        cam={{
          pos: [Math.sin(t * 0.3) * 0.6, 3.0, 3.2],
          mira: [0, 1.4, 0],
          fov: 50,
        }}
        fondo={FONDO}
        ambiente={0.3}
        luz={{ pos: [3, 6, 4], color: "#dbe4ff", intensidad: 1.6 }}
      >
        <Cielo />
        <Piso />
        <Observatorio alt={alt} az={az} destello={destello} />
      </Lienzo>
      <Centro top={290}>
        <Grande size={150} color={C.ink}>
          {n.toLocaleString("en-US")}
        </Grande>
        <Sub size={48}>fotos por noche · durante 10 años</Sub>
      </Centro>
      {Array.from({ length: 9 }).map((_, i) => (
        <Sfx key={i} src="tick.wav" at={i * 12} volume={0.3} />
      ))}
    </>
  );
};

// 5 · Cada noche, 20 TB: como 78 celulares llenos.
const Celulares = () => {
  const f = useCurrentFrame();
  const p = prog(f, 6, 70);
  return (
    <>
      <Centro top={290}>
        <Grande size={150} color={C.coral}>
          ≈ 78
        </Grande>
        <Sub size={48}>celulares de 256 GB llenos, cada noche</Sub>
      </Centro>
      <Centro top={620}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(13, 64px)",
            gap: 8,
          }}
        >
          {Array.from({ length: 78 }).map((_, i) => (
            <Celular
              key={i}
              w={60}
              lleno={Math.max(0, Math.min(1, p * 78 - i))}
            />
          ))}
        </div>
      </Centro>
      <Pie top={1330}>20 TB ÷ 256 GB ≈ 78</Pie>
      <Sfx src="whoosh.wav" at={6} volume={0.3} />
    </>
  );
};

// 6 · Hasta 10 millones de cambios por noche: los revisan algoritmos.
const PUNTOS = (() => {
  const r = azar(5);
  return Array.from({ length: 160 }).map(() => ({
    x: 60 + r() * 960,
    y: 560 + r() * 520,
    d: Math.floor(r() * 90),
  }));
})();
const Alertas = () => {
  const f = useCurrentFrame();
  const n = Math.round(
    interpolate(f, [4, 100], [0, 10000000], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const embudo = prog(f, 110, 130);
  return (
    <>
      <Centro top={290}>
        <Grande size={120} color={C.ink}>
          {n.toLocaleString("en-US")}
        </Grande>
        <Sub size={48}>cambios en el cielo, cada noche</Sub>
      </Centro>
      {PUNTOS.map((p, i) => {
        const k = Math.max(0, 1 - Math.abs(f - p.d - 6) / 10);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x - 8,
              top: p.y - 8,
              width: 16,
              height: 16,
              borderRadius: 8,
              background: f > p.d ? C.yellow : "transparent",
              boxShadow: k > 0 ? `0 0 ${30 * k}px ${C.yellow}` : undefined,
              opacity: 1 - 0.7 * embudo,
            }}
          />
        );
      })}
      <Centro top={1150}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 64,
            color: C.bg,
            background: C.green,
            borderRadius: 24,
            padding: "10px 36px",
            opacity: embudo,
            scale: interpolate(embudo, [0, 1], [0.6, 1]),
          }}
        >
          los revisa un algoritmo
        </div>
      </Centro>
      <Pie top={1330}>
        Observatorio Rubin: alertas públicas en menos de 60 s
      </Pie>
      <Sfx src="ding.wav" at={110} volume={0.4} />
    </>
  );
};

const Final = () => <Portada />;

const ESCENAS: EscenaCorta[] = [
  { nombre: "Gancho 3D", voz: "n1", Comp: Gancho, aire: 6 },
  { nombre: "Tranquilo 3D", voz: "n2", Comp: Tranquilo, aire: 8 },
  { nombre: "Cámara", voz: "n3", Comp: Camara, aire: 6 },
  { nombre: "Fotos 3D", voz: "n4", Comp: Fotos, aire: 6 },
  { nombre: "Celulares", voz: "n5", Comp: Celulares, aire: 8 },
  { nombre: "Alertas", voz: "n6", Comp: Alertas, aire: 8 },
  { nombre: "Final", voz: "n7", Comp: Final, aire: 6 },
];

export const TOTAL_RUBIN = linea(S, ESCENAS).total;

export const Rubin: React.FC = () => (
  <Corto short={S} escenas={ESCENAS} acento={C.blue} />
);

/** Observatorio (fijo), para la miniatura. */
export const ObservatorioMini: React.FC = () => (
  <Lienzo
    cam={{ pos: [0.4, 2.3, 4.6], mira: [0, 1.3, 0], fov: 50 }}
    fondo={FONDO}
    ambiente={0.3}
    luz={{ pos: [3, 6, 4], color: "#dbe4ff", intensidad: 1.6 }}
  >
    <Cielo />
    <Piso />
    <Observatorio alt={0.95} az={-0.3} destello={0.6} />
  </Lienzo>
);
