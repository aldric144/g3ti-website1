'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Sphere, Line, Text } from '@react-three/drei'
import * as THREE from 'three'

function ParticleField({ count = 500 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2 + Math.random() * 3
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      
      // Cyan to blue gradient
      colors[i * 3] = 0.07 + Math.random() * 0.1
      colors[i * 3 + 1] = 0.8 + Math.random() * 0.2
      colors[i * 3 + 2] = 0.7 + Math.random() * 0.3
    }
    
    return { positions, colors }
  }, [count])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.05
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

function NeuralCore() {
  const coreRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = state.clock.elapsedTime * 0.3
      coreRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      glowRef.current.scale.setScalar(scale)
    }
  })

  return (
    <group>
      {/* Inner core */}
      <Sphere ref={coreRef} args={[0.5, 64, 64]}>
        <meshStandardMaterial
          color="#12F6C8"
          emissive="#12F6C8"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
          wireframe
        />
      </Sphere>
      
      {/* Outer glow */}
      <Sphere ref={glowRef} args={[0.7, 32, 32]}>
        <meshBasicMaterial
          color="#12F6C8"
          transparent
          opacity={0.1}
        />
      </Sphere>
      
      {/* Core center */}
      <Sphere args={[0.2, 32, 32]}>
        <meshStandardMaterial
          color="#0B85E5"
          emissive="#0B85E5"
          emissiveIntensity={1}
        />
      </Sphere>
    </group>
  )
}

function NanoFiberStrands({ count = 20 }: { count?: number }) {
  const strandsRef = useRef<THREE.Group>(null)
  
  const strands = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const points: THREE.Vector3[] = []
      const startAngle = (i / count) * Math.PI * 2
      const segments = 20
      
      for (let j = 0; j <= segments; j++) {
        const t = j / segments
        const r = 0.6 + t * 1.5
        const angle = startAngle + t * Math.PI * 0.5
        const y = (Math.random() - 0.5) * 2 * t
        
        points.push(new THREE.Vector3(
          r * Math.cos(angle),
          y,
          r * Math.sin(angle)
        ))
      }
      
      return points
    })
  }, [count])

  useFrame((state) => {
    if (strandsRef.current) {
      strandsRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={strandsRef}>
      {strands.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="#12F6C8"
          lineWidth={1}
          transparent
          opacity={0.4 + Math.random() * 0.3}
        />
      ))}
    </group>
  )
}

function ElectricityArcs({ count = 8 }: { count?: number }) {
  const arcsRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (arcsRef.current) {
      arcsRef.current.children.forEach((child, i) => {
        const line = child as THREE.Line
        if (line.material) {
          const mat = line.material as THREE.LineBasicMaterial
          mat.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 10 + i) * 0.3
        }
      })
    }
  })

  const arcs = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const points: THREE.Vector3[] = []
      const startAngle = (i / count) * Math.PI * 2
      const endAngle = startAngle + Math.PI * 0.3
      const segments = 10
      
      for (let j = 0; j <= segments; j++) {
        const t = j / segments
        const angle = startAngle + (endAngle - startAngle) * t
        const r = 1.2 + Math.sin(t * Math.PI) * 0.3
        const jitter = (Math.random() - 0.5) * 0.1
        
        points.push(new THREE.Vector3(
          r * Math.cos(angle) + jitter,
          (Math.random() - 0.5) * 0.5,
          r * Math.sin(angle) + jitter
        ))
      }
      
      return points
    })
  }, [count])

  return (
    <group ref={arcsRef}>
      {arcs.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="#0B85E5"
          lineWidth={2}
          transparent
          opacity={0.5}
        />
      ))}
    </group>
  )
}

function DataNodes({ count = 12 }: { count?: number }) {
  const nodesRef = useRef<THREE.Group>(null)
  
  const nodes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const theta = (i / count) * Math.PI * 2
      const phi = Math.acos(2 * (i / count) - 1)
      const r = 1.8
      
      return {
        position: new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta)
        ),
        scale: 0.05 + Math.random() * 0.05
      }
    })
  }, [count])

  useFrame((state) => {
    if (nodesRef.current) {
      nodesRef.current.children.forEach((child, i) => {
        const scale = nodes[i].scale * (1 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.3)
        child.scale.setScalar(scale)
      })
    }
  })

  return (
    <group ref={nodesRef}>
      {nodes.map((node, i) => (
        <Sphere key={i} args={[1, 16, 16]} position={node.position} scale={node.scale}>
          <meshStandardMaterial
            color="#12F6C8"
            emissive="#12F6C8"
            emissiveIntensity={2}
          />
        </Sphere>
      ))}
    </group>
  )
}

function Watermark() {
  return (
    <Text
      position={[0, -2.5, 0]}
      fontSize={0.15}
      color="#12F6C8"
      anchorX="center"
      anchorY="middle"
      fillOpacity={0.3}
    >
      We don&apos;t make technology — we make technology intelligent.
    </Text>
  )
}

function Scene() {
  const { mouse } = useThree()
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (mouse.x * 0.5 - groupRef.current.rotation.y) * 0.05
      groupRef.current.rotation.x += (mouse.y * 0.3 - groupRef.current.rotation.x) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      <NeuralCore />
      <NanoFiberStrands count={30} />
      <ParticleField count={800} />
      <ElectricityArcs count={12} />
      <DataNodes count={16} />
      <Watermark />
    </group>
  )
}

export default function AIConsciousnessCore() {
  return (
    <div className="w-full h-full min-h-[600px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 5, 15]} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#12F6C8" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0B85E5" />
        
        <Scene />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}
