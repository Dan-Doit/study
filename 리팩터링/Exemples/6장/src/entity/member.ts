import {Bill} from "./bill";

export class Member {
    id: number;
    name: string;
    age: number;
    card: string[];
    bills? : Bill[];
    totalPayment? : string;
}
