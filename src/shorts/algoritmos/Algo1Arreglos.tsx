import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Sfx, Stage, Sticker, Words } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
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

// Parte 1: Arreglos. Playlist ilustrativa.
const CANCIONES = ["Intro", "Lluvia", "Noche", "Volver", "Mar", "Final"];
const COLORES = [C.blue, C.green, C.purple, C.yellow, C.coral, C.blue];

/** Fila de cajitas con índice. resaltar = índice destacado; corrimiento = 0..1 (insertar al inicio). */
const Cajas: React.FC<{
  aparicion?: number;
  resaltar?: number;
  corrimiento?: number;
  nueva?: number;
}> = ({ aparicion = 1, resaltar = -1, corrimiento = 0, nueva = 0 }) => {
  const W = 140;
  const G = 10;
  const total = CANCIONES.length + (nueva > 0 ? 1 : 0);
  return (
    <div style={{ position: "relative", width: total * (W + G), height: 260 }}>
      {nueva > 0 ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 30 - 120 * (1 - nueva),
            width: W,
            height: 150,
            borderRadius: 18,
            background: `${C.green}33`,
            border: `5px solid ${C.green}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 30,
            color: C.ink,
            opacity: nueva,
          }}
        >
          Nueva
        </div>
      ) : null}
      {CANCIONES.map((c, i) => {
        const p = interpolate(
          aparicion * CANCIONES.length - i,
          [0, 1],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const x = (i + corrimiento) * (W + G);
        const on = i === resaltar;
        return (
          <div
            key={c}
            style={{
              position: "absolute",
              left: x,
              top: 30,
              opacity: p,
              scale: on ? 1.12 : 0.7 + 0.3 * p,
            }}
          >
            <div
              style={{
                width: W,
                height: 150,
                borderRadius: 18,
                background: on ? COLORES[i] : `${COLORES[i]}33`,
                border: `5px solid ${COLORES[i]}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: FONT,
                fontWeight: 900,
                fontSize: 30,
                color: on ? C.bg : C.ink,
              }}
            >
              {c}
            </div>
            <div
              style={{
                textAlign: "center",
                fontFamily: MONO,
                fontSize: 40,
                color: on ? COLORES[i] : C.dim,
                marginTop: 10,
              }}
            >
              [{i + (corrimiento > 0.5 ? 1 : 0)}]
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={50}>
      <Words
        text="Tu playlist es una *estructura* *de* *datos*"
        size={88}
        stagger={1}
        accent={C.blue}
      />
      <div style={{ scale: 0.95 }}>
        <Cajas aparicion={prog(frame, 20, 70)} />
      </div>
      <Words text="Se llama *arreglo*" size={80} delay={60} accent={C.blue} />
      <Sfx src="pop.wav" at={60} />
    </Stage>
  );
};

const Indices: React.FC = () => (
  <Stage gap={50}>
    <Words
      text="Cada canción vive en una *cajita* *numerada*"
      size={80}
      accent={C.yellow}
    />
    <div style={{ scale: 0.95 }}>
      <Cajas />
    </div>
    <Sticker delay={60} bg={C.yellow}>
      Se cuenta desde el 0
    </Sticker>
    <Nota>Ejemplo simplificado</Nota>
    <Sfx src="pop.wav" at={60} />
  </Stage>
);

const Acceso: React.FC = () => {
  const frame = useCurrentFrame();
  const salto = prog(frame, 40, 55);
  return (
    <Stage gap={40}>
      <Words text="¿Quieres la canción *[3]*?" size={92} accent={C.yellow} />
      <Codigo lineas={["playlist[3]   # → 'Volver'"]} delay={15} size={46} />
      <div style={{ scale: 0.95 }}>
        <Cajas resaltar={salto > 0.5 ? 3 : -1} />
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 80,
          color: C.green,
          opacity: prog(frame, 60, 70),
        }}
      >
        Directo. 1 paso.
      </div>
      <Sfx src="ding.wav" at={50} volume={0.35} />
    </Stage>
  );
};

const Insertar: React.FC = () => {
  const frame = useCurrentFrame();
  const corr = interpolate(frame, [40, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  return (
    <Stage gap={40}>
      <Words text="Pero si metes una al *inicio*…" size={88} accent={C.coral} />
      <div style={{ scale: 0.82 }}>
        <Cajas corrimiento={corr} nueva={prog(frame, 95, 115)} />
      </div>
      <Words
        text="…todas se *recorren* un lugar"
        size={72}
        delay={60}
        accent={C.coral}
      />
      <Sticker delay={130} bg={C.coral} color={C.ink}>
        Con un millón de canciones, se nota
      </Sticker>
      <Sfx src="whoosh.wav" at={40} volume={0.35} />
    </Stage>
  );
};

const Aplicacion: React.FC = () => (
  <Stage gap={30}>
    <Words
      text="Así lo usa un *científico* *de* *datos*"
      size={78}
      accent={C.blue}
    />
    <Tarjeta
      titulo="Cada columna es un arreglo"
      texto="precios, edades, fechas: uno junto al otro en memoria"
      color={C.blue}
      delay={20}
    />
    <Codigo
      lineas={['df["precio"].sum()', "# suma millones de un golpe"]}
      delay={70}
    />
    <Tarjeta
      titulo="NumPy y pandas"
      texto="operan sobre toda la columna a la vez, sin recorrerla una por una"
      color={C.green}
      delay={110}
    />
    <Sfx src="pop.wav" at={20} />
    <Sfx src="pop.wav" at={110} />
  </Stage>
);

export const DUR_A1 = [150, 195, 175, 190, 270, 185];

export const Algo1Arreglos: React.FC = () => (
  <Capitulo
    parte={1}
    short="algo1"
    serie={SERIE_ALGORITMOS}
    acento={C.blue}
    escenas={[
      { nombre: "Gancho", dur: DUR_A1[0], voz: "a1", el: <Gancho /> },
      { nombre: "Índices", dur: DUR_A1[1], voz: "a2", el: <Indices /> },
      { nombre: "Acceso", dur: DUR_A1[2], voz: "a3", el: <Acceso /> },
      { nombre: "Insertar", dur: DUR_A1[3], voz: "a4", el: <Insertar /> },
      { nombre: "Aplicación", dur: DUR_A1[4], voz: "a5", el: <Aplicacion /> },
      {
        nombre: "Avance",
        dur: DUR_A1[5],
        voz: "a6",
        el: (
          <Avance
            parte={2}
            tema="Notación Big O"
            gancho="¿1 segundo o *3* *horas*?"
          />
        ),
      },
    ]}
  />
);

export const TOTAL_A1 = duracionTotal(DUR_A1);
