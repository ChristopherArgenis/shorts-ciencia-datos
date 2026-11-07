import React from "react";
import { useCurrentFrame } from "remotion";
import { Sfx, Stage, Sticker, Words, useIn } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import {
  Avance,
  Capitulo,
  duracionTotal,
  fmt,
  Formula,
  Nota,
  prog,
} from "../../kit/serie";

// Parte 3: Distribución normal y puntaje z. Compras ilustrativas: μ = $350, σ = $120.
const MU = 350;
const SIGMA = 120;
const z = (x: number) => (x - MU) / SIGMA;

const W = 900;
const H = 460;
const X0 = 0;
const X1 = 800;
const px = (x: number) => 30 + ((W - 60) * (x - X0)) / (X1 - X0);
const pdf = (x: number) => Math.exp(-0.5 * z(x) ** 2);
const py = (x: number) => H - 60 - (H - 120) * pdf(x);

/** Campana con bandas opcionales (1, 2, 3 desviaciones). */
const Campana: React.FC<{
  bandas?: number;
  dibujo?: number;
  marca?: { x: number; color: string; texto: string; p: number };
}> = ({ bandas = 0, dibujo = 1, marca }) => {
  const pts = Array.from({ length: 161 }).map(
    (_, i) => X0 + ((X1 - X0) * i) / 160,
  );
  const curva = pts
    .map((x, i) => `${i ? "L" : "M"}${px(x).toFixed(1)},${py(x).toFixed(1)}`)
    .join(" ");
  const area = (k: number) => {
    const a = Math.max(X0, MU - k * SIGMA);
    const b = Math.min(X1, MU + k * SIGMA);
    const seg = pts.filter((x) => x >= a && x <= b);
    return (
      `M${px(a)},${H - 60} ` +
      seg.map((x) => `L${px(x).toFixed(1)},${py(x).toFixed(1)}`).join(" ") +
      ` L${px(b)},${H - 60} Z`
    );
  };
  const colores = [C.green, C.blue, C.purple];
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {[3, 2, 1].map((k) =>
        bandas >= k ? (
          <path key={k} d={area(k)} fill={colores[k - 1]} opacity={0.28} />
        ) : null,
      )}
      <line
        x1={30}
        y1={H - 60}
        x2={W - 30}
        y2={H - 60}
        stroke={C.dim}
        strokeWidth={4}
      />
      <path
        d={curva}
        fill="none"
        stroke={C.yellow}
        strokeWidth={8}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - dibujo}
      />
      {[0, 200, 350, 500, 800].map((v) => (
        <text
          key={v}
          x={px(v)}
          y={H - 18}
          fill={v === MU ? C.yellow : C.dim}
          fontFamily={MONO}
          fontSize={28}
          textAnchor="middle"
        >
          ${v}
        </text>
      ))}
      {marca ? (
        <g opacity={marca.p}>
          <line
            x1={px(marca.x)}
            y1={60}
            x2={px(marca.x)}
            y2={H - 60}
            stroke={marca.color}
            strokeWidth={6}
          />
          <circle cx={px(marca.x)} cy={py(marca.x)} r={18} fill={marca.color} />
          <text
            x={px(marca.x) + 20}
            y={70}
            fill={marca.color}
            fontFamily={FONT}
            fontWeight={900}
            fontSize={40}
          >
            {marca.texto}
          </text>
        </g>
      ) : null}
    </svg>
  );
};

const Alerta: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const p = useIn(delay, 10);
  const vibra =
    frame > delay && frame < delay + 20 ? Math.sin(frame * 2.5) * 8 : 0;
  return (
    <div
      style={{
        width: 860,
        background: "#f4f6ff",
        borderRadius: 34,
        padding: "30px 34px",
        fontFamily: FONT,
        color: "#0b1020",
        opacity: p,
        translate: `${vibra}px ${(1 - p) * -60}px`,
        boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
      }}
    >
      <div style={{ fontWeight: 800, fontSize: 34, color: "#5a6290" }}>
        Tu banco · ahora
      </div>
      <div style={{ fontWeight: 900, fontSize: 56, marginTop: 6 }}>
        ¿Reconoces esta compra?
      </div>
      <div style={{ fontWeight: 900, fontSize: 92, color: C.coral }}>
        $9,500
      </div>
    </div>
  );
};

const Gancho: React.FC = () => (
  <Stage gap={50}>
    <Words
      text="Tu banco sabe que esta compra *no* *fuiste* *tú*"
      size={84}
      stagger={1}
      accent={C.coral}
    />
    <Alerta delay={30} />
    <Sfx src="ding.wav" at={30} volume={0.45} />
  </Stage>
);

const Campanas: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={40}>
      <Words
        text="Tus compras forman una *campana*"
        size={84}
        accent={C.yellow}
      />
      <Campana dibujo={prog(frame, 15, 75)} />
      <Formula delay={80} size={52}>
        Distribución normal · μ = $350 · σ = $120
      </Formula>
      <Nota>Ejemplo simplificado</Nota>
    </Stage>
  );
};

const Regla: React.FC = () => {
  const frame = useCurrentFrame();
  const bandas = frame < 30 ? 0 : frame < 55 ? 1 : frame < 80 ? 2 : 3;
  return (
    <Stage gap={36}>
      <Words
        text="Casi todo cae cerca del *promedio*"
        size={84}
        accent={C.yellow}
      />
      <Campana bandas={bandas} />
      <div
        style={{
          display: "flex",
          gap: 22,
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 50,
        }}
      >
        <span style={{ color: C.green, opacity: prog(frame, 30, 38) }}>
          ±1σ 68%
        </span>
        <span style={{ color: C.blue, opacity: prog(frame, 55, 63) }}>
          ±2σ 95%
        </span>
        <span style={{ color: C.purple, opacity: prog(frame, 80, 88) }}>
          ±3σ 99.7%
        </span>
      </div>
      {[30, 55, 80].map((t) => (
        <Sfx key={t} src="pop.wav" at={t} />
      ))}
    </Stage>
  );
};

const PuntajeZ: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={34}>
      <Words text="El *puntaje* *z*" size={100} accent={C.yellow} />
      <Formula delay={10} size={66}>
        z = (x − μ) / σ
      </Formula>
      <Campana
        marca={{
          x: 380,
          color: C.green,
          texto: "$380",
          p: prog(frame, 70, 85),
        }}
      />
      <div
        style={{
          fontFamily: MONO,
          fontSize: 52,
          color: C.ink,
          opacity: prog(frame, 100, 115),
        }}
      >
        (380 − 350) / 120 ={" "}
        <span style={{ color: C.green, fontWeight: 700 }}>
          {fmt(z(380), 2)}
        </span>
      </div>
      <Sticker delay={150} bg={C.green} color={C.bg}>
        Normal: estás cerca de tu promedio
      </Sticker>
      <Sfx src="pop.wav" at={70} />
    </Stage>
  );
};

const Fraude: React.FC = () => {
  const frame = useCurrentFrame();
  const sale = prog(frame, 20, 45);
  return (
    <Stage gap={34}>
      <Words text="¿Y una compra de *$9,500*?" size={88} accent={C.coral} />
      <div style={{ position: "relative" }}>
        <Campana />
        <div
          style={{
            position: "absolute",
            right: 30 + 40 * (1 - sale),
            top: 40,
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 60,
            color: C.coral,
            opacity: sale,
          }}
        >
          → muy lejos
        </div>
      </div>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 48,
          color: C.ink,
          opacity: prog(frame, 40, 55),
        }}
      >
        (9,500 − 350) / 120 ={" "}
        <span style={{ color: C.coral, fontWeight: 700 }}>
          {fmt(z(9500), 0)}
        </span>
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 130,
          color: C.coral,
          opacity: prog(frame, 60, 70),
        }}
      >
        z = 76
      </div>
      <Sticker delay={75} bg={C.coral} color={C.ink}>
        ¡Alerta de posible fraude!
      </Sticker>
      <Nota>Los bancos usan modelos más complejos; esta es la idea base</Nota>
      <Sfx src="boom.wav" at={60} volume={0.5} />
    </Stage>
  );
};

export const DUR_M3 = [140, 180, 175, 280, 175, 150];

export const Mates3Normal: React.FC = () => (
  <Capitulo
    parte={3}
    short="mates3"
    acento={C.purple}
    escenas={[
      { nombre: "Gancho", dur: DUR_M3[0], voz: "z1", el: <Gancho /> },
      { nombre: "Campana", dur: DUR_M3[1], voz: "z2", el: <Campanas /> },
      { nombre: "Regla 68-95-99.7", dur: DUR_M3[2], voz: "z3", el: <Regla /> },
      { nombre: "Puntaje z", dur: DUR_M3[3], voz: "z4", el: <PuntajeZ /> },
      { nombre: "Fraude", dur: DUR_M3[4], voz: "z5", el: <Fraude /> },
      {
        nombre: "Avance",
        dur: DUR_M3[5],
        voz: "z6",
        el: (
          <Avance
            parte={4}
            tema="Teorema de Bayes"
            gancho="¿Cómo sabe tu correo qué es *spam*?"
          />
        ),
      },
    ]}
  />
);

export const TOTAL_M3 = duracionTotal(DUR_M3);
