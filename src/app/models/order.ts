import { Product } from './product';
import { Client } from './users/client';
export interface Order{
    buyer: Client;
    id: string;
    instant: string;
    productOrder: Product;


}