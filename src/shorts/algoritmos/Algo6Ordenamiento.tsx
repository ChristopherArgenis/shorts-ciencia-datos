import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Sfx, Stage, Words } from "../../kit/kit";
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
  Tarjeta,
} from "../../kit/serie";

// Parte 6: Ordenamiento (merge sort). Calificaciones ilustrativas.
const NUMS = [38, 27, 43, 3, 9, 82, 10, 55];
const N_EX = 1000;
const LENTO = (N_EX * (N_EX - 1)) / 2; // 499,500 comparaciones
const RAPIDO = Math.round(N_EX * Math.log2(N_EX)); // ≈ 9,966

const dividir = (xs: number[], tam: number) => {
  const out: number[][] = [];
  for (let i = 0; i < xs.length; i += tam) out.push(xs.slice(i, i + tam));
  return out;
};
const ordenarGrupos = (xs: number[], tam: number) =>
  dividir(xs, tam).map((g) => [...g].sort((a, b) => a - b));

const NIVELES_DIV = [
  dividir(NUMS, 8),
  dividir(NUMS, 4),
  dividir(NUMS, 2),
  dividir(NUMS, 1),
];
const NIVELES_JUNTAR = [
  dividir(NUMS, 1),
  ordenarGrupos(NUMS, 2),
  ordenarGrupos(NUMS, 4),
  ordenarGrupos(NUMS, 8),
];
const COL = (v: number) =>
  v < 20 ? C.blue : v < 45 ? C.green : v < 60 ? C.yellow : C.coral;

/** Una fila de grupos de fichas numéricas. */
const Fila: React.FC<{ grupos: number[][]; p: number; color?: string }> = ({
  grupos,
  p,
  color,
}) => (
  <div
    style={{
      display: "flex",
      gap: 22,
      justifyContent: "center",
      opacity: p,
      translate: `0px ${(1 - p) * 30}px`,
    }}
  >
    {grupos.map((g, i) => (
      <div
        key={i}
        style={{
          display: "flex",
          gap: 4,
          padding: 6,
          borderRadius: 14,
          border: `3px solid ${color ?? "#2a3366"}`,
        }}
      >
        {g.map((v, j) => (
          <div
            key={j}
            style={{
              width: 70,
              height: 70,
              borderRadius: 10,
              background: COL(v),
              color: C.bg,
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {v}
          </div>
        ))}
      </div>
    ))}
  </div>
);

const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  let s = 3;
  const r = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  const hojas = Array.from({ length: 18 }).map(() => [
    r() * 700,
    r() * 420,
    (r() - 0.5) * 40,
    Math.floor(10 + r() * 90),
  ]);
  return (
    <Stage gap={40}>
      <Words
        text="*1,000* exámenes desordenados"
        size={92}
        stagger={1}
        accent={C.yellow}
      />
      <div style={{ position: "relative", width: 860, height: 560 }}>
        {hojas.map(([x, y, rot, cal], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 150,
              height: 130,
              borderRadius: 10,
              background: "#eef1ff",
              rotate: `${rot}deg`,
              opacity: prog(frame, 10 + i * 2, 18 + i * 2),
              boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 54,
              color: COL(cal),
            }}
          >
            {cal}
          </div>
        ))}
      </div>
      <Words
        text="¿Cómo los *ordenas*?"
        size={72}
        delay={60}
        accent={C.green}
      />
      <Sfx src="whoosh.wav" at={10} volume={0.3} />
    </Stage>
  );
};

const Lento: React.FC = () => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [40, 110], [0, LENTO], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const ptr = Math.floor(prog(frame, 15, 60) * (NUMS.length - 1));
  return (
    <Stage gap={40}>
      <Words
        text="Forma lenta: buscar el *menor* una y otra vez"
        size={80}
        stagger={1}
        accent={C.coral}
      />
      <div style={{ display: "flex", gap: 8 }}>
        {NUMS.map((n, i) => (
          <div
            key={i}
            style={{
              width: 90,
              height: 90,
              borderRadius: 12,
              background: i === ptr ? C.yellow : C.bg2,
              color: i === ptr ? C.bg : C.ink,
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              outline: n === 3 && frame > 60 ? `5px solid ${C.green}` : "none",
            }}
          >
            {n}
          </div>
        ))}
      </div>
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
          fontSize: 50,
          color: C.dim,
        }}
      >
        comparaciones para 1,000
      </div>
      <Sfx src="tick.wav" at={15} />
    </Stage>
  );
};

const Dividir: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={36}>
      <Words text="Merge sort: *divide* a la mitad" size={84} accent={C.blue} />
      {NIVELES_DIV.map((g, i) => (
        <Fila key={i} grupos={g} p={prog(frame, 15 + i * 35, 35 + i * 35)} />
      ))}
      <Nota>Ejemplo simplificado con 8 exámenes</Nota>
      {[50, 85, 120].map((t) => (
        <Sfx key={t} src="pop.wav" at={t} volume={0.4} />
      ))}
    </Stage>
  );
};

const Juntar: React.FC = () => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [140, 190], [0, RAPIDO], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <Stage gap={30}>
      <Words text="…y *junta* pares ordenados" size={84} accent={C.green} />
      {NIVELES_JUNTAR.map((g, i) => (
        <Fila
          key={i}
          grupos={g}
          p={prog(frame, 10 + i * 35, 30 + i * 35)}
          color={i === 3 ? C.green : undefined}
        />
      ))}
      <Formula delay={120} size={56}>
        O(n log n)
      </Formula>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 70,
          color: C.green,
          opacity: prog(frame, 140, 150),
        }}
      >
        ≈ {fmt(v)} comparaciones
      </div>
      <Sfx src="ding.wav" at={115} volume={0.35} />
    </Stage>
  );
};

const Aplicacion: React.FC = () => (
  <Stage gap={28}>
    <Words
      text="Así lo usa un *científico* *de* *datos*"
      size={78}
      accent={C.blue}
    />
    <Tarjeta
      titulo="Rankings y top ventas"
      texto="los 10 productos que más se vendieron"
      color={C.yellow}
      delay={20}
    />
    <Codigo
      lineas={[
        'df.sort_values("ventas",',
        "              ascending=False).head(10)",
      ]}
      delay={60}
      size={36}
    />
    <Tarjeta
      titulo="La mediana"
      texto="para tomar el valor del medio, primero se ordena (mates #1)"
      color={C.green}
      delay={110}
    />
    <Tarjeta
      titulo="Python"
      texto="usa Timsort, un algoritmo basado en merge sort"
      color={C.blue}
      delay={160}
    />
    {[20, 110, 160].map((t) => (
      <Sfx key={t} src="pop.wav" at={t} />
    ))}
  </Stage>
);

export const DUR_A6 = [165, 185, 210, 220, 265, 160];

export const Algo6Ordenamiento: React.FC = () => (
  <Capitulo
    parte={6}
    short="algo6"
    serie={SERIE_ALGORITMOS}
    acento={C.yellow}
    escenas={[
      { nombre: "Gancho", dur: DUR_A6[0], voz: "f1", el: <Gancho /> },
      { nombre: "Lento", dur: DUR_A6[1], voz: "f2", el: <Lento /> },
      { nombre: "Dividir", dur: DUR_A6[2], voz: "f3", el: <Dividir /> },
      { nombre: "Juntar", dur: DUR_A6[3], voz: "f4", el: <Juntar /> },
      { nombre: "Aplicación", dur: DUR_A6[4], voz: "f5", el: <Aplicacion /> },
      {
        nombre: "Avance",
        dur: DUR_A6[5],
        voz: "f6",
        el: (
          <Avance
            parte={7}
            tema="Árboles"
            gancho="¿Tus carpetas son un *árbol*?"
          />
        ),
      },
    ]}
  />
);

export const TOTAL_A6 = duracionTotal(DUR_A6);
