import {GameEnv} from "./enums/GameEnv";

export const Ball = ({params} : {params: any}) => {
    let {x, y} = params
    const ballStyle: {} = {
        position: "absolute",
        left: x,
        bottom: y,
        backgroundColor: "red",
        width: `${GameEnv.BallSize}px`,
        height: `${GameEnv.BallSize}px`,
        borderRadius: "25px" // TODO - figure out how to calculate this based on ball size
    };
    return (<div style={ballStyle}/>);
}