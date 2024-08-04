import { create } from "zustand";
import { BlockStateType, Pos } from "../types";
import { nanoid } from "nanoid";

const getLocalStorage = (key: string) =>
  JSON.parse(window.localStorage.getItem(key)!);
const setLocalStorage = (key: string, value: Object) =>
  window.localStorage.setItem(key, JSON.stringify(value));

//useStore: 整个程序可访问的接口列在这里
//可以在任意时刻从useStore中取出任意想要的接口
export const useStore = create((set) => ({
  texture: "dirt",
  blocks: getLocalStorage("blocks") || ([] as BlockStateType[]),
  placeBlock: (pos: Pos) => {
    set((prev: { blocks: any; texture: any }) => ({
      blocks: [
        ...prev.blocks,
        {
          key: nanoid(),
          pos: pos,
          texture: prev.texture,
        },
      ],
    }));
  },
  removeBlock: (pos: Pos) => {
    console.log("pos: ", pos);
    set((prev: { blocks: BlockStateType[] }) => ({
      blocks: prev.blocks.filter((block: BlockStateType) => {
        console.log("current block: ", block.pos);
        const [X, Y, Z] = block.pos;
        return X !== pos[0] || Y !== pos[1] || Z !== pos[2];
      }),
    }));
  },

  setTexture: (texture: string) => {
    set(() => ({
      texture,
    }));
  },
  saveWorld: () => {
    set((prev: { blocks: Object }) => {
      setLocalStorage("blocks", prev.blocks);
      return prev;
    });
  },
  resetWorld: () => {
    set(() => ({
      blocks: [],
    }));
  },
}));
