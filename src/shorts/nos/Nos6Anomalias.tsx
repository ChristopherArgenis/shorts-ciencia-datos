import React from "react";
import { useCurrentFrame } from "remotion";
import { Sfx, Stage, Words } from "../../kit/kit";
import { C } from "../../kit/theme";
import {
  Capitulo,
  Codigo,
  duracionTotal,
  durVoz,
  Nota,
  prog,
  SERIE_NOS,
} from "../../kit/serie";
import { AvanceML, Respuesta, Reto } from "../../kit/ml";
import { Grande, MOR, Scatter, Sub } from "./comun";
import datos from "../../datos/ml_nosup.json";

const S = "nos6" as const;
const D = datos.u6;
const PTS = D.puntos as [number, number, number][];
const Plot: React.FC<{ marcar?: number }> = ({ marcar = 0 }) => (
  <Scatter
    pts={PTS.map(
      ([a, b, f]) =>
        [a, b, marcar > 0 && f ? 0 : -1] as [number, number, number],
    )}
    xr={[1.6, 4.3]}
    yr={[0, 24]}
    xl="monto (escala log) →"
    yl="hora del día →"
    r={9}
    colores={[C.coral]}
  />
);

const Gancho = () => (
  <Stage gap={40}>
    <Words
      text="Una compra rara entre *2,000*. Nadie la marcó."
      size={86}
      stagger={1}
      accent={C.coral}
    />
    <Plot />
  </Stage>
);
const RetoE = () => (
  <Stage>
    <Reto pregunta="¿Puede encontrar fraudes sin ejemplos de fraude?" />
  </Stage>
);
const Aisla = () => {
  const f = useCurrentFrame();
  const cortes = Math.floor(prog(f, 20, 120) * 6);
  return (
    <Stage gap={30}>
      <Words text="Bosque de *aislamiento*" size={88} accent={MOR} />
      <Scatter
        pts={PTS.map(([a, b]) => [a, b, -1] as [number, number, number])}
        xr={[1.6, 4.3]}
        yr={[0, 24]}
        r={9}
        extra={(x, y) => (
          <g>
            {[
              [3.5, 0],
              [3.5, 1],
              [0, 6],
              [3.9, 0],
              [0, 4],
              [3.7, 1],
            ]
              .slice(0, cortes)
              .map(([v, eje], i) =>
                eje === 0 ? (
                  <line
                    key={i}
                    x1={x(v)}
                    y1={y(0)}
                    x2={x(v)}
                    y2={y(24)}
                    stroke={MOR}
                    strokeWidth={5}
                  />
                ) : (
                  <line
                    key={i}
                    x1={x(1.6)}
                    y1={y(v || 6)}
                    x2={x(4.3)}
                    y2={y(v || 6)}
                    stroke={MOR}
                    strokeWidth={5}
                  />
                ),
              )}
          </g>
        )}
      />
      <Sub color={C.ink}>lo raro queda solo en pocos cortes</Sub>
    </Stage>
  );
};
const Escondidas = () => (
  <Stage gap={30}>
    <Words text="Escondimos *12* compras extrañas" size={86} accent={C.coral} />
    <Plot />
    <Nota>Transacciones ficticias · modelo entrenado de verdad</Nota>
  </Stage>
);
const Resultado = () => {
  const f = useCurrentFrame();
  return (
    <Stage gap={30}>
      <Plot marcar={f > 20 ? 1 : 0} />
      <Grande
        valor={D.atrapadas}
        suf={` de ${D.n_anom}`}
        color={C.green}
        size={160}
        delay={25}
      />
      <Sub>encontradas entre {D.marcadas} sospechosas</Sub>
      <Codigo
        lineas={[
          "from sklearn.ensemble import IsolationForest",
          "IsolationForest(contamination=0.01)",
        ]}
        delay={60}
        size={28}
      />
      <Respuesta texto="sí, sin etiquetas" delay={100} />
      <Sfx src="ding.wav" at={40} volume={0.35} />
    </Stage>
  );
};

const E = [
  { nombre: "Gancho", voz: "f1", el: <Gancho /> },
  { nombre: "Reto", voz: "f2", el: <RetoE /> },
  { nombre: "Aislar", voz: "f3", el: <Aisla />, min: 190 },
  { nombre: "Escondidas", voz: "f4", el: <Escondidas /> },
  { nombre: "Resultado", voz: "f5", el: <Resultado />, min: 190 },
  {
    nombre: "Mapa",
    voz: "f6",
    el: (
      <AvanceML
        actual="U6"
        siguiente="U7"
        tema="Reglas de asociación"
        color={MOR}
      />
    ),
    min: 150,
  },
];
const ESC = E.map((e) => ({ ...e, dur: durVoz(S, e.voz, e.min ?? 120) }));
export const Nos6Anomalias: React.FC = () => (
  <Capitulo
    parte={6}
    short={S}
    serie={SERIE_NOS}
    acento={C.coral}
    escenas={ESC}
  />
);
export const TOTAL_NOS6 = duracionTotal(ESC.map((e) => e.dur));
