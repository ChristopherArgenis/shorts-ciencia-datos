import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Sfx } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import { prog } from "../../kit/serie";
import {
  Centro,
  Corto,
  type EscenaCorta,
  Grande,
  linea,
  Pie,
  Sub,
  Tache,
  usePop,
} from "../../kit/corto";
import D from "../../datos/digitos.json";

// "Para una IA, este 7 son solo 64 números". Datos reales de scripts/ml/digitos.py:
// conjunto Digits (UCI, scikit-learn), 8 × 8 valores de 0 a 16, regresión logística.
// 1,347 ejemplos para entrenar; en el examen acierta 431 de 450 (95.8 %).

const S = "digitos" as const;

const tinta = (v: number) => {
  const k = Math.round(255 - (v / 16) * 235);
  return `rgb(${k},${k},${k})`;
};

/** Dígito de 8 × 8; con `numeros` escribe el valor (0–16) en cada casilla. */
const Digito: React.FC<{
  img: number[];
  lado: number;
  numeros?: boolean;
  borde?: string;
}> = ({ img, lado, numeros, borde }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(8, ${lado}px)`,
      gap: Math.max(1, lado * 0.04),
      padding: Math.max(2, lado * 0.06),
      background: "#2a2f45",
      borderRadius: lado * 0.15,
      outline: borde ? `6px solid ${borde}` : undefined,
    }}
  >
    {img.map((v, i) => (
      <div
        key={i}
        style={{
          height: lado,
          borderRadius: lado * 0.1,
          background: tinta(v),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: MONO,
          fontWeight: 700,
          fontSize: lado * 0.4,
          color: v > 8 ? "#fff" : "#0b1020",
        }}
      >
        {numeros ? v : null}
      </div>
    ))}
  </div>
);

/** El 7 con sus 64 números: cuadro 0 y final (bucle). */
const Portada: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <>
      <Centro top={290}>
        <div style={{ scale: 1 + 0.015 * Math.sin(f / 5) }}>
          <Grande mono={false} size={130} color={C.ink}>
            <span style={{ color: C.yellow }}>64</span> números
          </Grande>
        </div>
      </Centro>
      <Centro top={500}>
        <Digito img={D.siete} lado={102} numeros />
      </Centro>
      <Pie top={1400}>
        cada casilla va de 0 a 16 · dígitos UCI (scikit-learn)
      </Pie>
    </>
  );
};

const Gancho = () => <Portada />;

// 2 · Parece que hay que explicarle qué es un siete.
const Pizarron = () => {
  const f = useCurrentFrame();
  const reglas = [
    "una raya arriba",
    "una diagonal hacia abajo",
    "sin círculos",
  ];
  return (
    <>
      <Centro top={330}>
        <div
          style={{
            width: 880,
            background: "#1f3b2c",
            border: "16px solid #8a5a2b",
            borderRadius: 20,
            padding: "40px 46px",
            display: "flex",
            flexDirection: "column",
            gap: 26,
          }}
        >
          <span
            style={{
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 64,
              color: "#f1f3f5",
            }}
          >
            Un 7 tiene…
          </span>
          {reglas.map((r, i) => {
            const d = 6 + i * 12;
            return (
              <span
                key={r}
                style={{
                  fontFamily: FONT,
                  fontWeight: 800,
                  fontSize: 52,
                  color: "#dee2e6",
                  opacity: prog(f, d, d + 6),
                }}
              >
                · {r}
              </span>
            );
          })}
        </div>
      </Centro>
      <Tache delay={56} size={440} />
      <Sfx src="boom.wav" at={56} volume={0.35} />
    </>
  );
};

// 3 · Le das más de 1,300 ejemplos con su respuesta.
const Ejemplos = () => {
  const f = useCurrentFrame();
  const n = Math.round(
    interpolate(f, [4, 90], [0, D.n_train], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  return (
    <>
      <Centro top={300}>
        <Grande size={130} color={C.yellow}>
          {n.toLocaleString("en-US")}
        </Grande>
        <Sub size={48}>ejemplos con su respuesta</Sub>
      </Centro>
      <Centro top={560}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 140px)",
            gap: 10,
          }}
        >
          {D.ejemplos.slice(0, 24).map((e, i) => {
            const d = 4 + i * 3;
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  opacity: prog(f, d, d + 4),
                }}
              >
                <Digito img={e.img} lado={15} />
                <span
                  style={{
                    fontFamily: MONO,
                    fontWeight: 700,
                    fontSize: 28,
                    color: C.green,
                  }}
                >
                  {e.y}
                </span>
              </div>
            );
          })}
        </div>
      </Centro>
      <Sfx src="whoosh.wav" at={4} volume={0.3} />
    </>
  );
};

// 4 · Y no aprende formas…
const Formas = () => (
  <>
    <Centro top={380}>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 700,
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: `14px ${C.ink}`,
        }}
      >
        7
      </div>
    </Centro>
    <Tache delay={12} size={460} />
    <Sfx src="boom.wav" at={12} volume={0.3} />
  </>
);

// 5 · Aprende qué casillas suelen encenderse (pesos reales del modelo para el 7).
const Pesos = () => {
  const f = useCurrentFrame();
  const max = Math.max(...D.pesos7.map((w) => Math.abs(w)));
  const p = prog(f, 10, 40);
  return (
    <>
      <Centro top={300}>
        <Sub size={60}>
          lo que aprendió para el <span style={{ color: C.yellow }}>7</span>
        </Sub>
      </Centro>
      <Centro top={450}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(8, 100px)",
            gap: 5,
            padding: 7,
            background: "#2a2f45",
            borderRadius: 16,
          }}
        >
          {D.pesos7.map((w, i) => {
            const k = (Math.abs(w) / max) * p;
            const col =
              w >= 0 ? `rgba(61,220,132,${k})` : `rgba(255,107,91,${k})`;
            return (
              <div
                key={i}
                style={{
                  height: 100,
                  borderRadius: 10,
                  background: col,
                  border: "1px solid #3a4066",
                }}
              />
            );
          })}
        </div>
      </Centro>
      <Centro top={1310}>
        <div
          style={{
            display: "flex",
            gap: 50,
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 42,
            opacity: prog(f, 40, 50),
          }}
        >
          <span style={{ color: C.green }}>verde: suele encenderse</span>
          <span style={{ color: C.coral }}>rojo: no</span>
        </div>
      </Centro>
      <Pie top={1400}>pesos reales de la regresión logística</Pie>
      <Sfx src="whoosh.wav" at={10} volume={0.3} />
    </>
  );
};

// 6 · Con dígitos que nunca vio, acierta 431 de 450.
const Examen = () => {
  const f = useCurrentFrame();
  const n = Math.round(
    interpolate(f, [6, 90], [0, D.aciertos], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const visto = Math.floor(
    interpolate(f, [6, 90], [0, D.n_test], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const err = usePop(110);
  return (
    <>
      <Centro top={290}>
        <Grande size={120} color={C.ink}>
          <span style={{ color: C.green }}>{n}</span> / {D.n_test}
        </Grande>
        <Sub size={52} color={f >= 90 ? C.yellow : C.dim}>
          {f >= 90 ? `${D.exactitud} % con dígitos que nunca vio` : "examen"}
        </Sub>
      </Centro>
      <Centro top={560}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(25, 32px)",
            gap: 3,
          }}
        >
          {D.examen_ok.map((ok, i) => (
            <div
              key={i}
              style={{
                height: 32,
                borderRadius: 5,
                background: i >= visto ? "#141a36" : ok ? C.green : C.coral,
              }}
            />
          ))}
        </div>
      </Centro>
      <Centro top={1200}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 30,
            opacity: f >= 110 ? 1 : 0,
            scale: interpolate(err, [0, 1], [0.6, 1]),
          }}
        >
          <Digito img={D.error.img} lado={20} borde={C.coral} />
          <span
            style={{
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 44,
              color: C.ink,
            }}
          >
            era {D.error.real}, dijo{" "}
            <span style={{ color: C.coral }}>{D.error.dijo}</span>
          </span>
        </div>
      </Centro>
      <Sfx src="whoosh.wav" at={6} volume={0.3} />
      <Sfx src="ding.wav" at={90} volume={0.4} />
      <Sfx src="pop.wav" at={110} volume={0.35} />
    </>
  );
};

// 7 · Sin saber qué es un número. Porque para ella… (vuelta al cuadro 0).
const Final = () => {
  const f = useCurrentFrame();
  if (f >= 50) return <Portada />;
  return (
    <>
      <Centro top={600}>
        <Grande mono={false} size={110} color={C.ink}>
          sin saber qué es un <span style={{ color: C.yellow }}>7</span>
        </Grande>
      </Centro>
    </>
  );
};

const ESCENAS: EscenaCorta[] = [
  { nombre: "Gancho", voz: "g1", Comp: Gancho, aire: 8 },
  { nombre: "Pizarrón", voz: "g2", Comp: Pizarron, aire: 10 },
  { nombre: "Ejemplos", voz: "g3", Comp: Ejemplos, aire: 10 },
  { nombre: "Formas", voz: "g4", Comp: Formas, aire: 6 },
  { nombre: "Pesos", voz: "g5", Comp: Pesos, aire: 14 },
  { nombre: "Examen", voz: "g6", Comp: Examen, aire: 16 },
  { nombre: "Final", voz: "g7", Comp: Final, aire: 4 },
];

export const TOTAL_DIGITOS = linea(S, ESCENAS).total;

export const Digito64: React.FC = () => (
  <Corto short={S} escenas={ESCENAS} acento={C.green} />
);

/** El 7 real, para la miniatura. */
export const SieteReal: React.FC<{ lado: number }> = ({ lado }) => (
  <Digito img={D.siete} lado={lado} numeros />
);
