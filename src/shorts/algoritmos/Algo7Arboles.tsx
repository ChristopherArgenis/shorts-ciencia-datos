import React from "react";
import { useCurrentFrame } from "remotion";
import { Sfx, Stage, Sticker, Words } from "../../kit/kit";
import { C, FONT } from "../../kit/theme";
import {
  Avance,
  Capitulo,
  Codigo,
  duracionTotal,
  Nota,
  prog,
  SERIE_ALGORITMOS,
  Tarjeta,
} from "../../kit/serie";

// Parte 7: Árboles. Carpetas y un árbol de decisión de crédito (ilustrativo).
type Nodo = {
  id: string;
  t: string;
  x: number;
  y: number;
  padre?: string;
  tipo?: "raiz" | "rama" | "hoja";
  color?: string;
};

const CARPETAS: Nodo[] = [
  { id: "pc", t: "Mi PC", x: 430, y: 60, tipo: "raiz" },
  { id: "doc", t: "Documentos", x: 210, y: 250, padre: "pc", tipo: "rama" },
  { id: "fot", t: "Fotos", x: 650, y: 250, padre: "pc", tipo: "rama" },
  { id: "tar", t: "Tareas", x: 100, y: 450, padre: "doc", tipo: "rama" },
  { id: "cv", t: "CV.pdf", x: 320, y: 450, padre: "doc", tipo: "hoja" },
  { id: "f25", t: "2025", x: 560, y: 450, padre: "fot", tipo: "hoja" },
  { id: "f26", t: "2026", x: 760, y: 450, padre: "fot", tipo: "hoja" },
  { id: "mat", t: "mates.py", x: 100, y: 640, padre: "tar", tipo: "hoja" },
];

const DECISION: Nodo[] = [
  { id: "q1", t: "¿Ingreso > $20,000?", x: 430, y: 60, color: C.blue },
  {
    id: "q2",
    t: "¿Pagos atrasados?",
    x: 325,
    y: 280,
    padre: "q1",
    color: C.blue,
  },
  { id: "no1", t: "Rechazado", x: 700, y: 280, padre: "q1", color: C.coral },
  { id: "si", t: "Aprobado", x: 170, y: 500, padre: "q2", color: C.green },
  { id: "rev", t: "Revisar", x: 480, y: 500, padre: "q2", color: C.yellow },
];
const ETIQUETAS: Record<string, string> = {
  q2: "Sí",
  no1: "No",
  si: "No",
  rev: "Sí",
};

const colorTipo = (n: Nodo) =>
  n.color ??
  (n.tipo === "raiz" ? C.yellow : n.tipo === "hoja" ? C.green : C.blue);

/** Dibuja un árbol con aparición progresiva y un camino resaltado. */
const Arbol: React.FC<{
  nodos: Nodo[];
  aparicion?: number;
  camino?: string[];
  caminoP?: number;
  resaltarTipo?: string;
  etiquetas?: Record<string, string>;
  ancho?: number;
  fuente?: number;
}> = ({
  nodos,
  aparicion = 1,
  camino = [],
  caminoP = 0,
  resaltarTipo,
  etiquetas,
  ancho = 280,
  fuente = 34,
}) => {
  const W = 880;
  const H = Math.max(...nodos.map((n) => n.y)) + 110;
  const pos = Object.fromEntries(nodos.map((n) => [n.id, n]));
  const nVis = Math.floor(aparicion * nodos.length + 0.001);
  const enCamino = (id: string) =>
    camino.slice(0, Math.ceil(caminoP * camino.length)).includes(id);
  return (
    <div style={{ position: "relative", width: W, height: H }}>
      <svg
        width={W}
        height={H}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        {nodos.slice(0, nVis).map((n) =>
          n.padre ? (
            <g key={n.id}>
              <line
                x1={pos[n.padre].x}
                y1={pos[n.padre].y + 40}
                x2={n.x}
                y2={n.y - 40}
                stroke={enCamino(n.id) ? C.yellow : C.dim}
                strokeWidth={enCamino(n.id) ? 9 : 5}
              />
              {etiquetas?.[n.id] ? (
                <text
                  x={(pos[n.padre].x + n.x) / 2 + 14}
                  y={(pos[n.padre].y + n.y) / 2}
                  fill={C.dim}
                  fontFamily={FONT}
                  fontWeight={800}
                  fontSize={34}
                >
                  {etiquetas[n.id]}
                </text>
              ) : null}
            </g>
          ) : null,
        )}
      </svg>
      {nodos.slice(0, nVis).map((n) => {
        const c = colorTipo(n);
        const on = enCamino(n.id) || (resaltarTipo && n.tipo === resaltarTipo);
        return (
          <div
            key={n.id}
            style={{
              position: "absolute",
              left: n.x - ancho / 2,
              top: n.y - 40,
              width: ancho,
              height: 80,
              borderRadius: 20,
              background: on ? c : `${c}26`,
              border: `4px solid ${c}`,
              color: on ? C.bg : C.ink,
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: fuente,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              scale: on ? 1.06 : 1,
            }}
          >
            {n.t}
          </div>
        );
      })}
    </div>
  );
};

const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={40}>
      <Words
        text="Las carpetas de tu compu son un *árbol*"
        size={86}
        stagger={1}
        accent={C.green}
      />
      <Arbol nodos={CARPETAS} aparicion={prog(frame, 15, 90)} ancho={210} />
      <Sfx src="pop.wav" at={15} />
    </Stage>
  );
};

const Partes: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame < 55 ? "raiz" : frame < 100 ? "rama" : "hoja";
  return (
    <Stage gap={36}>
      <div
        style={{
          display: "flex",
          gap: 30,
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 64,
        }}
      >
        <span style={{ color: C.yellow, opacity: prog(frame, 10, 20) }}>
          Raíz
        </span>
        <span style={{ color: C.blue, opacity: prog(frame, 55, 65) }}>
          Ramas
        </span>
        <span style={{ color: C.green, opacity: prog(frame, 100, 110) }}>
          Hojas
        </span>
      </div>
      <Arbol nodos={CARPETAS} resaltarTipo={t} ancho={210} />
      <Sfx src="tick.wav" at={10} />
      <Sfx src="tick.wav" at={55} />
      <Sfx src="tick.wav" at={100} />
    </Stage>
  );
};

const Camino: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={36}>
      <Words text="¿Dónde está *CV.pdf*?" size={92} accent={C.yellow} />
      <Arbol
        nodos={CARPETAS}
        camino={["pc", "doc", "cv"]}
        caminoP={prog(frame, 25, 95)}
        ancho={210}
      />
      <Words
        text="Bajas por la rama *correcta*"
        size={66}
        weight={800}
        delay={100}
        accent={C.green}
      />
      <Sfx src="ding.wav" at={95} volume={0.35} />
    </Stage>
  );
};

const Decision: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={30}>
      <Words text="Un *árbol* *de* *decisión*" size={86} accent={C.blue} />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 44,
          color: C.ink,
          background: C.bg2,
          borderRadius: 18,
          padding: "14px 26px",
          opacity: prog(frame, 10, 20),
        }}
      >
        Cliente: ingreso $25,000 · sin pagos atrasados
      </div>
      <Arbol
        nodos={DECISION}
        aparicion={prog(frame, 20, 70)}
        camino={["q1", "q2", "si"]}
        caminoP={prog(frame, 100, 200)}
        etiquetas={ETIQUETAS}
        ancho={300}
        fuente={27}
      />
      <Sticker delay={205} bg={C.green} color={C.bg}>
        ¡Crédito aprobado!
      </Sticker>
      <Nota>Ejemplo simplificado</Nota>
      <Sfx src="ding.wav" at={205} volume={0.4} />
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
      titulo="Aprende las preguntas solo"
      texto="el modelo elige qué preguntar a partir de miles de casos pasados"
      color={C.blue}
      delay={20}
    />
    <Codigo
      lineas={[
        "from sklearn.tree import DecisionTreeClassifier",
        "modelo = DecisionTreeClassifier()",
        "modelo.fit(clientes, resultado)",
      ]}
      delay={70}
      size={27}
    />
    <Tarjeta
      titulo="Usos"
      texto="créditos, fraudes, clientes que se van"
      color={C.green}
      delay={140}
    />
    {[20, 140].map((t) => (
      <Sfx key={t} src="pop.wav" at={t} />
    ))}
  </Stage>
);

export const DUR_A7 = [140, 160, 180, 260, 255, 150];

export const Algo7Arboles: React.FC = () => (
  <Capitulo
    parte={7}
    short="algo7"
    serie={SERIE_ALGORITMOS}
    acento={C.green}
    escenas={[
      { nombre: "Gancho", dur: DUR_A7[0], voz: "g1", el: <Gancho /> },
      { nombre: "Partes", dur: DUR_A7[1], voz: "g2", el: <Partes /> },
      { nombre: "Camino", dur: DUR_A7[2], voz: "g3", el: <Camino /> },
      { nombre: "Decisión", dur: DUR_A7[3], voz: "g4", el: <Decision /> },
      { nombre: "Aplicación", dur: DUR_A7[4], voz: "g5", el: <Aplicacion /> },
      {
        nombre: "Avance",
        dur: DUR_A7[5],
        voz: "g6",
        el: (
          <Avance
            parte={8}
            tema="Grafos"
            gancho="¿Tú y tus amigos, un *grafo*?"
          />
        ),
      },
    ]}
  />
);

export const TOTAL_A7 = duracionTotal(DUR_A7);
