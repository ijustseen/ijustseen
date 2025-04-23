import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  useProgress,
  RoundedBox,
  Edges,
  Sphere,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";

// Простой лоадер, пока грузится Html/iframe
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center style={{ color: "white" }}>
      {progress.toFixed(0)} % loaded
    </Html>
  );
}

// Добавляем интерфейс для пропсов PhoneModel
interface PhoneModelProps {
  liveUrl: string;
  projectTitle: string;
}

// Компонент самой 3D модели телефона
const PhoneModel: React.FC<PhoneModelProps> = ({ liveUrl, projectTitle }) => {
  // Размеры телефона (соответствуют пропорциям width: 160, height: 280 из CSS)
  const phoneWidth = 1.6;
  const phoneHeight = 2.8;
  const phoneDepth = 0.15; // Толщина телефона

  // Размеры экрана (чуть меньше корпуса)
  const screenWidth = phoneWidth * 0.9;
  const screenHeight = phoneHeight * 0.92;

  return (
    <>
      {/* Основной корпус телефона */}
      <Edges scale={1} threshold={15} color="#777">
        <RoundedBox
          args={[phoneWidth, phoneHeight, phoneDepth]}
          radius={0.05}
          smoothness={4}
        >
          {/* Меняем цвет и параметры для более современного вида */}
          <meshPhysicalMaterial
            color="#202020" // Темно-серый, почти черный
            roughness={0.08} // Очень гладкий
            metalness={0.8} // Очень металлический
            reflectivity={0.8} // Хорошо отражает
            clearcoat={0.5} // Слой глянца
            clearcoatRoughness={0.1}
          />
        </RoundedBox>
      </Edges>

      {/* Добавляем "камеру" телефона */}
      <Sphere
        args={[0.05, 16, 16]} // Маленький шар
        position={[0, phoneHeight / 2.2, phoneDepth / 2 + 0.01]} // Вверху телефона
      >
        <meshPhysicalMaterial color="#111" roughness={0.2} metalness={0.8} />
      </Sphere>

      {/* Кнопки сбоку */}
      <RoundedBox
        args={[0.03, 0.15, 0.02]} // Узкая и длинная кнопка
        radius={0.005} // Совсем небольшое скругление
        position={[phoneWidth / 2 + 0.01, phoneHeight / 4, 0]} // На правой стороне
      >
        <meshStandardMaterial color="#333" />
      </RoundedBox>

      <RoundedBox
        args={[0.03, 0.15, 0.02]}
        radius={0.005}
        position={[phoneWidth / 2 + 0.01, 0, 0]} // Еще одна кнопка, ниже
      >
        <meshStandardMaterial color="#333" />
      </RoundedBox>

      {/* Экран телефона (Html компонент с iframe) */}
      <Suspense fallback={<Loader />}>
        <Html
          transform
          occlude
          position={[0, 0, phoneDepth / 2 + 0.01]}
          distanceFactor={10}
          style={{
            width: `${screenWidth * 100}px`, // Используем пиксели для Html
            height: `${screenHeight * 100}px`, // *100 т.к. размеры геометрии в условных единицах
            backgroundColor: "#000", // Фон под iframe
            overflow: "hidden", // Обрезаем контент
            borderRadius: "15px", // Скругление экрана
            pointerEvents: "none", // Отключаем взаимодействие с iframe напрямую через 3D
            boxShadow: "inset 0 0 8px rgba(0,0,0,0.5)",
          }}
        >
          {liveUrl && liveUrl !== "" ? (
            <iframe
              src={liveUrl}
              title={`${projectTitle} - 3D Phone Preview`}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                display: "block",
                borderRadius: "15px",
              }}
              srcDoc={`
                <html>
                  <head>
                    <meta name="viewport" content="width=375, initial-scale=1, maximum-scale=1, user-scalable=no" />
                    <style>
                      body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; }
                      iframe { width: 100%; height: 100%; border: none; }
                    </style>
                  </head>
                  <body>
                    <iframe src="${liveUrl}" width="375" height="667" 
                      frameBorder="0" style="transform: scale(1); transform-origin: 0 0;"
                      sandbox="allow-scripts allow-same-origin allow-forms"></iframe>
                  </body>
                </html>
              `}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0f0f0f",
                color: "#444",
                fontSize: "12px",
                fontFamily: "monospace",
                textAlign: "center",
                padding: "10px",
                borderRadius: "15px",
              }}
            >
              In development
            </div>
          )}
        </Html>
      </Suspense>
    </>
  );
};

// Новый компонент для анимации и рендера модели
const AnimatedPhone: React.FC<PhoneModelProps> = ({
  liveUrl,
  projectTitle,
}) => {
  // Ref для группы и useFrame теперь здесь, внутри Canvas
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      const bobbingFrequency = 1.5;
      const bobbingAmplitude = 0.05;

      // Плавное покачивание
      groupRef.current.position.y =
        Math.sin(time * bobbingFrequency) * bobbingAmplitude;

      // Добавляем легкое вращение для более живого вида
      groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.05;
    }
  });

  return (
    // Группа для масштабирования и анимации
    <group ref={groupRef} scale={0.6}>
      <PhoneModel liveUrl={liveUrl} projectTitle={projectTitle} />
    </group>
  );
};

// Основной компонент Phone3D
interface Phone3DProps {
  liveUrl: string;
  projectId: string; // Для key
  projectTitle: string;
}

const Phone3D: React.FC<Phone3DProps> = ({
  liveUrl,
  projectId,
  projectTitle,
}) => {
  return (
    <div style={{ width: "200px", height: "350px" }}>
      {" "}
      {/* Задаем размер контейнера Canvas */}
      <Canvas
        key={projectId} // Пересоздаем Canvas при смене проекта, чтобы Html обновился
        camera={{ position: [0, 0, 5], fov: 50 }} // Настраиваем камеру
      >
        {/* Улучшаем освещение */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <directionalLight
          position={[-5, -5, 5]}
          intensity={0.2}
          color="#8860e6"
        />{" "}
        {/* Акцентное освещение */}
        <pointLight position={[-10, -10, -10]} intensity={0.4} />
        {/* Добавляем окружающее освещение для реалистичных отражений */}
        <Environment preset="city" />
        {/* Рендерим анимированную модель через новый компонент */}
        <AnimatedPhone liveUrl={liveUrl} projectTitle={projectTitle} />
        <OrbitControls
          enableZoom={false} // Отключаем зум
          enablePan={false} // Отключаем панорамирование
          minPolarAngle={Math.PI / 3} // Ограничиваем вертикальное вращение
          maxPolarAngle={(Math.PI * 2) / 3} // Ограничиваем вертикальное вращение
          minAzimuthAngle={-Math.PI / 4} // Ограничиваем горизонтальное вращение (-45 град)
          maxAzimuthAngle={Math.PI / 4} // Ограничиваем горизонтальное вращение (+45 град)
        />
      </Canvas>
    </div>
  );
};

export default Phone3D;
