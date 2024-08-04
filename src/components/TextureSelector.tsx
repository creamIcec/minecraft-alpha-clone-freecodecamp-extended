import { useEffect, useState } from "react";
import { dirtImg, glassImg, grassImg, logImg, woodImg } from "../images/images";
import { useStore } from "../hooks/useStore";
import { useKeyboard } from "../hooks/useKeyboard";

const images = {
  dirt: dirtImg,
  grass: grassImg,
  glass: glassImg,
  wood: woodImg,
  log: logImg,
};

//方块选择器组件
//用于玩家选择方块
export const TextureSelector = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [texture, setTexture] = useStore((state: any) => [
    state.texture,
    state.setTexture,
  ]);

  //从useKeyboard Hook中获得当前是否正在进行切换方块的操作
  //如正在切换到grass方块, 则grass为true, 其他为false
  const { dirt, grass, glass, wood, log } = useKeyboard();

  useEffect(() => {
    const textures = {
      dirt,
      grass,
      glass,
      wood,
      log,
    };

    const pressedTexture = Object.entries(textures).find(([k, v]) => v);
    if (pressedTexture) {
      setTexture(pressedTexture[0]);
    }
  }, [setTexture, dirt, grass, glass, wood, log]);

  //当texture发生变化时, 短暂显示切换器组件2秒(将可见状态改为true并在2秒后改为false), 以提示玩家已切换到想要的texture
  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setVisible(false);
    }, 2000);
    setVisible(true);
    return () => {
      clearTimeout(visibilityTimeout);
    };
  }, [texture]);

  //根据切换器是否可见返回空或选择器, 是可见性的体现
  return visible ? (
    <div className="absolute centered texture-selector">
      {Object.entries(images).map(([k, src]) => {
        return (
          <img
            key={k}
            src={src}
            alt={k}
            className={`${k === texture ? "active" : ""}`}
          ></img>
        );
      })}
    </div>
  ) : null;
};
