import { PointerLockControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

//用于捕获鼠标到相机视角以进行第一人称控制的组件
export const FPV = () => {
  const { camera, gl } = useThree();

  return <PointerLockControls args={[camera, gl.domElement]} />;
};
