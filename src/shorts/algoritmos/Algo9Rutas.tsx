import React from "react";
import { useCurrentFrame } from "remotion";
import { Sfx, Stage, Sticker, Words } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import {
  Avance,
  Capitulo,
  Codigo,
  duracionTotal,
  Formula,
  Nota,
  prog,
  SERIE_ALGORITMOS,
  Tarjeta,
} from "../../kit/serie";

// Parte 9: Camino más corto (Dijkstra). Mapa ilustrativo, tiempos en minutos.
type L = "Casa" | "Parque" | "Centro" | "Puente" | "Trabajo";
const LUGAR: Record<L, { x: number; y: number }> = {
  Casa: { x: 90, y: 560 },
  Parque: { x: 250, y: 260 },
  Centro: { x: 450, y: 470 },
  Puente: { x: 620, y: 220 },
  Trabajo: { x: 790, y: 430 },
};
const TRAMOS: [L, L, number][] = [
  ["Casa", "Centro", 10],
  ["Casa", "Parque", 4],
  ["Parque", "Centro", 3],
  ["Parque", "Puente", 9],
  ["Centro", "Puente", 2],
  ["Centro", "Trabajo", 8],
  ["Puente", "Trabajo", 4],
];

// Dijkstra real sobre el mapa.
const dijkstra = () => {
  const d: Record<string, number> = {
    Casa: 0,
    Parque: Infinity,
    Centro: Infinity,
    Puente: Infinity,
    Trabajo: Infinity,
  };
  const prev: Record<string, L> = {};
  const hechos: L[] = [];
  const pend = new Set<L>(Object.keys(LUGAR) as L[]);
  while (pend.size) {
    const u = [...pend].reduce((a, b) => (d[a] <= d[b] ? a : b));
    pend.delete(u);
    hechos.push(u);
    for (const [a, b, w] of TRAMOS) {
      const v = a === u ? b : b === u ? a : null;
      if (v && pend.has(v) && d[u] + w < d[v]) {
        d[v] = d[u] + w;
        prev[v] = u;
      }
    }
  }
  const camino: L[] = ["Trabajo"];
  while (camino[0] !== "Casa") camino.unshift(prev[camino[0]]);
  return { d, hechos, camino };
};
const { d: DIST, hechos: ORDEN, camino: MEJOR } = dijkstra(); // MEJOR: Casa→Parque→Centro→Puente→Trabajo = 13
const DIRECTA: L[] = ["Casa", "Centro", "Trabajo"]; // 10 + 8 = 18

const enRuta = (ruta: L[], a: L, b: L) =>
  ruta.some(
    (x, i) =>
      i < ruta.length - 1 &&
      ((x === a && ruta[i + 1] === b) || (x === b && ruta[i + 1] === a)),
  );

const Mapa: React.FC<{
  ruta?: L[];
  colorRuta?: string;
  dist?: number;
  pesos?: boolean;
}> = ({ ruta = [], colorRuta = C.green, dist = -1, pesos = true }) => {
  const W = 880;
  const H = 660;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {TRAMOS.map(([a, b, w]) => {
        const on = enRuta(ruta, a, b);
        const A = LUGAR[a];
        const B = LUGAR[b];
        return (
          <g key={a + b}>
            <line
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              stroke={on ? colorRuta : "#3a4478"}
              strokeWidth={on ? 16 : 12}
              strokeLinecap="round"
            />
            {pesos ? (
              <g>
                <circle
                  cx={(A.x + B.x) / 2}
                  cy={(A.y + B.y) / 2}
                  r={28}
                  fill={C.bg}
                  stroke={on ? colorRuta : C.dim}
                  strokeWidth={3}
                />
                <text
                  x={(A.x + B.x) / 2}
                  y={(A.y + B.y) / 2 + 10}
                  fill={on ? colorRuta : C.ink}
                  fontFamily={MONO}
                  fontWeight={700}
                  fontSize={28}
                  textAnchor="middle"
                >
                  {w}
                </text>
              </g>
            ) : null}
          </g>
        );
      })}
      {(Object.keys(LUGAR) as L[]).map((k) => {
        const p = LUGAR[k];
        const visto = ORDEN.indexOf(k) < dist;
        const esExtremo = k === "Casa" || k === "Trabajo";
        return (
          <g key={k}>
            <circle
              cx={p.x}
              cy={p.y}
              r={46}
              fill={esExtremo ? C.yellow : visto ? C.blue : C.bg2}
              stroke={C.ink}
              strokeWidth={4}
            />
            <text
              x={p.x}
              y={p.y - 62}
              fill={C.ink}
              fontFamily={FONT}
              fontWeight={900}
              fontSize={32}
              textAnchor="middle"
            >
              {k}
            </text>
            {dist >= 0 && ORDEN.indexOf(k) < dist ? (
              <text
                x={p.x}
                y={p.y + 12}
                fill={esExtremo ? C.bg : C.ink}
                fontFamily={MONO}
                fontWeight={700}
                fontSize={32}
                textAnchor="middle"
              >
                {DIST[k]}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
};

const Gancho: React.FC = () => (
  <Stage gap={40}>
    <Words
      text="¿Cómo se encuentra la ruta más *rápida*?"
      size={88}
      stagger={1}
      accent={C.green}
    />
    <Mapa pesos={false} />
    <Nota>Mapa de ejemplo</Nota>
  </Stage>
);

const Calles: React.FC = () => (
  <Stage gap={40}>
    <Words text="Las calles son un *grafo*" size={92} accent={C.blue} />
    <Mapa />
    <Words
      text="cada tramo: *minutos*"
      size={64}
      weight={800}
      delay={50}
      accent={C.yellow}
    />
  </Stage>
);

const Directa: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={40}>
      <Words text="La que *parece* directa…" size={90} accent={C.coral} />
      <Mapa ruta={frame > 20 ? DIRECTA : []} colorRuta={C.coral} />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 90,
          color: C.coral,
          opacity: prog(frame, 40, 50),
        }}
      >
        10 + 8 = 18 min
      </div>
      <Sfx src="tick.wav" at={20} />
    </Stage>
  );
};

const Dijkstra: React.FC = () => {
  const frame = useCurrentFrame();
  const k = Math.floor(prog(frame, 20, 150) * ORDEN.length + 0.001);
  const fin = frame > 160;
  return (
    <Stage gap={30}>
      <Words
        text="*Dijkstra*: lo más cercano primero"
        size={84}
        accent={C.green}
      />
      <Mapa dist={k} ruta={fin ? MEJOR : []} />
      <Formula delay={165} size={52}>
        4 + 3 + 2 + 4 = {DIST.Trabajo} min
      </Formula>
      <Sticker delay={190} bg={C.green} color={C.bg}>
        5 minutos menos
      </Sticker>
      {ORDEN.map((_, i) => (
        <Sfx
          key={i}
          src="tick.wav"
          at={20 + Math.round((i * 130) / ORDEN.length)}
          volume={0.3}
        />
      ))}
      <Sfx src="ding.wav" at={162} volume={0.4} />
    </Stage>
  );
};

const Aplicacion: React.FC = () => (
  <Stage gap={28}>
    <Words
      text="Así lo usa un *científico* *de* *datos*"
      size={78}
      accent={C.blue}
    />
    <Tarjeta
      titulo="Logística"
      texto="rutas de reparto, tiempos de entrega y cadenas de suministro"
      color={C.green}
      delay={20}
    />
    <Codigo
      lineas={[
        'nx.shortest_path(G, "Casa", "Trabajo",',
        '                 weight="minutos")',
      ]}
      delay={70}
      size={34}
    />
    <Tarjeta
      titulo="Ojo"
      texto="las apps reales usan versiones más avanzadas y tráfico en vivo"
      color={C.yellow}
      delay={140}
    />
    {[20, 140].map((t) => (
      <Sfx key={t} src="pop.wav" at={t} />
    ))}
  </Stage>
);

export const DUR_A9 = [150, 175, 160, 250, 255, 165];

export const Algo9Rutas: React.FC = () => (
  <Capitulo
    parte={9}
    short="algo9"
    serie={SERIE_ALGORITMOS}
    acento={C.green}
    escenas={[
      { nombre: "Gancho", dur: DUR_A9[0], voz: "i1", el: <Gancho /> },
      { nombre: "Calles", dur: DUR_A9[1], voz: "i2", el: <Calles /> },
      { nombre: "Directa", dur: DUR_A9[2], voz: "i3", el: <Directa /> },
      { nombre: "Dijkstra", dur: DUR_A9[3], voz: "i4", el: <Dijkstra /> },
      { nombre: "Aplicación", dur: DUR_A9[4], voz: "i5", el: <Aplicacion /> },
      {
        nombre: "Avance",
        dur: DUR_A9[5],
        voz: "i6",
        el: (
          <Avance
            parte={10}
            tema="Programación dinámica"
            gancho="¿*gatp* era gato?"
          />
        ),
      },
    ]}
  />
);

export const TOTAL_A9 = duracionTotal(DUR_A9);
