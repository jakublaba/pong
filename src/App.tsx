import {useEffect, useState} from 'react';
import './App.css';
import {Keys} from "./enums/Keys";
import {GameEnv} from "./enums/GameEnv";
import {Board} from "./Board";
import {Paddle} from "./Paddle";
import {Ball} from "./Ball";

// TODO - export magic numbers to some enum for readability
const App = () => {
    let [leftPaddle, setLeftPaddle] = useState({pos: GameEnv.PaddleStartY});
    let [rightPaddle, setRightPaddle] = useState({pos: GameEnv.PaddleStartY});
    let [ballParams, setBallParams] = useState(
        {x: GameEnv.BallStartX, y: GameEnv.BallStartY, vx: GameEnv.BallVx, vy: GameEnv.BallVy}
    );
    let [score, setScore] = useState({leftPlayer: 0, rightPlayer: 0});

    useEffect(() => {
        // TODO - figure out a way to extract repeatable code
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const keyPress = (keyCode: number) => {
            switch (keyCode) {
                case Keys.LeftPlayerUp: {
                    if (leftPaddle.pos <= GameEnv.BoardHeight - GameEnv.PaddleHeight) {
                        leftPaddle.pos += GameEnv.PaddleV;
                        setLeftPaddle({...leftPaddle})
                    }
                    break;
                }
                case Keys.LeftPlayerDown: {
                    if (leftPaddle.pos >= 0) {
                        leftPaddle.pos -= GameEnv.PaddleV;
                        setLeftPaddle({...leftPaddle})
                    }
                    break;
                }
                case Keys.RightPlayerUp: {
                    if (rightPaddle.pos <= GameEnv.BoardHeight - GameEnv.PaddleHeight) {
                        rightPaddle.pos += GameEnv.PaddleV;
                        setRightPaddle({...rightPaddle})
                    }
                    break;
                }
                case Keys.RightPlayerDown: {
                    if (rightPaddle.pos >= 0) {
                        rightPaddle.pos += GameEnv.PaddleV;
                        setRightPaddle({...rightPaddle})
                    }
                    break;
                }
            }
            document.addEventListener("keydown", () => keyPress, false);
            return () => {};
        };
    }, [leftPaddle, rightPaddle]);

    const gameLoop = () => {
        ballParams.x += GameEnv.BallVx;
        ballParams.y += GameEnv.BallVy;
        // check for bounce off left wall
        if (ballParams.x <= GameEnv.PaddleWidth) {
            // the bounce always happens
            ballParams.x += ballParams.vx;
            ballParams.vx *= -1;
            // but we check if it bounced off the paddle or wall
            if (ballParams.y >= leftPaddle.pos
                && ballParams.y <= leftPaddle.pos + GameEnv.PaddleHeight) {
                setScore({...score, rightPlayer: score.rightPlayer + 1});
            }
        }
        // check for bounce off right wall
        if (ballParams.x >= GameEnv.BoardWidth - GameEnv.PaddleWidth) {
            // the bounce always happens
            ballParams.x -= GameEnv.BallVx;
            ballParams.vx *= -1;
            // but we check if it bounced off the paddle or wall
            if (ballParams.y >= rightPaddle.pos
                && ballParams.y <= rightPaddle.pos + GameEnv.PaddleHeight) {
                setScore({...score, leftPlayer: score.leftPlayer + 1});
            }
        }
        // check for bounce off top border
        if (ballParams.y >= GameEnv.BoardHeight) {
            ballParams.y -= ballParams.vy;
            ballParams.vy *= -1;
        }
        // check for bounce off bottom wall
        if (ballParams.y <= 0) {
            ballParams.y += ballParams.vy;
            ballParams.vy *= -1;
        }
        setBallParams({...ballParams});
    };

    // TODO - figure out why the start button doesn't work
    // TODO - align that shit
    const start = () => {};
    setTimeout(gameLoop, 60);
    return (
        <div className="App">
            <button onClick={start}>Start</button>
            <div>
                <Board />
                <Paddle x={GameEnv.LeftPaddleX} y={leftPaddle.pos} />
                <Paddle x={GameEnv.RightPaddleX} y={rightPaddle.pos} />
                <Ball params={ballParams} />
            </div>
            <div style={{textAlign: "center"}}>
                {score.leftPlayer} : {score.rightPlayer}
            </div>
        </div>
    );
}

export default App;
