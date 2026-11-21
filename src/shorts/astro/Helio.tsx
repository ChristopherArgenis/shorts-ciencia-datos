import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Sfx } from "../../kit/kit";
import { C, FONT } from "../../kit/theme";
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
import {
  colorNm,
  Espectro,
  H_NM,
  HE_NM,
  Marca,
  NA_NM,
  RAYAS_SOL,
  SolPx,
} from "./comun";

// "Hallamos helio en el Sol antes que en la Tierra". 1868: raya amarilla brillante (≈587.6 nm) en el eclipse
// (Janssen; Lockyer); nombre por helios. 1895: Ramsay lo aísla en la Tierra (APS, Smithsonian).
// Rayas de H y Na con longitudes de onda de laboratorio. Ilustración propia.

const S = "helio" as const;
const W = 900;
const OSCURAS = RAYAS_SOL.map((r) => r.nm);

const Portada: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <>
      <Centro top={290}>
        <Grande mono={false} size={100} color={C.ink}>
          hecho de <span style={{ color: C.yellow }}>luz</span>
        </Grande>
      </Centro>
      <Centro top={480}>
        <div style={{ scale: 1 + 0.01 * Math.sin(f / 8) }}>
          <SolPx d={400} />
        </div>
      </Centro>
      <Centro top={1000}>
        <div style={{ position: "relative" }}>
          <Espectro w={W} h={130} oscuras={OSCURAS} />
          <Marca w={W} nm={656.3} t="H" />
          <Marca w={W} nm={486.1} t="H" />
          <Marca w={W} nm={434.0} t="H" />
          <Marca w={W} nm={589.3} t="Na" />
          <Marca w={W} nm={HE_NM - 14} t="He" color={C.yellow} arriba />
        </div>
      </Centro>
      <Pie top={1290}>el espectro del Sol · rayas reales</Pie>
    </>
  );
};

const Gancho = () => <Portada />;

// 2 · Está a 150 millones de km: nadie puede tomar una muestra.
const Lejos = () => (
  <>
    <Centro top={320}>
      <Grande size={110} color={C.ink}>
        149,600,000 km
      </Grande>
    </Centro>
    <Centro top={560}>
      <svg width={300} height={560} viewBox="0 0 60 112">
        <rect x={18} y={4} width={24} height={8} rx={2} fill="#ced4da" />
        <path
          d="M20 12 L20 90 Q20 106 30 106 Q40 106 40 90 L40 12 Z"
          fill="#e7f5ff55"
          stroke="#ced4da"
          strokeWidth={3}
        />
        <path
          d="M21 70 L21 90 Q21 105 30 105 Q39 105 39 90 L39 70 Z"
          fill="#ffd43b88"
        />
      </svg>
    </Centro>
    <Tache delay={34} size={430} />
    <Sfx src="boom.wav" at={34} volume={0.35} />
  </>
);

// 3 · Su luz trae una huella: el prisma.
const Prisma = () => {
  const f = useCurrentFrame();
  const p = prog(f, 6, 30);
  return (
    <>
      <Centro top={320}>
        <Sub size={66}>
          su luz trae una <span style={{ color: C.yellow }}>huella</span>
        </Sub>
      </Centro>
      <Centro top={620}>
        <svg width={1000} height={520} viewBox="0 0 1000 520">
          <polygon
            points={`0,250 ${380 * p},250 ${380 * p},270 0,270`}
            fill="#fff9db"
          />
          <polygon
            points="380,90 560,420 200,420"
            fill="#e7f5ff44"
            stroke="#dee2e6"
            strokeWidth={6}
          />
          {Array.from({ length: 24 }).map((_, i) => {
            const nm = 400 + i * 14;
            const ang = -0.14 + i * 0.012;
            const L = 520 * prog(f, 26, 50);
            return (
              <line
                key={i}
                x1={470}
                y1={290}
                x2={470 + L * Math.cos(ang)}
                y2={290 + L * Math.sin(ang) + i * 6}
                stroke={colorNm(nm)}
                strokeWidth={12}
              />
            );
          })}
        </svg>
      </Centro>
      <Sfx src="whoosh.wav" at={26} volume={0.3} />
    </>
  );
};

// 4 · Cada elemento deja rayas exactas: código de barras.
const Codigo = () => {
  const f = useCurrentFrame();
  const fila = (t: string, nms: number[], d: number) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        opacity: prog(f, d, d + 8),
      }}
    >
      <span
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 52,
          color: C.ink,
        }}
      >
        {t}
      </span>
      <Espectro w={W} h={90} brillantes={nms} grosor={7} />
    </div>
  );
  return (
    <>
      <Centro top={300}>
        <Sub size={62}>código de barras de luz</Sub>
      </Centro>
      <Centro top={450}>
        <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
          {fila("hidrógeno", H_NM, 4)}
          {fila("sodio", NA_NM, 34)}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              opacity: prog(f, 70, 80),
            }}
          >
            <span
              style={{
                fontFamily: FONT,
                fontWeight: 900,
                fontSize: 52,
                color: C.yellow,
              }}
            >
              el Sol
            </span>
            <Espectro
              w={W}
              h={110}
              oscuras={OSCURAS}
              resaltar={f >= 90 ? [...H_NM, 589.3] : []}
            />
          </div>
        </div>
      </Centro>
      <Pie top={1280}>longitudes de onda reales · laboratorio</Pie>
      <Sfx src="pop.wav" at={4} volume={0.35} />
      <Sfx src="pop.wav" at={34} volume={0.35} />
      <Sfx src="ding.wav" at={90} volume={0.35} />
    </>
  );
};

// 5 · 1868: una raya amarilla de nada conocido.
const Eclipse = () => {
  const f = useCurrentFrame();
  const q = usePop(70, 9);
  return (
    <>
      <Centro top={300}>
        <Grande size={150} color={C.ink}>
          1868
        </Grande>
      </Centro>
      <Centro top={500}>
        <div style={{ position: "relative", width: 360, height: 360 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              boxShadow: "0 0 90px 30px #fff3bf88",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: "#05070f",
              border: "6px solid #fff3bf",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: -18,
              top: 120,
              width: 44,
              height: 60,
              borderRadius: "50% 50% 20% 20%",
              background: "#ff8787",
            }}
          />
        </div>
      </Centro>
      <Centro top={980}>
        <div style={{ position: "relative", opacity: prog(f, 30, 40) }}>
          <Espectro
            w={W}
            h={120}
            brillantes={[656.3, 486.1, HE_NM]}
            grosor={9}
          />
          <div
            style={{
              position: "absolute",
              left: ((NA_NM[0] - 380) / 370) * W - 2,
              top: -16,
              width: 2,
              height: 152,
              borderLeft: `4px dashed ${C.dim}`,
            }}
          />
          <Marca w={W} nm={598} t="sodio" color={C.dim} />
          <div
            style={{
              position: "absolute",
              left: ((HE_NM - 380) / 370) * W - 70,
              top: -110,
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 100,
              color: colorNm(HE_NM),
              opacity: f >= 70 ? 1 : 0,
              scale: interpolate(q, [0, 1], [1.8, 1]),
            }}
          >
            ?
          </div>
        </div>
      </Centro>
      <Pie top={1320}>luz del borde del Sol durante el eclipse</Pie>
      <Sfx src="ding.wav" at={70} volume={0.4} />
    </>
  );
};

// 6 · La llamaron helio, por el Sol. En la Tierra, 27 años después.
const Nombre = () => {
  const f = useCurrentFrame();
  const t = prog(f, 60, 100);
  return (
    <>
      <Centro top={320}>
        <Grande mono={false} size={120} color={C.yellow}>
          HELIOS → helio
        </Grande>
        <Sub size={46} color={C.dim}>
          “Sol”, en griego
        </Sub>
      </Centro>
      <Centro top={700}>
        <div style={{ width: 880, opacity: prog(f, 50, 60) }}>
          <div
            style={{
              position: "relative",
              height: 24,
              borderRadius: 12,
              background: "#141a36",
            }}
          >
            <div
              style={{
                width: `${t * 100}%`,
                height: "100%",
                borderRadius: 12,
                background: C.yellow,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 48,
              color: C.ink,
              marginTop: 14,
            }}
          >
            <span>1868 · en el Sol</span>
            <span style={{ opacity: f >= 100 ? 1 : 0.3 }}>
              1895 · en la Tierra
            </span>
          </div>
          <div
            style={{
              textAlign: "center",
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 70,
              color: C.yellow,
              marginTop: 30,
              opacity: f >= 100 ? 1 : 0,
            }}
          >
            27 años después
          </div>
        </div>
      </Centro>
      <Centro top={1080}>
        <svg
          width={180}
          height={260}
          viewBox="0 0 60 88"
          style={{
            opacity: f >= 100 ? 1 : 0,
            translate: `0px ${-10 * Math.sin(f / 10)}px`,
          }}
        >
          <ellipse cx={30} cy={28} rx={24} ry={28} fill="#ff6b6b" />
          <path
            d="M30 56 Q26 72 32 88"
            stroke="#ced4da"
            strokeWidth={2}
            fill="none"
          />
        </svg>
      </Centro>
      <Sfx src="pop.wav" at={4} volume={0.35} />
      <Sfx src="ding.wav" at={100} volume={0.35} />
    </>
  );
};

const Final = () => <Portada />;

const ESCENAS: EscenaCorta[] = [
  { nombre: "Gancho", voz: "h1", Comp: Gancho, aire: 6 },
  { nombre: "Lejos", voz: "h2", Comp: Lejos, aire: 6 },
  { nombre: "Prisma", voz: "h3", Comp: Prisma, aire: 8 },
  { nombre: "Código de barras", voz: "h4", Comp: Codigo, aire: 8 },
  { nombre: "1868", voz: "h5", Comp: Eclipse, aire: 6 },
  { nombre: "Helio", voz: "h6", Comp: Nombre, aire: 8 },
  { nombre: "Final", voz: "h7", Comp: Final, aire: 6 },
];

export const TOTAL_HELIO = linea(S, ESCENAS).total;

export const Helio: React.FC = () => (
  <Corto short={S} escenas={ESCENAS} acento={C.yellow} />
);

/** Sol con su espectro (fijo), para la miniatura. */
export const SolEspectro: React.FC = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 50,
    }}
  >
    <SolPx d={460} />
    <Espectro w={W} h={130} oscuras={OSCURAS} />
  </div>
);
