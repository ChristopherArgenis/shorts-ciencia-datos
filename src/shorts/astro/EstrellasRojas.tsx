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

// "Las estrellas rojas son las más frías". Curvas de cuerpo negro (Planck) y ley de Wien calculadas:
// Betelgeuse 3,600 K → pico 805 nm; Sol 5,772 K → 502 nm; Rigel 12,100 K → 239 nm.
// Colores de cuerpo negro aproximados (tabla de M. Charity). Constelación en pixel art propio.

const S = "rojas" as const;
const ROJO = "#ff8a5b";
const AZUL = "#a5c8ff";
const WIEN = 2.897771955e6; // nm·K
const pico = (T: number) => Math.round(WIEN / T);

/** Planck por longitud de onda (unidades arbitrarias), λ en nm. */
const planck = (nm: number, T: number) => {
  const l = nm * 1e-9;
  return 1 / (l ** 5 * (Math.exp(1.4387769e-2 / (l * T)) - 1));
};

/** Color aproximado de un cuerpo negro a temperatura T (interpolación de tabla). */
const TABLA: [number, [number, number, number]][] = [
  [800, [140, 20, 0]],
  [1000, [255, 56, 0]],
  [2000, [255, 137, 18]],
  [3000, [255, 180, 107]],
  [4000, [255, 209, 163]],
  [5000, [255, 228, 206]],
  [6000, [255, 243, 239]],
  [7000, [245, 243, 255]],
  [8000, [227, 233, 255]],
  [10000, [204, 219, 255]],
  [12000, [191, 211, 255]],
];
const colorT = (T: number) => {
  for (let i = 1; i < TABLA.length; i++) {
    if (T <= TABLA[i][0]) {
      const [t0, c0] = TABLA[i - 1];
      const [t1, c1] = TABLA[i];
      const k = (T - t0) / (t1 - t0);
      return `rgb(${c0.map((v, j) => Math.round(v + (c1[j] - v) * k)).join(",")})`;
    }
  }
  return "rgb(191,211,255)";
};

/** Orión: posiciones aproximadas en un lienzo de 800 × 900. */
const ORION: {
  x: number;
  y: number;
  r: number;
  c: string;
  n?: string;
  t?: string;
}[] = [
  { x: 210, y: 150, r: 34, c: ROJO, n: "Betelgeuse", t: "3,600 K" },
  { x: 590, y: 190, r: 18, c: "#dbe4ff" },
  { x: 330, y: 470, r: 14, c: "#dbe4ff" },
  { x: 400, y: 450, r: 14, c: "#dbe4ff" },
  { x: 470, y: 430, r: 14, c: "#dbe4ff" },
  { x: 260, y: 770, r: 16, c: "#dbe4ff" },
  { x: 610, y: 730, r: 32, c: AZUL, n: "Rigel", t: "12,100 K" },
];
const LINEAS: [number, number][] = [
  [0, 2],
  [1, 4],
  [2, 3],
  [3, 4],
  [2, 5],
  [4, 6],
];

const Orion: React.FC<{ escala?: number; etiquetas?: boolean }> = ({
  escala = 1,
  etiquetas = true,
}) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        position: "relative",
        width: 800 * escala,
        height: 900 * escala,
      }}
    >
      <svg
        width={800 * escala}
        height={900 * escala}
        viewBox="0 0 800 900"
        style={{ position: "absolute", inset: 0 }}
      >
        {Array.from({ length: 50 }).map((_, i) => (
          <rect
            key={i}
            x={(i * 151) % 800}
            y={(i * 97) % 900}
            width={4}
            height={4}
            fill="#5c6393"
          />
        ))}
        {LINEAS.map(([a, b], i) => (
          <line
            key={i}
            x1={ORION[a].x}
            y1={ORION[a].y}
            x2={ORION[b].x}
            y2={ORION[b].y}
            stroke="#3b4170"
            strokeWidth={4}
          />
        ))}
        {ORION.map((s, i) => {
          const tw = 1 + 0.08 * Math.sin(f / 7 + i);
          const r = s.r * tw;
          return (
            <g key={i}>
              <rect
                x={s.x - r}
                y={s.y - r / 3}
                width={2 * r}
                height={(2 * r) / 3}
                fill={s.c}
                opacity={0.5}
              />
              <rect
                x={s.x - r / 3}
                y={s.y - r}
                width={(2 * r) / 3}
                height={2 * r}
                fill={s.c}
                opacity={0.5}
              />
              <rect
                x={s.x - r / 2}
                y={s.y - r / 2}
                width={r}
                height={r}
                fill={s.c}
                style={{ filter: `drop-shadow(0 0 ${r}px ${s.c})` }}
              />
            </g>
          );
        })}
      </svg>
      {etiquetas
        ? ORION.filter((s) => s.n).map((s) => (
            <div
              key={s.n}
              style={{
                position: "absolute",
                left: (s.x - 150) * escala,
                width: 300 * escala,
                top: (s.y + 50) * escala,
                textAlign: "center",
                fontFamily: FONT,
                fontWeight: 900,
                fontSize: 46 * escala,
                color: s.c,
                lineHeight: 1.1,
              }}
            >
              {s.n}
              <div style={{ fontFamily: MONO, fontWeight: 700, color: C.ink }}>
                {s.t}
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

/** Orión con las dos temperaturas: cuadro 0 y final (bucle). */
const Portada: React.FC = () => (
  <>
    <Centro top={290}>
      <Grande mono={false} size={96} color={C.ink}>
        <span style={{ color: ROJO }}>rojo</span> = frío
      </Grande>
      <Grande mono={false} size={96} color={C.ink}>
        <span style={{ color: AZUL }}>azul</span> = caliente
      </Grande>
    </Centro>
    <Centro top={520}>
      <Orion />
    </Centro>
  </>
);

const Gancho = () => <Portada />;

// 2 · Al revés de lo que dice tu grifo.
const Grifo = () => (
  <>
    <Centro top={320}>
      <Sub size={68}>en tu casa, al revés</Sub>
    </Centro>
    <Centro top={560}>
      <svg width={760} height={620} viewBox="0 20 380 290">
        <rect x={150} y={60} width={80} height={170} rx={20} fill="#ced4da" />
        <path
          d="M190 120 Q300 120 300 200 L300 230 L270 230 L270 205 Q270 160 190 160 Z"
          fill="#ced4da"
        />
        <rect x={40} y={70} width={110} height={44} rx={22} fill={C.coral} />
        <rect x={230} y={70} width={110} height={44} rx={22} fill={C.blue} />
        <text
          x={95}
          y={58}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={900}
          fontSize={26}
          fill={C.coral}
        >
          caliente
        </text>
        <text
          x={285}
          y={58}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={900}
          fontSize={26}
          fill={C.blue}
        >
          fría
        </text>
        <rect
          x={276}
          y={240}
          width={18}
          height={50}
          rx={9}
          fill="#74c0fc"
          opacity={0.7}
        />
      </svg>
    </Centro>
    <Tache delay={40} size={420} />
    <Sfx src="boom.wav" at={40} volume={0.35} />
  </>
);

// 3 y 4 · Un metal que se calienta: rojo → blanco → azul.
const Metal: React.FC<{
  desde: number;
  hasta: number;
  d0: number;
  d1: number;
}> = ({ desde, hasta, d0, d1 }) => {
  const f = useCurrentFrame();
  const T = interpolate(f, [d0, d1], [desde, hasta], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const col = colorT(T);
  return (
    <>
      <Centro top={300}>
        <Grande size={150} color={C.ink}>
          {Math.round(T / 100) * 100} K
        </Grande>
        <Sub size={48} color={C.dim}>
          temperatura
        </Sub>
      </Centro>
      <Centro top={720}>
        <div
          style={{
            width: 860,
            height: 220,
            borderRadius: 40,
            background: col,
            boxShadow: `0 0 ${Math.min(160, T / 60)}px ${col}`,
          }}
        />
      </Centro>
      <Pie top={1080}>colores aproximados de cuerpo negro</Pie>
    </>
  );
};
const Rojo = () => <Metal desde={800} hasta={3000} d0={6} d1={80} />;
const Azul = () => {
  const f = useCurrentFrame();
  if (f >= 50) return <TresCurvas t0={50} />;
  return (
    <>
      <Metal desde={3000} hasta={12000} d0={4} d1={46} />
      <Sfx src="whoosh.wav" at={4} volume={0.3} />
    </>
  );
};

/** Gráfica de curvas de Planck (normalizada cada una a su pico). */
const Curvas: React.FC<{
  temps: { T: number; c: string; n: string }[];
  p: number;
  marca?: number;
}> = ({ temps, p, marca }) => {
  const W = 900;
  const H = 520;
  const x = (nm: number) => ((nm - 100) / (1500 - 100)) * W;
  const nms = Array.from({ length: 141 }).map((_, i) => 100 + i * 10);
  return (
    <svg width={W} height={H + 120} viewBox={`0 0 ${W} ${H + 120}`}>
      <defs>
        <linearGradient id="arcoiris" x1="0" x2="1">
          <stop offset="0" stopColor="#7f00ff" />
          <stop offset="0.2" stopColor="#0040ff" />
          <stop offset="0.4" stopColor="#00c0ff" />
          <stop offset="0.55" stopColor="#00ff40" />
          <stop offset="0.7" stopColor="#ffff00" />
          <stop offset="0.85" stopColor="#ff8000" />
          <stop offset="1" stopColor="#ff0000" />
        </linearGradient>
      </defs>
      <rect
        x={x(380)}
        y={H + 10}
        width={x(750) - x(380)}
        height={30}
        fill="url(#arcoiris)"
      />
      <text
        x={x(200)}
        y={H + 34}
        textAnchor="middle"
        fontFamily={FONT}
        fontWeight={800}
        fontSize={24}
        fill={C.dim}
      >
        ultravioleta
      </text>
      <text
        x={x(1100)}
        y={H + 34}
        textAnchor="middle"
        fontFamily={FONT}
        fontWeight={800}
        fontSize={24}
        fill={C.dim}
      >
        infrarrojo
      </text>
      <text
        x={W / 2}
        y={H + 100}
        textAnchor="middle"
        fontFamily={MONO}
        fontWeight={700}
        fontSize={26}
        fill={C.dim}
      >
        longitud de onda (nm) · cada curva a su propia escala
      </text>
      {temps.map(({ T, c }) => {
        const max = planck(pico(T), T);
        const pts = nms
          .slice(0, Math.max(2, Math.round(nms.length * p)))
          .map((nm) => `${x(nm)},${H - (planck(nm, T) / max) * (H - 30)}`);
        return (
          <polyline
            key={T}
            points={pts.join(" ")}
            fill="none"
            stroke={c}
            strokeWidth={8}
            strokeLinejoin="round"
          />
        );
      })}
      {temps.map(({ T, c, n }) =>
        p >= 1 ? (
          <g key={`m${T}`}>
            <line
              x1={x(pico(T))}
              y1={30}
              x2={x(pico(T))}
              y2={H}
              stroke={c}
              strokeWidth={3}
              strokeDasharray="8 8"
            />
            <text
              x={x(pico(T))}
              y={22}
              textAnchor="middle"
              fontFamily={MONO}
              fontWeight={700}
              fontSize={28}
              fill={c}
            >
              {n} {pico(T)} nm
            </text>
          </g>
        ) : null,
      )}
      {marca ? (
        <rect
          x={x(marca) - 20}
          y={30}
          width={40}
          height={H - 30}
          fill="#40c05733"
        />
      ) : null}
    </svg>
  );
};

// 4 (versión gráfica) se integra en "Azul"; 5 · El Sol brilla más en el verde.
const SolVerde = () => {
  const f = useCurrentFrame();
  return (
    <>
      <Centro top={300}>
        <Sub size={64}>
          el Sol brilla más en el{" "}
          <span style={{ color: "#51cf66" }}>verde</span>
        </Sub>
      </Centro>
      <Centro top={500}>
        <Curvas
          temps={[{ T: 5772, c: "#ffe066", n: "Sol" }]}
          p={prog(f, 0, 30)}
          marca={f >= 30 ? 502 : undefined}
        />
      </Centro>
      <Sfx src="ding.wav" at={30} volume={0.35} />
    </>
  );
};

// 6 · Mezcla todos los colores: lo ves blanco.
const Blanco = () => {
  const f = useCurrentFrame();
  const k = prog(f, 10, 60);
  const p = usePop(62);
  return (
    <>
      <Centro top={300}>
        <Sub size={64}>todos juntos = blanco</Sub>
      </Centro>
      <Centro top={760}>
        <div
          style={{
            width: interpolate(k, [0, 1], [900, 260]),
            height: interpolate(k, [0, 1], [120, 260]),
            borderRadius: interpolate(k, [0, 1], [20, 130]),
            background:
              k < 1
                ? "linear-gradient(90deg,#7f00ff,#0040ff,#00c0ff,#00ff40,#ffff00,#ff8000,#ff0000)"
                : "#fffdf5",
            boxShadow: k >= 1 ? `0 0 ${120 * p}px #fff3bf` : undefined,
            filter: `blur(${k * 6}px)`,
          }}
        />
      </Centro>
      <Sfx src="whoosh.wav" at={10} volume={0.3} />
      <Sfx src="ding.wav" at={62} volume={0.35} />
    </>
  );
};

// Curvas de las tres estrellas (aparecen mientras dice "luego azul").
const TresCurvas: React.FC<{ t0: number }> = ({ t0 }) => {
  const f = useCurrentFrame() - t0;
  return (
    <>
      <Centro top={300}>
        <Sub size={60}>más calor → el pico se corre al azul</Sub>
      </Centro>
      <Centro top={480}>
        <Curvas
          temps={[
            { T: 3600, c: ROJO, n: "" },
            { T: 5772, c: "#ffe066", n: "" },
            { T: 12100, c: AZUL, n: "" },
          ]}
          p={prog(f, 0, 40)}
        />
      </Centro>
      <Centro top={1150}>
        <div
          style={{
            display: "flex",
            gap: 40,
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 38,
            opacity: prog(f, 40, 50),
          }}
        >
          <span style={{ color: ROJO }}>3,600 K · 805 nm</span>
          <span style={{ color: "#ffe066" }}>5,772 K · 502 nm</span>
        </div>
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 38,
            color: AZUL,
            marginTop: 8,
            opacity: prog(f, 40, 50),
          }}
        >
          12,100 K · 239 nm
        </div>
      </Centro>
      <Pie top={1330}>ley de Wien: pico = 2,898 µm·K ÷ temperatura</Pie>
    </>
  );
};

const Final = () => <Portada />;

const ESCENAS: EscenaCorta[] = [
  { nombre: "Gancho", voz: "e1", Comp: Gancho, aire: 8 },
  { nombre: "Grifo", voz: "e2", Comp: Grifo, aire: 10 },
  { nombre: "Metal rojo", voz: "e3", Comp: Rojo, aire: 8 },
  { nombre: "Metal azul y curvas", voz: "e4", Comp: Azul, aire: 40 },
  { nombre: "Sol verde", voz: "e5", Comp: SolVerde, aire: 10 },
  { nombre: "Blanco", voz: "e6", Comp: Blanco, aire: 12 },
  { nombre: "Final", voz: "e7", Comp: Final, aire: 6 },
];

export const TOTAL_ROJAS = linea(S, ESCENAS).total;

export const EstrellasRojas: React.FC = () => (
  <Corto short={S} escenas={ESCENAS} acento={C.blue} />
);

/** Betelgeuse y Rigel, para la miniatura. */
export const OrionMini: React.FC = () => (
  <Orion escala={1.1} etiquetas={false} />
);
