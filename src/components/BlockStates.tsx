import { useStore } from "../hooks/useStore";
import { BlockStateType } from "../types";
import { BlockState } from "./Block";

//BlockStates: 取自Minecraft官方对世界中的方块命名。一个BlockState表示在世界中某个位置的方块, 记录了它的位置、材质信息
export const BlockStates = () => {
  //从useStore Hook中获取包含所有方块数据的数组
  const [blocks] = useStore((state: any) => [state.blocks as BlockStateType[]]);

  //渲染方块
  return (
    <>
      {blocks.map(({ key, pos, texture }) => {
        return <BlockState key={key} position={pos} texture={texture} />;
      })}
    </>
  );
};
