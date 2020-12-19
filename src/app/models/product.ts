import { Seller } from './users/seller';
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    productOwner: Seller;
    hasBeenSold: string;
}