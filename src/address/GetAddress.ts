import {Address, Coordinate, Details, PostalCode} from "./Address";
import {EnumeratedSeedingRandom} from "../SeedingRandom";

export const GetAddress = async (postalCode: string): Promise<Address | null> => {
    if (postalCode.length != 7) return null;

    const params = new URLSearchParams({
        "postal": postalCode.toString(),
        "method": "searchByPostal"
    });
    const url = "https://geoapi.heartrails.com/api/json?" + params.toString();

    try {
        const json = await fetch(url).then(res => res.json());

        const latitude = Number(json.response.location[0].y);
        const longitude = Number(json.response.location[0].x);
        const coord = new Coordinate(latitude, longitude);
        const pc = new PostalCode(postalCode);

        return new Address(coord, pc);
    } catch (e) {
        console.error(e);
        return null;
    }
}

export const GetRandomAddress = async (seed: number, index: number): Promise<Address | null> => {
    const data = await fetch(`${process.env.PUBLIC_URL}/KEN_ALL.csv`).then(res => res.text()).then(txt => txt.split("\n")).then(lines => lines.map(l => l.split(",")));
    const randomColumn = data[EnumeratedSeedingRandom(seed, index).nextInt(0, data.length)];
    const randomPostalCode = randomColumn[2].slice(1, -1);

    const address = await GetAddress(randomPostalCode);
    if (address != null) {
        const prefecture = randomColumn[6].slice(1, -1);
        const city = randomColumn[7].slice(1, -1);
        const dAddress = randomColumn[8].slice(1, -1);
        address.details = new Details(prefecture, city, dAddress);
    }
    return address;
}
