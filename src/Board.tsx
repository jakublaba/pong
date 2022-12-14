import {GameEnv} from "./enums/GameEnv";

export const Board = () => {
    const borderStyle: string = "solid 1px black";
    const topLeftCorner: {} = {
        borderLeft: borderStyle,
        borderTop: borderStyle
    };
    const topRightCorner: {} = {
        borderRight: borderStyle,
        borderTop: borderStyle
    };
    const bottomLeftCorner: {} = {
        borderLeft: borderStyle,
        borderBottom: borderStyle
    };
    const bottomRightCorner: {} = {
        borderRight: borderStyle,
        borderBottom: borderStyle
    };

    const fieldStyle: {} = {
        position: "absolute",
        width: `${GameEnv.BoardWidth}px`,
        height: `${GameEnv.BoardHeight}px`
    }

    return (
        <div>
            <table style={fieldStyle}>
                <tr>
                    <td style={topLeftCorner}></td>
                    <td style={topRightCorner}></td>
                </tr>
                <tr>
                    <td style={bottomLeftCorner}></td>
                    <td style={bottomRightCorner}></td>
                </tr>
            </table>
        </div>
    );
}