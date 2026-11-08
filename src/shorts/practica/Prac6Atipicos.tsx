import React from "react";
import { useCurrentFrame } from "remotion";
import { Sfx, Stage, Sticker, Words } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import {
  Avance,
  Capitulo,
  Codigo,
  duracionTotal,
  fmt,
  Formula,
  Nota,
  prog,
  SERIE_PRACTICA,
  Tarjeta,
} from "../../kit/serie";

// Parte 6: Datos atípicos con la regla del rango intercuartílico (IQR). Tickets ficticios.
const TICKETS = [45, 55, 60, 62, 70, 75, 80, 85, 90, 95, 110, 120];
const ATIPICO = 15000;
const cuantil = (xs: number[], q: number) => {
  const s = [...xs].sort((a, b) => a - b);
  const pos = (s.length - 1) * q;
  const lo = Math.floor(pos);
  return s[lo] + (s[Math.ceil(pos)] - s[lo]) * (pos - lo);
};
const TODOS = [...TICKETS, ATIPICO];
const Q1 = cuantil(TODOS, 0.25); // 62
const Q3 = cuantil(TODOS, 0.75); // 95
const IQR = Q3 - Q1; // 33
const LIM_SUP = Q3 + 1.5 * IQR; // 144.5

/** Recta de 0 a 200 con los tickets y la caja de bigotes. */
const Caja: React.FC<{ caja?: number; limite?: number; flecha?: number }> = ({
  caja = 0,
  limite = 0,
  flecha = 0,
}) => {
  const W = 880;
  const x = (v: number) => 40 + ((W - 120) * v) / 200;
  return (
    <svg width={W} height={320} viewBox={`0 0 ${W} 320`}>
      <line
        x1={40}
        y1={220}
        x2={W - 80}
        y2={220}
        stroke={C.dim}
        strokeWidth={4}
      />
      {[0, 50, 100, 150, 200].map((v) => (
        <text
          key={v}
          x={x(v)}
          y={262}
          fill={C.dim}
          fontFamily={MONO}
          fontSize={28}
          textAnchor="middle"
        >
          ${v}
        </text>
      ))}
      {caja > 0 ? (
        <g opacity={caja}>
          <rect
            x={x(Q1)}
            y={70}
            width={x(Q3) - x(Q1)}
            height={90}
            rx={10}
            fill={`${C.green}40`}
            stroke={C.green}
            strokeWidth={5}
          />
          <text
            x={(x(Q1) + x(Q3)) / 2}
            y={55}
            fill={C.green}
            fontFamily={FONT}
            fontWeight={900}
            fontSize={32}
            textAnchor="middle"
          >
            50% central
          </text>
        </g>
      ) : null}
      {limite > 0 ? (
        <g opacity={limite}>
          <line
            x1={x(LIM_SUP)}
            y1={30}
            x2={x(LIM_SUP)}
            y2={230}
            stroke={C.coral}
            strokeWidth={6}
            strokeDasharray="14 10"
          />
          <text
            x={x(LIM_SUP) + 10}
            y={30}
            fill={C.coral}
            fontFamily={MONO}
            fontWeight={700}
            fontSize={30}
          >
            ${fmt(LIM_SUP, 1)}
          </text>
        </g>
      ) : null}
      {TICKETS.map((v, i) => (
        <circle
          key={i}
          cx={x(v)}
          cy={200 - (i % 3) * 18}
          r={13}
          fill={C.blue}
          stroke="#0b1020"
          strokeWidth={3}
        />
      ))}
      <g opacity={flecha}>
        <text
          x={W - 70}
          y={200}
          fill={C.coral}
          fontFamily={FONT}
          fontWeight={900}
          fontSize={40}
          textAnchor="end"
        >
          → $15,000
        </text>
      </g>
    </svg>
  );
};

const Gancho: React.FC = () => (
  <Stage gap={40}>
    <div
      style={{
        width: 460,
        background: "#f4f6ff",
        color: "#0b1020",
        borderRadius: 20,
        padding: "28px 32px",
        fontFamily: MONO,
        fontSize: 40,
      }}
    >
      <div style={{ fontWeight: 700, textAlign: "center" }}>CAFÉ DATOS</div>
      <div>1 Latte</div>
      <div style={{ fontWeight: 700, color: C.coral, fontSize: 64 }}>
        $15,000
      </div>
    </div>
    <Words
      text="¿Error… o el *cliente* *del* *año*?"
      size={88}
      delay={20}
      accent={C.yellow}
    />
    <Sfx src="boom.wav" at={5} volume={0.4} />
  </Stage>
);

const QueEs: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={40}>
      <Words
        text="Un dato *atípico*: muy lejos de los demás"
        size={84}
        stagger={1}
        accent={C.coral}
      />
      <Caja flecha={prog(frame, 40, 55)} />
      <Nota>Tickets ficticios de Café Datos</Nota>
    </Stage>
  );
};

const Regla: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={30}>
      <Words
        text="Regla del *rango* *intercuartílico*"
        size={82}
        accent={C.green}
      />
      <Caja caja={prog(frame, 30, 50)} />
      <Formula delay={70} size={46}>
        IQR = Q3 − Q1 = {Q3} − {Q1} = {IQR}
      </Formula>
      <Formula delay={120} size={42}>
        límite = Q3 + 1.5 · IQR = ${fmt(LIM_SUP, 1)}
      </Formula>
    </Stage>
  );
};

const Limite: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={34}>
      <Words text="Más de *$144* → se revisa" size={88} accent={C.coral} />
      <Caja
        caja={1}
        limite={prog(frame, 15, 30)}
        flecha={prog(frame, 60, 75)}
      />
      <Codigo
        lineas={[
          'q1, q3 = df["total"].quantile([.25, .75])',
          "atipicos = df[df.total > q3 + 1.5*(q3-q1)]",
        ]}
        delay={90}
        size={32}
      />
      <Sfx src="tick.wav" at={15} />
    </Stage>
  );
};

const Decidir: React.FC = () => (
  <Stage gap={30}>
    <Words text="Revisar *no* es borrar" size={96} accent={C.yellow} />
    <Tarjeta
      titulo="¿Un cero de más?"
      texto="$1,500 capturado como $15,000 → se corrige"
      color={C.coral}
      delay={25}
    />
    <Tarjeta
      titulo="¿Un pedido real?"
      texto="café para 200 invitados de una boda → es un hallazgo"
      color={C.green}
      delay={75}
    />
    <Sticker delay={130} bg={C.yellow}>
      Conecta con mates #3: el puntaje z
    </Sticker>
    {[25, 75, 130].map((t) => (
      <Sfx key={t} src="pop.wav" at={t} />
    ))}
  </Stage>
);

export const DUR_P6 = [150, 150, 250, 230, 230, 165];

export const Prac6Atipicos: React.FC = () => (
  <Capitulo
    parte={6}
    short="prac6"
    serie={SERIE_PRACTICA}
    acento={C.coral}
    escenas={[
      { nombre: "Gancho", dur: DUR_P6[0], voz: "r1", el: <Gancho /> },
      { nombre: "Qué es", dur: DUR_P6[1], voz: "r2", el: <QueEs /> },
      { nombre: "IQR", dur: DUR_P6[2], voz: "r3", el: <Regla /> },
      { nombre: "Límite", dur: DUR_P6[3], voz: "r4", el: <Limite /> },
      { nombre: "Decidir", dur: DUR_P6[4], voz: "r5", el: <Decidir /> },
      {
        nombre: "Avance",
        dur: DUR_P6[5],
        voz: "r6",
        el: (
          <Avance
            parte={7}
            tema="Transformar datos"
            gancho="¿Responder a tu jefe en *3* comandos?"
          />
        ),
      },
    ]}
  />
);

export const TOTAL_P6 = duracionTotal(DUR_P6);
