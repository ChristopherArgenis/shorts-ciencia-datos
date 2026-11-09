import React from "react";
import { useCurrentFrame } from "remotion";
import { Sfx, Stage, Words } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import {
  Capitulo,
  Codigo,
  duracionTotal,
  durVoz,
  Nota,
  prog,
  SERIE_SUP,
} from "../../kit/serie";
import { AvanceML, Respuesta, Reto } from "../../kit/ml";
import { Persona } from "../../kit/serie";
import { Grande, NAR } from "./comun";
import datos from "../../datos/ml_sup.json";

const D = datos.s3;
const S = "sup3" as const;

const Curva: React.FC<{ dibujo?: number; corte?: number; marcas?: number }> = ({
  dibujo = 1,
  corte = 0,
  marcas = 0,
}) => {
  const W = 880,
    H = 560,
    L = 80,
    B = 70;
  const x = (v: number) => L + ((W - L - 20) * v) / 12;
  const y = (v: number) => H - B - (H - B - 30) * v;
  const pts = D.puntos as [number, number][];
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <line
        x1={L}
        y1={H - B}
        x2={W - 10}
        y2={H - B}
        stroke={C.dim}
        strokeWidth={4}
      />
      <line x1={L} y1={20} x2={L} y2={H - B} stroke={C.dim} strokeWidth={4} />
      {[0, 0.5, 1].map((v) => (
        <text
          key={v}
          x={L - 14}
          y={y(v) + 10}
          fill={C.dim}
          fontFamily={MONO}
          fontSize={28}
          textAnchor="end"
        >
          {v * 100}%
        </text>
      ))}
      <text
        x={(W + L) / 2}
        y={H - 18}
        fill={C.dim}
        fontFamily={FONT}
        fontWeight={800}
        fontSize={32}
        textAnchor="middle"
      >
        visitas al mes →
      </text>
      {pts.map(([v, t], i) => (
        <circle
          key={i}
          cx={x(v)}
          cy={y(t) + (t ? 18 : -18)}
          r={8}
          fill={t ? C.green : C.coral}
          opacity={0.6}
        />
      ))}
      <path
        d={D.curva
          .map(
            ([a, b], i) =>
              `${i ? "L" : "M"}${x(a).toFixed(1)},${y(b).toFixed(1)}`,
          )
          .join(" ")}
        fill="none"
        stroke={NAR}
        strokeWidth={9}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - dibujo}
      />
      {corte > 0 ? (
        <g opacity={corte}>
          <line
            x1={L}
            y1={y(0.5)}
            x2={W - 10}
            y2={y(0.5)}
            stroke={C.yellow}
            strokeWidth={5}
            strokeDasharray="14 10"
          />
          <line
            x1={x(D.corte)}
            y1={20}
            x2={x(D.corte)}
            y2={H - B}
            stroke={C.yellow}
            strokeWidth={5}
            strokeDasharray="14 10"
          />
          <text
            x={x(D.corte) + 12}
            y={H - B - 20}
            fill={C.yellow}
            fontFamily={FONT}
            fontWeight={900}
            fontSize={34}
          >
            corte ≈ {D.corte} visitas
          </text>
        </g>
      ) : null}
      {marcas > 0 ? (
        <g opacity={marcas}>
          {[
            [8, D.p_ana / 100, "Ana"],
            [2, D.p_luis / 100, "Luis"],
          ].map(([v, p, n]) => (
            <g key={n as string}>
              <circle
                cx={x(v as number)}
                cy={y(p as number)}
                r={18}
                fill="#fff"
                stroke={NAR}
                strokeWidth={6}
              />
              <text
                x={x(v as number)}
                y={y(p as number) - 30}
                fill={C.ink}
                fontFamily={FONT}
                fontWeight={900}
                fontSize={38}
                textAnchor="middle"
              >
                {n as string}
              </text>
            </g>
          ))}
        </g>
      ) : null}
    </svg>
  );
};

const Gancho = () => (
  <Stage gap={40}>
    <Words text="¿Este cliente va a *regresar*?" size={92} accent={NAR} />
  </Stage>
);
const RetoE = () => (
  <Stage gap={40}>
    <Reto pregunta="Ana vino 8 veces este mes. Luis, 2. ¿Quién regresa?" />
    <div style={{ display: "flex", gap: 80 }}>
      {[
        ["Ana", 8, C.green],
        ["Luis", 2, C.coral],
      ].map(([n, v, c]) => (
        <div
          key={n as string}
          style={{ textAlign: "center", fontFamily: FONT, fontWeight: 900 }}
        >
          <Persona color={c as string} size={150} />
          <div style={{ fontSize: 54, color: C.ink }}>{n as string}</div>
          <div style={{ fontSize: 40, color: C.dim }}>
            {v as number} visitas
          </div>
        </div>
      ))}
    </div>
  </Stage>
);
const CurvaE = () => {
  const f = useCurrentFrame();
  return (
    <Stage gap={26}>
      <Words
        text="Regresión *logística*: una probabilidad"
        size={78}
        accent={NAR}
      />
      <Curva dibujo={prog(f, 15, 75)} />
      <div
        style={{
          display: "flex",
          gap: 30,
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 36,
        }}
      >
        <span style={{ color: C.green }}>● regresó</span>
        <span style={{ color: C.coral }}>● no regresó</span>
      </div>
      <Nota>Clientes ficticios de Café Datos · modelo entrenado de verdad</Nota>
    </Stage>
  );
};
const Probs = () => (
  <Stage gap={30}>
    <Curva marcas={1} />
    <div style={{ display: "flex", gap: 60 }}>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 50,
            color: C.ink,
          }}
        >
          Ana
        </div>
        <Grande valor={D.p_ana} suf="%" color={C.green} size={130} />
      </div>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 50,
            color: C.ink,
          }}
        >
          Luis
        </div>
        <Grande
          valor={D.p_luis}
          suf="%"
          color={C.coral}
          size={130}
          delay={20}
        />
      </div>
    </div>
    <Sfx src="ding.wav" at={50} volume={0.35} />
  </Stage>
);
const Corte = () => {
  const f = useCurrentFrame();
  return (
    <Stage gap={26}>
      <Words
        text="Un *corte*: arriba de 50% = sí"
        size={80}
        accent={C.yellow}
      />
      <Curva corte={prog(f, 10, 30)} marcas={1} />
      <Codigo
        lineas={[
          "from sklearn.linear_model import LogisticRegression",
          "modelo.predict_proba([[8]])  # Ana",
        ]}
        delay={60}
        size={24}
      />
      <Respuesta texto="Ana (93%)" delay={110} />
    </Stage>
  );
};

const E = [
  { nombre: "Gancho", voz: "c1", el: <Gancho /> },
  { nombre: "Reto", voz: "c2", el: <RetoE />, min: 150 },
  { nombre: "Curva", voz: "c3", el: <CurvaE />, min: 170 },
  { nombre: "Probabilidades", voz: "c4", el: <Probs />, min: 150 },
  { nombre: "Corte", voz: "c5", el: <Corte /> },
  {
    nombre: "Mapa",
    voz: "c6",
    el: (
      <AvanceML
        actual="S3"
        siguiente="S4"
        tema="Bosques aleatorios"
        color={NAR}
      />
    ),
    min: 150,
  },
];
const ESC = E.map((e) => ({ ...e, dur: durVoz(S, e.voz, e.min ?? 120) }));
export const Sup3Logistica: React.FC = () => (
  <Capitulo parte={3} short={S} serie={SERIE_SUP} acento={NAR} escenas={ESC} />
);
export const TOTAL_SUP3 = duracionTotal(ESC.map((e) => e.dur));
