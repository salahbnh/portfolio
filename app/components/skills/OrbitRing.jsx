'use client';
import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import { ATLAS_MAP } from './atlasMap';
import './materials';

// Build a plane geometry whose UVs are remapped to one atlas cell, so every
// icon shares ONE texture upload (offset/repeat baked straight into the UVs).
function useAtlasPlane(iconPath, size) {
  return useMemo(() => {
    const geo = new THREE.PlaneGeometry(size, size);
    const cell = ATLAS_MAP[iconPath];
    if (cell) {
      const uv = geo.attributes.uv;
      const [ox, oy] = cell.offset;
      const [rx, ry] = cell.repeat;
      for (let i = 0; i < uv.count; i++) {
        uv.setXY(i, ox + uv.getX(i) * rx, oy + uv.getY(i) * ry);
      }
      uv.needsUpdate = true;
    }
    return geo;
  }, [iconPath, size]);
}

function SkillIcon({ skill, baseAngle, radius, angleRef, dimmed, atlas, nodesRef }) {
  const groupRef = useRef(null);
  const planeRef = useRef(null);
  const glowRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const worldPos = useMemo(() => new THREE.Vector3(), []);

  // Stronger skills sit a touch larger and glow brighter.
  const baseSize = 1.2 + skill.level * 0.5;
  const geo = useAtlasPlane(skill.icon, baseSize);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const θ = baseAngle + angleRef.current;
    groupRef.current.position.set(Math.cos(θ) * radius, 0, Math.sin(θ) * radius);

    // Report current world position + active flag for the constellation lines.
    groupRef.current.getWorldPosition(worldPos);
    const node = nodesRef.current.get(skill.name);
    if (node) { node.position.copy(worldPos); node.active = !dimmed; }
    else nodesRef.current.set(skill.name, { position: worldPos.clone(), active: !dimmed });

    const target = hovered ? 1.4 : dimmed ? 0.6 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(target, target, target), delta * 9);

    if (glowRef.current) {
      const targetGlow = hovered ? 1.4 : dimmed ? 0.05 : 0.35 + skill.level * 0.3;
      const m = glowRef.current.material;
      m.uIntensity = THREE.MathUtils.lerp(m.uIntensity, targetGlow, delta * 8);
    }
    if (planeRef.current) {
      const mat = planeRef.current.material;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, dimmed ? 0.22 : 1, delta * 8);
    }
  });

  return (
    <Billboard ref={groupRef}>
      {/* Halo */}
      <mesh ref={glowRef} position={[0, 0, -0.02]}>
        <planeGeometry args={[baseSize * 1.5, baseSize * 1.5]} />
        <glowMaterial
          uColor={new THREE.Color('#38bdf8')}
          uIntensity={0.3}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Icon */}
      <mesh
        ref={planeRef}
        geometry={geo}
        onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerLeave={() => setHovered(false)}
      >
        <meshBasicMaterial
          map={atlas}
          transparent
          opacity={1}
          side={THREE.DoubleSide}
          alphaTest={0.05}
          depthWrite={false}
          toneMapped={false}
        />
        {hovered && (
          <Html center distanceFactor={11} style={{ pointerEvents: 'none' }} zIndexRange={[20, 0]}>
            <div style={{
              background: 'rgba(5,7,15,0.94)',
              border: '1px solid rgba(56,189,248,0.55)',
              color: '#e0f2fe',
              fontFamily: '"Rajdhani", sans-serif',
              fontWeight: 600,
              letterSpacing: '0.08em',
              padding: '7px 11px',
              borderRadius: '4px',
              whiteSpace: 'nowrap',
              marginTop: '3.2rem',
              boxShadow: '0 0 18px rgba(56,189,248,0.35)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#7dd3fc' }}>{skill.name}</div>
            </div>
          </Html>
        )}
      </mesh>
    </Billboard>
  );
}

export function OrbitRing({ radius, speed, inclination = 0, skills, dimmed = false, atlas, nodesRef }) {
  const angleRef = useRef(0);

  // The orbit is the section's core content motion — always runs.
  useFrame((_, delta) => {
    angleRef.current += speed * delta;
  });

  const baseAngles = useMemo(
    () => skills.map((_, i) => (i / skills.length) * Math.PI * 2),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [skills.length]
  );

  return (
    <group rotation={[inclination, 0, inclination * 0.4]}>
      {/* Orbit trail */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.04, radius + 0.04, 160]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={dimmed ? 0.04 : 0.12}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {skills.map((skill, i) => (
        <SkillIcon
          key={skill.name}
          skill={skill}
          baseAngle={baseAngles[i]}
          radius={radius}
          angleRef={angleRef}
          dimmed={dimmed}
          atlas={atlas}
          nodesRef={nodesRef}
        />
      ))}
    </group>
  );
}
