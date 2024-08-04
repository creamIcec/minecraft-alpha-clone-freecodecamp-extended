import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Ground } from "./components/Ground";
import { Player } from "./components/Player";
import { FPV } from "./components/FPV";
import { BlockStates } from "./components/BlockStates";
import { TextureSelector } from "./components/TextureSelector";
import { Menu } from "./components/Menu";

function App() {
  /*
    结构:
    <画布>
      <天空盒>
      <光照>
      <第一人称视角控制器>
      <受物理影响的包装器>  //其子节点会受物理影响
        <玩家>
        <在世界中的方块>
        <地面>
      <受物理影响部分结束>
    <画布结束>

    <准星>
    <方块选择器>
    <游戏保存菜单>
  */
  return (
    <>
      <Canvas>
        <Sky sunPosition={[100, 200, 100]}></Sky>
        <ambientLight intensity={0.5}></ambientLight>
        <FPV />
        <Physics>
          <Player />
          <BlockStates />
          <Ground />
        </Physics>
      </Canvas>
      <div className="absolute centered cursor">+</div>
      <TextureSelector />
      <Menu />
    </>
  );
}

export default App;
