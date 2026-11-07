import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { Narracion, Musica, type Linea } from "../kit/voz";
import {
  Bg,
  Counter,
  Handle,
  Sfx,
  Stage,
  Sticker,
  Words,
  useIn,
} from "../kit/kit";
import { C, FONT, MONO } from "../kit/theme";

// Datos verificados (StatsBomb / Hudl): blog en 2013; empresa ~2017; sus datos desde 2018;
// Hudl la compró en agosto de 2024; ~3,300 eventos por partido; 360 = posición de los
// jugadores visibles en cada evento; su xG usa portero, defensores y altura del balón;
// parte de los datos es gratis en GitHub (statsbombpy). Las jugadas y valores de xG son ilustrativos.

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const CESPED = "#123a2a";
const LINEA = "#d7f5e5";

/** Cancha vertical (68 × 105 m a escala ×10). El arco de ataque está arriba. */
const Cancha: React.FC<{
  children?: React.ReactNode;
  width?: number;
  mitad?: boolean;
}> = ({ children, width = 640, mitad = false }) => {
  const h = mitad ? 525 : 1050;
  return (
    <svg width={width} height={(width * h) / 680} viewBox={`0 0 680 ${h}`}>
      <rect x={0} y={0} width={680} height={h} rx={18} fill={CESPED} />
      {Array.from({ length: Math.ceil(h / 105) }).map((_, i) =>
        i % 2 ? (
          <rect
            key={i}
            x={0}
            y={i * 105}
            width={680}
            height={105}
            fill="#ffffff"
            opacity={0.03}
          />
        ) : null,
      )}
      <g fill="none" stroke={LINEA} strokeWidth={4} opacity={0.75}>
        <rect
          x={10}
          y={10}
          width={660}
          height={mitad ? h - 10 : h - 20}
          rx={6}
        />
        <rect x={138.5} y={10} width={403} height={165} />
        <rect x={248.5} y={10} width={183} height={55} />
        <path d="M 263 175 A 91.5 91.5 0 0 0 417 175" />
        {mitad ? null : (
          <>
            <line x1={10} y1={525} x2={670} y2={525} />
            <circle cx={340} cy={525} r={91.5} />
            <rect x={138.5} y={875} width={403} height={165} />
            <rect x={248.5} y={985} width={183} height={55} />
            <path d="M 263 875 A 91.5 91.5 0 0 1 417 875" />
          </>
        )}
      </g>
      <circle cx={340} cy={120} r={5} fill={LINEA} />
      <rect x={303} y={0} width={74} height={10} fill="#ffffff" />
      {children}
    </svg>
  );
};

const Nota: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily: MONO,
      fontSize: 28,
      color: C.dim,
      textAlign: "center",
    }}
  >
    {children}
  </div>
);

// ---------- Escenas ----------

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  let s = 21;
  const r = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  const puntos = Array.from({ length: 160 }).map(() => [
    20 + r() * 640,
    20 + r() * 1010,
  ]);
  const n = interpolate(frame, [10, 95], [0, puntos.length], {
    ...clamp,
    easing: Easing.out(Easing.quad),
  });
  return (
    <Stage gap={30}>
      <Words text="Un partido de fútbol tiene…" size={80} stagger={1} />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 170,
          color: C.yellow,
          lineHeight: 1,
        }}
      >
        ~<Counter to={3300} start={10} dur={85} />
      </div>
      <Words text="datos" size={80} delay={20} />
      <Cancha width={430}>
        {puntos.slice(0, Math.floor(n)).map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={9}
            fill={[C.green, C.yellow, C.blue, C.coral][i % 4]}
            opacity={0.9}
          />
        ))}
      </Cancha>
      <Sfx src="whoosh.wav" at={10} volume={0.35} />
    </Stage>
  );
};

const HITOS: [string, string, string][] = [
  ["2013", "Nace como blog de análisis", C.blue],
  ["2017", "Se vuelve empresa", C.purple],
  ["2018", "Lanza sus propios datos", C.green],
  ["2024", "La compra Hudl", C.yellow],
];

const QueEs: React.FC = () => (
  <Stage gap={34}>
    <Words text="Los recolecta *StatsBomb*" size={88} accent={C.green} />
    <div
      style={{ display: "flex", flexDirection: "column", gap: 22, width: 860 }}
    >
      {HITOS.map(([anio, txt, color], i) => (
        <Hito
          key={anio}
          anio={anio}
          txt={txt}
          color={color}
          delay={25 + i * 22}
        />
      ))}
    </div>
    <Sfx src="pop.wav" at={25} />
    <Sfx src="pop.wav" at={91} />
  </Stage>
);

const Hito: React.FC<{
  anio: string;
  txt: string;
  color: string;
  delay: number;
}> = ({ anio, txt, color, delay }) => {
  const p = useIn(delay, 12);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 28,
        background: C.bg2,
        borderRadius: 24,
        padding: "22px 30px",
        borderLeft: `12px solid ${color}`,
        opacity: p,
        translate: `${(1 - p) * 80}px 0px`,
        fontFamily: FONT,
      }}
    >
      <span style={{ fontWeight: 900, fontSize: 72, color }}>{anio}</span>
      <span style={{ fontWeight: 800, fontSize: 48, color: C.ink }}>{txt}</span>
    </div>
  );
};

type Ev = {
  tipo: string;
  x1: number;
  y1: number;
  x2?: number;
  y2?: number;
  color: string;
  t: number;
};
const JUGADA: Ev[] = [
  { tipo: "Pase", x1: 200, y1: 760, x2: 430, y2: 470, color: C.blue, t: 20 },
  { tipo: "Presión", x1: 470, y1: 440, color: C.coral, t: 52 },
  { tipo: "Pase", x1: 430, y1: 470, x2: 300, y2: 210, color: C.blue, t: 80 },
  { tipo: "Tiro", x1: 300, y1: 210, x2: 345, y2: 8, color: C.yellow, t: 112 },
];

const Eventos: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={26}>
      <Words text="Cada acción es un *evento*" size={84} accent={C.yellow} />
      <Cancha width={520}>
        {JUGADA.map((e, i) => {
          const p = interpolate(frame, [e.t, e.t + 18], [0, 1], clamp);
          if (p <= 0) return null;
          return (
            <g key={i}>
              {e.x2 !== undefined && e.y2 !== undefined ? (
                <line
                  x1={e.x1}
                  y1={e.y1}
                  x2={e.x1 + (e.x2 - e.x1) * p}
                  y2={e.y1 + (e.y2 - e.y1) * p}
                  stroke={e.color}
                  strokeWidth={8}
                  strokeLinecap="round"
                  strokeDasharray={e.tipo === "Tiro" ? "0" : "18 14"}
                />
              ) : (
                <circle
                  cx={e.x1}
                  cy={e.y1}
                  r={40 * p}
                  fill="none"
                  stroke={e.color}
                  strokeWidth={8}
                />
              )}
              <circle cx={e.x1} cy={e.y1} r={16} fill={e.color} />
            </g>
          );
        })}
      </Cancha>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: 860,
          fontFamily: MONO,
          fontSize: 36,
        }}
      >
        {JUGADA.map((e, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: C.ink,
              opacity: interpolate(frame, [e.t, e.t + 8], [0, 1], clamp),
              borderBottom: `2px solid ${C.bg2}`,
            }}
          >
            <span style={{ color: e.color }}>{e.tipo}</span>
            <span>23:{String(10 + i * 2).padStart(2, "0")}</span>
            <span style={{ color: C.dim }}>
              x {Math.round(e.x1 / 10)} · y {Math.round(e.y1 / 10)}
            </span>
          </div>
        ))}
      </div>
      {JUGADA.map((e, i) => (
        <Sfx key={i} src="tick.wav" at={e.t} volume={0.35} />
      ))}
    </Stage>
  );
};

// Foto congelada en el momento del tiro (posiciones ilustrativas).
const ATAQUE = [
  [300, 210],
  [430, 300],
  [180, 330],
  [520, 420],
];
const DEFENSA = [
  [330, 150],
  [250, 190],
  [400, 230],
  [470, 170],
  [200, 260],
];
const PORTERO = [345, 40];

const Foto: React.FC = () => {
  const frame = useCurrentFrame();
  const flash = interpolate(frame, [20, 24, 34], [0, 0.8, 0], clamp);
  const todos = [
    ...ATAQUE.map((p) => [...p, 0]),
    ...DEFENSA.map((p) => [...p, 1]),
    [...PORTERO, 2],
  ];
  return (
    <Stage gap={30}>
      <Words
        text="*360*: congelan a todos los jugadores visibles"
        size={74}
        stagger={2}
        accent={C.green}
      />
      <div style={{ position: "relative" }}>
        <Cancha width={760} mitad>
          <polygon
            points="40,20 640,20 680,520 0,520"
            fill="#ffffff"
            opacity={0.05}
          />
          {todos.map(([x, y, tipo], i) => {
            const p = interpolate(
              frame,
              [28 + i * 3, 36 + i * 3],
              [0, 1],
              clamp,
            );
            const color = tipo === 0 ? C.blue : tipo === 1 ? C.coral : C.yellow;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={18 * p}
                fill={color}
                stroke="#0b1020"
                strokeWidth={4}
              />
            );
          })}
          <circle
            cx={300}
            cy={210}
            r={30}
            fill="none"
            stroke={C.yellow}
            strokeWidth={5}
            opacity={interpolate(frame, [70, 80], [0, 1], clamp)}
          />
        </Cancha>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "#fff",
            opacity: flash,
            borderRadius: 18,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          gap: 30,
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 42,
        }}
      >
        <span style={{ color: C.blue }}>● ataque</span>
        <span style={{ color: C.coral }}>● defensa</span>
        <span style={{ color: C.yellow }}>● portero</span>
      </div>
      <Nota>Solo los que se ven en cámara · posiciones ilustrativas</Nota>
      <Sfx src="whoosh.wav" at={20} volume={0.4} />
    </Stage>
  );
};

const Tiro: React.FC<{
  titulo: string;
  xg: number;
  color: string;
  defensas: number[][];
  portero: number[];
  tirador: number[];
  delay: number;
}> = ({ titulo, xg, color, defensas, portero, tirador, delay }) => {
  const frame = useCurrentFrame();
  const p = useIn(delay, 12);
  const v = interpolate(frame, [delay + 10, delay + 40], [0, xg], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        opacity: p,
        scale: 0.9 + 0.1 * p,
      }}
    >
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 40,
          color: C.dim,
        }}
      >
        {titulo}
      </div>
      <Cancha width={420} mitad>
        <line
          x1={tirador[0]}
          y1={tirador[1]}
          x2={340}
          y2={10}
          stroke={C.yellow}
          strokeWidth={5}
          strokeDasharray="12 10"
        />
        {defensas.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={20}
            fill={C.coral}
            stroke="#0b1020"
            strokeWidth={4}
          />
        ))}
        <circle
          cx={portero[0]}
          cy={portero[1]}
          r={20}
          fill={C.yellow}
          stroke="#0b1020"
          strokeWidth={4}
        />
        <circle
          cx={tirador[0]}
          cy={tirador[1]}
          r={22}
          fill={C.blue}
          stroke="#0b1020"
          strokeWidth={4}
        />
      </Cancha>
      <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 84, color }}>
        xG {v.toFixed(2).replace(".", ",")}
      </div>
    </div>
  );
};

const XG: React.FC = () => (
  <Stage gap={28}>
    <Words text="¿Qué tan probable era el *gol*?" size={80} accent={C.yellow} />
    <div style={{ display: "flex", gap: 30 }}>
      <Tiro
        titulo="Lejos y tapado"
        xg={0.03}
        color={C.coral}
        delay={25}
        tirador={[210, 380]}
        portero={[340, 40]}
        defensas={[
          [250, 290],
          [290, 230],
          [330, 170],
        ]}
      />
      <Tiro
        titulo="Cerca y solo"
        xg={0.45}
        color={C.green}
        delay={45}
        tirador={[330, 120]}
        portero={[380, 60]}
        defensas={[[520, 260]]}
      />
    </div>
    <div
      style={{
        display: "flex",
        gap: 14,
        flexWrap: "wrap",
        justifyContent: "center",
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: 38,
      }}
    >
      {["posición del portero", "defensores en medio", "altura del balón"].map(
        (t, i) => (
          <Chip key={t} delay={90 + i * 10}>
            {t}
          </Chip>
        ),
      )}
    </div>
    <Nota>Ejemplo simplificado · valores ilustrativos</Nota>
    <Sfx src="ding.wav" at={55} volume={0.4} />
  </Stage>
);

const Chip: React.FC<{ children: React.ReactNode; delay: number }> = ({
  children,
  delay,
}) => {
  const p = useIn(delay, 10);
  return (
    <span
      style={{
        background: `${C.green}26`,
        border: `3px solid ${C.green}`,
        color: C.ink,
        padding: "8px 20px",
        borderRadius: 16,
        opacity: p,
        scale: 0.7 + 0.3 * p,
      }}
    >
      {children}
    </span>
  );
};

const USOS: [string, string, string][] = [
  ["Fichajes", "encontrar jugadores que encajan, en cualquier liga", C.green],
  [
    "Rival",
    "cómo presiona, por dónde ataca, sus jugadas a balón parado",
    C.coral,
  ],
  ["Rendimiento", "medir a su propio equipo partido a partido", C.blue],
];

const Usos: React.FC = () => (
  <Stage gap={30}>
    <Words text="Así lo usan los *analistas* hoy" size={84} accent={C.yellow} />
    {USOS.map(([t, d, c], i) => (
      <Uso
        key={t}
        n={String(i + 1)}
        titulo={t}
        texto={d}
        color={c}
        delay={25 + i * 30}
      />
    ))}
    <Sfx src="pop.wav" at={25} />
    <Sfx src="pop.wav" at={55} />
    <Sfx src="pop.wav" at={85} />
  </Stage>
);

const Uso: React.FC<{
  n: string;
  titulo: string;
  texto: string;
  color: string;
  delay: number;
}> = ({ n, titulo, texto, color, delay }) => {
  const p = useIn(delay, 12);
  return (
    <div
      style={{
        width: 880,
        display: "flex",
        gap: 26,
        alignItems: "center",
        background: C.bg2,
        borderRadius: 26,
        padding: "26px 32px",
        borderLeft: `12px solid ${color}`,
        opacity: p,
        translate: `${(1 - p) * 80}px 0px`,
        fontFamily: FONT,
      }}
    >
      <div style={{ fontWeight: 900, fontSize: 100, color, lineHeight: 1 }}>
        {n}
      </div>
      <div>
        <div style={{ fontWeight: 900, fontSize: 56, color: C.ink }}>
          {titulo}
        </div>
        <div
          style={{ fontWeight: 600, fontSize: 38, color: C.dim, marginTop: 4 }}
        >
          {texto}
        </div>
      </div>
    </div>
  );
};

const Gratis: React.FC = () => (
  <Stage gap={36}>
    <Words
      text="Y parte de sus datos son *gratis*"
      size={88}
      accent={C.green}
    />
    <div
      style={{
        width: 860,
        background: "#0a0d1a",
        border: `3px solid ${C.bg2}`,
        borderRadius: 24,
        padding: "26px 32px",
        fontFamily: MONO,
        fontSize: 40,
        color: C.ink,
        lineHeight: 1.6,
      }}
    >
      <div>
        <span style={{ color: C.green }}>$</span> pip install statsbombpy
      </div>
      <div style={{ color: C.dim }}># datos abiertos en GitHub</div>
    </div>
    <Sticker delay={70} bg={C.yellow} rotate={2}>
      ¿Cuántos datos crees que tiene TU partido?
    </Sticker>
    <Sfx src="whoosh.wav" at={66} volume={0.4} />
  </Stage>
);

const Fuente: React.FC = () => (
  <div
    style={{
      position: "absolute",
      bottom: 330,
      left: 0,
      right: 0,
      textAlign: "center",
      fontFamily: MONO,
      fontSize: 28,
      color: C.dim,
      opacity: 0.8,
    }}
  >
    Fuente: StatsBomb / Hudl
  </div>
);

const VOZ: Linea[] = [
  { id: "b1", at: 2 },
  { id: "b2", at: 120 },
  { id: "b3", at: 292 },
  { id: "b4", at: 464 },
  { id: "b5", at: 636 },
  { id: "b6", at: 808 },
  { id: "b7", at: 990 },
];

export const StatsBomb: React.FC = () => {
  const T = 8;
  return (
    <AbsoluteFill>
      <Bg accent={C.green} />
      <TransitionSeries>
        <TransitionSeries.Sequence name="Gancho" durationInFrames={125}>
          <Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: T })}
        />
        <TransitionSeries.Sequence name="Qué es" durationInFrames={180}>
          <QueEs />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T })}
        />
        <TransitionSeries.Sequence name="Eventos" durationInFrames={180}>
          <Eventos />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T })}
        />
        <TransitionSeries.Sequence name="360" durationInFrames={180}>
          <Foto />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T })}
        />
        <TransitionSeries.Sequence name="xG" durationInFrames={180}>
          <XG />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: T })}
        />
        <TransitionSeries.Sequence name="Usos" durationInFrames={190}>
          <Usos />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: T })}
        />
        <TransitionSeries.Sequence name="Gratis" durationInFrames={150}>
          <Gratis />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Handle />
      <Sequence from={117} name="Fuente" layout="none">
        <Fuente />
      </Sequence>
      <Narracion short="statsbomb" lineas={VOZ} />
      <Musica src="music-explica.wav" short="statsbomb" lineas={VOZ} />
    </AbsoluteFill>
  );
};
