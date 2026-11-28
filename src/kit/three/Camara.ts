import type { Camara } from "./Lienzo";
import type { V3 } from "./Humanoide";

// Movimientos de cámara por fotogramas clave: viajes (dolly), giros alrededor (órbita), zoom (fov)
// y temblor. Todo depende solo del tiempo, así cada cuadro es reproducible.

const suave = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const lerp3 = (a: V3, b: V3, t: number): V3 => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
  lerp(a[2], b[2], t),
];

/** Cámara en el segundo `s` a partir de claves [segundo, cámara] (transiciones suaves). */
export const camaraEn = (claves: [number, Camara][], s: number): Camara => {
  if (s <= claves[0][0]) return claves[0][1];
  for (let i = 0; i < claves.length - 1; i++) {
    const [t0, a] = claves[i];
    const [t1, b] = claves[i + 1];
    if (s <= t1) {
      const k = suave((s - t0) / Math.max(1e-6, t1 - t0));
      return {
        pos: lerp3(a.pos, b.pos, k),
        mira: lerp3(a.mira, b.mira, k),
        fov: lerp(a.fov ?? 35, b.fov ?? 35, k),
      };
    }
  }
  return claves[claves.length - 1][1];
};

/** Órbita: cámara a `radio` del punto `centro`, ángulo según el tiempo. */
export const orbita = (
  centro: V3,
  radio: number,
  altura: number,
  angulo: number,
  fov = 35,
): Camara => ({
  pos: [
    centro[0] + radio * Math.sin(angulo),
    centro[1] + altura,
    centro[2] + radio * Math.cos(angulo),
  ],
  mira: centro,
  fov,
});

/** Temblor de cámara (para impactos o sorpresas); `fuerza` decae a 0. */
export const temblor = (cam: Camara, s: number, fuerza: number): Camara => {
  const dx = Math.sin(s * 53) * 0.03 * fuerza;
  const dy = Math.cos(s * 47) * 0.03 * fuerza;
  return { ...cam, pos: [cam.pos[0] + dx, cam.pos[1] + dy, cam.pos[2]] };
};
