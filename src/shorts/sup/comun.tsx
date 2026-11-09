import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { C, FONT } from "../../kit/theme";

export const NAR = "#ff9f43";

/** Número grande que cuenta hasta `valor`. */
export const Grande: React.FC<{
  valor: number;
  dec?: number;
  pre?: string;
  suf?: string;
  color?: string;
  size?: number;
  delay?: number;
}> = ({
  valor,
  dec = 0,
  pre = "",
  suf = "",
  color = NAR,
  size = 180,
  delay = 10,
}) => {
  const f = useCurrentFrame();
  const v = interpolate(f, [delay, delay + 40], [0, valor], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: size,
        color,
        lineHeight: 1,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {pre}
      {v.toLocaleString("es-MX", {
        minimumFractionDigits: dec,
        maximumFractionDigits: dec,
      })}
      {suf}
    </div>
  );
};

export const Sub: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = C.dim,
}) => (
  <div
    style={{
      fontFamily: FONT,
      fontWeight: 800,
      fontSize: 48,
      color,
      textAlign: "center",
    }}
  >
    {children}
  </div>
);
