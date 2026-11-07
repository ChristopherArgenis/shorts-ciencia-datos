import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { Narracion, Musica, type Linea } from "../kit/voz";
import { Bg, Counter, Handle, Sfx, Stage, Sticker, Words, useIn } from "../kit/kit";
import { C, FONT, MONO } from "../kit/theme";

// Dato real: ~300 sensores y ~1,1 millones de datos por segundo por auto (AWS / Fórmula 1).
// El undercut se muestra con un ejemplo simplificado (números ilustrativos).

const AZUL = C.blue; // auto A
const ROJO = C.coral; // auto B

/** Auto de F1 visto desde arriba (genérico, sin marcas). */
const Auto: React.FC<{ color: string; width?: number; label?: string }> = ({ color, width = 520, label }) => (
  <svg width={width} height={width * 0.42} viewBox="0 0 500 210">
    <rect x="20" y="20" width="60" height="170" rx="8" fill={color} opacity={0.85} />
    <rect x="430" y="35" width="40" height="140" rx="8" fill={color} opacity={0.85} />
    <rect x="95" y="10" width="70" height="40" rx="10" fill="#111" />
    <rect x="95" y="160" width="70" height="40" rx="10" fill="#111" />
    <rect x="340" y="18" width="62" height="34" rx="10" fill="#111" />
    <rect x="340" y="158" width="62" height="34" rx="10" fill="#111" />
    <path d="M70 80 Q120 60 200 70 L420 92 Q450 105 420 118 L200 140 Q120 150 70 130 Z" fill={color} />
    <ellipse cx="250" cy="105" rx="34" ry="20" fill="#0b1020" />
    {label ? (
      <text x="150" y="116" fontFamily={FONT} fontWeight={900} fontSize={34} fill="#fff" textAnchor="middle">
        {label}
      </text>
    ) : null}
  </svg>
);

const Hook: React.FC = () => (
  <Stage gap={50}>
    <Words text="Este piloto entró a boxes *primero*…" size={96} stagger={1} />
    <Words text="…y por eso *ganó*." size={110} delay={40} accent={C.green} />
    <Sfx src="boom.wav" at={42} volume={0.5} />
  </Stage>
);

const Sensores: React.FC = () => {
  const frame = useCurrentFrame();
  // Puntos de "sensores" en posiciones fijas (semilla determinista).
  let seed = 11;
  const r = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const puntos = Array.from({ length: 70 }).map(() => [90 + r() * 330, 72 + r() * 66]);
  return (
    <Stage gap={30}>
      <Words text="Cada auto lleva unos" size={70} weight={800} color={C.dim} />
      <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 230, color: C.yellow, lineHeight: 1 }}>
        <Counter to={300} start={8} dur={45} />
      </div>
      <Words text="sensores" size={92} delay={20} />
      <div style={{ position: "relative" }}>
        <Auto color={AZUL} width={860} />
        <svg width={860} height={361} viewBox="0 0 500 210" style={{ position: "absolute", left: 0, top: 0 }}>
          {puntos.map(([x, y], i) => {
            const p = interpolate(frame, [8 + i * 0.6, 14 + i * 0.6], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const pulse = 0.6 + 0.4 * Math.sin((frame + i * 7) / 5);
            return <circle key={i} cx={x} cy={y} r={3.2 * p} fill={C.green} opacity={p * pulse} />;
          })}
        </svg>
      </div>
      <Words text="≈ *1,1* *millones* de datos por segundo" size={60} weight={800} delay={70} stagger={2} accent={C.green} />
      <div style={{ fontFamily: MONO, fontSize: 28, color: C.dim }}>Fuente: AWS / Fórmula 1</div>
      <Sfx src="whoosh.wav" at={8} volume={0.35} />
    </Stage>
  );
};

/** Pista vista de lado: dos autos y la distancia entre ellos. */
const Pista: React.FC<{ gap: number }> = ({ gap }) => {
  const sep = Math.min(Math.abs(gap) * 180, 420);
  const centro = 430;
  const xA = gap >= 0 ? centro + sep / 2 : centro - sep / 2;
  const xB = gap >= 0 ? centro - sep / 2 : centro + sep / 2;
  const lider = gap >= 0 ? "A" : "B";
  return (
    <div style={{ position: "relative", width: 860, height: 330 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 110, height: 210, borderRadius: 20, background: "#20284f" }} />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 213,
          height: 4,
          backgroundImage: `repeating-linear-gradient(90deg, ${C.dim} 0 40px, transparent 40px 80px)`,
          opacity: 0.5,
        }}
      />
      <div style={{ position: "absolute", left: xA - 110, top: 122 }}>
        <Auto color={AZUL} width={220} label="A" />
      </div>
      <div style={{ position: "absolute", left: xB - 110, top: 222 }}>
        <Auto color={ROJO} width={220} label="B" />
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 10,
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 64,
          color: lider === "A" ? AZUL : ROJO,
        }}
      >
        {Math.abs(gap) < 0.05 ? "¡Empatados!" : `${lider} adelante por ${Math.abs(gap).toFixed(1).replace(".", ",")} s`}
      </div>
    </div>
  );
};

const Situacion: React.FC = () => (
  <Stage gap={50}>
    <Words text="Vuelta 20. Llantas *gastadas*." size={84} accent={C.coral} />
    <Pista gap={1.5} />
    <Words text="B no logra rebasar en la pista…" size={62} weight={800} delay={50} color={C.dim} />
  </Stage>
);

const Undercut: React.FC = () => {
  const frame = useCurrentFrame();
  // Ventaja de A: 1,5 s → 0 → -1,5 s (B gana 1,5 s por vuelta con llantas nuevas).
  const gap = interpolate(frame, [40, 100, 110, 170], [1.5, 0, 0, -1.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const vuelta = frame < 40 ? 20 : frame < 105 ? 21 : 22;
  const sA = useIn(175, 10);
  return (
    <Stage gap={34}>
      <Words text="…así que entra a boxes *antes*." size={80} accent={C.coral} />
      <div style={{ display: "flex", gap: 24, fontFamily: FONT, fontWeight: 800, fontSize: 44, color: C.ink }}>
        <span style={{ background: C.bg2, padding: "10px 24px", borderRadius: 16 }}>Vuelta {vuelta}</span>
        <span style={{ background: `${C.green}33`, color: C.green, padding: "10px 24px", borderRadius: 16 }}>B: llantas nuevas</span>
      </div>
      <Pista gap={gap} />
      <Words text="−1,5 s por vuelta" size={70} delay={40} color={C.green} />
      <div style={{ opacity: sA }}>
        <Sticker delay={175} bg={AZUL} color={C.ink}>
          A entra a boxes… y sale detrás
        </Sticker>
      </div>
      <div style={{ fontFamily: MONO, fontSize: 28, color: C.dim, textAlign: "center" }}>
        Ejemplo simplificado · el tiempo en boxes lo pagan los dos
      </div>
      <Sfx src="whoosh.wav" at={40} volume={0.35} />
      <Sfx src="ding.wav" at={175} volume={0.4} />
    </Stage>
  );
};

const Simulacion: React.FC = () => {
  const frame = useCurrentFrame();
  let seed = 5;
  const r = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const W = 860;
  const H = 520;
  const lineas = Array.from({ length: 40 }).map((_, i) => {
    let y = H / 2;
    const pts: string[] = [];
    for (let x = 0; x <= 20; x++) {
      y += (r() - 0.5) * 60;
      y = Math.max(20, Math.min(H - 20, y));
      pts.push(`${x === 0 ? "M" : "L"}${((x / 20) * W).toFixed(1)},${y.toFixed(1)}`);
    }
    return { d: pts.join(" "), best: i === 17 };
  });
  const draw = interpolate(frame, [10, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const best = interpolate(frame, [85, 100], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Stage gap={40}>
      <Words text="Los equipos *simulan* la carrera una y otra vez…" size={76} stagger={2} accent={C.yellow} />
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {lineas.map((l, i) => (
          <path
            key={i}
            d={l.d}
            fill="none"
            stroke={l.best ? C.green : C.dim}
            strokeOpacity={l.best ? best : 0.25}
            strokeWidth={l.best ? 8 : 3}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - draw}
          />
        ))}
      </svg>
      <Words text="…para elegir la vuelta *exacta*." size={76} delay={90} accent={C.green} />
      <Sfx src="pop.wav" at={90} />
    </Stage>
  );
};

const Cierre: React.FC = () => (
  <Stage gap={40}>
    <Words text="Se llama *undercut*." size={110} accent={C.coral} />
    <Words text="Y se decide con *datos*." size={96} delay={30} accent={C.green} />
    <div style={{ height: 20 }} />
    <Sticker delay={95} bg={C.yellow} rotate={2}>
      ¿Tú habrías entrado antes?
    </Sticker>
    <Sfx src="whoosh.wav" at={92} volume={0.4} />
  </Stage>
);

const VOZ: Linea[] = [
  { id: "f1", at: 2 },
  { id: "f2", at: 102 },
  { id: "f3", at: 440 },
  { id: "f4", at: 568 },
  { id: "f5", at: 772 },
];

export const F1: React.FC = () => {
  const T = 8;
  return (
    <AbsoluteFill>
      <Bg accent={C.coral} />
      <TransitionSeries>
        <TransitionSeries.Sequence name="Gancho" durationInFrames={105}>
          <Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Sensores" durationInFrames={165}>
          <Sensores />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Situación" durationInFrames={150}>
          <Situacion />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Undercut" durationInFrames={240}>
          <Undercut />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Simulación" durationInFrames={150}>
          <Simulacion />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Cierre" durationInFrames={165}>
          <Cierre />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Handle />
      <Narracion short="f1" lineas={VOZ} />
      <Musica src="music-tension.wav" short="f1" lineas={VOZ} />
    </AbsoluteFill>
  );
};
