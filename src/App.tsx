import {useEffect, useState} from 'react';
import './App.css';
import {Keys} from "./enums/Keys";
import {GameEnv} from "./enums/GameEnv";
import {Field} from "./Field";
import {Paddle} from "./Paddle";
import {Ball} from "./Ball";
import {Simulate} from "react-dom/test-utils";

// TODO - export magic numbers to some enum for readability
export default function App() {
    let [leftPaddle, setLeftPaddle] = useState({pos: GameEnv.PaddleStartY});
    let [rightPaddle, setRightPaddle] = useState({pos: GameEnv.PaddleStartY});
    let [ballParams, setBallParams] = useState(
        {x: GameEnv.BallStartX, y: GameEnv.BallStartY, vx: GameEnv.BallV, vy: GameEnv.BallV}
    );
    let [score, setScore] = useState({leftPlayer: 0, rightPlayer: 0});

    // cartesian coordinates, 0 in top left corner, x increments left to right, y - top to bottom
    const gameLoop = () => {
        // check for bounce off left paddle
        if (ballParams.y >= leftPaddle.pos && ballParams.y <= leftPaddle.pos + GameEnv.PaddleHeight
            && ballParams.x <= GameEnv.PaddleWidth) {
            console.log(`LEFT PADDLE:(${leftPaddle.pos})`)
            ballParams.vx *= -1;
        }
        // check for bounce off left wall
        else if (ballParams.x <= 0) {
            console.log(`LEFT WALL: BALL:(${ballParams.x}, ${ballParams.y}, ${ballParams.vx}, ${ballParams.vy})`)
            ballParams.vx *= -1;
            score.rightPlayer++;
        }

        // check for bounce off right paddle
        if (ballParams.y >= rightPaddle.pos && ballParams.y <= rightPaddle.pos + GameEnv.PaddleHeight
            && ballParams.x >= GameEnv.FieldWidth - (GameEnv.PaddleWidth + GameEnv.BallSize)) {
            console.log(`RIGHT PADDLE:(${rightPaddle.pos})`)
            ballParams.vx *= -1;
        }
        // check for bounce off right wall
        else if (ballParams.x >= GameEnv.FieldWidth - GameEnv.BallSize) {
            console.log(`RIGHT WALL: BALL:(${ballParams.x}, ${ballParams.y}, ${ballParams.vx}, ${ballParams.vy})`)
            ballParams.vx *= -1;
            score.leftPlayer++;
        }

        // check for bounce off top border
        if (ballParams.y <= 0) {
            console.log(`TOP WALL: BALL:(${ballParams.x}, ${ballParams.y}, ${ballParams.vx}, ${ballParams.vy})`)
            ballParams.vy *= -1;
        }
        // check for bounce off bottom wall
        if (ballParams.y >= GameEnv.FieldHeight - GameEnv.BallSize) {
            console.log(`BOTTOM WALL: BALL:(${ballParams.x}, ${ballParams.y}, ${ballParams.vx}, ${ballParams.vy})`)
            ballParams.vy *= -1;
        }
        ballParams.x += ballParams.vx;
        ballParams.y += ballParams.vy;
        setBallParams({...ballParams});
        setScore({...score});
    };



    useEffect(() => {
        const keyPress = (key: KeyboardEvent) => {
            console.log(`Key pressed: ${key.code}`)
            switch (key.code) {
                case Keys.LeftPlayerUp: {
                    if (leftPaddle.pos >= GameEnv.PaddleHeight / 10) {
                        leftPaddle.pos -= GameEnv.PaddleV;
                        setLeftPaddle({...leftPaddle});
                    }
                    break;
                }
                case Keys.LeftPlayerDown: {
                    if (leftPaddle.pos <= GameEnv.FieldHeight - GameEnv.PaddleHeight * 11 / 10) {
                        leftPaddle.pos += GameEnv.PaddleV;
                        setLeftPaddle({...leftPaddle});
                    }
                    break;
                }
                case Keys.RightPlayerUp: {
                    if (rightPaddle.pos >= GameEnv.PaddleHeight / 10) {
                        rightPaddle.pos -= GameEnv.PaddleV;
                        setRightPaddle({pos: rightPaddle.pos});
                    }
                    break;
                }
                case Keys.RightPlayerDown: {
                    if (rightPaddle.pos <= GameEnv.FieldHeight - GameEnv.PaddleHeight * 11/10) {
                        rightPaddle.pos += GameEnv.PaddleV;
                        setRightPaddle({pos: rightPaddle.pos});
                    }
                    break;
                }
            }
        }
        document.addEventListener("keydown", keyPress);
        setInterval(gameLoop, 20);
        return () => {};
    }, []);

    return (
        <div className="App">
            <div>
                <Field />
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
