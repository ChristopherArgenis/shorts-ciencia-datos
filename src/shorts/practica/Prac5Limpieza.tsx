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
import { Tabla } from "./cafe";

// Parte 5: Limpieza de datos (caso ficticio: Café Datos, pedidos a domicilio).
const SUCIA = [
  ["Latte", "CDMX", "55"],
  ["latte ", "Ciudad de México", "55"],
  ["Americano", "cdmx", ""],
  ["Latte", "CDMX", "55"],
  ["Pan dulce", "Puebla", "250"],
];
const LIMPIA = [
  ["Latte", "Ciudad de México", "55"],
  ["Latte", "Ciudad de México", "55"],
  ["Americano", "Ciudad de México", "40"],
  ["Pan dulce", "Puebla", "25"],
];

const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={40}>
      {["CDMX", "Ciudad de México", "cdmx"].map((t, i) => (
        <div
          key={t}
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 76,
            color: C.ink,
            background: C.bg2,
            borderRadius: 22,
            padding: "14px 34px",
            opacity: prog(frame, 5 + i * 12, 15 + i * 12),
          }}
        >
          “{t}”
        </div>
      ))}
      <Words
        text="…son el *mismo* lugar"
        size={86}
        delay={50}
        accent={C.green}
      />
      <Sfx src="pop.wav" at={50} />
    </Stage>
  );
};

const Conteo: React.FC = () => {
  const frame = useCurrentFrame();
  const grupos: [string, number, string][] = [
    ["CDMX", 2, C.blue],
    ["Ciudad de México", 1, C.purple],
    ["cdmx", 1, C.yellow],
  ];
  return (
    <Stage gap={34}>
      <Words
        text="Para la computadora son *3* lugares"
        size={86}
        accent={C.coral}
      />
      {grupos.map(([t, n, c], i) => (
        <div
          key={t}
          style={{
            width: 860,
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 44,
          }}
        >
          <div style={{ width: 420, color: C.ink, textAlign: "right" }}>
            {t}
          </div>
          <div
            style={{
              height: 60,
              width: 160 * n * prog(frame, 20 + i * 10, 45 + i * 10),
              background: c,
              borderRadius: 14,
            }}
          />
          <div style={{ color: c }}>{n}</div>
        </div>
      ))}
      <Sticker delay={80} bg={C.coral} color={C.ink}>
        Y eso arruina cualquier conteo
      </Sticker>
      <Nota>Pedidos a domicilio ficticios</Nota>
      <Sfx src="boom.wav" at={80} volume={0.4} />
    </Stage>
  );
};

const Cuatro: React.FC = () => {
  const frame = useCurrentFrame();
  const fase = Math.floor(prog(frame, 30, 170) * 4 + 0.001);
  const etiquetas: [string, string][] = [
    ["Faltantes", C.yellow],
    ["Duplicados", C.purple],
    ["Formatos", C.blue],
    ["Errores", C.coral],
  ];
  const resaltar: Record<number, string> =
    fase === 1
      ? { 2: C.yellow }
      : fase === 2
        ? { 3: C.purple }
        : fase === 3
          ? { 1: C.blue, 2: C.blue }
          : fase >= 4
            ? { 4: C.coral }
            : {};
  return (
    <Stage gap={30}>
      <Words text="Limpiar = revisar *4* cosas" size={88} accent={C.yellow} />
      <div
        style={{
          display: "flex",
          gap: 14,
          flexWrap: "wrap",
          justifyContent: "center",
          width: 900,
        }}
      >
        {etiquetas.map(([t, c], i) => (
          <span
            key={t}
            style={{
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 42,
              color: fase > i ? C.bg : c,
              background: fase > i ? c : "transparent",
              border: `4px solid ${c}`,
              borderRadius: 18,
              padding: "8px 20px",
            }}
          >
            {t}
          </span>
        ))}
      </div>
      <Tabla
        cols={["producto", "ciudad", "precio"]}
        filas={SUCIA}
        anchos={[260, 420, 200]}
        resaltar={resaltar}
        size={36}
      />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 40,
          color: C.dim,
          height: 50,
        }}
      >
        {
          [
            "",
            "precio vacío",
            "fila repetida",
            "“latte ” y “cdmx”",
            "$250 por un pan dulce: un cero de más",
          ][fase]
        }
      </div>
      {[65, 100, 135, 170].map((t) => (
        <Sfx key={t} src="tick.wav" at={t} />
      ))}
    </Stage>
  );
};

const Resultado: React.FC = () => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [70, 110], [3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  return (
    <Stage gap={30}>
      <Codigo
        lineas={[
          "df = df.drop_duplicates()",
          'df["ciudad"] = df["ciudad"].replace(sinonimos)',
          'df["producto"] = (df["producto"].str.strip()',
          '                  .str.capitalize())',
        ]}
        delay={5}
        size={30}
      />
      <Tabla
        cols={["producto", "ciudad", "precio"]}
        filas={LIMPIA}
        anchos={[260, 420, 200]}
        delay={45}
        size={36}
      />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 56,
          color: C.green,
        }}
      >
        Ciudad de México: {Math.round(v)} grupo{Math.round(v) === 1 ? "" : "s"}
      </div>
      <Sfx src="ding.wav" at={110} volume={0.4} />
    </Stage>
  );
};

const Tiempo: React.FC = () => (
  <Stage gap={40}>
    <Words
      text="Limpiar datos es de lo que *más* *tiempo* toma"
      size={84}
      stagger={1}
      accent={C.yellow}
    />
    <Sticker delay={45} bg={C.green} color={C.bg}>
      Datos sucios = conclusiones equivocadas
    </Sticker>
    <Nota>
      Lo dicen muchos científicos de datos; el porcentaje varía por proyecto
    </Nota>
    <Sfx src="pop.wav" at={45} />
  </Stage>
);

export const DUR_P5 = [160, 185, 230, 200, 175, 170];

export const Prac5Limpieza: React.FC = () => (
  <Capitulo
    parte={5}
    short="prac5"
    serie={SERIE_PRACTICA}
    acento={C.purple}
    escenas={[
      { nombre: "Gancho", dur: DUR_P5[0], voz: "q1", el: <Gancho /> },
      { nombre: "Conteo", dur: DUR_P5[1], voz: "q2", el: <Conteo /> },
      { nombre: "4 cosas", dur: DUR_P5[2], voz: "q3", el: <Cuatro /> },
      { nombre: "Resultado", dur: DUR_P5[3], voz: "q4", el: <Resultado /> },
      { nombre: "Tiempo", dur: DUR_P5[4], voz: "q5", el: <Tiempo /> },
      {
        nombre: "Avance",
        dur: DUR_P5[5],
        voz: "q6",
        el: (
          <Avance
            parte={6}
            tema="Datos atípicos"
            gancho="¿Un café de *$15,000*?"
          />
        ),
      },
    ]}
  />
);

export const TOTAL_P5 = duracionTotal(DUR_P5);
