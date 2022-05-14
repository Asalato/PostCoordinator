export class PostalCode {
    code: string;

    constructor(code: string) {
        if (code.length != 7 || isNaN(Number(code))) throw Error();
        this.code = code;
    }

    toString = () => `${this.code.slice(0, 3)}-${this.code.slice(3, 7)}`
}

export class Coordinate {
    latitude: number;
    longitude: number;

    constructor(latitude: number, longitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

export class Details {
    prefecture: string;
    city: string;
    address: string;

    constructor(prefecture: string, city: string, address: string) {
        this.prefecture = prefecture;
        this.city = city;
        if (address != "以下に掲載がない場合")
            this.address = address;
        else
            this.address = "";
    }
}

export class Address {
    coordinate: Coordinate;
    postalCode: PostalCode;
    details: Details | undefined;

    constructor(coordinate: Coordinate, postalCode: PostalCode, details: Details | undefined = undefined) {
        this.coordinate = coordinate;
        this.postalCode = postalCode;
        this.details = details;
    }
}
