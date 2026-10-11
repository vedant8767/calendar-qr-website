"use client";

import { createContext, useContext, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { curve, keyframes, lazy, makeTube, reshapeTube, sculpt, smoothstep } from "./geometry";

// 1 = full animation, 0 = still (prefers-reduced-motion).
export const MotionAmp = createContext(1);

const COLORS = {
  artery: "#d93f4c",
  vein: "#4a6fd6",
  pulmonary: "#6a63d8",
  bile: "#6f9a3c",
  urine: "#e9cc6f",
};

function Flesh({ color, ...props }) {
  return (
    <meshPhysicalMaterial
      color={color}
      roughness={0.36}
      clearcoat={0.7}
      clearcoatRoughness={0.3}
      sheen={0.5}
      sheenRoughness={0.6}
      sheenColor="#ffe4e4"
      {...props}
    />
  );
}

function Part({ geometry, color, material, ...props }) {
  return (
    <mesh geometry={geometry} {...props}>
      <Flesh color={color} {...material} />
    </mesh>
  );
}

// Little glowing particles travelling along a path — blood, urine, nutrients.
function Flow({ path, count = 6, color, speed = 0.25, size = 0.05 }) {
  const amp = useContext(MotionAmp);
  const c = useMemo(() => curve(path), [path]);
  const refs = useRef([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed * amp;
    refs.current.forEach((m, i) => {
      if (!m) return;
      const u = (t + i / count) % 1;
      c.getPointAt(u, m.position);
      m.scale.setScalar(Math.sin(Math.PI * u) * (amp ? 1 : 0));
    });
  });
  return Array.from({ length: count }, (_, i) => (
    <mesh key={i} ref={(el) => (refs.current[i] = el)}>
      <sphereGeometry args={[size, 12, 12]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
    </mesh>
  ));
}

/* ───────────────────────────── Heart ───────────────────────────── */

const heart = {
  body: lazy(() =>
    sculpt((v) => {
      const t = (v.y + 1) / 2;
      const s = 0.48 + 0.52 * Math.pow(t, 0.5);
      v.x *= s * 1.02;
      v.z *= s * 0.86;
      v.y *= 1.2;
      if (v.y > 0.85) v.y = 0.85 + (v.y - 0.85) * 0.45;
      // groove between the ventricles, on the front surface
      const g = Math.exp(-((v.x - 0.28 * v.y + 0.08) ** 2) / 0.008);
      if (v.z > 0) v.multiplyScalar(1 - 0.06 * g * smoothstep(0, 0.5, v.z));
      // atria bulge at the top
      v.multiplyScalar(1 + 0.07 * Math.exp(-((v.y - 0.75) ** 2) / 0.04) * smoothstep(-0.2, 0.6, Math.abs(v.x)));
    }),
  ),
  aorta: lazy(
    () =>
      makeTube(
        [
          [-0.1, 0.5, 0.05],
          [-0.15, 1.2, 0.15],
          [0.1, 1.62, 0],
          [0.45, 1.5, -0.3],
          [0.55, 0.9, -0.5],
          [0.5, -0.5, -0.55],
        ],
        0.21,
        { open: [true, false], cap: 0.03 },
      ).geo,
  ),
  branches: lazy(() =>
    [-0.05, 0.14, 0.32].map(
      (x, i) =>
        makeTube(
          [
            [x, 1.5 - i * 0.04, 0.02 - i * 0.08],
            [x - 0.02, 1.85, 0 - i * 0.08],
            [x - 0.05 + i * 0.03, 2.15, -i * 0.08],
          ],
          0.075 - i * 0.008,
          { open: [true, false], cap: 0.15, tubular: 24, radial: 16 },
        ).geo,
    ),
  ),
  pulmonary: lazy(
    () =>
      makeTube(
        [
          [0.02, 0.45, 0.4],
          [0.12, 1.0, 0.45],
          [0.38, 1.24, 0.22],
          [0.85, 1.28, -0.02],
        ],
        0.17,
        { open: [true, false], cap: 0.06, tubular: 48 },
      ).geo,
  ),
  pulmonaryRight: lazy(
    () =>
      makeTube(
        [
          [0.3, 1.2, 0.2],
          [0.0, 1.3, -0.15],
          [-0.65, 1.25, -0.2],
        ],
        0.13,
        { open: [true, false], cap: 0.08, tubular: 32 },
      ).geo,
  ),
  svc: lazy(
    () =>
      makeTube(
        [
          [-0.55, 0.55, 0],
          [-0.56, 1.2, 0],
          [-0.52, 1.95, -0.05],
        ],
        0.15,
        { open: [true, false], cap: 0.06, tubular: 32 },
      ).geo,
  ),
  ivc: lazy(
    () =>
      makeTube(
        [
          [-0.4, -0.3, -0.15],
          [-0.45, -0.9, -0.2],
          [-0.48, -1.5, -0.2],
        ],
        0.16,
        { open: [true, false], cap: 0.06, tubular: 32 },
      ).geo,
  ),
};

function Heart() {
  const amp = useContext(MotionAmp);
  const body = useRef();
  const vessels = useRef();
  useFrame(({ clock }) => {
    const t = (clock.elapsedTime * 1.2) % 1; // 72 bpm
    const lub = Math.exp(-(((t - 0.06) / 0.05) ** 2));
    const dub = 0.6 * Math.exp(-(((t - 0.26) / 0.05) ** 2));
    const beat = (lub + dub) * amp;
    body.current.scale.set(1 + 0.055 * beat, 1 + 0.035 * beat, 1 + 0.055 * beat);
    vessels.current.scale.setScalar(1 + 0.012 * beat);
  });
  return (
    <group position={[0, -0.15, 0]}>
      <group ref={body} position={[0.25, -0.2, 0]} rotation={[0.1, 0, 0.45]}>
        <Part geometry={heart.body()} color="#c22f3d" />
      </group>
      <group ref={vessels}>
        <Part geometry={heart.aorta()} color={COLORS.artery} />
        {heart.branches().map((g, i) => (
          <Part key={i} geometry={g} color={COLORS.artery} />
        ))}
        <Part geometry={heart.pulmonary()} color={COLORS.pulmonary} />
        <Part geometry={heart.pulmonaryRight()} color={COLORS.pulmonary} />
        <Part geometry={heart.svc()} color={COLORS.vein} />
        <Part geometry={heart.ivc()} color={COLORS.vein} />
      </group>
    </group>
  );
}

/* ───────────────────────────── Lungs ───────────────────────────── */

// side: -1 = right lung (viewer's left, 3 lobes), 1 = left lung (2 lobes)
const makeLung = (side) =>
  sculpt((v) => {
    const t = (v.y + 1) / 2;
    const w = 1 - 0.5 * Math.pow(t, 2.2);
    if (v.x * side < 0) v.x *= 0.45; // flat inner face
    v.x *= 0.9 * w;
    v.z *= 0.66 * w;
    v.y *= 1.18;
    // concave base where the lung rests on the diaphragm
    v.y += 0.2 * smoothstep(0.3, 0, t) * Math.max(0, 1 - (v.x * v.x + v.z * v.z) / 0.3);
    // oblique fissure (both lungs) and horizontal fissure (right lung, front only)
    let groove = Math.exp(-((v.y + 0.7 * v.z - 0.05) ** 2) / 0.004);
    if (side < 0) {
      groove += Math.exp(-((v.y - 0.3) ** 2) / 0.003) * smoothstep(0, 0.25, v.z) * smoothstep(-0.1, 0.15, v.y + 0.7 * v.z);
    }
    const g = 1 - 0.08 * Math.min(1, groove);
    v.x *= g;
    v.z *= g;
    // cardiac notch on the inner face of the left lung
    if (side > 0) {
      const notch = Math.exp(-(((v.y + 0.3) / 0.4) ** 2 + ((v.z - 0.3) / 0.35) ** 2));
      v.x += 0.12 * notch * smoothstep(0.15, -0.25, v.x);
    }
  });

const lungs = {
  right: lazy(() => makeLung(-1)),
  left: lazy(() => makeLung(1)),
  trachea: lazy(
    () =>
      makeTube(
        [
          [0, 2.3, 0],
          [0, 1.6, 0.02],
          [0, 0.95, 0],
        ],
        (u) => 0.13 * (1 + 0.09 * Math.max(0, Math.sin(u * 80))),
        { open: [false, true], cap: 0.03, tubular: 160 },
      ).geo,
  ),
  bronchi: lazy(() => [
    makeTube(
      [
        [0, 1.0, 0],
        [-0.35, 0.72, 0],
        [-0.62, 0.45, 0],
      ],
      0.09,
      { open: [true, true], tubular: 32 },
    ).geo,
    makeTube(
      [
        [0, 1.0, 0],
        [0.4, 0.82, 0],
        [0.66, 0.5, 0],
      ],
      0.085,
      { open: [true, true], tubular: 32 },
    ).geo,
  ]),
};

function Lungs() {
  const amp = useContext(MotionAmp);
  const left = useRef();
  const right = useRef();
  useFrame(({ clock }) => {
    const b = Math.sin((clock.elapsedTime * Math.PI * 2) / 4) * amp; // 15 breaths a minute
    for (const m of [left.current, right.current]) m.scale.set(1 + 0.055 * b, 1 + 0.03 * b, 1 + 0.06 * b);
  });
  return (
    <group position={[0, -0.25, 0]}>
      <group ref={right} position={[-0.88, 0, 0]}>
        <Part geometry={lungs.right()} color="#f096a7" />
      </group>
      <group ref={left} position={[0.88, 0, 0]}>
        <Part geometry={lungs.left()} color="#f096a7" />
      </group>
      <Part geometry={lungs.trachea()} color="#f4cfcf" />
      {lungs.bronchi().map((g, i) => (
        <Part key={i} geometry={g} color="#f4cfcf" />
      ))}
      <Sparkles count={40} scale={[3, 3, 1.6]} size={3} speed={0.6 * amp} color="#9fd4ff" opacity={0.8} />
    </group>
  );
}

/* ───────────────────────────── Brain ───────────────────────────── */

const makeHemisphere = (side) =>
  sculpt((v) => {
    const n =
      Math.sin(v.x * 12 + Math.sin(v.z * 7 + v.y * 3) * 2.2) * Math.sin(v.y * 12 + Math.sin(v.x * 8) * 2.2) +
      Math.sin(v.z * 14 + Math.sin(v.y * 9 + v.x * 4) * 2.4) * 0.7;
    v.multiplyScalar(1 + 0.05 * Math.tanh(n * 3));
    v.x *= 0.64;
    v.y *= 0.78;
    v.z *= 1.08;
    if (v.x * side < 0) v.x *= 0.18;
    if (v.y < -0.25) v.y = -0.25 + (v.y + 0.25) * 0.55;
    // temporal lobe hangs a little lower at the front-side
    v.y -= 0.12 * Math.exp(-(((v.z - 0.15) / 0.45) ** 2)) * smoothstep(0.2, 0.6, Math.abs(v.x)) * smoothstep(0.1, -0.3, v.y);
  }, 160, 120);

const brain = {
  right: lazy(() => makeHemisphere(-1)),
  left: lazy(() => makeHemisphere(1)),
  cerebellum: lazy(() =>
    sculpt((v) => {
      v.multiplyScalar(1 + 0.04 * Math.sin(v.y * 34));
      v.x *= 0.56;
      v.y *= 0.3;
      v.z *= 0.36;
    }),
  ),
  stem: lazy(
    () =>
      makeTube(
        [
          [0, -0.2, -0.2],
          [0, -0.75, -0.35],
          [0, -1.35, -0.42],
        ],
        (u) => 0.17 - 0.05 * u,
        { open: [true, false], cap: 0.08, tubular: 32 },
      ).geo,
  ),
};

function Brain() {
  const amp = useContext(MotionAmp);
  const leftMat = useRef();
  const rightMat = useRef();
  useFrame(({ clock }) => {
    const glow = 0.06 + 0.06 * Math.sin(clock.elapsedTime * 3) * amp;
    leftMat.current.emissiveIntensity = glow;
    rightMat.current.emissiveIntensity = glow;
  });
  return (
    <group scale={1.3} position={[0, 0.2, 0]} rotation={[0, -0.7, 0]}>
      <mesh geometry={brain.right()} position={[-0.07, 0, 0]}>
        <Flesh ref={rightMat} color="#f2a9b6" emissive="#ff6f91" />
      </mesh>
      <mesh geometry={brain.left()} position={[0.07, 0, 0]}>
        <Flesh ref={leftMat} color="#f2a9b6" emissive="#ff6f91" />
      </mesh>
      <Part geometry={brain.cerebellum()} color="#e3889b" position={[0, -0.42, -0.72]} />
      <Part geometry={brain.stem()} color="#e8b2a6" />
      <Sparkles count={70} scale={[1.6, 1.3, 2.3]} size={3.5} speed={1.4 * amp} color="#ffe48a" />
    </group>
  );
}

/* ───────────────────────────── Liver ───────────────────────────── */

const PORTAL_PATH = [
  [0.05, -1.15, 0.15],
  [0.0, -0.75, 0.1],
  [-0.1, -0.3, 0.0],
];

const liver = {
  body: lazy(() =>
    sculpt((v) => {
      const s = 1 - 0.65 * smoothstep(-0.3, 1, v.x); // left lobe tapers thin
      v.y *= s;
      v.z *= 0.6 + 0.4 * s;
      v.y *= 1 - 0.35 * smoothstep(-0.6, 1, v.z); // thin front edge
      if (v.y < 0) v.y *= 0.55;
      v.x *= 1.45;
      v.z *= 0.9;
      v.y -= 0.1 * Math.max(0, -v.x); // right lobe hangs lower
      const g = Math.exp(-((v.x - 0.3) ** 2) / 0.012);
      if (v.y > -0.1 && v.z > -0.2) v.multiplyScalar(1 - 0.05 * g);
    }),
  ),
  gallbladder: lazy(() =>
    sculpt((v) => {
      v.x *= 0.15;
      v.z *= 0.15;
      v.y *= 0.3;
      if (v.y < 0) v.multiplyScalar(1.1);
    }),
  ),
  portal: lazy(() => makeTube([...PORTAL_PATH], 0.1, { open: [false, true] }).geo),
  artery: lazy(
    () =>
      makeTube(
        [
          [0.3, -1.15, 0.25],
          [0.2, -0.7, 0.22],
          [0.05, -0.3, 0.1],
        ],
        0.05,
        { open: [false, true] },
      ).geo,
  ),
  bileDuct: lazy(
    () =>
      makeTube(
        [
          [-0.36, -0.62, 0.48],
          [-0.22, -0.85, 0.38],
          [-0.12, -1.15, 0.32],
        ],
        0.04,
        { open: [true, false] },
      ).geo,
  ),
  ivc: lazy(
    () =>
      makeTube(
        [
          [-0.25, 1.1, -0.55],
          [-0.28, 0, -0.6],
          [-0.3, -1.4, -0.55],
        ],
        0.13,
      ).geo,
  ),
};

function Liver() {
  return (
    <group position={[0, 0.25, 0]} rotation={[0.2, 0, 0]} scale={1.1}>
      <Part geometry={liver.body()} color="#8e3631" material={{ roughness: 0.28, clearcoat: 1 }} />
      <Part
        geometry={liver.gallbladder()}
        color={COLORS.bile}
        position={[-0.36, -0.42, 0.5]}
        rotation={[0.6, 0, 0.3]}
      />
      <Part geometry={liver.portal()} color={COLORS.pulmonary} />
      <Part geometry={liver.artery()} color={COLORS.artery} />
      <Part geometry={liver.bileDuct()} color={COLORS.bile} />
      <Part geometry={liver.ivc()} color={COLORS.vein} />
      <Flow path={PORTAL_PATH} color="#ffcf6b" count={5} speed={0.35} size={0.045} />
      <Sparkles count={36} scale={[3.2, 1.6, 1.8]} size={3} speed={0.5} color="#ffd27a" />
    </group>
  );
}

/* ──────────────────────────── Kidneys ──────────────────────────── */

const URETER_RIGHT = [
  [0.6, -0.15, 0.02],
  [0.5, -0.7, 0.06],
  [0.34, -1.4, 0.1],
  [0.18, -1.95, 0.15],
];
const URETER_LEFT = URETER_RIGHT.map(([x, y, z]) => [-x, y, z]);
const RENAL_RIGHT = [
  [0.12, 0.12, -0.3],
  [0.35, 0.1, -0.15],
  [0.6, 0.06, 0],
];
const RENAL_LEFT = [
  [0.12, 0.12, -0.3],
  [-0.2, 0.14, -0.35],
  [-0.6, 0.06, 0],
];

const kidneys = {
  bean: lazy(() => {
    const pts = Array.from({ length: 9 }, (_, i) => {
      const a = (-0.5 + i / 8) * 2.5;
      return [Math.cos(a) * 0.32, Math.sin(a) * 0.55, 0];
    });
    return makeTube(pts, (u, a) => 0.4 * (1 + 0.025 * Math.sin(a * Math.PI * 10) * Math.sin(u * 20)), {
      cap: 0.45,
      tubular: 72,
      radial: 40,
    }).geo;
  }),
  vessels: lazy(() =>
    [
      [RENAL_RIGHT, 0.06, COLORS.artery],
      [RENAL_LEFT, 0.06, COLORS.artery],
      [
        [
          [0.6, -0.04, 0.04],
          [0.2, -0.06, -0.15],
          [-0.15, -0.05, -0.25],
        ],
        0.07,
        COLORS.vein,
      ],
      [
        [
          [-0.6, -0.04, 0.04],
          [-0.35, -0.05, -0.1],
          [-0.15, -0.05, -0.25],
        ],
        0.07,
        COLORS.vein,
      ],
      [
        [
          [0.12, 1.4, -0.3],
          [0.12, -1.6, -0.3],
        ],
        0.12,
        COLORS.artery,
      ],
      [
        [
          [-0.15, 1.4, -0.25],
          [-0.15, -1.6, -0.25],
        ],
        0.14,
        COLORS.vein,
      ],
      [URETER_RIGHT, 0.045, COLORS.urine],
      [URETER_LEFT, 0.045, COLORS.urine],
    ].map(([path, r, color]) => ({ geo: makeTube(path, r, { tubular: 48, radial: 16 }).geo, color })),
  ),
  bladder: lazy(() =>
    sculpt((v) => {
      v.x *= 0.42;
      v.y *= 0.32;
      v.z *= 0.36;
      if (v.y > 0) v.y *= 1 - 0.3 * (1 - Math.abs(v.x) / 0.42);
    }),
  ),
  adrenal: lazy(() =>
    sculpt((v) => {
      const t = (v.y + 1) / 2;
      v.x *= 0.24 * (1 - 0.6 * t);
      v.z *= 0.12;
      v.y *= 0.16;
    }),
  ),
};

function Kidneys() {
  return (
    <group position={[0, 0.45, 0]}>
      {[1, -1].map((side) => (
        <group key={side} position={[side * 0.62, 0, 0]} scale={[side, 1, 0.75]}>
          <Part geometry={kidneys.bean()} color="#a3423b" />
          <Part geometry={kidneys.adrenal()} color="#e3b14c" position={[0.35, 0.68, 0]} rotation={[0, 0, 0.3]} />
        </group>
      ))}
      {kidneys.vessels().map(({ geo, color }, i) => (
        <Part key={i} geometry={geo} color={color} />
      ))}
      <Part
        geometry={kidneys.bladder()}
        color="#f0c964"
        position={[0, -2.12, 0.15]}
        material={{ transparent: true, opacity: 0.85 }}
      />
      <Flow path={RENAL_RIGHT} color="#ff5866" count={4} speed={0.6} size={0.04} />
      <Flow path={RENAL_LEFT} color="#ff5866" count={4} speed={0.6} size={0.04} />
      <Flow path={URETER_RIGHT} color="#ffe27a" count={5} speed={0.3} size={0.05} />
      <Flow path={URETER_LEFT} color="#ffe27a" count={5} speed={0.3} size={0.05} />
    </group>
  );
}

/* ──────────────────────────── Stomach ──────────────────────────── */

const stomachProfile = keyframes([
  [0, 0.11],
  [0.17, 0.12],
  [0.27, 0.42],
  [0.37, 0.64],
  [0.52, 0.6],
  [0.64, 0.46],
  [0.74, 0.3],
  [0.8, 0.17],
  [0.84, 0.11],
  [0.88, 0.15],
  [1, 0.14],
]);

const stomach = {
  tube: lazy(() =>
    makeTube(
      [
        [0.25, 2.0, 0],
        [0.2, 1.3, 0],
        [0.32, 0.85, 0],
        [0.58, 0.4, 0],
        [0.62, -0.3, 0.05],
        [0.3, -0.85, 0.1],
        [-0.25, -1.0, 0.1],
        [-0.7, -0.75, 0.05],
        [-0.95, -0.4, 0],
        [-1.15, -0.45, 0],
        [-1.25, -0.95, 0],
      ],
      (u, a, t) => {
        const wave = Math.sin(Math.PI * 2 * (u * 4 - t * 0.55)) * smoothstep(0.3, 0.45, u) * smoothstep(0.86, 0.72, u);
        return stomachProfile(u) * (1 + 0.09 * wave * stomach.amp);
      },
      { tubular: 160, radial: 36, cap: 0.02 },
    ),
  ),
  amp: 1,
};

function Stomach() {
  const amp = useContext(MotionAmp);
  const tube = stomach.tube();
  useFrame(({ clock }) => {
    stomach.amp = amp;
    reshapeTube(tube, clock.elapsedTime);
  });
  return (
    <group position={[0.05, -0.1, 0]} scale={0.95}>
      <Part geometry={tube.geo} color="#eb948a" />
    </group>
  );
}

/* ──────────────────────────── Pancreas ─────────────────────────── */

const pancreas = {
  body: lazy(
    () =>
      makeTube(
        [
          [-1.05, -0.2, 0.05],
          [-0.6, 0.0, 0.1],
          [0, 0.12, 0.05],
          [0.6, 0.25, -0.05],
          [1.15, 0.45, -0.15],
        ],
        (u, a) => {
          const base = keyframes([
            [0, 0.42],
            [0.18, 0.4],
            [0.35, 0.26],
            [0.7, 0.22],
            [1, 0.15],
          ])(u);
          const ring = a * Math.PI * 2;
          const lumps =
            1 +
            0.035 * Math.sin(u * 85 + Math.sin(ring * 3) * 2.5) * Math.sin(ring * 7 + Math.sin(u * 40) * 2.5) +
            0.025 * Math.sin(u * 31 + Math.cos(ring * 2) * 3);
          return base * lumps;
        },
        { tubular: 120, radial: 40, cap: 0.12 },
      ).geo,
  ),
  duodenum: lazy(
    () =>
      makeTube(
        [
          [-0.5, 0.65, 0.1],
          [-1.1, 0.62, 0.15],
          [-1.62, 0.15, 0.15],
          [-1.55, -0.55, 0.15],
          [-1.0, -0.82, 0.15],
          [-0.35, -0.72, 0.1],
        ],
        0.2,
        { tubular: 96, open: [true, true] },
      ).geo,
  ),
  splenicVein: lazy(
    () =>
      makeTube(
        [
          [-0.6, -0.05, -0.32],
          [0.4, 0.15, -0.38],
          [1.4, 0.5, -0.4],
        ],
        0.07,
      ).geo,
  ),
};

function Pancreas() {
  return (
    <group position={[0.2, 0, 0]} scale={1.05}>
      <Part geometry={pancreas.body()} color="#efbf78" material={{ roughness: 0.55, clearcoat: 0.3 }} />
      <Part geometry={pancreas.duodenum()} color="#e99a90" />
      <Part geometry={pancreas.splenicVein()} color={COLORS.vein} />
      <Sparkles count={60} scale={[2.8, 1.4, 1.2]} size={4} speed={0.8} color="#ffd36b" />
    </group>
  );
}

/* ────────────────────────────── Eye ────────────────────────────── */

function makeIrisTexture() {
  const size = 512;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d");
  const mid = size / 2;
  const grad = g.createRadialGradient(mid, mid, 30, mid, mid, mid);
  grad.addColorStop(0, "#0d2533");
  grad.addColorStop(0.32, "#3b9bd0");
  grad.addColorStop(0.75, "#1f6694");
  grad.addColorStop(1, "#0b1f2e");
  g.fillStyle = grad;
  g.beginPath();
  g.arc(mid, mid, mid, 0, Math.PI * 2);
  g.fill();
  for (let i = 0; i < 420; i++) {
    const a = (i / 420) * Math.PI * 2;
    const r0 = 70 + ((i * 37) % 24);
    const r1 = 180 + ((i * 53) % 70);
    g.strokeStyle = i % 3 ? "rgba(170,225,255,0.16)" : "rgba(5,30,48,0.35)";
    g.lineWidth = 1.5 + (i % 2);
    g.beginPath();
    g.moveTo(mid + Math.cos(a) * r0, mid + Math.sin(a) * r0);
    g.lineTo(mid + Math.cos(a + 0.05) * r1, mid + Math.sin(a + 0.05) * r1);
    g.stroke();
  }
  g.strokeStyle = "rgba(235,200,120,0.4)";
  g.lineWidth = 12;
  g.beginPath();
  g.arc(mid, mid, 100, 0, Math.PI * 2);
  g.stroke();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const eye = {
  sclera: lazy(() => {
    const geo = new THREE.SphereGeometry(1, 96, 64, 0, Math.PI * 2, 0.49, Math.PI - 0.49);
    geo.rotateX(Math.PI / 2);
    return geo;
  }),
  cornea: lazy(() => {
    const geo = new THREE.SphereGeometry(0.55, 64, 24, 0, Math.PI * 2, 0, 1.02);
    geo.rotateX(Math.PI / 2);
    return geo;
  }),
  iris: lazy(makeIrisTexture),
  veins: lazy(() =>
    Array.from({ length: 12 }, (_, k) => {
      const phi0 = (k / 12) * Math.PI * 2 + 0.3 * Math.sin(k * 7);
      const pts = Array.from({ length: 7 }, (_, i) => {
        const theta = 2.3 - i * 0.24;
        const phi = phi0 + 0.18 * Math.sin(i * 1.7 + k);
        const r = 1.004;
        return [r * Math.sin(theta) * Math.cos(phi), r * Math.sin(theta) * Math.sin(phi), r * Math.cos(theta)];
      });
      return makeTube(pts, (u) => 0.012 * (1 - u * 0.7), { tubular: 32, radial: 8, cap: 0.1 }).geo;
    }),
  ),
  nerve: lazy(
    () =>
      makeTube(
        [
          [0, 0, -0.85],
          [0.08, -0.05, -1.4],
          [0.25, -0.15, -2.1],
        ],
        0.17,
        { open: [true, false], cap: 0.06 },
      ).geo,
  ),
};

function Eye() {
  const amp = useContext(MotionAmp);
  const ball = useRef();
  const pupil = useRef();
  useFrame(({ pointer, clock }, dt) => {
    const k = 1 - Math.exp(-dt * 6);
    ball.current.rotation.y += (pointer.x * 0.7 * amp - ball.current.rotation.y) * k;
    ball.current.rotation.x += (-pointer.y * 0.45 * amp - ball.current.rotation.x) * k;
    pupil.current.scale.setScalar(1 + 0.28 * Math.sin(clock.elapsedTime * 0.8) * amp);
  });
  return (
    <group scale={1.25}>
      <group ref={ball}>
        <mesh geometry={eye.sclera()}>
          <Flesh color="#f6f1e9" roughness={0.3} sheen={0} />
        </mesh>
        {eye.veins().map((g, i) => (
          <mesh key={i} geometry={g}>
            <meshStandardMaterial color="#c9414d" roughness={0.5} />
          </mesh>
        ))}
        <mesh position={[0, 0, 0.879]}>
          <circleGeometry args={[0.475, 64]} />
          <meshStandardMaterial map={eye.iris()} roughness={0.6} />
        </mesh>
        <mesh ref={pupil} position={[0, 0, 0.882]}>
          <circleGeometry args={[0.16, 48]} />
          <meshBasicMaterial color="#030405" />
        </mesh>
        <mesh geometry={eye.cornea()} position={[0, 0, 0.594]}>
          <meshPhysicalMaterial
            transmission={1}
            roughness={0.02}
            thickness={0.05}
            ior={1.376}
            transparent
            opacity={0.35}
            clearcoat={1}
            color="#ffffff"
          />
        </mesh>
        <Part geometry={eye.nerve()} color="#efd6a2" />
      </group>
    </group>
  );
}

export const models = {
  heart: Heart,
  lungs: Lungs,
  brain: Brain,
  liver: Liver,
  kidneys: Kidneys,
  stomach: Stomach,
  pancreas: Pancreas,
  eye: Eye,
};

// Part labels, in each model's world space.
export const labels = {
  heart: [
    ["Aorta", [0.12, 1.85, 0.05]],
    ["Pulmonary artery", [0.95, 1.45, 0.05]],
    ["Vena cava", [-0.6, 2.0, 0]],
    ["Ventricles", [0.55, -0.85, 0.6]],
  ],
  lungs: [
    ["Trachea", [0.3, 1.65, 0.2]],
    ["Right lung · 3 lobes", [-1.1, 0.6, 0.4]],
    ["Left lung · 2 lobes", [1.15, 0.6, 0.4]],
  ],
  brain: [
    ["Cerebrum", [0.25, 1.0, 0.6]],
    ["Cerebellum", [1.0, -0.65, -0.4]],
    ["Brainstem", [0.5, -1.55, -0.22]],
  ],
  liver: [
    ["Right lobe", [-1.1, 0.55, 0.5]],
    ["Left lobe", [1.1, 0.45, 0.3]],
    ["Gallbladder", [-0.5, -0.4, 0.75]],
    ["Portal vein", [0.2, -0.95, 0.4]],
  ],
  kidneys: [
    ["Kidney", [1.35, 0.85, 0.2]],
    ["Ureter", [0.62, -0.8, 0.2]],
    ["Bladder", [0, -1.4, 0.55]],
    ["Adrenal gland", [-1.1, 1.3, 0.1]],
  ],
  stomach: [
    ["Oesophagus", [0.28, 1.75, 0.09]],
    ["Fundus & body", [0.86, 0.35, 0.45]],
    ["Pylorus", [-0.85, -0.33, 0.27]],
    ["Duodenum", [-1.17, -1.05, 0.23]],
  ],
  pancreas: [
    ["Head", [-1.0, 0.25, 0.5]],
    ["Body", [0.25, 0.45, 0.35]],
    ["Tail", [1.35, 0.75, 0]],
    ["Duodenum", [-1.65, 0.1, 0.3]],
  ],
  eye: [
    ["Cornea & iris", [0, 0.75, 1.0]],
    ["Sclera", [1.25, 0.25, 0.3]],
    ["Optic nerve", [0.5, -0.5, -2.2]],
  ],
};
