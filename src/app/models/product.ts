import { Seller } from './users/seller';
import { Client } from './users/client';
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    buyer: Client;
    seller: Seller;
}