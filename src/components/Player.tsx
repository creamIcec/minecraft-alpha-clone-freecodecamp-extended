import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Pos, Velocity } from "../types";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard";

const SPEED: number = 4; //设置玩家移动速度
const JUMP_FORCE: number = 4; //设置玩家跳跃高度

//玩家组件
//表示世界中的玩家
export const Player = () => {
  const { camera } = useThree();
  //使用球体表示玩家
  const [ref, api] = useSphere(() => ({
    mass: 1, //质量设置为1
    type: "Dynamic", //设置为要受到重力影响
    position: [0, 1, 0],
  })) as any;

  //从useKeyboard Hook中获得是否正在进行WASD移动或跳跃
  const { moveBackward, moveForward, moveRight, moveLeft, jump } =
    useKeyboard();

  //保存速度的状态变量
  const velocity = useRef<Velocity>([0, 0, 0]);
  useEffect(() => {
    //订阅表示玩家的球体的速度。当该速度发生变化时, 更新状态变量
    api.velocity.subscribe((v: Velocity) => (velocity.current = v));
  });

  //保存位置的状态变量
  const position = useRef<Pos>([0, 0, 0]);
  useEffect(() => {
    //订阅表示玩家的球体的位置, 功能同理
    api.position.subscribe((p: Pos) => (position.current = p));
  }, [api.position]);

  //每一帧进行的操作...
  useFrame(() => {
    //将相机的位置设置为位置变量的值, 相当于相机跟随玩家的视角
    camera.position.copy(
      new Vector3(position.current[0], position.current[1], position.current[2])
    );

    //x轴方向的向量, 表示玩家前进或后退方向上的速度分量
    const towardVector = new Vector3(
      0,
      0,
      //减法: 用于处理同时按下两个方向(同时前进和后退)的操作, 结果为0表示不移动
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    );

    //z轴方向的向量, 表示玩家左右移动方向上的速度分量
    const sideVector = new Vector3(
      //减法功能同理
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    );

    //用于表示玩家的移动方向的向量
    const direction = new Vector3();

    direction
      .subVectors(towardVector, sideVector) //总速度向量 = 前后分量 - 左右分量
      .normalize() //标准化(大小设置为1, 方向不变)
      .multiplyScalar(SPEED) //再乘以速度大小
      .applyEuler(camera.rotation); //最后应用到玩家的视角朝向上, 完成速度向量的构造

    api.velocity.set(direction.x, velocity.current[1], direction.z); //将玩家的速度设置为direction速度向量, 此处只设置x和z轴的分量, 因为y轴由跳跃向量管理, 单独计算

    //如果玩家正在跳跃               //为了防止在空中还能跳跃(笑哭), 判断此时y轴方向上速度是否足够小(不令为0是因为在方块边缘可能会有一些微小的抖动), 足够小才执行跳跃操作
    if (jump && Math.abs(velocity.current[1]) <= 0.0001) {
      //设置y轴方向上的速度分量为跳跃高度
      api.velocity.set(velocity.current[0], JUMP_FORCE, velocity.current[2]);
    }
  });

  return <mesh ref={ref}></mesh>;
};
