// File: src/components/Hosted3DModel.jsx

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage } from "@react-three/drei";

// Component con để tải và hiển thị mô hình
function Model(props) {
  // Đường dẫn trỏ đến file .glb trong thư mục public
  const { scene } = useGLTF("/models/al-_8_ss_white_rubber.glb");
  return <primitive object={scene} {...props} />;
}

const Hosted3DModel = () => {
  return (
    <div className="bg-neutral-focus py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Chiêm Ngưỡng Từng Chi Tiết
          </h2>
          <p className="text-lg text-gray-400 mt-4">
            Sử dụng chuột để xoay 360°, giữ chuột phải để di chuyển và lăn chuột
            để phóng to/thu nhỏ.
          </p>
        </div>

        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-2xl bg-gray-800">
          {/* Canvas là "sân khấu" 3D của chúng ta */}
          <Canvas dpr={[1, 2]} camera={{ fov: 45 }}>
            {/* Suspense của React sẽ hiển thị fallback cho đến khi model được tải xong */}
            <Suspense fallback={null}>
              {/* Stage tự động tạo ra một môi trường và ánh sáng đẹp */}
              <Stage environment="city" intensity={0.6}>
                <Model />
              </Stage>
            </Suspense>
            {/* OrbitControls cho phép người dùng tương tác với model */}
            <OrbitControls autoRotate />
          </Canvas>
        </div>
      </div>
    </div>
  );
};

// Preload model để tăng tốc độ tải
useGLTF.preload("/models/al-_8_ss_white_rubber.glb");

export default Hosted3DModel;
