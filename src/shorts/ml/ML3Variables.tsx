import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Sfx, Stage, Words, useIn } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import {
  Capitulo,
  Codigo,
  duracionTotal,
  fmt,
  Nota,
  prog,
  SERIE_ML,
  Tarjeta,
} from "../../kit/serie";
import { AvanceML, NARANJA, ORO, Respuesta, Reto } from "../../kit/ml";
import datos from "../../datos/ml_tronco.json";

// Tronco 3: Variables. Errores reales de scripts/ml/tronco.py (datos ficticios de Café Datos).
const D = datos.p3;

/** El "modelo" como caja que recibe columnas de entrada. */
const Modelo: React.FC<{
  entradas: { t: string; c: string; nueva?: boolean }[];
  delay?: number;
}> = ({ entradas, delay = 0 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {entradas.map((e, i) => (
          <div
            key={e.t}
            style={{
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 40,
              color: C.bg,
              background: e.c,
              borderRadius: 18,
              padding: "12px 24px",
              opacity: prog(frame, delay + i * 10, delay + i * 10 + 10),
              outline: e.nueva ? `6px solid ${C.ink}` : "none",
            }}
          >
            {e.t}
          </div>
        ))}
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 80,
          color: C.dim,
        }}
      >
        →
      </div>
      <div
        style={{
          width: 230,
          height: 230,
          borderRadius: 40,
          background: C.bg2,
          border: `6px solid ${ORO}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 44,
          color: ORO,
        }}
      >
        modelo
      </div>
    </div>
  );
};

const Gancho: React.FC = () => {
  const p = useIn(30, 10);
  return (
    <Stage gap={40}>
      <Words
        text="El modelo no ve la *lluvia*…"
        size={92}
        stagger={1}
        accent={C.blue}
      />
      <svg width={300} height={260} viewBox="0 0 100 86" style={{ opacity: p }}>
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
      <Words
        text="…a menos que *se* *la* *des*"
        size={80}
        delay={45}
        accent={ORO}
      />
    </Stage>
  );
};

const RetoEsc: React.FC = () => (
  <Stage gap={40}>
    <Reto pregunta="¿Qué dato le falta a este modelo?" />
    <Modelo
      entradas={[
        { t: "temperatura", c: C.coral },
        { t: "¿fin de semana?", c: C.green },
      ]}
      delay={30}
    />
  </Stage>
);

const SinLluvia: React.FC = () => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [70, 110], [0, D.mae_sin_lluvia], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <Stage gap={40}>
      <Modelo
        entradas={[
          { t: "temperatura", c: C.coral },
          { t: "¿fin de semana?", c: C.green },
        ]}
      />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 52,
          color: C.dim,
        }}
      >
        error al predecir ventas
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 170,
          color: C.coral,
        }}
      >
        ± {fmt(v, 1)}
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 46,
          color: C.dim,
        }}
      >
        tazas al día
      </div>
      <Nota>Datos ficticios de Café Datos · modelo entrenado de verdad</Nota>
    </Stage>
  );
};

const ConLluvia: React.FC = () => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [40, 80], [D.mae_sin_lluvia, D.mae_con_lluvia], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  return (
    <Stage gap={40}>
      <Modelo
        entradas={[
          { t: "temperatura", c: C.coral },
          { t: "¿fin de semana?", c: C.green },
          { t: "¿llovió?", c: C.blue, nueva: true },
        ]}
      />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 170,
          color: C.green,
        }}
      >
        ± {fmt(v, 1)}
      </div>
      <Respuesta texto="¡la lluvia!" delay={85} />
      <Sfx src="ding.wav" at={80} volume={0.4} />
    </Stage>
  );
};

const Importancia: React.FC = () => (
  <Stage gap={28}>
    <Words text="Datos de entrada = *variables*" size={84} accent={ORO} />
    <Tarjeta
      titulo="Elegirlas"
      texto="¿qué información real ayuda a predecir?"
      color={ORO}
      delay={20}
    />
    <Tarjeta
      titulo="Crearlas"
      texto="de una fecha sale '¿es fin de semana?' o '¿es quincena?'"
      color={NARANJA}
      delay={55}
    />
    <Codigo
      lineas={['df["finde"] = df["fecha"].dt.dayofweek >= 5']}
      delay={100}
      size={30}
    />
    <div style={{ fontFamily: MONO, fontSize: 30, color: C.dim }}>
      el modelo aprendió: lluvia = {fmt(D.coef.lluvia, 0)} tazas
    </div>
    <Sfx src="pop.wav" at={20} />
    <Sfx src="pop.wav" at={55} />
  </Stage>
);

export const DUR_ML3 = [140, 130, 225, 150, 245, 195];

export const ML3Variables: React.FC = () => (
  <Capitulo
    parte={3}
    short="ml3"
    serie={SERIE_ML}
    acento={C.blue}
    escenas={[
      { nombre: "Gancho", dur: DUR_ML3[0], voz: "d1", el: <Gancho /> },
      { nombre: "Reto", dur: DUR_ML3[1], voz: "d2", el: <RetoEsc /> },
      { nombre: "Sin lluvia", dur: DUR_ML3[2], voz: "d3", el: <SinLluvia /> },
      { nombre: "Con lluvia", dur: DUR_ML3[3], voz: "d4", el: <ConLluvia /> },
      { nombre: "Variables", dur: DUR_ML3[4], voz: "d5", el: <Importancia /> },
      {
        nombre: "Mapa",
        dur: DUR_ML3[5],
        voz: "d6",
        el: (
          <AvanceML
            actual="T3"
            siguiente="S1"
            tema="Aprendizaje supervisado"
            color={NARANJA}
          />
        ),
      },
    ]}
  />
);

export const TOTAL_ML3 = duracionTotal(DUR_ML3);
