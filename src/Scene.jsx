import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

const Scene = () => {
  return (
    <Canvas
      shadows
      raycaster={{ params: { Line: { threshold: 0.15 } } }}
      camera={{ position: [-10, 10, 15], fov: 20 }}
    >
      <Environment files="/assets/sunset.hdr" blur={0.5} />
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[2.5, 10, 5]}
        intensity={0.8}
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-5, 5, 5, -5, 1, 50]}
        />
      </directionalLight>{" "}
      <mesh position={[0.75, 0.5, 1]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[-0.75, 0.5, -1]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial />
      </mesh>
      <mesh scale={20} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry />
        <shadowMaterial transparent opacity={0.1} />
      </mesh>
      <OrbitControls enableRotate={false} />
      <pointLight intensity={0.75} position={[5, 5, 5]} />
    </Canvas>
  );
};
export default Scene;
