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
  Tache,
  usePop,
} from "../../kit/corto";

// "La IA tira el 97 % de tu foto (y acierta)". Muchos clasificadores (p. ej. ResNet, He et al. 2015)
// reciben 224 × 224 × 3 = 150,528 números: el 2.4 % de un cuadro de 1080 × 1920 × 3 = 6,220,800.
// Foto propia dibujada en canvas; las versiones chicas se reducen de verdad (promedio de píxeles).

const S = "ia224" as const;
const W = 270;
const H = 480;
const CROP_Y = 165; // recorte cuadrado de 270 × 270 donde está el perro

type Version = "foto" | 224 | 112 | 56 | 28;
let cache: Record<string, string> | null = null;
const fotos = () => {
  if (cache) return cache;
  const cv = document.createElement("canvas");
  cv.width = W;
  cv.height = H;
  const c = cv.getContext("2d")!;
  const cielo = c.createLinearGradient(0, 0, 0, H * 0.62);
  cielo.addColorStop(0, "#5aa0f0");
  cielo.addColorStop(1, "#cfe8ff");
  c.fillStyle = cielo;
  c.fillRect(0, 0, W, H);
  c.fillStyle = "#ffe066";
  c.beginPath();
  c.arc(215, 70, 28, 0, Math.PI * 2);
  c.fill();
  // árbol
  c.fillStyle = "#7a5230";
  c.fillRect(28, 170, 16, 140);
  c.fillStyle = "#2b8a3e";
  c.beginPath();
  c.arc(36, 160, 44, 0, Math.PI * 2);
  c.fill();
  // pasto
  c.fillStyle = "#40c057";
  c.fillRect(0, H * 0.62, W, H);
  c.fillStyle = "#37b24d";
  for (let i = 0; i < 40; i++)
    c.fillRect((i * 53) % W, H * 0.64 + ((i * 29) % 160), 3, 8);
  // perro
  const cafe = "#b5763f";
  c.fillStyle = cafe;
  c.beginPath();
  c.ellipse(120, 330, 62, 34, 0, 0, Math.PI * 2);
  c.fill();
  c.fillRect(74, 340, 14, 46);
  c.fillRect(150, 340, 14, 46);
  c.fillRect(98, 345, 12, 40);
  c.fillRect(128, 345, 12, 40);
  c.strokeStyle = cafe;
  c.lineWidth = 9;
  c.lineCap = "round";
  c.beginPath();
  c.moveTo(62, 318);
  c.quadraticCurveTo(38, 290, 50, 268);
  c.stroke();
  c.beginPath();
  c.arc(182, 290, 32, 0, Math.PI * 2);
  c.fill();
  c.fillStyle = "#e3b27c";
  c.beginPath();
  c.ellipse(204, 302, 20, 14, 0, 0, Math.PI * 2);
  c.fill();
  c.fillStyle = "#6b3f1d";
  c.beginPath();
  c.ellipse(166, 278, 11, 24, 0.4, 0, Math.PI * 2);
  c.fill();
  c.fillStyle = "#111";
  c.beginPath();
  c.arc(190, 282, 4.5, 0, Math.PI * 2);
  c.fill();
  c.beginPath();
  c.arc(220, 298, 6, 0, Math.PI * 2);
  c.fill();
  c.fillStyle = "#e8590c";
  c.fillRect(150, 300, 10, 22);

  const reducir = (n: number) => {
    const o = document.createElement("canvas");
    o.width = n;
    o.height = n;
    const oc = o.getContext("2d")!;
    oc.imageSmoothingEnabled = true;
    oc.imageSmoothingQuality = "high";
    oc.drawImage(cv, 0, CROP_Y, W, W, 0, 0, n, n);
    return o.toDataURL("image/png");
  };
  // El recorte de 270 px equivale a 1080 px de ancho: reducir a 56 = llevar 1080 a 224.
  cache = {
    foto: cv.toDataURL("image/png"),
    "224": reducir(56),
    "112": reducir(28),
    "56": reducir(14),
    "28": reducir(7),
  };
  return cache;
};

const Foto: React.FC<{ v: Version; w: number; h?: number; borde?: string }> = ({
  v,
  w,
  h,
  borde,
}) => (
  <RImg
    src={fotos()[String(v)]}
    style={{
      width: w,
      height: h ?? w,
      borderRadius: 14,
      display: "block",
      imageRendering: v === "foto" ? "auto" : "pixelated",
      outline: borde ? `6px solid ${borde}` : undefined,
    }}
  />
);

/** "−97.6 %" con la foto y lo que ve la IA a escala real: cuadro 0 y final (bucle). */
const Portada: React.FC = () => {
  const f = useCurrentFrame();
  const fw = 330;
  const ia = Math.round((224 / 1080) * fw);
  return (
    <>
      <Centro top={290}>
        <div style={{ scale: 1 + 0.015 * Math.sin(f / 5) }}>
          <Grande size={170}>−97.6 %</Grande>
        </div>
        <Sub size={48}>de tu foto, antes de mirarla</Sub>
      </Centro>
      <Centro top={600}>
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
            }}
          >
            <Foto v="foto" w={fw} h={(fw * 16) / 9} />
            <span
              style={{
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: 32,
                color: C.dim,
              }}
            >
              1080 × 1920
            </span>
          </div>
          <span
            style={{
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 90,
              color: C.dim,
            }}
          >
            →
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
            }}
          >
            <Foto v={224} w={ia} borde={C.yellow} />
            <span
              style={{
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: 32,
                color: C.yellow,
              }}
            >
              224 × 224
            </span>
          </div>
        </div>
      </Centro>
      <Pie top={1430}>a escala real · ResNet y otros: entrada de 224 × 224</Pie>
    </>
  );
};

const Gancho = () => <Portada />;

// 2 · Pensarías que más píxeles es mejor.
const Megapixeles = () => {
  const f = useCurrentFrame();
  const mp = ["12 MP", "48 MP", "200 MP"];
  return (
    <>
      <Centro top={320}>
        <Sub size={72}>¿más píxeles = mejor?</Sub>
      </Centro>
      <Centro top={560}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 30,
          }}
        >
          {mp.map((t, i) => {
            const d = 2 + i * 10;
            return (
              <div
                key={t}
                style={{
                  fontFamily: MONO,
                  fontWeight: 700,
                  fontSize: 90 + i * 40,
                  color: C.ink,
                  background: "#141a36",
                  border: `5px solid ${C.blue}`,
                  borderRadius: 26,
                  padding: "10px 40px",
                  opacity: prog(f, d, d + 6),
                  scale: interpolate(prog(f, d, d + 6), [0, 1], [0.6, 1]),
                }}
              >
                {t}
              </div>
            );
          })}
        </div>
      </Centro>
      <Tache delay={50} size={440} />
      <Sfx src="pop.wav" at={2} volume={0.3} />
      <Sfx src="boom.wav" at={50} volume={0.35} />
    </>
  );
};

// 3 · Muchos modelos famosos solo miran 224 × 224 (a escala del cuadro de 1080 × 1920).
const Escala = () => {
  const f = useCurrentFrame();
  const k = 0.4;
  const p = usePop(40, 9);
  const chip = usePop(100);
  return (
    <>
      <Centro top={300}>
        <Grande size={110} color={C.yellow}>
          224 × 224
        </Grande>
      </Centro>
      <Centro top={470}>
        <div
          style={{
            position: "relative",
            width: 1080 * k,
            height: 1920 * k,
            border: `5px dashed ${C.dim}`,
            borderRadius: 16,
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 14,
              left: 18,
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: 30,
              color: C.dim,
            }}
          >
            1080 × 1920
          </span>
          <div
            style={{
              position: "absolute",
              left: (1080 * k - 224 * k) / 2,
              top: (1920 * k - 224 * k) / 2,
              width: 224 * k,
              height: 224 * k,
              background: C.yellow,
              borderRadius: 6,
              boxShadow: `0 0 40px ${C.yellow}`,
              scale: f >= 40 ? interpolate(p, [0, 1], [3, 1]) : 0,
            }}
          />
        </div>
      </Centro>
      <Centro top={1290}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 46,
            color: C.bg,
            background: C.ink,
            borderRadius: 20,
            padding: "8px 28px",
            opacity: f >= 100 ? 1 : 0,
            scale: interpolate(chip, [0, 1], [0.5, 1]),
          }}
        >
          ResNet (2015) y muchos más
        </div>
      </Centro>
      <Sfx src="pop.wav" at={40} volume={0.45} />
      <Sfx src="ding.wav" at={100} volume={0.3} />
    </>
  );
};

// 4 · Con menos números aprende más rápido.
const Rapido = () => {
  const f = useCurrentFrame();
  const barra = (t: string, n: string, v: number, color: string) => (
    <div style={{ width: 880 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 42,
          color: C.ink,
          marginBottom: 12,
        }}
      >
        <span>{t}</span>
        <span style={{ fontFamily: MONO, color: C.dim }}>{n}</span>
      </div>
      <div
        style={{
          height: 56,
          borderRadius: 28,
          background: "#141a36",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${Math.min(1, v) * 100}%`,
            height: "100%",
            borderRadius: 28,
            background: color,
          }}
        />
      </div>
    </div>
  );
  const lenta = interpolate(f, [8, 110], [0, 0.22], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rapida = interpolate(f, [8, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <>
      <Centro top={320}>
        <Sub size={68}>
          menos números = <span style={{ color: C.green }}>más rápido</span>
        </Sub>
      </Centro>
      <Centro top={600}>
        <div style={{ display: "flex", flexDirection: "column", gap: 70 }}>
          {barra("foto completa", "6,220,800", lenta, C.coral)}
          {barra("224 × 224", "150,528", rapida, C.green)}
        </div>
      </Centro>
      <Pie top={1200}>Ilustración: entrenar con menos números por foto</Pie>
      <Sfx src="whoosh.wav" at={8} volume={0.3} />
      <Sfx src="ding.wav" at={50} volume={0.35} />
    </>
  );
};

// 5 · Para saber si hay un perro, sobran.
const Perro = () => {
  const f = useCurrentFrame();
  const vs: Version[] = [224, 112, 56, 28];
  return (
    <>
      <Centro top={300}>
        <Sub size={70}>
          ¿sigue siendo <span style={{ color: C.yellow }}>perro</span>?
        </Sub>
      </Centro>
      <Centro top={460}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 400px)",
            gap: 30,
          }}
        >
          {vs.map((v, i) => {
            const d = i * 12;
            return (
              <div
                key={v}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  opacity: prog(f, d, d + 5),
                }}
              >
                <Foto v={v} w={400} />
                <span
                  style={{
                    fontFamily: MONO,
                    fontWeight: 700,
                    fontSize: 36,
                    color: C.ink,
                  }}
                >
                  {v} × {v}
                </span>
              </div>
            );
          })}
        </div>
      </Centro>
      {[0, 12, 24, 36].map((d) => (
        <Sfx key={d} src="tick.wav" at={d} volume={0.45} />
      ))}
    </>
  );
};

// 6 · Seis millones entran, ciento cincuenta mil se quedan.
const Cuenta = () => {
  const f = useCurrentFrame();
  const n = Math.round(
    interpolate(f, [40, 80], [6220800, 150528], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const pct = usePop(84);
  return (
    <>
      <Centro top={420}>
        <Sub size={52} color={C.dim}>
          {f < 40 ? "entran" : "se quedan"}
        </Sub>
        <Grande size={160} color={f < 80 ? C.ink : C.yellow}>
          {n.toLocaleString("en-US")}
        </Grande>
        <Sub size={44} color={C.dim}>
          {f < 40 ? "1080 × 1920 × 3" : "224 × 224 × 3"}
        </Sub>
      </Centro>
      <Centro top={900}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 80,
            color: C.bg,
            background: C.yellow,
            borderRadius: 26,
            padding: "10px 40px",
            opacity: f >= 84 ? 1 : 0,
            scale: interpolate(pct, [0, 1], [0.4, 1]),
          }}
        >
          solo el 2.4 %
        </div>
      </Centro>
      <Sfx src="whoosh.wav" at={40} volume={0.3} />
      <Sfx src="ding.wav" at={84} volume={0.4} />
    </>
  );
};

const Final = () => <Portada />;

const ESCENAS: EscenaCorta[] = [
  { nombre: "Gancho", voz: "a1", Comp: Gancho, aire: 8 },
  { nombre: "Megapíxeles", voz: "a2", Comp: Megapixeles, aire: 10 },
  { nombre: "224", voz: "a3", Comp: Escala, aire: 10 },
  { nombre: "Rápido", voz: "a4", Comp: Rapido, aire: 10 },
  { nombre: "Perro", voz: "a5", Comp: Perro, aire: 20 },
  { nombre: "Cuenta", voz: "a6", Comp: Cuenta, aire: 14 },
  { nombre: "Final", voz: "a7", Comp: Final, aire: 6 },
];

export const TOTAL_IA224 = linea(S, ESCENAS).total;

export const IA224: React.FC = () => (
  <Corto short={S} escenas={ESCENAS} acento={C.yellow} />
);

/** Foto y versión 224 (ampliada), para la miniatura. */
export const PerroPar: React.FC = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
    <Foto v="foto" w={330} h={587} />
    <Foto v={224} w={400} borde={C.yellow} />
  </div>
);
