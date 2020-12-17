import { Product } from './../../seller-page/products-page/products-page.component';
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