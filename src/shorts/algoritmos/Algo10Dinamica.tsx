import React from "react";
import { useCurrentFrame } from "remotion";
import { Sfx, Stage, Sticker, Words, useIn } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import {
  Capitulo,
  Codigo,
  duracionTotal,
  Formula,
  Nota,
  prog,
  SERIE_ALGORITMOS,
  useSerie,
} from "../../kit/serie";

// Parte 10: Programación dinámica — distancia de edición (Levenshtein), calculada de verdad.
const A = "gatp";
const B = "gato";
const tabla = (a: string, b: string) => {
  const T = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) =>
      i === 0 ? j : j === 0 ? i : 0,
    ),
  );
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      T[i][j] = Math.min(
        T[i - 1][j] + 1,
        T[i][j - 1] + 1,
        T[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
  return T;
};
const T = tabla(A, B);
const DIST = T[A.length][B.length]; // 1
const NOMBRE_DIST = tabla("José Pérez", "Jose Perez")[10][10]; // 2

const Teclado: React.FC = () => {
  const frame = useCurrentFrame();
  const sug = useIn(40, 10);
  return (
    <div
      style={{
        width: 820,
        background: "#f4f6ff",
        borderRadius: 30,
        padding: "30px 34px",
        fontFamily: FONT,
        color: "#0b1020",
      }}
    >
      <div style={{ fontWeight: 800, fontSize: 30, color: "#5a6290" }}>
        Mensaje
      </div>
      <div style={{ fontWeight: 900, fontSize: 80 }}>
        Mi{" "}
        {"gatp".slice(
          0,
          Math.min(4, Math.floor(prog(frame, 5, 30) * 4 + 0.001)),
        )}
        <span style={{ opacity: Math.floor(frame / 8) % 2 ? 1 : 0.2 }}>|</span>
      </div>
      <div
        style={{
          display: "flex",
          gap: 16,
          marginTop: 14,
          opacity: sug,
          scale: 0.9 + 0.1 * sug,
        }}
      >
        {["gato", "gata", "gatos"].map((w, i) => (
          <div
            key={w}
            style={{
              background: i === 0 ? C.green : "#dfe3f7",
              color: "#0b1020",
              borderRadius: 16,
              padding: "10px 24px",
              fontWeight: 900,
              fontSize: 44,
            }}
          >
            {w}
          </div>
        ))}
      </div>
    </div>
  );
};

const Gancho: React.FC = () => (
  <Stage gap={50}>
    <Words
      text="¿Cómo saber que *gatp* era *gato*?"
      size={92}
      stagger={1}
      accent={C.green}
    />
    <Teclado />
    <Sfx src="pop.wav" at={40} />
  </Stage>
);

const Distancia: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={40}>
      <Words text="*Distancia* *de* *edición*" size={96} accent={C.yellow} />
      <Words
        text="¿Cuántos cambios separan dos palabras?"
        size={60}
        weight={800}
        delay={15}
        color={C.dim}
      />
      <div
        style={{
          display: "flex",
          gap: 20,
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 48,
        }}
      >
        {[
          ["insertar", C.green],
          ["borrar", C.coral],
          ["cambiar", C.blue],
        ].map(([t, c], i) => (
          <span
            key={t}
            style={{
              color: c,
              border: `4px solid ${c}`,
              borderRadius: 18,
              padding: "10px 22px",
              opacity: prog(frame, 40 + i * 12, 50 + i * 12),
            }}
          >
            {t}
          </span>
        ))}
      </div>
      <div
        style={{
          fontFamily: MONO,
          fontWeight: 700,
          fontSize: 110,
          color: C.ink,
          opacity: prog(frame, 90, 100),
        }}
      >
        gat<span style={{ color: C.coral }}>p</span> → gat
        <span style={{ color: C.green }}>o</span>
      </div>
      <Sfx src="tick.wav" at={90} />
    </Stage>
  );
};

const Tabla: React.FC = () => {
  const frame = useCurrentFrame();
  const { color } = useSerie();
  const celdas = (A.length + 1) * (B.length + 1);
  const n = Math.floor(prog(frame, 30, 200) * celdas + 0.001);
  const S = 130;
  return (
    <Stage gap={30}>
      <Words
        text="Llenar una *tabla*, no probar todo"
        size={84}
        accent={color}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${B.length + 2}, ${S}px)`,
          gap: 6,
          fontFamily: MONO,
          fontWeight: 700,
          fontSize: 52,
        }}
      >
        <div />
        <div style={{ textAlign: "center", color: C.dim }}>·</div>
        {[...B].map((ch, j) => (
          <div key={`h${j}`} style={{ textAlign: "center", color: C.green }}>
            {ch}
          </div>
        ))}
        {T.map((fila, i) => (
          <React.Fragment key={i}>
            <div
              style={{
                textAlign: "center",
                color: C.coral,
                alignSelf: "center",
              }}
            >
              {i === 0 ? "·" : A[i - 1]}
            </div>
            {fila.map((v, j) => {
              const idx = i * (B.length + 1) + j;
              const ultimo = i === A.length && j === B.length;
              return (
                <div
                  key={j}
                  style={{
                    height: S - 20,
                    borderRadius: 14,
                    background: ultimo && idx < n ? C.green : C.bg2,
                    color: ultimo && idx < n ? C.bg : C.ink,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: idx < n ? 1 : 0.15,
                  }}
                >
                  {idx < n ? v : ""}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      <Nota>Cada casilla usa las respuestas de sus vecinas</Nota>
    </Stage>
  );
};

const Resultado: React.FC = () => (
  <Stage gap={40}>
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: 130,
        color: C.green,
      }}
    >
      {DIST} cambio{DIST === 1 ? "" : "s"}
    </div>
    <Words text="gato es la palabra más *cercana*" size={72} accent={C.green} />
    <Formula delay={60} size={50}>
      Problemas pequeños + guardar respuestas
    </Formula>
    <Words
      text="= *programación* *dinámica*"
      size={80}
      delay={90}
      accent={C.yellow}
    />
    <Sfx src="ding.wav" at={2} volume={0.4} />
  </Stage>
);

const Aplicacion: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={30}>
      <Words
        text="Así la usa un *científico* *de* *datos*"
        size={78}
        accent={C.blue}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 62,
          alignItems: "center",
        }}
      >
        <div style={{ color: C.ink, opacity: prog(frame, 15, 25) }}>
          "José Pérez"
        </div>
        <div
          style={{ color: C.dim, fontSize: 44, opacity: prog(frame, 30, 40) }}
        >
          distancia = {NOMBRE_DIST}
        </div>
        <div style={{ color: C.ink, opacity: prog(frame, 15, 25) }}>
          "Jose Perez"
        </div>
      </div>
      <Sticker delay={60} bg={C.green} color={C.bg}>
        Misma persona: limpiar duplicados
      </Sticker>
      <Codigo
        lineas={[
          "from rapidfuzz.distance import Levenshtein",
          'Levenshtein.distance("José Pérez",',
          '                     "Jose Perez")  # 2',
        ]}
        delay={110}
        size={32}
      />
      <Sfx src="pop.wav" at={60} />
    </Stage>
  );
};

const TEMAS = [
  "Arreglos",
  "Big O",
  "Búsqueda binaria",
  "Tablas hash",
  "Pilas y colas",
  "Ordenamiento",
  "Árboles",
  "Grafos",
  "Camino más corto",
  "Programación dinámica",
];

const Fin: React.FC = () => {
  const frame = useCurrentFrame();
  const { color } = useSerie();
  return (
    <Stage gap={20}>
      <Words text="*Fin* de la serie" size={100} accent={color} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px 30px",
          width: 880,
        }}
      >
        {TEMAS.map((t, i) => (
          <div
            key={t}
            style={{
              display: "flex",
              gap: 14,
              alignItems: "center",
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 36,
              color: C.ink,
              opacity: prog(frame, 8 + i * 4, 16 + i * 4),
            }}
          >
            <span
              style={{
                minWidth: 54,
                height: 54,
                borderRadius: 27,
                background: color,
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
        ¿Qué tema sigue? Comenta 👇
      </Sticker>
      <Sfx src="ding.wav" at={70} volume={0.4} />
    </Stage>
  );
};

export const DUR_A10 = [140, 185, 260, 215, 285, 170];

export const Algo10Dinamica: React.FC = () => (
  <Capitulo
    parte={10}
    short="algo10"
    serie={SERIE_ALGORITMOS}
    acento={C.yellow}
    escenas={[
      { nombre: "Gancho", dur: DUR_A10[0], voz: "j1", el: <Gancho /> },
      { nombre: "Distancia", dur: DUR_A10[1], voz: "j2", el: <Distancia /> },
      { nombre: "Tabla", dur: DUR_A10[2], voz: "j3", el: <Tabla /> },
      { nombre: "Resultado", dur: DUR_A10[3], voz: "j4", el: <Resultado /> },
      { nombre: "Aplicación", dur: DUR_A10[4], voz: "j5", el: <Aplicacion /> },
      { nombre: "Fin", dur: DUR_A10[5], voz: "j6", el: <Fin /> },
    ]}
  />
);

export const TOTAL_A10 = duracionTotal(DUR_A10);
