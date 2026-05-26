import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Html, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function LoadingModel() {
  return (
    <Html center>
      <div className="model-loader">Loading protection system</div>
    </Html>
  );
}

function Extinguisher({ storyRef, reducedMotion, compact, tablet }) {
  const group = useRef();
  const { scene } = useGLTF("/assets/fire-extinguisher.glb");
  const model = useMemo(() => scene.clone(true), [scene]);

  useFrame((state, delta) => {
    if (!group.current || !storyRef.current) {
      return;
    }

    const viewportHeight = Math.max(window.innerHeight, 1);
    const storyTop = storyRef.current.getBoundingClientRect().top;
    const pagesTravelled = -storyTop / viewportHeight;
    const zoom = THREE.MathUtils.smoothstep(pagesTravelled, 0.16, 0.9);
    const unfurl = THREE.MathUtils.smoothstep(pagesTravelled, 0.45, 1.12);
    const label = document.getElementById("label-story");
    const finale = document.querySelector(".finale");
    const rollProgress = label
      ? THREE.MathUtils.clamp(
          (viewportHeight * 0.35 - label.getBoundingClientRect().top)
            / Math.max(label.offsetHeight + (finale?.offsetHeight ?? 0) - viewportHeight * 0.45, 1),
          0,
          1,
        )
      : 0;
    const returnProgress = finale
      ? THREE.MathUtils.smoothstep(
          viewportHeight * 0.88 - finale.getBoundingClientRect().top,
          0,
          viewportHeight * 0.9,
        )
      : 0;
    const motion = zoom;
    const heroScale = compact ? 1.4 : tablet ? 2.12 : 2.55;
    const closeUpScale = compact ? 9 : 14.6;
    const surfaceScale = compact ? 5.25 : 9.2;
    const heroX = compact ? 0 : tablet ? 0.7 : 1.54;
    const heroY = compact ? 0.55 : 0;

    let scale = THREE.MathUtils.lerp(heroScale, closeUpScale, motion);
    scale = THREE.MathUtils.lerp(scale, surfaceScale, unfurl);
    scale = THREE.MathUtils.lerp(scale, heroScale, returnProgress);
    let x = THREE.MathUtils.lerp(heroX, 0, motion);
    x = THREE.MathUtils.lerp(x, heroX, returnProgress);
    let y = THREE.MathUtils.lerp(heroY, 0, motion);
    y = THREE.MathUtils.lerp(y, heroY, returnProgress);

    const labelFacing = Math.PI - 0.42;
    const turnIn = reducedMotion
      ? THREE.MathUtils.lerp(labelFacing, labelFacing + 0.42, motion)
      : labelFacing + motion * (Math.PI * 2 + 1.05);
    const recordRoll = reducedMotion ? 0 : rollProgress * Math.PI * 10;
    const finalFacing = reducedMotion ? labelFacing : labelFacing + Math.PI * 12;
    const targetRotationY = THREE.MathUtils.lerp(turnIn + recordRoll, finalFacing, returnProgress);
    const targetRotationX = reducedMotion
      ? 0
      : -Math.sin(motion * Math.PI) * 0.36 * (1 - unfurl)
        + Math.sin(rollProgress * Math.PI * 2) * 0.018 * (1 - returnProgress);
    const landscapeRotation = -Math.PI * 0.5 * unfurl * (1 - returnProgress);
    const closeUpTilt = reducedMotion
      ? 0
      : Math.sin(motion * Math.PI) * 0.14 * (1 - unfurl) * (1 - returnProgress);
    const targetRotationZ = landscapeRotation + closeUpTilt;
    const damping = reducedMotion ? 12 : 5.1;

    group.current.scale.setScalar(
      THREE.MathUtils.damp(group.current.scale.x, scale, damping, delta),
    );
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, x, damping, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, y, damping, delta);
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      targetRotationY,
      damping,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      targetRotationX,
      damping,
      delta,
    );
    group.current.rotation.z = THREE.MathUtils.damp(
      group.current.rotation.z,
      targetRotationZ,
      damping,
      delta,
    );

    if (!reducedMotion && zoom < 0.08) {
      group.current.position.y += Math.sin(state.clock.elapsedTime * 1.1) * 0.0007;
    }
  });

  return (
    <group
      ref={group}
      position={[compact ? 0 : tablet ? 0.7 : 1.54, compact ? 0.55 : 0, 0]}
      rotation={[0, Math.PI - 0.42, 0]}
      scale={compact ? 1.4 : tablet ? 2.12 : 2.55}
    >
      <Center>
        <primitive object={model} />
      </Center>
    </group>
  );
}

export default function ExtinguisherStage({ storyRef }) {
  const [preferences, setPreferences] = useState({
    reducedMotion: false,
    compact: false,
    tablet: false,
  });

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactQuery = window.matchMedia("(max-width: 620px)");
    const tabletQuery = window.matchMedia("(min-width: 621px) and (max-width: 940px)");
    const updatePreferences = () => {
      setPreferences({
        reducedMotion: motionQuery.matches,
        compact: compactQuery.matches,
        tablet: tabletQuery.matches,
      });
    };

    updatePreferences();
    motionQuery.addEventListener("change", updatePreferences);
    compactQuery.addEventListener("change", updatePreferences);
    tabletQuery.addEventListener("change", updatePreferences);
    return () => {
      motionQuery.removeEventListener("change", updatePreferences);
      compactQuery.removeEventListener("change", updatePreferences);
      tabletQuery.removeEventListener("change", updatePreferences);
    };
  }, []);

  return (
    <Canvas
      className="model-canvas"
      camera={{ fov: 30, position: [0, 0.05, 5] }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      shadows="basic"
    >
      <ambientLight intensity={1.45} />
      <directionalLight castShadow intensity={2.1} position={[3.5, 4.5, 4]} />
      <directionalLight intensity={1.35} position={[-4, 2, 2]} color="#ffd3b0" />
      <pointLight intensity={1.35} position={[0, -2.5, 3]} color="#ff7200" />
      <Suspense fallback={<LoadingModel />}>
        <Extinguisher
          storyRef={storyRef}
          reducedMotion={preferences.reducedMotion}
          compact={preferences.compact}
          tablet={preferences.tablet}
        />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/assets/fire-extinguisher.glb");
