export interface IProduct {
    count: number;
    description: string;
    id: string;
    price: number;
    imagePath: string;
    title: string;
}

export interface ICreateProductBody {
    count: number;
    description: string;
    price: number;
    imagePath?: string;
    title: string;
}

/*
*   SWAGGER TYPES
*/

export type TProductList = IProduct[];
