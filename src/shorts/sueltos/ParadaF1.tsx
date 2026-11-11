import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Sfx, Stage, Sticker, Words } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import {
  Capitulo,
  duracionTotal,
  durVoz,
  Formula,
  Nota,
  prog,
} from "../../kit/serie";
import { Reto } from "../../kit/ml";

// Parada en boxes con probabilidad. Ejemplo simplificado: 20 tareas, 30% auto de seguridad, 10 s.
const S = "pitf1" as const;
const N = 20;
const perfecta = (p: number) => 100 * p ** N;

const Gancho = () => {
  const f = useCurrentFrame();
  const t = interpolate(f, [10, 70], [0, 2.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <Stage gap={40}>
      <div
        style={{
          fontFamily: MONO,
          fontWeight: 700,
          fontSize: 200,
          color: C.coral,
        }}
      >
        {t.toFixed(1)} s
      </div>
      <Words text="Una sola falla y se *arruina*" size={88} accent={C.coral} />
    </Stage>
  );
};
const RetoE = () => (
  <Stage>
    <Reto pregunta="Si cada tarea sale bien el 99%, ¿qué tan seguido sale perfecta?" />
  </Stage>
);
const Mecanico: React.FC<{ ok: boolean; delay: number }> = ({ ok, delay }) => {
  const f = useCurrentFrame();
  return (
    <svg
      width={110}
      height={130}
      viewBox="0 0 70 84"
      style={{ opacity: prog(f, delay, delay + 8) }}
    >
      <circle cx={35} cy={20} r={17} fill={ok ? C.green : C.coral} />
      <path
        d="M8 84 Q8 44 35 44 Q62 44 62 84 Z"
        fill={ok ? C.green : C.coral}
      />
    </svg>
  );
};
const Tareas = () => (
  <Stage gap={30}>
    <Words text="*20* tareas al mismo tiempo" size={90} accent={C.yellow} />
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 120px)",
        gap: 10,
      }}
    >
      {Array.from({ length: N }).map((_, i) => (
        <Mecanico key={i} ok delay={10 + i * 3} />
      ))}
    </div>
    <Formula delay={80} size={46}>
      P(perfecta) = p × p × … = p²⁰
    </Formula>
    <Nota>Ejemplo simplificado</Nota>
  </Stage>
);
const Res: React.FC<{ p: number; texto: string; color: string }> = ({
  p,
  texto,
  color,
}) => {
  const f = useCurrentFrame();
  const v = interpolate(f, [30, 70], [0, perfecta(p)], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: MONO, fontSize: 52, color: C.dim }}>
        {texto}
      </div>
      <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 150, color }}>
        {v.toFixed(1)}%
      </div>
    </div>
  );
};
const Con99 = () => (
  <Stage gap={30}>
    <Res p={0.99} texto="0.99²⁰ =" color={C.coral} />
    <Words
      text="solo *82* de cada 100 paradas son perfectas"
      size={70}
      delay={60}
      accent={C.coral}
    />
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 120px)",
        gap: 10,
      }}
    >
      {Array.from({ length: N }).map((_, i) => (
        <Mecanico key={i} ok={i !== 7 && i !== 14} delay={0} />
      ))}
    </div>
  </Stage>
);
const Mejor = () => (
  <Stage gap={36}>
    <Words text="Cada *décima* cuenta" size={92} accent={C.green} />
    <Res p={0.995} texto="0.995²⁰ =" color={C.yellow} />
    <Res p={0.999} texto="0.999²⁰ =" color={C.green} />
    <Sticker delay={110} bg={C.green} color={C.bg}>
      Por eso ensayan tanto
    </Sticker>
    <Sfx src="ding.wav" at={100} volume={0.35} />
  </Stage>
);
const Valor = () => {
  const f = useCurrentFrame();
  return (
    <Stage gap={30}>
      <Words
        text="¿Cuándo *parar*? Valor esperado"
        size={84}
        accent={C.yellow}
      />
      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "flex-end",
          height: 460,
        }}
      >
        {[
          ["auto de seguridad", 30, C.green, "ahorras 10 s"],
          ["sin auto de seguridad", 70, C.dim, "ahorras 0 s"],
        ].map(([t, v, c, a], i) => (
          <div
            key={t as string}
            style={{
              width: 400,
              textAlign: "center",
              fontFamily: FONT,
              fontWeight: 900,
            }}
          >
            <div style={{ fontSize: 70, color: c as string }}>
              {v as number}%
            </div>
            <div
              style={{
                height: (v as number) * 3.4 * prog(f, 20 + i * 15, 50 + i * 15),
                background: c as string,
                borderRadius: 16,
              }}
            />
            <div style={{ fontSize: 34, color: C.ink, marginTop: 8 }}>
              {t as string}
            </div>
            <div style={{ fontSize: 30, color: C.dim }}>{a as string}</div>
          </div>
        ))}
      </div>
      <Formula delay={120} size={44}>
        0.30 × 10 s + 0.70 × 0 s = 3 s
      </Formula>
      <Nota>Probabilidad y tiempos ilustrativos</Nota>
    </Stage>
  );
};
const Cierre = () => (
  <Stage gap={36}>
    <Words
      text="Parar ahora gana menos de 3 s → *espera*"
      size={78}
      stagger={1}
      accent={C.green}
    />
    <Words
      text="No es suerte: es *probabilidad*"
      size={92}
      delay={40}
      accent={C.yellow}
    />
    <Sticker delay={90} bg={C.coral} color={C.ink} rotate={2}>
      ¿Tú habrías esperado?
    </Sticker>
    <Sfx src="pop.wav" at={90} />
  </Stage>
);

const E = [
  { nombre: "Gancho", voz: "b1", el: <Gancho /> },
  { nombre: "Reto", voz: "b2", el: <RetoE /> },
  { nombre: "20 tareas", voz: "b3", el: <Tareas />, min: 200 },
  { nombre: "99%", voz: "b4", el: <Con99 />, min: 180 },
  { nombre: "99.9%", voz: "b5", el: <Mejor />, min: 200 },
  { nombre: "Valor esperado", voz: "b6", el: <Valor />, min: 200 },
  { nombre: "Cierre", voz: "b7", el: <Cierre />, min: 170 },
];
const ESC = E.map((e) => ({ ...e, dur: durVoz(S, e.voz, e.min ?? 120) }));
export const ParadaF1: React.FC = () => (
  <Capitulo parte={1} short={S} suelto acento={C.coral} escenas={ESC} />
);
export const TOTAL_PITF1 = duracionTotal(ESC.map((e) => e.dur));
