import {GameResult} from "./GameResult";

const HIGH_SCORE_KEY = "HIGHSCORE";

export const getHighScore = (): number => {
    const highScore = Number(localStorage.getItem(HIGH_SCORE_KEY));
    if (isNaN(highScore)) return 0;
    return highScore;
}

export const tryUpdateHighScore = (score: number): boolean => {
    if (getHighScore() > score) return false;
    localStorage.setItem(HIGH_SCORE_KEY, score.toString());
    return true;
}

const CURRENT_RESULT_KEY = "CURRENTRESULT";

export const getCurrentGame = (): GameResult | null => {
    const resultStr = localStorage.getItem(CURRENT_RESULT_KEY);
    if (resultStr == null) return null;
    const result: GameResult = JSON.parse(resultStr);
    return new GameResult(result.id, result.stages);
}

export const updateCurrentGame = (result: GameResult) => {
    localStorage.setItem(CURRENT_RESULT_KEY, JSON.stringify(result));
}

const DAILY_RESULT_KEY = "DAILYRESULT";

export const getDailyGame = (): GameResult | null => {
    const resultStr = localStorage.getItem(DAILY_RESULT_KEY);
    if (resultStr == null) return null;
    const result: GameResult = JSON.parse(resultStr);
    return new GameResult(result.id, result.stages, result.day);
}

export const updateDailyGame = (result: GameResult) => {
    localStorage.setItem(DAILY_RESULT_KEY, JSON.stringify(result));
}

export const isDailyDone = (): boolean => {
    const daily = getDailyGame();
    if (daily == null || daily.day == null) return false;
    return new Date().getDate() - daily.day.getDate() < 1;
}
