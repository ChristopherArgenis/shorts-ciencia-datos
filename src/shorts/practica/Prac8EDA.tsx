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
  SERIE_PRACTICA,
} from "../../kit/serie";

// Parte 8: Análisis exploratorio (EDA). Datos ficticios de Café Datos.
const RANGOS = ["0-50", "50-100", "100-150", "150-200", "200+"];
const CONTEO = [180, 640, 210, 60, 25];
const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const PRODUCTOS = ["Latte", "Americano", "Pan dulce"];
const MAPA = [
  [40, 45, 46, 48, 60, 85, 80],
  [35, 40, 41, 42, 50, 62, 58],
  [4, 30, 32, 35, 45, 70, 66],
];

const Gancho: React.FC = () => (
  <Stage gap={40}>
    <Words
      text="Antes de concluir… *mira* tus datos"
      size={92}
      stagger={1}
      accent={C.green}
    />
    <svg width={300} height={200} viewBox="0 0 100 66">
      <ellipse
        cx={50}
        cy={33}
        rx={46}
        ry={28}
        fill="none"
        stroke={C.green}
        strokeWidth={5}
      />
      <circle cx={50} cy={33} r={14} fill={C.green} />
      <circle cx={50} cy={33} r={6} fill={C.bg} />
    </svg>
  </Stage>
);

const Preguntas: React.FC = () => (
  <Stage gap={30}>
    <Words
      text="*Explorar*: hacerle preguntas a los datos"
      size={84}
      stagger={1}
      accent={C.yellow}
    />
    {[
      "¿Cuánto gasta la gente?",
      "¿Qué se vende y cuándo?",
      "¿Hay algo raro?",
    ].map((q, i) => (
      <div
        key={q}
        style={{
          width: 820,
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 54,
          color: C.ink,
          background: C.bg2,
          borderRadius: 24,
          padding: "22px 30px",
          borderLeft: `12px solid ${[C.green, C.blue, C.coral][i]}`,
        }}
      >
        {q}
      </div>
    ))}
    <Nota>Con gráficas, no solo con números</Nota>
  </Stage>
);

const Histograma: React.FC = () => {
  const frame = useCurrentFrame();
  const mx = Math.max(...CONTEO);
  return (
    <Stage gap={30}>
      <Words
        text="Un *histograma*: ¿cuánto gasta la gente?"
        size={80}
        stagger={1}
        accent={C.green}
      />
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 16,
          height: 480,
        }}
      >
        {CONTEO.map((v, i) => {
          const h = interpolate(
            frame,
            [20 + i * 6, 55 + i * 6],
            [0, 420 * (v / mx)],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            },
          );
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 150,
                  height: h,
                  borderRadius: 12,
                  background: i === 1 ? C.green : C.blue,
                }}
              />
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 30,
                  color: i === 1 ? C.green : C.dim,
                }}
              >
                ${RANGOS[i]}
              </div>
            </div>
          );
        })}
      </div>
      <Codigo lineas={['df["total"].hist()']} delay={60} size={40} />
      <Nota>Tickets ficticios de un mes</Nota>
    </Stage>
  );
};

const Mapa: React.FC = () => {
  const frame = useCurrentFrame();
  const S = 108;
  const mx = 85;
  const foco = frame > 90;
  return (
    <Stage gap={26}>
      <Words text="Cruza *producto* y *día*…" size={86} accent={C.yellow} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `200px repeat(7, ${S}px)`,
          gap: 6,
          fontFamily: FONT,
          fontWeight: 900,
        }}
      >
        <div />
        {DIAS.map((d) => (
          <div
            key={d}
            style={{ textAlign: "center", fontSize: 30, color: C.dim }}
          >
            {d}
          </div>
        ))}
        {PRODUCTOS.map((p, i) => (
          <React.Fragment key={p}>
            <div style={{ fontSize: 34, color: C.ink, alignSelf: "center" }}>
              {p}
            </div>
            {MAPA[i].map((v, j) => {
              const raro = i === 2 && j === 0;
              return (
                <div
                  key={j}
                  style={{
                    height: 100,
                    borderRadius: 12,
                    background: `rgba(61,220,132,${(0.15 + 0.85 * (v / mx)) * prog(frame, 10 + (i * 7 + j), 25 + (i * 7 + j))})`,
                    outline: raro && foco ? `6px solid ${C.coral}` : "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: MONO,
                    fontSize: 28,
                    color: v > 50 ? C.bg : C.ink,
                  }}
                >
                  {v}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      <Sticker delay={95} bg={C.coral} color={C.ink}>
        Lunes: casi no se vende pan dulce
      </Sticker>
      <Nota>Piezas vendidas por día (ficticio)</Nota>
      <Sfx src="ding.wav" at={92} volume={0.4} />
    </Stage>
  );
};

const Preguntas2: React.FC = () => (
  <Stage gap={40}>
    <Words text="Explorar no da respuestas finales…" size={80} />
    <Words text="da buenas *preguntas*" size={96} delay={30} accent={C.green} />
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: 110,
        color: C.coral,
      }}
    >
      ¿Por qué los lunes?
    </div>
    <Sfx src="pop.wav" at={30} />
  </Stage>
);

export const DUR_P8 = [120, 175, 210, 195, 175, 130];

export const Prac8EDA: React.FC = () => (
  <Capitulo
    parte={8}
    short="prac8"
    serie={SERIE_PRACTICA}
    acento={C.blue}
    escenas={[
      { nombre: "Gancho", dur: DUR_P8[0], voz: "u1", el: <Gancho /> },
      { nombre: "Preguntas", dur: DUR_P8[1], voz: "u2", el: <Preguntas /> },
      { nombre: "Histograma", dur: DUR_P8[2], voz: "u3", el: <Histograma /> },
      { nombre: "Mapa", dur: DUR_P8[3], voz: "u4", el: <Mapa /> },
      {
        nombre: "Buenas preguntas",
        dur: DUR_P8[4],
        voz: "u5",
        el: <Preguntas2 />,
      },
      {
        nombre: "Avance",
        dur: DUR_P8[5],
        voz: "u6",
        el: (
          <Avance
            parte={9}
            tema="Los 4 tipos de análisis"
            gancho="¿Qué pasó, por qué… y qué *hago*?"
          />
        ),
      },
    ]}
  />
);

export const TOTAL_P8 = duracionTotal(DUR_P8);
