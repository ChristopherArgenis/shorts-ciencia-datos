import React, { useLayoutEffect } from "react";
import { useThree } from "@react-three/fiber";
import { ThreeCanvas } from "@remotion/three";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
const W = 1080;
const H = 1920;
import type { V3 } from "./Humanoide";

export type Camara = { pos: V3; mira: V3; fov?: number };

const Rig: React.FC<{ cam: Camara }> = ({ cam }) => {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const invalidate = useThree((s) => s.invalidate);
  useLayoutEffect(() => {
    camera.position.set(...cam.pos);
    camera.fov = cam.fov ?? 35;
    camera.lookAt(...cam.mira);
    camera.updateProjectionMatrix();
    invalidate();
  }, [
    camera,
    invalidate,
    cam.pos[0],
    cam.pos[1],
    cam.pos[2],
    cam.mira[0],
    cam.mira[1],
    cam.mira[2],
    cam.fov,
  ]);
  return null;
};

/** Iluminación ambiental de interior generada por Three.js (RoomEnvironment): sin imágenes externas. */
const Ambiente: React.FC<{ intensidad: number }> = ({ intensidad }) => {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  useLayoutEffect(() => {
    const pm = new THREE.PMREMGenerator(gl);
    const tex = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = tex;
    scene.environmentIntensity = intensidad;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.0;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
    return () => {
      tex.dispose();
      pm.dispose();
    };
  }, [gl, scene, intensidad]);
  return null;
};

export const Lienzo: React.FC<{
  cam: Camara;
  fondo?: string;
  luz?: { pos: V3; color?: string; intensidad?: number };
  ambiente?: number;
  children: React.ReactNode;
}> = ({
  cam,
  fondo = "#e9e3da",
  luz = { pos: [2.5, 4.5, 3] },
  ambiente = 0.55,
  children,
}) => (
  <ThreeCanvas
    width={W}
    height={H}
    shadows
    dpr={1}
    gl={{ antialias: true }}
    camera={{ fov: cam.fov ?? 35, near: 0.05, far: 60 }}
    style={{ position: "absolute", inset: 0, background: fondo }}
  >
    <Rig cam={cam} />
    <Ambiente intensidad={ambiente} />
    <color attach="background" args={[fondo]} />
    <hemisphereLight args={["#fff8ee", "#b9a58f", 0.45]} />
    <directionalLight
      castShadow
      position={luz.pos}
      intensity={luz.intensidad ?? 2.2}
      color={luz.color ?? "#fff4e5"}
      shadow-mapSize-width={2048}
      shadow-mapSize-height={2048}
      shadow-camera-left={-4}
      shadow-camera-right={4}
      shadow-camera-top={4}
      shadow-camera-bottom={-4}
      shadow-bias={-0.0004}
      shadow-radius={4}
    />
    {children}
  </ThreeCanvas>
);
