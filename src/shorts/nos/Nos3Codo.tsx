import React from "react";
import { useCurrentFrame } from "remotion";
import { Sfx, Stage, Words } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import {
  Capitulo,
  duracionTotal,
  durVoz,
  Nota,
  prog,
  SERIE_NOS,
} from "../../kit/serie";
import { AvanceML, Respuesta, Reto } from "../../kit/ml";
import { MOR } from "./comun";
import datos from "../../datos/ml_nosup.json";

const S = "nos3" as const;
const IN = datos.u3.inercia as Record<string, number>;
const SIL = datos.u3.silueta as Record<string, number>;

const Curva: React.FC<{ hasta?: number; codo?: number }> = ({
  hasta = 8,
  codo = 0,
}) => {
  const W = 880,
    H = 560,
    L = 90,
    B = 70;
  const x = (k: number) => L + ((W - L - 40) * (k - 1)) / 7;
  const y = (v: number) => H - B - ((H - B - 30) * v) / 360;
  const ks = [1, 2, 3, 4, 5, 6, 7, 8].filter((k) => k <= hasta);
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
      {[1, 2, 3, 4, 5, 6, 7, 8].map((k) => (
        <text
          key={k}
          x={x(k)}
          y={H - 30}
          fill={k === 3 && codo > 0 ? MOR : C.dim}
          fontFamily={MONO}
          fontWeight={700}
          fontSize={32}
          textAnchor="middle"
        >
          {k}
        </text>
      ))}
      <text
        x={(W + L) / 2}
        y={H}
        fill={C.dim}
        fontFamily={FONT}
        fontWeight={800}
        fontSize={30}
        textAnchor="middle"
      >
        número de grupos
      </text>
      <text
        x={34}
        y={(H - B) / 2}
        fill={C.dim}
        fontFamily={FONT}
        fontWeight={800}
        fontSize={30}
        textAnchor="middle"
        transform={`rotate(-90 34 ${(H - B) / 2})`}
      >
        error
      </text>
      <path
        d={ks
          .map((k, i) => `${i ? "L" : "M"}${x(k)},${y(IN[String(k)])}`)
          .join(" ")}
        fill="none"
        stroke={MOR}
        strokeWidth={8}
      />
      {ks.map((k) => (
        <circle key={k} cx={x(k)} cy={y(IN[String(k)])} r={12} fill={MOR} />
      ))}
      {codo > 0 ? (
        <circle
          cx={x(3)}
          cy={y(IN["3"])}
          r={48 * codo}
          fill="none"
          stroke={C.yellow}
          strokeWidth={7}
        />
      ) : null}
    </svg>
  );
};

const Gancho = () => (
  <Stage gap={40}>
    <Words
      text="¿2 grupos, 3, o *10*? ¿Quién decide?"
      size={92}
      stagger={1}
      accent={MOR}
    />
  </Stage>
);
const RetoE = () => (
  <Stage>
    <Reto pregunta="¿Cuántos grupos de clientes hay de verdad?" />
  </Stage>
);
const Baja = () => {
  const f = useCurrentFrame();
  return (
    <Stage gap={30}>
      <Words
        text="Más grupos = *menos* error… siempre"
        size={82}
        accent={MOR}
      />
      <Curva hasta={1 + Math.floor(prog(f, 10, 90) * 7)} />
      <Nota>
        Clientes ficticios de Café Datos · modelos entrenados de verdad
      </Nota>
    </Stage>
  );
};
const Codo = () => {
  const f = useCurrentFrame();
  return (
    <Stage gap={30}>
      <Words text="El método del *codo*" size={92} accent={C.yellow} />
      <Curva codo={prog(f, 20, 40)} />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 56,
          color: C.yellow,
          opacity: prog(f, 40, 50),
        }}
      >
        aquí deja de bajar rápido: 3
      </div>
      <Sfx src="ding.wav" at={30} volume={0.35} />
    </Stage>
  );
};
const Silueta = () => {
  const f = useCurrentFrame();
  return (
    <Stage gap={22}>
      <Words text="La *silueta* lo confirma" size={88} accent={MOR} />
      {Object.entries(SIL).map(([k, v], i) => (
        <div
          key={k}
          style={{
            width: 860,
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 40,
          }}
        >
          <span style={{ width: 240, color: C.ink, whiteSpace: "nowrap" }}>{k} grupos</span>
          <div
            style={{
              flex: 1,
              height: 48,
              background: C.bg2,
              borderRadius: 24,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${v * 100 * prog(f, 10 + i * 5, 40 + i * 5)}%`,
                height: "100%",
                background: k === "3" ? C.green : MOR,
              }}
            />
          </div>
          <span style={{ width: 100, color: k === "3" ? C.green : C.dim }}>
            {v.toFixed(2)}
          </span>
        </div>
      ))}
      <Respuesta texto="3 grupos" delay={80} />
    </Stage>
  );
};

const E = [
  { nombre: "Gancho", voz: "c1", el: <Gancho /> },
  { nombre: "Reto", voz: "c2", el: <RetoE /> },
  { nombre: "Baja", voz: "c3", el: <Baja />, min: 170 },
  { nombre: "Codo", voz: "c4", el: <Codo />, min: 170 },
  { nombre: "Silueta", voz: "c5", el: <Silueta />, min: 190 },
  {
    nombre: "Mapa",
    voz: "c6",
    el: <AvanceML actual="U3" siguiente="U4" tema="Formas raras" color={MOR} />,
    min: 150,
  },
];
const ESC = E.map((e) => ({ ...e, dur: durVoz(S, e.voz, e.min ?? 120) }));
export const Nos3Codo: React.FC = () => (
  <Capitulo parte={3} short={S} serie={SERIE_NOS} acento={MOR} escenas={ESC} />
);
export const TOTAL_NOS3 = duracionTotal(ESC.map((e) => e.dur));
