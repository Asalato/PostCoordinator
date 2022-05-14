export class SeedingRandom {
    private x: number;
    private y: number;
    private z: number;
    private w: number;

    constructor(seed = 88675123) {
        this.x = 123456789;
        this.y = 362436069;
        this.z = 521288629;
        this.w = seed;
    }

    // XorShift
    next() {
        let t;

        t = this.x ^ (this.x << 11);
        this.x = this.y;
        this.y = this.z;
        this.z = this.w;
        return this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8));
    }

    // min以上max以下の乱数を生成する
    nextInt(min: number, max: number) {
        const r = Math.abs(this.next());
        return min + (r % (max + 1 - min));
    }
}

export const EnumeratedSeedingRandom = (seed: number, index: number): SeedingRandom => {
    const random = new SeedingRandom(seed);
    for (let i = 0; i < index; ++i) {
        random.next();
    }
    return random;
}
