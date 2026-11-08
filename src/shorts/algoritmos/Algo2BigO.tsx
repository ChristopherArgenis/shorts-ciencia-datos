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
  Formula,
  Nota,
  prog,
  SERIE_ALGORITMOS,
} from "../../kit/serie";

// Parte 2: Notación Big O. Supuesto ilustrativo: 1 paso = 1 microsegundo, n = 100,000 filas.
const N = 100000;
const US = 1e-6;
const T_N2 = N * N * US; // 10,000 s ≈ 2.8 h
const T_N = N * US; // 0.1 s

const Cronometro: React.FC<{
  titulo: string;
  segundos: number;
  color: string;
  delay: number;
}> = ({ titulo, segundos, color, delay }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const v = segundos * p;
  const txt = segundos >= 3600 ? `${fmt(v / 3600, 1)} h` : `${fmt(v, 1)} s`;
  return (
    <div
      style={{
        width: 420,
        background: C.bg2,
        borderRadius: 28,
        padding: "30px 18px",
        textAlign: "center",
        borderTop: `12px solid ${color}`,
        fontFamily: FONT,
      }}
    >
      <div style={{ fontWeight: 900, fontSize: 48, color }}>{titulo}</div>
      <div
        style={{
          fontWeight: 900,
          fontSize: 110,
          color: C.ink,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {txt}
      </div>
    </div>
  );
};

const Gancho: React.FC = () => (
  <Stage gap={40}>
    <Words
      text="El *mismo* problema. Dos códigos."
      size={88}
      stagger={1}
      accent={C.yellow}
    />
    <div style={{ display: "flex", gap: 30 }}>
      <Cronometro titulo="Código A" segundos={T_N} color={C.green} delay={20} />
      <Cronometro
        titulo="Código B"
        segundos={T_N2}
        color={C.coral}
        delay={20}
      />
    </div>
    <Sticker delay={95} bg={C.coral} color={C.ink}>
      ¿Por qué tanta diferencia?
    </Sticker>
    <Nota>Ejemplo simplificado · 1 paso = 1 microsegundo</Nota>
    <Sfx src="pop.wav" at={95} />
  </Stage>
);

const Problema: React.FC = () => {
  const frame = useCurrentFrame();
  const k = 8;
  const activos = Math.floor(
    interpolate(frame, [90, 200], [0, k * k], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  return (
    <Stage gap={34}>
      <Words
        text="¿Hay correos *repetidos* en 100,000 filas?"
        size={80}
        stagger={1}
        accent={C.yellow}
      />
      <div
        style={{
          fontFamily: MONO,
          fontSize: 36,
          color: C.ink,
          background: C.bg2,
          borderRadius: 18,
          padding: "16px 26px",
          lineHeight: 1.5,
        }}
      >
        {[
          "ana@correo.com",
          "luis@correo.com",
          "sofia@correo.com",
          "…",
          "ana@correo.com",
        ].map((c, i) => (
          <div
            key={i}
            style={{
              color: i === 4 ? C.coral : C.ink,
              opacity: prog(frame, 15 + i * 6, 25 + i * 6),
            }}
          >
            {c}
          </div>
        ))}
      </div>
      <Words
        text="Opción 1: comparar *cada* *uno* *con* *todos*"
        size={62}
        weight={800}
        delay={70}
        accent={C.coral}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${k}, 52px)`,
          gap: 6,
        }}
      >
        {Array.from({ length: k * k }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 52,
              height: 52,
              borderRadius: 8,
              background: i < activos ? C.coral : C.bg2,
            }}
          />
        ))}
      </div>
    </Stage>
  );
};

const Cuadrado: React.FC = () => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [20, 80], [0, N * N], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <Stage gap={40}>
      <Words text="100,000 × 100,000 =" size={84} />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 110,
          color: C.coral,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {fmt(v)}
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 56,
          color: C.dim,
        }}
      >
        pasos
      </div>
      <Formula delay={90} size={80}>
        O(n²)
      </Formula>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 64,
          color: C.coral,
          opacity: prog(frame, 120, 130),
        }}
      >
        ≈ {fmt(T_N2 / 3600, 1)} horas
      </div>
      <Sfx src="boom.wav" at={80} volume={0.45} />
    </Stage>
  );
};

const Lineal: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={36}>
      <Words
        text="Opción 2: revisar cada correo *una* *vez*"
        size={80}
        stagger={1}
        accent={C.green}
      />
      <div
        style={{
          width: 860,
          height: 40,
          background: C.bg2,
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${100 * prog(frame, 30, 90)}%`,
            height: "100%",
            background: C.green,
          }}
        />
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 100,
          color: C.green,
        }}
      >
        {fmt(N)} pasos
      </div>
      <Formula delay={60} size={80}>
        O(n)
      </Formula>
      <Codigo
        lineas={[
          "len(correos) != len(set(correos))",
          "# set: lo vemos en la parte 4",
        ]}
        delay={90}
        size={38}
      />
      <Sfx src="ding.wav" at={90} volume={0.35} />
    </Stage>
  );
};

const Curvas: React.FC = () => {
  const frame = useCurrentFrame();
  const W = 860;
  const H = 520;
  const f: [string, (x: number) => number, string][] = [
    ["O(1)", () => 0.05, C.green],
    ["O(log n)", (x) => 0.05 + (0.12 * Math.log2(1 + 15 * x)) / 4, C.blue],
    ["O(n)", (x) => x * 0.55, C.yellow],
    ["O(n²)", (x) => x * x * 1.6, C.coral],
  ];
  const d = prog(frame, 20, 90);
  return (
    <Stage gap={30}>
      <Words
        text="*Big* *O*: cómo crece el tiempo"
        size={84}
        accent={C.yellow}
      />
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <line
          x1={60}
          y1={H - 60}
          x2={W - 20}
          y2={H - 60}
          stroke={C.dim}
          strokeWidth={4}
        />
        <line
          x1={60}
          y1={20}
          x2={60}
          y2={H - 60}
          stroke={C.dim}
          strokeWidth={4}
        />
        <text
          x={W - 20}
          y={H - 20}
          fill={C.dim}
          fontFamily={FONT}
          fontWeight={800}
          fontSize={32}
          textAnchor="end"
        >
          más datos →
        </text>
        <text
          x={40}
          y={(H - 60) / 2}
          fill={C.dim}
          fontFamily={FONT}
          fontWeight={800}
          fontSize={32}
          textAnchor="middle"
          transform={`rotate(-90 40 ${(H - 60) / 2})`}
        >
          tiempo
        </text>
        {f.map(([nom, g, c], k) => {
          const pts = Array.from({ length: 60 }).map((_, i) => i / 59);
          const path = pts
            .map((x, i) => {
              const y = Math.min(1, g(x));
              return `${i ? "L" : "M"}${(60 + (W - 100) * x).toFixed(1)},${(H - 60 - (H - 90) * y).toFixed(1)}`;
            })
            .join(" ");
          const yEnd = Math.min(1, g(1));
          return (
            <g key={nom}>
              <path
                d={path}
                fill="none"
                stroke={c}
                strokeWidth={8}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - d}
              />
              <text
                x={W - 30 - (k === 3 ? 260 : 0)}
                y={
                  H -
                  60 -
                  (H - 90) * (k === 3 ? 1 : yEnd) +
                  (k === 3 ? 10 : -14)
                }
                fill={c}
                fontFamily={MONO}
                fontWeight={700}
                fontSize={38}
                textAnchor="end"
                opacity={prog(frame, 80, 95)}
              >
                {nom}
              </text>
            </g>
          );
        })}
      </svg>
      <Words
        text="Segundos… o *días*."
        size={80}
        delay={110}
        accent={C.coral}
      />
    </Stage>
  );
};

export const DUR_A2 = [195, 235, 210, 185, 265, 170];

export const Algo2BigO: React.FC = () => (
  <Capitulo
    parte={2}
    short="algo2"
    serie={SERIE_ALGORITMOS}
    acento={C.coral}
    escenas={[
      { nombre: "Gancho", dur: DUR_A2[0], voz: "b1", el: <Gancho /> },
      { nombre: "Problema", dur: DUR_A2[1], voz: "b2", el: <Problema /> },
      { nombre: "O(n²)", dur: DUR_A2[2], voz: "b3", el: <Cuadrado /> },
      { nombre: "O(n)", dur: DUR_A2[3], voz: "b4", el: <Lineal /> },
      { nombre: "Curvas", dur: DUR_A2[4], voz: "b5", el: <Curvas /> },
      {
        nombre: "Avance",
        dur: DUR_A2[5],
        voz: "b6",
        el: (
          <Avance
            parte={3}
            tema="Búsqueda binaria"
            gancho="¿1 entre un *millón*… en 20 intentos?"
          />
        ),
      },
    ]}
  />
);

export const TOTAL_A2 = duracionTotal(DUR_A2);
