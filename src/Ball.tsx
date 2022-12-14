import {GameEnv} from "./enums/GameEnv";

export const Ball = ({params} : {params: {x: number, y: number, vx: number, vy: number}}) => {
    let {x, y} = params
    const ballStyle: {} = {
        position: "absolute",
        left: x,
        top: y,
        backgroundColor: "red",
        width: `${GameEnv.BallSize}px`,
        height: `${GameEnv.BallSize}px`,
        borderRadius: `${GameEnv.BallSize}px`
    };
    return (<div style={ballStyle}/>);
}
