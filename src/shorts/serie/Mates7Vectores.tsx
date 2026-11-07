import React from "react";
import { useCurrentFrame } from "remotion";
import { Sfx, Stage, Sticker, Words } from "../../kit/kit";
import { C, FONT } from "../../kit/theme";
import {
  Avance,
  Capitulo,
  duracionTotal,
  fmt,
  Formula,
  Nota,
  prog,
  Tarjeta,
} from "../../kit/serie";

// Parte 7: Vectores y similitud coseno. Gustos ilustrativos (horas a la semana).
type V = { n: string; v: [number, number]; c: string };
const TU: V = { n: "Tú", v: [8, 2], c: C.yellow };
const ANA: V = { n: "Ana", v: [7, 3], c: C.green };
const LUIS: V = { n: "Luis", v: [1, 9], c: C.coral };
const cos = (a: [number, number], b: [number, number]) =>
  (a[0] * b[0] + a[1] * b[1]) / (Math.hypot(...a) * Math.hypot(...b));
const COS_ANA = cos(TU.v, ANA.v); // ≈ 0.99
const COS_LUIS = cos(TU.v, LUIS.v); // ≈ 0.35
const grados = (c: number) => (Math.acos(c) * 180) / Math.PI;

/** Plano con ejes "Rock" y "Reguetón" y flechas desde el origen. */
const Plano: React.FC<{
  flechas: { v: V; p: number }[];
  arco?: { a: V; b: V; p: number };
}> = ({ flechas, arco }) => {
  const S = 760;
  const O = 90;
  const k = (S - O - 40) / 10;
  const px = (x: number) => O + x * k;
  const py = (y: number) => S - O - y * k;
  return (
    <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`}>
      <defs>
        {flechas.map(({ v }) => (
          <marker
            key={v.n}
            id={`p-${v.n}`}
            markerWidth={8}
            markerHeight={8}
            refX={5}
            refY={4}
            orient="auto"
          >
            <path d="M0,0 L8,4 L0,8 Z" fill={v.c} />
          </marker>
        ))}
      </defs>
      <line
        x1={O}
        y1={S - O}
        x2={S - 20}
        y2={S - O}
        stroke={C.dim}
        strokeWidth={4}
      />
      <line x1={O} y1={S - O} x2={O} y2={20} stroke={C.dim} strokeWidth={4} />
      <text
        x={S - 30}
        y={S - O + 50}
        fill={C.dim}
        fontFamily={FONT}
        fontWeight={800}
        fontSize={38}
        textAnchor="end"
      >
        Rock →
      </text>
      <text
        x={O - 20}
        y={40}
        fill={C.dim}
        fontFamily={FONT}
        fontWeight={800}
        fontSize={38}
        textAnchor="end"
        transform={`rotate(-90 ${O - 20} 40)`}
      >
        Reguetón →
      </text>
      {arco && arco.p > 0
        ? (() => {
            const r = 170;
            const a1 = Math.atan2(arco.a.v[1], arco.a.v[0]);
            const a2 = Math.atan2(arco.b.v[1], arco.b.v[0]);
            const am = a1 + (a2 - a1) * arco.p;
            const x1 = px(0) + r * Math.cos(a1);
            const y1 = py(0) - r * Math.sin(a1);
            const x2 = px(0) + r * Math.cos(am);
            const y2 = py(0) - r * Math.sin(am);
            return (
              <path
                d={`M ${x1} ${y1} A ${r} ${r} 0 0 0 ${x2} ${y2}`}
                fill="none"
                stroke={arco.b.c}
                strokeWidth={8}
              />
            );
          })()
        : null}
      {flechas.map(({ v, p }) => (
        <g key={v.n} opacity={p > 0 ? 1 : 0}>
          <line
            x1={px(0)}
            y1={py(0)}
            x2={px(v.v[0] * p)}
            y2={py(v.v[1] * p)}
            stroke={v.c}
            strokeWidth={12}
            strokeLinecap="round"
            markerEnd={`url(#p-${v.n})`}
          />
          <text
            x={px(v.v[0]) + 14}
            y={py(v.v[1]) - 14}
            fill={v.c}
            fontFamily={FONT}
            fontWeight={900}
            fontSize={48}
            opacity={p}
          >
            {v.n}
          </text>
        </g>
      ))}
    </svg>
  );
};

const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={30}>
      <Words
        text="Para tu app de música, *tú* *eres* *una* *flecha*"
        size={84}
        stagger={1}
        accent={C.yellow}
      />
      <Plano flechas={[{ v: TU, p: prog(frame, 25, 60) }]} />
      <Nota>Ejemplo simplificado</Nota>
      <Sfx src="whoosh.wav" at={25} volume={0.35} />
    </Stage>
  );
};

const Ejes: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={30}>
      <Words text="Cada eje es un *gusto*" size={92} accent={C.yellow} />
      <Plano flechas={[{ v: TU, p: 1 }]} />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 64,
          color: C.yellow,
          opacity: prog(frame, 50, 60),
        }}
      >
        Tú = (8 rock, 2 reguetón)
      </div>
    </Stage>
  );
};

const Parecidos: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={30}>
      <Words text="¿Quién se *parece* a ti?" size={92} accent={C.green} />
      <Plano
        flechas={[
          { v: TU, p: 1 },
          { v: ANA, p: prog(frame, 20, 50) },
          { v: LUIS, p: prog(frame, 50, 80) },
        ]}
      />
      <Words
        text="Mismo lado = gustos *parecidos*"
        size={62}
        weight={800}
        delay={90}
        accent={C.green}
      />
      <Sfx src="pop.wav" at={20} />
      <Sfx src="pop.wav" at={50} />
    </Stage>
  );
};

const Coseno: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={26}>
      <Words text="La *similitud* *coseno*" size={88} accent={C.yellow} />
      <Formula delay={10} size={48}>
        cos θ = (A·B) / (|A|·|B|)
      </Formula>
      <Plano
        flechas={[
          { v: TU, p: 1 },
          { v: ANA, p: 1 },
          { v: LUIS, p: 1 },
        ]}
        arco={
          frame < 120
            ? { a: TU, b: ANA, p: prog(frame, 50, 75) }
            : { a: TU, b: LUIS, p: prog(frame, 125, 160) }
        }
      />
      <div
        style={{
          display: "flex",
          gap: 40,
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 56,
        }}
      >
        <span style={{ color: C.green, opacity: prog(frame, 75, 85) }}>
          Ana: {fmt(COS_ANA, 2)} ({Math.round(grados(COS_ANA))}°)
        </span>
        <span style={{ color: C.coral, opacity: prog(frame, 160, 170) }}>
          Luis: {fmt(COS_LUIS, 2)} ({Math.round(grados(COS_LUIS))}°)
        </span>
      </div>
      <Sfx src="ding.wav" at={75} volume={0.35} />
      <Sfx src="tick.wav" at={160} />
    </Stage>
  );
};

const Aplicacion: React.FC = () => (
  <Stage gap={28}>
    <Words
      text="Así lo usa un *científico* *de* *datos*"
      size={78}
      accent={C.yellow}
    />
    <Tarjeta
      titulo="Recomendaciones"
      texto="canciones o productos cuya flecha apunta como la tuya"
      color={C.green}
      delay={20}
    />
    <Tarjeta
      titulo="Búsquedas por significado"
      texto="textos convertidos en vectores: 'barato' cerca de 'económico'"
      color={C.blue}
      delay={50}
    />
    <Tarjeta
      titulo="No son 2 ejes"
      texto="los modelos usan cientos de dimensiones a la vez"
      color={C.purple}
      delay={80}
    />
    <Sticker delay={130} bg={C.yellow}>
      ¿Viste el Short de Netflix? Es esto
    </Sticker>
    {[20, 50, 80].map((t) => (
      <Sfx key={t} src="pop.wav" at={t} />
    ))}
  </Stage>
);

export const DUR_M7 = [130, 180, 180, 250, 225, 180];

export const Mates7Vectores: React.FC = () => (
  <Capitulo
    parte={7}
    short="mates7"
    acento={C.green}
    escenas={[
      { nombre: "Gancho", dur: DUR_M7[0], voz: "v1", el: <Gancho /> },
      { nombre: "Ejes", dur: DUR_M7[1], voz: "v2", el: <Ejes /> },
      { nombre: "Parecidos", dur: DUR_M7[2], voz: "v3", el: <Parecidos /> },
      { nombre: "Coseno", dur: DUR_M7[3], voz: "v4", el: <Coseno /> },
      { nombre: "Aplicación", dur: DUR_M7[4], voz: "v5", el: <Aplicacion /> },
      {
        nombre: "Avance",
        dur: DUR_M7[5],
        voz: "v6",
        el: (
          <Avance
            parte={8}
            tema="Descenso de gradiente"
            gancho="¿Cómo *aprende* una IA?"
          />
        ),
      },
    ]}
  />
);

export const TOTAL_M7 = duracionTotal(DUR_M7);
