// Física del mundo real, en fórmulas cerradas (sin estado): cada cuadro se calcula solo con el tiempo.
// g = 9.81 m/s². Distancias en metros, tiempos en segundos.

export const G = 9.81;

/** Altura de una pelota que cae desde h0 y rebota (coeficiente de restitución e, 0..1). */
export const rebote = (t: number, h0: number, e = 0.6) => {
  let tt = t;
  let v = Math.sqrt(2 * G * h0); // velocidad al tocar el piso
  const caida = Math.sqrt((2 * h0) / G);
  if (tt <= caida) return h0 - 0.5 * G * tt * tt;
  tt -= caida;
  for (let i = 0; i < 30; i++) {
    v *= e;
    const vuelo = (2 * v) / G;
    if (tt <= vuelo) return v * tt - 0.5 * G * tt * tt;
    tt -= vuelo;
  }
  return 0;
};

/** Tiro parabólico: posición [x, y] con velocidad v0 y ángulo (rad). */
export const proyectil = (
  t: number,
  v0: number,
  angulo: number,
  y0 = 0,
): [number, number] => [
  v0 * Math.cos(angulo) * t,
  Math.max(0, y0 + v0 * Math.sin(angulo) * t - 0.5 * G * t * t),
];

/** Ángulo de un péndulo de largo L (aprox. de ángulos pequeños, con amortiguamiento). */
export const pendulo = (t: number, L: number, angulo0: number, amort = 0.15) =>
  angulo0 * Math.exp(-amort * t) * Math.cos(Math.sqrt(G / L) * t);

/** Resorte amortiguado: va de 0 a 1 con un pequeño rebote (para objetos que "caen en su lugar"). */
export const resorte = (t: number, frecuencia = 2.2, amort = 4) =>
  t <= 0
    ? 0
    : 1 - Math.exp(-amort * t) * Math.cos(2 * Math.PI * frecuencia * t);

/** Giro de una ruleta o rueda que frena con fricción constante: ángulo recorrido. */
export const frenado = (t: number, w0: number, desaceleracion: number) => {
  const tFin = w0 / desaceleracion;
  const tt = Math.min(t, tFin);
  return w0 * tt - 0.5 * desaceleracion * tt * tt;
};
