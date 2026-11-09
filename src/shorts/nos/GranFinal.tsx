import React from "react";
import { useCurrentFrame } from "remotion";
import { Sfx, Stage, Sticker, Words } from "../../kit/kit";
import { C, FONT, MONO } from "../../kit/theme";
import {
  Capitulo,
  duracionTotal,
  durVoz,
  prog,
  SERIE_FINAL,
} from "../../kit/serie";
import { MapaML, MORADO, NARANJA, Reto } from "../../kit/ml";
import { ESPECIE, FuentePinguinos } from "../../kit/pinguinos";
import { Grande, Scatter } from "./comun";
import datos from "../../datos/ml_nosup.json";

const S = "nosF" as const;
const F = datos.final;
const U1 = datos.u1.puntos as [number, number, number][];
const ESPS = ["Adelie", "Gentoo", "Chinstrap"];
const COL = ESPS.map((e) => ESPECIE[e].color);
const SUPP = datos.u5.puntos as [number, number, string][];
// Puntos supervisados: pico real coloreado por especie (mismo orden que U1).
const REAL = U1.map(
  ([a, b], i) => [a, b, ESPS.indexOf(SUPP[i][2])] as [number, number, number],
);
const TAB = F.tabla as Record<string, Record<string, number>>;

const Mitad: React.FC<{
  titulo: string;
  color: string;
  pts: [number, number, number][];
  ap?: number;
}> = ({ titulo, color, pts, ap = 1 }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
    }}
  >
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: 42,
        color: C.bg,
        background: color,
        borderRadius: 18,
        padding: "8px 20px",
      }}
    >
      {titulo}
    </div>
    <div
      style={{
        border: `5px solid ${color}`,
        borderRadius: 24,
        overflow: "hidden",
      }}
    >
      <Scatter
        pts={pts}
        xr={[32, 60]}
        yr={[13, 22]}
        w={430}
        h={430}
        r={6}
        aparicion={ap}
        colores={COL}
      />
    </div>
  </div>
);

const Gancho = () => (
  <Stage gap={40}>
    <Words
      text="Los mismos pingüinos. *Dos* *mundos*."
      size={92}
      stagger={1}
      accent={C.green}
    />
    <div style={{ display: "flex", gap: 20 }}>
      <Mitad titulo="CON etiquetas" color={NARANJA} pts={REAL} />
      <Mitad titulo="SIN etiquetas" color={MORADO} pts={U1} />
    </div>
  </Stage>
);
const RetoE = () => (
  <Stage>
    <Reto pregunta="Sin etiquetas, ¿qué porcentaje agrupó bien?" />
  </Stage>
);
const DosMundos = () => {
  const f = useCurrentFrame();
  return (
    <Stage gap={30}>
      <div style={{ display: "flex", gap: 20 }}>
        <Mitad
          titulo="Supervisado"
          color={NARANJA}
          pts={REAL}
          ap={prog(f, 10, 60)}
        />
        <Mitad
          titulo="No supervisado"
          color={MORADO}
          pts={U1}
          ap={prog(f, 60, 110)}
        />
      </div>
      <div
        style={{
          display: "flex",
          gap: 30,
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 32,
          color: C.dim,
          width: 880,
          justifyContent: "space-around",
        }}
      >
        <span>aprendió con la especie</span>
        <span>nunca la vio</span>
      </div>
      <FuentePinguinos />
    </Stage>
  );
};
const Tabla = () => {
  const f = useCurrentFrame();
  return (
    <Stage gap={26}>
      <Words text="Grupos vs especies *reales*" size={84} accent={C.green} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "230px repeat(3, 210px)",
          gap: 8,
          fontFamily: FONT,
          fontWeight: 900,
        }}
      >
        <div />
        {ESPS.map((e) => (
          <div
            key={e}
            style={{
              fontSize: 36,
              color: ESPECIE[e].color,
              textAlign: "center",
            }}
          >
            {ESPECIE[e].nombre}
          </div>
        ))}
        {[0, 1, 2].map((g, i) => (
          <React.Fragment key={g}>
            <div style={{ fontSize: 36, color: C.ink, alignSelf: "center" }}>
              grupo {g + 1}
            </div>
            {ESPS.map((e) => {
              const v = TAB[String(g)][e];
              return (
                <div
                  key={e}
                  style={{
                    height: 110,
                    borderRadius: 16,
                    background:
                      v > 50 ? `${COL[g]}cc` : v > 0 ? `${C.yellow}55` : C.bg2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: MONO,
                    fontSize: 48,
                    color: v > 50 ? C.bg : C.ink,
                    opacity: prog(f, 10 + i * 15, 25 + i * 15),
                  }}
                >
                  {v}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      <Sticker delay={90} bg={C.yellow}>
        Papúa: perfecto. Adelia y Barbijo se mezclan.
      </Sticker>
    </Stage>
  );
};
const Resultado = () => (
  <Stage gap={30}>
    <div style={{ display: "flex", gap: 60 }}>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 44,
            color: MORADO,
          }}
        >
          sin respuestas
        </div>
        <Grande valor={F.coincide} dec={1} suf="%" color={MORADO} size={140} />
      </div>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 44,
            color: NARANJA,
          }}
        >
          con respuestas
        </div>
        <Grande
          valor={F.sup_acc}
          dec={1}
          suf="%"
          color={NARANJA}
          size={140}
          delay={40}
        />
      </div>
    </div>
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: 44,
        color: C.ink,
        textAlign: "center",
        width: 860,
      }}
    >
      Sin ver ni una etiqueta, casi lo logró.
    </div>
    <Sticker delay={100} bg={C.green} color={C.bg}>
      Respuesta: 91.9%
    </Sticker>
    <Sfx src="ding.wav" at={45} volume={0.4} />
  </Stage>
);
const Fin = () => (
  <Stage gap={30}>
    <Words text="*Fin* de la serie" size={100} accent={C.green} />
    <MapaML actual="F" siguiente="F" />
    <Sticker delay={40} bg={C.yellow} rotate={-2}>
      ¿Qué tema exploramos ahora?
    </Sticker>
  </Stage>
);

const E = [
  { nombre: "Gancho", voz: "h1", el: <Gancho /> },
  { nombre: "Reto", voz: "h2", el: <RetoE /> },
  { nombre: "Dos mundos", voz: "h3", el: <DosMundos />, min: 200 },
  { nombre: "Tabla", voz: "h4", el: <Tabla />, min: 220 },
  { nombre: "Resultado", voz: "h5", el: <Resultado />, min: 210 },
  { nombre: "Fin", voz: "h6", el: <Fin />, min: 160 },
];
const ESC = E.map((e) => ({ ...e, dur: durVoz(S, e.voz, e.min ?? 120) }));
export const GranFinal: React.FC = () => (
  <Capitulo
    parte={1}
    short={S}
    serie={SERIE_FINAL}
    acento={C.green}
    escenas={ESC}
  />
);
export const TOTAL_FINAL = duracionTotal(ESC.map((e) => e.dur));
