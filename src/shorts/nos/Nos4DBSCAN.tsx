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
  SERIE_NOS,
} from "../../kit/serie";
import { AvanceML, Respuesta, Reto } from "../../kit/ml";
import { Grande, MOR, Scatter, Sub } from "./comun";
import datos from "../../datos/ml_nosup.json";

const S = "nos4" as const;
const D = datos.u4;
const P = D.puntos as [number, number][];
const Plot: React.FC<{ etiq?: number[]; ap?: number }> = ({ etiq, ap = 1 }) => (
  <Scatter
    pts={P.map(
      ([a, b], i) => [a, b, etiq ? etiq[i] : -1] as [number, number, number],
    )}
    xr={[-1.3, 2.3]}
    yr={[-0.8, 1.3]}
    aparicion={ap}
    r={10}
    colores={[C.coral, C.green]}
    h={520}
  />
);

const Gancho = () => (
  <Stage gap={40}>
    <Words text="K-means *falla* aquí. Mira." size={92} accent={C.coral} />
    <Plot etiq={D.km} />
  </Stage>
);
const RetoE = () => (
  <Stage gap={30}>
    <Reto pregunta="¿Cuántos grupos ves?" />
    <Plot />
    <Nota>Datos sintéticos con forma de luna</Nota>
  </Stage>
);
const Falla = () => (
  <Stage gap={30}>
    <Words text="K-means busca grupos *redondos*" size={84} accent={C.coral} />
    <Plot etiq={D.km} />
    <Grande valor={D.ari_km} suf="%" color={C.coral} size={150} />
    <Sub>de acierto: corta las lunas a la mitad</Sub>
  </Stage>
);
const Densidad = () => {
  const f = useCurrentFrame();
  return (
    <Stage gap={30}>
      <Words text="DBSCAN agrupa por *densidad*" size={84} accent={C.green} />
      <Plot etiq={f > 40 ? D.db : undefined} />
      <Codigo
        lineas={[
          "from sklearn.cluster import DBSCAN",
          "DBSCAN(eps=0.2, min_samples=5)",
        ]}
        delay={50}
        size={28}
      />
      <Sfx src="whoosh.wav" at={40} volume={0.3} />
    </Stage>
  );
};
const Gana = () => (
  <Stage gap={30}>
    <Plot etiq={D.db} />
    <Grande valor={D.ari_db} suf="%" color={C.green} size={170} />
    <Sub>de acierto: las dos lunas, perfectas</Sub>
    <Respuesta texto="2 lunas" delay={70} />
    <Sfx src="ding.wav" at={40} volume={0.35} />
  </Stage>
);

const E = [
  { nombre: "Gancho", voz: "c1", el: <Gancho /> },
  { nombre: "Reto", voz: "c2", el: <RetoE /> },
  { nombre: "Falla", voz: "c3", el: <Falla />, min: 170 },
  { nombre: "Densidad", voz: "c4", el: <Densidad />, min: 170 },
  { nombre: "Gana", voz: "c5", el: <Gana />, min: 170 },
  {
    nombre: "Mapa",
    voz: "c6",
    el: (
      <AvanceML
        actual="U4"
        siguiente="U5"
        tema="Reducir dimensiones"
        color={MOR}
      />
    ),
    min: 150,
  },
];
const ESC = E.map((e) => ({ ...e, dur: durVoz(S, e.voz, e.min ?? 120) }));
export const Nos4DBSCAN: React.FC = () => (
  <Capitulo parte={4} short={S} serie={SERIE_NOS} acento={MOR} escenas={ESC} />
);
export const TOTAL_NOS4 = duracionTotal(ESC.map((e) => e.dur));
