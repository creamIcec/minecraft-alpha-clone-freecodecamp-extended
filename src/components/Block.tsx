import { useBox } from "@react-three/cannon";
import { Pos, TextureKeys } from "../types";
import * as textures from "../images/textures";
import { useStore } from "../hooks/useStore";

//一个方块的3D对象
export const BlockState = ({
  position,
  texture,
}: {
  position: Pos;
  texture: string;
}) => {
  //以Box(方盒)表示一个方块
  const [ref] = useBox(() => ({
    type: "Static",
    position,
  })) as any;

  //从useStore Hook中取出placeBlock和removeBlock两个接口, 用于放置方块和移除方块
  const [placeBlock, removeBlock] = useStore((state: any) => [
    state.placeBlock,
    state.removeBlock,
  ]);

  const blockTexture = textures[(texture + "Texture") as TextureKeys];

  return (
    <mesh
      onPointerDown={(e) => {
        e.stopPropagation();
        const clickedFace = Math.floor(e.faceIndex! / 2);
        const [x, y, z] = ref.current.position;
        let newBlockStatePos: Pos = [x, y, z];
        if (e.button === 2) {
          /*右键点击方块的某个面之后的操作*/
          switch (
            clickedFace //判断点击的面, 并在对应面放置一个新方块
          ) {
            case 0:
              newBlockStatePos = [x + 1, y, z];
              break;
            case 1:
              newBlockStatePos = [x - 1, y, z];
              break;
            case 2:
              newBlockStatePos = [x, y + 1, z];
              break;
            case 3:
              newBlockStatePos = [x, y - 1, z];
              break;
            case 4:
              newBlockStatePos = [x, y, z + 1];
              break;
            case 5:
            default:
              newBlockStatePos = [x, y, z - 1];
              break;
          }
          placeBlock(newBlockStatePos);
          return;
        }
        //点击其他按钮(如左键)将移除方块   //TODO: 此处已简化, 应指定除左键外其他按钮的功能
        removeBlock([x, y, z]);
        return;
      }}
      ref={ref}
    >
      <boxGeometry attach="geometry" />{" "}
      {/*组成一个mesh网格的两部分, 详见Ground组件*/}
      <meshStandardMaterial
        map={blockTexture}
        transparent={true}
        opacity={texture === "glass" ? 0.6 : 1}
        attach="material"
      />
    </mesh>
  );
};
