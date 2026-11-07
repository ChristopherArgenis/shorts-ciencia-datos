import React from "react";
import { AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { Bg, Counter, Handle, Sfx, Stage, Sticker, Words, useIn } from "../kit/kit";
import { C, FONT } from "../kit/theme";

// Probabilidad exacta de que al menos 2 de n personas compartan cumpleaños (365 días).
const prob = (n: number) => {
  let q = 1;
  for (let k = 0; k < n; k++) q *= (365 - k) / 365;
  return 1 - q;
};

const Hook: React.FC = () => (
  <Stage>
    <Words text="¿Cuántas personas necesitas para que *2* cumplan años el *mismo* día?" size={92} stagger={1} />
    <Sticker delay={45} bg={C.coral} color={C.ink}>Pista: no son 183</Sticker>
    <Sfx src="pop.wav" at={45} />
  </Stage>
);

const Solo23: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={10}>
      <Words text="Solo" size={80} weight={800} color={C.dim} />
      <Counter
        to={23}
        start={6}
        dur={28}
        style={{ fontFamily: FONT, fontWeight: 900, fontSize: 380, color: C.yellow, lineHeight: 1 }}
      />
      <Words text="personas" size={84} delay={30} />
      <div style={{ display: "flex", flexWrap: "wrap", width: 760, justifyContent: "center", gap: 18, marginTop: 40 }}>
        {Array.from({ length: 23 }).map((_, i) => {
          const p = interpolate(frame, [6 + i * 1.2, 14 + i * 1.2], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.back(2)),
          });
          return (
            <svg key={i} width={70} height={84} viewBox="0 0 70 84" style={{ scale: p, opacity: p }}>
              <circle cx={35} cy={20} r={17} fill={i % 3 === 0 ? C.green : i % 3 === 1 ? C.blue : C.purple} />
              <path d="M8 84 Q8 44 35 44 Q62 44 62 84 Z" fill={i % 3 === 0 ? C.green : i % 3 === 1 ? C.blue : C.purple} />
            </svg>
          );
        })}
      </div>
      <Sfx src="boom.wav" at={34} volume={0.5} />
    </Stage>
  );
};

const Gauge: React.FC = () => {
  const frame = useCurrentFrame();
  const target = prob(23);
  const v = interpolate(frame, [25, 75], [0, target], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const R = 240;
  const L = 2 * Math.PI * R;
  return (
    <Stage gap={50}>
      <Words text="Y la probabilidad de que *2* coincidan ya es…" size={74} stagger={2} />
      <div style={{ position: "relative", width: 600, height: 600 }}>
        <svg width={600} height={600} viewBox="0 0 600 600">
          <circle cx={300} cy={300} r={R} fill="none" stroke={C.bg2} strokeWidth={48} />
          <circle
            cx={300}
            cy={300}
            r={R}
            fill="none"
            stroke={C.green}
            strokeWidth={48}
            strokeLinecap="round"
            strokeDasharray={L}
            strokeDashoffset={L * (1 - v)}
            transform="rotate(-90 300 300)"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 150,
            color: C.ink,
          }}
        >
          <Counter to={target * 100} start={25} dur={50} decimals={1} suffix="%" />
        </div>
      </div>
      <Sticker delay={80} bg={C.green} color={C.bg}>¡Más de la mitad!</Sticker>
      <Sfx src="ding.wav" at={76} volume={0.45} />
    </Stage>
  );
};

const Parejas: React.FC = () => {
  const frame = useCurrentFrame();
  const N = 23;
  const R = 330;
  const pts = Array.from({ length: N }).map((_, i) => {
    const a = (i / N) * Math.PI * 2 - Math.PI / 2;
    return [430 + R * Math.cos(a), 430 + R * Math.sin(a)];
  });
  const pairs: [number, number][] = [];
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) pairs.push([i, j]);
  const shown = interpolate(frame, [25, 140], [0, pairs.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  return (
    <Stage gap={20} top={260}>
      <Words text="¿Por qué tan pocas?" size={88} />
      <svg width={860} height={860} viewBox="0 0 860 860">
        {pairs.map(([i, j], k) =>
          k < shown ? (
            <line
              key={k}
              x1={pts[i][0]}
              y1={pts[i][1]}
              x2={pts[j][0]}
              y2={pts[j][1]}
              stroke={C.yellow}
              strokeOpacity={0.35}
              strokeWidth={2.5}
            />
          ) : null,
        )}
        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={20} fill={i === 0 ? C.coral : C.blue} />
        ))}
      </svg>
      <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 64, color: C.ink, marginTop: -20 }}>
        <Counter to={253} start={25} dur={115} style={{ color: C.yellow, fontWeight: 900 }} /> parejas posibles
      </div>
      <Words
        text="No es tu cumpleaños contra 22. Son *todas* las parejas."
        size={52}
        weight={800}
        delay={150}
        stagger={2}
        color={C.dim}
      />
      <Sfx src="whoosh.wav" at={25} volume={0.35} />
    </Stage>
  );
};

const Curva: React.FC = () => {
  const frame = useCurrentFrame();
  const W = 860;
  const H = 620;
  const pad = 120;
  const maxN = 70;
  const x = (n: number) => pad + ((W - pad * 1.5) * n) / maxN;
  const y = (p: number) => H - pad - (H - pad * 2) * p;
  const d = Array.from({ length: maxN + 1 })
    .map((_, n) => `${n === 0 ? "M" : "L"}${x(n).toFixed(1)},${y(prob(n)).toFixed(1)}`)
    .join(" ");
  const draw = interpolate(frame, [15, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const m1 = useIn(85);
  const m2 = useIn(125);
  const Mark: React.FC<{ n: number; p: number; label: string; color: string; up?: boolean }> = ({ n, p, label, color, up }) => (
    <g opacity={p}>
      <line x1={x(n)} y1={y(prob(n))} x2={x(n)} y2={H - pad} stroke={color} strokeDasharray="8 8" strokeWidth={3} />
      <circle cx={x(n)} cy={y(prob(n))} r={16 * p} fill={color} />
      <text
        x={x(n) + (up ? -20 : 24)}
        y={y(prob(n)) + (up ? -34 : 12)}
        fill={color}
        fontFamily={FONT}
        fontWeight={800}
        fontSize={40}
        textAnchor={up ? "end" : "start"}
      >
        {label}
      </text>
    </g>
  );
  return (
    <Stage gap={30}>
      <Words text="Probabilidad según el tamaño del grupo" size={66} stagger={2} />
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <line x1={pad} y1={H - pad} x2={W - pad / 2} y2={H - pad} stroke={C.dim} strokeWidth={3} />
        <line x1={pad} y1={pad} x2={pad} y2={H - pad} stroke={C.dim} strokeWidth={3} />
        <line x1={pad} y1={y(0.5)} x2={W - pad / 2} y2={y(0.5)} stroke={C.dim} strokeOpacity={0.35} strokeWidth={2} />
        <text x={pad - 12} y={y(1) + 12} fill={C.dim} fontFamily={FONT} fontSize={32} textAnchor="end">100%</text>
        <text x={pad - 12} y={y(0.5) + 12} fill={C.dim} fontFamily={FONT} fontSize={32} textAnchor="end">50%</text>
        <text x={W - pad / 2} y={H - 10} fill={C.dim} fontFamily={FONT} fontSize={32} textAnchor="end">personas →</text>
        <path d={d} fill="none" stroke={C.green} strokeWidth={9} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
        <Mark n={23} p={m1} label="23 → 50,7%" color={C.yellow} />
        <Mark n={57} p={m2} label="57 → 99%" color={C.coral} up />
      </svg>
      <Words text="Con *57* personas es casi seguro." size={58} delay={135} accent={C.coral} />
      <Sfx src="pop.wav" at={85} />
      <Sfx src="pop.wav" at={125} />
    </Stage>
  );
};

const Cierre: React.FC = () => (
  <Stage gap={36}>
    <Words text="Tu intuición falla." size={104} />
    <Words text="Los *datos* no." size={104} delay={22} accent={C.green} />
    <Words text="Así piensa la ciencia de datos." size={56} weight={800} delay={60} color={C.dim} />
    <div style={{ height: 30 }} />
    <Sticker delay={105} bg={C.yellow} rotate={2} size={54}>
      Entonces… ¿cuántas personas necesitas?
    </Sticker>
    <Sfx src="whoosh.wav" at={100} volume={0.4} />
  </Stage>
);

export const Cumpleanos: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  const T = 8;
  return (
    <AbsoluteFill>
      <Bg accent={C.blue} />
      <TransitionSeries>
        <TransitionSeries.Sequence name="Gancho" durationInFrames={100}>
          <Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Solo 23" durationInFrames={135}>
          <Solo23 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="50,7%" durationInFrames={135}>
          <Gauge />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="253 parejas" durationInFrames={210}>
          <Parejas />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Curva" durationInFrames={195}>
          <Curva />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Cierre" durationInFrames={165}>
          <Cierre />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Handle />
      <Audio
        name="Música"
        src={staticFile("music-curious.wav")}
        volume={(f) => 0.32 * interpolate(f, [durationInFrames - 0.8 * fps, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />
    </AbsoluteFill>
  );
};
