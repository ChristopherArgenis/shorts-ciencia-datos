import React from "react";
import { AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { Bg, Handle, Sfx, Stage, Sticker, Words, useIn } from "../kit/kit";
import { C, FONT } from "../kit/theme";

// Ejemplo didáctico de filtrado colaborativo (datos inventados para ilustrar).
type Mark = "si" | "no" | "?";
const PELIS = [
  { t: "Galaxia Roja", c1: "#ff6b5b", c2: "#7a1f3d" },
  { t: "El Código", c1: "#5b8cff", c2: "#1d2a6b" },
  { t: "Risas S.A.", c1: "#ffd166", c2: "#a3611a" },
  { t: "Marte 2", c1: "#3ddc84", c2: "#11553a" },
];
const GENTE: { n: string; m: Mark[]; color: string }[] = [
  { n: "Tú", m: ["si", "si", "no", "?"], color: C.yellow },
  { n: "Ana", m: ["si", "si", "no", "si"], color: C.green },
  { n: "Luis", m: ["no", "no", "si", "no"], color: C.coral },
];

const Heart: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M12 21s-7.5-4.6-9.6-9.2C1 8.6 3 5 6.6 5c2.1 0 3.6 1.2 4.4 2.6h2C13.8 6.2 15.3 5 17.4 5 21 5 23 8.6 21.6 11.8 19.5 16.4 12 21 12 21z" fill={color} />
  </svg>
);
const Cross: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M5 5l14 14M19 5L5 19" stroke={C.dim} strokeWidth={3.2} strokeLinecap="round" />
  </svg>
);

const CELL = 170;

/** Tabla personas × películas. `reveal` = cuántas marcas se muestran (en orden de filas). */
const Tabla: React.FC<{ revealStart?: number; dimRow?: number; highlightRow?: number; recomendado?: number }> = ({
  revealStart = -999,
  highlightRow,
  dimRow,
  recomendado = -1,
}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, fontFamily: FONT }}>
      <div style={{ display: "flex", gap: 14, paddingLeft: 170 }}>
        {PELIS.map((p) => (
          <div
            key={p.t}
            style={{
              width: CELL,
              height: 230,
              borderRadius: 18,
              background: `linear-gradient(160deg, ${p.c1}, ${p.c2})`,
              display: "flex",
              alignItems: "flex-end",
              padding: 14,
              color: "#fff",
              fontWeight: 900,
              fontSize: 30,
              lineHeight: 1.05,
              boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
            }}
          >
            {p.t}
          </div>
        ))}
      </div>
      {GENTE.map((g, r) => (
        <div
          key={g.n}
          style={{
            display: "flex",
            gap: 14,
            alignItems: "center",
            borderRadius: 24,
            padding: "6px 0",
            background: highlightRow === r ? `${g.color}26` : "transparent",
            outline: highlightRow === r ? `4px solid ${g.color}` : "none",
            opacity: dimRow === r ? 0.35 : 1,
          }}
        >
          <div style={{ width: 156, fontWeight: 900, fontSize: 52, color: g.color, textAlign: "right", paddingRight: 14 }}>{g.n}</div>
          {g.m.map((m, c) => {
            const idx = r * 4 + c;
            const p = interpolate(frame, [revealStart + idx * 6, revealStart + idx * 6 + 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.back(2.5)),
            });
            const isRec = r === 0 && c === 3 && recomendado >= 0;
            const rp = isRec ? interpolate(frame, [recomendado, recomendado + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(3)) }) : 0;
            return (
              <div
                key={c}
                style={{
                  width: CELL,
                  height: 120,
                  borderRadius: 18,
                  background: isRec && rp > 0 ? `${C.green}33` : C.bg2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ scale: isRec && rp > 0 ? rp : p, opacity: isRec && rp > 0 ? 1 : p }}>
                  {isRec && rp > 0 ? (
                    <Heart size={86} color={C.green} />
                  ) : m === "si" ? (
                    <Heart size={76} color={C.coral} />
                  ) : m === "no" ? (
                    <Cross size={62} />
                  ) : (
                    <span style={{ fontWeight: 900, fontSize: 80, color: C.yellow }}>?</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const Hook: React.FC = () => (
  <Stage gap={60}>
    <Words text="¿Cómo sabe *Netflix* qué vas a ver?" size={104} stagger={1} accent={C.coral} />
    <Sticker delay={42} bg={C.yellow}>No adivina. Te compara.</Sticker>
    <Sfx src="pop.wav" at={42} />
  </Stage>
);

const Datos: React.FC = () => (
  <Stage gap={50}>
    <Words text="3 personas, 4 películas" size={84} />
    <Tabla revealStart={20} />
    {Array.from({ length: 12 }).map((_, i) => (
      <Sfx key={i} src="tick.wav" at={20 + i * 6} volume={0.35} />
    ))}
  </Stage>
);

const Meter: React.FC<{ name: string; same: number; color: string; delay: number }> = ({ name, same, color, delay }) => {
  const frame = useCurrentFrame();
  const w = interpolate(frame, [delay, delay + 30], [0, same / 3], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  return (
    <div style={{ width: 860, fontFamily: FONT }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: 52, color: C.ink }}>
        <span style={{ color }}>Tú vs {name}</span>
        <span>{same} de 3 iguales</span>
      </div>
      <div style={{ height: 46, borderRadius: 23, background: C.bg2, marginTop: 8, overflow: "hidden" }}>
        <div style={{ width: `${w * 100}%`, height: "100%", background: color, borderRadius: 23 }} />
      </div>
    </div>
  );
};

const Parecido: React.FC = () => (
  <Stage gap={44}>
    <Words text="¿A quién te *pareces*?" size={92} />
    <div style={{ scale: 0.82, margin: "-60px 0" }}>
      <Tabla />
    </div>
    <Meter name="Ana" same={3} color={C.green} delay={40} />
    <Meter name="Luis" same={0} color={C.coral} delay={60} />
    <Sfx src="whoosh.wav" at={40} volume={0.3} />
  </Stage>
);

const Recomienda: React.FC = () => {
  const s = useIn(70, 10);
  return (
    <Stage gap={44}>
      <Words text="A Ana le encantó *Marte* *2*…" size={84} accent={C.green} />
      <Tabla highlightRow={1} dimRow={2} recomendado={45} />
      <div style={{ scale: s, opacity: s }}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 50,
            color: C.bg,
            whiteSpace: "nowrap",
            background: C.green,
            padding: "18px 40px",
            borderRadius: 24,
          }}
        >
          Recomendado para ti: Marte 2
        </div>
      </div>
      <Sfx src="ding.wav" at={45} volume={0.45} />
    </Stage>
  );
};

const Nombre: React.FC = () => (
  <Stage gap={50}>
    <Words text="Esto se llama" size={70} weight={800} color={C.dim} />
    <Words text="*filtrado* *colaborativo*" size={110} delay={8} accent={C.green} />
    <Words text="Las plataformas lo hacen con millones de personas, no con 3." size={60} weight={800} delay={50} stagger={2} />
  </Stage>
);

const Cierre: React.FC = () => (
  <Stage gap={50}>
    <Words text="Tu próxima serie la eligió alguien que *ni* *conoces*." size={96} stagger={2} accent={C.yellow} />
    <div style={{ height: 20 }} />
    <Sticker delay={85} bg={C.coral} color={C.ink} rotate={2}>…¿y cómo lo supo Netflix?</Sticker>
    <Sfx src="whoosh.wav" at={80} volume={0.4} />
  </Stage>
);

export const Recomendador: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  const T = 8;
  return (
    <AbsoluteFill>
      <Bg accent={C.coral} />
      <TransitionSeries>
        <TransitionSeries.Sequence name="Gancho" durationInFrames={100}>
          <Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Datos" durationInFrames={180}>
          <Datos />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Parecido" durationInFrames={180}>
          <Parecido />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Recomienda" durationInFrames={165}>
          <Recomienda />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Nombre" durationInFrames={165}>
          <Nombre />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Cierre" durationInFrames={150}>
          <Cierre />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Handle />
      <Audio
        name="Música"
        src={staticFile("music-chill.wav")}
        volume={(f) => 0.32 * interpolate(f, [durationInFrames - 0.8 * fps, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
      />
    </AbsoluteFill>
  );
};
