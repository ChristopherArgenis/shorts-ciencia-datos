import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
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

// "El amarillo de tu pantalla no existe". Cada píxel tiene solo 3 luces (R, G, B) de 0 a 255:
// 256³ = 16,777,216 colores. Subpíxeles dibujados en tiras (ejemplo simplificado; hay otros arreglos).

const S = "color" as const;
const AMARILLO = "rgb(255,255,0)";
type RGB = [number, number, number];

/** Subpíxeles: cada píxel son 3 tiras (rojo, verde, azul) con su intensidad. */
const Subpix: React.FC<{ rgb: RGB; cols: number; rows: number; w: number }> = ({
  rgb,
  cols,
  rows,
  w,
}) => {
  const tira = (i: number) => {
    const v: RGB = [0, 0, 0];
    v[i] = rgb[i];
    const apagado = rgb[i] < 20;
    return apagado ? "#14182b" : `rgb(${v[0]},${v[1]},${v[2]})`;
  };
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, ${w}px)`,
        gridAutoRows: `${w}px`,
        background: "#05070f",
      }}
    >
      {Array.from({ length: cols * rows }).map((_, k) => (
        <div
          key={k}
          style={{ display: "flex", gap: w * 0.06, padding: w * 0.06 }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                flex: 1,
                borderRadius: w * 0.05,
                background: tira(i),
                boxShadow:
                  rgb[i] > 20 ? `0 0 ${w * 0.25}px ${tira(i)}` : undefined,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

/** Lupa redonda que muestra los subpíxeles amarillos (R y G encendidos, B apagado). */
export const Lupa: React.FC<{ x: number; y: number; d?: number }> = ({
  x,
  y,
  d = 400,
}) => (
  <div style={{ position: "absolute", left: x - d / 2, top: y - d / 2 }}>
    <div
      style={{
        position: "absolute",
        left: d * 0.78,
        top: d * 0.78,
        width: d * 0.16,
        height: d * 0.5,
        borderRadius: d * 0.08,
        background: "#d9dcef",
        rotate: "-45deg",
        transformOrigin: "top center",
      }}
    />
    <div
      style={{
        width: d,
        height: d,
        borderRadius: "50%",
        overflow: "hidden",
        border: `14px solid #eef0fb`,
        boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Subpix rgb={[255, 255, 0]} cols={5} rows={5} w={d / 4} />
    </div>
  </div>
);

/** Cuadro amarillo con la lupa encima: es el cuadro 0 y también el final (bucle). */
const Portada: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <>
      <Centro top={300}>
        <Grande mono={false} size={150} color={AMARILLO}>
          AMARILLO
        </Grande>
      </Centro>
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 500,
          width: 860,
          height: 860,
          borderRadius: 40,
          background: AMARILLO,
          boxShadow: `0 0 120px ${AMARILLO}55`,
        }}
      />
      <Lupa x={600 + 60 * Math.sin(f / 18)} y={950 + 40 * Math.cos(f / 23)} />
      <Pie top={1400}>con la lupa: solo luz roja y verde</Pie>
    </>
  );
};

const Gancho = () => <Portada />;

const Bombilla: React.FC<{ color: string }> = ({ color }) => (
  <svg width={70} height={92} viewBox="0 0 70 92">
    <circle cx={35} cy={33} r={30} fill={color} />
    <rect x={21} y={62} width={28} height={10} rx={3} fill="#c9cde0" />
    <rect x={24} y={74} width={22} height={9} rx={3} fill="#9aa0bd" />
  </svg>
);

// 2 · Lo que creemos: una lucecita por cada color.
const Creencia = () => {
  const f = useCurrentFrame();
  const colores = [
    "#ff3b30",
    "#ff9500",
    "#ffcc00",
    "#ffff00",
    "#8bd400",
    "#34c759",
    "#00c7be",
    "#32ade6",
    "#007aff",
    "#5856d6",
    "#af52de",
    "#ff2d92",
  ];
  return (
    <>
      <Centro top={300}>
        <Sub size={72}>¿Un foco por cada color?</Sub>
      </Centro>
      <Centro top={520}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 200px)",
            gap: 24,
          }}
        >
          {colores.map((c, i) => (
            <div
              key={c}
              style={{
                height: 220,
                borderRadius: 26,
                background: "#141a36",
                border: `4px solid ${c}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: prog(f, i * 2, i * 2 + 6),
                scale: interpolate(prog(f, i * 2, i * 2 + 6), [0, 1], [0.6, 1]),
              }}
            >
              <Bombilla color={c} />
            </div>
          ))}
        </div>
      </Centro>
      <Tache delay={52} size={460} />
      <Sfx src="pop.wav" at={4} volume={0.3} />
      <Sfx src="boom.wav" at={52} volume={0.35} />
    </>
  );
};

/** Un píxel enorme con sus 3 tiras; `luz` = intensidad 0..1 de cada una. */
const PixelGigante: React.FC<{
  luz: [number, number, number];
  alto?: number;
}> = ({ luz, alto = 760 }) => {
  const base: RGB[] = [
    [255, 59, 48],
    [52, 220, 90],
    [70, 120, 255],
  ];
  return (
    <div
      style={{
        display: "flex",
        gap: 26,
        padding: 30,
        background: "#05070f",
        borderRadius: 36,
        border: `6px solid ${C.bg2}`,
      }}
    >
      {base.map((c, i) => {
        const k = luz[i];
        const col = `rgb(${c.map((v) => Math.round(20 + (v - 20) * k)).join(",")})`;
        return (
          <div
            key={i}
            style={{
              width: 200,
              height: alto,
              borderRadius: 24,
              background: col,
              boxShadow: k > 0.1 ? `0 0 ${80 * k}px ${col}` : undefined,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: 30,
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 90,
              color: k > 0.5 ? "#0b1020" : "#3a4066",
            }}
          >
            {"RGB"[i]}
          </div>
        );
      })}
    </div>
  );
};

// 3 · Solo hay tres: roja, verde y azul.
const Tres = () => {
  const f = useCurrentFrame();
  // Momentos de "roja", "verde" y "azul" en la frase.
  const luz: [number, number, number] = [
    prog(f, 30, 38),
    prog(f, 45, 53),
    prog(f, 60, 68),
  ];
  return (
    <>
      <Centro top={300}>
        <Grande mono={false} color={C.ink} size={110}>
          1 píxel = <span style={{ color: C.yellow }}>3 luces</span>
        </Grande>
      </Centro>
      <Centro top={500}>
        <PixelGigante luz={luz} />
      </Centro>
      <Pie>Ejemplo simplificado: subpíxeles en tiras</Pie>
      <Sfx src="tick.wav" at={30} volume={0.5} />
      <Sfx src="tick.wav" at={45} volume={0.5} />
      <Sfx src="tick.wav" at={60} volume={0.5} />
    </>
  );
};

const Deslizador: React.FC<{ etiqueta: string; color: string; v: number }> = ({
  etiqueta,
  color,
  v,
}) => (
  <div style={{ display: "flex", alignItems: "center", gap: 24, width: 860 }}>
    <span
      style={{
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: 64,
        color,
        width: 60,
      }}
    >
      {etiqueta}
    </span>
    <div
      style={{
        flex: 1,
        height: 30,
        borderRadius: 15,
        background: "#141a36",
        position: "relative",
      }}
    >
      <div
        style={{
          width: `${(v / 255) * 100}%`,
          height: "100%",
          borderRadius: 15,
          background: color,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `calc(${(v / 255) * 100}% - 26px)`,
          top: -11,
          width: 52,
          height: 52,
          borderRadius: 26,
          background: C.ink,
        }}
      />
    </div>
    <span
      style={{
        fontFamily: MONO,
        fontWeight: 700,
        fontSize: 56,
        color: C.ink,
        width: 130,
        textAlign: "right",
      }}
    >
      {Math.round(v)}
    </span>
  </div>
);

// 4 · Roja y verde a tope, azul en cero.
const Deslizadores = () => {
  const f = useCurrentFrame();
  const ir = (a: number, b: number, desde: number, hasta: number) =>
    interpolate(f, [a, b], [desde, hasta], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic),
    });
  const r = ir(4, 28, 90, 255);
  const g = ir(22, 46, 120, 255);
  const b = ir(44, 64, 160, 0);
  return (
    <>
      <Centro top={320}>
        <div style={{ display: "flex", flexDirection: "column", gap: 50 }}>
          <Deslizador etiqueta="R" color="#ff3b30" v={r} />
          <Deslizador etiqueta="G" color="#34dc5a" v={g} />
          <Deslizador etiqueta="B" color="#4678ff" v={b} />
        </div>
      </Centro>
      <Centro top={760}>
        <PixelGigante luz={[r / 255, g / 255, b / 255]} alto={560} />
      </Centro>
      <Sfx src="whoosh.wav" at={4} volume={0.25} />
    </>
  );
};

// 5 · Tu ojo se inventa el amarillo.
const Cerebro = () => {
  const f = useCurrentFrame();
  const junta = interpolate(f, [0, 34], [230, 120], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const etiqueta = usePop(36);
  const circulo = (dx: number, color: string) => (
    <div
      style={{
        position: "absolute",
        left: 540 + dx - 260,
        top: 900 - 260,
        width: 520,
        height: 520,
        borderRadius: "50%",
        background: color,
        mixBlendMode: "screen",
        filter: "blur(2px)",
      }}
    />
  );
  return (
    <>
      <Centro top={300}>
        <Sub size={72}>
          tu ojo <span style={{ color: AMARILLO }}>lo inventa</span>
        </Sub>
      </Centro>
      <AbsoluteFill style={{ isolation: "isolate" }}>
        {circulo(-junta, "rgb(255,0,0)")}
        {circulo(junta, "rgb(0,255,0)")}
      </AbsoluteFill>
      <Centro top={1250}>
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 60,
            color: C.ink,
            scale: interpolate(etiqueta, [0, 1], [0.5, 1]),
            opacity: f >= 36 ? 1 : 0,
          }}
        >
          <span style={{ color: "#ff3b30" }}>rojo</span> +{" "}
          <span style={{ color: "#34dc5a" }}>verde</span> ={" "}
          <span style={{ color: AMARILLO }}>amarillo</span>
        </div>
      </Centro>
      <Sfx src="ding.wav" at={36} volume={0.35} />
    </>
  );
};

// 6 · 256 × 256 × 256 (cada luz tiene 256 niveles: del 0 al 255).
const Multiplica = () => {
  const f = useCurrentFrame();
  const T: [string, string, number][] = [
    ["256", "#ff3b30", 0],
    ["256", "#34dc5a", 54],
    ["256", "#4678ff", 108],
  ];
  return (
    <>
      <Centro top={330}>
        <Sub size={56} color={C.dim}>
          cada luz: 256 niveles (del 0 al 255)
        </Sub>
      </Centro>
      <Centro top={560}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          {T.map(([t, c, d], i) => {
            const p = usePop(d);
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 30,
                  opacity: f >= d ? 1 : 0,
                  scale: interpolate(p, [0, 1], [1.6, 1]),
                }}
              >
                <span
                  style={{
                    fontFamily: MONO,
                    fontWeight: 700,
                    fontSize: 110,
                    color: C.dim,
                    width: 90,
                  }}
                >
                  {i ? "×" : ""}
                </span>
                <Grande color={c} size={210}>
                  {t}
                </Grande>
                <span
                  style={{
                    fontFamily: FONT,
                    fontWeight: 900,
                    fontSize: 80,
                    color: c,
                    width: 90,
                  }}
                >
                  {"RGB"[i]}
                </span>
              </div>
            );
          })}
        </div>
      </Centro>
      {T.map(([, , d], i) => (
        <Sfx key={i} src="tick.wav" at={d} volume={0.5} />
      ))}
    </>
  );
};

// 7 · 16,777,216 colores… y el amarillo vuelve (bucle con el cuadro 0).
const Final = () => {
  const f = useCurrentFrame();
  const n = Math.round(
    interpolate(f, [0, 45], [0, 16777216], {
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }),
  );
  if (f >= 96) return <Portada />;
  return (
    <>
      <Centro top={420}>
        <Grande size={150} color={C.ink}>
          {n.toLocaleString("en-US")}
        </Grande>
        <Sub size={64}>colores, de solo 3 luces</Sub>
      </Centro>
      <Centro top={800}>
        <div
          style={{
            width: 900,
            height: 420,
            borderRadius: 40,
            background:
              "linear-gradient(to bottom, transparent, #0b1020), linear-gradient(90deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
            scale: interpolate(prog(f, 0, 45), [0, 1], [0.3, 1]),
          }}
        />
      </Centro>
      <Pie>256³ = 16,777,216 · 8 bits por canal</Pie>
      <Sfx src="ding.wav" at={45} volume={0.35} />
    </>
  );
};

const ESCENAS: EscenaCorta[] = [
  { nombre: "Gancho", voz: "c1", Comp: Gancho },
  { nombre: "Creencia", voz: "c2", Comp: Creencia },
  { nombre: "Tres luces", voz: "c3", Comp: Tres },
  { nombre: "Deslizadores", voz: "c4", Comp: Deslizadores, aire: 2 },
  { nombre: "Cerebro", voz: "c5", Comp: Cerebro, aire: 8 },
  { nombre: "256³", voz: "c6", Comp: Multiplica },
  { nombre: "Final", voz: "c7", Comp: Final, aire: 4 },
];

export const TOTAL_COLOR = linea(S, ESCENAS).total;

export const AmarilloNoExiste: React.FC = () => (
  <Corto short={S} escenas={ESCENAS} acento={C.yellow} />
);
