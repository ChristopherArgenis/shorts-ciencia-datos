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

// ---------- Poses y aspectos para la serie "Tu intuición pierde" ----------

/** Preocupado: manos en la cabeza. */
export const PREOCUPADO: Pose = conPose(DE_PIE, {
  cabeza: D(12),
  hombroI: D(-120, 0, 40),
  codoI: r(-130),
  agarreI: 0.4,
  hombroD: D(-120, 0, -40),
  codoD: r(-130),
  agarreD: 0.4,
});

/** Celebra: los dos brazos arriba. */
export const CELEBRA: Pose = conPose(DE_PIE, {
  cabeza: D(-15),
  hombroI: D(-165, 0, 25),
  codoI: r(-15),
  agarreI: 0.9,
  hombroD: D(-165, 0, -25),
  codoD: r(-15),
  agarreD: 0.9,
});

/** Señala al frente con el brazo derecho (a una puerta, a un objeto). */
export const SENALA_FRENTE: Pose = conPose(DE_PIE, {
  cabeza: D(5, -10, 0),
  hombroD: D(-80, 0, -8),
  codoD: r(-5),
  agarreD: 0.9,
});

/** Lee algo que sostiene con las dos manos frente al pecho (un papel, un teléfono). */
export const LEE: Pose = conPose(DE_PIE, {
  cabeza: D(28),
  hombroI: D(-38, 0, -10),
  codoI: r(-100),
  munecaI: D(0, 90, 0),
  agarreI: 0.7,
  hombroD: D(-38, 0, 10),
  codoD: r(-100),
  munecaD: D(0, -90, 0),
  agarreD: 0.7,
});

/** Brazos cruzados (espera, duda). */
export const CRUZADO: Pose = conPose(DE_PIE, {
  cabeza: D(6, 8, 0),
  hombroI: D(-55, 0, -25),
  codoI: r(-120),
  agarreI: 0.5,
  hombroD: D(-55, 0, 25),
  codoD: r(-120),
  agarreD: 0.5,
});

/**
 * Ciclo de caminata (pose en función del tiempo `s` en segundos).
 * Piernas y brazos opuestos, rebote de la pelvis y pasos de `paso` metros por segundo hacia +Z.
 */
export const caminar = (
  s: number,
  velocidad = 1.2,
  base: Pose = DE_PIE,
): Pose => {
  const w = 2 * Math.PI * 0.9 * velocidad; // pasos por segundo según la velocidad
  const a = Math.sin(s * w);
  const b = Math.sin(s * w + Math.PI);
  return conPose(base, {
    pos: [
      base.pos[0],
      base.pos[1] - 0.025 + 0.025 * Math.abs(Math.cos(s * w)),
      base.pos[2] + s * velocidad,
    ],
    caderaI: D(-28 * a, 0, 2),
    rodillaI: r(Math.max(0, 40 * Math.sin(s * w - 1.2))),
    caderaD: D(-28 * b, 0, -2),
    rodillaD: r(Math.max(0, 40 * Math.sin(s * w + Math.PI - 1.2))),
    hombroI: D(24 * a, 0, 7),
    codoI: r(-20),
    hombroD: D(24 * b, 0, -7),
    codoD: r(-20),
    columna: D(3, 4 * a, 0),
  });
};

export const ASPECTO_PACIENTE: Aspecto = {
  piel: "#e0ac8a",
  torso: "#7fb3d5",
  brazos: "#7fb3d5",
  cuello: "#7fb3d5",
  pantalon: "#7fb3d5",
  zapatos: "#e9ecef",
  cabello: "#4a3426",
  peinado: "canas",
};
export const ASPECTO_DOCTORA: Aspecto = {
  piel: "#a8785a",
  torso: "#f8f9fa",
  brazos: "#f8f9fa",
  cuello: "#74c0fc",
  pantalon: "#343a40",
  zapatos: "#212529",
  cabello: "#1f1612",
  peinado: "chongo",
  escala: 0.97,
};
export const ASPECTO_CONCURSANTE: Aspecto = {
  piel: "#d9a57f",
  torso: "#f59f00",
  brazos: "#f59f00",
  cuello: "#fff3bf",
  pantalon: "#364fc7",
  zapatos: "#212529",
  cabello: "#3b2a22",
  peinado: "canas",
};
export const ASPECTO_PRESENTADOR: Aspecto = {
  piel: "#c58c6a",
  torso: "#212529",
  brazos: "#212529",
  cuello: "#f8f9fa",
  pantalon: "#212529",
  zapatos: "#000000",
  cabello: "#adb5bd",
  peinado: "canas",
  lentes: true,
};
