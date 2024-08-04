import { usePlane } from "@react-three/cannon";
import { groundTexture } from "../images/textures";
import { Pos } from "../types";
import { useStore } from "../hooks/useStore";

//表示地面的组件
export const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0], //绕x轴的旋转设置为-π/2, 使得平面水平
    position: [0, -0.5, 0], //沿y轴下移0.5个单位
  })) as any;

  //从useStore Hook中取出placeBlock接口, 以便玩家点击地面放置方块时使用
  const [placeBlock] = useStore((state: any) => [state.placeBlock]);

  //地面将草方块纹理重复绘制
  groundTexture.repeat.set(100, 100);

  return (
    //右键点击地面以放置方块
    <mesh
      onPointerDown={(e) => {
        if (e.button === 2) {
          e.stopPropagation();
          const pos = Object.values(e.point).map((value) =>
            Math.ceil(value)
          ) as Pos;
          placeBlock(pos);
        }
      }}
      ref={ref}
    >
      <planeGeometry attach="geometry" args={[100, 100]}></planeGeometry>{" "}
      {/*组成mesh网格的两部分: geometry和material(几何体(雕塑白模)和它的材质(上颜料后的外观))*/}
      <meshStandardMaterial
        attach="material"
        map={groundTexture}
      ></meshStandardMaterial>
    </mesh>
  );
};
