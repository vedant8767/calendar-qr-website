import * as THREE from "three";
import { mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";

// Builds a value once, on first use, and reuses it afterwards.
export const lazy = (fn) => {
  let value;
  return () => (value ??= fn());
};

export const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// Piecewise-smooth interpolation through [u, value] keypoints.
export const keyframes = (stops) => (u) => {
  for (let i = 1; i < stops.length; i++) {
    const [u1, v1] = stops[i];
    const [u0, v0] = stops[i - 1];
    if (u <= u1) return v0 + (v1 - v0) * smoothstep(u0, u1, u);
  }
  return stops[stops.length - 1][1];
};

// A unit sphere sculpted vertex-by-vertex. `deform` mutates a Vector3 in place.
export function sculpt(deform, widthSegments = 128, heightSegments = 96) {
  let geo = new THREE.SphereGeometry(1, widthSegments, heightSegments);
  geo.deleteAttribute("uv");
  geo = mergeVertices(geo);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    deform(v);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
}

// A tube whose radius can vary along its length (u: 0→1), around it (a: 0→1)
// and over time (t). Ends close with rounded caps unless `open` is set.
export function makeTube(points, radius, { tubular = 96, radial = 28, cap = 0.05, open = [false, false] } = {}) {
  const curve = new THREE.CatmullRomCurve3(
    points.map((p) => new THREE.Vector3(...p)),
    false,
    "centripetal",
  );
  const geo = new THREE.TubeGeometry(curve, tubular, 1, radial, false);
  const pos = geo.attributes.position;
  const centers = Array.from({ length: tubular + 1 }, (_, i) => curve.getPointAt(i / tubular));
  const dirs = new Float32Array(pos.count * 3);
  for (let i = 0; i <= tubular; i++) {
    for (let j = 0; j <= radial; j++) {
      const k = i * (radial + 1) + j;
      dirs[k * 3] = pos.getX(k) - centers[i].x;
      dirs[k * 3 + 1] = pos.getY(k) - centers[i].y;
      dirs[k * 3 + 2] = pos.getZ(k) - centers[i].z;
    }
  }
  const radiusFn = typeof radius === "number" ? () => radius : radius;
  const capFn = (u) => {
    let f = 1;
    if (!open[0] && u < cap) f *= Math.sqrt(1 - (1 - u / cap) ** 2);
    if (!open[1] && u > 1 - cap) f *= Math.sqrt(1 - (1 - (1 - u) / cap) ** 2);
    return f;
  };
  const tube = { geo, curve, centers, dirs, tubular, radial, radiusFn, capFn };
  reshapeTube(tube, 0);
  return tube;
}

export function reshapeTube(tube, t) {
  const { geo, centers, dirs, tubular, radial, radiusFn, capFn } = tube;
  const pos = geo.attributes.position;
  for (let i = 0; i <= tubular; i++) {
    const u = i / tubular;
    const c = centers[i];
    const cap = capFn(u);
    for (let j = 0; j <= radial; j++) {
      const k = i * (radial + 1) + j;
      const r = radiusFn(u, j / radial, t) * cap;
      pos.setXYZ(k, c.x + dirs[k * 3] * r, c.y + dirs[k * 3 + 1] * r, c.z + dirs[k * 3 + 2] * r);
    }
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  // Average normals across the seam so it doesn't show as a line.
  const n = geo.attributes.normal;
  for (let i = 0; i <= tubular; i++) {
    const a = i * (radial + 1);
    const b = a + radial;
    const x = (n.getX(a) + n.getX(b)) / 2;
    const y = (n.getY(a) + n.getY(b)) / 2;
    const z = (n.getZ(a) + n.getZ(b)) / 2;
    n.setXYZ(a, x, y, z);
    n.setXYZ(b, x, y, z);
  }
  n.needsUpdate = true;
}

export const curve = (points) =>
  new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)), false, "centripetal");
