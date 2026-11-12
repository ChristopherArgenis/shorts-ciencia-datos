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
import { BALON, gris } from "../sueltos/ImagenNumeros";

// "Desenfocar una foto es sacar promedios". Convolución 3×3 de verdad sobre el balón en gris:
// promedio (1/9 en cada casilla) = borroso; [0,−1,0 / −1,5,−1 / 0,−1,0] = afilar.

const S = "borroso" as const;
const N = 16;
const GRIS: number[][] = BALON.map((f) => f.map(gris));

type Nucleo = number[][];
const PROMEDIO: Nucleo = [
  [1 / 9, 1 / 9, 1 / 9],
  [1 / 9, 1 / 9, 1 / 9],
  [1 / 9, 1 / 9, 1 / 9],
];
const AFILAR: Nucleo = [
  [0, -1, 0],
  [-1, 5, -1],
  [0, -1, 0],
];

const at = (img: number[][], x: number, y: number) =>
  img[Math.max(0, Math.min(N - 1, y))][Math.max(0, Math.min(N - 1, x))];

/** Convolución 3×3 con bordes repetidos y resultado entre 0 y 255. */
const conv = (img: number[][], k: Nucleo) =>
  img.map((fila, y) =>
    fila.map((_, x) => {
      let s = 0;
      for (let j = -1; j <= 1; j++)
        for (let i = -1; i <= 1; i++)
          s += k[j + 1][i + 1] * at(img, x + i, y + j);
      return Math.max(0, Math.min(255, Math.round(s)));
    }),
  );

const BORROSA = conv(GRIS, PROMEDIO);
const AFILADA = conv(BORROSA, AFILAR);

/** Celda con más contraste a su alrededor: ahí se ve mejor el promedio. */
const [CX, CY] = (() => {
  let mejor: [number, number] = [5, 5];
  let v = -1;
  for (let y = 2; y < N - 2; y++)
    for (let x = 2; x < N - 2; x++) {
      const vals: number[] = [];
      for (let j = -1; j <= 1; j++)
        for (let i = -1; i <= 1; i++) vals.push(GRIS[y + j][x + i]);
      const m = vals.reduce((a, b) => a + b, 0) / 9;
      const varianza = vals.reduce((a, b) => a + (b - m) ** 2, 0);
      if (varianza > v) {
        v = varianza;
        mejor = [x, y];
      }
    }
  return mejor;
})();
const VECINOS: number[] = [];
for (let j = -1; j <= 1; j++)
  for (let i = -1; i <= 1; i++) VECINOS.push(GRIS[CY + j][CX + i]);
const SUMA = VECINOS.reduce((a, b) => a + b, 0);

const g = (v: number) => `rgb(${v},${v},${v})`;

const Imagen: React.FC<{
  lado: number;
  valor: (x: number, y: number) => number;
  numeros?: boolean;
  children?: React.ReactNode;
}> = ({ lado, valor, numeros, children }) => (
  <div
    style={{
      position: "relative",
      width: lado * N,
      height: lado * N,
      borderRadius: 16,
      overflow: "hidden",
    }}
  >
    {GRIS.flatMap((fila, y) =>
      fila.map((_, x) => {
        const v = valor(x, y);
        return (
          <div
            key={`${x}-${y}`}
            style={{
              position: "absolute",
              left: x * lado,
              top: y * lado,
              width: lado,
              height: lado,
              background: g(v),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: lado * 0.34,
              color: v > 128 ? "#0b1020" : "#fff",
            }}
          >
            {numeros ? v : null}
          </div>
        );
      }),
    )}
    {children}
  </div>
);

/** Marco de la ventanita 3×3 sobre la celda (x, y). */
const Ventana: React.FC<{
  x: number;
  y: number;
  lado: number;
  color?: string;
}> = ({ x, y, lado, color = C.yellow }) => (
  <div
    style={{
      position: "absolute",
      left: (x - 1) * lado - 4,
      top: (y - 1) * lado - 4,
      width: lado * 3 + 8,
      height: lado * 3 + 8,
      border: `8px solid ${color}`,
      borderRadius: 10,
      boxShadow: `0 0 30px ${color}`,
    }}
  />
);

/** Núcleo 3×3 con sus pesos. */
const Nucleo3: React.FC<{ k: Nucleo; lado?: number; color?: string }> = ({
  k,
  lado = 110,
  color = C.yellow,
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(3, ${lado}px)`,
      gap: 8,
      padding: 10,
      border: `5px solid ${color}`,
      borderRadius: 18,
      background: "#0a0d1a",
    }}
  >
    {k.flat().map((w, i) => (
      <div
        key={i}
        style={{
          height: lado,
          borderRadius: 12,
          background:
            w > 0.5 ? `${C.green}44` : w < 0 ? `${C.coral}44` : "#141a36",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: MONO,
          fontWeight: 700,
          fontSize: lado * 0.36,
          color: C.ink,
        }}
      >
        {Math.abs(w - 1 / 9) < 1e-6 ? "1/9" : w < 0 ? `−${-w}` : w}
      </div>
    ))}
  </div>
);

/** Mitad nítida, mitad borrosa, con la ventana recorriendo la frontera: cuadro 0 y final. */
const Portada: React.FC = () => {
  const f = useCurrentFrame();
  const borde = 8;
  const vy = 7.5 + 5.5 * Math.sin(f / 16);
  const lado = 50;
  return (
    <>
      <Centro top={300}>
        <Grande mono={false} size={88} color={C.ink}>
          borroso = <span style={{ color: C.yellow }}>promedio</span>
        </Grande>
      </Centro>
      <Centro top={480}>
        <Imagen
          lado={lado}
          valor={(x, y) => (x >= borde ? BORROSA[y][x] : GRIS[y][x])}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: borde * lado - 3,
              width: 6,
              background: C.yellow,
            }}
          />
          <Ventana x={borde} y={Math.round(vy)} lado={lado} />
        </Imagen>
      </Centro>
      <Pie top={1330}>Ejemplo simplificado · balón de 16 × 16 píxeles</Pie>
    </>
  );
};

const Gancho = () => <Portada />;

// 2 · Parece que el celular la empaña.
const Empana = () => {
  const f = useCurrentFrame();
  const vaho = prog(f, 0, 30);
  return (
    <>
      <Centro top={300}>
        <Sub size={72}>¿el celular la empaña?</Sub>
      </Centro>
      <Centro top={480}>
        <div style={{ position: "relative" }}>
          <Imagen lado={50} valor={(x, y) => GRIS[y][x]} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 16,
              background:
                "radial-gradient(circle at 50% 50%, rgba(230,236,255,0.75), rgba(230,236,255,0.35) 70%)",
              backdropFilter: `blur(${10 * vaho}px)`,
              opacity: vaho,
            }}
          />
        </div>
      </Centro>
      <Tache delay={40} size={440} />
      <Sfx src="boom.wav" at={40} volume={0.35} />
    </>
  );
};

// 3 · Cada píxel se vuelve el promedio de sus 9 vecinos.
const Promedio = () => {
  const f = useCurrentFrame();
  const suma = usePop(50);
  const divide = usePop(78);
  const listo = f >= 100;
  const promedio = Math.round(SUMA / 9);
  return (
    <>
      <Centro top={300}>
        <Sub size={64}>
          cada píxel = <span style={{ color: C.yellow }}>promedio de 9</span>
        </Sub>
      </Centro>
      <Centro top={460}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 200px)",
            gap: 12,
          }}
        >
          {VECINOS.map((v, i) => {
            const centro = i === 4;
            const d = 6 + i * 3;
            const val = centro && listo ? promedio : v;
            return (
              <div
                key={i}
                style={{
                  height: 200,
                  borderRadius: 20,
                  background: g(val),
                  border: centro
                    ? `8px solid ${C.yellow}`
                    : `4px solid ${C.bg2}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: MONO,
                  fontWeight: 700,
                  fontSize: 66,
                  color: val > 128 ? "#0b1020" : "#fff",
                  opacity: prog(f, d, d + 6),
                  scale:
                    centro && listo
                      ? 1 +
                        0.06 *
                          Math.sin((f - 100) / 3) *
                          Math.max(0, 1 - (f - 100) / 20)
                      : 1,
                }}
              >
                {val}
              </div>
            );
          })}
        </div>
      </Centro>
      <Centro top={1150}>
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 64,
            color: C.ink,
            display: "flex",
            gap: 24,
          }}
        >
          <span
            style={{
              opacity: f >= 50 ? 1 : 0,
              scale: interpolate(suma, [0, 1], [0.5, 1]),
            }}
          >
            suma {SUMA}
          </span>
          <span
            style={{
              color: C.yellow,
              opacity: f >= 78 ? 1 : 0,
              scale: interpolate(divide, [0, 1], [0.5, 1]),
            }}
          >
            ÷ 9 = {promedio}
          </span>
        </div>
      </Centro>
      <Sfx src="pop.wav" at={50} volume={0.4} />
      <Sfx src="pop.wav" at={78} volume={0.4} />
      <Sfx src="ding.wav" at={100} volume={0.35} />
    </>
  );
};

// 4 · Esa ventanita se llama filtro: recorre toda la imagen.
const Filtro = () => {
  const f = useCurrentFrame();
  const paso = Math.floor(
    interpolate(f, [4, 66], [0, N * N - 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const lado = 40;
  const vx = paso % N;
  const vy = Math.floor(paso / N);
  return (
    <>
      <Centro top={300}>
        <Nucleo3 k={PROMEDIO} lado={80} />
        <Sub size={56}>
          un <span style={{ color: C.yellow }}>filtro</span> 3 × 3
        </Sub>
      </Centro>
      <Centro top={760}>
        <Imagen
          lado={lado}
          valor={(x, y) => (y * N + x <= paso ? BORROSA[y][x] : GRIS[y][x])}
        >
          <Ventana x={vx} y={vy} lado={lado} />
        </Imagen>
      </Centro>
      <Sfx src="whoosh.wav" at={4} volume={0.3} />
    </>
  );
};

// 5 · Es la misma pieza que usa una IA para ver.
const IA = () => {
  const f = useCurrentFrame();
  const nucleos: Nucleo[] = [
    PROMEDIO,
    [
      [-1, 0, 1],
      [-2, 0, 2],
      [-1, 0, 1],
    ],
    AFILAR,
  ];
  const caja = usePop(40);
  return (
    <>
      <Centro top={300}>
        <Sub size={60}>la pieza base de la IA que ve</Sub>
      </Centro>
      <Centro top={460}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 26,
            alignItems: "center",
          }}
        >
          {nucleos.map((k, i) => {
            const d = 4 + i * 10;
            return (
              <div
                key={i}
                style={{
                  opacity: prog(f, d, d + 6),
                  translate: `${(1 - prog(f, d, d + 8)) * -120}px 0px`,
                }}
              >
                <Nucleo3
                  k={k}
                  lado={58}
                  color={[C.yellow, C.blue, C.green][i]}
                />
              </div>
            );
          })}
        </div>
      </Centro>
      <Centro top={1300}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 52,
            color: C.bg,
            background: C.yellow,
            borderRadius: 22,
            padding: "10px 30px",
            opacity: f >= 40 ? 1 : 0,
            scale: interpolate(caja, [0, 1], [0.4, 1]),
          }}
        >
          red neuronal convolucional
        </div>
      </Centro>
      <Sfx src="pop.wav" at={4} volume={0.3} />
      <Sfx src="ding.wav" at={40} volume={0.3} />
    </>
  );
};

// 6 · Cambia los números: en vez de borrar, afila.
const Afila = () => {
  const f = useCurrentFrame();
  const cambio = f >= 36;
  const t = prog(f, 40, 80);
  return (
    <>
      <Centro top={300}>
        <Nucleo3
          k={cambio ? AFILAR : PROMEDIO}
          lado={80}
          color={cambio ? C.green : C.yellow}
        />
      </Centro>
      <Centro top={700}>
        <Imagen
          lado={44}
          valor={(x, y) =>
            Math.round(BORROSA[y][x] + (AFILADA[y][x] - BORROSA[y][x]) * t)
          }
        />
      </Centro>
      <Centro top={1430}>
        <Sub size={52} color={cambio ? C.green : C.dim}>
          {cambio ? "mismos pasos, otros pesos: afila" : "borroso…"}
        </Sub>
      </Centro>
      <Sfx src="whoosh.wav" at={36} volume={0.3} />
      <Sfx src="ding.wav" at={80} volume={0.3} />
    </>
  );
};

// 7 · Con nueves borra, con otros pesos afila… y vuelta al cuadro 0 (bucle).
const Final = () => {
  const f = useCurrentFrame();
  if (f >= 76) return <Portada />;
  const Col: React.FC<{ k: Nucleo; img: number[][]; t: string; c: string }> = ({
    k,
    img,
    t,
    c,
  }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
      }}
    >
      <Nucleo3 k={k} lado={56} color={c} />
      <Imagen lado={26} valor={(x, y) => img[y][x]} />
      <span
        style={{ fontFamily: FONT, fontWeight: 900, fontSize: 60, color: c }}
      >
        {t}
      </span>
    </div>
  );
  return (
    <>
      <Centro top={380}>
        <div style={{ display: "flex", gap: 60 }}>
          <Col k={PROMEDIO} img={BORROSA} t="borra" c={C.yellow} />
          <Col k={AFILAR} img={AFILADA} t="afila" c={C.green} />
        </div>
      </Centro>
    </>
  );
};

const ESCENAS: EscenaCorta[] = [
  { nombre: "Gancho", voz: "d1", Comp: Gancho, aire: 6 },
  { nombre: "Empaña", voz: "d2", Comp: Empana, aire: 8 },
  { nombre: "Promedio", voz: "d3", Comp: Promedio, aire: 14 },
  { nombre: "Filtro", voz: "d4", Comp: Filtro, aire: 4 },
  { nombre: "IA", voz: "d5", Comp: IA, aire: 10 },
  { nombre: "Afila", voz: "d6", Comp: Afila, aire: 12 },
  { nombre: "Final", voz: "d7", Comp: Final, aire: 4 },
];

export const TOTAL_BORROSO = linea(S, ESCENAS).total;

export const Borroso: React.FC = () => (
  <Corto short={S} escenas={ESCENAS} acento={C.yellow} />
);

/** Mitad nítida, mitad borrosa (fija), para la miniatura. */
export const BorrosoMitad: React.FC<{ lado: number }> = ({ lado }) => (
  <Imagen lado={lado} valor={(x, y) => (x >= 8 ? BORROSA[y][x] : GRIS[y][x])} />
);
