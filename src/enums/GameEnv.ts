export enum GameEnv {
    FieldWidth = 800,
    FieldHeight = 480,
    PaddleWidth= 10,
    PaddleHeight = 70,
    PaddleStartY = FieldHeight / 2,
    LeftPaddleX = 2,
    RightPaddleX = FieldWidth - (LeftPaddleX + PaddleWidth),
    PaddleV = 5,
    BallSize = 10, // diameter
    BallStartX = FieldWidth / 2,
    BallStartY = FieldHeight / 2,
    BallV = 100,
}