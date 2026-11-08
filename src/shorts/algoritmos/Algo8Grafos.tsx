import React from "react";
import { useCurrentFrame } from "remotion";
import { Sfx, Stage, Sticker, Words, useIn } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import {
  Avance,
  Capitulo,
  Codigo,
  duracionTotal,
  Nota,
  prog,
  SERIE_ALGORITMOS,
} from "../../kit/serie";

// Parte 8: Grafos. Red de amigos y una red de fraude (ilustrativas).
type P = { id: string; x: number; y: number; c: string };
const PERSONAS: P[] = [
  { id: "Tú", x: 430, y: 330, c: C.yellow },
  { id: "Ana", x: 250, y: 160, c: C.blue },
  { id: "Luis", x: 250, y: 500, c: C.blue },
  { id: "Sofía", x: 640, y: 330, c: C.blue },
  { id: "Sara", x: 90, y: 330, c: C.purple },
  { id: "Pedro", x: 790, y: 150, c: C.purple },
];
const AMISTADES: [string, string][] = [
  ["Tú", "Ana"],
  ["Tú", "Luis"],
  ["Tú", "Sofía"],
  ["Ana", "Sara"],
  ["Luis", "Sara"],
  ["Sofía", "Pedro"],
];

const Grafo: React.FC<{
  aparicion?: number;
  resaltar?: string[];
  aristasOn?: [string, string][];
  etiquetas?: boolean;
}> = ({ aparicion = 1, resaltar = [], aristasOn = [], etiquetas = false }) => {
  const W = 880;
  const H = 640;
  const pos = Object.fromEntries(PERSONAS.map((p) => [p.id, p]));
  const n = Math.floor(aparicion * PERSONAS.length + 0.001);
  const vis = new Set(PERSONAS.slice(0, n).map((p) => p.id));
  const on = (a: string, b: string) =>
    aristasOn.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {AMISTADES.filter(([a, b]) => vis.has(a) && vis.has(b)).map(([a, b]) => (
        <line
          key={a + b}
          x1={pos[a].x}
          y1={pos[a].y}
          x2={pos[b].x}
          y2={pos[b].y}
          stroke={on(a, b) ? C.green : C.dim}
          strokeWidth={on(a, b) ? 10 : 5}
          opacity={on(a, b) ? 1 : 0.6}
        />
      ))}
      {etiquetas ? (
        <text
          x={(pos["Tú"].x + pos["Sofía"].x) / 2}
          y={pos["Tú"].y - 70}
          fill={C.green}
          fontFamily={FONT}
          fontWeight={900}
          fontSize={34}
          textAnchor="middle"
        >
          arista
        </text>
      ) : null}
      {PERSONAS.slice(0, n).map((p) => {
        const r = resaltar.includes(p.id);
        return (
          <g key={p.id}>
            <circle
              cx={p.x}
              cy={p.y}
              r={r ? 66 : 56}
              fill={r ? p.c : `${p.c}40`}
              stroke={p.c}
              strokeWidth={6}
            />
            <text
              x={p.x}
              y={p.y + 12}
              fill={r ? C.bg : C.ink}
              fontFamily={FONT}
              fontWeight={900}
              fontSize={32}
              textAnchor="middle"
            >
              {p.id}
            </text>
          </g>
        );
      })}
      {etiquetas ? (
        <text
          x={pos["Tú"].x}
          y={pos["Tú"].y + 100}
          fill={C.yellow}
          fontFamily={FONT}
          fontWeight={900}
          fontSize={34}
          textAnchor="middle"
        >
          nodo
        </text>
      ) : null}
    </svg>
  );
};

const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={40}>
      <Words
        text="Tú, tus amigos y los amigos de tus amigos"
        size={84}
        stagger={1}
        accent={C.yellow}
      />
      <Grafo aparicion={prog(frame, 15, 80)} />
      <Words text="forman un *grafo*" size={76} delay={70} accent={C.blue} />
      <Sfx src="pop.wav" at={15} />
    </Stage>
  );
};

const Partes: React.FC = () => (
  <Stage gap={40}>
    <Words text="*Nodos* y *aristas*" size={100} accent={C.yellow} />
    <Grafo etiquetas resaltar={["Tú"]} aristasOn={[["Tú", "Sofía"]]} />
    <Words
      text="persona = nodo · amistad = arista"
      size={56}
      weight={800}
      delay={50}
      color={C.dim}
    />
    <Nota>Ejemplo simplificado</Nota>
  </Stage>
);

const Comun: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={40}>
      <Words text="Sara *no* es tu amiga…" size={90} accent={C.purple} />
      <Grafo
        resaltar={frame > 30 ? ["Sara", "Ana", "Luis"] : ["Sara"]}
        aristasOn={
          frame > 30
            ? [
                ["Tú", "Ana"],
                ["Ana", "Sara"],
                ["Tú", "Luis"],
                ["Luis", "Sara"],
              ]
            : []
        }
      />
      <Words
        text="…pero tiene *2* *amigos* *en* *común*"
        size={74}
        delay={40}
        accent={C.green}
      />
      <Sfx src="ding.wav" at={32} volume={0.35} />
    </Stage>
  );
};

const Sugerencia: React.FC = () => {
  const p = useIn(25, 10);
  return (
    <Stage gap={50}>
      <Words text="Por eso te la *sugerirían*" size={88} accent={C.green} />
      <div
        style={{
          width: 820,
          background: "#f4f6ff",
          borderRadius: 30,
          padding: "30px 34px",
          display: "flex",
          alignItems: "center",
          gap: 28,
          opacity: p,
          scale: 0.85 + 0.15 * p,
          fontFamily: FONT,
          color: "#0b1020",
        }}
      >
        <div
          style={{
            width: 130,
            height: 130,
            borderRadius: 65,
            background: C.purple,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 900,
            fontSize: 56,
            color: "#fff",
          }}
        >
          S
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 30, color: "#5a6290" }}>
            Personas que quizás conozcas
          </div>
          <div style={{ fontWeight: 900, fontSize: 64 }}>Sara</div>
          <div style={{ fontWeight: 700, fontSize: 36, color: "#5a6290" }}>
            2 amigos en común
          </div>
        </div>
      </div>
      <Nota>Idea base; cada red social usa sus propios modelos</Nota>
      <Sfx src="pop.wav" at={25} />
    </Stage>
  );
};

const Fraude: React.FC = () => {
  const frame = useCurrentFrame();
  const W = 880;
  const H = 520;
  const cx = 440;
  const cy = 260;
  const cuentas = [0, 1, 2, 3, 4].map((i) => {
    const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + 210 * Math.cos(a), y: cy + 200 * Math.sin(a) };
  });
  const alerta = prog(frame, 90, 100);
  return (
    <Stage gap={26}>
      <Words
        text="Así lo usa un *científico* *de* *datos*"
        size={78}
        accent={C.blue}
      />
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {cuentas.map((c, i) => (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={c.x}
            y2={c.y}
            stroke={alerta > 0 ? C.coral : C.dim}
            strokeWidth={6}
            opacity={prog(frame, 20 + i * 8, 30 + i * 8)}
          />
        ))}
        {cuentas.map((c, i) => (
          <g key={`c${i}`} opacity={prog(frame, 10 + i * 6, 20 + i * 6)}>
            <circle
              cx={c.x}
              cy={c.y}
              r={52}
              fill={`${C.blue}40`}
              stroke={C.blue}
              strokeWidth={5}
            />
            <text
              x={c.x}
              y={c.y + 11}
              fill={C.ink}
              fontFamily={MONO}
              fontSize={30}
              textAnchor="middle"
            >
              cta{i + 1}
            </text>
          </g>
        ))}
        <rect
          x={cx - 120}
          y={cy - 48}
          width={240}
          height={96}
          rx={18}
          fill={alerta > 0 ? C.coral : C.bg2}
          stroke={C.coral}
          strokeWidth={5}
        />
        <text
          x={cx}
          y={cy + 12}
          fill={alerta > 0 ? C.bg : C.ink}
          fontFamily={MONO}
          fontWeight={700}
          fontSize={34}
          textAnchor="middle"
        >
          tarjeta 1234
        </text>
      </svg>
      <Sticker delay={95} bg={C.coral} color={C.ink}>
        5 cuentas, 1 tarjeta: ¿fraude?
      </Sticker>
      <Codigo
        lineas={[
          "import networkx as nx",
          'nx.common_neighbors(G, "Tú", "Sara")',
        ]}
        delay={150}
        size={36}
      />
      <Sfx src="boom.wav" at={90} volume={0.4} />
    </Stage>
  );
};

export const DUR_A8 = [160, 165, 170, 180, 290, 150];

export const Algo8Grafos: React.FC = () => (
  <Capitulo
    parte={8}
    short="algo8"
    serie={SERIE_ALGORITMOS}
    acento={C.purple}
    escenas={[
      { nombre: "Gancho", dur: DUR_A8[0], voz: "h1", el: <Gancho /> },
      { nombre: "Nodos y aristas", dur: DUR_A8[1], voz: "h2", el: <Partes /> },
      { nombre: "En común", dur: DUR_A8[2], voz: "h3", el: <Comun /> },
      { nombre: "Sugerencia", dur: DUR_A8[3], voz: "h4", el: <Sugerencia /> },
      { nombre: "Fraude", dur: DUR_A8[4], voz: "h5", el: <Fraude /> },
      {
        nombre: "Avance",
        dur: DUR_A8[5],
        voz: "h6",
        el: (
          <Avance
            parte={9}
            tema="Camino más corto"
            gancho="¿Cómo se elige la ruta más *rápida*?"
          />
        ),
      },
    ]}
  />
);

export const TOTAL_A8 = duracionTotal(DUR_A8);
