import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Sfx, Stage, Sticker, Words } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import {
  Avance,
  Capitulo,
  Codigo,
  duracionTotal,
  fmt,
  Nota,
  prog,
  SERIE_PRACTICA,
} from "../../kit/serie";
import { Tabla } from "./cafe";

// Parte 7: Transformar datos: filtrar, agrupar y unir (ventas ficticias de Café Datos).
const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const VENTAS_DIA = [4200, 5100, 5300, 5600, 7400, 9800, 8900];
const TICKETS = [
  ["2026-03-02", "Lun", "Latte", 55],
  ["2026-02-27", "Vie", "Pan dulce", 25],
  ["2026-03-07", "Sáb", "Latte", 55],
  ["2026-03-07", "Sáb", "Americano", 40],
  ["2026-02-28", "Sáb", "Latte", 55],
  ["2026-03-08", "Dom", "Pan dulce", 25],
];

const Gancho: React.FC = () => (
  <Stage gap={40}>
    <Words
      text="*3* comandos para responder a tu jefe"
      size={88}
      stagger={1}
      accent={C.green}
    />
    <div style={{ display: "flex", gap: 18 }}>
      {["filtrar", "agrupar", "unir"].map((t, i) => (
        <span
          key={t}
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 56,
            color: C.bg,
            background: [C.yellow, C.green, C.blue][i],
            borderRadius: 18,
            padding: "12px 26px",
          }}
        >
          {t}
        </span>
      ))}
    </div>
    <Sfx src="pop.wav" at={20} />
  </Stage>
);

const Pregunta: React.FC = () => (
  <Stage gap={36}>
    <Words text="¿Qué *día* vendemos más?" size={92} accent={C.yellow} />
    <Tabla
      cols={["fecha", "día", "producto", "$"]}
      filas={TICKETS}
      anchos={[280, 140, 300, 160]}
      delay={20}
      size={34}
    />
    <div
      style={{ fontFamily: FONT, fontWeight: 800, fontSize: 46, color: C.dim }}
    >
      …y miles de filas más
    </div>
    <Nota>Ventas ficticias de Café Datos</Nota>
  </Stage>
);

const Filtrar: React.FC = () => {
  const frame = useCurrentFrame();
  const fuera = frame > 50 ? [1, 4] : [];
  return (
    <Stage gap={36}>
      <Words text="1. *Filtrar*: solo este mes" size={88} accent={C.yellow} />
      <Codigo
        lineas={['marzo = df[df["fecha"] >= "2026-03-01"]']}
        delay={10}
        size={32}
      />
      <Tabla
        cols={["fecha", "día", "producto", "$"]}
        filas={TICKETS}
        anchos={[280, 140, 300, 160]}
        tachar={fuera}
        size={34}
      />
      <Sfx src="whoosh.wav" at={50} volume={0.3} />
    </Stage>
  );
};

const Agrupar: React.FC = () => {
  const frame = useCurrentFrame();
  const mx = Math.max(...VENTAS_DIA);
  return (
    <Stage gap={30}>
      <Words text="2. *Agrupar* por día y sumar" size={86} accent={C.green} />
      <Codigo
        lineas={['marzo.groupby("día")["$"].sum()']}
        delay={5}
        size={40}
      />
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 18,
          height: 440,
        }}
      >
        {VENTAS_DIA.map((v, i) => {
          const h = interpolate(
            frame,
            [25 + i * 4, 55 + i * 4],
            [0, 380 * (v / mx)],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            },
          );
          const top = v === mx;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 24,
                  color: top ? C.green : C.dim,
                  opacity: prog(frame, 60, 70),
                }}
              >
                {fmt(v / 1000, 1)}k
              </div>
              <div
                style={{
                  width: 96,
                  height: h,
                  borderRadius: 12,
                  background: top ? C.green : C.blue,
                }}
              />
              <div
                style={{
                  fontFamily: FONT,
                  fontWeight: 900,
                  fontSize: 34,
                  color: top ? C.green : C.ink,
                }}
              >
                {DIAS[i]}
              </div>
            </div>
          );
        })}
      </div>
      <Sticker delay={80} bg={C.green} color={C.bg}>
        ¡El sábado gana!
      </Sticker>
      <Sfx src="ding.wav" at={80} volume={0.35} />
    </Stage>
  );
};

const Unir: React.FC = () => (
  <Stage gap={28}>
    <Words text="3. *Unir* con el inventario" size={86} accent={C.blue} />
    <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
      <Tabla
        cols={["día", "pan vendido"]}
        filas={[
          ["Vie", 120],
          ["Sáb", 180],
          ["Dom", 160],
        ]}
        anchos={[150, 250]}
        size={32}
        delay={10}
      />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 70,
          color: C.blue,
        }}
      >
        +
      </div>
      <Tabla
        cols={["día", "pan horneado"]}
        filas={[
          ["Vie", 150],
          ["Sáb", 150],
          ["Dom", 150],
        ]}
        anchos={[150, 260]}
        size={32}
        delay={25}
      />
    </div>
    <Codigo
      lineas={['ventas.merge(inventario, on="día")']}
      delay={50}
      size={40}
    />
    <Tabla
      cols={["día", "vendido", "horneado"]}
      filas={[
        ["Vie", 120, 150],
        ["Sáb", 180, 150],
        ["Dom", 160, 150],
      ]}
      anchos={[200, 300, 300]}
      resaltar={{ 1: C.coral, 2: C.coral }}
      size={34}
      delay={80}
    />
    <Sticker delay={130} bg={C.coral} color={C.ink}>
      Sábado y domingo se acaba el pan
    </Sticker>
    <Sfx src="pop.wav" at={130} />
  </Stage>
);

export const DUR_P7 = [140, 165, 130, 175, 290, 140];

export const Prac7Transformar: React.FC = () => (
  <Capitulo
    parte={7}
    short="prac7"
    serie={SERIE_PRACTICA}
    acento={C.green}
    escenas={[
      { nombre: "Gancho", dur: DUR_P7[0], voz: "s1", el: <Gancho /> },
      { nombre: "Pregunta", dur: DUR_P7[1], voz: "s2", el: <Pregunta /> },
      { nombre: "Filtrar", dur: DUR_P7[2], voz: "s3", el: <Filtrar /> },
      { nombre: "Agrupar", dur: DUR_P7[3], voz: "s4", el: <Agrupar /> },
      { nombre: "Unir", dur: DUR_P7[4], voz: "s5", el: <Unir /> },
      {
        nombre: "Avance",
        dur: DUR_P7[5],
        voz: "s6",
        el: (
          <Avance
            parte={8}
            tema="Análisis exploratorio"
            gancho="Antes de concluir… *mira* tus datos"
          />
        ),
      },
    ]}
  />
);

export const TOTAL_P7 = duracionTotal(DUR_P7);
