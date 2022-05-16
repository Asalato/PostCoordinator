import {Address, Coordinate} from "./address/Address";

export class GameResult {
    public id: number;
    public stages: Stage[];
    public day: Date | undefined;

    public constructor(id: number, stages: Stage[], day: Date | undefined = undefined) {
        this.id = id;
        this.stages = stages.map(s => new Stage(s.address, s.distanceKm, s.selected));
        this.day = day == undefined ? undefined : new Date(day);
    }

    public getTotalScore(): number {
        return this.stages.reduce((t, s) => s.getScore() + t, 0);
    }
}

export class Stage {
    public address: Address;
    public distanceKm: number;
    public selected: Coordinate;

    public constructor(address: Address, distanceKm: number, selected: Coordinate) {
        this.address = address;
        this.distanceKm = distanceKm;
        this.selected = selected;
    }

    public getScore() {
        return getScore(this.distanceKm);
    }
}

export const getScore = (distanceKm: number): number => {
    if (distanceKm > 1200) return 0;
    if (distanceKm > 500) return (1200 - distanceKm) / 700 * 2000;
    if (distanceKm > 100) return (500 - distanceKm) / 400 * 2000 + 2000;
    return (100 - distanceKm) * 10 + 4000;
}
