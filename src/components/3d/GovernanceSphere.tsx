'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function ComplianceRing({ radius, color, speed, segments }: { radius: number; color: string; speed: number; segments: string[] }) {
  const ringRef = useRef<THREE.Group>(null)
  
  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.y += speed * 0.01
    }
  })

  return (
    <group ref={ringRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.02, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
      {segments.map((segment, i) => {
        const angle = (i / segments.length) * Math.PI * 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        return (
          <group key={i} position={[x, 0, z]}>
            <mesh>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

function CentralCore() {
  const coreRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.005
      coreRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial
          color="#12F6C8"
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#0B85E5"
          emissive="#0B85E5"
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  )
}

function DataStream({ startRadius, endRadius, color }: { startRadius: number; endRadius: number; color: string }) {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particles = useMemo(() => {
    const count = 50
    const positions = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = startRadius + Math.random() * (endRadius - startRadius)
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5
      positions[i * 3 + 2] = Math.sin(angle) * radius
    }
    
    return positions
  }, [startRadius, endRadius])

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.002
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color={color} transparent opacity={0.6} />
    </points>
  )
}

function GovernanceSphereScene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#12F6C8" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#0B85E5" />
      
      <CentralCore />
      
      <ComplianceRing 
        radius={1.2} 
        color="#12F6C8" 
        speed={0.5} 
        segments={['NIST', 'CJIS', 'FedRAMP', 'CMMC']} 
      />
      <ComplianceRing 
        radius={1.8} 
        color="#0B85E5" 
        speed={-0.3} 
        segments={['AI Gov', 'Data Gov', 'Zero Trust', 'Ethics']} 
      />
      <ComplianceRing 
        radius={2.4} 
        color="#8B5CF6" 
        speed={0.2} 
        segments={['Privacy', 'Security', 'Disclosure', 'Protection']} 
      />
      
      <DataStream startRadius={0.6} endRadius={1.2} color="#12F6C8" />
      <DataStream startRadius={1.2} endRadius={1.8} color="#0B85E5" />
      <DataStream startRadius={1.8} endRadius={2.4} color="#8B5CF6" />
      
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

export default function GovernanceSphere() {
  return (
    <div className="w-full h-[400px] relative">
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <GovernanceSphereScene />
      </Canvas>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
        <div className="text-[#12F6C8] text-sm font-mono">GOVERNANCE FRAMEWORK</div>
        <div className="text-gray-500 text-xs">Interactive Compliance Visualization</div>
      </div>
    </div>
  )
}
