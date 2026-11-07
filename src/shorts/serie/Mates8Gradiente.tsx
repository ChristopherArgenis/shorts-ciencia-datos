import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Sfx, Stage, Sticker, Words, useIn } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import {
  Capitulo,
  COLOR_SERIE,
  duracionTotal,
  fmt,
  Formula,
  Nota,
  prog,
  Tarjeta,
} from "../../kit/serie";

// Parte 8: Derivadas y descenso de gradiente. Error ilustrativo f(w) = (w − 3)² + 1.
const f = (w: number) => (w - 3) ** 2 + 1;
const df = (w: number) => 2 * (w - 3);
const ALFA = 0.3;
const PASOS: number[] = [-1];
for (let i = 0; i < 5; i++) PASOS.push(PASOS[i] - ALFA * df(PASOS[i]));

const WR: [number, number] = [-2, 8];
const ER: [number, number] = [0, 27];

/** La "montaña" del error con una pelota en w. */
const Montana: React.FC<{
  w: number;
  tangente?: number;
  rastro?: number[];
}> = ({ w, tangente = 0, rastro = [] }) => {
  const W = 880;
  const H = 600;
  const L = 80;
  const B = 70;
  const px = (x: number) => L + ((W - L - 20) * (x - WR[0])) / (WR[1] - WR[0]);
  const py = (y: number) =>
    H - B - ((H - B - 20) * (y - ER[0])) / (ER[1] - ER[0]);
  const pts = Array.from({ length: 101 }).map(
    (_, i) => WR[0] + ((WR[1] - WR[0]) * i) / 100,
  );
  const curva = pts
    .map((x, i) => `${i ? "L" : "M"}${px(x).toFixed(1)},${py(f(x)).toFixed(1)}`)
    .join(" ");
  const relleno = `${curva} L${px(WR[1])},${H - B} L${px(WR[0])},${H - B} Z`;
  const m = df(w);
  const d = 1.6;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <path d={relleno} fill={C.purple} opacity={0.18} />
      <path d={curva} fill="none" stroke={C.purple} strokeWidth={8} />
      <line
        x1={L}
        y1={H - B}
        x2={W - 10}
        y2={H - B}
        stroke={C.dim}
        strokeWidth={4}
      />
      <line x1={L} y1={20} x2={L} y2={H - B} stroke={C.dim} strokeWidth={4} />
      <text
        x={W - 20}
        y={H - 20}
        fill={C.dim}
        fontFamily={FONT}
        fontWeight={800}
        fontSize={32}
        textAnchor="end"
      >
        ajuste del modelo (w)
      </text>
      <text
        x={30}
        y={(H - B) / 2}
        fill={C.dim}
        fontFamily={FONT}
        fontWeight={800}
        fontSize={32}
        textAnchor="middle"
        transform={`rotate(-90 30 ${(H - B) / 2})`}
      >
        error
      </text>
      <g>
        <line
          x1={px(3)}
          y1={py(1) + 10}
          x2={px(3)}
          y2={py(1) - 60}
          stroke={C.green}
          strokeWidth={5}
        />
        <polygon
          points={`${px(3)},${py(1) - 60} ${px(3) + 46},${py(1) - 46} ${px(3)},${py(1) - 32}`}
          fill={C.green}
        />
      </g>
      {rastro.map((r, i) => (
        <circle
          key={i}
          cx={px(r)}
          cy={py(f(r))}
          r={10}
          fill={COLOR_SERIE}
          opacity={0.4}
        />
      ))}
      {tangente > 0 ? (
        <line
          x1={px(w - d * tangente)}
          y1={py(f(w) - m * d * tangente)}
          x2={px(w + d * tangente)}
          y2={py(f(w) + m * d * tangente)}
          stroke={C.coral}
          strokeWidth={7}
          strokeLinecap="round"
        />
      ) : null}
      <circle
        cx={px(w)}
        cy={py(f(w)) - 22}
        r={22}
        fill={COLOR_SERIE}
        stroke="#0b1020"
        strokeWidth={4}
      />
    </svg>
  );
};

const Gancho: React.FC = () => {
  const venda = useIn(30, 10);
  return (
    <Stage gap={30}>
      <Words
        text="Así aprende una IA: bajando una *montaña*… con los ojos vendados"
        size={76}
        stagger={1}
        accent={C.purple}
      />
      <Montana w={-1} />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 54,
          color: COLOR_SERIE,
          opacity: venda,
          scale: 0.8 + 0.2 * venda,
        }}
      >
        Solo sientes la pendiente bajo tus pies
      </div>
      <Nota>Ejemplo simplificado</Nota>
      <Sfx src="whoosh.wav" at={30} volume={0.3} />
    </Stage>
  );
};

const ErrorMontana: React.FC = () => (
  <Stage gap={30}>
    <Words
      text="La montaña es el *error* del modelo"
      size={84}
      accent={C.purple}
    />
    <Montana w={-1} />
    <Sticker delay={60} bg={C.green} color={C.bg}>
      Meta: llegar a lo más bajo
    </Sticker>
    <Sfx src="pop.wav" at={60} />
  </Stage>
);

const Derivada: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={30}>
      <Words text="La *derivada* = la pendiente" size={88} accent={C.coral} />
      <Montana w={-1} tangente={prog(frame, 20, 50)} />
      <Formula delay={50} size={52}>
        f′(−1) = 2(−1 − 3) = −8
      </Formula>
      <Words
        text="Negativa: el terreno baja hacia la *derecha*"
        size={56}
        weight={800}
        delay={90}
        accent={C.green}
      />
    </Stage>
  );
};

const Pasos: React.FC = () => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [30, 170], [0, PASOS.length - 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const i = Math.min(PASOS.length - 2, Math.floor(t));
  const k = Easing.inOut(Easing.quad)(Math.min(1, t - i));
  const w = PASOS[i] + (PASOS[i + 1] - PASOS[i]) * k;
  const paso = Math.min(PASOS.length - 1, Math.round(t));
  return (
    <Stage gap={26}>
      <Words text="Un paso… y otro… y otro" size={84} accent={C.yellow} />
      <Formula delay={5} size={52}>
        w ← w − α · f′(w)
      </Formula>
      <Montana w={w} rastro={PASOS.slice(0, paso)} />
      <div
        style={{
          display: "flex",
          gap: 40,
          fontFamily: MONO,
          fontSize: 50,
          color: C.ink,
        }}
      >
        <span>
          paso <span style={{ color: COLOR_SERIE }}>{paso}</span>
        </span>
        <span>
          error <span style={{ color: C.green }}>{fmt(f(w), 2)}</span>
        </span>
      </div>
      {PASOS.slice(1).map((_, j) => (
        <Sfx key={j} src="tick.wav" at={30 + j * 28} volume={0.35} />
      ))}
    </Stage>
  );
};

const Aplicacion: React.FC = () => (
  <Stage gap={28}>
    <Words
      text="Eso es el *descenso* *de* *gradiente*"
      size={82}
      accent={C.yellow}
    />
    <Tarjeta
      titulo="Redes neuronales"
      texto="ajustan millones de 'perillas' (parámetros) a la vez"
      color={C.purple}
      delay={20}
    />
    <Tarjeta
      titulo="Modelos de lenguaje"
      texto="como Claude: se entrenan bajando el error paso a paso"
      color={C.green}
      delay={50}
    />
    <Tarjeta
      titulo="La regresión de la parte 6"
      texto="también puede encontrarse así"
      color={C.blue}
      delay={80}
    />
    {[20, 50, 80].map((t) => (
      <Sfx key={t} src="pop.wav" at={t} />
    ))}
  </Stage>
);

const TEMAS = [
  "Promedio vs mediana",
  "Desviación estándar",
  "Distribución normal",
  "Teorema de Bayes",
  "Correlación ≠ causalidad",
  "Regresión lineal",
  "Vectores y similitud",
  "Descenso de gradiente",
];

const Fin: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={22}>
      <Words text="*Fin* de la serie" size={100} accent={COLOR_SERIE} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: 820,
        }}
      >
        {TEMAS.map((t, i) => (
          <div
            key={t}
            style={{
              display: "flex",
              gap: 20,
              alignItems: "center",
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 42,
              color: C.ink,
              opacity: prog(frame, 10 + i * 5, 18 + i * 5),
            }}
          >
            <span
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                background: COLOR_SERIE,
                color: C.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
              }}
            >
              {i + 1}
            </span>
            {t}
          </div>
        ))}
      </div>
      <Sticker delay={70} bg={C.green} color={C.bg} rotate={-2} size={46}>
        ¿Qué matemáticas siguen? Comenta 👇
      </Sticker>
      <Sfx src="ding.wav" at={70} volume={0.4} />
    </Stage>
  );
};

export const DUR_M8 = [205, 180, 180, 210, 250, 170];

export const Mates8Gradiente: React.FC = () => (
  <Capitulo
    parte={8}
    short="mates8"
    acento={C.purple}
    escenas={[
      { nombre: "Gancho", dur: DUR_M8[0], voz: "g1", el: <Gancho /> },
      { nombre: "Error", dur: DUR_M8[1], voz: "g2", el: <ErrorMontana /> },
      { nombre: "Derivada", dur: DUR_M8[2], voz: "g3", el: <Derivada /> },
      { nombre: "Pasos", dur: DUR_M8[3], voz: "g4", el: <Pasos /> },
      { nombre: "Aplicación", dur: DUR_M8[4], voz: "g5", el: <Aplicacion /> },
      { nombre: "Fin", dur: DUR_M8[5], voz: "g6", el: <Fin /> },
    ]}
  />
);

export const TOTAL_M8 = duracionTotal(DUR_M8);
