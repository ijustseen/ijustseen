import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  useProgress,
  Plane,
  useTexture,
  RoundedBox,
  Edges,
} from "@react-three/drei";
import * as THREE from "three";

// Простой лоадер, пока грузится текстура
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center style={{ color: "white" }}>
      {progress.toFixed(0)} % loaded
    </Html>
  );
}

// Компонент телефона со скриншотом
const PhoneView: React.FC<{ projectId: string }> = ({ projectId }) => {
  // Загружаем все текстуры одним вызовом useTexture
  const textures = useTexture({
    doctalkie: "/phone-doctalkie.jpg",
    learnAndShare: "/phone-learn-and-share.jpg",
    tondash: "/phone-tondash.jpg",
  });

  // Выбираем текстуру на основе projectId
  let texture;
  // Добавляем console.log для отладки
  console.log("Current projectId:", projectId);

  if (
    projectId === "learn&share" ||
    projectId === "learnshare" ||
    projectId === "learn-and-share"
  ) {
    texture = textures.learnAndShare;
  } else if (projectId === "doctalkie") {
    texture = textures.doctalkie;
  } else if (projectId === "tondash") {
    texture = textures.tondash;
  } else {
    // Для других проектов выводим заглушку
    return (
      <group>
        {/* Корпус телефона */}
        <Edges scale={1} threshold={15} color="rgba(120, 120, 120, 0.8)">
          <RoundedBox args={[2.0, 3.5, 0.1]} radius={0.1} smoothness={4}>
            <meshPhysicalMaterial
              color="#111111"
              roughness={0.05}
              metalness={0.9}
              reflectivity={1.0}
              clearcoat={0.6}
              clearcoatRoughness={0.05}
            />
          </RoundedBox>
        </Edges>

        {/* Экран-заглушка */}
        <RoundedBox
          args={[1.85, 3.3, 0.01]}
          radius={0.09}
          position={[0, 0, 0.06]}
        >
          <meshBasicMaterial color="#0f0f0f" />
        </RoundedBox>

        {/* Текст "In development" */}
        <Html
          transform
          occlude
          position={[0, 0, 0.07]}
          style={{
            width: "180px",
            height: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              color: "#444",
              fontSize: "14px",
              fontFamily: "monospace",
              textAlign: "center",
            }}
          >
            In development
          </div>
        </Html>

        {/* Имитация динамика */}
        <RoundedBox
          args={[0.4, 0.05, 0.01]}
          radius={0.02}
          position={[0, 1.6, 0.06]}
        >
          <meshBasicMaterial color="#222" />
        </RoundedBox>
      </group>
    );
  }

  return (
    <group>
      {/* Корпус телефона */}
      <Edges scale={1} threshold={15} color="rgba(120, 120, 120, 0.8)">
        <RoundedBox args={[2.0, 3.5, 0.1]} radius={0.1} smoothness={4}>
          <meshPhysicalMaterial
            color="#111111"
            roughness={0.05}
            metalness={0.9}
            reflectivity={1.0}
            clearcoat={0.6}
            clearcoatRoughness={0.05}
          />
        </RoundedBox>
      </Edges>

      {/* Экран */}
      <RoundedBox
        args={[1.85, 3.3, 0.01]}
        radius={0.09}
        position={[0, 0, 0.06]}
      >
        <meshBasicMaterial color="#000000" />
      </RoundedBox>

      {/* Скриншот */}
      <Plane args={[1.75, 3.2]} position={[0, 0, 0.07]}>
        <meshBasicMaterial map={texture} toneMapped={false} />
      </Plane>

      {/* Имитация динамика */}
      <RoundedBox
        args={[0.4, 0.05, 0.01]}
        radius={0.02}
        position={[0, 1.6, 0.06]}
      >
        <meshBasicMaterial color="#222" />
      </RoundedBox>
    </group>
  );
};

// Компонент для анимации
const AnimatedPhone: React.FC<{ projectId: string }> = ({ projectId }) => {
  // Ref для группы и useFrame для анимации
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      const bobbingFrequency = 0.8; // Медленнее для более плавного эффекта
      const bobbingAmplitude = 0.02; // Уменьшаем амплитуду для более тонкого движения

      // Плавное покачивание
      groupRef.current.position.y =
        0.2 + Math.sin(time * bobbingFrequency) * bobbingAmplitude; // Добавляем базовое смещение 0.2 вверх

      // Добавляем легкое вращение
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.05;
    }
  });

  return (
    // Группа для масштабирования и анимации
    <group ref={groupRef} scale={0.85} position={[0, 0.2, 0]}>
      <PhoneView projectId={projectId} />
    </group>
  );
};

// Основной компонент Phone3D
interface Phone3DProps {
  liveUrl: string; // Оставляем для совместимости
  projectId: string;
  projectTitle: string; // Оставляем для совместимости
}

const Phone3D: React.FC<Phone3DProps> = ({ projectId, projectTitle }) => {
  // Логируем проп для отладки
  console.log("Phone3D received projectId:", projectId);
  console.log("Phone3D received projectTitle:", projectTitle);

  return (
    <div style={{ width: "270px", height: "450px" }}>
      <Canvas
        key={projectId}
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]} // Улучшаем качество рендеринга на устройствах с высоким DPI
      >
        {/* Базовое освещение */}
        <ambientLight intensity={1.0} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, -5, 2]} intensity={0.3} />
        <pointLight position={[0, 0, 3]} intensity={0.8} />

        {/* Рендерим телефон */}
        <Suspense fallback={<Loader />}>
          <AnimatedPhone projectId={projectId} />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={(Math.PI * 2) / 3}
          minAzimuthAngle={-Math.PI / 3}
          maxAzimuthAngle={Math.PI / 3}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Phone3D;
