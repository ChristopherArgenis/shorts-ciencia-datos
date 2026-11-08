import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Sfx, Stage, Sticker, Words } from "../../kit/kit";
import { C, FONT } from "../../kit/theme";
import {
  Avance,
  Capitulo,
  duracionTotal,
  Nota,
  prog,
  SERIE_PRACTICA,
} from "../../kit/serie";
import { LogoCafe } from "./cafe";

// Parte 1: El ciclo de un proyecto de datos (caso ficticio: Café Datos).
const PASOS: [string, string][] = [
  ["Pregunta", C.yellow],
  ["Datos", C.blue],
  ["Limpieza", C.purple],
  ["Exploración", C.green],
  ["Análisis", C.coral],
  ["Comunicar", C.yellow],
];

/** Pasos en círculo; activos = cuántos se ven; regreso = flecha de vuelta (0..1). */
const Ciclo: React.FC<{ activos: number; regreso?: number }> = ({
  activos,
  regreso = 0,
}) => {
  const R = 300;
  const cx = 440;
  const cy = 360;
  const pts = PASOS.map((_, i) => {
    const a = (i / PASOS.length) * Math.PI * 2 - Math.PI / 2;
    return [cx + R * Math.cos(a), cy + R * Math.sin(a)];
  });
  return (
    <div style={{ position: "relative", width: 880, height: 720 }}>
      <svg
        width={880}
        height={720}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        {pts.map(([x, y], i) => {
          const [x2, y2] = pts[(i + 1) % pts.length];
          if (
            i >= activos - 1 &&
            !(i === pts.length - 1 && activos >= pts.length)
          )
            return null;
          return (
            <line
              key={i}
              x1={x}
              y1={y}
              x2={x2}
              y2={y2}
              stroke={C.dim}
              strokeWidth={6}
              strokeDasharray="14 10"
            />
          );
        })}
        {regreso > 0 ? (
          <path
            d={`M ${pts[3][0]} ${pts[3][1]} Q ${cx} ${cy} ${pts[2][0]} ${pts[2][1]}`}
            fill="none"
            stroke={C.coral}
            strokeWidth={10}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - regreso}
          />
        ) : null}
      </svg>
      {PASOS.map(([t, c], i) => {
        const on = i < activos;
        return (
          <div
            key={t}
            style={{
              position: "absolute",
              left: pts[i][0] - 160,
              top: pts[i][1] - 50,
              width: 320,
              height: 100,
              borderRadius: 50,
              background: on ? c : C.bg2,
              color: on ? C.bg : C.dim,
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              scale: on ? 1 : 0.85,
            }}
          >
            {i + 1}. {t}
          </div>
        );
      })}
    </div>
  );
};

const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [40, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <Stage gap={40}>
      <Words
        text="La mayor parte del trabajo *no* son los modelos"
        size={86}
        stagger={1}
        accent={C.coral}
      />
      <div
        style={{
          width: 860,
          height: 110,
          borderRadius: 55,
          background: C.bg2,
          overflow: "hidden",
          display: "flex",
        }}
      >
        <div
          style={{
            width: `${78 * v}%`,
            background: C.green,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 40,
            color: C.bg,
          }}
        >
          datos y preparación
        </div>
        <div
          style={{
            flex: 1,
            background: C.purple,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 34,
            color: C.bg,
            opacity: v,
          }}
        >
          modelo
        </div>
      </div>
      <Nota>
        Dicho popular entre científicos de datos · proporción ilustrativa
      </Nota>
      <Sfx src="whoosh.wav" at={40} volume={0.3} />
    </Stage>
  );
};

const Caso: React.FC = () => (
  <Stage gap={50}>
    <LogoCafe size={140} />
    <Words text="quiere *vender* *más*" size={92} delay={15} accent={C.green} />
    <Sticker delay={60} bg={C.yellow}>
      Lo seguiremos en las 10 partes
    </Sticker>
    <Nota>Café ficticio · datos de ejemplo</Nota>
    <Sfx src="pop.wav" at={60} />
  </Stage>
);

const Primeros: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={20}>
      <Words text="El *ciclo* de un proyecto" size={84} accent={C.green} />
      <Ciclo activos={Math.min(3, 1 + Math.floor(prog(frame, 10, 90) * 3))} />
      {[10, 50, 90].map((t) => (
        <Sfx key={t} src="tick.wav" at={t} />
      ))}
    </Stage>
  );
};

const Resto: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={20}>
      <Words text="…hasta tomar una *decisión*" size={84} accent={C.yellow} />
      <Ciclo
        activos={3 + Math.min(3, Math.floor(prog(frame, 10, 100) * 3 + 0.001))}
      />
      {[10, 50, 90].map((t) => (
        <Sfx key={t} src="tick.wav" at={t} />
      ))}
    </Stage>
  );
};

const Vueltas: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={20}>
      <Words
        text="Y casi nunca es una *línea* *recta*"
        size={84}
        accent={C.coral}
      />
      <Ciclo activos={6} regreso={prog(frame, 30, 80)} />
      <Sticker delay={90} bg={C.coral} color={C.ink}>
        Explorando, descubres datos sucios → vuelves a limpiar
      </Sticker>
      <Sfx src="whoosh.wav" at={30} volume={0.35} />
    </Stage>
  );
};

export const DUR_P1 = [200, 185, 165, 180, 200, 165];

export const Prac1Ciclo: React.FC = () => (
  <Capitulo
    parte={1}
    short="prac1"
    serie={SERIE_PRACTICA}
    acento={C.green}
    escenas={[
      { nombre: "Gancho", dur: DUR_P1[0], voz: "k1", el: <Gancho /> },
      { nombre: "Café Datos", dur: DUR_P1[1], voz: "k2", el: <Caso /> },
      { nombre: "Pasos 1-3", dur: DUR_P1[2], voz: "k3", el: <Primeros /> },
      { nombre: "Pasos 4-6", dur: DUR_P1[3], voz: "k4", el: <Resto /> },
      { nombre: "Vueltas", dur: DUR_P1[4], voz: "k5", el: <Vueltas /> },
      {
        nombre: "Avance",
        dur: DUR_P1[5],
        voz: "k6",
        el: (
          <Avance
            parte={2}
            tema="La pregunta correcta"
            gancho="¿'Vender más' es una *pregunta*?"
          />
        ),
      },
    ]}
  />
);

export const TOTAL_P1 = duracionTotal(DUR_P1);
