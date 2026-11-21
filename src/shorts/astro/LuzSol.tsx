import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Sfx } from "../../kit/kit";
import { C, FONT } from "../../kit/theme";
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
  usePop,
} from "../../kit/corto";

// "El Sol que ves es de hace 8 minutos". La luz tarda 149.6 millones de km ÷ c = 499 s (8:19);
// a la Luna 384,400 km ÷ c = 1.28 s; a Próxima Centauri 4.24 años; a Andrómeda 2.5 millones de años (NASA).

const S = "luzsol" as const;
const AMAR = "#ffd43b";

/** Círculo en pixel art (cuadritos) con degradado del centro al borde. */
export const PixelCirculo: React.FC<{
  d: number;
  n?: number;
  centro: string;
  borde: string;
  brillo?: string;
}> = ({ d, n = 18, centro, borde, brillo }) => {
  const c = n / 2;
  const lado = d / n;
  return (
    <div
      style={{
        position: "relative",
        width: d,
        height: d,
        filter: brillo ? `drop-shadow(0 0 ${d * 0.12}px ${brillo})` : undefined,
      }}
    >
      {Array.from({ length: n * n }).map((_, i) => {
        const x = i % n;
        const y = Math.floor(i / n);
        const r = Math.hypot(x + 0.5 - c, y + 0.5 - c) / c;
        if (r > 1) return null;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x * lado,
              top: y * lado,
              width: lado + 0.5,
              height: lado + 0.5,
              background: r < 0.55 ? centro : borde,
            }}
          />
        );
      })}
    </div>
  );
};

const Sol: React.FC<{ d: number }> = ({ d }) => (
  <PixelCirculo d={d} centro="#fff3bf" borde={AMAR} brillo="#ffa94d" />
);
const Tierra: React.FC<{ d: number }> = ({ d }) => (
  <PixelCirculo d={d} n={10} centro="#4dabf7" borde="#2f9e44" />
);
const Luna: React.FC<{ d: number }> = ({ d }) => (
  <PixelCirculo d={d} n={8} centro="#dee2e6" borde="#adb5bd" />
);

const reloj = (seg: number) =>
  `${Math.floor(seg / 60)}:${String(Math.floor(seg % 60)).padStart(2, "0")}`;

/** Pulso de luz que viaja de (x0) a (x1) en la fila `y` con progreso p. */
const Pulso: React.FC<{ x0: number; x1: number; y: number; p: number }> = ({
  x0,
  x1,
  y,
  p,
}) => {
  const x = x0 + (x1 - x0) * p;
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: x0,
          top: y - 3,
          width: Math.max(0, x - x0),
          height: 6,
          background: `linear-gradient(90deg, transparent, ${AMAR})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: x - 14,
          top: y - 14,
          width: 28,
          height: 28,
          borderRadius: 14,
          background: "#fff9db",
          boxShadow: `0 0 30px ${AMAR}`,
        }}
      />
    </>
  );
};

/** Sol con el reloj "−8:19" y un rayo viajando a la Tierra: cuadro 0 y final (bucle). */
const Portada: React.FC = () => {
  const f = useCurrentFrame();
  const p = ((f + 40) % 90) / 90;
  return (
    <>
      <Centro top={290}>
        <Grande size={180} color={AMAR}>
          −8:19
        </Grande>
        <Sub size={48}>el Sol que ves ya pasó</Sub>
      </Centro>
      <div style={{ position: "absolute", left: 90, top: 760 }}>
        <Sol d={380} />
      </div>
      <div style={{ position: "absolute", left: 900, top: 935 }}>
        <Tierra d={40} />
      </div>
      <Pulso x0={480} x1={905} y={955} p={p} />
      <Pie top={1300}>149.6 millones de km ÷ velocidad de la luz = 499 s</Pie>
    </>
  );
};

const Gancho = () => <Portada />;

// 2 · Creemos que la luz llega al instante.
const Instante = () => {
  const f = useCurrentFrame();
  const on = f >= 8;
  return (
    <>
      <Centro top={320}>
        <Sub size={70}>¿la luz llega al instante?</Sub>
      </Centro>
      <div style={{ position: "absolute", left: 120, top: 760 }}>
        <svg width={220} height={300} viewBox="0 0 70 96">
          <circle
            cx={35}
            cy={33}
            r={30}
            fill={on ? "#fff3bf" : "#495057"}
            style={{ filter: on ? `drop-shadow(0 0 12px ${AMAR})` : undefined }}
          />
          <rect x={21} y={62} width={28} height={10} rx={3} fill="#c9cde0" />
          <rect x={24} y={74} width={22} height={9} rx={3} fill="#9aa0bd" />
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          left: 880,
          top: 640,
          width: 60,
          height: 540,
          background: on ? "#fff3bf" : "#343a40",
          borderRadius: 10,
        }}
      />
      {on ? (
        <div
          style={{
            position: "absolute",
            left: 340,
            top: 840,
            width: 540,
            height: 60,
            background: `${AMAR}55`,
          }}
        />
      ) : null}
      <Tache delay={44} size={440} />
      <Sfx src="pop.wav" at={8} volume={0.35} />
      <Sfx src="boom.wav" at={44} volume={0.35} />
    </>
  );
};

// 3 · A la Luna, poco más de un segundo (Tierra y Luna a escala: 30 diámetros de distancia).
const LunaEsc = () => {
  const f = useCurrentFrame();
  const dT = 28;
  const dist = dT * (384400 / 12742);
  const x0 = (1080 - dist) / 2;
  const p = prog(f, 12, 12 + 38.5);
  return (
    <>
      <Centro top={320}>
        <Grande size={170} color={C.ink}>
          {(1.28 * p).toFixed(2)} s
        </Grande>
        <Sub size={48}>de la Tierra a la Luna</Sub>
      </Centro>
      <div
        style={{ position: "absolute", left: x0 - dT / 2, top: 950 - dT / 2 }}
      >
        <Tierra d={dT} />
      </div>
      <div style={{ position: "absolute", left: x0 + dist - 4, top: 950 - 4 }}>
        <Luna d={8} />
      </div>
      <Pulso x0={x0} x1={x0 + dist} y={950} p={p} />
      <Pie top={1100}>a escala · 384,400 km</Pie>
      <Sfx src="whoosh.wav" at={12} volume={0.3} />
    </>
  );
};

// 4 · Al Sol, ocho minutos.
const AlSol = () => {
  const f = useCurrentFrame();
  const p = prog(f, 4, 48);
  return (
    <>
      <Centro top={320}>
        <Grande size={200} color={AMAR}>
          {reloj(499 * p)}
        </Grande>
        <Sub size={48}>del Sol a la Tierra</Sub>
      </Centro>
      <div style={{ position: "absolute", left: 60, top: 820 }}>
        <Sol d={200} />
      </div>
      <div style={{ position: "absolute", left: 960, top: 912 }}>
        <Tierra d={16} />
      </div>
      <Pulso x0={260} x1={962} y={920} p={p} />
      <Pie top={1100}>149.6 millones de km</Pie>
      <Sfx src="whoosh.wav" at={4} volume={0.3} />
    </>
  );
};

// 5 · A la estrella más cercana, más de cuatro años.
const Proxima = () => {
  const f = useCurrentFrame();
  const p = prog(f, 4, 56);
  return (
    <>
      <Centro top={320}>
        <Grande size={170} color={C.ink}>
          {(4.24 * p).toFixed(2)} años
        </Grande>
        <Sub size={48}>a Próxima Centauri, la estrella más cercana</Sub>
      </Centro>
      <div style={{ position: "absolute", left: 80, top: 900 }}>
        <Sol d={40} />
      </div>
      <div style={{ position: "absolute", left: 950, top: 904 }}>
        <PixelCirculo
          d={32}
          n={8}
          centro="#ffc9c9"
          borde="#ff6b6b"
          brillo="#ff6b6b"
        />
      </div>
      <Pulso x0={120} x1={952} y={920} p={p} />
      <Sfx src="whoosh.wav" at={4} volume={0.3} />
    </>
  );
};

/** Galaxia espiral en pixel art (puntos sobre dos brazos). */
const Galaxia: React.FC<{ d: number; giro: number }> = ({ d, giro }) => {
  const pts = Array.from({ length: 220 }).map((_, i) => {
    const brazo = i % 2;
    const t = (i / 220) * 3.2;
    const r = (0.08 + t / 3.6) * (d / 2);
    const a = t * 2.2 + brazo * Math.PI + giro;
    const j = ((i * 37) % 11) / 11 - 0.5;
    return {
      x: d / 2 + (r + j * 14) * Math.cos(a),
      y: d / 2 + (r + j * 14) * Math.sin(a) * 0.45,
      s: i % 5 === 0 ? 8 : 5,
    };
  });
  return (
    <div style={{ position: "relative", width: d, height: d * 0.5 }}>
      <div
        style={{
          position: "absolute",
          left: d / 2 - 40,
          top: d * 0.25 - 26,
          width: 80,
          height: 52,
          borderRadius: "50%",
          background: "#fff3bf",
          boxShadow: "0 0 60px #ffe8cc",
        }}
      />
      {pts.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x - p.s / 2,
            top: p.y - d * 0.25 - p.s / 2,
            width: p.s,
            height: p.s,
            background: i % 3 ? "#d0bfff" : "#e7f5ff",
          }}
        />
      ))}
    </div>
  );
};

// 6 · Andrómeda: hace 2.5 millones de años, antes de los humanos.
const Andromeda = () => {
  const f = useCurrentFrame();
  const barra = usePop(70);
  return (
    <>
      <Centro top={300}>
        <Grande size={130} color={C.ink}>
          −2,500,000
        </Grande>
        <Sub size={52}>años: así ves Andrómeda</Sub>
      </Centro>
      <Centro top={640}>
        <Galaxia d={820} giro={f / 90} />
      </Centro>
      <Centro top={1160}>
        <div
          style={{
            width: 880,
            opacity: f >= 70 ? 1 : 0,
            scale: interpolate(barra, [0, 1], [0.9, 1]),
          }}
        >
          <div
            style={{
              display: "flex",
              height: 54,
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            <div style={{ flex: 2.5 - 0.3, background: "#3b3f63" }} />
            <div style={{ flex: 0.3, background: C.yellow }} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 36,
              color: C.dim,
              marginTop: 10,
            }}
          >
            <span>sale la luz</span>
            <span style={{ color: C.yellow }}>humanos (300 mil años)</span>
          </div>
        </div>
      </Centro>
      <Pie top={1360}>distancia: NASA · ilustración propia</Pie>
      <Sfx src="ding.wav" at={70} volume={0.35} />
    </>
  );
};

const Final = () => <Portada />;

const ESCENAS: EscenaCorta[] = [
  { nombre: "Gancho", voz: "l1", Comp: Gancho, aire: 8 },
  { nombre: "¿Al instante?", voz: "l2", Comp: Instante, aire: 8 },
  { nombre: "Luna", voz: "l3", Comp: LunaEsc, aire: 14 },
  { nombre: "Sol", voz: "l4", Comp: AlSol, aire: 14 },
  { nombre: "Próxima", voz: "l5", Comp: Proxima, aire: 12 },
  { nombre: "Andrómeda", voz: "l6", Comp: Andromeda, aire: 12 },
  { nombre: "Final", voz: "l7", Comp: Final, aire: 6 },
];

export const TOTAL_LUZSOL = linea(S, ESCENAS).total;

export const LuzSol: React.FC = () => (
  <Corto short={S} escenas={ESCENAS} acento={AMAR} />
);

/** Sol con reloj (fijo), para la miniatura. */
export const SolReloj: React.FC = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 20,
    }}
  >
    <Sol d={640} />
  </div>
);
