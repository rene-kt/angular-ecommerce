import { Product } from "../product";

export interface Client {
    id: string;
    name: string;
    email: string;
    password: string;
    howMuchMoneyThisClientHasSpent: number;
    numberOfBuys: number;
    boughtProducts: Product[];
    productsWished: Product[];
}