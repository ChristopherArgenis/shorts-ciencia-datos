import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONT, HANDLE, MONO } from "../kit/theme";

// Miniaturas verticales 1080×1920 para los Shorts.
// Regla: máximo 3 palabras, distintas al título, legibles al tamaño del feed.

const Fondo: React.FC<{ accent: string; children: React.ReactNode }> = ({ accent, children }) => (
  <AbsoluteFill style={{ backgroundColor: C.bg, overflow: "hidden" }}>
    <AbsoluteFill style={{ background: `radial-gradient(ellipse 900px 1100px at 50% 45%, ${accent}55, transparent 70%)` }} />
    <AbsoluteFill
      style={{
        backgroundImage: `radial-gradient(${C.dim}30 2.5px, transparent 2.5px)`,
        backgroundSize: "54px 54px",
        opacity: 0.7,
      }}
    />
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 50,
        padding: "200px 70px",
      }}
    >
      {children}
    </AbsoluteFill>
    <div style={{ position: "absolute", top: 120, left: 0, right: 0, textAlign: "center", fontFamily: MONO, fontSize: 36, color: C.dim }}>
      {HANDLE}
    </div>
  </AbsoluteFill>
);

/** Texto grande con contorno para que se lea a tamaño pequeño. */
const Grande: React.FC<{ children: React.ReactNode; size?: number; color?: string; rotate?: number }> = ({
  children,
  size = 200,
  color = C.ink,
  rotate = 0,
}) => (
  <div
    style={{
      fontFamily: FONT,
      fontWeight: 900,
      fontSize: size,
      lineHeight: 0.95,
      color,
      textAlign: "center",
      letterSpacing: -4,
      rotate: `${rotate}deg`,
      textShadow: "0 10px 0 rgba(0,0,0,0.35), 0 0 60px rgba(0,0,0,0.6)",
      WebkitTextStroke: "6px #0b1020",
      paintOrder: "stroke fill",
    }}
  >
    {children}
  </div>
);

const Chip: React.FC<{ children: React.ReactNode; color: string; size?: number }> = ({ children, color, size = 64 }) => (
  <div
    style={{
      fontFamily: MONO,
      fontWeight: 700,
      fontSize: size,
      color: C.ink,
      background: `${color}33`,
      border: `4px solid ${color}`,
      borderRadius: 20,
      padding: "10px 24px",
    }}
  >
    {children}
  </div>
);

const Persona: React.FC<{ color: string }> = ({ color }) => (
  <svg width={110} height={132} viewBox="0 0 70 84">
    <circle cx={35} cy={20} r={17} fill={color} />
    <path d="M8 84 Q8 44 35 44 Q62 44 62 84 Z" fill={color} />
  </svg>
);

const Heart: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M12 21s-7.5-4.6-9.6-9.2C1 8.6 3 5 6.6 5c2.1 0 3.6 1.2 4.4 2.6h2C13.8 6.2 15.3 5 17.4 5 21 5 23 8.6 21.6 11.8 19.5 16.4 12 21 12 21z" fill={color} />
  </svg>
);

const Auto: React.FC<{ color: string; width: number; label: string }> = ({ color, width, label }) => (
  <svg width={width} height={width * 0.42} viewBox="0 0 500 210">
    <rect x="20" y="20" width="60" height="170" rx="8" fill={color} opacity={0.85} />
    <rect x="430" y="35" width="40" height="140" rx="8" fill={color} opacity={0.85} />
    <rect x="95" y="10" width="70" height="40" rx="10" fill="#111" />
    <rect x="95" y="160" width="70" height="40" rx="10" fill="#111" />
    <rect x="340" y="18" width="62" height="34" rx="10" fill="#111" />
    <rect x="340" y="158" width="62" height="34" rx="10" fill="#111" />
    <path d="M70 80 Q120 60 200 70 L420 92 Q450 105 420 118 L200 140 Q120 150 70 130 Z" fill={color} />
    <ellipse cx="250" cy="105" rx="34" ry="20" fill="#0b1020" />
    <text x="150" y="118" fontFamily={FONT} fontWeight={900} fontSize={40} fill="#fff" textAnchor="middle">
      {label}
    </text>
  </svg>
);

export const MiniCumpleanos: React.FC = () => (
  <Fondo accent={C.blue}>
    <Grande size={150} color={C.ink}>¿SOLO</Grande>
    <Grande size={520} color={C.yellow}>23?</Grande>
    <div style={{ display: "flex", flexWrap: "wrap", width: 900, justifyContent: "center", gap: 14 }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <Persona key={i} color={[C.green, C.blue, C.purple][i % 3]} />
      ))}
    </div>
  </Fondo>
);

export const MiniSimpson: React.FC = () => (
  <Fondo accent={C.purple}>
    <Grande size={190}>GANA…</Grande>
    <div style={{ width: 880, display: "flex", flexDirection: "column", gap: 28 }}>
      {[
        ["✓", 93, C.green],
        ["✓", 73, C.green],
        ["✕", 78, C.coral],
      ].map(([l, v, c], i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 24, fontFamily: FONT, fontWeight: 900, fontSize: 70, color: C.ink }}>
          <span style={{ width: 80, color: c as string }}>{l}</span>
          <div style={{ flex: 1, height: 70, background: C.bg2, borderRadius: 35, overflow: "hidden" }}>
            <div style={{ width: `${v}%`, height: "100%", background: c as string, borderRadius: 35 }} />
          </div>
        </div>
      ))}
    </div>
    <Grande size={190} color={C.coral} rotate={-3}>
      Y PIERDE
    </Grande>
  </Fondo>
);

export const MiniRecomendador: React.FC = () => (
  <Fondo accent={C.coral}>
    <Grande size={210}>TE</Grande>
    <Grande size={180} color={C.coral}>
      COMPARA
    </Grande>
    <div style={{ display: "flex", flexDirection: "column", gap: 20, fontFamily: FONT, fontWeight: 900, fontSize: 64 }}>
      {[
        ["Tú", C.yellow, [1, 1, 0, 2]],
        ["Ana", C.green, [1, 1, 0, 1]],
      ].map(([n, c, ms]) => (
        <div key={n as string} style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span style={{ width: 150, textAlign: "right", color: c as string }}>{n as string}</span>
          {(ms as number[]).map((m, i) => (
            <div key={i} style={{ width: 150, height: 130, borderRadius: 22, background: C.bg2, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {m === 1 ? <Heart size={90} color={C.coral} /> : m === 2 ? <span style={{ color: C.yellow, fontSize: 100 }}>?</span> : <span style={{ color: C.dim, fontSize: 80 }}>✕</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  </Fondo>
);

export const MiniF1: React.FC = () => (
  <Fondo accent={C.coral}>
    <Grande size={170} color={C.yellow}>
      UNDERCUT
    </Grande>
    <div style={{ display: "flex", flexDirection: "column", gap: 30, alignItems: "center" }}>
      <div style={{ translate: "120px 0px" }}>
        <Auto color={C.coral} width={620} label="B" />
      </div>
      <div style={{ translate: "-140px 0px" }}>
        <Auto color={C.blue} width={620} label="A" />
      </div>
    </div>
    <Chip color={C.green} size={70}>
      −1,5 s / vuelta
    </Chip>
  </Fondo>
);

export const MiniClaude: React.FC = () => (
  <Fondo accent={C.purple}>
    <Grande size={210}>LEE</Grande>
    <Grande size={190} color={C.green}>
      NÚMEROS
    </Grande>
    <div style={{ display: "flex", flexWrap: "wrap", width: 900, justifyContent: "center", gap: 18 }}>
      {["1002", "48353", "3017", "76114", "12796", "79825", "30148", "4130"].map((n, i) => (
        <Chip key={n} color={[C.green, C.blue, C.purple, C.coral][i % 4]}>
          {n}
        </Chip>
      ))}
    </div>
  </Fondo>
);

export const MiniStatsBomb: React.FC = () => {
  let s = 21;
  const r = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  const puntos = Array.from({ length: 150 }).map(() => [20 + r() * 640, 20 + r() * 1010]);
  return (
    <Fondo accent={C.green}>
      <Grande size={300} color={C.yellow}>
        3,300
      </Grande>
      <Grande size={170}>DATOS</Grande>
      <svg width={460} height={710} viewBox="0 0 680 1050">
        <rect x={0} y={0} width={680} height={1050} rx={18} fill="#123a2a" />
        <g fill="none" stroke="#d7f5e5" strokeWidth={5} opacity={0.75}>
          <rect x={10} y={10} width={660} height={1030} rx={6} />
          <line x1={10} y1={525} x2={670} y2={525} />
          <circle cx={340} cy={525} r={91.5} />
          <rect x={138.5} y={10} width={403} height={165} />
          <rect x={138.5} y={875} width={403} height={165} />
        </g>
        {puntos.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={11} fill={[C.green, C.yellow, C.blue, C.coral][i % 4]} />
        ))}
      </svg>
    </Fondo>
  );
};
