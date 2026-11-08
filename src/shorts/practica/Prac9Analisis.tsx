import React from "react";
import { useCurrentFrame } from "remotion";
import { Sfx, Stage, Words, useIn } from "../../kit/kit";
import { C, FONT } from "../../kit/theme";
import {
  Capitulo,
  duracionTotal,
  Nota,
  prog,
  SERIE_PRACTICA,
} from "../../kit/serie";

// Parte 9: Los 4 tipos de análisis (caso ficticio: Café Datos).
type Tipo = { n: string; q: string; r: string; c: string };
const TIPOS: Tipo[] = [
  {
    n: "Descriptivo",
    q: "¿Qué pasó?",
    r: "Las ventas bajaron 15% la semana pasada",
    c: C.blue,
  },
  {
    n: "Diagnóstico",
    q: "¿Por qué pasó?",
    r: "Llovió 5 días y llegó menos gente",
    c: C.purple,
  },
  {
    n: "Predictivo",
    q: "¿Qué pasará?",
    r: "Se espera lluvia la próxima semana",
    c: C.yellow,
  },
  {
    n: "Prescriptivo",
    q: "¿Qué hago?",
    r: "Promo de chocolate caliente + más envíos a domicilio",
    c: C.green,
  },
];

/** Escalera: muestra los primeros `k` tipos; el último activo resaltado. */
const Escalera: React.FC<{ k: number }> = ({ k }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column-reverse",
      gap: 14,
      width: 880,
    }}
  >
    {TIPOS.map((t, i) => {
      const on = i === k - 1;
      const visible = i < k;
      return (
        <div
          key={t.n}
          style={{
            marginLeft: i * 50,
            width: 880 - i * 50,
            background: on ? t.c : visible ? `${t.c}33` : C.bg2,
            border: `4px solid ${visible ? t.c : "#2a3366"}`,
            borderRadius: 24,
            padding: "18px 26px",
            fontFamily: FONT,
            color: on ? C.bg : visible ? C.ink : C.dim,
            opacity: visible ? 1 : 0.35,
          }}
        >
          <div style={{ fontWeight: 900, fontSize: 46 }}>
            {i + 1}. {t.n}{" "}
            <span style={{ fontWeight: 700, fontSize: 38 }}>· {t.q}</span>
          </div>
          {on ? (
            <div style={{ fontWeight: 700, fontSize: 36, marginTop: 4 }}>
              {t.r}
            </div>
          ) : null}
        </div>
      );
    })}
  </div>
);

const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={40}>
      <Words
        text="Un café. *4* preguntas."
        size={96}
        stagger={1}
        accent={C.green}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          width: 880,
        }}
      >
        {TIPOS.map((t, i) => (
          <div
            key={t.q}
            style={{
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 52,
              color: t.c,
              background: C.bg2,
              borderRadius: 24,
              padding: "28px 20px",
              textAlign: "center",
              opacity: prog(frame, 20 + i * 10, 30 + i * 10),
            }}
          >
            {t.q}
          </div>
        ))}
      </div>
      <Nota>Café Datos es un caso ficticio</Nota>
      {[20, 30, 40, 50].map((t) => (
        <Sfx key={t} src="tick.wav" at={t} />
      ))}
    </Stage>
  );
};

const Paso: React.FC<{ k: number }> = ({ k }) => {
  const p = useIn(5, 12);
  return (
    <Stage gap={36}>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 96,
          color: TIPOS[k - 1].c,
          opacity: p,
          scale: 0.85 + 0.15 * p,
        }}
      >
        {TIPOS[k - 1].n}
      </div>
      <Escalera k={k} />
      <Sfx src="pop.wav" at={5} />
    </Stage>
  );
};

const Valor: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={22}>
      <div style={{ scale: 0.82, margin: "-40px 0" }}>
        <Escalera k={4} />
      </div>
      <svg
        width={880}
        height={120}
        viewBox="0 0 880 120"
        style={{ opacity: prog(frame, 20, 35) }}
      >
        <defs>
          <marker
            id="fv"
            markerWidth={8}
            markerHeight={8}
            refX={5}
            refY={4}
            orient="auto"
          >
            <path d="M0,0 L8,4 L0,8 Z" fill={C.green} />
          </marker>
        </defs>
        <line
          x1={40}
          y1={90}
          x2={820}
          y2={20}
          stroke={C.green}
          strokeWidth={12}
          markerEnd="url(#fv)"
        />
      </svg>
      <div
        style={{
          display: "flex",
          gap: 40,
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 52,
          opacity: prog(frame, 30, 45),
        }}
      >
        <span style={{ color: C.coral }}>+ difícil</span>
        <span style={{ color: C.green }}>+ valor</span>
      </div>
      <Nota>Predictivo y prescriptivo usan modelos: su propia serie</Nota>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 56,
          color: C.bg,
          background: C.green,
          borderRadius: 24,
          padding: "14px 34px",
          opacity: prog(frame, 100, 115),
        }}
      >
        Parte 10: Comunicar y decidir
      </div>
    </Stage>
  );
};

export const DUR_P9 = [140, 180, 160, 165, 190, 185];

export const Prac9Analisis: React.FC = () => (
  <Capitulo
    parte={9}
    short="prac9"
    serie={SERIE_PRACTICA}
    acento={C.purple}
    escenas={[
      { nombre: "Gancho", dur: DUR_P9[0], voz: "w1", el: <Gancho /> },
      { nombre: "Descriptivo", dur: DUR_P9[1], voz: "w2", el: <Paso k={1} /> },
      { nombre: "Diagnóstico", dur: DUR_P9[2], voz: "w3", el: <Paso k={2} /> },
      { nombre: "Predictivo", dur: DUR_P9[3], voz: "w4", el: <Paso k={3} /> },
      { nombre: "Prescriptivo", dur: DUR_P9[4], voz: "w5", el: <Paso k={4} /> },
      { nombre: "Valor y avance", dur: DUR_P9[5], voz: "w6", el: <Valor /> },
    ]}
  />
);

export const TOTAL_P9 = duracionTotal(DUR_P9);
