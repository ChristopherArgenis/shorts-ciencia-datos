import React from "react";
import { useCurrentFrame } from "remotion";
import { Sfx, Stage, Sticker, Words, useIn } from "../../kit/kit";
import { C, FONT } from "../../kit/theme";
import {
  Avance,
  Capitulo,
  duracionTotal,
  Nota,
  prog,
  SERIE_PRACTICA,
  Tarjeta,
} from "../../kit/serie";

// Parte 2: La pregunta correcta (caso ficticio: Café Datos).

const Burbuja: React.FC<{
  texto: string;
  color: string;
  delay: number;
  tachar?: boolean;
}> = ({ texto, color, delay, tachar }) => {
  const p = useIn(delay, 11);
  return (
    <div
      style={{
        maxWidth: 860,
        background: `${color}26`,
        border: `5px solid ${color}`,
        borderRadius: 34,
        padding: "26px 36px",
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: 62,
        color: C.ink,
        textAlign: "center",
        opacity: p,
        scale: 0.8 + 0.2 * p,
        textDecoration: tachar ? "line-through" : "none",
        textDecorationColor: C.coral,
      }}
    >
      {texto}
    </div>
  );
};

const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={50}>
      <Burbuja
        texto="“Quiero vender más”"
        color={C.blue}
        delay={5}
        tachar={frame > 60}
      />
      <Words
        text="no es una *pregunta* *de* *datos*"
        size={84}
        delay={30}
        accent={C.coral}
      />
      <Sfx src="boom.wav" at={60} volume={0.4} />
    </Stage>
  );
};

const Deseo: React.FC = () => (
  <Stage gap={34}>
    <Words text="Es un *deseo*. No dice…" size={88} accent={C.yellow} />
    {["¿Qué medir?", "¿Cuándo?", "¿Comparado con qué?"].map((t, i) => (
      <Burbuja key={t} texto={t} color={C.coral} delay={25 + i * 18} />
    ))}
    {[25, 43, 61].map((t) => (
      <Sfx key={t} src="pop.wav" at={t} />
    ))}
  </Stage>
);

const Ingredientes: React.FC = () => (
  <Stage gap={30}>
    <Words
      text="Una buena pregunta tiene *3* cosas"
      size={84}
      accent={C.green}
    />
    <Tarjeta
      titulo="1. Qué se mide"
      texto="ventas, clientes, tiempo de espera…"
      color={C.green}
      delay={20}
    />
    <Tarjeta
      titulo="2. En qué grupo"
      texto="qué producto, qué sucursal, qué horario"
      color={C.blue}
      delay={45}
    />
    <Tarjeta
      titulo="3. En qué tiempo"
      texto="la última semana, el último mes, este año"
      color={C.yellow}
      delay={70}
    />
    {[20, 45, 70].map((t) => (
      <Sfx key={t} src="pop.wav" at={t} />
    ))}
  </Stage>
);

const Ejemplo: React.FC = () => {
  const frame = useCurrentFrame();
  const parte = (txt: string, c: string, a: number) => (
    <span
      style={{
        color: c,
        opacity: prog(frame, a, a + 10),
        borderBottom: `6px solid ${c}`,
      }}
    >
      {txt}
    </span>
  );
  return (
    <Stage gap={40}>
      <Words text="Ahora sí:" size={80} color={C.dim} />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 70,
          color: C.ink,
          textAlign: "center",
          lineHeight: 1.35,
          width: 900,
        }}
      >
        ¿Qué {parte("producto se vende menos", C.green, 20)}{" "}
        {parte("por las tardes, entre semana", C.blue, 45)},{" "}
        {parte("en el último mes", C.yellow, 70)}?
      </div>
      <div
        style={{
          display: "flex",
          gap: 26,
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 38,
        }}
      >
        <span style={{ color: C.green }}>qué</span>
        <span style={{ color: C.blue }}>grupo</span>
        <span style={{ color: C.yellow }}>tiempo</span>
      </div>
      <Nota>Ejemplo simplificado</Nota>
      <Sfx src="ding.wav" at={80} volume={0.35} />
    </Stage>
  );
};

const Beneficio: React.FC = () => (
  <Stage gap={34}>
    <Words text="Con una pregunta así…" size={84} />
    <Tarjeta
      titulo="Sabes qué datos pedir"
      texto="ventas por producto, con fecha y hora"
      color={C.blue}
      delay={20}
    />
    <Tarjeta
      titulo="Sabes cuándo terminaste"
      texto="cuando respondes la pregunta, no antes"
      color={C.green}
      delay={50}
    />
    <Sticker delay={90} bg={C.yellow}>
      La pregunta guía todo el proyecto
    </Sticker>
    <Sfx src="pop.wav" at={90} />
  </Stage>
);

export const DUR_P2 = [140, 160, 185, 200, 185, 140];

export const Prac2Pregunta: React.FC = () => (
  <Capitulo
    parte={2}
    short="prac2"
    serie={SERIE_PRACTICA}
    acento={C.blue}
    escenas={[
      { nombre: "Gancho", dur: DUR_P2[0], voz: "l1", el: <Gancho /> },
      { nombre: "Deseo", dur: DUR_P2[1], voz: "l2", el: <Deseo /> },
      { nombre: "3 cosas", dur: DUR_P2[2], voz: "l3", el: <Ingredientes /> },
      { nombre: "Ejemplo", dur: DUR_P2[3], voz: "l4", el: <Ejemplo /> },
      { nombre: "Beneficio", dur: DUR_P2[4], voz: "l5", el: <Beneficio /> },
      {
        nombre: "Avance",
        dur: DUR_P2[5],
        voz: "l6",
        el: (
          <Avance
            parte={3}
            tema="Recolección de datos"
            gancho="¿De dónde salen los *datos*?"
          />
        ),
      },
    ]}
  />
);

export const TOTAL_P2 = duracionTotal(DUR_P2);
