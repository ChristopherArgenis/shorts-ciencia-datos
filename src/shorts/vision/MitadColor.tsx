import React from "react";
import { Img as RImg, interpolate, useCurrentFrame } from "remotion";
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
  usePop,
} from "../../kit/corto";
import { FOTO } from "./PantallaVerde";

// "Este video tiene la mitad del color que crees". Submuestreo 4:2:0 de verdad:
// RGB → YCbCr (fórmulas de JPEG/BT.601), se promedia Cb y Cr en bloques de 2×2 y se reconstruye.
// 1080 × 1920: 2,073,600 (Y) + 518,400 (Cb) + 518,400 (Cr) = 3,110,400 números.

const S = "croma" as const;
const N = 18;
type RGB = [number, number, number];
type YCC = [number, number, number];

const aYcc = ([r, g, b]: RGB): YCC => [
  0.299 * r + 0.587 * g + 0.114 * b,
  128 - 0.168736 * r - 0.331264 * g + 0.5 * b,
  128 + 0.5 * r - 0.418688 * g - 0.081312 * b,
];
const t = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
const aRgb = ([y, cb, cr]: YCC): RGB => [
  t(y + 1.402 * (cr - 128)),
  t(y - 0.344136 * (cb - 128) - 0.714136 * (cr - 128)),
  t(y + 1.772 * (cb - 128)),
];

const YCC_IMG: YCC[][] = FOTO.map((f) => f.map(aYcc));

/** Promedio de un canal en el bloque 2×2 que contiene (x, y). */
const bloque = (canal: 0 | 1 | 2, x: number, y: number) => {
  const bx = x - (x % 2);
  const by = y - (y % 2);
  return (
    (YCC_IMG[by][bx][canal] +
      YCC_IMG[by][bx + 1][canal] +
      YCC_IMG[by + 1][bx][canal] +
      YCC_IMG[by + 1][bx + 1][canal]) /
    4
  );
};

/** Solo el brillo (gris). */
const BRILLO: RGB[][] = YCC_IMG.map((f) =>
  f.map((p) => [t(p[0]), t(p[0]), t(p[0])]),
);
/** Solo el color (brillo fijo), en bloques de 2×2. */
const COLOR_BLOQUES: RGB[][] = YCC_IMG.map((f, y) =>
  f.map((_, x) => aRgb([150, bloque(1, x, y), bloque(2, x, y)])),
);
/** Solo el color (brillo fijo), píxel por píxel. */
const COLOR: RGB[][] = YCC_IMG.map((f) =>
  f.map((p) => aRgb([150, p[1], p[2]])),
);

const css = ([r, g, b]: RGB) => `rgb(${r},${g},${b})`;

// Foto de 128 × 128 (cielo, sol, colina y texto) para comparar a escala de "foto":
// se dibuja en un canvas y se le aplica el mismo 4:2:0 real, en color y en luz.
const L = 128;
type Version = "orig" | "c420" | "luz420";
let cache: Record<Version, string> | null = null;
const fotos = (): Record<Version, string> => {
  if (cache) return cache;
  const cv = document.createElement("canvas");
  cv.width = L;
  cv.height = L;
  const ctx = cv.getContext("2d")!;
  const cielo = ctx.createLinearGradient(0, 0, 0, L * 0.7);
  cielo.addColorStop(0, "#3d7be0");
  cielo.addColorStop(1, "#ffb36b");
  ctx.fillStyle = cielo;
  ctx.fillRect(0, 0, L, L);
  ctx.fillStyle = "#ffe066";
  ctx.beginPath();
  ctx.arc(L * 0.74, L * 0.46, L * 0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#2f9e44";
  ctx.beginPath();
  ctx.moveTo(0, L * 0.6);
  ctx.quadraticCurveTo(L * 0.5, L * 0.46, L, L * 0.64);
  ctx.lineTo(L, L);
  ctx.lineTo(0, L);
  ctx.fill();
  for (let i = 0; i < 14; i++) {
    ctx.fillStyle = i % 2 ? "#ff4d6d" : "#ffd43b";
    ctx.beginPath();
    ctx.arc(
      8 + ((i * 37) % 112),
      L * 0.72 + ((i * 23) % 30),
      2.2,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 26px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("HOLA", L / 2, L * 0.27);
  ctx.strokeStyle = "#111111";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(L * 0.2, L * 0.62);
  ctx.lineTo(L * 0.45, L * 0.34);
  ctx.stroke();
  const src = ctx.getImageData(0, 0, L, L);
  const ycc: YCC[] = [];
  for (let i = 0; i < L * L; i++)
    ycc.push(aYcc([src.data[4 * i], src.data[4 * i + 1], src.data[4 * i + 2]]));
  const prom = (canal: 0 | 1 | 2, x: number, y: number) => {
    const bx = x - (x % 2);
    const by = y - (y % 2);
    return (
      (ycc[by * L + bx][canal] +
        ycc[by * L + bx + 1][canal] +
        ycc[(by + 1) * L + bx][canal] +
        ycc[(by + 1) * L + bx + 1][canal]) /
      4
    );
  };
  const hacer = (f: (x: number, y: number, p: YCC) => YCC) => {
    const out = ctx.createImageData(L, L);
    for (let y = 0; y < L; y++)
      for (let x = 0; x < L; x++) {
        const [r, g, b] = aRgb(f(x, y, ycc[y * L + x]));
        const k = 4 * (y * L + x);
        out.data[k] = r;
        out.data[k + 1] = g;
        out.data[k + 2] = b;
        out.data[k + 3] = 255;
      }
    const c2 = document.createElement("canvas");
    c2.width = L;
    c2.height = L;
    c2.getContext("2d")!.putImageData(out, 0, 0);
    return c2.toDataURL("image/png");
  };
  cache = {
    orig: cv.toDataURL("image/png"),
    c420: hacer((x, y, p) => [p[0], prom(1, x, y), prom(2, x, y)]),
    luz420: hacer((x, y, p) => [prom(0, x, y), p[1], p[2]]),
  };
  return cache;
};

const Foto: React.FC<{ v: Version; size: number }> = ({ v, size }) => (
  <RImg
    src={fotos()[v]}
    style={{ width: size, height: size, borderRadius: 18, display: "block" }}
  />
);

const Img: React.FC<{
  img: RGB[][];
  lado: number;
  rejilla2?: boolean;
  children?: React.ReactNode;
}> = ({ img, lado, rejilla2, children }) => (
  <div
    style={{
      position: "relative",
      width: lado * N,
      height: lado * N,
      borderRadius: 14,
      overflow: "hidden",
    }}
  >
    {img.flatMap((fila, y) =>
      fila.map((c, x) => (
        <div
          key={`${x}-${y}`}
          style={{
            position: "absolute",
            left: x * lado,
            top: y * lado,
            width: lado,
            height: lado,
            background: css(c),
          }}
        />
      )),
    )}
    {rejilla2
      ? Array.from({ length: (N / 2) * (N / 2) }).map((_, i) => (
          <div
            key={`b${i}`}
            style={{
              position: "absolute",
              left: (i % (N / 2)) * 2 * lado,
              top: Math.floor(i / (N / 2)) * 2 * lado,
              width: 2 * lado,
              height: 2 * lado,
              boxShadow: "inset 0 0 0 2px rgba(11,16,32,0.55)",
            }}
          />
        ))
      : null}
    {children}
  </div>
);

const Etiqueta: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = C.ink,
}) => (
  <div
    style={{
      fontFamily: FONT,
      fontWeight: 900,
      fontSize: 46,
      color,
      marginTop: 14,
      textAlign: "center",
    }}
  >
    {children}
  </div>
);

/** Número tachado + número real, con la imagen 4:2:0: cuadro 0 y final (bucle). */
const Portada: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <>
      <Centro top={290}>
        <div style={{ position: "relative" }}>
          <Grande size={90} color={C.dim}>
            6,220,800
          </Grande>
          <div
            style={{
              position: "absolute",
              left: -20,
              right: -20,
              top: "50%",
              height: 10,
              borderRadius: 5,
              background: C.coral,
              rotate: "-4deg",
            }}
          />
        </div>
        <div style={{ scale: 1 + 0.015 * Math.sin(f / 5), marginTop: 10 }}>
          <Grande size={150}>3,110,400</Grande>
        </div>
        <Sub size={46}>números en cada cuadro de este video</Sub>
      </Centro>
      <Centro top={640}>
        <Foto v="c420" size={740} />
      </Centro>
      <Pie top={1440}>Submuestreo de color 4:2:0 · H.264, VP9, AV1</Pie>
    </>
  );
};

const Gancho = () => <Portada />;

const Ojo: React.FC = () => (
  <svg width={150} height={90} viewBox="0 0 150 90">
    <path d="M5 45 Q75 -15 145 45 Q75 105 5 45 Z" fill="#eef0fb" />
    <circle cx={75} cy={45} r={26} fill={C.blue} />
    <circle cx={75} cy={45} r={12} fill="#0b1020" />
  </svg>
);

// 2 · Tu ojo nota mucho mejor la luz que el color.
const LuzColor = () => {
  const f = useCurrentFrame();
  const sep = prog(f, 4, 26);
  return (
    <>
      <Centro top={300}>
        <Ojo />
      </Centro>
      <Centro top={470}>
        <div
          style={{
            display: "flex",
            gap: 40 * sep + 10,
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Img img={BRILLO} lado={24} />
            <Etiqueta>luz</Etiqueta>
            <Etiqueta color={C.green}>la nota</Etiqueta>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              opacity: sep,
            }}
          >
            <Img img={COLOR} lado={24} />
            <Etiqueta>color</Etiqueta>
            <Etiqueta color={C.coral}>casi no</Etiqueta>
          </div>
        </div>
      </Centro>
      <Sfx src="whoosh.wav" at={4} volume={0.3} />
    </>
  );
};

// 3 · Los videos lo aprovechan: color en bloques se ve bien, luz en bloques no.
const Prueba = () => {
  const f = useCurrentFrame();
  const a = usePop(10);
  const b = usePop(40);
  return (
    <>
      <Centro top={300}>
        <Sub size={60}>misma idea, dos maneras</Sub>
      </Centro>
      <Centro top={430}>
        <div style={{ display: "flex", gap: 30 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              opacity: f >= 10 ? 1 : 0,
              scale: interpolate(a, [0, 1], [0.7, 1]),
            }}
          >
            <Foto v="c420" size={420} />
            <Etiqueta>color en bloques</Etiqueta>
            <Etiqueta color={C.green}>ni se nota</Etiqueta>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              opacity: f >= 40 ? 1 : 0,
              scale: interpolate(b, [0, 1], [0.7, 1]),
            }}
          >
            <Foto v="luz420" size={420} />
            <Etiqueta>luz en bloques</Etiqueta>
            <Etiqueta color={C.coral}>se ve borrosa</Etiqueta>
          </div>
        </div>
      </Centro>
      <Centro top={1130}>
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 90,
            color: C.bg,
            background: C.yellow,
            borderRadius: 24,
            padding: "6px 34px",
            opacity: f >= 70 ? 1 : 0,
          }}
        >
          4:2:0
        </div>
      </Centro>
      <Sfx src="pop.wav" at={10} volume={0.4} />
      <Sfx src="boom.wav" at={40} volume={0.3} />
      <Sfx src="ding.wav" at={70} volume={0.35} />
    </>
  );
};

// 4 · Guardan el brillo de cada píxel.
const BrilloEsc = () => {
  const f = useCurrentFrame();
  const n = Math.round(
    interpolate(f, [4, 50], [0, 2073600], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  return (
    <>
      <Centro top={300}>
        <Grande size={120} color={C.ink}>
          {n.toLocaleString("en-US")}
        </Grande>
        <Sub size={50}>1 brillo por píxel</Sub>
      </Centro>
      <Centro top={600}>
        <Img img={BRILLO} lado={44} />
      </Centro>
    </>
  );
};

// 5 · Pero un solo color por cada 4 píxeles.
const ColorEsc = () => {
  const f = useCurrentFrame();
  const bloques = f >= 30;
  return (
    <>
      <Centro top={300}>
        <Grande mono={false} size={100} color={C.ink}>
          1 color por cada <span style={{ color: C.yellow }}>4</span>
        </Grande>
      </Centro>
      <Centro top={520}>
        <Img
          img={bloques ? COLOR_BLOQUES : COLOR}
          lado={44}
          rejilla2={bloques}
        />
      </Centro>
      <Pie top={1360}>cada bloque de 2 × 2 comparte su color</Pie>
      <Sfx src="pop.wav" at={30} volume={0.45} />
    </>
  );
};

// 6 · Brillo completo, color en cuartos: la mitad de los datos.
const Suma = () => {
  const f = useCurrentFrame();
  const filas: [string, string, string, number][] = [
    ["2,073,600", "brillo", C.ink, 0],
    ["+ 518,400", "color azul (Cb)", "#6b96ff", 20],
    ["+ 518,400", "color rojo (Cr)", "#ff5b50", 40],
  ];
  const total = usePop(70);
  return (
    <>
      <Centro top={360}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 24,
          }}
        >
          {filas.map(([n, t, c, d]) => (
            <div
              key={t}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 26,
                opacity: prog(f, d, d + 6),
              }}
            >
              <Grande size={110} color={c}>
                {n}
              </Grande>
              <span
                style={{
                  fontFamily: FONT,
                  fontWeight: 800,
                  fontSize: 38,
                  color: C.dim,
                  width: 300,
                }}
              >
                {t}
              </span>
            </div>
          ))}
          <div
            style={{
              width: 760,
              height: 8,
              borderRadius: 4,
              background: C.dim,
              marginRight: 326,
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 26,
              opacity: f >= 70 ? 1 : 0,
              scale: interpolate(total, [0, 1], [0.6, 1]),
            }}
          >
            <Grande size={130}>3,110,400</Grande>
            <span
              style={{
                fontFamily: FONT,
                fontWeight: 900,
                fontSize: 44,
                color: C.yellow,
                width: 300,
              }}
            >
              = la mitad
            </span>
          </div>
        </div>
      </Centro>
      <Centro top={1200}>
        <Sub size={44} color={C.dim}>
          antes: 6,220,800 (3 números por píxel)
        </Sub>
      </Centro>
      {[0, 20, 40].map((d) => (
        <Sfx key={d} src="tick.wav" at={d} volume={0.45} />
      ))}
      <Sfx src="ding.wav" at={70} volume={0.4} />
    </>
  );
};

// 7 · Y aunque no lo notes… (original vs 4:2:0, y vuelta al cuadro 0).
const Final = () => {
  const f = useCurrentFrame();
  if (f >= 34) return <Portada />;
  return (
    <>
      <Centro top={300}>
        <Sub size={70}>¿notas algo?</Sub>
      </Centro>
      <Centro top={470}>
        <div style={{ display: "flex", gap: 30 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Foto v="orig" size={420} />
            <Etiqueta>completo</Etiqueta>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Foto v="c420" size={420} />
            <Etiqueta color={C.yellow}>la mitad</Etiqueta>
          </div>
        </div>
      </Centro>
    </>
  );
};

const ESCENAS: EscenaCorta[] = [
  { nombre: "Gancho", voz: "k1", Comp: Gancho, aire: 10 },
  { nombre: "Luz y color", voz: "k2", Comp: LuzColor, aire: 12 },
  { nombre: "Prueba", voz: "k3", Comp: Prueba, aire: 40 },
  { nombre: "Brillo", voz: "k4", Comp: BrilloEsc, aire: 10 },
  { nombre: "Color", voz: "k5", Comp: ColorEsc, aire: 14 },
  { nombre: "Suma", voz: "k6", Comp: Suma, aire: 24 },
  { nombre: "Final", voz: "k7", Comp: Final, aire: 4 },
];

export const TOTAL_CROMA = linea(S, ESCENAS).total;

export const MitadColor: React.FC = () => (
  <Corto short={S} escenas={ESCENAS} acento={C.yellow} />
);

/** Original y 4:2:0 lado a lado, para la miniatura. */
export const ParIgual: React.FC<{ lado: number }> = ({ lado }) => (
  <div style={{ display: "flex", gap: 24 }}>
    <Foto v="orig" size={lado} />
    <Foto v="c420" size={lado} />
  </div>
);
