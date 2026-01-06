'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

function ThreatNode({ position, color, size = 0.15 }: { position: [number, number, number]; color: string; size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1)
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.5 + Math.sin(state.clock.elapsedTime * 1.5 + position[1]) * 0.2)
    }
  })

  return (
    <group position={position}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[size * 2, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} />
      </mesh>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

function ConnectionLine({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) {
  const lineRef = useRef<THREE.Line>(null)
  
  const geometry = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3((start[0] + end[0]) / 2, (start[1] + end[1]) / 2 + 0.5, (start[2] + end[2]) / 2),
      new THREE.Vector3(...end)
    )
    const points = curve.getPoints(20)
    const geo = new THREE.BufferGeometry().setFromPoints(points)
    return geo
  }, [start, end])

  const material = useMemo(() => {
    return new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.4 })
  }, [color])

  useFrame((state) => {
    if (lineRef.current) {
      const mat = lineRef.current.material as THREE.LineBasicMaterial
      mat.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2
    }
  })

  return (
    <primitive object={new THREE.Line(geometry, material)} ref={lineRef} />
  )
}

function GridPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[20, 20, 40, 40]} />
      <meshBasicMaterial color="#12F6C8" wireframe transparent opacity={0.05} />
    </mesh>
  )
}

function DataStream({ startPos, endPos }: { startPos: [number, number, number]; endPos: [number, number, number] }) {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 20
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const t = i / count
      pos[i * 3] = startPos[0] + (endPos[0] - startPos[0]) * t
      pos[i * 3 + 1] = startPos[1] + (endPos[1] - startPos[1]) * t + Math.sin(t * Math.PI) * 0.3
      pos[i * 3 + 2] = startPos[2] + (endPos[2] - startPos[2]) * t
    }
    return pos
  }, [startPos, endPos])

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < count; i++) {
        const t = ((i / count) + state.clock.elapsedTime * 0.3) % 1
        positions[i * 3] = startPos[0] + (endPos[0] - startPos[0]) * t
        positions[i * 3 + 1] = startPos[1] + (endPos[1] - startPos[1]) * t + Math.sin(t * Math.PI) * 0.3
        positions[i * 3 + 2] = startPos[2] + (endPos[2] - startPos[2]) * t
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#12F6C8" size={0.05} transparent opacity={0.8} />
    </points>
  )
}

function ThreatWarfieldScene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  const threatPositions: { pos: [number, number, number]; color: string; size: number }[] = [
    { pos: [-2, 1, -1], color: '#ff4444', size: 0.2 },
    { pos: [2, 0.5, -2], color: '#ff4444', size: 0.18 },
    { pos: [0, 1.5, 1], color: '#ff8844', size: 0.15 },
    { pos: [-1.5, 0, 2], color: '#ff8844', size: 0.15 },
    { pos: [1.5, 1, 1.5], color: '#ffaa44', size: 0.12 },
    { pos: [-2.5, 0.5, 0], color: '#ffaa44', size: 0.12 },
    { pos: [0, 0, -2.5], color: '#12F6C8', size: 0.25 },
  ]

  const connections: { start: [number, number, number]; end: [number, number, number]; color: string }[] = [
    { start: [-2, 1, -1], end: [0, 0, -2.5], color: '#ff4444' },
    { start: [2, 0.5, -2], end: [0, 0, -2.5], color: '#ff4444' },
    { start: [0, 1.5, 1], end: [0, 0, -2.5], color: '#ff8844' },
    { start: [-1.5, 0, 2], end: [0, 0, -2.5], color: '#ff8844' },
    { start: [1.5, 1, 1.5], end: [0, 0, -2.5], color: '#ffaa44' },
    { start: [-2.5, 0.5, 0], end: [0, 0, -2.5], color: '#ffaa44' },
  ]

  return (
    <group ref={groupRef}>
      <GridPlane />
      
      {threatPositions.map((threat, i) => (
        <Float key={i} speed={1.5} rotationIntensity={0} floatIntensity={0.3}>
          <ThreatNode position={threat.pos} color={threat.color} size={threat.size} />
        </Float>
      ))}
      
      {connections.map((conn, i) => (
        <ConnectionLine key={i} start={conn.start} end={conn.end} color={conn.color} />
      ))}
      
      {connections.slice(0, 3).map((conn, i) => (
        <DataStream key={i} startPos={conn.start} endPos={conn.end} />
      ))}
    </group>
  )
}

export default function ThreatWarfield() {
  return (
    <div className="w-full h-full min-h-[500px]">
      <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 5, 15]} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#12F6C8" />
        <pointLight position={[-5, 3, -5]} intensity={0.3} color="#ff4444" />
        
        <ThreatWarfieldScene />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  )
}
