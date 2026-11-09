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
import { AvanceML, Respuesta, Reto } from "../../kit/ml";
import { FuentePinguinos } from "../../kit/pinguinos";
import { NAR } from "./comun";
import datos from "../../datos/ml_sup.json";

const D = datos.s4;
const S = "sup4" as const;

const Arbolito: React.FC<{ size?: number; color?: string; op?: number }> = ({
  size = 70,
  color = C.green,
  op = 1,
}) => (
  <svg width={size} height={size} viewBox="0 0 40 40" style={{ opacity: op }}>
    <rect x={18} y={26} width={4} height={12} fill="#8a5a3c" />
    <path d="M20 2 L36 28 L4 28 Z" fill={color} />
  </svg>
);

/** 84 pingüinos de prueba: cuadritos, los errores en rojo. */
const Examen: React.FC<{ errores: number; p: number }> = ({ errores, p }) => (
  <div
    style={{ display: "grid", gridTemplateColumns: "repeat(12, 58px)", gap: 8 }}
  >
    {Array.from({ length: D.n_test }).map((_, i) => {
      const err = i >= D.n_test - errores;
      return (
        <div
          key={i}
          style={{
            width: 58,
            height: 58,
            borderRadius: 10,
            background: err && p > 0.5 ? C.coral : C.green,
            opacity: prog(p * 100, i * 0.8, i * 0.8 + 10),
          }}
        />
      );
    })}
  </div>
);

const Gancho = () => (
  <Stage gap={40}>
    <Arbolito size={220} />
    <Words
      text="Un árbol se equivoca. *100* *árboles* votan."
      size={84}
      stagger={1}
      accent={NAR}
    />
  </Stage>
);
const RetoE = () => (
  <Stage>
    <Reto pregunta="¿Quién se equivoca menos: un árbol o un bosque?" />
  </Stage>
);
const Uno = () => {
  const f = useCurrentFrame();
  return (
    <Stage gap={30}>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <Arbolito size={130} />
        <Words text="1 árbol de decisión" size={76} />
      </div>
      <Examen errores={D.errores_arbol} p={prog(f, 10, 80)} />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 70,
          color: C.coral,
          opacity: prog(f, 80, 95),
        }}
      >
        {D.errores_arbol} errores de {D.n_test}
      </div>
      <FuentePinguinos />
    </Stage>
  );
};
const Bosque = () => {
  const f = useCurrentFrame();
  return (
    <Stage gap={24}>
      <Words
        text="Bosque *aleatorio*: 100 árboles votan"
        size={78}
        accent={NAR}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(20, 40px)",
          gap: 4,
        }}
      >
        {Array.from({ length: 100 }).map((_, i) => (
          <Arbolito
            key={i}
            size={40}
            color={i % 7 === 0 ? NAR : C.green}
            op={prog(f, 5 + i * 0.4, 10 + i * 0.4)}
          />
        ))}
      </div>
      <Examen errores={D.errores_bosque} p={prog(f, 60, 120)} />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 70,
          color: C.green,
          opacity: prog(f, 120, 135),
        }}
      >
        solo {D.errores_bosque} errores
      </div>
      <Respuesta texto="el bosque" delay={140} />
      <Sfx src="ding.wav" at={125} volume={0.35} />
    </Stage>
  );
};
const Importa = () => {
  const f = useCurrentFrame();
  const imp = D.importancia as Record<string, number>;
  return (
    <Stage gap={26}>
      <Words text="¿Qué *importa* más?" size={92} accent={NAR} />
      {Object.entries(imp).map(([k, v], i) => (
        <div
          key={k}
          style={{
            width: 860,
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 44,
          }}
        >
          <span style={{ width: 290, color: C.ink }}>{k}</span>
          <div
            style={{
              flex: 1,
              height: 56,
              background: C.bg2,
              borderRadius: 28,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${v * 2 * prog(f, 10 + i * 8, 40 + i * 8)}%`,
                height: "100%",
                background: i < 2 ? NAR : C.dim,
              }}
            />
          </div>
          <span style={{ width: 100, color: C.dim }}>{v}%</span>
        </div>
      ))}
      <Codigo
        lineas={[
          "from sklearn.ensemble import RandomForestClassifier",
          "RandomForestClassifier(n_estimators=100)",
        ]}
        delay={50}
        size={24}
      />
    </Stage>
  );
};

const E = [
  { nombre: "Gancho", voz: "d1", el: <Gancho /> },
  { nombre: "Reto", voz: "d2", el: <RetoE /> },
  { nombre: "Un árbol", voz: "d3", el: <Uno />, min: 170 },
  { nombre: "Bosque", voz: "d4", el: <Bosque />, min: 220 },
  { nombre: "Importancia", voz: "d5", el: <Importa />, min: 150 },
  {
    nombre: "Mapa",
    voz: "d6",
    el: (
      <AvanceML
        actual="S4"
        siguiente="S5"
        tema="¿Qué tan bueno es?"
        color={NAR}
      />
    ),
    min: 160,
  },
];
const ESC = E.map((e) => ({ ...e, dur: durVoz(S, e.voz, e.min ?? 120) }));
export const Sup4Bosque: React.FC = () => (
  <Capitulo
    parte={4}
    short={S}
    serie={SERIE_SUP}
    acento={C.green}
    escenas={ESC}
  />
);
export const TOTAL_SUP4 = duracionTotal(ESC.map((e) => e.dur));
