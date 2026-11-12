import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Sfx } from "../../kit/kit";
import { C, MONO } from "../../kit/theme";
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

// "Tu celular no ve caras: ve restas". Bordes = restas entre vecinos (Sobel, calculado de verdad).
// Rasgos tipo Viola y Jones (2001): promedio de zona clara − promedio de zona oscura.
// Cara en pixel art propio, en gris (ejemplo simplificado).

const S = "caras" as const;
const N = 18;
const MAPA = [
  "..................",
  "......hhhhhh......",
  "....hhhhhhhhhh....",
  "...hhhhhhhhhhhh...",
  "...hhsssssssshh...",
  "...hssssssssssh...",
  "...sbbbssssbbbs...",
  "...ssssssssssss...",
  "...sseesssseess...",
  "...sseesssseess...",
  "...ssssssssssss...",
  "...sssssnnsssss...",
  "....ssssnnssss....",
  "....ssssssssss....",
  "....sssmmmmsss....",
  ".....ssssssss.....",
  "......ssssss......",
  ".......kkkk.......",
];
const TONO: Record<string, number> = {
  ".": 90,
  h: 40,
  s: 200,
  b: 60,
  e: 25,
  n: 160,
  m: 110,
  k: 170,
};
const CARA: number[][] = MAPA.map((f) => f.split("").map((ch) => TONO[ch]));

const at = (x: number, y: number) =>
  CARA[Math.max(0, Math.min(N - 1, y))][Math.max(0, Math.min(N - 1, x))];

/** Bordes con Sobel: |gx| + |gy|, recortado a 0–255. */
const BORDES: number[][] = CARA.map((fila, y) =>
  fila.map((_, x) => {
    const gx =
      at(x + 1, y - 1) +
      2 * at(x + 1, y) +
      at(x + 1, y + 1) -
      (at(x - 1, y - 1) + 2 * at(x - 1, y) + at(x - 1, y + 1));
    const gy =
      at(x - 1, y + 1) +
      2 * at(x, y + 1) +
      at(x + 1, y + 1) -
      (at(x - 1, y - 1) + 2 * at(x, y - 1) + at(x + 1, y - 1));
    return Math.min(255, Math.round((Math.abs(gx) + Math.abs(gy)) / 2));
  }),
);

/** Zonas del rasgo tipo Viola y Jones: banda de ojos (oscura) y mejillas (clara). */
type Zona = { x: number; y: number; w: number; h: number };
const OJOS: Zona = { x: 3, y: 6, w: 12, h: 4 };
const MEJILLAS: Zona = { x: 3, y: 10, w: 12, h: 4 };
const media = (z: Zona) => {
  let s = 0;
  for (let y = z.y; y < z.y + z.h; y++)
    for (let x = z.x; x < z.x + z.w; x++) s += CARA[y][x];
  return Math.round(s / (z.w * z.h));
};
const M_OJOS = media(OJOS);
const M_MEJ = media(MEJILLAS);
const CAJA: Zona = { x: 2, y: 1, w: 14, h: 17 };

// Fila de los ojos y sus restas con el vecino.
const FILA_Y = 8;
const FILA = CARA[FILA_Y].slice(1, 13);
const RESTAS = FILA.slice(1).map((v, i) => Math.abs(v - FILA[i]));

const g = (v: number) => `rgb(${v},${v},${v})`;

const Imagen: React.FC<{
  lado: number;
  valor: (x: number, y: number) => number;
  children?: React.ReactNode;
}> = ({ lado, valor, children }) => (
  <div
    style={{
      position: "relative",
      width: lado * N,
      height: lado * N,
      borderRadius: 16,
      overflow: "hidden",
    }}
  >
    {CARA.flatMap((fila, y) =>
      fila.map((_, x) => (
        <div
          key={`${x}-${y}`}
          style={{
            position: "absolute",
            left: x * lado,
            top: y * lado,
            width: lado,
            height: lado,
            background: g(valor(x, y)),
          }}
        />
      )),
    )}
    {children}
  </div>
);

const Marco: React.FC<{
  z: Zona;
  lado: number;
  color: string;
  grosor?: number;
  relleno?: string;
}> = ({ z, lado, color, grosor = 8, relleno }) => (
  <div
    style={{
      position: "absolute",
      left: z.x * lado,
      top: z.y * lado,
      width: z.w * lado,
      height: z.h * lado,
      border: `${grosor}px solid ${color}`,
      borderRadius: 10,
      background: relleno,
      boxSizing: "border-box",
    }}
  />
);

/** Mitad cara, mitad bordes, con el cuadro de detección: cuadro 0 y final (bucle). */
const Portada: React.FC = () => {
  const f = useCurrentFrame();
  const borde = 9 + 2.5 * Math.sin(f / 20);
  const lado = 48;
  return (
    <>
      <Centro top={300}>
        <Grande mono={false} size={110} color={C.ink}>
          solo <span style={{ color: C.yellow }}>restas</span>
        </Grande>
      </Centro>
      <Centro top={470}>
        <Imagen
          lado={lado}
          valor={(x, y) => (x + 0.5 >= borde ? BORDES[y][x] : CARA[y][x])}
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
          <Marco z={CAJA} lado={lado} color={C.green} />
        </Imagen>
      </Centro>
      <Pie top={1360}>Ejemplo simplificado · cara de 18 × 18 píxeles</Pie>
    </>
  );
};

const Gancho = () => <Portada />;

// 2 · Crees que busca ojos y nariz.
const OjosNariz = () => {
  const f = useCurrentFrame();
  const lado = 48;
  const circulo = (cx: number, cy: number, r: number, d: number) => {
    const p = prog(f, d, d + 8);
    return (
      <div
        style={{
          position: "absolute",
          left: cx * lado - r,
          top: cy * lado - r,
          width: r * 2,
          height: r * 2,
          borderRadius: "50%",
          border: `8px solid ${C.blue}`,
          opacity: p,
          scale: interpolate(p, [0, 1], [1.6, 1]),
        }}
      />
    );
  };
  return (
    <>
      <Centro top={300}>
        <Sub size={72}>¿busca ojos y nariz?</Sub>
      </Centro>
      <Centro top={470}>
        <Imagen lado={lado} valor={(x, y) => CARA[y][x]}>
          {circulo(6, 9, 80, 4)}
          {circulo(12, 9, 80, 12)}
          {circulo(9, 12, 70, 20)}
        </Imagen>
      </Centro>
      <Tache delay={44} size={440} />
      <Sfx src="pop.wav" at={4} volume={0.3} />
      <Sfx src="boom.wav" at={44} volume={0.35} />
    </>
  );
};

const Celdas: React.FC<{
  vals: number[];
  ancho: number;
  d: number;
  color?: (v: number, i: number) => string;
}> = ({ vals, ancho, d, color }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {vals.map((v, i) => (
        <div
          key={i}
          style={{
            width: ancho,
            height: ancho,
            borderRadius: 10,
            background: color ? color(v, i) : g(v),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: ancho * 0.36,
            color: color ? C.ink : v > 128 ? "#0b1020" : "#fff",
            opacity: prog(f, d + i * 2, d + i * 2 + 5),
          }}
        >
          {v}
        </div>
      ))}
    </div>
  );
};

/** Miniatura de la cara con la fila marcada. */
const CaraFila: React.FC = () => (
  <Imagen lado={22} valor={(x, y) => CARA[y][x]}>
    <Marco
      z={{ x: 1, y: FILA_Y, w: 12, h: 1 }}
      lado={22}
      color={C.yellow}
      grosor={4}
    />
  </Imagen>
);

// 3 · Primero busca dónde cambian los números.
const Fila = () => (
  <>
    <Centro top={300}>
      <Sub size={64}>¿dónde cambian los números?</Sub>
    </Centro>
    <Centro top={460}>
      <CaraFila />
    </Centro>
    <Centro top={950}>
      <Celdas vals={FILA} ancho={74} d={10} />
    </Centro>
    <Sfx src="whoosh.wav" at={10} volume={0.3} />
  </>
);

// 4 · Resta cada píxel menos su vecino: cero = nada, salto = borde.
const Restas = () => {
  const f = useCurrentFrame();
  const max = Math.max(...RESTAS);
  const brilla = f >= 70;
  return (
    <>
      <Centro top={300}>
        <Grande mono={false} size={90} color={C.ink}>
          resta de <span style={{ color: C.yellow }}>vecinos</span>
        </Grande>
        <Sub size={46} color={C.dim}>
          0 = nada · salto = <span style={{ color: C.yellow }}>borde</span>
        </Sub>
      </Centro>
      <Centro top={540}>
        <Celdas vals={FILA} ancho={74} d={-20} />
      </Centro>
      <Centro top={670}>
        <div style={{ display: "flex", gap: 6, paddingLeft: 40 }}>
          {RESTAS.map((v, i) => {
            const p = prog(f, 10 + i * 3, 18 + i * 3);
            const salto = v > 50;
            return (
              <div
                key={i}
                style={{
                  width: 74,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: MONO,
                    fontWeight: 700,
                    fontSize: 30,
                    color: salto ? C.yellow : C.dim,
                    opacity: p,
                  }}
                >
                  {v}
                </span>
                <div
                  style={{
                    height: 520,
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <div
                    style={{
                      width: 58,
                      height: Math.max(6, (v / max) * 500) * p,
                      borderRadius: "12px 12px 0 0",
                      background: salto ? C.yellow : C.bg2,
                      boxShadow:
                        salto && brilla ? `0 0 40px ${C.yellow}` : undefined,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Centro>
      <Sfx src="pop.wav" at={10} volume={0.3} />
      <Sfx src="ding.wav" at={70} volume={0.35} />
    </>
  );
};

// 5 · Viola y Jones (2001): zona clara − zona oscura.
const ViolaJones = () => {
  const f = useCurrentFrame();
  const lado = 44;
  const ojos = usePop(18);
  const mej = usePop(80);
  const res = usePop(130);
  return (
    <>
      <Centro top={300}>
        <Sub size={60}>
          <span style={{ color: C.ink }}>zona clara</span> −{" "}
          <span style={{ color: C.dim }}>zona oscura</span>
        </Sub>
      </Centro>
      <Centro top={430}>
        <Imagen lado={lado} valor={(x, y) => CARA[y][x]}>
          {f >= 18 ? (
            <div
              style={{
                scale: interpolate(ojos, [0, 1], [1.2, 1]),
                position: "absolute",
                inset: 0,
              }}
            >
              <Marco
                z={OJOS}
                lado={lado}
                color={C.coral}
                relleno="rgba(11,16,32,0.35)"
              />
            </div>
          ) : null}
          {f >= 80 ? (
            <div
              style={{
                scale: interpolate(mej, [0, 1], [1.2, 1]),
                position: "absolute",
                inset: 0,
              }}
            >
              <Marco
                z={MEJILLAS}
                lado={lado}
                color={C.green}
                relleno="rgba(255,255,255,0.18)"
              />
            </div>
          ) : null}
        </Imagen>
      </Centro>
      <Centro top={1250}>
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 58,
            color: C.ink,
            display: "flex",
            gap: 20,
          }}
        >
          <span style={{ color: C.green, opacity: f >= 80 ? 1 : 0 }}>
            {M_MEJ}
          </span>
          <span style={{ opacity: f >= 80 ? 1 : 0 }}>−</span>
          <span style={{ color: C.coral, opacity: f >= 18 ? 1 : 0 }}>
            {M_OJOS}
          </span>
          <span
            style={{
              color: C.yellow,
              opacity: f >= 130 ? 1 : 0,
              scale: interpolate(res, [0, 1], [0.5, 1]),
            }}
          >
            = {M_MEJ - M_OJOS} → ¿cara?
          </span>
        </div>
      </Centro>
      <Pie top={1360}>Viola y Jones, CVPR 2001 · promedios de cada zona</Pie>
      <Sfx src="pop.wav" at={18} volume={0.4} />
      <Sfx src="pop.wav" at={80} volume={0.4} />
      <Sfx src="ding.wav" at={130} volume={0.35} />
    </>
  );
};

// 6 · Miles de restas en milisegundos… y aparece el cuadrito.
const Barrido = () => {
  const f = useCurrentFrame();
  const lado = 48;
  let seed = 11;
  const r = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const ventanas = Array.from({ length: 70 }).map(() => {
    const w = 4 + Math.floor(r() * 9);
    return {
      x: Math.floor(r() * (N - w)),
      y: Math.floor(r() * (N - w)),
      w,
      h: w,
    };
  });
  const visibles = Math.floor(
    interpolate(f, [0, 70], [0, ventanas.length], {
      extrapolateRight: "clamp",
    }),
  );
  const fija = usePop(74);
  return (
    <>
      <Centro top={300}>
        <Grande mono={false} size={100} color={C.ink}>
          miles de <span style={{ color: C.blue }}>restas</span>
        </Grande>
      </Centro>
      <Centro top={470}>
        <Imagen lado={lado} valor={(x, y) => CARA[y][x]}>
          {f < 74 ? (
            ventanas
              .slice(Math.max(0, visibles - 6), visibles)
              .map((z, i) => (
                <Marco key={i} z={z} lado={lado} color={C.blue} grosor={5} />
              ))
          ) : (
            <div
              style={{
                position: "absolute",
                inset: 0,
                scale: interpolate(fija, [0, 1], [1.3, 1]),
              }}
            >
              <Marco z={CAJA} lado={lado} color={C.green} grosor={10} />
            </div>
          )}
        </Imagen>
      </Centro>
      <Pie top={1360}>
        Ilustración: el detector revisa ventanas de muchos tamaños
      </Pie>
      {[0, 20, 40, 60].map((d) => (
        <Sfx key={d} src="tick.wav" at={d} volume={0.35} />
      ))}
      <Sfx src="ding.wav" at={74} volume={0.4} />
    </>
  );
};

// 7 · Y así, aunque parezca que te mira… (vuelta al cuadro 0).
const Final = () => {
  const f = useCurrentFrame();
  if (f >= 30) return <Portada />;
  return (
    <>
      <Centro top={300}>
        <Grande mono={false} size={110} color={C.ink}>
          te <span style={{ color: C.yellow }}>“mira”</span>
        </Grande>
      </Centro>
      <Centro top={470}>
        <Imagen lado={48} valor={(x, y) => BORDES[y][x]} />
      </Centro>
    </>
  );
};

const ESCENAS: EscenaCorta[] = [
  { nombre: "Gancho", voz: "r1", Comp: Gancho, aire: 8 },
  { nombre: "Ojos y nariz", voz: "r2", Comp: OjosNariz, aire: 8 },
  { nombre: "Fila", voz: "r3", Comp: Fila, aire: 6 },
  { nombre: "Restas", voz: "r4", Comp: Restas, aire: 10 },
  { nombre: "Viola y Jones", voz: "r5", Comp: ViolaJones, aire: 10 },
  { nombre: "Barrido", voz: "r6", Comp: Barrido, aire: 8 },
  { nombre: "Final", voz: "r7", Comp: Final, aire: 4 },
];

export const TOTAL_CARAS = linea(S, ESCENAS).total;

export const CarasRestas: React.FC = () => (
  <Corto short={S} escenas={ESCENAS} acento={C.blue} />
);

/** Mitad cara, mitad bordes (fija), para la miniatura. */
export const CaraMitad: React.FC<{ lado: number }> = ({ lado }) => (
  <Imagen lado={lado} valor={(x, y) => (x >= 9 ? BORDES[y][x] : CARA[y][x])}>
    <Marco z={CAJA} lado={lado} color={C.green} />
  </Imagen>
);
