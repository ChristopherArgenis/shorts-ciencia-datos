import React from "react";
import { interpolate, Sequence, staticFile, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import duraciones from "../voz-duraciones.json";

export type Linea = { id: string; at: number };
type Short = keyof typeof duraciones;

const dur = (short: Short, id: string) => (duraciones[short] as Record<string, number>)[id] ?? 0;

/** Frases de Alex colocadas en frames absolutos del Short. */
export const Narracion: React.FC<{ short: Short; lineas: Linea[] }> = ({ short, lineas }) => (
  <>
    {lineas.map((l) => (
      <Sequence key={l.id} from={l.at} layout="none" name={`Voz ${l.id}`}>
        <Audio src={staticFile(`voz/${short}/${l.id}.wav`)} volume={1} />
      </Sequence>
    ))}
  </>
);

/** Música que baja mientras habla Alex y se desvanece al final. */
export const Musica: React.FC<{ src: string; short: Short; lineas: Linea[]; alto?: number; bajo?: number }> = ({
  src,
  short,
  lineas,
  alto = 0.3,
  bajo = 0.1,
}) => {
  const { fps, durationInFrames } = useVideoConfig();
  return (
    <Audio
      name="Música"
      src={staticFile(src)}
      volume={(f) => {
        let v = alto;
        for (const l of lineas) {
          const a = l.at;
          const b = l.at + dur(short, l.id) * fps;
          const k = interpolate(f, [a - 6, a, b, b + 10], [0, 1, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          v = Math.min(v, alto - (alto - bajo) * k);
        }
        const fin = interpolate(f, [durationInFrames - 0.8 * fps, durationInFrames], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return v * fin;
      }}
    />
  );
};
