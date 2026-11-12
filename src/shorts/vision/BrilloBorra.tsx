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
  usePop,
} from "../../kit/corto";

// "Subir el brillo borra tu foto para siempre". Brillo = sumar a cada número, con tope en 255.
// Nubes y cielo claros terminan en el mismo 255 y al bajar el brillo quedan como un gris liso.
// Paisaje en pixel art propio (ejemplo simplificado).

const S = "brillo" as const;
type RGB = [number, number, number];
const W = 18;
const H = 18;

/** Paisaje: cielo claro con nubes, sol, mar con olas. */
const FOTO: RGB[][] = (() => {
  const nubes: [number, number, number, number][] = [
    [4, 3, 3.2, 1.3],
    [12, 5, 3.6, 1.4],
    [7, 8, 2.6, 1.1],
  ];
  return Array.from({ length: H }, (_, y) =>
    Array.from({ length: W }, (_, x): RGB => {
      if (y >= 11) {
        const ola = (x + y * 2) % 6 === 0;
        const k = (y - 11) * 9;
        return ola ? [120, 170, 220] : [40 + k / 3, 90 - k / 4, 160 - k / 2];
      }
      if (Math.hypot(x - 14.5, y - 9.5) < 1.9) return [255, 200, 90];
      const nube = nubes.some(
        ([cx, cy, rx, ry]) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1,
      );
      if (nube) return (x + y) % 3 ? [250, 251, 253] : [236, 240, 250];
      return [205 + Math.round(y / 2), 222 + y, 255];
    }),
  );
})();

const tope = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
const suma = (c: RGB, d: number): RGB => [
  tope(c[0] + d),
  tope(c[1] + d),
  tope(c[2] + d),
];
const css = ([r, g, b]: RGB) => `rgb(${r},${g},${b})`;
const luz = ([r, g, b]: RGB) => Math.round(0.299 * r + 0.587 * g + 0.114 * b);

/** Foto con brillo: +`d` y, si `luego` existe, después se resta (lo que se perdió no vuelve). */
const color = (c: RGB, d: number, luego = 0) => suma(suma(c, d), luego);

const Foto: React.FC<{
  lado: number;
  celda: (x: number, y: number, c: RGB) => RGB;
  numeros?: boolean;
}> = ({ lado, celda, numeros }) => (
  <div
    style={{
      position: "relative",
      width: lado * W,
      height: lado * H,
      borderRadius: 18,
      overflow: "hidden",
    }}
  >
    {FOTO.flatMap((fila, y) =>
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
              background: css(v),
              boxShadow: "inset 0 0 0 1px rgba(11,16,32,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: lado * 0.34,
              color: luz(v) > 140 ? "#0b1020" : "#fff",
            }}
          >
            {numeros ? luz(v) : null}
          </div>
        );
      }),
    )}
  </div>
);

const Chip: React.FC<{
  children: React.ReactNode;
  bg?: string;
  color?: string;
}> = ({ children, bg = C.yellow, color: col = C.bg }) => (
  <div
    style={{
      fontFamily: FONT,
      fontWeight: 900,
      fontSize: 52,
      background: bg,
      color: col,
      borderRadius: 20,
      padding: "8px 26px",
    }}
  >
    {children}
  </div>
);

/** Antes / después con el borde moviéndose: es el cuadro 0 y también el final (bucle). */
const Portada: React.FC = () => {
  const f = useCurrentFrame();
  const borde = 9 + 2.5 * Math.sin(f / 20);
  return (
    <>
      <Centro top={300}>
        <Grande mono={false} size={120} color={C.ink}>
          brillo <span style={{ color: C.yellow }}>+50</span>
        </Grande>
      </Centro>
      <Centro top={470}>
        <div style={{ position: "relative" }}>
          <Foto
            lado={48}
            celda={(x, _y, c) => (x + 0.5 >= borde ? color(c, 50) : c)}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: borde * 48 - 3,
              width: 6,
              background: C.yellow,
            }}
          />
          <div style={{ position: "absolute", top: 20, left: 20 }}>
            <Chip bg="#0b1020cc" color={C.ink}>
              antes
            </Chip>
          </div>
          <div style={{ position: "absolute", top: 20, right: 20 }}>
            <Chip bg={C.coral} color={C.ink}>
              ¿y las nubes?
            </Chip>
          </div>
        </div>
      </Centro>
      <Pie top={1380}>Ejemplo simplificado · paisaje de 18 × 18 píxeles</Pie>
    </>
  );
};

const Gancho = () => <Portada />;

const Deslizador: React.FC<{ v: number; max?: number }> = ({ v, max = 50 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 26, width: 860 }}>
    <svg width={70} height={70} viewBox="0 0 70 70">
      <circle cx={35} cy={35} r={14} fill={C.yellow} />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4;
        return (
          <line
            key={i}
            x1={35 + 21 * Math.cos(a)}
            y1={35 + 21 * Math.sin(a)}
            x2={35 + 31 * Math.cos(a)}
            y2={35 + 31 * Math.sin(a)}
            stroke={C.yellow}
            strokeWidth={6}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
    <div
      style={{
        flex: 1,
        height: 26,
        borderRadius: 13,
        background: "#141a36",
        position: "relative",
      }}
    >
      <div
        style={{
          width: `${50 + (v / max) * 50}%`,
          height: "100%",
          borderRadius: 13,
          background: C.yellow,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `calc(${50 + (v / max) * 50}% - 24px)`,
          top: -11,
          width: 48,
          height: 48,
          borderRadius: 24,
          background: C.ink,
        }}
      />
    </div>
    <span
      style={{
        fontFamily: MONO,
        fontWeight: 700,
        fontSize: 52,
        color: C.ink,
        width: 130,
        textAlign: "right",
      }}
    >
      {v >= 0 ? "+" : "−"}
      {Math.abs(Math.round(v))}
    </span>
  </div>
);

// 2 · Parece que solo la aclaras.
const Aclaras = () => {
  const f = useCurrentFrame();
  const d = interpolate(f, [4, 50], [0, 50], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  return (
    <>
      <Centro top={320}>
        <Deslizador v={d} />
      </Centro>
      <Centro top={500}>
        <Foto lado={48} celda={(_x, _y, c) => color(c, d)} />
      </Centro>
    </>
  );
};

// 3 · El brillo es una suma: +50 a cada número.
const Suma = () => {
  const f = useCurrentFrame();
  const cae = interpolate(f, [24, 44], [-260, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.quad),
  });
  const d = interpolate(f, [44, 70], [0, 50], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Recorte de 4 × 3 celdas: cielo, nube y mar.
  const celdas: [number, number][] = [
    [2, 2],
    [4, 3],
    [6, 2],
    [9, 4],
    [11, 5],
    [13, 5],
    [3, 12],
    [8, 14],
  ];
  return (
    <>
      <Centro top={300}>
        <Grande mono={false} size={100} color={C.ink}>
          brillo = <span style={{ color: C.yellow }}>suma</span>
        </Grande>
      </Centro>
      <Centro top={520}>
        <div style={{ position: "relative", paddingTop: 30 }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: cae - 40,
              display: "flex",
              justifyContent: "center",
              opacity: f >= 24 && f < 70 ? 1 : 0,
              zIndex: 2,
            }}
          >
            <Chip>+50</Chip>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 200px)",
              gap: 16,
            }}
          >
            {celdas.map(([x, y]) => {
              const v = color(FOTO[y][x], d);
              return (
                <div
                  key={`${x}${y}`}
                  style={{
                    height: 200,
                    borderRadius: 22,
                    background: css(v),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: MONO,
                    fontWeight: 700,
                    fontSize: 64,
                    color: luz(v) > 140 ? "#0b1020" : "#fff",
                  }}
                >
                  {luz(v)}
                </div>
              );
            })}
          </div>
        </div>
      </Centro>
      <Centro top={1080}>
        <Sub size={46} color={C.dim}>
          cada número de la foto
        </Sub>
      </Centro>
      <Sfx src="whoosh.wav" at={24} volume={0.3} />
      <Sfx src="pop.wav" at={44} volume={0.45} />
    </>
  );
};

// 4 · La trampa: nada pasa de 255.
const Trampa = () => {
  const f = useCurrentFrame();
  const v = interpolate(f, [28, 70], [220, 270], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const real = Math.min(255, v);
  const choca = v >= 255;
  const alto = 620;
  const y = (n: number) => alto - (n / 280) * alto;
  const fantasma = prog(f, 70, 80);
  return (
    <>
      <Centro top={300}>
        <Grande size={130} color={C.ink}>
          220 + 50 ={" "}
          <span style={{ color: choca ? C.coral : C.ink }}>
            {Math.round(real)}
          </span>
        </Grande>
      </Centro>
      <Centro top={560}>
        <div style={{ position: "relative", width: 600, height: alto }}>
          <div
            style={{
              position: "absolute",
              left: -80,
              right: -80,
              top: y(255) - 5,
              height: 10,
              borderRadius: 5,
              background: C.coral,
            }}
          />
          <div
            style={{
              position: "absolute",
              right: -80,
              top: y(255) - 70,
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 40,
              color: C.coral,
            }}
          >
            máximo 255
          </div>
          <div
            style={{
              position: "absolute",
              left: 200,
              width: 200,
              top: y(270),
              height: y(255) - y(270),
              border: `5px dashed ${C.dim}`,
              borderBottom: "none",
              borderRadius: "20px 20px 0 0",
              opacity: fantasma,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 40,
              color: C.dim,
            }}
          >
            <span style={{ marginTop: -130, textDecoration: "line-through" }}>
              270
            </span>
          </div>
          <div
            style={{
              position: "absolute",
              left: 200,
              width: 200,
              top: y(real),
              bottom: 0,
              borderRadius: "20px 20px 0 0",
              background: `rgb(${Math.round(real)},${Math.round(real)},${Math.round(real)})`,
              scale: choca ? `1 ${1 + 0.02 * Math.sin(f)}` : undefined,
            }}
          />
        </div>
      </Centro>
      <Sfx src="boom.wav" at={56} volume={0.4} />
    </>
  );
};

// 5 · Nubes y cielo se vuelven el mismo número.
const Mismo = () => {
  const f = useCurrentFrame();
  const d = interpolate(f, [26, 56], [0, 50], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const muestras: [string, number, number][] = [
    ["cielo", 2, 9],
    ["nube", 4, 3],
    ["nube", 13, 5],
    ["cielo", 9, 1],
  ];
  return (
    <>
      <Centro top={320}>
        <Sub size={68}>
          {f < 56 ? (
            "4 tonos distintos…"
          ) : (
            <>
              …<span style={{ color: C.coral }}>1 solo número</span>
            </>
          )}
        </Sub>
      </Centro>
      <Centro top={560}>
        <div style={{ display: "flex", gap: 20 }}>
          {muestras.map(([t, x, y], i) => {
            const v = color(FOTO[y][x], d);
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 200,
                    height: 420,
                    borderRadius: 24,
                    background: css(v),
                  }}
                />
                <span
                  style={{
                    fontFamily: MONO,
                    fontWeight: 700,
                    fontSize: 56,
                    color: C.ink,
                  }}
                >
                  {luz(v)}
                </span>
                <span
                  style={{
                    fontFamily: FONT,
                    fontWeight: 800,
                    fontSize: 38,
                    color: C.dim,
                  }}
                >
                  {t}
                </span>
              </div>
            );
          })}
        </div>
      </Centro>
      <Sfx src="ding.wav" at={56} volume={0.35} />
    </>
  );
};

// 6 · Al bajar el brillo, ya no regresan.
const Bajar = () => {
  const f = useCurrentFrame();
  const b = interpolate(f, [6, 46], [0, -50], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const p = usePop(50);
  return (
    <>
      <Centro top={320}>
        <Deslizador v={50 + b} />
      </Centro>
      <Centro top={500}>
        <div style={{ position: "relative" }}>
          <Foto lado={48} celda={(_x, _y, c) => color(c, 50, b)} />
          <div
            style={{
              position: "absolute",
              top: 120,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              opacity: f >= 50 ? 1 : 0,
              scale: interpolate(p, [0, 1], [0.5, 1]),
            }}
          >
            <Chip bg={C.coral} color={C.ink}>
              sin nubes: gris liso
            </Chip>
          </div>
        </div>
      </Centro>
      <Sfx src="whoosh.wav" at={6} volume={0.3} />
      <Sfx src="boom.wav" at={50} volume={0.3} />
    </>
  );
};

// 7 · Código y vuelta al cuadro 0 (bucle).
const Final = () => {
  const f = useCurrentFrame();
  if (f >= 40) return <Portada />;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          fontFamily: MONO,
          fontWeight: 700,
          fontSize: 50,
          color: C.ink,
          background: "#0a0d1a",
          border: `4px solid ${C.yellow}88`,
          borderRadius: 24,
          padding: "26px 34px",
        }}
      >
        np.clip(foto <span style={{ color: C.yellow }}>+ 50</span>, 0,{" "}
        <span style={{ color: C.coral }}>255</span>)
      </div>
    </AbsoluteFill>
  );
};

const ESCENAS: EscenaCorta[] = [
  { nombre: "Gancho", voz: "b1", Comp: Gancho, aire: 8 },
  { nombre: "Aclaras", voz: "b2", Comp: Aclaras, aire: 12 },
  { nombre: "Suma", voz: "b3", Comp: Suma, aire: 14 },
  { nombre: "Trampa", voz: "b4", Comp: Trampa, aire: 12 },
  { nombre: "Mismo número", voz: "b5", Comp: Mismo, aire: 12 },
  { nombre: "Bajar", voz: "b6", Comp: Bajar, aire: 14 },
  { nombre: "Final", voz: "b7", Comp: Final, aire: 6 },
];

export const TOTAL_BRILLO = linea(S, ESCENAS).total;

export const BrilloBorra: React.FC = () => (
  <Corto short={S} escenas={ESCENAS} acento={C.yellow} />
);

/** Antes / después fijo, para la miniatura. */
export const FotoQuemada: React.FC<{ lado: number }> = ({ lado }) => (
  <Foto lado={lado} celda={(x, _y, c) => (x >= 9 ? color(c, 50) : c)} />
);
