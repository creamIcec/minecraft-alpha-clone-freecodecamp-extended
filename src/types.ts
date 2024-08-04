export type Pos = [x: number, y: number, z: number];
export type Velocity = [number, number, number];

export type TextureKeys =
  | "dirtTexture"
  | "logTexture"
  | "grassTexture"
  | "glassTexture"
  | "woodTexture"
  | "groundTexture";

export type Nanoid = string;

export type BlockStateType = {
  key: Nanoid;
  pos: Pos;
  texture: string;
};
