import React from "react";
import { Sfx, Stage, Words } from "../../kit/kit";
import { C } from "../../kit/theme";
import { Capitulo, duracionTotal, durVoz, SERIE_SUP } from "../../kit/serie";
import { AvanceML, Respuesta, Reto } from "../../kit/ml";
import { FuentePinguinos, Pinguino } from "../../kit/pinguinos";
import { Tabla } from "../practica/cafe";
import { Grande, NAR, Sub } from "./comun";
import datos from "../../datos/ml_sup.json";

const D = datos.s1;
const S = "sup1" as const;

const Gancho = () => (
  <Stage gap={36}>
    <Pinguino color={NAR} size={200} />
    <Words
      text="¿Cuánto *pesa*? ¿De qué *especie* es?"
      size={86}
      stagger={1}
      accent={NAR}
    />
  </Stage>
);
const RetoE = () => (
  <Stage>
    <Reto pregunta="¿Qué es más fácil de adivinar: el peso o la especie?" />
  </Stage>
);
const Regresion = () => (
  <Stage gap={30}>
    <Words text="Respuesta = *número* → regresión" size={80} accent={NAR} />
    <Sub>error al predecir el peso</Sub>
    <Grande valor={D.mae_peso} pre="± " suf=" g" />
    <FuentePinguinos />
  </Stage>
);
const Clasificacion = () => (
  <Stage gap={30}>
    <Words
      text="Respuesta = *categoría* → clasificación"
      size={78}
      accent={C.green}
    />
    <Sub>aciertos al adivinar la especie</Sub>
    <Grande valor={D.acc_especie} dec={1} suf="%" color={C.green} />
    <Respuesta texto="la especie" delay={70} />
    <Sfx src="ding.wav" at={50} volume={0.35} />
  </Stage>
);
const Supervisado = () => (
  <Stage gap={30}>
    <Words text="Aprendió *con* *respuestas*" size={88} accent={NAR} />
    <Tabla
      cols={["pico", "aleta", "peso", "especie ✓"]}
      filas={[
        ["39.1", "181", "3750", "Adelia"],
        ["46.5", "192", "3500", "Barbijo"],
        ["50.0", "220", "5400", "Papúa"],
      ]}
      anchos={[180, 180, 200, 320]}
      celdaColor={{ "0,3": NAR, "1,3": NAR, "2,3": NAR }}
      delay={20}
      size={38}
    />
    <Sub color={NAR}>la columna de respuestas = etiquetas</Sub>
    <FuentePinguinos />
  </Stage>
);

const E = [
  { nombre: "Gancho", voz: "a1", el: <Gancho /> },
  { nombre: "Reto", voz: "a2", el: <RetoE /> },
  { nombre: "Regresión", voz: "a3", el: <Regresion /> },
  { nombre: "Clasificación", voz: "a4", el: <Clasificacion /> },
  { nombre: "Supervisado", voz: "a5", el: <Supervisado /> },
  {
    nombre: "Mapa",
    voz: "a6",
    el: <AvanceML actual="S1" siguiente="S2" tema="K vecinos" color={NAR} />,
    min: 150,
  },
];
const ESC = E.map((e) => ({ ...e, dur: durVoz(S, e.voz, e.min ?? 120) }));
export const Sup1Tipos: React.FC = () => (
  <Capitulo parte={1} short={S} serie={SERIE_SUP} acento={NAR} escenas={ESC} />
);
export const TOTAL_SUP1 = duracionTotal(ESC.map((e) => e.dur));
