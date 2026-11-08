import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Sfx, Stage, Words } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import {
  Capitulo,
  Codigo,
  duracionTotal,
  fmt,
  Nota,
  prog,
  SERIE_ML,
} from "../../kit/serie";
import { AvanceML, ORO, Respuesta, Reto } from "../../kit/ml";
import { Tabla } from "../practica/cafe";
import datos from "../../datos/ml_tronco.json";

// Tronco 1: Entrenamiento y prueba. Números reales de scripts/ml/tronco.py (datos ficticios de Café Datos).
const D = datos.p1;

const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={40}>
      <Words
        text="Si estudias *con* *el* *examen*, sacas 10…"
        size={86}
        stagger={1}
        accent={ORO}
      />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 240,
          color: C.green,
          opacity: prog(frame, 30, 40),
        }}
      >
        10
      </div>
      <Words
        text="…y no aprendiste *nada*"
        size={80}
        delay={55}
        accent={C.coral}
      />
      <Sfx src="pop.wav" at={30} />
    </Stage>
  );
};

const RetoEsc: React.FC = () => (
  <Stage gap={40}>
    <Reto pregunta="¿Le crees a un modelo que se califica con sus propios datos?" />
  </Stage>
);

/** 200 días como cuadritos; los últimos `nTest` se separan. */
const Dias: React.FC<{ sep: number }> = ({ sep }) => {
  const cols = 20;
  return (
    <div style={{ position: "relative", width: 900, height: 470 }}>
      {Array.from({ length: D.n }).map((_, i) => {
        const test = i >= D.n_train;
        const fila = Math.floor(i / cols);
        const col = i % cols;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: col * 44,
              top: fila * 44 + (test ? sep * 50 : 0),
              width: 36,
              height: 36,
              borderRadius: 8,
              background: test ? C.coral : C.blue,
            }}
          />
        );
      })}
    </div>
  );
};

const Separar: React.FC = () => {
  const frame = useCurrentFrame();
  const sep = interpolate(frame, [70, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <Stage gap={30}>
      <Words text={`*${D.n}* días de ventas`} size={88} accent={ORO} />
      <Dias sep={sep} />
      <div
        style={{
          display: "flex",
          gap: 40,
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 54,
          opacity: prog(frame, 90, 105),
        }}
      >
        <span style={{ color: C.blue }}>{D.n_train} entrenar</span>
        <span style={{ color: C.coral }}>{D.n_test} examen</span>
      </div>
      <Nota>Datos ficticios de Café Datos</Nota>
      <Sfx src="whoosh.wav" at={70} volume={0.35} />
    </Stage>
  );
};

const Examen: React.FC = () => (
  <Stage gap={30}>
    <Words text="El modelo *nunca* ve el examen" size={86} accent={C.coral} />
    <Codigo
      lineas={[
        "from sklearn.model_selection import train_test_split",
        "X_tr, X_te, y_tr, y_te = train_test_split(",
        "    X, y, test_size=0.2)",
        "modelo.fit(X_tr, y_tr)",
      ]}
      delay={10}
      size={24}
    />
    <Tabla
      cols={["día de examen", "real", "predicho"]}
      filas={D.ejemplos.map((e, i) => [
        `#${i + 1}`,
        `${e[0]} tazas`,
        `${e[1]} tazas`,
      ])}
      anchos={[330, 270, 280]}
      delay={70}
      size={38}
    />
  </Stage>
);

const Resultado: React.FC = () => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [15, 55], [0, D.mae_test], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <Stage gap={34}>
      <Words text="Error en el examen" size={84} />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 190,
          color: C.green,
        }}
      >
        ± {fmt(v, 1)}
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 52,
          color: C.dim,
        }}
      >
        tazas al día
      </div>
      <div style={{ fontFamily: MONO, fontSize: 30, color: C.dim }}>
        error absoluto medio · modelo entrenado de verdad
      </div>
      <Respuesta texto="solo creo en datos que no vio" delay={75} />
      <Sfx src="ding.wav" at={55} volume={0.4} />
    </Stage>
  );
};

export const DUR_ML1 = [150, 155, 235, 215, 185, 140];

export const ML1Entrenar: React.FC = () => (
  <Capitulo
    parte={1}
    short="ml1"
    serie={SERIE_ML}
    acento={ORO}
    escenas={[
      { nombre: "Gancho", dur: DUR_ML1[0], voz: "b1", el: <Gancho /> },
      { nombre: "Reto", dur: DUR_ML1[1], voz: "b2", el: <RetoEsc /> },
      { nombre: "Separar", dur: DUR_ML1[2], voz: "b3", el: <Separar /> },
      { nombre: "Examen", dur: DUR_ML1[3], voz: "b4", el: <Examen /> },
      { nombre: "Resultado", dur: DUR_ML1[4], voz: "b5", el: <Resultado /> },
      {
        nombre: "Mapa",
        dur: DUR_ML1[5],
        voz: "b6",
        el: <AvanceML actual="T1" siguiente="T2" tema="Sobreajuste" />,
      },
    ]}
  />
);

export const TOTAL_ML1 = duracionTotal(DUR_ML1);
