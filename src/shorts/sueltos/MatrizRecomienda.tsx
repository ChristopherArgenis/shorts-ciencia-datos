import React from "react";
import { useCurrentFrame } from "remotion";
import { Sfx, Stage, Sticker, Words } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import {
  Capitulo,
  duracionTotal,
  durVoz,
  Formula,
  Nota,
  prog,
} from "../../kit/serie";
import { Reto } from "../../kit/ml";

// Factorización de matrices: ejemplo simplificado con números calculados (R ≈ U·Vᵀ).
const S = "matriz" as const;
const PERS = ["Tú", "Ana", "Luis", "Sofía"];
const CANC = ["Canción 1", "Canción 2", "Canción 3", "Canción 4"];
const R: (number | null)[][] = [
  [5, null, 1, null],
  [4, 5, 1, 0],
  [1, 0, 5, 4],
  [0, 1, 4, 5],
];
const U = [
  [1.0, 0.1],
  [0.9, 0.2],
  [0.1, 1.0],
  [0.2, 0.9],
];
const V = [
  [4.6, 0.6],
  [4.7, 0.3],
  [0.5, 4.6],
  [0.3, 4.5],
];
const pred = (i: number, j: number) => U[i][0] * V[j][0] + U[i][1] * V[j][1];

const Matriz: React.FC<{
  ap?: number;
  foco?: [number, number] | null;
  lleno?: boolean;
}> = ({ ap = 1, foco = null, lleno = false }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `170px repeat(4, 170px)`,
      gap: 8,
      fontFamily: FONT,
      fontWeight: 900,
    }}
  >
    <div />
    {CANC.map((c) => (
      <div key={c} style={{ fontSize: 26, color: C.dim, textAlign: "center" }}>
        {c}
      </div>
    ))}
    {R.map((fila, i) => (
      <React.Fragment key={i}>
        <div
          style={{
            fontSize: 40,
            color: i === 0 ? C.yellow : C.ink,
            alignSelf: "center",
          }}
        >
          {PERS[i]}
        </div>
        {fila.map((v, j) => {
          const on = foco && foco[0] === i && foco[1] === j;
          const hueco = v === null;
          const txt = hueco ? (lleno ? pred(i, j).toFixed(1) : "?") : String(v);
          return (
            <div
              key={j}
              style={{
                height: 120,
                borderRadius: 16,
                background: on ? C.green : hueco ? `${C.yellow}33` : C.bg2,
                border: hueco ? `3px dashed ${C.yellow}` : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: MONO,
                fontSize: 52,
                color: on ? C.bg : hueco ? C.yellow : C.ink,
                opacity: prog(ap * 100, (i * 4 + j) * 4, (i * 4 + j) * 4 + 10),
              }}
            >
              {txt}
            </div>
          );
        })}
      </React.Fragment>
    ))}
  </div>
);

const Mini: React.FC<{
  titulo: string;
  filas: string[];
  datos: number[][];
  color: string;
  resaltar?: number;
}> = ({ titulo, filas, datos, color, resaltar = -1 }) => (
  <div style={{ fontFamily: FONT, textAlign: "center" }}>
    <div style={{ fontWeight: 900, fontSize: 40, color }}>{titulo}</div>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "150px 110px 110px",
        gap: 6,
        marginTop: 8,
      }}
    >
      <div />
      <div style={{ fontSize: 28, color: C.dim, fontWeight: 800 }}>pop</div>
      <div style={{ fontSize: 28, color: C.dim, fontWeight: 800 }}>rock</div>
      {datos.map((d, i) => (
        <React.Fragment key={i}>
          <div
            style={{
              fontSize: 30,
              fontWeight: 800,
              color: i === resaltar ? C.yellow : C.ink,
              textAlign: "right",
              paddingRight: 8,
            }}
          >
            {filas[i]}
          </div>
          {d.map((v, k) => (
            <div
              key={k}
              style={{
                height: 66,
                borderRadius: 12,
                background: i === resaltar ? `${color}55` : C.bg2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: MONO,
                fontSize: 34,
                color: C.ink,
              }}
            >
              {v}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  </div>
);

const Gancho = () => (
  <Stage gap={40}>
    <Words
      text="Tus gustos caben en una *tabla*"
      size={92}
      stagger={1}
      accent={C.green}
    />
    <Matriz />
  </Stage>
);
const RetoE = () => (
  <Stage gap={30}>
    <Reto pregunta="Nunca escuchaste la Canción 2. ¿Te va a gustar?" />
    <Matriz foco={null} />
  </Stage>
);
const Tabla = () => {
  const f = useCurrentFrame();
  return (
    <Stage gap={30}>
      <Words
        text="Filas = personas · columnas = *canciones*"
        size={74}
        accent={C.green}
      />
      <Matriz ap={prog(f, 5, 80)} />
      <Nota>Calificaciones de 0 a 5 · ejemplo simplificado</Nota>
    </Stage>
  );
};
const Partir = () => (
  <Stage gap={30}>
    <Formula delay={5} size={70}>
      R ≈ U × Vᵀ
    </Formula>
    <div style={{ display: "flex", gap: 24 }}>
      <Mini titulo="Personas (U)" filas={PERS} datos={U} color={C.blue} />
      <Mini
        titulo="Canciones (V)"
        filas={["C1", "C2", "C3", "C4"]}
        datos={V}
        color={C.purple}
      />
    </div>
    <Words
      text="Dos tablas *pequeñas* con gustos ocultos"
      size={64}
      delay={50}
      accent={C.yellow}
    />
  </Stage>
);
const Cuenta = () => {
  const f = useCurrentFrame();
  return (
    <Stage gap={30}>
      <div style={{ display: "flex", gap: 24 }}>
        <Mini
          titulo="Tú"
          filas={["Tú"]}
          datos={[U[0]]}
          color={C.blue}
          resaltar={0}
        />
        <Mini
          titulo="Canción 2"
          filas={["C2"]}
          datos={[V[1]]}
          color={C.purple}
          resaltar={0}
        />
      </div>
      <Formula delay={30} size={56}>
        1.0×4.7 + 0.1×0.3 = {pred(0, 1).toFixed(2)}
      </Formula>
      <div style={{ opacity: prog(f, 90, 100) }}>
        <Matriz foco={[0, 1]} lleno />
      </div>
      <Sfx src="ding.wav" at={90} volume={0.4} />
    </Stage>
  );
};
const NoRec = () => (
  <Stage gap={30}>
    <Formula delay={5} size={34}>
      Canción 3: 1.0×0.5 + 0.1×4.6 = {pred(0, 2).toFixed(2)}
    </Formula>
    <Words
      text="Esa *no* te la recomienda"
      size={84}
      delay={30}
      accent={C.coral}
    />
    <Sticker delay={60} bg={C.green} color={C.bg}>
      Respuesta: sí, Canción 2 (4.7)
    </Sticker>
  </Stage>
);
const Cierre = () => (
  <Stage gap={30}>
    <Words
      text="Millones de filas, cientos de *gustos* *ocultos*"
      size={80}
      stagger={1}
      accent={C.purple}
    />
    <Words
      text="Pero la idea es esta *multiplicación*"
      size={76}
      delay={40}
      accent={C.green}
    />
    <Nota>
      Idea base de la factorización de matrices; no es el sistema interno de
      ninguna app
    </Nota>
    <Sticker delay={100} bg={C.yellow} rotate={2}>
      ¿Qué te recomendó a ti?
    </Sticker>
  </Stage>
);

const E = [
  { nombre: "Gancho", voz: "c1", el: <Gancho /> },
  { nombre: "Reto", voz: "c2", el: <RetoE />, min: 140 },
  { nombre: "Tabla", voz: "c3", el: <Tabla />, min: 190 },
  { nombre: "Partir", voz: "c4", el: <Partir />, min: 190 },
  { nombre: "Cuenta", voz: "c5", el: <Cuenta />, min: 280 },
  { nombre: "No", voz: "c6", el: <NoRec />, min: 170 },
  { nombre: "Cierre", voz: "c7", el: <Cierre />, min: 190 },
];
const ESC = E.map((e) => ({ ...e, dur: durVoz(S, e.voz, e.min ?? 120) }));
export const MatrizRecomienda: React.FC = () => (
  <Capitulo parte={1} short={S} suelto acento={C.purple} escenas={ESC} />
);
export const TOTAL_MATRIZ = duracionTotal(ESC.map((e) => e.dur));
