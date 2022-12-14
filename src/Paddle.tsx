import {GameEnv} from "./enums/GameEnv";

export const Paddle = ({x, y} : {x: number, y: number}) => {
    const paddleStyle: {} = {
        position: "absolute",
        left: x,
        top: y,
        backgroundColor: "brown",
        width: `${GameEnv.PaddleWidth}px`,
        height: `${GameEnv.PaddleHeight}px`
    }
    return (<div style={paddleStyle}/>);
}