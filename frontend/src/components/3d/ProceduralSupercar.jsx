import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Wheel = ({ position, rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Tire Outer */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.38, 0.38, 0.28, 32]} />
        <meshStandardMaterial color="#111317" roughness={0.9} metalness={0.1} />
      </mesh>
      {/* Rim Rim Base */}
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.29, 24]} />
        <meshStandardMaterial color="#c0c7d0" metalness={0.95} roughness={0.15} />
      </mesh>
      {/* Alloy Spokes */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} rotation={[0, 0, (i * Math.PI * 2) / 5]}>
          <boxGeometry args={[0.04, 0.46, 0.295]} />
          <meshStandardMaterial color="#d4dbe4" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      {/* Brake Rotor & Caliper */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.05, 16]} />
        <meshStandardMaterial color="#71717a" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0.1, -0.04, 0.08]}>
        <boxGeometry args={[0.1, 0.06, 0.12]} />
        <meshStandardMaterial color="#ff334b" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Center Cap */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.02, 16]} />
        <meshStandardMaterial color="#18181b" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

export const ProceduralSupercar = ({ color = '#ff334b', isSpinning = false }) => {
  const groupRef = useRef();
  const wheelsRef = useRef();

  useFrame((state, delta) => {
    if (isSpinning && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* CAR MAIN BODY GROUP */}
      <group position={[0, 0.35, 0]}>
        {/* Lower Chassis / Underbody */}
        <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.9, 0.2, 4.3]} />
          <meshStandardMaterial color="#0f1115" roughness={0.9} metalness={0.4} />
        </mesh>

        {/* Front Splitter Carbon Fiber */}
        <mesh position={[0, 0.06, 2.15]} castShadow>
          <boxGeometry args={[1.96, 0.06, 0.35]} />
          <meshStandardMaterial color="#1a1c22" roughness={0.4} metalness={0.6} />
        </mesh>

        {/* Main Body Shell / Hood & Fenders */}
        <mesh position={[0, 0.36, 0.1]} castShadow receiveShadow>
          <boxGeometry args={[1.86, 0.38, 4.1]} />
          <meshPhysicalMaterial
            color={color}
            metalness={0.85}
            roughness={0.18}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
            reflectivity={0.9}
          />
        </mesh>

        {/* Aerodynamic Sloped Hood Wedge */}
        <mesh position={[0, 0.42, 1.4]} rotation={[-0.14, 0, 0]} castShadow>
          <boxGeometry args={[1.8, 0.22, 1.6]} />
          <meshPhysicalMaterial
            color={color}
            metalness={0.85}
            roughness={0.18}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
          />
        </mesh>

        {/* Hood Intake Vents */}
        <mesh position={[-0.4, 0.5, 1.3]} rotation={[-0.14, 0, 0]}>
          <boxGeometry args={[0.22, 0.04, 0.5]} />
          <meshStandardMaterial color="#090a0f" roughness={0.8} />
        </mesh>
        <mesh position={[0.4, 0.5, 1.3]} rotation={[-0.14, 0, 0]}>
          <boxGeometry args={[0.22, 0.04, 0.5]} />
          <meshStandardMaterial color="#090a0f" roughness={0.8} />
        </mesh>

        {/* Cockpit Canopy / Roof Structure */}
        <mesh position={[0, 0.72, -0.3]} castShadow>
          <boxGeometry args={[1.44, 0.38, 2.1]} />
          <meshPhysicalMaterial
            color={color}
            metalness={0.85}
            roughness={0.18}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
          />
        </mesh>

        {/* Front Windshield (Tinted Glass) */}
        <mesh position={[0, 0.7, 0.78]} rotation={[-0.62, 0, 0]} castShadow>
          <boxGeometry args={[1.38, 0.05, 0.88]} />
          <meshPhysicalMaterial
            color="#080c14"
            roughness={0.05}
            transmission={0.4}
            thickness={0.5}
            reflectivity={0.9}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* Rear Sloped Glass Window */}
        <mesh position={[0, 0.68, -1.35]} rotation={[0.48, 0, 0]} castShadow>
          <boxGeometry args={[1.32, 0.05, 1.05]} />
          <meshPhysicalMaterial
            color="#080c14"
            roughness={0.05}
            transmission={0.4}
            thickness={0.5}
            reflectivity={0.9}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* Side Windows */}
        <mesh position={[-0.72, 0.71, -0.28]} rotation={[0, 0, 0.12]}>
          <boxGeometry args={[0.04, 0.32, 1.7]} />
          <meshPhysicalMaterial color="#040608" roughness={0.1} transparent opacity={0.92} />
        </mesh>
        <mesh position={[0.72, 0.71, -0.28]} rotation={[0, 0, -0.12]}>
          <boxGeometry args={[0.04, 0.32, 1.7]} />
          <meshPhysicalMaterial color="#040608" roughness={0.1} transparent opacity={0.92} />
        </mesh>

        {/* Side Mirrors */}
        <mesh position={[-0.92, 0.65, 0.6]}>
          <boxGeometry args={[0.22, 0.1, 0.22]} />
          <meshStandardMaterial color="#090a0f" roughness={0.4} metalness={0.8} />
        </mesh>
        <mesh position={[0.92, 0.65, 0.6]}>
          <boxGeometry args={[0.22, 0.1, 0.22]} />
          <meshStandardMaterial color="#090a0f" roughness={0.4} metalness={0.8} />
        </mesh>

        {/* Front LED Projector Headlights */}
        <group position={[0, 0.36, 2.06]}>
          <mesh position={[-0.68, 0, 0]} rotation={[0, -0.2, 0]}>
            <boxGeometry args={[0.36, 0.1, 0.05]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#00f0ff"
              emissiveIntensity={2.5}
              roughness={0.1}
            />
          </mesh>
          <mesh position={[0.68, 0, 0]} rotation={[0, 0.2, 0]}>
            <boxGeometry args={[0.36, 0.1, 0.05]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#00f0ff"
              emissiveIntensity={2.5}
              roughness={0.1}
            />
          </mesh>
        </group>

        {/* Front Grille Mesh */}
        <mesh position={[0, 0.2, 2.06]}>
          <boxGeometry args={[0.9, 0.22, 0.04]} />
          <meshStandardMaterial color="#0a0a0c" roughness={0.9} metalness={0.1} />
        </mesh>

        {/* Rear Lightbar / Taillights */}
        <group position={[0, 0.42, -2.06]}>
          <mesh>
            <boxGeometry args={[1.74, 0.08, 0.05]} />
            <meshStandardMaterial
              color="#ff0022"
              emissive="#ff1e38"
              emissiveIntensity={3.5}
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* Rear Diffuser & Exhausts */}
        <mesh position={[0, 0.08, -2.08]}>
          <boxGeometry args={[1.6, 0.15, 0.2]} />
          <meshStandardMaterial color="#14171d" roughness={0.6} metalness={0.7} />
        </mesh>
        {/* Exhaust Tips */}
        <mesh position={[-0.45, 0.12, -2.18]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.16, 16]} />
          <meshStandardMaterial color="#silver" metalness={0.98} roughness={0.1} />
        </mesh>
        <mesh position={[0.45, 0.12, -2.18]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.16, 16]} />
          <meshStandardMaterial color="#silver" metalness={0.98} roughness={0.1} />
        </mesh>

        {/* GT Wing / Aerodynamic Spoiler */}
        <group position={[0, 0.82, -1.9]}>
          {/* Struts */}
          <mesh position={[-0.45, -0.15, 0]}>
            <boxGeometry args={[0.04, 0.28, 0.1]} />
            <meshStandardMaterial color="#0c0d12" metalness={0.8} />
          </mesh>
          <mesh position={[0.45, -0.15, 0]}>
            <boxGeometry args={[0.04, 0.28, 0.1]} />
            <meshStandardMaterial color="#0c0d12" metalness={0.8} />
          </mesh>
          {/* Main Carbon Wing */}
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[1.86, 0.04, 0.38]} />
            <meshStandardMaterial color="#111317" roughness={0.2} metalness={0.8} />
          </mesh>
        </group>
      </group>

      {/* WHEELS (4 corners) */}
      <group ref={wheelsRef}>
        {/* Front Left */}
        <Wheel position={[-0.96, 0.38, 1.3]} rotation={[0, 0, Math.PI / 2]} />
        {/* Front Right */}
        <Wheel position={[0.96, 0.38, 1.3]} rotation={[0, 0, -Math.PI / 2]} />
        {/* Rear Left */}
        <Wheel position={[-0.96, 0.38, -1.35]} rotation={[0, 0, Math.PI / 2]} />
        {/* Rear Right */}
        <Wheel position={[0.96, 0.38, -1.35]} rotation={[0, 0, -Math.PI / 2]} />
      </group>

      {/* Ground Contact Shadow Blur Plate */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.5, 4.8]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.65} />
      </mesh>
    </group>
  );
};
