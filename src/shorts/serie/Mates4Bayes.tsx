import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Sfx, Stage, Sticker, Words, useIn } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import {
  Avance,
  Capitulo,
  duracionTotal,
  Formula,
  Nota,
  prog,
} from "../../kit/serie";

// Parte 4: Probabilidad condicional (Bayes). Números ilustrativos:
// 100 correos, 30 spam; "GRATIS" aparece en 18 spam y 7 normales → P(spam | gratis) = 18/25 = 72 %.
const CORREOS = Array.from({ length: 100 }).map((_, i) => ({
  spam: (i * 37) % 100 < 30,
}));
{
  let s = 0;
  let n = 0;
  CORREOS.forEach((c) => {
    (c as { gratis?: boolean }).gratis = c.spam ? s++ < 18 : n++ < 7;
  });
}
type Correo = { spam: boolean; gratis?: boolean };

const Sobre: React.FC<{
  color: string;
  tag?: boolean;
  size?: number;
  opacity?: number;
}> = ({ color, tag, size = 66, opacity = 1 }) => (
  <svg
    width={size}
    height={size * 0.75}
    viewBox="0 0 40 30"
    style={{ opacity }}
  >
    <rect x={1} y={1} width={38} height={28} rx={4} fill={color} />
    <path
      d="M2 3 L20 17 L38 3"
      fill="none"
      stroke="#0b1020"
      strokeWidth={2.5}
    />
    {tag ? (
      <rect
        x={24}
        y={18}
        width={14}
        height={10}
        rx={2}
        fill={C.yellow}
        stroke="#0b1020"
        strokeWidth={1.5}
      />
    ) : null}
  </svg>
);

/** Rejilla 10×10 de correos. modo: 0 = todos, 1 = marcar GRATIS, 2 = solo los que dicen GRATIS. */
const Rejilla: React.FC<{ modo: number; delay?: number; size?: number }> = ({
  modo,
  delay = 0,
  size = 72,
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(10, ${size}px)`,
        gap: 6,
      }}
    >
      {(CORREOS as Correo[]).map((c, i) => {
        const p = prog(frame, delay + i * 0.4, delay + i * 0.4 + 6);
        const color = c.spam ? C.coral : C.blue;
        const op =
          modo === 2 && !c.gratis ? 0.08 : modo === 1 && !c.gratis ? 0.35 : 1;
        return (
          <div key={i} style={{ scale: 0.5 + 0.5 * p, opacity: p }}>
            <Sobre
              color={color}
              tag={modo >= 1 && c.gratis}
              opacity={op}
              size={80}
            />
          </div>
        );
      })}
    </div>
  );
};

const Leyenda: React.FC = () => (
  <div
    style={{
      display: "flex",
      gap: 30,
      fontFamily: FONT,
      fontWeight: 800,
      fontSize: 42,
    }}
  >
    <span style={{ color: C.coral }}>■ spam</span>
    <span style={{ color: C.blue }}>■ normal</span>
    <span style={{ color: C.yellow }}>■ dice "GRATIS"</span>
  </div>
);

const Gancho: React.FC = () => {
  const p = useIn(20, 10);
  return (
    <Stage gap={50}>
      <Words
        text="¿Cómo sabe tu correo que esto es *spam*?"
        size={88}
        stagger={1}
        accent={C.coral}
      />
      <div
        style={{
          width: 860,
          background: "#f4f6ff",
          borderRadius: 30,
          padding: "30px 34px",
          fontFamily: FONT,
          color: "#0b1020",
          opacity: p,
          scale: 0.85 + 0.15 * p,
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 34, color: "#5a6290" }}>
          De: premios-ya@…
        </div>
        <div style={{ fontWeight: 900, fontSize: 64, marginTop: 6 }}>
          ¡GRATIS! Ganaste un premio
        </div>
        <div
          style={{
            fontWeight: 600,
            fontSize: 36,
            color: "#5a6290",
            marginTop: 6,
          }}
        >
          Haz clic aquí para reclamarlo…
        </div>
      </div>
      <Sfx src="pop.wav" at={20} />
    </Stage>
  );
};

const Base: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={30}>
      <Words text="De cada 100 correos…" size={80} />
      <Rejilla modo={0} delay={10} />
      <Leyenda />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 90,
          color: C.coral,
          opacity: prog(frame, 70, 80),
        }}
      >
        30 spam = 30%
      </div>
      <Nota>Números ilustrativos</Nota>
    </Stage>
  );
};

const Pista: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={30}>
      <Words text="Pero este dice *GRATIS*" size={88} accent={C.yellow} />
      <Rejilla modo={1} />
      <Leyenda />
      <div
        style={{
          display: "flex",
          gap: 40,
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 64,
        }}
      >
        <span style={{ color: C.coral, opacity: prog(frame, 40, 50) }}>
          18 spam
        </span>
        <span style={{ color: C.blue, opacity: prog(frame, 70, 80) }}>
          7 normales
        </span>
      </div>
      <Sfx src="tick.wav" at={40} />
      <Sfx src="tick.wav" at={70} />
    </Stage>
  );
};

const Condicional: React.FC = () => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [80, 120], [0, 72], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <Stage gap={30}>
      <Words
        text="Mira *solo* los que dicen GRATIS"
        size={70}
        accent={C.yellow}
      />
      <Rejilla modo={2} size={58} />
      <Formula delay={40} size={48}>
        P(spam | GRATIS) = 18 / 25
      </Formula>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 150,
          color: C.coral,
        }}
      >
        {Math.round(v)}%
      </div>
      <Sfx src="ding.wav" at={120} volume={0.4} />
    </Stage>
  );
};

const Bayes: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={34}>
      <Words
        text="Eso es el *Teorema* *de* *Bayes*"
        size={84}
        accent={C.yellow}
      />
      <Formula delay={10} size={44}>
        P(spam|GRATIS) = P(GRATIS|spam) · P(spam) / P(GRATIS)
      </Formula>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 52,
          color: C.ink,
          opacity: prog(frame, 45, 60),
        }}
      >
        = 0.60 · 0.30 / 0.25 ={" "}
        <span style={{ color: C.coral, fontWeight: 700 }}>0.72</span>
      </div>
      <Words
        text="La probabilidad se *actualiza* con cada pista."
        size={60}
        weight={800}
        delay={70}
        accent={C.green}
      />
      <Sticker delay={110} bg={C.blue} color={C.ink}>
        Filtros "Bayes ingenuo": repiten esto con cada palabra
      </Sticker>
      <Sfx src="pop.wav" at={110} />
    </Stage>
  );
};

export const DUR_M4 = [130, 180, 210, 220, 185, 150];

export const Mates4Bayes: React.FC = () => (
  <Capitulo
    parte={4}
    short="mates4"
    acento={C.blue}
    escenas={[
      { nombre: "Gancho", dur: DUR_M4[0], voz: "p1", el: <Gancho /> },
      { nombre: "Base", dur: DUR_M4[1], voz: "p2", el: <Base /> },
      { nombre: "Pista", dur: DUR_M4[2], voz: "p3", el: <Pista /> },
      { nombre: "Condicional", dur: DUR_M4[3], voz: "p4", el: <Condicional /> },
      { nombre: "Bayes", dur: DUR_M4[4], voz: "p5", el: <Bayes /> },
      {
        nombre: "Avance",
        dur: DUR_M4[5],
        voz: "p6",
        el: (
          <Avance
            parte={5}
            tema="Correlación ≠ causalidad"
            gancho="¿El helado causa *ahogados*?"
          />
        ),
      },
    ]}
  />
);

export const TOTAL_M4 = duracionTotal(DUR_M4);
