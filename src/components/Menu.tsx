import { useStore } from "../hooks/useStore";

export const Menu = () => {
  const [saveWorld, resetWorld] = useStore((state: any) => [
    state.saveWorld,
    state.resetWorld,
  ]);

  //保存世界和重置世界的按钮

  return (
    <div className="menu absolute">
      <button onClick={() => saveWorld()}>Save</button>
      <button onClick={() => resetWorld()}>Reset</button>
    </div>
  );
};
