import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONT, HANDLE, MONO } from "../kit/theme";
import { BalonMitad } from "../shorts/sueltos/ImagenNumeros";
import { Lupa } from "../shorts/vision/AmarilloNoExiste";

// Miniaturas verticales 1080×1920 para los Shorts.
// Regla: máximo 3 palabras, distintas al título, legibles al tamaño del feed.

const Fondo: React.FC<{ accent: string; children: React.ReactNode }> = ({
  accent,
  children,
}) => (
  <AbsoluteFill style={{ backgroundColor: C.bg, overflow: "hidden" }}>
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 900px 1100px at 50% 45%, ${accent}55, transparent 70%)`,
      }}
    />
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
    <div
      style={{
        position: "absolute",
        top: 120,
        left: 0,
        right: 0,
        textAlign: "center",
        fontFamily: MONO,
        fontSize: 36,
        color: C.dim,
      }}
    >
      {HANDLE}
    </div>
  </AbsoluteFill>
);

/** Texto grande con contorno para que se lea a tamaño pequeño. */
const Grande: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
  rotate?: number;
}> = ({ children, size = 200, color = C.ink, rotate = 0 }) => (
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

const Chip: React.FC<{
  children: React.ReactNode;
  color: string;
  size?: number;
}> = ({ children, color, size = 64 }) => (
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
    <path
      d="M12 21s-7.5-4.6-9.6-9.2C1 8.6 3 5 6.6 5c2.1 0 3.6 1.2 4.4 2.6h2C13.8 6.2 15.3 5 17.4 5 21 5 23 8.6 21.6 11.8 19.5 16.4 12 21 12 21z"
      fill={color}
    />
  </svg>
);

const Auto: React.FC<{ color: string; width: number; label: string }> = ({
  color,
  width,
  label,
}) => (
  <svg width={width} height={width * 0.42} viewBox="0 0 500 210">
    <rect
      x="20"
      y="20"
      width="60"
      height="170"
      rx="8"
      fill={color}
      opacity={0.85}
    />
    <rect
      x="430"
      y="35"
      width="40"
      height="140"
      rx="8"
      fill={color}
      opacity={0.85}
    />
    <rect x="95" y="10" width="70" height="40" rx="10" fill="#111" />
    <rect x="95" y="160" width="70" height="40" rx="10" fill="#111" />
    <rect x="340" y="18" width="62" height="34" rx="10" fill="#111" />
    <rect x="340" y="158" width="62" height="34" rx="10" fill="#111" />
    <path
      d="M70 80 Q120 60 200 70 L420 92 Q450 105 420 118 L200 140 Q120 150 70 130 Z"
      fill={color}
    />
    <ellipse cx="250" cy="105" rx="34" ry="20" fill="#0b1020" />
    <text
      x="150"
      y="118"
      fontFamily={FONT}
      fontWeight={900}
      fontSize={40}
      fill="#fff"
      textAnchor="middle"
    >
      {label}
    </text>
  </svg>
);

export const MiniCumpleanos: React.FC = () => (
  <Fondo accent={C.blue}>
    <Grande size={150} color={C.ink}>
      ¿SOLO
    </Grande>
    <Grande size={520} color={C.yellow}>
      23?
    </Grande>
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: 900,
        justifyContent: "center",
        gap: 14,
      }}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <Persona key={i} color={[C.green, C.blue, C.purple][i % 3]} />
      ))}
    </div>
  </Fondo>
);

export const MiniSimpson: React.FC = () => (
  <Fondo accent={C.purple}>
    <Grande size={190}>GANA…</Grande>
    <div
      style={{ width: 880, display: "flex", flexDirection: "column", gap: 28 }}
    >
      {[
        ["✓", 93, C.green],
        ["✓", 73, C.green],
        ["✕", 78, C.coral],
      ].map(([l, v, c], i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 70,
            color: C.ink,
          }}
        >
          <span style={{ width: 80, color: c as string }}>{l}</span>
          <div
            style={{
              flex: 1,
              height: 70,
              background: C.bg2,
              borderRadius: 35,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${v}%`,
                height: "100%",
                background: c as string,
                borderRadius: 35,
              }}
            />
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: 64,
      }}
    >
      {[
        ["Tú", C.yellow, [1, 1, 0, 2]],
        ["Ana", C.green, [1, 1, 0, 1]],
      ].map(([n, c, ms]) => (
        <div
          key={n as string}
          style={{ display: "flex", alignItems: "center", gap: 18 }}
        >
          <span style={{ width: 150, textAlign: "right", color: c as string }}>
            {n as string}
          </span>
          {(ms as number[]).map((m, i) => (
            <div
              key={i}
              style={{
                width: 150,
                height: 130,
                borderRadius: 22,
                background: C.bg2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {m === 1 ? (
                <Heart size={90} color={C.coral} />
              ) : m === 2 ? (
                <span style={{ color: C.yellow, fontSize: 100 }}>?</span>
              ) : (
                <span style={{ color: C.dim, fontSize: 80 }}>✕</span>
              )}
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 30,
        alignItems: "center",
      }}
    >
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
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: 900,
        justifyContent: "center",
        gap: 18,
      }}
    >
      {[
        "1002",
        "48353",
        "3017",
        "76114",
        "12796",
        "79825",
        "30148",
        "4130",
      ].map((n, i) => (
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
  const puntos = Array.from({ length: 150 }).map(() => [
    20 + r() * 640,
    20 + r() * 1010,
  ]);
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
          <circle
            key={i}
            cx={x}
            cy={y}
            r={11}
            fill={[C.green, C.yellow, C.blue, C.coral][i % 4]}
          />
        ))}
      </svg>
    </Fondo>
  );
};

// ---------- Serie "Mates de científico de datos" ----------

const SerieMini: React.FC<{
  n: number;
  accent: string;
  children: React.ReactNode;
  serie?: string;
  color?: string;
}> = ({
  n,
  accent,
  children,
  serie = "MATES DE CIENTÍFICO DE DATOS",
  color = C.yellow,
}) => (
  <Fondo accent={accent}>
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: 40,
        color: C.ink,
        border: `4px solid ${color}`,
        borderRadius: 40,
        padding: "10px 28px",
        letterSpacing: 1,
      }}
    >
      {serie}
    </div>
    <div
      style={{
        width: 300,
        height: 300,
        borderRadius: 150,
        background: color,
        color: C.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: 190,
        boxShadow: `0 0 80px ${color}66`,
      }}
    >
      #{n}
    </div>
    {children}
  </Fondo>
);

export const MiniMates1: React.FC = () => (
  <SerieMini n={1} accent={C.green}>
    <Grande size={170}>¿MEDIO</Grande>
    <Grande size={170} color={C.coral}>
      MILLÓN?
    </Grande>
    <Persona color={C.yellow} />
  </SerieMini>
);

export const MiniMates2: React.FC = () => (
  <SerieMini n={2} accent={C.coral}>
    <Grande size={150}>¿EN CUÁL</Grande>
    <Grande size={150} color={C.green}>
      CONFÍAS?
    </Grande>
    <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
      {[
        [[29, 30, 31, 30, 30], C.green],
        [[10, 50, 15, 45, 30], C.coral],
      ].map(([xs, c], r) => (
        <svg key={r} width={820} height={60} viewBox="0 0 820 60">
          <line
            x1={10}
            y1={30}
            x2={810}
            y2={30}
            stroke={C.dim}
            strokeWidth={5}
          />
          {(xs as number[]).map((x, i) => (
            <circle
              key={i}
              cx={10 + (800 * x) / 60 + (r === 0 ? (i - 2) * 10 : 0)}
              cy={30}
              r={22}
              fill={c as string}
              stroke="#0b1020"
              strokeWidth={4}
            />
          ))}
        </svg>
      ))}
    </div>
  </SerieMini>
);

export const MiniMates3: React.FC = () => (
  <SerieMini n={3} accent={C.purple}>
    <Grande size={190}>¿FUISTE</Grande>
    <Grande size={190} color={C.coral}>
      TÚ?
    </Grande>
    <div
      style={{
        background: "#f4f6ff",
        borderRadius: 30,
        padding: "18px 40px",
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: 90,
        color: C.coral,
        rotate: "-3deg",
      }}
    >
      $9,500
    </div>
  </SerieMini>
);

export const MiniMates4: React.FC = () => (
  <SerieMini n={4} accent={C.blue}>
    <Grande size={210}>¿ES</Grande>
    <Grande size={210} color={C.coral}>
      SPAM?
    </Grande>
    <svg width={300} height={225} viewBox="0 0 40 30">
      <rect x={1} y={1} width={38} height={28} rx={4} fill={C.coral} />
      <path
        d="M2 3 L20 17 L38 3"
        fill="none"
        stroke="#0b1020"
        strokeWidth={2.5}
      />
      <rect
        x={24}
        y={18}
        width={14}
        height={10}
        rx={2}
        fill={C.yellow}
        stroke="#0b1020"
        strokeWidth={1.5}
      />
    </svg>
  </SerieMini>
);

export const MiniMates5: React.FC = () => (
  <SerieMini n={5} accent={C.yellow}>
    <Grande size={160}>¿EL HELADO</Grande>
    <Grande size={190} color={C.coral}>
      MATA?
    </Grande>
    <svg width={300} height={300} viewBox="0 0 100 100">
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={50 + 30 * Math.cos(a)}
            y1={50 + 30 * Math.sin(a)}
            x2={50 + 46 * Math.cos(a)}
            y2={50 + 46 * Math.sin(a)}
            stroke={C.yellow}
            strokeWidth={6}
            strokeLinecap="round"
          />
        );
      })}
      <circle cx={50} cy={50} r={24} fill={C.yellow} />
    </svg>
  </SerieMini>
);

export const MiniMates6: React.FC = () => (
  <SerieMini n={6} accent={C.blue}>
    <Grande size={170}>¿CUÁNTO</Grande>
    <Grande size={170} color={C.green}>
      CUESTA?
    </Grande>
    <svg width={760} height={330} viewBox="0 0 760 330">
      <line x1={40} y1={300} x2={740} y2={300} stroke={C.dim} strokeWidth={5} />
      <line x1={40} y1={20} x2={40} y2={300} stroke={C.dim} strokeWidth={5} />
      <line
        x1={60}
        y1={280}
        x2={720}
        y2={40}
        stroke={C.yellow}
        strokeWidth={10}
        strokeLinecap="round"
      />
      {[
        [110, 255],
        [200, 235],
        [290, 180],
        [370, 175],
        [460, 130],
        [560, 105],
        [650, 60],
      ].map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={20}
          fill={C.blue}
          stroke="#0b1020"
          strokeWidth={4}
        />
      ))}
    </svg>
  </SerieMini>
);

export const MiniMates7: React.FC = () => (
  <SerieMini n={7} accent={C.green}>
    <Grande size={190}>TÚ =</Grande>
    <Grande size={190} color={C.yellow}>
      FLECHA
    </Grande>
    <svg width={560} height={340} viewBox="0 0 560 340">
      <defs>
        <marker
          id="mm7"
          markerWidth={8}
          markerHeight={8}
          refX={5}
          refY={4}
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill={C.yellow} />
        </marker>
        <marker
          id="mm7b"
          markerWidth={8}
          markerHeight={8}
          refX={5}
          refY={4}
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill={C.green} />
        </marker>
      </defs>
      <line
        x1={30}
        y1={320}
        x2={500}
        y2={200}
        stroke={C.yellow}
        strokeWidth={16}
        strokeLinecap="round"
        markerEnd="url(#mm7)"
      />
      <line
        x1={30}
        y1={320}
        x2={460}
        y2={130}
        stroke={C.green}
        strokeWidth={16}
        strokeLinecap="round"
        markerEnd="url(#mm7b)"
      />
    </svg>
  </SerieMini>
);

export const MiniMates8: React.FC = () => (
  <SerieMini n={8} accent={C.purple}>
    <Grande size={160}>¿CÓMO</Grande>
    <Grande size={170} color={C.purple}>
      APRENDE?
    </Grande>
    <svg width={760} height={340} viewBox="0 0 760 340">
      <path
        d="M20 30 Q380 640 740 30"
        fill="none"
        stroke={C.purple}
        strokeWidth={12}
      />
      <circle
        cx={150}
        cy={150}
        r={30}
        fill={C.yellow}
        stroke="#0b1020"
        strokeWidth={5}
      />
      <path
        d="M190 190 Q240 240 290 250"
        fill="none"
        stroke={C.yellow}
        strokeWidth={8}
        strokeDasharray="16 12"
      />
    </svg>
  </SerieMini>
);

// ---------- Serie "Estructuras y algoritmos" ----------
const ALG = { serie: "ESTRUCTURAS Y ALGORITMOS", color: C.blue };

export const MiniAlgo1: React.FC = () => (
  <SerieMini n={1} accent={C.blue} {...ALG}>
    <Grande size={170}>TU</Grande>
    <Grande size={170} color={C.blue}>
      PLAYLIST
    </Grande>
    <div style={{ display: "flex", gap: 10 }}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              width: 120,
              height: 130,
              borderRadius: 16,
              background: i === 3 ? C.yellow : `${C.blue}33`,
              border: `5px solid ${i === 3 ? C.yellow : C.blue}`,
            }}
          />
          <div
            style={{
              fontFamily: MONO,
              fontSize: 40,
              color: i === 3 ? C.yellow : C.dim,
            }}
          >
            [{i}]
          </div>
        </div>
      ))}
    </div>
  </SerieMini>
);

export const MiniAlgo2: React.FC = () => (
  <SerieMini n={2} accent={C.coral} {...ALG}>
    <Grande size={150}>¿SEGUNDOS</Grande>
    <Grande size={150} color={C.coral}>
      O HORAS?
    </Grande>
    <div style={{ display: "flex", gap: 24 }}>
      <Chip color={C.green} size={64}>
        O(n)
      </Chip>
      <Chip color={C.coral} size={64}>
        O(n²)
      </Chip>
    </div>
  </SerieMini>
);

export const MiniAlgo3: React.FC = () => (
  <SerieMini n={3} accent={C.blue} {...ALG}>
    <Grande size={330} color={C.yellow}>
      20
    </Grande>
    <Grande size={150}>INTENTOS</Grande>
    <svg width={820} height={60} viewBox="0 0 820 60">
      <rect x={0} y={15} width={820} height={30} rx={15} fill={C.bg2} />
      <rect x={560} y={15} width={60} height={30} rx={15} fill={C.blue} />
    </svg>
  </SerieMini>
);

export const MiniAlgo4: React.FC = () => (
  <SerieMini n={4} accent={C.purple} {...ALG}>
    <Grande size={170}>¿AL</Grande>
    <Grande size={170} color={C.purple}>
      INSTANTE?
    </Grande>
    <div style={{ display: "flex", gap: 10 }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 86,
            height: 160,
            borderRadius: 12,
            background: i === 3 ? `${C.yellow}55` : C.bg2,
            border: `5px solid ${i === 3 ? C.yellow : "#2a3366"}`,
          }}
        />
      ))}
    </div>
  </SerieMini>
);

export const MiniAlgo5: React.FC = () => (
  <SerieMini n={5} accent={C.green} {...ALG}>
    <Grande size={190}>CTRL+Z</Grande>
    <Grande size={150} color={C.green}>
      VS FILA
    </Grande>
    <div style={{ display: "flex", gap: 14 }}>
      {[C.green, C.purple, C.coral, C.yellow].map((c, i) => (
        <Persona key={i} color={c} />
      ))}
    </div>
  </SerieMini>
);

export const MiniAlgo6: React.FC = () => (
  <SerieMini n={6} accent={C.yellow} {...ALG}>
    <Grande size={200} color={C.yellow}>
      1,000
    </Grande>
    <Grande size={150}>EXÁMENES</Grande>
    <div
      style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 240 }}
    >
      {[3, 9, 10, 27, 38, 43, 55, 82].map((v) => (
        <div
          key={v}
          style={{
            width: 80,
            height: 40 + v * 2.4,
            borderRadius: 10,
            background:
              v < 20 ? C.blue : v < 45 ? C.green : v < 60 ? C.yellow : C.coral,
          }}
        />
      ))}
    </div>
  </SerieMini>
);

export const MiniAlgo7: React.FC = () => (
  <SerieMini n={7} accent={C.green} {...ALG}>
    <Grande size={170}>¿CRÉDITO</Grande>
    <Grande size={160} color={C.green}>
      APROBADO?
    </Grande>
    <svg width={700} height={300} viewBox="0 0 700 300">
      <line
        x1={350}
        y1={50}
        x2={170}
        y2={170}
        stroke={C.yellow}
        strokeWidth={10}
      />
      <line x1={350} y1={50} x2={530} y2={170} stroke={C.dim} strokeWidth={8} />
      <line
        x1={170}
        y1={170}
        x2={80}
        y2={270}
        stroke={C.yellow}
        strokeWidth={10}
      />
      <line
        x1={170}
        y1={170}
        x2={260}
        y2={270}
        stroke={C.dim}
        strokeWidth={8}
      />
      <circle cx={350} cy={50} r={40} fill={C.blue} />
      <circle cx={170} cy={170} r={40} fill={C.blue} />
      <circle cx={530} cy={170} r={40} fill={C.coral} />
      <circle cx={80} cy={260} r={40} fill={C.green} />
      <circle cx={260} cy={260} r={40} fill={C.yellow} />
    </svg>
  </SerieMini>
);

export const MiniAlgo8: React.FC = () => (
  <SerieMini n={8} accent={C.purple} {...ALG}>
    <Grande size={180}>¿LA</Grande>
    <Grande size={180} color={C.purple}>
      CONOCES?
    </Grande>
    <svg width={700} height={300} viewBox="0 0 700 300">
      {[
        [350, 150, 200, 60],
        [350, 150, 200, 240],
        [350, 150, 560, 150],
        [200, 60, 60, 150],
        [200, 240, 60, 150],
      ].map(([a, b, c, d], i) => (
        <line
          key={i}
          x1={a}
          y1={b}
          x2={c}
          y2={d}
          stroke={i > 2 ? C.green : C.dim}
          strokeWidth={10}
        />
      ))}
      {[
        [350, 150, C.yellow],
        [200, 60, C.blue],
        [200, 240, C.blue],
        [560, 150, C.blue],
        [60, 150, C.purple],
      ].map(([x, y, c], i) => (
        <circle
          key={i}
          cx={x as number}
          cy={y as number}
          r={46}
          fill={c as string}
          stroke="#0b1020"
          strokeWidth={5}
        />
      ))}
    </svg>
  </SerieMini>
);

export const MiniAlgo9: React.FC = () => (
  <SerieMini n={9} accent={C.green} {...ALG}>
    <Grande size={190} color={C.coral}>
      18 MIN
    </Grande>
    <Grande size={190} color={C.green}>
      13 MIN
    </Grande>
    <svg width={760} height={280} viewBox="0 0 760 280">
      <polyline
        points="40,240 380,200 720,150"
        fill="none"
        stroke={C.coral}
        strokeWidth={12}
        strokeDasharray="22 14"
      />
      <polyline
        points="40,240 180,60 380,140 540,40 720,150"
        fill="none"
        stroke={C.green}
        strokeWidth={14}
        strokeLinejoin="round"
      />
      <circle cx={40} cy={240} r={30} fill={C.yellow} />
      <circle cx={720} cy={150} r={30} fill={C.yellow} />
    </svg>
  </SerieMini>
);

export const MiniAlgo10: React.FC = () => (
  <SerieMini n={10} accent={C.yellow} {...ALG}>
    <Grande size={200} color={C.coral}>
      ¿GATP
    </Grande>
    <Grande size={200} color={C.green}>
      = GATO?
    </Grande>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 110px)",
        gap: 8,
        fontFamily: MONO,
        fontWeight: 700,
        fontSize: 52,
      }}
    >
      {[0, 1, 2, 3, 1, 0, 1, 2, 2, 1, 0, 1, 3, 2, 1, 1].map((v, i) => (
        <div
          key={i}
          style={{
            height: 90,
            borderRadius: 12,
            background: i === 15 ? C.green : C.bg2,
            color: i === 15 ? C.bg : C.ink,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {v}
        </div>
      ))}
    </div>
  </SerieMini>
);

// ---------- Serie "Programación en Ciencia de Datos" ----------
const PRAC = { serie: "PROGRAMACIÓN EN CIENCIA DE DATOS", color: C.green };

export const MiniPrac1: React.FC = () => (
  <SerieMini n={1} accent={C.green} {...PRAC}>
    <Grande size={170}>NO SON</Grande>
    <Grande size={170} color={C.coral}>
      MODELOS
    </Grande>
    <div
      style={{
        width: 820,
        height: 100,
        borderRadius: 50,
        overflow: "hidden",
        display: "flex",
      }}
    >
      <div style={{ width: "78%", background: C.green }} />
      <div style={{ flex: 1, background: C.purple }} />
    </div>
  </SerieMini>
);

export const MiniPrac2: React.FC = () => (
  <SerieMini n={2} accent={C.blue} {...PRAC}>
    <Grande size={200}>¿VENDER</Grande>
    <Grande size={200} color={C.coral}>
      MÁS?
    </Grande>
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: 200,
        color: C.coral,
      }}
    >
      ✕
    </div>
  </SerieMini>
);

export const MiniPrac3: React.FC = () => (
  <SerieMini n={3} accent={C.green} {...PRAC}>
    <Grande size={160}>¿DE DÓNDE</Grande>
    <Grande size={160} color={C.green}>
      SALEN?
    </Grande>
    <div
      style={{
        width: 420,
        background: "#f4f6ff",
        color: "#0b1020",
        borderRadius: 20,
        padding: "24px 30px",
        fontFamily: MONO,
        fontSize: 38,
        rotate: "-4deg",
      }}
    >
      <div style={{ fontWeight: 700, textAlign: "center" }}>CAFÉ DATOS</div>
      <div>Latte ..... $55</div>
    </div>
  </SerieMini>
);

export const MiniPrac4: React.FC = () => (
  <SerieMini n={4} accent={C.yellow} {...PRAC}>
    <Grande size={170}>TABLA</Grande>
    <Grande size={170} color={C.coral}>
      MAL HECHA
    </Grande>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 170px)",
        gap: 8,
      }}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          style={{
            height: 70,
            borderRadius: 10,
            background:
              i < 4 ? "#222b5c" : i % 4 === 0 ? C.bg2 : `${C.yellow}55`,
          }}
        />
      ))}
    </div>
  </SerieMini>
);

export const MiniPrac5: React.FC = () => (
  <SerieMini n={5} accent={C.purple} {...PRAC}>
    <Grande size={230}>CDMX</Grande>
    <Grande size={230} color={C.coral}>
      ≠ cdmx
    </Grande>
    <div style={{ fontFamily: MONO, fontSize: 56, color: C.dim }}>
      drop_duplicates()
    </div>
  </SerieMini>
);

export const MiniPrac6: React.FC = () => (
  <SerieMini n={6} accent={C.coral} {...PRAC}>
    <Grande size={150}>¿CAFÉ DE</Grande>
    <Grande size={210} color={C.coral}>
      $15,000?
    </Grande>
    <svg width={760} height={120} viewBox="0 0 760 120">
      <line x1={20} y1={90} x2={740} y2={90} stroke={C.dim} strokeWidth={5} />
      {[60, 90, 110, 130, 150, 170, 200].map((x, i) => (
        <circle key={i} cx={x} cy={70 - (i % 2) * 18} r={16} fill={C.blue} />
      ))}
      <circle cx={700} cy={60} r={26} fill={C.coral} />
    </svg>
  </SerieMini>
);

export const MiniPrac7: React.FC = () => (
  <SerieMini n={7} accent={C.green} {...PRAC}>
    <Grande size={200}>3</Grande>
    <Grande size={150} color={C.green}>
      COMANDOS
    </Grande>
    <div style={{ display: "flex", gap: 14 }}>
      {["filtrar", "agrupar", "unir"].map((t, i) => (
        <span
          key={t}
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 52,
            color: C.bg,
            background: [C.yellow, C.green, C.blue][i],
            borderRadius: 16,
            padding: "10px 22px",
          }}
        >
          {t}
        </span>
      ))}
    </div>
  </SerieMini>
);

export const MiniPrac8: React.FC = () => (
  <SerieMini n={8} accent={C.blue} {...PRAC}>
    <Grande size={180}>¿POR QUÉ</Grande>
    <Grande size={180} color={C.coral}>
      LUNES?
    </Grande>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 100px)",
        gap: 8,
      }}
    >
      {[4, 30, 32, 35, 45, 70, 66].map((v, i) => (
        <div
          key={i}
          style={{
            height: 100,
            borderRadius: 14,
            background: `rgba(61,220,132,${0.15 + 0.85 * (v / 70)})`,
            outline: i === 0 ? `6px solid ${C.coral}` : "none",
          }}
        />
      ))}
    </div>
  </SerieMini>
);

export const MiniPrac9: React.FC = () => (
  <SerieMini n={9} accent={C.purple} {...PRAC}>
    <Grande size={300}>4</Grande>
    <Grande size={150} color={C.purple}>
      ANÁLISIS
    </Grande>
    <div style={{ display: "flex", alignItems: "flex-end", gap: 14 }}>
      {[C.blue, C.purple, C.yellow, C.green].map((c, i) => (
        <div
          key={i}
          style={{
            width: 150,
            height: 80 + i * 70,
            borderRadius: 16,
            background: c,
          }}
        />
      ))}
    </div>
  </SerieMini>
);

export const MiniPrac10: React.FC = () => (
  <SerieMini n={10} accent={C.green} {...PRAC}>
    <Grande size={170}>¿SE</Grande>
    <Grande size={128} color={C.coral}>
      DISPARARON?
    </Grande>
    <div
      style={{ display: "flex", alignItems: "flex-end", gap: 20, height: 280 }}
    >
      {[80, 130, 160, 260].map((h, i) => (
        <div
          key={i}
          style={{
            width: 120,
            height: h,
            borderRadius: 12,
            background: C.coral,
          }}
        />
      ))}
    </div>
  </SerieMini>
);

// ---------- Serie "Aprendizaje Automático" (tronco, dorado) ----------
const ML = { serie: "APRENDIZAJE AUTOMÁTICO", color: "#f2c14e" };

export const MiniML0: React.FC = () => (
  <SerieMini n={0} accent="#f2c14e" {...ML}>
    <Grande size={190}>¿LO</Grande>
    <Grande size={170} color="#f2c14e">
      APRENDIÓ?
    </Grande>
    <svg width={300} height={225} viewBox="0 0 40 30">
      <rect x={1} y={1} width={38} height={28} rx={4} fill={C.coral} />
      <path
        d="M2 3 L20 17 L38 3"
        fill="none"
        stroke="#0b1020"
        strokeWidth={2.5}
      />
    </svg>
  </SerieMini>
);

export const MiniML1: React.FC = () => (
  <SerieMini n={1} accent="#f2c14e" {...ML}>
    <Grande size={190}>¿HICISTE</Grande>
    <Grande size={190} color={C.coral}>
      TRAMPA?
    </Grande>
    <div style={{ display: "flex", gap: 14 }}>
      <div
        style={{ width: 600, height: 90, borderRadius: 18, background: C.blue }}
      />
      <div
        style={{
          width: 150,
          height: 90,
          borderRadius: 18,
          background: C.coral,
        }}
      />
    </div>
  </SerieMini>
);

export const MiniML2: React.FC = () => (
  <SerieMini n={2} accent={C.coral} {...ML}>
    <Grande size={230} color={C.green}>
      100%
    </Grande>
    <Grande size={170} color={C.coral}>
      = PÉSIMO
    </Grande>
    <svg width={760} height={240} viewBox="0 0 760 240">
      <path
        d="M20 200 C80 -60 120 260 200 60 S300 260 380 40 S480 260 560 60 S680 240 740 30"
        fill="none"
        stroke={C.coral}
        strokeWidth={12}
      />
      {[
        [40, 150],
        [200, 60],
        [380, 40],
        [560, 60],
        [740, 30],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={18} fill={C.ink} />
      ))}
    </svg>
  </SerieMini>
);

export const MiniML3: React.FC = () => (
  <SerieMini n={3} accent={C.blue} {...ML}>
    <Grande size={190}>¿Y LA</Grande>
    <Grande size={190} color={C.blue}>
      LLUVIA?
    </Grande>
    <svg width={340} height={290} viewBox="0 0 100 86">
      <path
        d="M20 50 Q10 50 10 40 Q10 28 24 28 Q28 14 44 16 Q56 6 68 18 Q86 16 88 32 Q96 36 94 44 Q92 50 82 50 Z"
        fill={C.dim}
      />
      {[24, 44, 64, 80].map((x, i) => (
        <line
          key={i}
          x1={x}
          y1={58}
          x2={x - 6}
          y2={74}
          stroke={C.blue}
          strokeWidth={5}
          strokeLinecap="round"
        />
      ))}
    </svg>
  </SerieMini>
);

// ---------- Rama "Supervisado" (naranja) ----------
const SUPM = {
  serie: "APRENDIZAJE SUPERVISADO",
  color: "#ff9f43",
};
const N = "#ff9f43";
const Pin: React.FC<{ c: string; s?: number }> = ({ c, s = 200 }) => (
  <svg width={s} height={s * 1.25} viewBox="0 0 80 100">
    <ellipse
      cx={40}
      cy={58}
      rx={28}
      ry={38}
      fill="#1b2238"
      stroke={c}
      strokeWidth={4}
    />
    <ellipse cx={40} cy={64} rx={18} ry={28} fill="#f4f6ff" />
    <circle cx={40} cy={22} r={16} fill="#1b2238" stroke={c} strokeWidth={4} />
    <path d="M36 27 L44 27 L40 34 Z" fill={C.yellow} />
  </svg>
);
export const MiniSup1: React.FC = () => (
  <SerieMini n={1} accent={N} {...SUPM}>
    <Grande size={170}>¿NÚMERO</Grande>
    <Grande size={170} color={N}>
      O ESPECIE?
    </Grande>
    <Pin c={N} />
  </SerieMini>
);
export const MiniSup2: React.FC = () => (
  <SerieMini n={2} accent={N} {...SUPM}>
    <Grande size={150}>¿CON QUIÉN</Grande>
    <Grande size={150} color={N}>
      ANDAS?
    </Grande>
    <div style={{ display: "flex", gap: 20 }}>
      {[C.blue, C.blue, N, C.blue, C.blue].map((c, i) => (
        <div
          key={i}
          style={{ width: 100, height: 100, borderRadius: 50, background: c }}
        />
      ))}
    </div>
  </SerieMini>
);
export const MiniSup3: React.FC = () => (
  <SerieMini n={3} accent={N} {...SUPM}>
    <Grande size={180}>¿VUELVE?</Grande>
    <Grande size={240} color={C.green}>
      93%
    </Grande>
  </SerieMini>
);
export const MiniSup4: React.FC = () => (
  <SerieMini n={4} accent={C.green} {...SUPM}>
    <Grande size={260} color={C.green}>
      100
    </Grande>
    <Grande size={170}>ÁRBOLES</Grande>
    <div style={{ display: "flex", gap: 10 }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <svg key={i} width={90} height={90} viewBox="0 0 40 40">
          <path d="M20 2 L36 30 L4 30 Z" fill={i % 3 ? C.green : N} />
        </svg>
      ))}
    </div>
  </SerieMini>
);
export const MiniSup5: React.FC = () => (
  <SerieMini n={5} accent={C.coral} {...SUPM}>
    <Grande size={220} color={C.green}>
      99%
    </Grande>
    <Grande size={190} color={C.coral}>
      INÚTIL
    </Grande>
  </SerieMini>
);
export const MiniSup6: React.FC = () => (
  <SerieMini n={6} accent={N} {...SUPM}>
    <Grande size={170}>¿MÁS ES</Grande>
    <Grande size={190} color={N}>
      MEJOR?
    </Grande>
    <svg width={760} height={220} viewBox="0 0 760 220">
      <path
        d="M20 20 C200 150 300 190 420 190 S700 180 740 175"
        fill="none"
        stroke={N}
        strokeWidth={14}
      />
    </svg>
  </SerieMini>
);
export const MiniSup7: React.FC = () => (
  <SerieMini n={7} accent={N} {...SUPM}>
    <Grande size={260} color={N}>
      243
    </Grande>
    <Grande size={180}>PERILLAS</Grande>
  </SerieMini>
);
export const MiniSup8: React.FC = () => (
  <SerieMini n={8} accent={N} {...SUPM}>
    <Grande size={150}>DATOS →</Grande>
    <Grande size={150} color={N}>
      PREDICCIÓN
    </Grande>
    <Pin c={C.green} s={170} />
  </SerieMini>
);

// ---------- Rama "No supervisado" (morado) y Gran Final ----------
const NOSM = { serie: "APRENDIZAJE NO SUPERVISADO", color: C.purple };
const Puntos3: React.FC<{ cols?: string[] }> = ({
  cols = [C.coral, C.green, C.blue],
}) => (
  <svg width={600} height={260} viewBox="0 0 600 260">
    {[
      [120, 90],
      [300, 190],
      [470, 80],
    ].flatMap(([cx, cy], g) =>
      Array.from({ length: 14 }).map((_, i) => {
        const a = i * 2.4,
          r = 18 + (i % 4) * 14;
        return (
          <circle
            key={`${g}-${i}`}
            cx={cx + r * Math.cos(a)}
            cy={cy + r * Math.sin(a)}
            r={12}
            fill={cols[g % cols.length]}
          />
        );
      }),
    )}
  </svg>
);
export const MiniNos1: React.FC = () => (
  <SerieMini n={1} accent={C.purple} {...NOSM}>
    <Grande size={170}>SIN</Grande>
    <Grande size={140} color={C.purple}>
      RESPUESTAS
    </Grande>
    <Puntos3 />
  </SerieMini>
);
export const MiniNos2: React.FC = () => (
  <SerieMini n={2} accent={C.purple} {...NOSM}>
    <Grande size={160}>¿QUÉ TIPO</Grande>
    <Grande size={160} color={C.purple}>
      DE CLIENTE?
    </Grande>
    <Puntos3 />
  </SerieMini>
);
export const MiniNos3: React.FC = () => (
  <SerieMini n={3} accent={C.purple} {...NOSM}>
    <Grande size={160}>¿CUÁNTOS</Grande>
    <Grande size={190} color={C.purple}>
      GRUPOS?
    </Grande>
    <svg width={700} height={240} viewBox="0 0 700 240">
      <polyline
        points="20,20 120,110 220,200 320,210 420,215 520,218 680,220"
        fill="none"
        stroke={C.purple}
        strokeWidth={14}
      />
      <circle
        cx={220}
        cy={200}
        r={34}
        fill="none"
        stroke={C.yellow}
        strokeWidth={8}
      />
    </svg>
  </SerieMini>
);
export const MiniNos4: React.FC = () => (
  <SerieMini n={4} accent={C.coral} {...NOSM}>
    <Grande size={180}>K-MEANS</Grande>
    <Grande size={180} color={C.coral}>
      FALLA
    </Grande>
    <svg width={700} height={260} viewBox="0 0 700 260">
      <path
        d="M40 200 Q170 -40 330 160"
        fill="none"
        stroke={C.coral}
        strokeWidth={30}
        strokeLinecap="round"
      />
      <path
        d="M330 80 Q480 320 660 60"
        fill="none"
        stroke={C.green}
        strokeWidth={30}
        strokeLinecap="round"
      />
    </svg>
  </SerieMini>
);
export const MiniNos5: React.FC = () => (
  <SerieMini n={5} accent={C.purple} {...NOSM}>
    <Grande size={180}>4D → 2D</Grande>
    <Grande size={190} color={C.purple}>
      88%
    </Grande>
  </SerieMini>
);
export const MiniNos6: React.FC = () => (
  <SerieMini n={6} accent={C.coral} {...NOSM}>
    <Grande size={250} color={C.green}>
      12/12
    </Grande>
    <Grande size={170} color={C.coral}>
      RARAS
    </Grande>
  </SerieMini>
);
export const MiniNos7: React.FC = () => (
  <SerieMini n={7} accent={C.purple} {...NOSM}>
    <Grande size={180}>LATTE +</Grande>
    <Grande size={180} color={C.purple}>
      ¿QUÉ?
    </Grande>
    <Grande size={150} color={C.yellow}>
      1.57×
    </Grande>
  </SerieMini>
);
export const MiniFinal: React.FC = () => (
  <Fondo accent={C.green}>
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: 44,
        color: C.ink,
        border: `4px solid ${C.green}`,
        borderRadius: 40,
        padding: "10px 28px",
      }}
    >
      APRENDIZAJE AUTOMÁTICO
    </div>
    <Grande size={200} color={C.green}>
      GRAN
    </Grande>
    <Grande size={200} color={C.green}>
      FINAL
    </Grande>
    <div style={{ display: "flex", gap: 30 }}>
      <Grande size={130} color="#ff9f43">
        98%
      </Grande>
      <Grande size={130}>vs</Grande>
      <Grande size={130} color={C.purple}>
        92%
      </Grande>
    </div>
  </Fondo>
);

// ---------- Sueltos 7-9 ----------
export const Mini7SimpsonFutbol: React.FC = () => (
  <Fondo accent={C.green}>
    <Grande size={190}>¿A QUIÉN</Grande>
    <Grande size={190} color={C.green}>
      FICHAS?
    </Grande>
    <div
      style={{
        display: "flex",
        gap: 40,
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: 120,
      }}
    >
      <span style={{ color: C.blue }}>A</span>
      <span style={{ color: C.dim }}>vs</span>
      <span style={{ color: C.purple }}>B</span>
    </div>
  </Fondo>
);
export const Mini8ParadaF1: React.FC = () => (
  <Fondo accent={C.coral}>
    <Grande size={220}>¿99%</Grande>
    <Grande size={220} color={C.coral}>
      BASTA?
    </Grande>
    <div
      style={{
        fontFamily: MONO,
        fontWeight: 700,
        fontSize: 90,
        color: C.yellow,
      }}
    >
      0.99²⁰ = 82%
    </div>
  </Fondo>
);
export const Mini9Matriz: React.FC = () => (
  <Fondo accent={C.purple}>
    <Grande size={200}>TÚ ×</Grande>
    <Grande size={200} color={C.purple}>
      CANCIÓN
    </Grande>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 150px)",
        gap: 10,
      }}
    >
      {["5", "4.7", "1", "?", "4", "5", "1", "0"].map((v, i) => (
        <div
          key={i}
          style={{
            height: 120,
            borderRadius: 16,
            background: i === 1 ? C.green : C.bg2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: MONO,
            fontSize: 56,
            color: i === 1 ? C.bg : C.ink,
          }}
        >
          {v}
        </div>
      ))}
    </div>
  </Fondo>
);

export const Mini10Imagen: React.FC = () => (
  <Fondo accent={C.yellow}>
    <Grande size={190}>6,220,800</Grande>
    <BalonMitad lado={52} />
    <Grande size={170} color={C.yellow}>
      CERO MAGIA
    </Grande>
  </Fondo>
);

export const MiniVision2: React.FC = () => (
  <Fondo accent="#ffff00">
    <Grande size={220} color="#ffff00">
      SOLO
    </Grande>
    <div
      style={{
        position: "relative",
        width: 760,
        height: 620,
        borderRadius: 40,
        background: "rgb(255,255,0)",
      }}
    >
      <Lupa x={380} y={300} d={480} />
    </div>
    <Grande size={200}>3 LUCES</Grande>
  </Fondo>
);
