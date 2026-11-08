import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Sfx, Stage, Sticker, Words } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import {
  Capitulo,
  Codigo,
  duracionTotal,
  Nota,
  prog,
  SERIE_PRACTICA,
  Tarjeta,
  useSerie,
} from "../../kit/serie";
import { LogoCafe } from "./cafe";

// Parte 10: Comunicar y decidir (caso ficticio: Café Datos). Ventas semanales ficticias.
const SEM = ["S1", "S2", "S3", "S4"];
const VENTAS = [4600, 4700, 4750, 4900];

/** Barras con eje Y desde `y0`. */
const Barras: React.FC<{ y0: number; color: string; anim?: number }> = ({
  y0,
  color,
  anim = 1,
}) => {
  const W = 760;
  const H = 520;
  const max = 5000;
  const y = (v: number) => H - 60 - ((H - 100) * (v - y0)) / (max - y0);
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <line
        x1={110}
        y1={H - 60}
        x2={W - 20}
        y2={H - 60}
        stroke={C.dim}
        strokeWidth={4}
      />
      <line
        x1={110}
        y1={30}
        x2={110}
        y2={H - 60}
        stroke={C.dim}
        strokeWidth={4}
      />
      {[y0, (y0 + max) / 2, max].map((v) => (
        <text
          key={v}
          x={98}
          y={y(v) + 10}
          fill={v === y0 ? C.coral : C.dim}
          fontFamily={MONO}
          fontWeight={700}
          fontSize={30}
          textAnchor="end"
        >
          {Math.round(v)}
        </text>
      ))}
      {VENTAS.map((v, i) => {
        const top = y(v);
        const h = (H - 60 - top) * anim;
        return (
          <g key={i}>
            <rect
              x={150 + i * 150}
              y={H - 60 - h}
              width={100}
              height={h}
              rx={10}
              fill={color}
            />
            <text
              x={200 + i * 150}
              y={H - 20}
              fill={C.ink}
              fontFamily={FONT}
              fontWeight={800}
              fontSize={30}
              textAnchor="middle"
            >
              {SEM[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const Gancho: React.FC = () => (
  <Stage gap={40}>
    <Words
      text="Un análisis que nadie entiende… *no* *sirve*"
      size={88}
      stagger={1}
      accent={C.coral}
    />
    <div
      style={{
        fontFamily: MONO,
        fontSize: 30,
        color: C.dim,
        background: "#0a0d1a",
        borderRadius: 18,
        padding: "20px 26px",
        width: 820,
        lineHeight: 1.5,
      }}
    >
      p=0.03 · σ=412.7 · r=0.61 · n=2,314 · IQR=33 · z=2.4 ·
      groupby(['día','producto']).agg(...)
    </div>
    <Sfx src="boom.wav" at={30} volume={0.35} />
  </Stage>
);

const Engano: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={30}>
      <Words text="¿Las ventas se *dispararon*?" size={88} accent={C.coral} />
      <Barras
        y0={4000}
        color={C.coral}
        anim={interpolate(frame, [15, 60], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        })}
      />
      <Nota>Ventas semanales ficticias de Café Datos</Nota>
    </Stage>
  );
};

const Cero: React.FC = () => {
  const frame = useCurrentFrame();
  const desde0 = frame > 60;
  return (
    <Stage gap={30}>
      <Words
        text={
          desde0
            ? "Desde *cero*: el cambio es pequeño"
            : "El eje empieza en *4,000*"
        }
        size={80}
        accent={desde0 ? C.green : C.coral}
      />
      <Barras y0={desde0 ? 0 : 4000} color={desde0 ? C.green : C.coral} />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 60,
          color: C.green,
          opacity: prog(frame, 75, 90),
        }}
      >
        +6.5% en un mes
      </div>
      <Sfx src="whoosh.wav" at={60} volume={0.35} />
    </Stage>
  );
};

const Reglas: React.FC = () => (
  <Stage gap={28}>
    <Words text="Para *comunicar*" size={96} accent={C.green} />
    <Tarjeta
      titulo="1 idea por gráfica"
      texto="si tiene 5 mensajes, no dice ninguno"
      color={C.blue}
      delay={15}
    />
    <Tarjeta
      titulo="La gráfica correcta"
      texto="barras para comparar, líneas para el tiempo"
      color={C.yellow}
      delay={45}
    />
    <Tarjeta
      titulo="Una recomendación clara"
      texto="“Hornear 30 panes más los fines de semana”"
      color={C.green}
      delay={75}
    />
    {[15, 45, 75].map((t) => (
      <Sfx key={t} src="pop.wav" at={t} />
    ))}
  </Stage>
);

const Repetible: React.FC = () => (
  <Stage gap={30}>
    <Words text="Y que se pueda *repetir*" size={92} accent={C.blue} />
    <Codigo
      lineas={[
        "# analisis_cafe.ipynb",
        "git add analisis_cafe.ipynb",
        'git commit -m "Ventas de marzo"',
      ]}
      delay={10}
      size={38}
    />
    <LogoCafe size={110} />
    <Sticker delay={120} bg={C.green} color={C.bg}>
      Decisión: más pan los fines de semana
    </Sticker>
    <Sfx src="ding.wav" at={120} volume={0.4} />
  </Stage>
);

const TEMAS = [
  "Ciclo",
  "Pregunta",
  "Recolección",
  "Datos ordenados",
  "Limpieza",
  "Atípicos",
  "Transformar",
  "Exploración",
  "4 tipos de análisis",
  "Comunicar",
];

const Fin: React.FC = () => {
  const frame = useCurrentFrame();
  const { color } = useSerie();
  return (
    <Stage gap={20}>
      <Words text="*Fin* de la serie" size={96} accent={color} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px 30px",
          width: 880,
        }}
      >
        {TEMAS.map((t, i) => (
          <div
            key={t}
            style={{
              display: "flex",
              gap: 14,
              alignItems: "center",
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 36,
              color: C.ink,
              opacity: prog(frame, 6 + i * 4, 14 + i * 4),
            }}
          >
            <span
              style={{
                minWidth: 52,
                height: 52,
                borderRadius: 26,
                background: color,
                color: C.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
              }}
            >
              {i + 1}
            </span>
            {t}
          </div>
        ))}
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 54,
          color: C.bg,
          background: C.yellow,
          borderRadius: 24,
          padding: "14px 30px",
          opacity: prog(frame, 60, 75),
          textAlign: "center",
        }}
      >
        Próxima serie: Aprendizaje Automático
      </div>
      <Sfx src="whoosh.wav" at={60} volume={0.4} />
    </Stage>
  );
};

export const DUR_P10 = [125, 145, 170, 200, 260, 170];

export const Prac10Comunicar: React.FC = () => (
  <Capitulo
    parte={10}
    short="prac10"
    serie={SERIE_PRACTICA}
    acento={C.green}
    escenas={[
      { nombre: "Gancho", dur: DUR_P10[0], voz: "x1", el: <Gancho /> },
      { nombre: "Engaño", dur: DUR_P10[1], voz: "x2", el: <Engano /> },
      { nombre: "Desde cero", dur: DUR_P10[2], voz: "x3", el: <Cero /> },
      { nombre: "Reglas", dur: DUR_P10[3], voz: "x4", el: <Reglas /> },
      { nombre: "Repetible", dur: DUR_P10[4], voz: "x5", el: <Repetible /> },
      { nombre: "Fin", dur: DUR_P10[5], voz: "x6", el: <Fin /> },
    ]}
  />
);

export const TOTAL_P10 = duracionTotal(DUR_P10);
