import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Sfx, Stage, Sticker, Words } from "../../kit/kit";
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

// Parte 5: Pilas (LIFO) y colas (FIFO). Ejemplos ilustrativos.
const PLATOS = [C.blue, C.green, C.purple, C.yellow];

const Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage gap={50}>
      <Words
        text="*Ctrl+Z* y la *fila* *del* *banco*… son lo mismo, al revés"
        size={84}
        stagger={1}
        accent={C.yellow}
      />
      <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
        <div
          style={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: 80,
            color: C.ink,
            background: C.bg2,
            border: `5px solid ${C.blue}`,
            borderRadius: 24,
            padding: "26px 40px",
            opacity: prog(frame, 20, 30),
          }}
        >
          Ctrl+Z
        </div>
        <div style={{ display: "flex", gap: 10, opacity: prog(frame, 35, 45) }}>
          {[C.green, C.purple, C.coral, C.yellow].map((c, i) => (
            <svg key={i} width={70} height={110} viewBox="0 0 70 84">
              <circle cx={35} cy={20} r={17} fill={c} />
              <path d="M8 84 Q8 44 35 44 Q62 44 62 84 Z" fill={c} />
            </svg>
          ))}
        </div>
      </div>
      <Sfx src="pop.wav" at={20} />
    </Stage>
  );
};

const Pila: React.FC = () => {
  const frame = useCurrentFrame();
  const n = Math.min(
    PLATOS.length,
    Math.floor(prog(frame, 15, 80) * PLATOS.length + 0.001),
  );
  const sale = interpolate(frame, [110, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  return (
    <Stage gap={40}>
      <Words text="Una *pila*: torre de platos" size={92} accent={C.blue} />
      <div style={{ position: "relative", width: 420, height: 380 }}>
        {PLATOS.slice(0, n).map((c, i) => {
          const tope = i === PLATOS.length - 1;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 30,
                bottom: i * 80,
                width: 360,
                height: 60,
                borderRadius: 30,
                background: c,
                border: "5px solid #0b1020",
                translate: tope
                  ? `${sale * 420}px ${-sale * 120}px`
                  : "0px 0px",
                opacity: tope ? 1 - sale * 0.6 : 1,
              }}
            />
          );
        })}
      </div>
      <Formula delay={90} size={46}>
        Último en entrar, primero en salir
      </Formula>
      <Sfx src="whoosh.wav" at={110} volume={0.35} />
    </Stage>
  );
};

const ACCIONES = ["Escribir 'Hola'", "Poner negritas", "Borrar una línea"];

const Deshacer: React.FC = () => {
  const frame = useCurrentFrame();
  const quita = frame > 60;
  return (
    <Stage gap={40}>
      <Words
        text="Por eso *Ctrl+Z* deshace lo último"
        size={84}
        accent={C.yellow}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          gap: 14,
          width: 760,
        }}
      >
        {ACCIONES.map((a, i) => {
          const ultimo = i === ACCIONES.length - 1;
          const op =
            ultimo && quita
              ? 1 - prog(frame, 60, 80)
              : prog(frame, 10 + i * 10, 20 + i * 10);
          return (
            <div
              key={a}
              style={{
                fontFamily: FONT,
                fontWeight: 800,
                fontSize: 50,
                color: C.ink,
                background: C.bg2,
                borderLeft: `12px solid ${ultimo ? C.coral : C.blue}`,
                borderRadius: 20,
                padding: "20px 28px",
                opacity: op,
                translate:
                  ultimo && quita
                    ? `${prog(frame, 60, 80) * 200}px 0px`
                    : "0px 0px",
              }}
            >
              {i + 1}. {a}
            </div>
          );
        })}
      </div>
      <Sticker delay={65} bg={C.coral} color={C.ink}>
        Ctrl+Z → se va la 3
      </Sticker>
      <Sfx src="pop.wav" at={62} />
    </Stage>
  );
};

const Cola: React.FC = () => {
  const frame = useCurrentFrame();
  const avance = interpolate(frame, [60, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const gente = [C.green, C.purple, C.coral, C.yellow, C.blue];
  return (
    <Stage gap={40}>
      <Words text="Una *cola*: la fila del banco" size={92} accent={C.green} />
      <div style={{ position: "relative", width: 880, height: 220 }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 30,
            width: 150,
            height: 160,
            borderRadius: 20,
            background: `${C.green}33`,
            border: `5px solid ${C.green}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 34,
            color: C.green,
          }}
        >
          Caja
        </div>
        {gente.map((c, i) => {
          const x = 180 + i * 130 - avance * 130;
          const atendido = i === 0;
          return (
            <svg
              key={i}
              width={100}
              height={150}
              viewBox="0 0 70 84"
              style={{
                position: "absolute",
                left: x,
                top: 50,
                opacity: atendido ? 1 - avance : 1,
              }}
            >
              <circle cx={35} cy={20} r={17} fill={c} />
              <path d="M8 84 Q8 44 35 44 Q62 44 62 84 Z" fill={c} />
            </svg>
          );
        })}
      </div>
      <Formula delay={20} size={46}>
        Primero en llegar, primero en salir
      </Formula>
      <Nota>Ejemplo simplificado</Nota>
      <Sfx src="whoosh.wav" at={60} volume={0.3} />
    </Stage>
  );
};

const Aplicacion: React.FC = () => (
  <Stage gap={28}>
    <Words
      text="Así las usa un *científico* *de* *datos*"
      size={78}
      accent={C.blue}
    />
    <Tarjeta
      titulo="Colas"
      texto="procesar pedidos, mensajes o lecturas de sensores en el orden en que llegan"
      color={C.green}
      delay={20}
    />
    <Tarjeta
      titulo="Pilas"
      texto="deshacer cambios y explorar carpetas dentro de carpetas"
      color={C.blue}
      delay={60}
    />
    <Codigo
      lineas={[
        "from collections import deque",
        "cola = deque()",
        "cola.append(pedido)   # llega",
        "cola.popleft()        # se atiende",
      ]}
      delay={110}
      size={34}
    />
    <Sfx src="pop.wav" at={20} />
    <Sfx src="pop.wav" at={60} />
  </Stage>
);

export const DUR_A5 = [160, 195, 170, 200, 290, 165];

export const Algo5PilasColas: React.FC = () => (
  <Capitulo
    parte={5}
    short="algo5"
    serie={SERIE_ALGORITMOS}
    acento={C.green}
    escenas={[
      { nombre: "Gancho", dur: DUR_A5[0], voz: "e1", el: <Gancho /> },
      { nombre: "Pila", dur: DUR_A5[1], voz: "e2", el: <Pila /> },
      { nombre: "Ctrl+Z", dur: DUR_A5[2], voz: "e3", el: <Deshacer /> },
      { nombre: "Cola", dur: DUR_A5[3], voz: "e4", el: <Cola /> },
      { nombre: "Aplicación", dur: DUR_A5[4], voz: "e5", el: <Aplicacion /> },
      {
        nombre: "Avance",
        dur: DUR_A5[5],
        voz: "e6",
        el: (
          <Avance
            parte={6}
            tema="Ordenamiento"
            gancho="¿Ordenar *1,000* exámenes?"
          />
        ),
      },
    ]}
  />
);

export const TOTAL_A5 = duracionTotal(DUR_A5);
