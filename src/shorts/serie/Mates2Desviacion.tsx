import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Sfx, Stage, Sticker, Words, useIn } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import {
  Avance,
  Capitulo,
  duracionTotal,
  fmt,
  Formula,
  Nota,
  prog,
} from "../../kit/serie";

// Parte 2: Desviación estándar. Tiempos de entrega ilustrativos (ejemplo simplificado).
const A = [29, 30, 31, 30, 30];
const B = [10, 50, 15, 45, 30];
const media = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
const sd = (xs: number[]) => {
  const m = media(xs);
  return Math.sqrt(xs.reduce((a, x) => a + (x - m) ** 2, 0) / xs.length);
};
const SD_A = sd(A); // ≈ 0.63
const SD_B = sd(B); // ≈ 15.81

const W = 860;
const xEje = (min: number) => 40 + ((W - 80) * min) / 60;

/** Recta numérica de 0 a 60 minutos con las entregas como puntos. */
const Recta: React.FC<{
  datos: number[];
  color: string;
  nombre: string;
  delay: number;
  desvios?: number;
}> = ({ datos, color, nombre, delay, desvios = 0 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ width: W }}>
      <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 52, color }}>
        {nombre}
      </div>
      <svg width={W} height={170} viewBox={`0 0 ${W} 170`}>
        <line
          x1={40}
          y1={110}
          x2={W - 40}
          y2={110}
          stroke={C.dim}
          strokeWidth={4}
        />
        {[0, 10, 20, 30, 40, 50, 60].map((m) => (
          <g key={m}>
            <line
              x1={xEje(m)}
              y1={102}
              x2={xEje(m)}
              y2={118}
              stroke={C.dim}
              strokeWidth={3}
            />
            <text
              x={xEje(m)}
              y={158}
              fill={C.dim}
              fontFamily={MONO}
              fontSize={28}
              textAnchor="middle"
            >
              {m}
            </text>
          </g>
        ))}
        <line
          x1={xEje(30)}
          y1={20}
          x2={xEje(30)}
          y2={110}
          stroke={C.yellow}
          strokeWidth={4}
          strokeDasharray="10 8"
        />
        {datos.map((d, i) => {
          const p = prog(frame, delay + i * 5, delay + i * 5 + 10);
          const y =
            80 -
            datos.slice(0, i).filter((x) => Math.abs(x - d) < 1.5).length * 30;
          return (
            <g key={i}>
              {desvios > 0 ? (
                <line
                  x1={xEje(30)}
                  y1={y}
                  x2={xEje(30) + (xEje(d) - xEje(30)) * desvios}
                  y2={y}
                  stroke={C.coral}
                  strokeWidth={6}
                />
              ) : null}
              <circle
                cx={xEje(d)}
                cy={y}
                r={16 * p}
                fill={color}
                stroke="#0b1020"
                strokeWidth={3}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const Gancho: React.FC = () => (
  <Stage gap={40}>
    <Words
      text="Dos repartidores. Mismo promedio: *30* *min*"
      size={84}
      stagger={1}
    />
    <div style={{ display: "flex", gap: 30 }}>
      {[
        ["A", C.green],
        ["B", C.coral],
      ].map(([n, c], i) => (
        <Tarjeta
          key={n}
          nombre={`Repartidor ${n}`}
          color={c}
          delay={15 + i * 10}
        />
      ))}
    </div>
    <Sticker delay={60} bg={C.yellow}>
      ¿En cuál confías?
    </Sticker>
    <Sfx src="pop.wav" at={60} />
  </Stage>
);

const Tarjeta: React.FC<{ nombre: string; color: string; delay: number }> = ({
  nombre,
  color,
  delay,
}) => {
  const p = useIn(delay, 12);
  return (
    <div
      style={{
        width: 410,
        background: C.bg2,
        borderRadius: 28,
        padding: "34px 20px",
        borderTop: `12px solid ${color}`,
        textAlign: "center",
        fontFamily: FONT,
        opacity: p,
        scale: 0.8 + 0.2 * p,
      }}
    >
      <div style={{ fontWeight: 900, fontSize: 54, color }}>{nombre}</div>
      <div
        style={{ fontWeight: 800, fontSize: 40, color: C.dim, marginTop: 10 }}
      >
        promedio
      </div>
      <div style={{ fontWeight: 900, fontSize: 110, color: C.ink }}>30</div>
      <div style={{ fontWeight: 800, fontSize: 40, color: C.dim }}>minutos</div>
    </div>
  );
};

const Entregas: React.FC = () => (
  <Stage gap={40}>
    <Words text="Sus últimas 5 entregas" size={84} />
    <Recta datos={A} color={C.green} nombre="Repartidor A" delay={15} />
    <Recta datos={B} color={C.coral} nombre="Repartidor B" delay={45} />
    <Words
      text="Mismo promedio, historias *muy* distintas."
      size={60}
      weight={800}
      delay={90}
      accent={C.yellow}
    />
    <Nota>Ejemplo simplificado · minutos</Nota>
  </Stage>
);

const Formula2: React.FC = () => {
  const frame = useCurrentFrame();
  const d = prog(frame, 60, 100);
  return (
    <Stage gap={34}>
      <Words text="La *desviación* *estándar*" size={90} accent={C.yellow} />
      <Formula delay={10} size={52}>
        σ = √( Σ(x − μ)² / n )
      </Formula>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 42,
          color: C.ink,
        }}
      >
        {[
          "1. Distancia de cada dato al promedio",
          "2. Al cuadrado (para que no se cancelen)",
          "3. Promedias esas distancias",
          "4. Sacas raíz",
        ].map((t, i) => (
          <div
            key={t}
            style={{ opacity: prog(frame, 30 + i * 12, 40 + i * 12) }}
          >
            {t}
          </div>
        ))}
      </div>
      <Recta
        datos={B}
        color={C.coral}
        nombre="Repartidor B: distancias"
        delay={0}
        desvios={d}
      />
    </Stage>
  );
};

const Resultado: React.FC = () => {
  const frame = useCurrentFrame();
  const a = interpolate(frame, [20, 60], [0, SD_A], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const b = interpolate(frame, [40, 85], [0, SD_B], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <Stage gap={40}>
      <Words text="Resultado" size={100} />
      <div style={{ display: "flex", gap: 30 }}>
        {[
          ["A", a, C.green, "siempre ~30 min"],
          ["B", b, C.coral, "de 10 a 50 min"],
        ].map(([n, v, c, txt]) => (
          <div
            key={n as string}
            style={{
              width: 410,
              background: C.bg2,
              borderRadius: 28,
              padding: "30px 18px",
              textAlign: "center",
              fontFamily: FONT,
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 50, color: c as string }}>
              Repartidor {n as string}
            </div>
            <div style={{ fontWeight: 900, fontSize: 104, color: C.ink }}>
              σ {fmt(v as number, 1)}
            </div>
            <div style={{ fontWeight: 800, fontSize: 38, color: C.dim }}>
              min · {txt as string}
            </div>
          </div>
        ))}
      </div>
      <Sticker delay={100} bg={C.green} color={C.bg}>
        Confía en el de σ más pequeña
      </Sticker>
      <Sfx src="ding.wav" at={85} volume={0.35} />
    </Stage>
  );
};

const Uso: React.FC<{
  titulo: string;
  texto: string;
  color: string;
  delay: number;
}> = ({ titulo, texto, color, delay }) => {
  const p = useIn(delay, 12);
  return (
    <div
      style={{
        width: 880,
        background: C.bg2,
        borderRadius: 26,
        padding: "26px 32px",
        borderLeft: `12px solid ${color}`,
        opacity: p,
        translate: `${(1 - p) * 80}px 0px`,
        fontFamily: FONT,
      }}
    >
      <div style={{ fontWeight: 900, fontSize: 58, color: C.ink }}>
        {titulo}
      </div>
      <div
        style={{ fontWeight: 600, fontSize: 40, color: C.dim, marginTop: 6 }}
      >
        {texto}
      </div>
    </div>
  );
};

const Aplicacion: React.FC = () => (
  <Stage gap={30}>
    <Words
      text="Así la usa un *científico* *de* *datos*"
      size={80}
      accent={C.yellow}
    />
    <Uso
      titulo="Entregas y servicios"
      texto="qué tan predecible es el tiempo de espera"
      color={C.green}
      delay={20}
    />
    <Uso
      titulo="Control de calidad"
      texto="si las piezas de una fábrica salen parejas"
      color={C.blue}
      delay={45}
    />
    <Uso
      titulo="Finanzas"
      texto="la volatilidad de una inversión es su desviación"
      color={C.coral}
      delay={70}
    />
    <Sfx src="pop.wav" at={20} />
    <Sfx src="pop.wav" at={45} />
    <Sfx src="pop.wav" at={70} />
  </Stage>
);

export const DUR_M2 = [200, 190, 200, 180, 175, 150];

export const Mates2Desviacion: React.FC = () => (
  <Capitulo
    parte={2}
    short="mates2"
    acento={C.coral}
    escenas={[
      { nombre: "Gancho", dur: DUR_M2[0], voz: "d1", el: <Gancho /> },
      { nombre: "Entregas", dur: DUR_M2[1], voz: "d2", el: <Entregas /> },
      { nombre: "Fórmula", dur: DUR_M2[2], voz: "d3", el: <Formula2 /> },
      { nombre: "Resultado", dur: DUR_M2[3], voz: "d4", el: <Resultado /> },
      { nombre: "Aplicación", dur: DUR_M2[4], voz: "d5", el: <Aplicacion /> },
      {
        nombre: "Avance",
        dur: DUR_M2[5],
        voz: "d6",
        el: (
          <Avance
            parte={3}
            tema="Distribución normal"
            gancho="¿Y si un dato cae *muy* lejos?"
          />
        ),
      },
    ]}
  />
);

export const TOTAL_M2 = duracionTotal(DUR_M2);
