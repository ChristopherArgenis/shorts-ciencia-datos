import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { Narracion, Musica, type Linea } from "../kit/voz";
import { Bg, Counter, Handle, Sfx, Stage, Sticker, Words } from "../kit/kit";
import { C, FONT, MONO } from "../kit/theme";

// Datos reales: Charig et al., BMJ 1986 (tratamiento de cálculos renales).
// A = cirugía abierta, B = nefrolitotomía percutánea.

const Bar: React.FC<{ label: string; ok: number; total: number; color: string; win: boolean; delay: number }> = ({
  label,
  ok,
  total,
  color,
  win,
  delay,
}) => {
  const frame = useCurrentFrame();
  const pct = (ok / total) * 100;
  const w = interpolate(frame, [delay, delay + 35], [0, pct], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <div style={{ width: 880, fontFamily: FONT }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", color: C.ink }}>
        <span style={{ fontWeight: 900, fontSize: 64 }}>{label}</span>
        <span style={{ fontWeight: 900, fontSize: 88, color: win ? C.green : C.ink }}>
          <Counter to={pct} start={delay} dur={35} suffix="%" />
        </span>
      </div>
      <div style={{ height: 64, borderRadius: 32, background: C.bg2, overflow: "hidden", marginTop: 8 }}>
        <div style={{ width: `${w}%`, height: "100%", borderRadius: 32, background: color }} />
      </div>
      <div style={{ fontFamily: MONO, fontSize: 36, color: C.dim, marginTop: 10 }}>
        {ok} de {total} pacientes curados
      </div>
    </div>
  );
};

const Hook: React.FC = () => (
  <Stage gap={60}>
    <Words text="Este tratamiento gana en *todos* los grupos…" size={96} stagger={1} />
    <Words text="…y *pierde* en el total." size={96} delay={38} accent={C.coral} />
    <Sfx src="boom.wav" at={40} volume={0.5} />
  </Stage>
);

const Total: React.FC = () => (
  <Stage gap={44}>
    <Words text="Cálculos renales · 700 pacientes" size={48} weight={800} color={C.dim} />
    <Words text="Resultado *total*" size={100} />
    <Bar label="Tratamiento A" ok={273} total={350} color={C.purple} win={false} delay={20} />
    <Bar label="Tratamiento B" ok={289} total={350} color={C.blue} win delay={30} />
    <Sticker delay={95} bg={C.blue} color={C.ink}>B parece mejor</Sticker>
    <Sfx src="pop.wav" at={95} />
  </Stage>
);

const Grupo: React.FC<{ titulo: string; a: [number, number]; b: [number, number]; sticker: string }> = ({ titulo, a, b, sticker }) => (
  <Stage gap={44}>
    <Words text={titulo} size={100} />
    <Bar label="Tratamiento A" ok={a[0]} total={a[1]} color={C.purple} win delay={15} />
    <Bar label="Tratamiento B" ok={b[0]} total={b[1]} color={C.blue} win={false} delay={25} />
    <Sticker delay={85} bg={C.green} color={C.bg}>{sticker}</Sticker>
    <Sfx src="ding.wav" at={85} volume={0.4} />
  </Stage>
);

const Stack: React.FC<{ label: string; grandes: number; peque: number; delay: number }> = ({ label, grandes, peque, delay }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <div style={{ width: 880, fontFamily: FONT }}>
      <div style={{ fontWeight: 900, fontSize: 60, color: C.ink, marginBottom: 10 }}>{label}</div>
      <div style={{ display: "flex", height: 90, borderRadius: 24, overflow: "hidden", background: C.bg2 }}>
        <div
          style={{
            width: `${(grandes / 350) * 100 * p}%`,
            background: C.coral,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: 40,
            color: C.bg,
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {grandes}
        </div>
        <div
          style={{
            width: `${(peque / 350) * 100 * p}%`,
            background: C.green,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: 40,
            color: C.bg,
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {peque}
        </div>
      </div>
    </div>
  );
};

const Por: React.FC = () => (
  <Stage gap={50}>
    <Words text="¿Cómo puede ser?" size={100} />
    <div style={{ display: "flex", gap: 40, fontFamily: FONT, fontWeight: 800, fontSize: 44, color: C.ink }}>
      <span><span style={{ color: C.coral }}>■</span> piedras grandes</span>
      <span><span style={{ color: C.green }}>■</span> pequeñas</span>
    </div>
    <Stack label="Pacientes de A" grandes={263} peque={87} delay={20} />
    <Stack label="Pacientes de B" grandes={80} peque={270} delay={35} />
    <Words text="A se llevó los casos *difíciles*." size={72} delay={100} accent={C.coral} />
    <Sfx src="whoosh.wav" at={20} volume={0.35} />
  </Stage>
);

const Cierre: React.FC = () => (
  <Stage gap={40}>
    <Words text="Se llama" size={70} weight={800} color={C.dim} />
    <Words text="*Paradoja* *de* *Simpson*" size={112} delay={8} accent={C.yellow} />
    <Words
      text="Antes de creerle a un promedio, pregunta cómo se *agruparon* los datos."
      size={58}
      weight={800}
      delay={45}
      stagger={2}
      accent={C.green}
    />
    <div style={{ height: 20 }} />
    <Sticker delay={115} bg={C.yellow} rotate={2}>Entonces… ¿cuál es mejor?</Sticker>
    <Sfx src="pop.wav" at={115} />
  </Stage>
);

const Fuente: React.FC = () => (
  <div
    style={{
      position: "absolute",
      bottom: 380,
      left: 0,
      right: 0,
      textAlign: "center",
      fontFamily: MONO,
      fontSize: 28,
      color: C.dim,
      opacity: 0.8,
    }}
  >
    Datos: Charig et al., BMJ (1986)
  </div>
);

const VOZ: Linea[] = [{ id: "s1", at: 2 }, { id: "s2", at: 197 }, { id: "s3", at: 330 }, { id: "s4", at: 480 }, { id: "s5", at: 643 }, { id: "s6", at: 733 }];

export const Simpson: React.FC = () => {

  const T = 8;
  return (
    <AbsoluteFill>
      <Bg accent={C.purple} />
      <TransitionSeries>
        <TransitionSeries.Sequence name="Gancho" durationInFrames={110}>
          <Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Total" durationInFrames={165}>
          <Total />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Pequeñas" durationInFrames={150}>
          <Grupo titulo="Piedras *pequeñas*" a={[81, 87]} b={[234, 270]} sticker="Gana A" />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Grandes" durationInFrames={150}>
          <Grupo titulo="Piedras *grandes*" a={[192, 263]} b={[55, 80]} sticker="Gana A otra vez" />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Por qué" durationInFrames={195}>
          <Por />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Cierre" durationInFrames={180}>
          <Cierre />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Handle />
      <Fuente />
      <Narracion short="simpson" lineas={VOZ} />
      <Musica src="music-tension.wav" short="simpson" lineas={VOZ} />
    </AbsoluteFill>
  );
};
