import {GameEnv} from "./enums/GameEnv";

export function Field() {
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

    const boardStyle: {} = {
        position: "relative",
        top: "0px",
        left: "0px",
        width: `${GameEnv.FieldWidth}px`,
        height: `${GameEnv.FieldHeight}px`
    }

    return (
        <div>
            <table style={boardStyle}>
                <tbody>
                    <tr>
                        <td style={topLeftCorner}></td>
                        <td style={topRightCorner}></td>
                    </tr>
                    <tr>
                        <td style={bottomLeftCorner}></td>
                        <td style={bottomRightCorner}></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
