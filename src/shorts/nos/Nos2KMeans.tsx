import React from "react";
import { useCurrentFrame } from "remotion";
import { Sfx, Stage, Words } from "../../kit/kit";
import { C, FONT } from "../../kit/theme";
import {
  Capitulo,
  Codigo,
  duracionTotal,
  durVoz,
  Nota,
  prog,
  SERIE_NOS,
  Tarjeta,
} from "../../kit/serie";
import { AvanceML, Respuesta, Reto } from "../../kit/ml";
import { G, MOR, Scatter } from "./comun";
import datos from "../../datos/ml_nosup.json";

const S = "nos2" as const;
const D = datos.u2;
const PTS = D.puntos as [number, number][];
const Plot: React.FC<{ paso: number; centros?: boolean; ap?: number }> = ({
  paso,
  centros = true,
  ap = 1,
}) => {
  const st = D.pasos[Math.max(0, Math.min(paso, D.pasos.length - 1))];
  const pts = PTS.map(
    ([a, b], i) =>
      [a, b, paso < 0 ? -1 : st.lab[i]] as [number, number, number],
  );
  return (
    <Scatter
      pts={pts}
      xr={[0, 17]}
      yr={[20, 190]}
      xl="visitas al mes →"
      yl="ticket promedio ($) →"
      aparicion={ap}
      extra={(x, y) =>
        centros && paso >= 0
          ? st.centros.map(([a, b], k) => (
              <g key={k}>
                <circle
                  cx={x(a)}
                  cy={y(b)}
                  r={30}
                  fill="#fff"
                  stroke={G[k]}
                  strokeWidth={8}
                />
                <text
                  x={x(a)}
                  y={y(b) + 11}
                  fill={C.bg}
                  fontFamily={FONT}
                  fontWeight={900}
                  fontSize={30}
                  textAnchor="middle"
                >
                  ✕
                </text>
              </g>
            ))
          : null
      }
    />
  );
};

const Gancho = () => (
  <Stage gap={40}>
    <Words
      text="¿Cuántos *tipos* de cliente tiene tu café?"
      size={88}
      stagger={1}
      accent={MOR}
    />
    <Plot paso={-1} />
  </Stage>
);
const RetoE = () => (
  <Stage gap={30}>
    <Reto pregunta="Mira los clientes. ¿Ves los grupos?" />
    <Plot paso={-1} />
    <Nota>Clientes ficticios de Café Datos</Nota>
  </Stage>
);
const Inicio = () => (
  <Stage gap={30}>
    <Words text="3 centros al *azar*" size={92} accent={MOR} />
    <Plot paso={0} />
    <Sfx src="pop.wav" at={10} />
  </Stage>
);
const Mueve = () => {
  const f = useCurrentFrame();
  const paso = Math.floor(prog(f, 10, 150) * (D.pasos.length - 1));
  return (
    <Stage gap={30}>
      <Words
        text="Los centros se *mueven*… y se repite"
        size={84}
        accent={MOR}
      />
      <Plot paso={paso} />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 56,
          color: C.ink,
        }}
      >
        ronda {paso + 1}
      </div>
      {[1, 2, 3, 4].map((k) => (
        <Sfx key={k} src="tick.wav" at={10 + k * 20} volume={0.3} />
      ))}
    </Stage>
  );
};
const NOMBRES = ["frecuentes", "ticket alto", "ocasionales"];
const Resultado = () => (
  <Stage gap={22}>
    
    {D.centros.map(([v, t], k) => (
      <Tarjeta
        key={k}
        titulo={`${NOMBRES[k]} (${D.tam[k]})`}
        texto={`~${v} visitas/mes · ticket ~$${Math.round(t)}`}
        color={G[k]}
        delay={20 + k * 15}
      />
    ))}
    <Codigo
      lineas={[
        "from sklearn.cluster import KMeans",
        "KMeans(n_clusters=3).fit(clientes)",
      ]}
      delay={80}
      size={26}
    />
    <Respuesta texto="3 tipos" delay={120} />
  </Stage>
);

const E = [
  { nombre: "Gancho", voz: "b1", el: <Gancho /> },
  { nombre: "Reto", voz: "b2", el: <RetoE />, min: 150 },
  { nombre: "Inicio", voz: "b3", el: <Inicio /> },
  { nombre: "Se mueven", voz: "b4", el: <Mueve />, min: 190 },
  { nombre: "Resultado", voz: "b5", el: <Resultado />, min: 230 },
  {
    nombre: "Mapa",
    voz: "b6",
    el: (
      <AvanceML
        actual="U2"
        siguiente="U3"
        tema="¿Cuántos grupos?"
        color={MOR}
      />
    ),
    min: 150,
  },
];
const ESC = E.map((e) => ({ ...e, dur: durVoz(S, e.voz, e.min ?? 120) }));
export const Nos2KMeans: React.FC = () => (
  <Capitulo parte={2} short={S} serie={SERIE_NOS} acento={MOR} escenas={ESC} />
);
export const TOTAL_NOS2 = duracionTotal(ESC.map((e) => e.dur));
