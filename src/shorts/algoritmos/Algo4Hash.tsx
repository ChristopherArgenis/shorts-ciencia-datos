import React from "react";
import { useCurrentFrame } from "remotion";
import { Sfx, Stage, Sticker, Words, useIn } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import {
  Avance,
  Capitulo,
  Codigo,
  duracionTotal,
  Formula,
  Nota,
  prog,
  SERIE_ALGORITMOS,
  Tarjeta,
} from "../../kit/serie";

// Parte 4: Tablas hash. Función hash de juguete: suma de los códigos de las letras, módulo 10.
const hash = (s: string) =>
  [...s].reduce((a, ch) => a + ch.charCodeAt(0), 0) % 10;
const NOMBRES = ["Ana", "Luis", "Sofia", "Diego"]; // Sofia y Diego caen en el 8 (colisión real)
const COLOR: Record<string, string> = {
  Ana: C.green,
  Luis: C.blue,
  Sofia: C.purple,
  Diego: C.coral,
};

/** Fila de 10 casilleros; muestra a quién guarda cada uno. */
const Casilleros: React.FC<{ guardados: string[]; resaltar?: number }> = ({
  guardados,
  resaltar = -1,
}) => (
  <div style={{ display: "flex", gap: 8 }}>
    {Array.from({ length: 10 }).map((_, i) => {
      const dentro = guardados.filter((n) => hash(n) === i);
      const on = i === resaltar;
      return (
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
              width: 80,
              height: 190,
              borderRadius: 12,
              background: on ? `${C.yellow}44` : C.bg2,
              border: `4px solid ${on ? C.yellow : "#2a3366"}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 6,
              paddingBottom: 8,
            }}
          >
            {dentro.map((n) => (
              <div
                key={n}
                style={{
                  width: 62,
                  height: 46,
                  borderRadius: 8,
                  background: COLOR[n],
                  fontFamily: FONT,
                  fontWeight: 900,
                  fontSize: 18,
                  color: C.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {n}
              </div>
            ))}
          </div>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 34,
              color: on ? C.yellow : C.dim,
            }}
          >
            {i}
          </div>
        </div>
      );
    })}
  </div>
);

const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={40}>
      <Words
        text="¿Cómo te encuentra una app entre *millones*… al instante?"
        size={84}
        stagger={1}
        accent={C.yellow}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: 880,
          gap: 8,
          justifyContent: "center",
        }}
      >
        {Array.from({ length: 120 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              background: i === 77 ? C.yellow : C.bg2,
              opacity: prog(frame, 10 + i * 0.3, 16 + i * 0.3),
              scale: i === 77 ? 1 + 0.15 * Math.sin(frame / 4) : 1,
            }}
          />
        ))}
      </div>
      <Sfx src="pop.wav" at={10} />
    </Stage>
  );
};

const Guardarropa: React.FC = () => {
  const ficha = useIn(60, 10);
  return (
    <Stage gap={40}>
      <Words text="Piensa en un *guardarropa*" size={92} accent={C.yellow} />
      <Casilleros guardados={["Ana"]} resaltar={2} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          opacity: ficha,
          scale: 0.6 + 0.4 * ficha,
        }}
      >
        <div
          style={{
            width: 170,
            height: 170,
            borderRadius: 85,
            background: C.yellow,
            color: C.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 100,
          }}
        >
          2
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 56,
            color: C.ink,
          }}
        >
          Tu ficha
        </div>
      </div>
      <Nota>Ejemplo simplificado</Nota>
      <Sfx src="ding.wav" at={60} volume={0.35} />
    </Stage>
  );
};

const Funcion: React.FC = () => {
  const frame = useCurrentFrame();
  const n = Math.min(
    NOMBRES.length,
    Math.floor(prog(frame, 40, 150) * NOMBRES.length + 0.001),
  );
  const g = NOMBRES.slice(0, n);
  return (
    <Stage gap={30}>
      <Words
        text="Una *función* *hash*: nombre → casillero"
        size={80}
        stagger={1}
        accent={C.yellow}
      />
      <Formula delay={10} size={40}>
        hash("Ana") = suma(letras) % 10 → 2
      </Formula>
      <div
        style={{
          display: "flex",
          gap: 18,
          fontFamily: MONO,
          fontSize: 38,
          color: C.ink,
          flexWrap: "wrap",
          justifyContent: "center",
          width: 880,
        }}
      >
        {NOMBRES.map((nom, i) => (
          <span
            key={nom}
            style={{ color: COLOR[nom], opacity: i < n ? 1 : 0.15 }}
          >
            {nom} → {hash(nom)}
          </span>
        ))}
      </div>
      <Casilleros guardados={g} />
      <Sticker delay={160} bg={C.purple} color={C.ink}>
        Sofia y Diego caen juntos: colisión
      </Sticker>
      {NOMBRES.map((_, i) => (
        <Sfx
          key={i}
          src="tick.wav"
          at={40 + Math.round((i * 110) / NOMBRES.length)}
          volume={0.3}
        />
      ))}
    </Stage>
  );
};

const Directo: React.FC = () => {
  const frame = useCurrentFrame();
  const on = frame > 55;
  return (
    <Stage gap={40}>
      <Words text="¿Dónde está *Luis*?" size={96} accent={C.blue} />
      <div
        style={{
          fontFamily: MONO,
          fontSize: 56,
          color: C.ink,
          opacity: prog(frame, 20, 30),
        }}
      >
        hash("Luis") = <span style={{ color: C.blue }}>3</span>
      </div>
      <Casilleros guardados={NOMBRES} resaltar={on ? 3 : -1} />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 80,
          color: C.green,
          opacity: prog(frame, 60, 70),
        }}
      >
        Directo. Sin buscar.
      </div>
      <Sfx src="ding.wav" at={56} volume={0.35} />
    </Stage>
  );
};

const Aplicacion: React.FC = () => (
  <Stage gap={28}>
    <Words
      text="Así la usa un *científico* *de* *datos*"
      size={78}
      accent={C.blue}
    />
    <Tarjeta
      titulo="Diccionarios y conjuntos"
      texto="en Python, dict y set son tablas hash"
      color={C.blue}
      delay={20}
    />
    <Codigo
      lineas={[
        "conteo = {}            # contar",
        "unicos = set(correos)  # sin repetidos",
        'df.merge(clientes, on="id")', "# ↑ unir tablas",
      ]}
      delay={60}
      size={34}
    />
    <Tarjeta
      titulo="Por eso es tan rápido"
      texto="contar, buscar y unir tablas sin recorrerlo todo"
      color={C.green}
      delay={130}
    />
    <Sfx src="pop.wav" at={20} />
    <Sfx src="pop.wav" at={130} />
  </Stage>
);

export const DUR_A4 = [155, 195, 190, 175, 265, 150];

export const Algo4Hash: React.FC = () => (
  <Capitulo
    parte={4}
    short="algo4"
    serie={SERIE_ALGORITMOS}
    acento={C.purple}
    escenas={[
      { nombre: "Gancho", dur: DUR_A4[0], voz: "d1", el: <Gancho /> },
      { nombre: "Guardarropa", dur: DUR_A4[1], voz: "d2", el: <Guardarropa /> },
      { nombre: "Función hash", dur: DUR_A4[2], voz: "d3", el: <Funcion /> },
      { nombre: "Directo", dur: DUR_A4[3], voz: "d4", el: <Directo /> },
      { nombre: "Aplicación", dur: DUR_A4[4], voz: "d5", el: <Aplicacion /> },
      {
        nombre: "Avance",
        dur: DUR_A4[5],
        voz: "d6",
        el: (
          <Avance
            parte={5}
            tema="Pilas y colas"
            gancho="¿Ctrl+Z y la fila del *banco*?"
          />
        ),
      },
    ]}
  />
);

export const TOTAL_A4 = duracionTotal(DUR_A4);
