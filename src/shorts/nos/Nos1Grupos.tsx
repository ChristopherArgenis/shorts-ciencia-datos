import React from "react";
import { useCurrentFrame } from "remotion";
import { Sfx, Stage, Words } from "../../kit/kit";
import { C } from "../../kit/theme";
import {
  Capitulo,
  duracionTotal,
  durVoz,
  prog,
  SERIE_NOS,
} from "../../kit/serie";
import { AvanceML, Reto } from "../../kit/ml";
import { FuentePinguinos } from "../../kit/pinguinos";
import { MOR, Scatter, Sub } from "./comun";
import datos from "../../datos/ml_nosup.json";

const S = "nos1" as const;
const P = datos.u1.puntos as [number, number, number][];
const gris = P.map(([a, b]) => [a, b, -1] as [number, number, number]);
const Plot: React.FC<{ color?: boolean; ap?: number }> = ({
  color = false,
  ap = 1,
}) => (
  <Scatter
    pts={color ? P : gris}
    xr={[32, 60]}
    yr={[13, 22]}
    xl="largo del pico →"
    yl="grosor del pico →"
    aparicion={ap}
  />
);

const Gancho = () => (
  <Stage gap={40}>
    <Words
      text="Nadie le dijo qué buscar… y encontró *3* *grupos*"
      size={84}
      stagger={1}
      accent={MOR}
    />
    <Plot color />
  </Stage>
);
const RetoE = () => (
  <Stage gap={30}>
    <Reto pregunta="Sin saber la especie, ¿cuántos grupos ves?" />
    <Plot />
  </Stage>
);
const SinResp = () => {
  const f = useCurrentFrame();
  return (
    <Stage gap={30}>
      <Words text="Sin *respuestas*. Solo datos." size={88} accent={MOR} />
      <Plot ap={prog(f, 10, 60)} />
      <FuentePinguinos />
    </Stage>
  );
};
const Agrupa = () => {
  const f = useCurrentFrame();
  return (
    <Stage gap={30}>
      <Words text="Agrupa lo que se *parece*" size={88} accent={MOR} />
      <Plot color={f > 40} />
      <Sub color={C.ink}>
        {f > 40 ? "3 grupos encontrados" : "buscando parecidos…"}
      </Sub>
      <Sfx src="ding.wav" at={40} volume={0.35} />
    </Stage>
  );
};
const Final = () => (
  <Stage gap={30}>
    <Words
      text="¿Coinciden con las *especies* reales?"
      size={84}
      accent={C.green}
    />
    <Plot color />
    <Sub color={C.green}>La respuesta, en el Gran Final</Sub>
  </Stage>
);

const E = [
  { nombre: "Gancho", voz: "a1", el: <Gancho /> },
  { nombre: "Reto", voz: "a2", el: <RetoE />, min: 150 },
  { nombre: "Sin respuestas", voz: "a3", el: <SinResp />, min: 150 },
  { nombre: "Agrupa", voz: "a4", el: <Agrupa />, min: 180 },
  { nombre: "¿Coinciden?", voz: "a5", el: <Final /> },
  {
    nombre: "Mapa",
    voz: "a6",
    el: <AvanceML actual="U1" siguiente="U2" tema="K-means" color={MOR} />,
    min: 150,
  },
];
const ESC = E.map((e) => ({ ...e, dur: durVoz(S, e.voz, e.min ?? 120) }));
export const Nos1Grupos: React.FC = () => (
  <Capitulo parte={1} short={S} serie={SERIE_NOS} acento={MOR} escenas={ESC} />
);
export const TOTAL_NOS1 = duracionTotal(ESC.map((e) => e.dur));
