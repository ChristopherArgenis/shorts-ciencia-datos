import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Sfx, Stage, Sticker, Words, useIn } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import {
  Avance,
  Capitulo,
  duracionTotal,
  fmt,
  Formula,
  Nota,
  Persona,
  prog,
} from "../../kit/serie";

// Parte 1: Promedio vs mediana. Sueldos ilustrativos (ejemplo simplificado).
const SUELDOS = [12000, 13000, 14000, 15000, 15000, 15000, 16000, 17000, 18000];
const MILLON = 5000000;
const PROM_9 = SUELDOS.reduce((a, b) => a + b, 0) / SUELDOS.length; // 15,000
const PROM_10 = (SUELDOS.reduce((a, b) => a + b, 0) + MILLON) / 10; // 513,500
const COLORES = [C.green, C.blue, C.purple];

const Cafe: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={40}>
      <Words text="9 personas en un café" size={92} stagger={1} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 260px)",
          gap: 24,
        }}
      >
        {SUELDOS.map((s, i) => {
          const p = prog(frame, 10 + i * 4, 20 + i * 4);
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                opacity: p,
                scale: 0.6 + 0.4 * p,
              }}
            >
              <Persona color={COLORES[i % 3]} size={100} />
              <div
                style={{
                  fontFamily: MONO,
                  fontWeight: 700,
                  fontSize: 40,
                  color: C.ink,
                }}
              >
                ${fmt(s)}
              </div>
            </div>
          );
        })}
      </div>
      <Words
        text="sueldo al *mes*"
        size={60}
        weight={800}
        delay={50}
        color={C.dim}
      />
      <Nota>Ejemplo simplificado</Nota>
    </Stage>
  );
};

const Promedio: React.FC = () => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [40, 80], [0, PROM_9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <Stage gap={44}>
      <Words text="El *promedio*" size={110} />
      <Formula delay={12}>Promedio = suma ÷ cantidad</Formula>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 56,
          color: C.dim,
          opacity: prog(frame, 30, 40),
        }}
      >
        135,000 ÷ 9 =
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 170,
          color: C.green,
        }}
      >
        ${fmt(v)}
      </div>
      <Sfx src="ding.wav" at={80} volume={0.35} />
    </Stage>
  );
};

const Multimillonario: React.FC = () => {
  const frame = useCurrentFrame();
  const entra = useIn(10, 9);
  const v = interpolate(frame, [55, 100], [PROM_9, PROM_10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  return (
    <Stage gap={34}>
      <Words text="Entra un *multimillonario*" size={88} accent={C.yellow} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          scale: entra,
          opacity: entra,
        }}
      >
        <Persona color={C.yellow} size={190} />
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 56,
            color: C.yellow,
          }}
        >
          ${fmt(MILLON)}
        </div>
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 52,
          color: C.dim,
        }}
      >
        Nuevo promedio:
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 150,
          color: frame > 60 ? C.coral : C.green,
        }}
      >
        ${fmt(v)}
      </div>
      <Sticker delay={110} bg={C.coral} color={C.ink}>
        ¿Ahora todos ganan medio millón?
      </Sticker>
      <Sfx src="boom.wav" at={55} volume={0.5} />
    </Stage>
  );
};

const Mediana: React.FC = () => {
  const frame = useCurrentFrame();
  const todos = [...SUELDOS, MILLON];
  const maxVisible = 20000;
  const marca = prog(frame, 70, 85);
  return (
    <Stage gap={34}>
      <Words text="La *mediana*" size={110} accent={C.green} />
      <Formula delay={10} size={50}>
        Ordena y toma el del medio
      </Formula>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 14,
          height: 470,
        }}
      >
        {todos.map((s, i) => {
          const p = prog(frame, 25 + i * 3, 40 + i * 3);
          const h = Math.min(s, maxVisible) / maxVisible;
          const medio = i === 4 || i === 5;
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
              {s > maxVisible ? (
                <div
                  style={{ fontFamily: MONO, fontSize: 30, color: C.yellow }}
                >
                  ↑ 5M
                </div>
              ) : null}
              <div
                style={{
                  width: 70,
                  height: 400 * h * p,
                  borderRadius: 12,
                  background:
                    medio && marca > 0
                      ? C.green
                      : s > maxVisible
                        ? C.yellow
                        : C.bg2,
                  outline: medio ? `${6 * marca}px solid ${C.green}` : "none",
                }}
              />
            </div>
          );
        })}
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 120,
          color: C.green,
          opacity: marca,
        }}
      >
        ${fmt(15000)}
      </div>
      <Words
        text="El multimillonario *no* la mueve."
        size={60}
        weight={800}
        delay={95}
        accent={C.green}
      />
      <Sfx src="ding.wav" at={72} volume={0.35} />
    </Stage>
  );
};

const Uso: React.FC<{
  titulo: string;
  texto: string;
  color: string;
  delay: number;
}> = ({ titulo, texto, color, delay }) => {
  const p = useIn(delay, 12);
  return (
    <div
      style={{
        width: 880,
        background: C.bg2,
        borderRadius: 26,
        padding: "28px 34px",
        borderLeft: `12px solid ${color}`,
        opacity: p,
        translate: `${(1 - p) * 80}px 0px`,
        fontFamily: FONT,
      }}
    >
      <div style={{ fontWeight: 900, fontSize: 60, color: C.ink }}>
        {titulo}
      </div>
      <div
        style={{ fontWeight: 600, fontSize: 40, color: C.dim, marginTop: 6 }}
      >
        {texto}
      </div>
    </div>
  );
};

const Aplicacion: React.FC = () => (
  <Stage gap={34}>
    <Words
      text="Así la usa un *científico* *de* *datos*"
      size={80}
      accent={C.yellow}
    />
    <Uso
      titulo="Sueldos"
      texto="unos pocos sueldos enormes inflan el promedio"
      color={C.green}
      delay={25}
    />
    <Uso
      titulo="Precios de casas"
      texto="una mansión no debería subir el precio 'típico'"
      color={C.blue}
      delay={50}
    />
    <Uso
      titulo="Regla rápida"
      texto="si hay valores extremos, mira la mediana"
      color={C.yellow}
      delay={80}
    />
    <Sfx src="pop.wav" at={25} />
    <Sfx src="pop.wav" at={50} />
    <Sfx src="pop.wav" at={80} />
  </Stage>
);

export const DUR_M1 = [185, 150, 175, 185, 190, 150];

export const Mates1Mediana: React.FC = () => (
  <Capitulo
    parte={1}
    short="mates1"
    acento={C.green}
    escenas={[
      { nombre: "Café", dur: DUR_M1[0], voz: "m1", el: <Cafe /> },
      { nombre: "Promedio", dur: DUR_M1[1], voz: "m2", el: <Promedio /> },
      {
        nombre: "Multimillonario",
        dur: DUR_M1[2],
        voz: "m3",
        el: <Multimillonario />,
      },
      { nombre: "Mediana", dur: DUR_M1[3], voz: "m4", el: <Mediana /> },
      { nombre: "Aplicación", dur: DUR_M1[4], voz: "m5", el: <Aplicacion /> },
      {
        nombre: "Avance",
        dur: DUR_M1[5],
        voz: "m6",
        el: (
          <Avance
            parte={2}
            tema="Desviación estándar"
            gancho="Mismo promedio… ¿mismos datos?"
          />
        ),
      },
    ]}
  />
);

export const TOTAL_M1 = duracionTotal(DUR_M1);
