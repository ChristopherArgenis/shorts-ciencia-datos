import React from "react";
import { useCurrentFrame } from "remotion";
import { Sfx, Stage, Sticker, Words } from "../../kit/kit";
import { C, FONT } from "../../kit/theme";
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

// Parte 4: Tipos de variables y datos ordenados (caso ficticio: Café Datos).
const ANCHA = [
  ["Latte", 320, 290, 350],
  ["Americano", 210, 230, 190],
  ["Pan dulce", 150, 170, 160],
];
const MESES = ["ene", "feb", "mar"];
const LARGA = ANCHA.flatMap((f) => MESES.map((m, j) => [f[0], m, f[j + 1]]));

const Gancho: React.FC = () => (
  <Stage gap={40}>
    <Words
      text="Esta tabla está *mal* hecha… y no se nota"
      size={86}
      stagger={1}
      accent={C.coral}
    />
    <Tabla
      cols={["producto", "ene", "feb", "mar"]}
      filas={ANCHA}
      anchos={[290, 190, 190, 190]}
      delay={20}
      size={40}
    />
    <Nota>Ventas ficticias de Café Datos (piezas)</Nota>
  </Stage>
);

const Problema: React.FC = () => {
  const frame = useCurrentFrame();
  const col: Record<string, string> = {};
  ANCHA.forEach((_, i) =>
    [1, 2, 3].forEach((j) => (col[`${i},${j}`] = C.yellow)),
  );
  return (
    <Stage gap={40}>
      <Words text="Cada *columna* es un mes" size={88} accent={C.yellow} />
      <Tabla
        cols={["producto", "ene", "feb", "mar"]}
        filas={ANCHA}
        anchos={[290, 190, 190, 190]}
        celdaColor={frame > 30 ? col : {}}
        size={40}
      />
      <Sticker delay={60} bg={C.coral} color={C.ink}>
        ¿Y si llega abril? ¿Otra columna?
      </Sticker>
      <Sfx src="pop.wav" at={60} />
    </Stage>
  );
};

const Regla: React.FC = () => (
  <Stage gap={34}>
    <Words text="Datos *ordenados*" size={96} accent={C.green} />
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: 52,
        color: C.ink,
        width: 860,
      }}
    >
      <div>
        → Cada <span style={{ color: C.green }}>fila</span> = una observación
      </div>
      <div>
        ↓ Cada <span style={{ color: C.blue }}>columna</span> = una variable
      </div>
    </div>
    <Tabla
      cols={["producto", "mes", "ventas"]}
      filas={LARGA.slice(0, 6)}
      anchos={[330, 260, 290]}
      delay={40}
      size={38}
    />
    <Sfx src="ding.wav" at={40} volume={0.35} />
  </Stage>
);

const TIPOS: [string, string, string][] = [
  ["Número", "precio: 55", C.green],
  ["Categoría", "producto: Latte", C.blue],
  ["Fecha", "2026-03-14 08:12", C.yellow],
  ["Texto", "“¡Muy rico!”", C.purple],
];

const Tipos: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={30}>
      <Words text="Cada variable tiene su *tipo*" size={88} accent={C.yellow} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          width: 880,
        }}
      >
        {TIPOS.map(([t, e, c], i) => (
          <div
            key={t}
            style={{
              background: C.bg2,
              borderRadius: 24,
              padding: "26px 24px",
              borderTop: `10px solid ${c}`,
              fontFamily: FONT,
              opacity: prog(frame, 15 + i * 15, 25 + i * 15),
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 54, color: c }}>{t}</div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 36,
                color: C.ink,
                marginTop: 8,
              }}
            >
              {e}
            </div>
          </div>
        ))}
      </div>
      <Words
        text="Con el tipo correcto, puedes *sumar* fechas o *contar* categorías"
        size={52}
        weight={800}
        delay={80}
        accent={C.green}
      />
      {[15, 30, 45, 60].map((t) => (
        <Sfx key={t} src="tick.wav" at={t} />
      ))}
    </Stage>
  );
};

const Melt: React.FC = () => (
  <Stage gap={30}>
    <Words text="Con *melt*: de ancha a larga" size={88} accent={C.green} />
    <Codigo
      lineas={[
        'larga = ancha.melt(id_vars="producto",',
        '                   var_name="mes",',
        '                   value_name="ventas")',
      ]}
      delay={10}
      size={36}
    />
    <Tabla
      cols={["producto", "mes", "ventas"]}
      filas={LARGA}
      anchos={[330, 260, 290]}
      delay={50}
      size={32}
    />
    <Sfx src="whoosh.wav" at={50} volume={0.3} />
  </Stage>
);

export const DUR_P4 = [135, 165, 185, 170, 190, 135];

export const Prac4Ordenados: React.FC = () => (
  <Capitulo
    parte={4}
    short="prac4"
    serie={SERIE_PRACTICA}
    acento={C.yellow}
    escenas={[
      { nombre: "Gancho", dur: DUR_P4[0], voz: "o1", el: <Gancho /> },
      { nombre: "Problema", dur: DUR_P4[1], voz: "o2", el: <Problema /> },
      { nombre: "Regla", dur: DUR_P4[2], voz: "o3", el: <Regla /> },
      { nombre: "Tipos", dur: DUR_P4[3], voz: "o4", el: <Tipos /> },
      { nombre: "melt", dur: DUR_P4[4], voz: "o5", el: <Melt /> },
      {
        nombre: "Avance",
        dur: DUR_P4[5],
        voz: "o6",
        el: (
          <Avance
            parte={5}
            tema="Limpieza de datos"
            gancho="¿CDMX = *Ciudad* *de* *México*?"
          />
        ),
      },
    ]}
  />
);

export const TOTAL_P4 = duracionTotal(DUR_P4);
