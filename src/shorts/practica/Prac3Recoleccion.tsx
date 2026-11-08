import React from "react";
import { useCurrentFrame } from "remotion";
import { Sfx, Stage, Sticker, Words, useIn } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import {
  Avance,
  Capitulo,
  Codigo,
  duracionTotal,
  Nota,
  prog,
  SERIE_PRACTICA,
  Tarjeta,
} from "../../kit/serie";
import { Tabla } from "./cafe";

// Parte 3: Recolección de datos (caso ficticio: Café Datos).
const VENTAS = [
  ["08:12", "Latte", 55, "tarjeta"],
  ["08:15", "Pan dulce", 25, "efectivo"],
  ["08:21", "Americano", 40, "tarjeta"],
  ["08:30", "Latte", 55, "tarjeta"],
];

const Ticket: React.FC<{ delay: number }> = ({ delay }) => {
  const p = useIn(delay, 11);
  return (
    <div
      style={{
        width: 380,
        background: "#f4f6ff",
        color: "#0b1020",
        borderRadius: 18,
        padding: "24px 28px",
        fontFamily: MONO,
        fontSize: 32,
        opacity: p,
        rotate: `${-4 * p}deg`,
        scale: 0.8 + 0.2 * p,
      }}
    >
      <div style={{ fontWeight: 700, textAlign: "center" }}>CAFÉ DATOS</div>
      <div>08:12 Latte ..... $55</div>
      <div>Pago: tarjeta</div>
    </div>
  );
};

const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={40}>
      <Words
        text="Cada vez que pagas, generas una *fila* *de* *datos*"
        size={84}
        stagger={1}
        accent={C.green}
      />
      <Ticket delay={20} />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 90,
          color: C.dim,
          opacity: prog(frame, 50, 58),
        }}
      >
        ↓
      </div>
      <div style={{ opacity: prog(frame, 55, 65) }}>
        <Tabla
          cols={["hora", "producto", "precio", "pago"]}
          filas={[VENTAS[0]]}
          anchos={[180, 270, 190, 240]}
          delay={55}
        />
      </div>
      <Sfx src="pop.wav" at={20} />
    </Stage>
  );
};

const Fuentes: React.FC = () => (
  <Stage gap={30}>
    <Words
      text="Café Datos tiene *varias* fuentes"
      size={84}
      accent={C.green}
    />
    <Tarjeta
      titulo="Caja registradora"
      texto="cada venta: hora, producto, precio, forma de pago"
      color={C.green}
      delay={20}
    />
    <Tarjeta
      titulo="Inventario"
      texto="cuánto café, leche y pan queda cada día"
      color={C.blue}
      delay={45}
    />
    <Tarjeta
      titulo="Reseñas"
      texto="estrellas y comentarios de los clientes"
      color={C.yellow}
      delay={70}
    />
    <Nota>Café ficticio · datos de ejemplo</Nota>
    {[20, 45, 70].map((t) => (
      <Sfx key={t} src="pop.wav" at={t} />
    ))}
  </Stage>
);

const Donde: React.FC = () => {
  const frame = useCurrentFrame();
  const items: [string, string, string][] = [
    ["Base de datos", "SQL", C.purple],
    ["Archivos", "Excel · CSV", C.green],
    ["API", "otra app te envía datos", C.blue],
  ];
  return (
    <Stage gap={34}>
      <Words text="¿Dónde *viven* los datos?" size={92} accent={C.yellow} />
      {items.map(([t, d, c], i) => (
        <div
          key={t}
          style={{
            width: 860,
            display: "flex",
            alignItems: "center",
            gap: 28,
            background: C.bg2,
            borderRadius: 26,
            padding: "26px 32px",
            border: `4px solid ${c}`,
            opacity: prog(frame, 20 + i * 25, 32 + i * 25),
          }}
        >
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: 20,
              background: c,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 50,
              color: C.bg,
            }}
          >
            {i + 1}
          </div>
          <div style={{ fontFamily: FONT }}>
            <div style={{ fontWeight: 900, fontSize: 56, color: C.ink }}>
              {t}
            </div>
            <div style={{ fontWeight: 600, fontSize: 38, color: C.dim }}>
              {d}
            </div>
          </div>
        </div>
      ))}
      {[20, 45, 70].map((t) => (
        <Sfx key={t} src="tick.wav" at={t} />
      ))}
    </Stage>
  );
};

const Cargar: React.FC = () => (
  <Stage gap={36}>
    <Words text="Con *pandas*, una sola línea" size={88} accent={C.green} />
    <Codigo
      lineas={[
        "import pandas as pd",
        'ventas = pd.read_csv("ventas.csv")',
        "ventas.head()",
      ]}
      delay={15}
      size={38}
    />
    <Tabla
      cols={["hora", "producto", "precio", "pago"]}
      filas={VENTAS}
      anchos={[180, 270, 190, 240]}
      delay={50}
    />
    <Sfx src="ding.wav" at={50} volume={0.35} />
  </Stage>
);

const Permiso: React.FC = () => (
  <Stage gap={34}>
    <Words text="Y siempre con *permiso*" size={92} accent={C.coral} />
    <Tarjeta
      titulo="Protege lo personal"
      texto="nombres, teléfonos y tarjetas no se comparten"
      color={C.coral}
      delay={20}
    />
    <Tarjeta
      titulo="Solo para lo que se pidió"
      texto="si el cliente aceptó para ventas, no se usa para otra cosa"
      color={C.yellow}
      delay={55}
    />
    <Sticker delay={100} bg={C.green} color={C.bg}>
      Datos con ética = datos confiables
    </Sticker>
    <Sfx src="pop.wav" at={100} />
  </Stage>
);

export const DUR_P3 = [160, 205, 210, 190, 215, 150];

export const Prac3Recoleccion: React.FC = () => (
  <Capitulo
    parte={3}
    short="prac3"
    serie={SERIE_PRACTICA}
    acento={C.green}
    escenas={[
      { nombre: "Gancho", dur: DUR_P3[0], voz: "n1", el: <Gancho /> },
      { nombre: "Fuentes", dur: DUR_P3[1], voz: "n2", el: <Fuentes /> },
      { nombre: "Dónde viven", dur: DUR_P3[2], voz: "n3", el: <Donde /> },
      { nombre: "Cargar", dur: DUR_P3[3], voz: "n4", el: <Cargar /> },
      { nombre: "Permiso", dur: DUR_P3[4], voz: "n5", el: <Permiso /> },
      {
        nombre: "Avance",
        dur: DUR_P3[5],
        voz: "n6",
        el: (
          <Avance
            parte={4}
            tema="Datos ordenados"
            gancho="¿Una tabla *mal* hecha?"
          />
        ),
      },
    ]}
  />
);

export const TOTAL_P3 = duracionTotal(DUR_P3);
