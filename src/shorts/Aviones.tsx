import React from "react";
import { AbsoluteFill, Easing, interpolate, Sequence, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { Narracion, Musica, type Linea } from "../kit/voz";
import { Bg, Handle, Sfx, Stage, Sticker, Words } from "../kit/kit";
import { C, MONO } from "../kit/theme";

// Historia real: Abraham Wald (Statistical Research Group, 1943) y los aviones que regresaban.
// La distribución de impactos del dibujo es ilustrativa.

const ROJO = C.coral;
const VERDE = C.green;
const MOTORES = [170, 300, 600, 730];

// Impactos en alas (lejos de los motores), fuselaje central y cola. Semilla fija.
const IMPACTOS: [number, number][] = (() => {
  let seed = 3;
  const r = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const pts: [number, number][] = [];
  while (pts.length < 64) {
    const zona = r();
    let x: number;
    let y: number;
    if (zona < 0.5) {
      x = 40 + r() * 820;
      y = 330 + r() * 60;
      if (MOTORES.some((m) => Math.abs(m - x) < 45) || Math.abs(x - 450) < 40) continue;
    } else if (zona < 0.8) {
      x = 432 + r() * 36;
      y = 200 + r() * 420;
      if (y > 300 && y < 410) continue;
    } else {
      x = 310 + r() * 280;
      y = 668 + r() * 26;
      if (Math.abs(x - 450) < 30) continue;
    }
    pts.push([x, y]);
  }
  return pts;
})();

/** Bombardero genérico visto desde arriba. */
const Avion: React.FC<{
  impactos?: number; // 0..1 cuántos impactos se ven
  motoresBrillan?: number; // 0..1
  alasTachadas?: number; // 0..1
  width?: number;
}> = ({ impactos = 0, motoresBrillan = 0, alasTachadas = 0, width = 780 }) => (
  <svg width={width} height={(width * 800) / 900} viewBox="0 0 900 800">
    {/* alas */}
    <path d="M450 290 L30 345 Q15 370 30 395 L450 410 L870 395 Q885 370 870 345 Z" fill="#8c95b8" />
    {/* cola */}
    <path d="M450 650 L300 670 Q292 682 300 694 L450 705 L600 694 Q608 682 600 670 Z" fill="#8c95b8" />
    {/* fuselaje */}
    <rect x="420" y="60" width="60" height="690" rx="30" fill="#a7b0d1" />
    {/* cabina */}
    <ellipse cx="450" cy="115" rx="22" ry="38" fill="#2a3266" />
    {/* motores */}
    {MOTORES.map((x) => (
      <g key={x}>
        <ellipse
          cx={x}
          cy={340}
          rx={44 + 18 * motoresBrillan}
          ry={78 + 18 * motoresBrillan}
          fill={VERDE}
          opacity={0.35 * motoresBrillan}
        />
        <ellipse cx={x} cy={340} rx={26} ry={58} fill="#5d6690" stroke={motoresBrillan > 0 ? VERDE : "none"} strokeWidth={6 * motoresBrillan} />
        <rect x={x - 30} y={278} width={60} height={8} rx={4} fill="#3a4170" />
      </g>
    ))}
    {/* impactos */}
    {IMPACTOS.map(([x, y], i) => {
      const p = interpolate(impactos * IMPACTOS.length - i, [0, 1], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      return <circle key={i} cx={x} cy={y} r={9 * p} fill={ROJO} />;
    })}
    {/* tachado de "blindar aquí" */}
    {alasTachadas > 0 ? (
      <g opacity={alasTachadas} stroke={ROJO} strokeWidth={14} strokeLinecap="round">
        <line x1="120" y1="300" x2="360" y2="440" />
        <line x1="360" y1="300" x2="120" y2="440" />
        <line x1="540" y1="300" x2="780" y2="440" />
        <line x1="780" y1="300" x2="540" y2="440" />
      </g>
    ) : null}
  </svg>
);

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={40}>
      <Words text="¿Dónde *blindarías* este avión?" size={100} stagger={1} />
      <Avion impactos={interpolate(frame, [10, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
      <Sticker delay={60} bg={C.yellow}>Piénsalo 2 segundos</Sticker>
      <Sfx src="pop.wav" at={60} />
    </Stage>
  );
};

const Datos: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={40}>
      <Words text="Segunda Guerra Mundial" size={60} weight={800} color={C.dim} />
      <Words text="Los aviones que *volvían* tenían impactos aquí" size={80} delay={6} stagger={2} accent={C.coral} />
      <Avion impactos={interpolate(frame, [20, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
      {Array.from({ length: 8 }).map((_, i) => (
        <Sfx key={i} src="tick.wav" at={20 + i * 9} volume={0.3} />
      ))}
    </Stage>
  );
};

const Obvio: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={40}>
      <Words text="La idea obvia: blindar donde hay *más* *agujeros*." size={80} stagger={2} accent={C.coral} />
      <Avion impactos={1} alasTachadas={interpolate(frame, [70, 85], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
      <Sfx src="boom.wav" at={70} volume={0.45} />
    </Stage>
  );
};

const Wald: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={40}>
      <Words text="El matemático Abraham Wald dijo:" size={64} weight={800} color={C.dim} />
      <Words text="*al* *revés*." size={150} delay={20} accent={C.green} />
      <Avion
        impactos={1}
        motoresBrillan={interpolate(frame, [45, 75], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        })}
      />
      <Words text="Blinda donde *no* hay impactos." size={66} delay={80} accent={C.green} />
      <Sfx src="ding.wav" at={45} volume={0.45} />
    </Stage>
  );
};

/** Avión pequeño que cae y desaparece si recibió impacto en un motor. */
const Mini: React.FC<{ cae: boolean; delay: number }> = ({ cae, delay }) => {
  const frame = useCurrentFrame();
  const p = cae
    ? interpolate(frame, [delay, delay + 45], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.in(Easing.quad),
      })
    : 0;
  return (
    <div style={{ position: "relative", opacity: 1 - p, translate: `0px ${p * 380}px`, rotate: `${p * 35}deg` }}>
      <svg width={300} height={267} viewBox="0 0 900 800">
        <path d="M450 290 L30 345 Q15 370 30 395 L450 410 L870 395 Q885 370 870 345 Z" fill="#8c95b8" />
        <path d="M450 650 L300 670 Q292 682 300 694 L450 705 L600 694 Q608 682 600 670 Z" fill="#8c95b8" />
        <rect x="420" y="60" width="60" height="690" rx="30" fill="#a7b0d1" />
        {MOTORES.map((x) => (
          <ellipse key={x} cx={x} cy={340} rx={26} ry={58} fill="#5d6690" />
        ))}
        {cae ? <circle cx={300} cy={340} r={40} fill={ROJO} /> : <circle cx={150} cy={380} r={22} fill={ROJO} />}
      </svg>
    </div>
  );
};

const NoVolvieron: React.FC = () => (
  <Stage gap={50}>
    <Words text="Los que recibían impactos en los *motores*…" size={80} stagger={2} accent={C.coral} />
    <div style={{ display: "flex", gap: 10, height: 600, alignItems: "flex-start" }}>
      <Mini cae delay={40} />
      <Mini cae={false} delay={0} />
      <Mini cae delay={55} />
    </div>
    <Words text="…nunca *volvieron*." size={100} delay={75} accent={C.coral} />
    <Sfx src="whoosh.wav" at={40} volume={0.4} />
  </Stage>
);

const Cierre: React.FC = () => (
  <Stage gap={40}>
    <Words text="Se llama" size={70} weight={800} color={C.dim} />
    <Words text="*sesgo* *del* *superviviente*" size={110} delay={6} accent={C.yellow} />
    <Words text="Los datos que *faltan* también hablan." size={66} weight={800} delay={50} accent={C.green} />
    <div style={{ height: 20 }} />
    <Sticker delay={100} bg={C.coral} color={C.ink} rotate={2}>
      ¿Y ahora dónde lo blindarías?
    </Sticker>
    <Sfx src="pop.wav" at={100} />
  </Stage>
);

const Fuente: React.FC = () => (
  <div
    style={{
      position: "absolute",
      bottom: 330,
      left: 0,
      right: 0,
      textAlign: "center",
      fontFamily: MONO,
      fontSize: 28,
      color: C.dim,
      opacity: 0.8,
    }}
  >
    Basado en el trabajo de Abraham Wald (1943) · ilustración simplificada
  </div>
);

const VOZ: Linea[] = [
  { id: "a1", at: 2 },
  { id: "a2", at: 104 },
  { id: "a3", at: 258 },
  { id: "a4", at: 385 },
  { id: "a5", at: 545 },
  { id: "a6", at: 700 },
];

export const Aviones: React.FC = () => {
  const T = 8;
  return (
    <AbsoluteFill>
      <Bg accent={C.blue} />
      <TransitionSeries>
        <TransitionSeries.Sequence name="Gancho" durationInFrames={105}>
          <Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Datos" durationInFrames={165}>
          <Datos />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Obvio" durationInFrames={135}>
          <Obvio />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Wald" durationInFrames={165}>
          <Wald />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="No volvieron" durationInFrames={165}>
          <NoVolvieron />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Cierre" durationInFrames={165}>
          <Cierre />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Handle />
      <Sequence from={381} name="Fuente" layout="none">
        <Fuente />
      </Sequence>
      <Narracion short="aviones" lineas={VOZ} />
      <Musica src="music-tension.wav" short="aviones" lineas={VOZ} />
    </AbsoluteFill>
  );
};
