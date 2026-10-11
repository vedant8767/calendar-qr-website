"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import { labels, models, MotionAmp } from "./models";

// Scales and swings each organ in when it is selected.
function Appear({ children }) {
  const ref = useRef();
  useFrame((_, dt) => {
    const g = ref.current;
    const k = 1 - Math.exp(-dt * 7);
    const s = g.scale.x + (1 - g.scale.x) * k;
    g.scale.setScalar(s);
    g.rotation.y -= g.rotation.y * k;
  });
  return (
    <group ref={ref} scale={0.01} rotation={[0, -1.2, 0]}>
      {children}
    </group>
  );
}

// OrbitControls blocks all touch scrolling; let vertical swipes scroll the page.
function AllowPageScroll() {
  const get = useThree((s) => s.get);
  useEffect(() => {
    get().gl.domElement.style.touchAction = "pan-y";
  });
  return null;
}

// Projects each label's 3D anchor to screen space and moves its DOM element
// there. Labels on the far side of the organ fade out.
const _v = new THREE.Vector3();
const _n = new THREE.Vector3();
const _cam = new THREE.Vector3();

// Pull the camera back on tall, narrow screens so wide organs stay in frame.
function FitCamera() {
  const get = useThree((s) => s.get);
  const aspect = useThree((s) => s.size.width / s.size.height);
  useEffect(() => {
    const { camera } = get();
    camera.position.setLength(6.4 * Math.min(1.4, Math.max(1, 0.95 / aspect)));
  }, [aspect, get]);
  return null;
}

function LabelProjector({ points, elements }) {
  const anchor = useRef();
  useFrame(({ camera, size }) => {
    const m = anchor.current.matrixWorld;
    const grow = anchor.current.parent.scale.x;
    _cam.copy(camera.position).normalize();
    points.forEach(([, p], i) => {
      const el = elements.current[i];
      if (!el) return;
      _v.set(...p).applyMatrix4(m);
      const facing = _n.copy(_v).normalize().dot(_cam);
      _v.project(camera);
      const x = ((_v.x + 1) / 2) * size.width;
      const y = ((1 - _v.y) / 2) * size.height;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      el.style.opacity = String(THREE.MathUtils.smoothstep(facing, -0.2, 0.25) * THREE.MathUtils.smoothstep(grow, 0.8, 1));
    });
  });
  return <group ref={anchor} />;
}

export default function OrganStage({ organ, showLabels }) {
  const reduced = useReducedMotion();
  const Model = models[organ.slug];
  const isEye = organ.slug === "eye";
  const points = labels[organ.slug];
  const labelEls = useRef([]);

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0.3, 6.2], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
        aria-label={`Interactive 3D model of the ${organ.name.toLowerCase()}`}
        role="img"
      >
        <MotionAmp.Provider value={reduced ? 0 : 1}>
          <ambientLight intensity={0.35} />
          <directionalLight position={[3, 4, 5]} intensity={1.8} />
          <directionalLight position={[-4, -1, -3]} intensity={0.8} color={organ.color} />
          <Environment resolution={256}>
            <Lightformer form="rect" intensity={2.2} position={[0, 3, 4]} scale={[6, 2, 1]} />
            <Lightformer form="ring" color={organ.color} intensity={2} position={[-4, 1, -2]} scale={3} />
            <Lightformer form="rect" intensity={0.8} position={[4, -1, 2]} scale={[2, 4, 1]} />
            <Lightformer form="rect" color="#9ec5ff" intensity={0.6} position={[0, -4, 0]} rotation-x={Math.PI / 2} scale={[8, 8, 1]} />
          </Environment>

          <Suspense fallback={null}>
            <Appear key={organ.slug}>
              <Model />
              {showLabels && <LabelProjector points={points} elements={labelEls} />}
            </Appear>
          </Suspense>

          <ContactShadows position={[0, -2.4, 0]} opacity={0.45} blur={2.6} scale={9} far={4} color="#000000" />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            autoRotate={!isEye && !reduced}
            autoRotateSpeed={0.8}
            minPolarAngle={Math.PI * 0.3}
            maxPolarAngle={Math.PI * 0.7}
          />
          <AllowPageScroll />
          <FitCamera />
        </MotionAmp.Provider>
      </Canvas>
      {showLabels && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {points.map(([text], i) => (
            <span
              key={`${organ.slug}-${text}`}
              ref={(el) => (labelEls.current[i] = el)}
              className="absolute left-0 top-0 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-ink opacity-0 shadow-lg backdrop-blur transition-opacity duration-200"
              style={{ boxShadow: `0 0 0 1px ${organ.color}55, 0 6px 20px -6px rgb(0 0 0 / 0.5)` }}
            >
              <span className="size-1.5 rounded-full" style={{ background: organ.color }} />
              {text}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
