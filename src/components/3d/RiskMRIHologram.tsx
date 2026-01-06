'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Float } from '@react-three/drei'
import * as THREE from 'three'

function HologramRing({ radius, height, color, speed }: { radius: number; height: number; color: string; speed: number }) {
  const ringRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.y = state.clock.elapsedTime * speed
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <mesh ref={ringRef} position={[0, height, 0]}>
      <torusGeometry args={[radius, 0.02, 16, 64]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.8} />
    </mesh>
  )
}

function DataColumn({ position, height, color }: { position: [number, number, number]; height: number; color: string }) {
  const columnRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (columnRef.current) {
      const scale = 0.8 + Math.sin(state.clock.elapsedTime * 2 + position[0] * 5) * 0.2
      columnRef.current.scale.y = scale * height
    }
  })

  return (
    <mesh ref={columnRef} position={position}>
      <boxGeometry args={[0.1, 1, 0.1]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.7} />
    </mesh>
  )
}

function RiskSector({ angle, radius, riskLevel, label }: { angle: number; radius: number; riskLevel: number; label: string }) {
  const x = Math.cos(angle) * radius
  const z = Math.sin(angle) * radius
  
  const color = riskLevel > 0.7 ? '#ff4444' : riskLevel > 0.4 ? '#ffaa44' : '#12F6C8'
  
  return (
    <group position={[x, 0, z]}>
      <Float speed={2} rotationIntensity={0} floatIntensity={0.2}>
        <mesh>
          <cylinderGeometry args={[0.3, 0.3, riskLevel * 2, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} transparent opacity={0.6} />
        </mesh>
      </Float>
      <Text
        position={[0, riskLevel + 0.5, 0]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  )
}

function CentralCore() {
  const coreRef = useRef<THREE.Group>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
    if (innerRef.current) {
      innerRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1)
    }
  })

  return (
    <group ref={coreRef}>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial color="#12F6C8" emissive="#12F6C8" emissiveIntensity={0.5} wireframe />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial color="#0B85E5" transparent opacity={0.2} wireframe />
      </mesh>
    </group>
  )
}

function ScanLine() {
  const lineRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.position.y = Math.sin(state.clock.elapsedTime) * 2
      lineRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <mesh ref={lineRef}>
      <ringGeometry args={[2.5, 2.55, 64]} />
      <meshBasicMaterial color="#12F6C8" transparent opacity={0.3} side={THREE.DoubleSide} />
    </mesh>
  )
}

function RiskMRIScene() {
  const sectors = [
    { angle: 0, riskLevel: 0.8, label: 'CYBER' },
    { angle: Math.PI / 3, riskLevel: 0.6, label: 'FRAUD' },
    { angle: (2 * Math.PI) / 3, riskLevel: 0.9, label: 'IDENTITY' },
    { angle: Math.PI, riskLevel: 0.5, label: 'SUPPLY' },
    { angle: (4 * Math.PI) / 3, riskLevel: 0.7, label: 'INSIDER' },
    { angle: (5 * Math.PI) / 3, riskLevel: 0.4, label: 'PHYSICAL' },
  ]

  const dataColumns = useMemo(() => {
    const columns = []
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2
      const radius = 2.2
      columns.push({
        position: [Math.cos(angle) * radius, -1, Math.sin(angle) * radius] as [number, number, number],
        height: 0.5 + Math.random() * 1.5,
        color: i % 3 === 0 ? '#12F6C8' : i % 3 === 1 ? '#0B85E5' : '#ff4444',
      })
    }
    return columns
  }, [])

  return (
    <group>
      <CentralCore />
      
      <HologramRing radius={1.2} height={0} color="#12F6C8" speed={0.5} />
      <HologramRing radius={1.8} height={0.3} color="#0B85E5" speed={-0.3} />
      <HologramRing radius={2.4} height={-0.3} color="#12F6C8" speed={0.2} />
      
      {sectors.map((sector, i) => (
        <RiskSector key={i} angle={sector.angle} radius={1.5} riskLevel={sector.riskLevel} label={sector.label} />
      ))}
      
      {dataColumns.map((col, i) => (
        <DataColumn key={i} position={col.position} height={col.height} color={col.color} />
      ))}
      
      <ScanLine />
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <circleGeometry args={[3, 64]} />
        <meshBasicMaterial color="#12F6C8" transparent opacity={0.05} />
      </mesh>
    </group>
  )
}

export default function RiskMRIHologram() {
  return (
    <div className="w-full h-full min-h-[500px]">
      <Canvas camera={{ position: [0, 3, 5], fov: 50 }}>
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 5, 12]} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#12F6C8" />
        <pointLight position={[-5, 3, -5]} intensity={0.3} color="#0B85E5" />
        
        <RiskMRIScene />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  )
}
