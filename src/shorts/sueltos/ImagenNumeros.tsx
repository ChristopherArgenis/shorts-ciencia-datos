import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Bg, Handle, Sfx } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import { prog } from "../../kit/serie";
import { Musica, Narracion, type Linea } from "../../kit/voz";
import duraciones from "../../voz-duraciones.json";

// "Esto que ves son 6 millones de números". Primer Short con las reglas de retención:
// cuadro 0 lleno, sin etiqueta de serie ni reto, cambio visual cada ≤ 4 s y cierre en bucle.
// Dato real: 1080 × 1920 px × 3 canales = 6,220,800 números por cuadro.
// El balón de 16 × 16 píxeles es una ilustración propia (ejemplo simplificado).

const S = "img" as const;
const N = 16;
const D = duraciones[S] as Record<string, number>;
const IDS = ["i1", "i2", "i3", "i4", "i5", "i6"];

// Inicio de cada frase (en cuadros): una detrás de otra, con 4 cuadros de aire.
const INICIO: number[] = [];
{
  let t = 0;
  for (const id of IDS) {
    INICIO.push(t);
    t += Math.ceil(D[id] * 30) + 4;
  }
}
export const TOTAL_IMG = INICIO[5] + Math.ceil(D.i6 * 30) + 8;

type RGB = [number, number, number];

/** Balón en pixel art, generado con geometría simple (círculo + parches). */
const BALON: RGB[][] = (() => {
  const c = 7.5;
  const parches: [number, number, number][] = [[7.5, 7.8, 1.9]];
  for (let k = 0; k < 5; k++) {
    const a = -Math.PI / 2 + (k * 2 * Math.PI) / 5 + Math.PI / 5;
    parches.push([c + 5.5 * Math.cos(a), c + 5.5 * Math.sin(a), 1.5]);
  }
  return Array.from({ length: N }, (_, y) =>
    Array.from({ length: N }, (_, x): RGB => {
      const d = Math.hypot(x - c, y - c);
      if (d > 6.7) return Math.floor(y / 4) % 2 ? [46, 160, 67] : [36, 132, 55];
      if (parches.some(([px, py, r]) => Math.hypot(x - px, y - py) <= r))
        return [22, 22, 28];
      if (x + y > 19) return [186, 190, 204];
      return [245, 245, 245];
    }),
  );
})();

const gris = ([r, g, b]: RGB) => Math.round(0.299 * r + 0.587 * g + 0.114 * b);
const css = ([r, g, b]: RGB) => `rgb(${r},${g},${b})`;
const inv = ([r, g, b]: RGB): RGB => [255 - r, 255 - g, 255 - b];

type Celda = { fondo: string; texto?: string; colorTexto?: string };

/** Rejilla de 16 × 16 celdas; `celda` decide cómo se ve cada una. */
const Rejilla: React.FC<{
  lado: number;
  celda: (x: number, y: number, c: RGB) => Celda;
  fuente?: number;
  style?: React.CSSProperties;
}> = ({ lado, celda, fuente, style }) => (
  <div
    style={{
      position: "relative",
      width: lado * N,
      height: lado * N,
      ...style,
    }}
  >
    {BALON.flatMap((fila, y) =>
      fila.map((c, x) => {
        const v = celda(x, y, c);
        return (
          <div
            key={`${x}-${y}`}
            style={{
              position: "absolute",
              left: x * lado,
              top: y * lado,
              width: lado,
              height: lado,
              background: v.fondo,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: fuente ?? lado * 0.36,
              color: v.colorTexto ?? C.ink,
              boxShadow: "inset 0 0 0 1px rgba(11,16,32,0.35)",
            }}
          >
            {v.texto}
          </div>
        );
      }),
    )}
  </div>
);

/** Celda en "modo número": fondo oscuro y el valor pintado de su propio color. */
const comoNumero = (c: RGB): Celda => ({
  fondo: "#0a0d1a",
  texto: String(gris(c)),
  colorTexto: gris(c) < 60 ? "#6b7299" : css(c),
});

const Centro: React.FC<{ top: number; children: React.ReactNode }> = ({
  top,
  children,
}) => (
  <div
    style={{
      position: "absolute",
      top,
      left: 0,
      right: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    {children}
  </div>
);

const Grande: React.FC<{
  children: React.ReactNode;
  color?: string;
  size?: number;
}> = ({ children, color = C.yellow, size = 150 }) => (
  <div
    style={{
      fontFamily: MONO,
      fontWeight: 700,
      fontSize: size,
      color,
      whiteSpace: "nowrap",
      lineHeight: 1,
      letterSpacing: -4,
      fontVariantNumeric: "tabular-nums",
    }}
  >
    {children}
  </div>
);

const Sub: React.FC<{ children: React.ReactNode; size?: number }> = ({
  children,
  size = 48,
}) => (
  <div
    style={{
      fontFamily: FONT,
      fontWeight: 800,
      fontSize: size,
      color: C.ink,
      textAlign: "center",
      marginTop: 18,
    }}
  >
    {children}
  </div>
);

const Pie: React.FC<{ children: React.ReactNode; top?: number }> = ({
  children,
  top = 1452,
}) => (
  <Centro top={top}>
    <div style={{ fontFamily: MONO, fontSize: 30, color: C.dim }}>
      {children}
    </div>
  </Centro>
);

/** Golpe de cámara al entrar a cada escena (sustituye a la transición). */
const Golpe: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [0, 7], [1.05, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return <AbsoluteFill style={{ scale: s }}>{children}</AbsoluteFill>;
};

/** Mitad imagen, mitad números; el borde se mueve sin parar. */
const MitadNumeros: React.FC<{ arriba: React.ReactNode }> = ({ arriba }) => {
  const f = useCurrentFrame();
  const borde = 8 + 4.5 * Math.sin(f / 22);
  return (
    <>
      <Centro top={310}>{arriba}</Centro>
      <Centro top={630}>
        <Rejilla
          lado={50}
          celda={(x, _y, c) =>
            x + 0.5 >= borde ? comoNumero(c) : { fondo: css(c) }
          }
        />
      </Centro>
      <Pie>1080 × 1920 píxeles × 3 colores (RGB)</Pie>
    </>
  );
};

// 1 · Gancho: el dato ya está en el cuadro 0.
const Gancho = () => {
  const f = useCurrentFrame();
  return (
    <MitadNumeros
      arriba={
        <>
          <div style={{ scale: 1 + 0.015 * Math.sin(f / 5) }}>
            <Grande>6,220,800</Grande>
          </div>
          <Sub>números en cada cuadro de este Short</Sub>
        </>
      }
    />
  );
};

// 2 · Zoom a un píxel y su escala de 0 a 255.
const Zoom = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const z = interpolate(f, [0, 40], [1, 5.5], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const tx = 4,
    ty = 5; // celda blanca del balón
  const lado = 50;
  const numeros = prog(f, 28, 40);
  const fase = prog(f, 70, 140);
  const valor = Math.round(fase * 255);
  const barra = spring({ frame: f - 60, fps, config: { damping: 14 } });
  return (
    <>
      <Centro top={300}>
        <Sub size={64}>
          1 cuadrito = <span style={{ color: C.yellow }}>1 píxel</span>
        </Sub>
      </Centro>
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 440,
          width: 860,
          height: 860,
          overflow: "hidden",
          borderRadius: 30,
          border: `6px solid ${C.yellow}`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 430 - (tx + 0.5) * lado,
            top: 430 - (ty + 0.5) * lado,
            scale: z,
            transformOrigin: `${(tx + 0.5) * lado}px ${(ty + 0.5) * lado}px`,
          }}
        >
          <Rejilla
            lado={lado}
            fuente={16}
            celda={(x, y, c) => {
              const centro = x === tx && y === ty;
              const v = centro && f >= 70 ? valor : gris(c);
              const col: RGB = centro && f >= 70 ? [v, v, v] : c;
              return {
                fondo: css(col),
                texto: numeros > 0.5 ? String(v) : undefined,
                colorTexto: v > 128 ? "#0b1020" : "#ffffff",
              };
            }}
          />
        </div>
      </div>
      <Centro top={1340}>
        <div
          style={{
            width: 860,
            opacity: barra,
            translate: `0px ${(1 - barra) * 60}px`,
          }}
        >
          <div
            style={{
              height: 54,
              borderRadius: 27,
              background: "linear-gradient(90deg, #000, #fff)",
              border: `4px solid ${C.dim}`,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: `calc(${fase * 100}% - 14px)`,
                top: -16,
                width: 28,
                height: 78,
                borderRadius: 14,
                background: C.yellow,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 44,
              color: C.ink,
              marginTop: 14,
            }}
          >
            <span>0</span>
            <span>255</span>
          </div>
        </div>
      </Centro>
      <Sfx src="whoosh.wav" at={2} volume={0.3} />
      <Sfx src="pop.wav" at={30} volume={0.4} />
    </>
  );
};

// 3 · La foto en gris es una tabla: una matriz.
const Matriz = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sat = prog(f, 0, 14);
  const nums = prog(f, 75, 90);
  const corchetes = spring({ frame: f - 75, fps, config: { damping: 12 } });
  const etiqueta = spring({ frame: f - 125, fps, config: { damping: 10 } });
  const scan = Math.floor(f / 3) % (N * N);
  const lado = 44;
  const Chip: React.FC<{ v: number; t: string; d: number }> = ({ v, t, d }) => {
    const p = spring({ frame: f - d, fps, config: { damping: 11 } });
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          scale: interpolate(p, [0, 1], [0.6, 1]),
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
            background: `rgb(${v},${v},${v})`,
            border: `4px solid ${C.dim}`,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 34,
            color: v > 128 ? "#0b1020" : "#fff",
          }}
        >
          {v}
        </div>
        <span
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 56,
            color: C.ink,
          }}
        >
          {t}
        </span>
      </div>
    );
  };
  return (
    <>
      <Centro top={300}>
        <div style={{ display: "flex", gap: 70 }}>
          <Chip v={0} t="negro" d={0} />
          <Chip v={255} t="blanco" d={30} />
        </div>
      </Centro>
      <Centro top={480}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Corchete p={corchetes} lado="izq" />
          <Rejilla
            lado={lado}
            fuente={15}
            celda={(x, y, c) => {
              const g = gris(c);
              const mezcla: RGB = [0, 1, 2].map((i) =>
                Math.round(c[i] + (g - c[i]) * sat),
              ) as RGB;
              const activa = nums > 0 && y * N + x === scan;
              return {
                fondo: activa ? C.yellow : css(mezcla),
                texto: nums > 0.5 ? String(g) : undefined,
                colorTexto: activa || g > 128 ? "#0b1020" : "#ffffff",
              };
            }}
          />
          <Corchete p={corchetes} lado="der" />
        </div>
      </Centro>
      <Centro top={1230}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 70,
            color: C.bg,
            background: C.yellow,
            borderRadius: 26,
            padding: "12px 40px",
            scale: interpolate(etiqueta, [0, 1], [0.4, 1]),
            opacity: prog(f, 125, 129),
          }}
        >
          = una matriz 16 × 16
        </div>
      </Centro>
      <Pie>Ejemplo simplificado: balón de 16 × 16 píxeles</Pie>
      <Sfx src="pop.wav" at={75} volume={0.4} />
      <Sfx src="ding.wav" at={125} volume={0.35} />
    </>
  );
};

const Corchete: React.FC<{ p: number; lado: "izq" | "der" }> = ({
  p,
  lado,
}) => (
  <div
    style={{
      width: 26,
      height: 44 * N,
      border: `8px solid ${C.yellow}`,
      borderRight: lado === "izq" ? "none" : undefined,
      borderLeft: lado === "der" ? "none" : undefined,
      opacity: p,
      translate: `${(lado === "izq" ? -1 : 1) * (1 - p) * 60}px 0px`,
    }}
  />
);

// 4 · En color son tres tablas (rojo, verde, azul) que se suman.
const Capas = () => {
  const f = useCurrentFrame();
  const abre = interpolate(f, [4, 30, 78, 98], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const lado = 30;
  const capas: {
    i: 0 | 1 | 2;
    t: string;
    col: string;
    dx: number;
    dy: number;
  }[] = [
    { i: 0, t: "R", col: "#ff4d4d", dx: -250, dy: -200 },
    { i: 1, t: "G", col: "#3ddc84", dx: 0, dy: 0 },
    { i: 2, t: "B", col: "#5b8cff", dx: 250, dy: 200 },
  ];
  return (
    <>
      <Centro top={300}>
        <Grande color={C.ink}>
          × <span style={{ color: C.yellow }}>3</span>
        </Grande>
        <Sub>números por píxel</Sub>
      </Centro>
      <AbsoluteFill>
        {capas.map((k) => (
          <div
            key={k.t}
            style={{
              position: "absolute",
              left: 540 - (lado * N) / 2 + k.dx * abre,
              top: 1000 - (lado * N) / 2 + k.dy * abre,
              mixBlendMode: "screen",
            }}
          >
            <Rejilla
              lado={lado}
              celda={(_x, _y, c) => {
                const v: RGB = [0, 0, 0];
                v[k.i] = c[k.i];
                return { fondo: css(v) };
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                width: 76,
                height: 76,
                borderRadius: 16,
                background: "#0b1020",
                border: `4px solid ${k.col}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: FONT,
                fontWeight: 900,
                fontSize: 50,
                color: k.col,
                opacity: abre,
              }}
            >
              {k.t}
            </div>
          </div>
        ))}
      </AbsoluteFill>
      <Sfx src="whoosh.wav" at={4} volume={0.3} />
      <Sfx src="whoosh.wav" at={78} volume={0.25} />
    </>
  );
};

// 5 · Un filtro es una resta: 255 − x invierte la foto.
const Filtro = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const linea = interpolate(f, [60, 130], [0, N], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const ejemplo = spring({ frame: f - 28, fps, config: { damping: 12 } });
  const lado = 44;
  return (
    <>
      <Centro top={300}>
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 64,
            color: C.ink,
            background: "#0a0d1a",
            border: `4px solid ${C.yellow}88`,
            borderRadius: 24,
            padding: "18px 34px",
          }}
        >
          negativo = <span style={{ color: C.yellow }}>255 − foto</span>
        </div>
        <div
          style={{
            marginTop: 26,
            display: "flex",
            alignItems: "center",
            gap: 22,
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 50,
            color: C.ink,
            scale: interpolate(ejemplo, [0, 1], [0.5, 1]),
            opacity: prog(f, 28, 32),
          }}
        >
          <Mini v={245} /> 255 − 245 = 10 <Mini v={10} />
        </div>
      </Centro>
      <Centro top={620}>
        <div style={{ position: "relative" }}>
          <Rejilla
            lado={lado}
            celda={(_x, y, c) => ({ fondo: css(y < linea ? inv(c) : c) })}
          />
          <div
            style={{
              position: "absolute",
              left: -20,
              right: -20,
              top: linea * lado - 4,
              height: 8,
              borderRadius: 4,
              background: C.yellow,
              boxShadow: `0 0 30px ${C.yellow}`,
              opacity: linea > 0 && linea < N ? 1 : 0,
            }}
          />
        </div>
      </Centro>
      <Centro top={1350}>
        <div
          style={{
            fontFamily: MONO,
            fontSize: 30,
            color: C.dim,
            background: "#0a0d1a",
            borderRadius: 18,
            padding: "14px 24px",
            whiteSpace: "pre",
            opacity: prog(f, 14, 24),
          }}
        >
          {"foto = np.array(Image.open('balon.png'))\nnegativo = 255 - foto"}
        </div>
      </Centro>
      <Sfx src="pop.wav" at={28} volume={0.4} />
      <Sfx src="whoosh.wav" at={60} volume={0.3} />
      <Sfx src="ding.wav" at={130} volume={0.35} />
    </>
  );
};

const Mini: React.FC<{ v: number }> = ({ v }) => (
  <div
    style={{
      width: 56,
      height: 56,
      borderRadius: 10,
      background: `rgb(${v},${v},${v})`,
      border: `3px solid ${C.dim}`,
    }}
  />
);

// 6 · Bucle: la multiplicación queda sin resultado y el cuadro 0 lo da.
const Bucle = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const term = (d: number) =>
    spring({ frame: f - d, fps, config: { damping: 11 } });
  const T: [string, number][] = [
    ["1080", 42],
    [" × 1920", 78],
    [" × 3", 118],
  ];
  return (
    <MitadNumeros
      arriba={
        <>
          <Grande color={C.ink} size={104}>
            {T.map(([t, d]) => {
              const p = term(d);
              return (
                <span
                  key={t}
                  style={{
                    display: "inline-block",
                    whiteSpace: "pre",
                    opacity: f >= d ? 1 : 0,
                    scale: interpolate(p, [0, 1], [1.5, 1]),
                  }}
                >
                  {t}
                </span>
              );
            })}
          </Grande>
          <Sub>números en cada cuadro de este Short</Sub>
          {T.map(([t, d]) => (
            <Sfx key={t} src="tick.wav" at={d} volume={0.5} />
          ))}
        </>
      }
    />
  );
};

const ESCENAS: [string, React.FC][] = [
  ["Gancho", Gancho],
  ["Zoom", Zoom],
  ["Matriz", Matriz],
  ["Capas RGB", Capas],
  ["Filtro", Filtro],
  ["Bucle", Bucle],
];

export const ImagenNumeros: React.FC = () => {
  const voz: Linea[] = IDS.map((id, i) => ({ id, at: INICIO[i] }));
  return (
    <AbsoluteFill>
      <Bg accent={C.yellow} />
      {ESCENAS.map(([nombre, Esc], i) => {
        const desde = INICIO[i];
        const hasta = i < 5 ? INICIO[i + 1] : TOTAL_IMG;
        return (
          <Sequence
            key={nombre}
            name={nombre}
            from={desde}
            durationInFrames={hasta - desde}
          >
            {i === 0 ? (
              <Esc />
            ) : (
              <Golpe>
                <Esc />
              </Golpe>
            )}
          </Sequence>
        );
      })}
      <Handle />
      <Narracion short={S} lineas={voz} />
      <Sequence layout="none" name="Música">
        <Musica src="music-curious.wav" short={S} lineas={voz} />
      </Sequence>
    </AbsoluteFill>
  );
};

/** Balón mitad imagen, mitad números (para la miniatura). */
export const BalonMitad: React.FC<{ lado: number }> = ({ lado }) => (
  <Rejilla
    lado={lado}
    celda={(x, _y, c) => (x >= 8 ? comoNumero(c) : { fondo: css(c) })}
  />
);
