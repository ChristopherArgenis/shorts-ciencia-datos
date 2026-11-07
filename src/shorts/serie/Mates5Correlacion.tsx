import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Sfx, Stage, Sticker, Words, useIn } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import {
  Avance,
  Capitulo,
  Dispersion,
  duracionTotal,
  fmt,
  Formula,
  Nota,
  prog,
  Tarjeta,
} from "../../kit/serie";

// Parte 5: Correlación ≠ causalidad. Datos mensuales ilustrativos (ejemplo simplificado).
const HELADOS = [22, 25, 31, 40, 52, 63, 70, 67, 55, 41, 30, 24]; // miles vendidos
const AHOGADOS = [4, 3, 6, 6, 10, 9, 14, 11, 8, 9, 4, 5]; // casos

const pearson = (a: number[], b: number[]) => {
  const n = a.length;
  const ma = a.reduce((s, x) => s + x, 0) / n;
  const mb = b.reduce((s, x) => s + x, 0) / n;
  let num = 0;
  let da = 0;
  let db = 0;
  for (let i = 0; i < n; i++) {
    num += (a[i] - ma) * (b[i] - mb);
    da += (a[i] - ma) ** 2;
    db += (b[i] - mb) ** 2;
  }
  return num / Math.sqrt(da * db);
};
const R = pearson(HELADOS, AHOGADOS); // ≈ 0.92

const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={40}>
      <Words
        text="Suben los helados… suben los *ahogados*"
        size={88}
        stagger={1}
        accent={C.coral}
      />
      <div style={{ display: "flex", gap: 30 }}>
        {[
          ["Helados", HELADOS, C.yellow],
          ["Ahogados", AHOGADOS, C.coral],
        ].map(([t, serie, c]) => {
          const s = serie as number[];
          const mx = Math.max(...s);
          return (
            <div
              key={t as string}
              style={{
                width: 420,
                background: C.bg2,
                borderRadius: 26,
                padding: 20,
              }}
            >
              <div
                style={{
                  fontFamily: FONT,
                  fontWeight: 900,
                  fontSize: 46,
                  color: c as string,
                  textAlign: "center",
                }}
              >
                {t as string} ↑
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 6,
                  height: 220,
                  marginTop: 10,
                }}
              >
                {s.map((v, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height:
                        210 * (v / mx) * prog(frame, 15 + i * 3, 30 + i * 3),
                      background: c as string,
                      borderRadius: 6,
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 26,
                  color: C.dim,
                  textAlign: "center",
                  marginTop: 8,
                }}
              >
                ene → dic
              </div>
            </div>
          );
        })}
      </div>
      <Sticker delay={75} bg={C.coral} color={C.ink}>
        ¿El helado es peligroso?
      </Sticker>
      <Nota>Ejemplo simplificado</Nota>
      <Sfx src="pop.wav" at={75} />
    </Stage>
  );
};

const Grafica: React.FC = () => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [90, 130], [0, R], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <Stage gap={30}>
      <Words text="Si los *graficas* juntos…" size={84} accent={C.yellow} />
      <Dispersion
        xs={HELADOS}
        ys={AHOGADOS}
        xr={[15, 75]}
        yr={[0, 16]}
        xLabel="Helados (miles)"
        yLabel="Ahogados"
        color={C.coral}
        aparicion={prog(frame, 15, 75)}
      />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 120,
          color: C.yellow,
          opacity: prog(frame, 85, 95),
        }}
      >
        r = {fmt(v, 2)}
      </div>
      <Sfx src="ding.wav" at={130} volume={0.35} />
    </Stage>
  );
};

const Escala: React.FC = () => {
  const frame = useCurrentFrame();
  const marca = interpolate(frame, [70, 120], [0, R], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const W = 860;
  const x = (r: number) => 30 + ((W - 60) * (r + 1)) / 2;
  return (
    <Stage gap={40}>
      <Words text="La *correlación* (r)" size={96} accent={C.yellow} />
      <Formula delay={10} size={54}>
        −1 ≤ r ≤ 1
      </Formula>
      <svg width={W} height={220} viewBox={`0 0 ${W} 220`}>
        <defs>
          <linearGradient id="g-r" x1="0" x2="1">
            <stop offset="0" stopColor={C.blue} />
            <stop offset="0.5" stopColor={C.dim} />
            <stop offset="1" stopColor={C.coral} />
          </linearGradient>
        </defs>
        <rect
          x={30}
          y={90}
          width={W - 60}
          height={30}
          rx={15}
          fill="url(#g-r)"
        />
        {[
          [-1, "−1: opuestas"],
          [0, "0: nada"],
          [1, "1: juntas"],
        ].map(([r, t]) => (
          <text
            key={r as number}
            x={(r as number) < 0 ? 30 : (r as number) > 0 ? 830 : x(0)}
            y={170}
            fill={C.ink}
            fontFamily={FONT}
            fontWeight={800}
            fontSize={34}
            textAnchor={(r as number) < 0 ? "start" : (r as number) > 0 ? "end" : "middle"}
          >
            {t as string}
          </text>
        ))}
        <g opacity={prog(frame, 70, 78)}>
          <polygon
            points={`${x(marca) - 18},40 ${x(marca) + 18},40 ${x(marca)},80`}
            fill={C.yellow}
          />
          <text
            x={x(marca)}
            y={30}
            fill={C.yellow}
            fontFamily={FONT}
            fontWeight={900}
            fontSize={40}
            textAnchor="middle"
          >
            {fmt(marca, 2)}
          </text>
        </g>
      </svg>
      <Words
        text="Solo dice si se mueven *juntas*… no por qué."
        size={62}
        weight={800}
        delay={120}
        accent={C.yellow}
      />
    </Stage>
  );
};

const TerceraVariable: React.FC = () => {
  const frame = useCurrentFrame();
  const sol = useIn(30, 10);
  const flechas = prog(frame, 70, 100);
  return (
    <Stage gap={30}>
      <Words text="La variable *escondida*" size={92} accent={C.coral} />
      <div style={{ position: "relative", width: 880, height: 620 }}>
        <div
          style={{
            position: "absolute",
            left: 290,
            top: 0,
            width: 300,
            textAlign: "center",
            scale: sol,
            opacity: sol,
          }}
        >
          <svg width={200} height={200} viewBox="0 0 100 100">
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
          <div
            style={{
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 64,
              color: C.yellow,
            }}
          >
            Calor
          </div>
        </div>
        <svg
          width={880}
          height={620}
          style={{ position: "absolute", left: 0, top: 0 }}
        >
          <line
            x1={400}
            y1={300}
            x2={400 - 230 * flechas}
            y2={300 + 160 * flechas}
            stroke={C.yellow}
            strokeWidth={10}
            strokeLinecap="round"
          />
          <line
            x1={480}
            y1={300}
            x2={480 + 230 * flechas}
            y2={300 + 160 * flechas}
            stroke={C.yellow}
            strokeWidth={10}
            strokeLinecap="round"
          />
          <line
            x1={250}
            y1={540}
            x2={630}
            y2={540}
            stroke={C.dim}
            strokeWidth={6}
            strokeDasharray="14 12"
            opacity={prog(frame, 110, 125)}
          />
          <text
            x={440}
            y={525}
            fill={C.dim}
            fontFamily={FONT}
            fontWeight={800}
            fontSize={34}
            textAnchor="middle"
            opacity={prog(frame, 110, 125)}
          >
            solo correlación
          </text>
        </svg>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 470,
            width: 260,
            textAlign: "center",
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 56,
            color: C.ink,
            opacity: flechas,
          }}
        >
          Helados
        </div>
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 470,
            width: 300,
            textAlign: "center",
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 56,
            color: C.ink,
            opacity: flechas,
          }}
        >
          Nadar más
        </div>
      </div>
      <Sticker delay={150} bg={C.yellow}>
        Correlación ≠ causalidad
      </Sticker>
      <Sfx src="whoosh.wav" at={70} volume={0.35} />
      <Sfx src="pop.wav" at={150} />
    </Stage>
  );
};

const Aplicacion: React.FC = () => (
  <Stage gap={30}>
    <Words
      text="Así lo cuida un *científico* *de* *datos*"
      size={78}
      accent={C.yellow}
    />
    <Tarjeta
      titulo="Busca la causa escondida"
      texto="clima, temporada, edad, precio…"
      color={C.coral}
      delay={20}
    />
    <Tarjeta
      titulo="Prueba A/B"
      texto="dos grupos al azar: uno con el cambio, otro sin él"
      color={C.green}
      delay={50}
    />
    <Tarjeta
      titulo="Decide con el experimento"
      texto="no con una correlación sola"
      color={C.blue}
      delay={80}
    />
    {[20, 50, 80].map((t) => (
      <Sfx key={t} src="pop.wav" at={t} />
    ))}
  </Stage>
);

export const DUR_M5 = [185, 200, 200, 220, 200, 150];

export const Mates5Correlacion: React.FC = () => (
  <Capitulo
    parte={5}
    short="mates5"
    acento={C.yellow}
    escenas={[
      { nombre: "Gancho", dur: DUR_M5[0], voz: "c1", el: <Gancho /> },
      { nombre: "Gráfica", dur: DUR_M5[1], voz: "c2", el: <Grafica /> },
      { nombre: "Escala", dur: DUR_M5[2], voz: "c3", el: <Escala /> },
      {
        nombre: "Tercera variable",
        dur: DUR_M5[3],
        voz: "c4",
        el: <TerceraVariable />,
      },
      { nombre: "Aplicación", dur: DUR_M5[4], voz: "c5", el: <Aplicacion /> },
      {
        nombre: "Avance",
        dur: DUR_M5[5],
        voz: "c6",
        el: (
          <Avance
            parte={6}
            tema="Regresión lineal"
            gancho="¿Y si una línea pudiera *predecir*?"
          />
        ),
      },
    ]}
  />
);

export const TOTAL_M5 = duracionTotal(DUR_M5);
