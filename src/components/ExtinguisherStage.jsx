import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";

const RED = "#cf241c";
function Metal({ color = RED, roughness = 0.28, metalness = 0.45 }) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={roughness}
      metalness={metalness}
    />
  );
}
function Cylinder({
  position = [0, 0, 0],
  radius = 0.2,
  height = 0.2,
  color = RED,
  rotation = [0, 0, 0],
}) {
  return (
    <mesh castShadow receiveShadow position={position} rotation={rotation}>
      <cylinderGeometry args={[radius, radius, height, 48]} />
      <Metal color={color} />
    </mesh>
  );
}
function Tube({ points, radius = 0.075, color = "#202322" }) {
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p))),
    [points],
  );
  return (
    <mesh castShadow>
      <tubeGeometry args={[curve, 80, radius, 12, false]} />
      <Metal color={color} roughness={0.68} metalness={0.05} />
    </mesh>
  );
}
function Extinguisher() {
  const { scene } = useLoader(GLTFLoader, "/assets/fire-extinguisher.glb");
  const model = useMemo(() => {
    const copy = scene.clone(true);
    copy.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(copy);
    const center = bounds.getCenter(new THREE.Vector3());
    const height = bounds.getSize(new THREE.Vector3()).y;
    const root = new THREE.Group();
    copy.position.sub(center);
    root.add(copy);
    root.scale.setScalar(3.35 / height);
    copy.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
    return root;
  }, [scene]);
  return (
    <primitive
      object={model}
      rotation={[0, Math.PI - 0.25, -0.1]}
      position={[0, 0.15, 0]}
    />
  );
}
function HoseReel() {
  return (
    <group position={[0, 0.15, 0]} rotation={[0, -0.28, 0]}>
      <Cylinder
        position={[0, 0, -0.23]}
        radius={1.2}
        height={0.13}
        rotation={[Math.PI / 2, 0, 0]}
      />
      {[0.38, 0.49, 0.6, 0.71, 0.82, 0.93, 1.04].map((r) => (
        <mesh key={r} castShadow position={[0, 0, -0.03]}>
          <torusGeometry args={[r, 0.066, 12, 80]} />
          <Metal color="#242525" roughness={0.65} metalness={0.08} />
        </mesh>
      ))}
      <mesh castShadow position={[0, 0, 0.08]}>
        <torusGeometry args={[1.16, 0.09, 16, 80]} />
        <Metal />
      </mesh>
      <Cylinder
        radius={0.34}
        height={0.28}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 0.07]}
      />
      <Cylinder
        radius={0.12}
        height={0.32}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 0.13]}
        color="#aaa9a2"
      />
      {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle) => (
        <group rotation={[0, 0, angle]} key={angle}>
          <mesh position={[0, 0.72, 0.12]} castShadow>
            <boxGeometry args={[0.1, 0.82, 0.08]} />
            <Metal />
          </mesh>
        </group>
      ))}
      <Cylinder
        position={[0, -1.07, -0.4]}
        radius={0.1}
        height={0.9}
        color="#868983"
      />
      <Tube
        points={[
          [1.02, -0.23, 0],
          [1.2, -0.85, 0],
          [1.05, -1.4, 0.2],
          [0.25, -1.56, 0.45],
          [-0.9, -1.37, 0.5],
          [-1.35, -0.78, 0.4],
        ]}
      />
      <group position={[-1.35, -0.73, 0.4]} rotation={[0, 0, -0.28]}>
        <Cylinder radius={0.105} height={0.44} color="#b9aa74" />
        <Cylinder
          position={[0, 0.28, 0]}
          radius={0.075}
          height={0.18}
          color="#202322"
        />
      </group>
    </group>
  );
}
function Hydrant() {
  return (
    <group position={[0, -0.02, 0]} rotation={[0, -0.3, 0]}>
      <Cylinder radius={0.44} height={2.15} />
      <Cylinder
        position={[0, -1.13, 0]}
        radius={0.64}
        height={0.19}
        color="#a11d16"
      />
      <Cylinder position={[0, 0.87, 0]} radius={0.53} height={0.13} />
      <mesh position={[0, 1.07, 0]} castShadow>
        <sphereGeometry args={[0.46, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <Metal />
      </mesh>
      <Cylinder
        position={[0, 1.54, 0]}
        radius={0.13}
        height={0.14}
        color="#8b8e89"
      />
      <Cylinder
        position={[0, 0.21, 0.53]}
        radius={0.3}
        height={0.6}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <Cylinder
        position={[0, 0.21, 0.88]}
        radius={0.34}
        height={0.15}
        rotation={[Math.PI / 2, 0, 0]}
        color="#b8b8ad"
      />
      <Cylinder
        position={[-0.57, 0.35, 0]}
        radius={0.23}
        height={0.7}
        rotation={[0, 0, Math.PI / 2]}
      />
      <Cylinder
        position={[0.57, 0.35, 0]}
        radius={0.23}
        height={0.7}
        rotation={[0, 0, Math.PI / 2]}
      />
      {[-1, 1].map((side) => (
        <Cylinder
          key={side}
          position={[side * 0.92, 0.35, 0]}
          radius={0.28}
          height={0.15}
          rotation={[0, 0, Math.PI / 2]}
          color="#b8b8ad"
        />
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Cylinder
          key={i}
          position={[
            Math.cos((i * Math.PI) / 3) * 0.5,
            -1.0,
            Math.sin((i * Math.PI) / 3) * 0.5,
          ]}
          radius={0.045}
          height={0.1}
          color="#b8b8ad"
        />
      ))}
      <mesh position={[0, 1.64, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.33, 0.045, 12, 40]} />
        <Metal color="#202322" />
      </mesh>
    </group>
  );
}
function Ready({ onReady }) {
  useEffect(() => {
    onReady();
  }, [onReady]);
  return null;
}
function Turntable({ rotation, dragging, children }) {
  const group = useRef(null);
  const invalidate = useThree((state) => state.invalidate);
  const reducedMotion = useRef(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reducedMotion.current = query.matches;
      invalidate();
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [invalidate]);
  useEffect(() => {
    invalidate();
  }, [rotation, dragging, invalidate]);
  useFrame((_, delta) => {
    if (!group.current) return;
    const current = group.current.rotation;
    if (dragging || reducedMotion.current) {
      current.set(rotation.x, rotation.y, 0);
      return;
    }
    // Return smoothly on release, then stop rendering once at rest.
    current.x = THREE.MathUtils.damp(
      current.x,
      rotation.x,
      18,
      Math.min(delta, 0.05),
    );
    current.y = THREE.MathUtils.damp(
      current.y,
      rotation.y,
      18,
      Math.min(delta, 0.05),
    );
    if (
      Math.abs(current.x - rotation.x) + Math.abs(current.y - rotation.y) <
      0.001
    ) {
      current.set(rotation.x, rotation.y, 0);
    } else {
      invalidate();
    }
  });
  return <group ref={group}>{children}</group>;
}
export default function ExtinguisherStage({
  selected,
  rotation,
  dragging,
  onReady,
  onFailure,
}) {
  return (
    <Canvas
      className="equipment-canvas"
      frameloop="demand"
      dpr={[1, 1.5]}
      shadows={{ type: THREE.PCFShadowMap }}
      camera={{ position: [0, 0.8, 7.9], fov: 34 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      onCreated={({ gl, camera }) => {
        camera.lookAt(0, 0, 0);
        gl.domElement.addEventListener("webglcontextlost", onFailure, {
          once: true,
        });
      }}
    >
      <ambientLight intensity={1.8} />
      <hemisphereLight args={["#fff6e9", "#a8927b", 1.8]} />
      <directionalLight
        position={[3, 5, 5]}
        intensity={4}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-normalBias={0.035}
      />
      <directionalLight position={[-4, 2, 3]} intensity={2} color="#ffe9d2" />
      <directionalLight position={[1, 1, -4]} intensity={3} color="#ffffff" />
      <Turntable rotation={rotation} dragging={dragging}>
        <Suspense fallback={null}>
          {selected === 0 ? (
            <Extinguisher />
          ) : selected === 1 ? (
            <HoseReel />
          ) : (
            <Hydrant />
          )}
          <Ready onReady={onReady} />
        </Suspense>
      </Turntable>
      <Cylinder
        position={[0, -1.65, 0]}
        radius={1.65}
        height={0.17}
        color="#ded4c6"
      />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.75, 0]}
        receiveShadow
      >
        <planeGeometry args={[30, 30]} />
        <shadowMaterial transparent opacity={0.16} />
      </mesh>
    </Canvas>
  );
}
