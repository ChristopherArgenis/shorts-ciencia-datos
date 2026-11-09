import React from "react";
import { useCurrentFrame } from "remotion";
import { Sfx, Stage, Words } from "../../kit/kit";
import { C, FONT } from "../../kit/theme";
import {
  Capitulo,
  Codigo,
  duracionTotal,
  durVoz,
  prog,
  SERIE_NOS,
} from "../../kit/serie";
import { AvanceML, Respuesta, Reto } from "../../kit/ml";
import {
  ESPECIE,
  FuentePinguinos,
  Leyenda,
  Pinguino,
} from "../../kit/pinguinos";
import { Grande, MOR, Scatter } from "./comun";
import datos from "../../datos/ml_nosup.json";

const S = "nos5" as const;
const D = datos.u5;
const ORDEN = ["Adelie", "Gentoo", "Chinstrap"];
const P = (D.puntos as [number, number, string][]).map(
  ([a, b, s]) => [a, b, ORDEN.indexOf(s)] as [number, number, number],
);
const COL = ORDEN.map((s) => ESPECIE[s].color);

const Gancho = () => (
  <Stage gap={30}>
    <Words
      text="Tu *sombra* es un resumen de ti en 2D"
      size={86}
      stagger={1}
      accent={MOR}
    />
    <svg width={500} height={500} viewBox="0 0 100 100">
      <ellipse cx={50} cy={88} rx={34} ry={6} fill="#000" opacity={0.5} />
      <circle cx={50} cy={22} r={10} fill={MOR} />
      <path d="M34 72 L40 36 L60 36 L66 72 Z" fill={MOR} />
    </svg>
  </Stage>
);
const RetoE = () => (
  <Stage>
    <Reto pregunta="¿Se puede ver algo de 4 dimensiones en una pantalla?" />
  </Stage>
);
const Cuatro = () => {
  const f = useCurrentFrame();
  return (
    <Stage gap={30}>
      <Pinguino color={MOR} size={170} />
      {["largo del pico", "grosor del pico", "aleta", "peso"].map((t, i) => (
        <div
          key={t}
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 52,
            color: C.ink,
            opacity: prog(f, 10 + i * 10, 20 + i * 10),
          }}
        >
          {i + 1}. {t}
        </div>
      ))}
      <FuentePinguinos />
    </Stage>
  );
};
const Proyecta = () => {
  const f = useCurrentFrame();
  return (
    <Stage gap={26}>
      <Words text="PCA: la *sombra* mejor elegida" size={84} accent={MOR} />
      <Scatter
        pts={P}
        xr={[-3.5, 3.5]}
        yr={[-3, 3]}
        xl="componente 1 →"
        yl="componente 2 →"
        aparicion={prog(f, 20, 90)}
        colores={COL}
      />
      <Leyenda />
    </Stage>
  );
};
const Varianza = () => (
  <Stage gap={30}>
    <Grande valor={D.var_total} suf="%" size={200} />
    <div
      style={{ fontFamily: FONT, fontWeight: 800, fontSize: 46, color: C.dim }}
    >
      de la información, en solo 2 ejes
    </div>
    <div
      style={{
        display: "flex",
        gap: 30,
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: 46,
      }}
    >
      <span style={{ color: MOR }}>eje 1: {D.var[0]}%</span>
      <span style={{ color: C.blue }}>eje 2: {D.var[1]}%</span>
    </div>
    <Codigo
      lineas={[
        "from sklearn.decomposition import PCA",
        "PCA(n_components=2).fit_transform(X)",
      ]}
      delay={50}
      size={28}
    />
    <Respuesta texto="sí, como una sombra" delay={100} />
    <Sfx src="ding.wav" at={40} volume={0.35} />
  </Stage>
);

const E = [
  { nombre: "Gancho", voz: "e1", el: <Gancho /> },
  { nombre: "Reto", voz: "e2", el: <RetoE /> },
  { nombre: "4 medidas", voz: "e3", el: <Cuatro /> },
  { nombre: "Proyecta", voz: "e4", el: <Proyecta />, min: 200 },
  { nombre: "Varianza", voz: "e5", el: <Varianza />, min: 200 },
  {
    nombre: "Mapa",
    voz: "e6",
    el: (
      <AvanceML
        actual="U5"
        siguiente="U6"
        tema="Detectar anomalías"
        color={MOR}
      />
    ),
    min: 150,
  },
];
const ESC = E.map((e) => ({ ...e, dur: durVoz(S, e.voz, e.min ?? 120) }));
export const Nos5PCA: React.FC = () => (
  <Capitulo parte={5} short={S} serie={SERIE_NOS} acento={MOR} escenas={ESC} />
);
export const TOTAL_NOS5 = duracionTotal(ESC.map((e) => e.dur));
