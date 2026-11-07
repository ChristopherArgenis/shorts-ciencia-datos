import React from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { Narracion, Musica, type Linea } from "../kit/voz";
import { Bg, Handle, Sfx, Stage, Sticker, Words, useIn } from "../kit/kit";
import { C, FONT, MONO } from "../kit/theme";

// Explicación general de cómo funciona un modelo de lenguaje como Claude.
// Los cortes en tokens, los números y los porcentajes son ilustrativos.

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const rnd = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

/** Pastilla de token. */
const Chip: React.FC<{ children: React.ReactNode; color?: string; size?: number; style?: React.CSSProperties }> = ({
  children,
  color = C.blue,
  size = 56,
  style,
}) => (
  <div
    style={{
      fontFamily: MONO,
      fontWeight: 700,
      fontSize: size,
      color: C.ink,
      background: `${color}33`,
      border: `3px solid ${color}`,
      borderRadius: 18,
      padding: "8px 20px",
      whiteSpace: "pre",
      ...style,
    }}
  >
    {children}
  </div>
);

const Nota: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontFamily: MONO, fontSize: 28, color: C.dim, textAlign: "center" }}>{children}</div>
);

// ---------- Escenas ----------

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const r = rnd(9);
  const nums = Array.from({ length: 24 }).map(() => Math.floor(100 + r() * 99900));
  return (
    <Stage gap={40}>
      <Words text="Claude no lee *palabras*." size={104} stagger={1} accent={C.coral} />
      <Words text="Lee esto:" size={80} delay={30} color={C.dim} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, width: 880, justifyContent: "center" }}>
        {nums.map((n, i) => {
          const p = interpolate(frame, [36 + i * 1.5, 42 + i * 1.5], [0, 1], clamp);
          const shown = frame < 70 ? Math.floor(100 + ((n * (frame + 3)) % 99900)) : n;
          return (
            <div key={i} style={{ opacity: p, scale: 0.6 + 0.4 * p }}>
              <Chip size={40} color={i % 3 === 0 ? C.green : i % 3 === 1 ? C.blue : C.purple}>
                {String(shown)}
              </Chip>
            </div>
          );
        })}
      </div>
      <Sfx src="whoosh.wav" at={36} volume={0.35} />
    </Stage>
  );
};

const PIEZAS = ["¿", "Cómo", " func", "iona", " Claude", "?"];

const Tokens: React.FC = () => {
  const frame = useCurrentFrame();
  const r = rnd(4);
  const ids = PIEZAS.map(() => Math.floor(1000 + r() * 90000));
  const corte = interpolate(frame, [30, 60], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const aNum = interpolate(frame, [95, 125], [0, 1], clamp);
  return (
    <Stage gap={50}>
      <Words text="1. Tu texto se corta en *tokens*" size={78} accent={C.yellow} />
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14 * corte + 2, width: 900 }}>
        {PIEZAS.map((p, i) => (
          <div key={i} style={{ translate: `0px ${(i % 2 ? 1 : -1) * 18 * corte}px` }}>
            <Chip size={64} color={[C.blue, C.green, C.purple, C.coral, C.yellow, C.blue][i]}>
              {p}
            </Chip>
          </div>
        ))}
      </div>
      <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 90, color: C.dim, opacity: aNum }}>↓</div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, width: 900, opacity: aNum }}>
        {ids.map((n, i) => (
          <Chip key={i} size={46} color={[C.blue, C.green, C.purple, C.coral, C.yellow, C.blue][i]}>
            {String(n)}
          </Chip>
        ))}
      </div>
      <Words text="…y cada uno se vuelve *números*." size={66} delay={110} accent={C.green} />
      <Nota>Ejemplo simplificado: los cortes y números reales son otros</Nota>
      <Sfx src="pop.wav" at={30} />
      <Sfx src="pop.wav" at={95} />
    </Stage>
  );
};

const FRASE = ["El", "gato", "se", "escondió", "porque", "tenía", "miedo"];
const PESOS = [0.05, 0.95, 0.1, 0.35, 0.2, 0, 0.45]; // atención de "tenía" hacia cada palabra (ilustrativo)

const Atencion: React.FC = () => {
  const frame = useCurrentFrame();
  const Y0 = 40;
  const DY = 96;
  const foco = 5;
  return (
    <Stage gap={30}>
      <Words text="2. Cada token *mira* a los demás" size={78} accent={C.yellow} />
      <div style={{ position: "relative", width: 860, height: Y0 * 2 + DY * (FRASE.length - 1) }}>
        <svg width={860} height={Y0 * 2 + DY * (FRASE.length - 1)} style={{ position: "absolute", left: 0, top: 0 }}>
          {FRASE.map((_, i) => {
            if (i === foco) return null;
            const p = interpolate(frame, [30 + i * 6, 55 + i * 6], [0, 1], clamp);
            const y1 = Y0 + foco * DY;
            const y2 = Y0 + i * DY;
            const bulge = 300 + Math.abs(foco - i) * 40;
            return (
              <path
                key={i}
                d={`M 470 ${y1} C ${470 + bulge} ${y1}, ${470 + bulge} ${y2}, 470 ${y2}`}
                fill="none"
                stroke={i === 1 ? C.green : C.dim}
                strokeOpacity={0.25 + 0.75 * PESOS[i]}
                strokeWidth={4 + 22 * PESOS[i]}
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - p}
              />
            );
          })}
        </svg>
        {FRASE.map((w, i) => (
          <div
            key={w}
            style={{
              position: "absolute",
              right: 860 - 450,
              top: Y0 + i * DY - 40,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Chip size={50} color={i === foco ? C.yellow : i === 1 && frame > 90 ? C.green : C.blue}>
              {w}
            </Chip>
          </div>
        ))}
      </div>
      <Words text="¿Quién tenía miedo? → *el* *gato*" size={64} delay={95} accent={C.green} />
      <Nota>Se llama atención · pesos ilustrativos</Nota>
      <Sfx src="whoosh.wav" at={30} volume={0.3} />
      <Sfx src="ding.wav" at={95} volume={0.35} />
    </Stage>
  );
};

const OPCIONES: [string, number][] = [
  ["azul", 62],
  ["gris", 14],
  ["enorme", 9],
  ["rojo", 4],
];

const Prediccion: React.FC = () => {
  const frame = useCurrentFrame();
  const gana = useIn(110, 10);
  return (
    <Stage gap={40}>
      <Words text="3. Predice el *siguiente* token" size={78} accent={C.yellow} />
      <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 84, color: C.ink }}>
        El cielo es <span style={{ color: C.green, opacity: gana }}>azul</span>
        <span style={{ color: C.dim, opacity: 1 - gana }}>___</span>
      </div>
      <div style={{ width: 860, display: "flex", flexDirection: "column", gap: 22 }}>
        {OPCIONES.map(([w, pct], i) => {
          const p = interpolate(frame, [25 + i * 8, 65 + i * 8], [0, pct], { ...clamp, easing: Easing.out(Easing.cubic) });
          return (
            <div key={w} style={{ display: "flex", alignItems: "center", gap: 20, fontFamily: FONT, fontWeight: 800, fontSize: 48 }}>
              <div style={{ width: 200, textAlign: "right", color: i === 0 ? C.green : C.ink }}>{w}</div>
              <div style={{ flex: 1, height: 52, background: C.bg2, borderRadius: 26, overflow: "hidden" }}>
                <div style={{ width: `${p}%`, height: "100%", background: i === 0 ? C.green : C.blue, borderRadius: 26 }} />
              </div>
              <div style={{ width: 120, color: C.dim }}>{Math.round(p)}%</div>
            </div>
          );
        })}
      </div>
      <Nota>Probabilidades ilustrativas</Nota>
      <Sfx src="ding.wav" at={110} volume={0.4} />
    </Stage>
  );
};

const RESPUESTA = ["El", " cielo", " es", " azul", " porque", " el", " aire", " dispersa", " más", " la", " luz", " azul", "."];

const Repite: React.FC = () => {
  const frame = useCurrentFrame();
  const n = Math.max(0, Math.min(RESPUESTA.length, Math.floor((frame - 15) / 8) + 1));
  return (
    <Stage gap={50}>
      <Words text="4. Lo agrega… y *repite*" size={84} accent={C.yellow} />
      <div
        style={{
          width: 880,
          minHeight: 420,
          background: C.bg2,
          borderRadius: 28,
          padding: 36,
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 64,
          lineHeight: 1.25,
          color: C.ink,
        }}
      >
        {RESPUESTA.slice(0, n).map((t, i) => (
          <span key={i} style={{ color: i === n - 1 ? C.green : C.ink, whiteSpace: "pre-wrap" }}>
            {t}
          </span>
        ))}
        <span style={{ color: C.yellow, opacity: Math.floor(frame / 8) % 2 ? 1 : 0.2 }}>▍</span>
      </div>
      <div style={{ fontFamily: MONO, fontSize: 48, color: C.dim }}>
        token <span style={{ color: C.green }}>{n}</span>
      </div>
      {RESPUESTA.map((_, i) => (
        <Sfx key={i} src="tick.wav" at={15 + i * 8} volume={0.3} />
      ))}
    </Stage>
  );
};

const Paso: React.FC<{ n: string; titulo: string; texto: string; color: string; delay: number }> = ({ n, titulo, texto, color, delay }) => {
  const p = useIn(delay, 12);
  return (
    <div
      style={{
        width: 880,
        display: "flex",
        gap: 28,
        alignItems: "center",
        background: C.bg2,
        borderRadius: 28,
        padding: "30px 34px",
        borderLeft: `12px solid ${color}`,
        opacity: p,
        translate: `${(1 - p) * 80}px 0px`,
        fontFamily: FONT,
      }}
    >
      <div style={{ fontWeight: 900, fontSize: 110, color, lineHeight: 1 }}>{n}</div>
      <div>
        <div style={{ fontWeight: 900, fontSize: 54, color: C.ink }}>{titulo}</div>
        <div style={{ fontWeight: 600, fontSize: 40, color: C.dim, marginTop: 6 }}>{texto}</div>
      </div>
    </div>
  );
};

const Aprendio: React.FC = () => (
  <Stage gap={40}>
    <Words text="¿Cómo *aprendió*?" size={100} accent={C.yellow} />
    <Paso n="1" titulo="Leyó muchísimo texto" texto="adivinando la siguiente palabra, una y otra vez" color={C.blue} delay={30} />
    <Paso n="2" titulo="Lo entrenaron" texto="para ser útil, honesto e inofensivo, con ayuda de personas y una lista de principios" color={C.green} delay={110} />
    <Sfx src="pop.wav" at={30} />
    <Sfx src="pop.wav" at={110} />
  </Stage>
);

const Cierre: React.FC = () => (
  <Stage gap={40}>
    <Words text="No es magia." size={110} />
    <Words text="Es *predicción*." size={110} delay={22} accent={C.green} />
    <div style={{ height: 20 }} />
    <Sticker delay={70} bg={C.yellow} rotate={2}>
      ¿Cuál será el siguiente token?
    </Sticker>
    <Sfx src="whoosh.wav" at={66} volume={0.4} />
  </Stage>
);

const VOZ: Linea[] = [
  { id: "k1", at: 2 },
  { id: "k2", at: 100 },
  { id: "k3", at: 292 },
  { id: "k4", at: 482 },
  { id: "k5", at: 650 },
  { id: "k6", at: 808 },
  { id: "k7", at: 1058 },
];

export const ComoFuncionaClaude: React.FC = () => {
  const T = 8;
  return (
    <AbsoluteFill>
      <Bg accent={C.purple} />
      <TransitionSeries>
        <TransitionSeries.Sequence name="Gancho" durationInFrames={100}>
          <Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Tokens" durationInFrames={200}>
          <Tokens />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Atención" durationInFrames={200}>
          <Atencion />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Predicción" durationInFrames={170}>
          <Prediccion />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Repite" durationInFrames={170}>
          <Repite />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Aprendió" durationInFrames={260}>
          <Aprendio />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Cierre" durationInFrames={150}>
          <Cierre />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Handle />
      <Narracion short="claude" lineas={VOZ} />
      <Sequence layout="none" name="Música">
        <Musica src="music-explica.wav" short="claude" lineas={VOZ} />
      </Sequence>
    </AbsoluteFill>
  );
};
