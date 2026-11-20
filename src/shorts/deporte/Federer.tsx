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

// "Federer ganó más puntos… y perdió la final". Final de Wimbledon 2019 (datos oficiales):
// puntos 218 (Federer) – 204 (Djokovic); Djokovic ganó 7-6(5), 1-6, 7-6(4), 4-6, 13-12(3),
// salvó 2 puntos de campeonato (8-7, 40-15) y el partido duró 4 h 57 min.

const S = "federer" as const;
const FED = C.blue;
const DJO = C.green;
const SETS: { d: number; f: number; tb?: number }[] = [
  { d: 7, f: 6, tb: 5 },
  { d: 1, f: 6 },
  { d: 7, f: 6, tb: 4 },
  { d: 4, f: 6 },
  { d: 13, f: 12, tb: 3 },
];

const Fila: React.FC<{
  nombre: string;
  color: string;
  valor: React.ReactNode;
  children?: React.ReactNode;
}> = ({ nombre, color, valor, children }) => (
  <div
    style={{
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: 900,
      background: "#141a36",
      borderLeft: `14px solid ${color}`,
      borderRadius: 22,
      padding: "26px 40px",
    }}
  >
    <span
      style={{ fontFamily: FONT, fontWeight: 900, fontSize: 64, color: C.ink }}
    >
      {nombre}
    </span>
    <span style={{ fontFamily: MONO, fontWeight: 700, fontSize: 120, color }}>
      {valor}
    </span>
    {children}
  </div>
);

/** Marcador de puntos con el sello "PERDIÓ": cuadro 0 y final (bucle). */
const Portada: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <>
      <Centro top={300}>
        <Sub size={56} color={C.dim}>
          puntos ganados en la final
        </Sub>
      </Centro>
      <Centro top={430}>
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <Fila nombre="Federer" color={FED} valor="218">
            <div
              style={{
                position: "absolute",
                right: 275,
                top: 18,
                fontFamily: FONT,
                fontWeight: 900,
                fontSize: 60,
                color: C.coral,
                border: `8px solid ${C.coral}`,
                borderRadius: 18,
                padding: "0 14px",
                rotate: "-12deg",
                scale: 1 + 0.02 * Math.sin(f / 5),
                background: "#0b1020cc",
              }}
            >
              PERDIÓ
            </div>
          </Fila>
          <Fila nombre="Djokovic" color={DJO} valor="204" />
        </div>
      </Centro>
      <Centro top={900}>
        <Grande mono={false} size={120} color={C.yellow}>
          +14 puntos
        </Grande>
      </Centro>
      <Pie top={1380}>Final de Wimbledon 2019 · estadísticas oficiales</Pie>
    </>
  );
};

const Gancho = () => <Portada />;

// 2 · Creemos que gana quien suma más.
const Balanza = () => {
  const f = useCurrentFrame();
  const ang = interpolate(f, [4, 30], [0, -9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const plato = (x: number, n: string, color: string) => (
    <g transform={`translate(${x} 0)`}>
      <line x1={0} y1={0} x2={-60} y2={110} stroke={C.dim} strokeWidth={4} />
      <line x1={0} y1={0} x2={60} y2={110} stroke={C.dim} strokeWidth={4} />
      <rect x={-100} y={110} width={200} height={20} rx={10} fill={color} />
      <text
        x={0}
        y={95}
        textAnchor="middle"
        fontFamily={MONO}
        fontWeight={700}
        fontSize={64}
        fill={C.ink}
      >
        {n}
      </text>
    </g>
  );
  return (
    <>
      <Centro top={320}>
        <Sub size={68}>¿gana quien suma más?</Sub>
      </Centro>
      <Centro top={560}>
        <svg width={900} height={620} viewBox="-450 -80 900 620">
          <rect x={-14} y={0} width={28} height={480} fill={C.dim} />
          <rect x={-150} y={470} width={300} height={30} rx={12} fill={C.dim} />
          <g transform={`rotate(${ang})`}>
            <rect x={-360} y={-8} width={720} height={16} rx={8} fill={C.ink} />
            {plato(-340, "218", FED)}
            {plato(340, "204", DJO)}
          </g>
        </svg>
      </Centro>
      <Tache delay={48} size={440} />
      <Sfx src="whoosh.wav" at={4} volume={0.3} />
      <Sfx src="boom.wav" at={48} volume={0.35} />
    </>
  );
};

// 3 · Los puntos forman juegos, y los juegos, sets.
const Cajas = () => {
  const f = useCurrentFrame();
  const bloque = (
    t: string,
    d: number,
    hijos: React.ReactNode,
    color: string,
  ) => {
    const p = prog(f, d, d + 8);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          opacity: p,
          scale: interpolate(p, [0, 1], [0.8, 1]),
        }}
      >
        <div
          style={{
            border: `6px solid ${color}`,
            borderRadius: 24,
            padding: 18,
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: 880,
          }}
        >
          {hijos}
        </div>
        <span
          style={{ fontFamily: FONT, fontWeight: 900, fontSize: 54, color }}
        >
          {t}
        </span>
      </div>
    );
  };
  const punto = (i: number) => (
    <div
      key={i}
      style={{ width: 44, height: 44, borderRadius: 22, background: C.yellow }}
    />
  );
  const juego = (i: number) => (
    <div
      key={i}
      style={{
        width: 70,
        height: 70,
        borderRadius: 14,
        border: `4px solid ${C.blue}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: 11,
          background: C.yellow,
        }}
      />
    </div>
  );
  const set = (i: number) => (
    <div
      key={i}
      style={{
        width: 130,
        height: 90,
        borderRadius: 16,
        border: `4px solid ${C.green}`,
        display: "flex",
        gap: 4,
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        padding: 6,
      }}
    >
      {Array.from({ length: 6 }).map((_, k) => (
        <div
          key={k}
          style={{
            width: 26,
            height: 26,
            borderRadius: 6,
            border: `3px solid ${C.blue}`,
          }}
        />
      ))}
    </div>
  );
  return (
    <>
      <Centro top={320}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 44,
            alignItems: "center",
          }}
        >
          {bloque("4 puntos → 1 juego", 14, [0, 1, 2, 3].map(punto), C.yellow)}
          {bloque(
            "6 juegos → 1 set",
            40,
            [0, 1, 2, 3, 4, 5].map(juego),
            C.blue,
          )}
          {bloque(
            "gana 3 sets → campeón",
            70,
            [0, 1, 2, 3, 4].map(set),
            C.green,
          )}
        </div>
      </Centro>
      <Pie top={1450}>
        simplificado: en tenis hay que ganar por 2 (juegos y sets)
      </Pie>
      <Sfx src="pop.wav" at={14} volume={0.35} />
      <Sfx src="pop.wav" at={40} volume={0.35} />
      <Sfx src="pop.wav" at={70} volume={0.35} />
    </>
  );
};

/** Marcador por sets; `marca` decide qué sets se iluminan. */
const Marcador: React.FC<{
  marca: (i: number) => string | null;
  tb?: boolean;
}> = ({ marca, tb }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
    {(["Djokovic", "Federer"] as const).map((n) => {
      const color = n === "Federer" ? FED : DJO;
      return (
        <div key={n} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              width: 230,
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 46,
              color,
            }}
          >
            {n}
          </span>
          {SETS.map((s, i) => {
            const m = marca(i);
            const v = n === "Federer" ? s.f : s.d;
            const gano = (n === "Federer") === s.f > s.d;
            return (
              <div
                key={i}
                style={{
                  width: 118,
                  height: 118,
                  borderRadius: 18,
                  background: m ?? "#141a36",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: MONO,
                  fontWeight: 700,
                  fontSize: v > 9 ? 58 : 70,
                  color: m ? C.bg : gano ? C.ink : C.dim,
                  position: "relative",
                }}
              >
                {v}
                {tb && s.tb !== undefined && n === "Federer" ? (
                  <span
                    style={{
                      position: "absolute",
                      top: 4,
                      right: 10,
                      fontSize: 30,
                    }}
                  >
                    {s.tb}
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      );
    })}
  </div>
);

// 4 · Y no todos valen igual: el set que Federer ganó fácil.
const NoIgual = () => {
  const f = useCurrentFrame();
  const p = usePop(16);
  return (
    <>
      <Centro top={320}>
        <Sub size={66}>
          no todos los puntos{" "}
          <span style={{ color: C.yellow }}>valen igual</span>
        </Sub>
      </Centro>
      <Centro top={560}>
        <Marcador marca={(i) => (i === 1 && f >= 16 ? FED : null)} />
      </Centro>
      <Centro top={900}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 54,
            color: C.bg,
            background: FED,
            borderRadius: 22,
            padding: "10px 30px",
            opacity: f >= 16 ? 1 : 0,
            scale: interpolate(p, [0, 1], [0.5, 1]),
          }}
        >
          6-1: muchos puntos, 1 solo set
        </div>
      </Centro>
      <Sfx src="pop.wav" at={16} volume={0.4} />
    </>
  );
};

// 5 · Djokovic ganó los tres desempates.
const Desempates = () => {
  const f = useCurrentFrame();
  const encendido = (i: number) => {
    const orden = [0, 2, 4].indexOf(i);
    return orden >= 0 && f >= 8 + orden * 14 ? C.yellow : null;
  };
  return (
    <>
      <Centro top={320}>
        <Grande mono={false} size={96} color={C.ink}>
          desempates: <span style={{ color: DJO }}>3 de 3</span>
        </Grande>
      </Centro>
      <Centro top={560}>
        <Marcador marca={encendido} tb />
      </Centro>
      <Pie top={1000}>número chico: puntos de Federer en cada desempate</Pie>
      {[8, 22, 36].map((d) => (
        <Sfx key={d} src="tick.wav" at={d} volume={0.5} />
      ))}
    </>
  );
};

// 6 · …y salvó dos puntos de campeonato (8-7, 40-15, saque de Federer).
const Campeonato = () => {
  const f = useCurrentFrame();
  const p1 = usePop(18, 9);
  const p2 = usePop(42, 9);
  const flash = (d: number) => Math.max(0, 1 - Math.abs(f - d) / 6);
  return (
    <>
      <Centro top={320}>
        <Sub size={54} color={C.dim}>
          5.º set · saca Federer
        </Sub>
        <Grande size={146} color={C.ink}>
          8-7 · <span style={{ color: FED }}>40-15</span>
        </Grande>
      </Centro>
      <Centro top={720}>
        <div style={{ display: "flex", gap: 40 }}>
          {[
            [p1, 18],
            [p2, 42],
          ].map(([p, d], i) => (
            <div
              key={i}
              style={{
                width: 450,
                padding: "26px 0",
                borderRadius: 28,
                background: "#141a36",
                border: `6px solid ${f >= d ? DJO : C.bg2}`,
                boxShadow: `0 0 ${60 * flash(d)}px ${C.yellow}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                opacity: f >= d ? 1 : 0.3,
                scale: interpolate(p, [0, 1], [0.8, 1]),
              }}
            >
              <span
                style={{
                  fontFamily: FONT,
                  fontWeight: 900,
                  fontSize: 34,
                  color: C.ink,
                }}
              >
                punto de campeonato {i + 1}
              </span>
              <span
                style={{
                  fontFamily: FONT,
                  fontWeight: 900,
                  fontSize: 64,
                  color: DJO,
                }}
              >
                salvado
              </span>
            </div>
          ))}
        </div>
      </Centro>
      <Sfx src="pop.wav" at={18} volume={0.4} />
      <Sfx src="pop.wav" at={42} volume={0.4} />
    </>
  );
};

// 7 · Casi cinco horas. Y en ellas… (vuelta al cuadro 0).
const Reloj = () => {
  const f = useCurrentFrame();
  if (f >= 38) return <Portada />;
  const min = Math.round(
    interpolate(f, [0, 30], [0, 297], { extrapolateRight: "clamp" }),
  );
  return (
    <AbsoluteCenter>
      <Grande size={260} color={C.ink}>
        {Math.floor(min / 60)}:{String(min % 60).padStart(2, "0")}
      </Grande>
      <Sub size={56} color={C.dim}>
        horas de partido
      </Sub>
    </AbsoluteCenter>
  );
};

const AbsoluteCenter: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <Centro top={640}>{children}</Centro>;

const ESCENAS: EscenaCorta[] = [
  { nombre: "Gancho", voz: "f1", Comp: Gancho, aire: 14 },
  { nombre: "Balanza", voz: "f2", Comp: Balanza, aire: 14 },
  { nombre: "Juegos y sets", voz: "f3", Comp: Cajas, aire: 18 },
  { nombre: "No valen igual", voz: "f4", Comp: NoIgual, aire: 16 },
  { nombre: "Desempates", voz: "f5", Comp: Desempates, aire: 14 },
  { nombre: "Campeonato", voz: "f6", Comp: Campeonato, aire: 16 },
  { nombre: "Reloj", voz: "f7", Comp: Reloj, aire: 4 },
];

export const TOTAL_FEDERER = linea(S, ESCENAS).total;

export const Federer: React.FC = () => (
  <Corto short={S} escenas={ESCENAS} acento={C.blue} />
);

/** Marcador de puntos (fijo), para la miniatura. */
export const PuntosFinal: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
    <Fila nombre="Federer" color={FED} valor="218" />
    <Fila nombre="Djokovic" color={DJO} valor="204" />
  </div>
);
