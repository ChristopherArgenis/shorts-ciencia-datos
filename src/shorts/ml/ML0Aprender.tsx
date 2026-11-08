import React from "react";
import { useCurrentFrame } from "remotion";
import { Sfx, Stage, Words, useIn } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import { Capitulo, duracionTotal, Nota, prog, SERIE_ML } from "../../kit/serie";
import { AvanceML, MORADO, NARANJA, ORO, Reto } from "../../kit/ml";

// Aprendizaje Automático · Tronco 0: ¿Qué es aprender? (tráiler de la serie).

const Correo: React.FC<{
  asunto: string;
  spam: boolean;
  delay: number;
  marca?: boolean;
}> = ({ asunto, spam, delay, marca }) => {
  const p = useIn(delay, 11);
  return (
    <div
      style={{
        width: 860,
        background: "#f4f6ff",
        borderRadius: 22,
        padding: "18px 26px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: FONT,
        opacity: p,
        translate: `${(1 - p) * 60}px 0px`,
      }}
    >
      <span style={{ fontWeight: 800, fontSize: 40, color: "#0b1020" }}>
        {asunto}
      </span>
      {marca ? (
        <span
          style={{
            fontWeight: 900,
            fontSize: 32,
            color: "#fff",
            background: spam ? C.coral : C.green,
            borderRadius: 14,
            padding: "6px 16px",
          }}
        >
          {spam ? "SPAM" : "OK"}
        </span>
      ) : null}
    </div>
  );
};

const Gancho: React.FC = () => (
  <Stage gap={30}>
    <Words
      text="Nadie le escribió a tu correo qué es spam. *Lo* *aprendió*."
      size={80}
      stagger={1}
      accent={ORO}
    />
    <Correo asunto="¡GRATIS! Ganaste un iPhone" spam delay={30} marca />
    <Correo asunto="Mamá: ¿vienes a comer?" spam={false} delay={42} marca />
    <Sfx src="pop.wav" at={30} />
  </Stage>
);

const RetoEsc: React.FC = () => (
  <Stage gap={40}>
    <Reto pregunta="¿Cómo le enseñarías tú a detectar spam?" />
  </Stage>
);

const Reglas: React.FC = () => {
  const frame = useCurrentFrame();
  const rota = frame > 90;
  return (
    <Stage gap={30}>
      <Words text="Con *reglas*…" size={92} accent={C.coral} />
      <div
        style={{
          fontFamily: MONO,
          fontSize: 40,
          color: C.ink,
          background: "#0a0d1a",
          borderRadius: 20,
          padding: "22px 28px",
          width: 860,
        }}
      >
        <div>if "GRATIS" in correo:</div>
        <div style={{ whiteSpace: "pre" }}>{"    spam()"}</div>
      </div>
      <Correo
        asunto="Mamá: ¡envío GRATIS!"
        spam
        delay={60}
        marca={rota}
      />
      <Correo
        asunto="G-R-A-T-I-S  premio ya"
        spam={false}
        delay={75}
        marca={rota}
      />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 60,
          color: C.coral,
          opacity: prog(frame, 95, 105),
        }}
      >
        Las reglas se rompen
      </div>
      <Sfx src="boom.wav" at={92} volume={0.4} />
    </Stage>
  );
};

const Ejemplos: React.FC = () => {
  const frame = useCurrentFrame();
  let seed = 5;
  const r = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const sobres = Array.from({ length: 40 }).map(() => r() < 0.35);
  return (
    <Stage gap={30}>
      <Words text="Recibe *ejemplos*, no reglas" size={88} accent={ORO} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 80px)",
          gap: 8,
        }}
      >
        {sobres.map((s, i) => (
          <div
            key={i}
            style={{
              width: 80,
              height: 60,
              borderRadius: 10,
              background: s ? C.coral : C.blue,
              opacity: prog(frame, 10 + i * 1.2, 16 + i * 1.2),
            }}
          />
        ))}
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 90,
          color: C.dim,
          opacity: prog(frame, 70, 80),
        }}
      >
        ↓
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 64,
          color: C.bg,
          background: ORO,
          borderRadius: 24,
          padding: "16px 36px",
          opacity: prog(frame, 80, 92),
        }}
      >
        encuentra el patrón solo
      </div>
      <Nota>Ejemplo simplificado</Nota>
    </Stage>
  );
};

const Caminos: React.FC = () => (
  <Stage gap={34}>
    <Words text="Dos *caminos*" size={100} accent={ORO} />
    {(
      [
        ["Supervisado", "aprende CON respuestas (etiquetas)", NARANJA, 25],
        [
          "No supervisado",
          "aprende SIN respuestas: descubre grupos",
          MORADO,
          85,
        ],
      ] as const
    ).map(([t, d, c, delay]) => (
      <Camino key={t} t={t} d={d} c={c} delay={delay} />
    ))}
    <Sfx src="pop.wav" at={25} />
    <Sfx src="pop.wav" at={85} />
  </Stage>
);

const Camino: React.FC<{ t: string; d: string; c: string; delay: number }> = ({
  t,
  d,
  c,
  delay,
}) => {
  const p = useIn(delay, 12);
  return (
    <div
      style={{
        width: 880,
        borderRadius: 28,
        border: `6px solid ${c}`,
        background: `${c}22`,
        padding: "28px 34px",
        fontFamily: FONT,
        opacity: p,
        translate: `${(1 - p) * 80}px 0px`,
      }}
    >
      <div style={{ fontWeight: 900, fontSize: 70, color: c }}>{t}</div>
      <div style={{ fontWeight: 700, fontSize: 40, color: C.ink }}>{d}</div>
    </div>
  );
};

export const DUR_ML0 = [175, 110, 190, 200, 200, 175];

export const ML0Aprender: React.FC = () => (
  <Capitulo
    parte={0}
    short="ml0"
    serie={SERIE_ML}
    acento={ORO}
    escenas={[
      { nombre: "Gancho", dur: DUR_ML0[0], voz: "a1", el: <Gancho /> },
      { nombre: "Reto", dur: DUR_ML0[1], voz: "a2", el: <RetoEsc /> },
      { nombre: "Reglas", dur: DUR_ML0[2], voz: "a3", el: <Reglas /> },
      { nombre: "Ejemplos", dur: DUR_ML0[3], voz: "a4", el: <Ejemplos /> },
      { nombre: "Dos caminos", dur: DUR_ML0[4], voz: "a5", el: <Caminos /> },
      {
        nombre: "Mapa",
        dur: DUR_ML0[5],
        voz: "a6",
        el: <AvanceML actual="T0" siguiente="T1" tema="Entrenar y evaluar" />,
      },
    ]}
  />
);

export const TOTAL_ML0 = duracionTotal(DUR_ML0);
