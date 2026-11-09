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
  SERIE_SUP,
} from "../../kit/serie";
import { AvanceML, MORADO, Respuesta, Reto } from "../../kit/ml";
import { ESPECIE, FuentePinguinos, Pinguino } from "../../kit/pinguinos";
import { Grande, NAR } from "./comun";
import datos from "../../datos/ml_sup.json";

const D = datos.s8;
const S = "sup8" as const;
const [pl, pg, al, pe] = D.nuevo;

const Pasos: React.FC<{ activo: number }> = ({ activo }) => (
  <div
    style={{
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      justifyContent: "center",
      width: 900,
    }}
  >
    {[
      "cargar",
      "limpiar",
      "separar",
      "escalar",
      "entrenar",
      "evaluar",
      "predecir",
    ].map((t, i) => (
      <span
        key={t}
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 34,
          color: i <= activo ? C.bg : C.dim,
          background: i <= activo ? NAR : C.bg2,
          borderRadius: 16,
          padding: "8px 18px",
        }}
      >
        {i + 1}. {t}
      </span>
    ))}
  </div>
);

const Gancho = () => (
  <Stage gap={40}>
    <Words
      text="De datos crudos a una *predicción*"
      size={88}
      stagger={1}
      accent={NAR}
    />
    <Pasos activo={-1} />
  </Stage>
);
const RetoE = () => (
  <Stage gap={30}>
    <Reto pregunta="¿De qué especie es un pingüino que nadie ha visto?" />
    <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
      <Pinguino color={NAR} size={170} />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 38,
          color: C.ink,
          lineHeight: 1.5,
        }}
      >
        pico {pl} mm · grosor {pg} mm
        <br />
        aleta {al} mm · peso {pe} g
      </div>
    </div>
  </Stage>
);
const Limpiar = () => {
  const f = useCurrentFrame();
  return (
    <Stage gap={30}>
      <Pasos activo={1} />
      <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
        <Grande valor={D.n_crudo} color={C.dim} size={140} />
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 80,
            color: NAR,
          }}
        >
          →
        </div>
        <Grande valor={D.n_limpio} color={C.green} size={140} delay={50} />
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 40,
          color: C.dim,
          opacity: prog(f, 60, 70),
        }}
      >
        {D.n_crudo - D.n_limpio} pingüinos con medidas faltantes
      </div>
      <Codigo
        lineas={[
          "from palmerpenguins import load_penguins",
          "df = load_penguins().dropna()",
        ]}
        delay={20}
        size={32}
      />
      <FuentePinguinos />
    </Stage>
  );
};
const Entrenar = () => (
  <Stage gap={30}>
    <Pasos activo={4} />
    <Codigo
      lineas={[
        "X_tr, X_te, y_tr, y_te = train_test_split(X, y)",
        "modelo = make_pipeline(StandardScaler(),",
        "    RandomForestClassifier(n_estimators=100))",
        "modelo.fit(X_tr, y_tr)",
      ]}
      delay={10}
      size={24}
    />
    <div
      style={{
        display: "flex",
        gap: 30,
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: 50,
      }}
    >
      <span style={{ color: C.blue }}>{D.n_train} entrenar</span>
      <span style={{ color: C.coral }}>{D.n_test} examen</span>
    </div>
  </Stage>
);
const Resultado = () => {
  const f = useCurrentFrame();
  const e = ESPECIE[D.pred];
  return (
    <Stage gap={30}>
      <Pasos activo={6} />
      <Grande valor={D.acc} dec={1} suf="%" color={C.green} size={170} />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 44,
          color: C.dim,
        }}
      >
        en el examen
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          opacity: prog(f, 80, 95),
        }}
      >
        <Pinguino color={e.color} size={130} />
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 90,
            color: e.color,
          }}
        >
          {e.nombre}
        </div>
      </div>
      <Respuesta texto={e.nombre} delay={110} />
      <Sfx src="ding.wav" at={85} volume={0.4} />
    </Stage>
  );
};

const E = [
  { nombre: "Gancho", voz: "h1", el: <Gancho /> },
  { nombre: "Reto", voz: "h2", el: <RetoE />, min: 150 },
  { nombre: "Cargar y limpiar", voz: "h3", el: <Limpiar />, min: 180 },
  { nombre: "Entrenar", voz: "h4", el: <Entrenar /> },
  { nombre: "Resultado", voz: "h5", el: <Resultado />, min: 200 },
  {
    nombre: "Mapa",
    voz: "h6",
    el: (
      <AvanceML
        actual="S8"
        siguiente="U1"
        tema="Aprendizaje NO supervisado"
        color={MORADO}
      />
    ),
    min: 160,
  },
];
const ESC = E.map((e) => ({ ...e, dur: durVoz(S, e.voz, e.min ?? 120) }));
export const Sup8Proyecto: React.FC = () => (
  <Capitulo parte={8} short={S} serie={SERIE_SUP} acento={NAR} escenas={ESC} />
);
export const TOTAL_SUP8 = duracionTotal(ESC.map((e) => e.dur));
