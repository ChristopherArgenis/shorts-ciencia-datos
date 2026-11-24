import { conPose, D, type Aspecto, type Pose } from "./Humanoide";

// Poses de pie para los Shorts. Convención (heredada de meditrack): hombro X negativo = brazo
// hacia adelante; hombro Z positivo = brazo izquierdo hacia afuera (en el derecho, al revés);
// codo negativo = flexión hacia adelante; cabeza X positivo = mirar abajo (negativo = arriba).
const r = (d: number) => (d * Math.PI) / 180;

/** De pie, brazos relajados. La pelvis queda a 0.925 m del piso. */
export const DE_PIE: Pose = {
  pos: [0, 0.925, 0],
  rotY: 0,
  columna: D(0),
  cabeza: D(0),
  hombroI: D(2, 0, 7),
  codoI: r(-10),
  munecaI: D(0, 0, 0),
  hombroD: D(2, 0, -7),
  codoD: r(-10),
  munecaD: D(0, 0, 0),
  caderaI: D(0, 0, 2),
  rodillaI: 0,
  tobilloI: 0,
  caderaD: D(0, 0, -2),
  rodillaD: 0,
  tobilloD: 0,
  agarreI: 0.2,
  agarreD: 0.2,
};

/** Mirando al cielo, con las manos a la altura de la cara (sostiene algo). */
export const MIRA_CIELO: Pose = conPose(DE_PIE, {
  cabeza: D(-35),
  columna: D(-6),
  hombroI: D(-95, 0, -8),
  codoI: r(-70),
  munecaI: D(0, 90, 0),
  hombroD: D(-95, 0, 8),
  codoD: r(-70),
  munecaD: D(0, -90, 0),
  agarreI: 0.8,
  agarreD: 0.8,
});

/** Señalando hacia arriba con el brazo derecho. */
export const SENALA: Pose = conPose(DE_PIE, {
  cabeza: D(-25, -10, 0),
  hombroD: D(-150, 0, -10),
  codoD: r(-8),
  agarreD: 0.9,
});

/** Pensando: mano derecha en la barbilla. */
export const PIENSA: Pose = conPose(DE_PIE, {
  cabeza: D(8, 10, 0),
  hombroD: D(-40, 0, -20),
  codoD: r(-140),
  munecaD: D(0, 0, 0),
  agarreD: 0.7,
  hombroI: D(-30, 0, 30),
  codoI: r(-100),
  agarreI: 0.4,
});

export const ASPECTO_ASTRONOMA: Aspecto = {
  piel: "#c8957a",
  torso: "#3d5a80",
  brazos: "#3d5a80",
  cuello: "#e0e1dd",
  pantalon: "#2d3440",
  zapatos: "#1e1f24",
  cabello: "#3b2a22",
  peinado: "chongo",
  escala: 0.97,
};

export const ASPECTO_OBSERVADOR: Aspecto = {
  piel: "#d2a587",
  torso: "#e07a5f",
  brazos: "#e07a5f",
  cuello: "#f1ede4",
  pantalon: "#3d405b",
  zapatos: "#2b2d42",
  cabello: "#2b2118",
  peinado: "canas",
};
