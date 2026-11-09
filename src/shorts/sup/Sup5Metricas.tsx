import React from "react";
import { useCurrentFrame } from "remotion";
import { Sfx, Stage, Sticker, Words } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import {
  Capitulo,
  Codigo,
  duracionTotal,
  durVoz,
  Nota,
  prog,
  SERIE_SUP,
} from "../../kit/serie";
import { AvanceML, Respuesta, Reto } from "../../kit/ml";
import { Grande, NAR } from "./comun";
import datos from "../../datos/ml_sup.json";

const D = datos.s5;
const S = "sup5" as const;
const [[tn, fp], [fn, tp]] = D.cm;

const Gancho = () => (
  <Stage gap={34}>
    <Grande valor={D.acc_tonto} dec={1} suf="%" color={C.green} size={200} />
    <Words
      text="de aciertos… y *nunca* detecta fraude"
      size={80}
      delay={30}
      accent={C.coral}
    />
  </Stage>
);
const RetoE = () => (
  <Stage>
    <Reto pregunta="¿Cómo puede acertar tanto y no servir?" />
  </Stage>
);
const Tonto = () => {
  const f = useCurrentFrame();
  return (
    <Stage gap={30}>
      <Words
        text="1 de cada 100 pagos es *fraude*"
        size={84}
        accent={C.coral}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 64px)",
          gap: 8,
        }}
      >
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              background: i === 57 ? C.coral : C.blue,
              opacity: prog(f, 5 + i * 0.4, 12 + i * 0.4),
            }}
          />
        ))}
      </div>
      <div
        style={{
          fontFamily: MONO,
          fontWeight: 700,
          fontSize: 46,
          color: C.ink,
          background: "#0a0d1a",
          borderRadius: 18,
          padding: "16px 26px",
          opacity: prog(f, 70, 80),
        }}
      >
        modelo: siempre "no es fraude"
      </div>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 60,
          color: C.coral,
          opacity: prog(f, 110, 125),
        }}
      >
        fraudes atrapados: 0 de {D.n_fraude}
      </div>
      <Nota>Pagos ficticios · modelos entrenados de verdad</Nota>
    </Stage>
  );
};
const Celda: React.FC<{ n: number; t: string; c: string; delay: number }> = ({
  n,
  t,
  c,
  delay,
}) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        width: 400,
        height: 220,
        borderRadius: 26,
        background: `${c}30`,
        border: `5px solid ${c}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: prog(f, delay, delay + 12),
        fontFamily: FONT,
      }}
    >
      <div style={{ fontWeight: 900, fontSize: 90, color: C.ink }}>
        {n.toLocaleString("es-MX")}
      </div>
      <div style={{ fontWeight: 800, fontSize: 34, color: c }}>{t}</div>
    </div>
  );
};
const Matriz = () => (
  <Stage gap={26}>
    <Words text="Matriz de *confusión*" size={92} accent={NAR} />
    <div
      style={{ display: "grid", gridTemplateColumns: "400px 400px", gap: 16 }}
    >
      <Celda n={tp} t="fraude atrapado" c={C.green} delay={15} />
      <Celda n={fn} t="fraude que se escapó" c={C.coral} delay={30} />
      <Celda n={fp} t="falsa alarma" c={C.yellow} delay={45} />
      <Celda n={tn} t="pago normal ✓" c={C.blue} delay={60} />
    </div>
    <Codigo
      lineas={[
        "from sklearn.metrics import confusion_matrix",
        "confusion_matrix(y_real, y_pred)",
      ]}
      delay={80}
      size={30}
    />
  </Stage>
);
const Resultado = () => (
  <Stage gap={30}>
    <div style={{ display: "flex", gap: 60 }}>
      <div style={{ textAlign: "center" }}>
        <Grande valor={D.recall} suf="%" color={C.green} size={150} />
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 40,
            color: C.ink,
          }}
        >
          exhaustividad
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 600,
            fontSize: 32,
            color: C.dim,
          }}
        >
          atrapa {tp} de {tp + fn}
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <Grande
          valor={D.precision}
          suf="%"
          color={C.yellow}
          size={150}
          delay={30}
        />
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 40,
            color: C.ink,
          }}
        >
          precisión
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 600,
            fontSize: 32,
            color: C.dim,
          }}
        >
          de {tp + fp} alarmas, {tp} reales
        </div>
      </div>
    </div>
    <Sticker delay={90} bg={C.yellow}>
      Atrapar más = más falsas alarmas
    </Sticker>
    <Respuesta texto="la exactitud engaña si hay pocos casos" delay={150} />
    <Sfx src="ding.wav" at={40} volume={0.35} />
  </Stage>
);

const E = [
  { nombre: "Gancho", voz: "e1", el: <Gancho /> },
  { nombre: "Reto", voz: "e2", el: <RetoE /> },
  { nombre: "Modelo tonto", voz: "e3", el: <Tonto />, min: 170 },
  { nombre: "Matriz", voz: "e4", el: <Matriz />, min: 170 },
  { nombre: "Resultado", voz: "e5", el: <Resultado />, min: 220 },
  {
    nombre: "Mapa",
    voz: "e6",
    el: <AvanceML actual="S5" siguiente="S6" tema="Boosting" color={NAR} />,
    min: 150,
  },
];
const ESC = E.map((e) => ({ ...e, dur: durVoz(S, e.voz, e.min ?? 120) }));
export const Sup5Metricas: React.FC = () => (
  <Capitulo
    parte={5}
    short={S}
    serie={SERIE_SUP}
    acento={C.coral}
    escenas={ESC}
  />
);
export const TOTAL_SUP5 = duracionTotal(ESC.map((e) => e.dur));
