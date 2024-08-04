import { useCallback, useEffect, useState } from "react";

//键位<->动作的映射。用于确定当玩家按下某个键时应该触发哪个动作
//本质是因为需要将按键转换为动作, 直接使用按键本身或者它的名称会不太方便
//同时，这个映射表也有助于后期添加玩家自定义键位的功能
function getActionByKey(key: string): string {
  const keyActionMap = {
    KeyW: "moveForward",
    KeyS: "moveBackward",
    KeyA: "moveLeft",
    KeyD: "moveRight",
    Space: "jump",
    Digit1: "dirt",
    Digit2: "grass",
    Digit3: "glass",
    Digit4: "wood",
    Digit5: "log",
  } as any;

  return keyActionMap[key];
}

//useKeyboard: 程序中负责监听哪个按钮被按下的Hook
//可以随时从这个Hook中取得某个键被按下的状态(true/false), 或者直接取得对应的操作名称
//直接取得操作名称的好处是, 它抽象出了每个操作, 在Hook内部处理操作和按键之间的关系使得操作可以不与特定按键绑定
//调用者只获取到哪个操作正在进行而不用担心是按下的哪个按键, 专注于处理那个操作即可
//利于以后添加修改键位的功能
export const useKeyboard = () => {
  //设置所有可用操作正在进行的状态
  //true表示这个动作正在进行, 即玩家按下了对应的键
  //false表示当前没有执行这个动作, 也就是玩家没有按那个键

  const [actions, setActions] = useState({
    moveForward: false, //前进 W
    moveBackward: false, //后退 S
    moveLeft: false, //左移 A
    moveRight: false, //右移 D
    jump: false, //跳跃 空格(Space)
    dirt: false,
    grass: false,
    glass: false,
    wood: false,
    log: false,
  });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const action = getActionByKey(e.code);
    console.log("key:", e.code);
    console.log("action:", action);
    if (action) {
      setActions((prev) => {
        return {
          ...prev,
          [action]: true,
        };
      });
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const action = getActionByKey(e.code);
    if (action) {
      setActions((prev) => {
        return {
          ...prev,
          [action]: false,
        };
      });
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  //返回actions对象。这个对象封装了每一个操作正在进行的状态(true/false)。
  return actions;
};
