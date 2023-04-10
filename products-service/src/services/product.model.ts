export interface IProduct {
    count: number;
    description: string;
    id: string;
    price: number;
    imagePath: string;
    title: string;
}

export type TCreateProductBody = Omit<IProduct, 'id' | 'count'>;

