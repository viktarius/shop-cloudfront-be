import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import { v4 as uuidv4 } from 'uuid';

import { IProduct, ICreateProductBody } from './product.model';
import { BadRequest } from '@libs/bad-request';
import * as process from 'process';

const products: IProduct[] = [
    {
        "count": 4,
        "description": "You will get a random laptop in price from $100 to $1000",
        "id": "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
        "price": 299,
        "imagePath": "/assets/icons/laptop.svg",
        "title": "Random laptop"
    },
    {
        "count": 7,
        "description": "You will get a random CPU in price from $100 to $500",
        "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a2",
        "price": 169,
        "imagePath": "/assets/icons/cpu.svg",
        "title": "Random CPU"
    },
    {
        "count": 12,
        "description": "You will get a random GPU in price from $200 to $1000",
        "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
        "price": 299,
        "imagePath": "/assets/icons/gpu.svg",
        "title": "Random GPU"
    },
    {
        "count": 7,
        "description": "You will get a random controller in price from $50 to $300",
        "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
        "price": 99,
        "imagePath": "/assets/icons/controller.svg",
        "title": "Random controller"
    },
    {
        "count": 8,
        "description": "You will get a random keyboard in price from $50 to $300",
        "id": "7567ec4b-b10c-48c5-9345-fc73348a80a1",
        "price": 99,
        "imagePath": "/assets/icons/keyboard.svg",
        "title": "Random keyboard"
    },
    {
        "count": 8,
        "description": "You will get a random mouse in price from $50 to $300",
        "id": "7562ed4b-b12c-41c5-9215-fc3134ba20a1",
        "price": 99,
        "imagePath": "/assets/icons/mouse.svg",
        "title": "Random mouse"
    },
    {
        "count": 2,
        "description": "You will get a random motherboard in price from $100 to $300",
        "id": "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
        "price": 159,
        "imagePath": "/assets/icons/motherboard.svg",
        "title": "Random motherboard"
    },
    {
        "count": 3,
        "description": "You will get a random RAM in price from $40 to $150",
        "id": "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
        "price": 79,
        "imagePath": "/assets/icons/ram.svg",
        "title": "Random RAM"
    },
    {
        "count": 6,
        "description": "You will get a random chair in price from $20 to $400",
        "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a0",
        "price": 79,
        "imagePath": "/assets/icons/chair.svg",
        "title": "Random chair"
    }
]

class ProductsService {
    private documentClient: DocumentClient;
    private useDB: boolean = process.env.USE_DB === 'true';

    constructor() {
        if(this.useDB){
            this.documentClient = new DynamoDB.DocumentClient();
        }
    }

    async getList(): Promise<IProduct[]> {
        if(this.useDB){
            const productsParams = { TableName: 'products' };
            const stocksParams = { TableName: 'stocks' };
            const products = await this.documentClient.scan(productsParams).promise();
            const stocks = await this.documentClient.scan(stocksParams).promise();
            return products.Items.map((product: IProduct) => ({
                ...product,
                count: stocks.Items.find(({ product_id }) => product_id === product.id)?.count || 0
            }))
        }
        return products;
    }

    async getItemById(productId: string): Promise<IProduct> {
        if(this.useDB) {
            const productsParams = {
                TableName: 'products',
                KeyConditionExpression: '#name = :value',
                ExpressionAttributeValues: { ':value': productId },
                ExpressionAttributeNames: { '#name': 'id' }
            };
            const stocksParams = {
                TableName: 'stocks',
                KeyConditionExpression: '#name = :value',
                ExpressionAttributeValues: { ':value': productId },
                ExpressionAttributeNames: { '#name': 'product_id' }
            };
            const products = await this.documentClient.query(productsParams).promise();
            const stocks = await this.documentClient.query(stocksParams).promise();
            return {
                ...products.Items[0],
                count: stocks.Items[0]?.count || 0
            } as IProduct;
        }
        return products.find(({ id }) => productId === id);
    }

    async createProduct(body: ICreateProductBody): Promise<any> | never {
        const hasAllProperty: boolean = this.createBodyValidator(body);
        if (!hasAllProperty) {
            throw new BadRequest('Invalid data');
        } else {
            const id: string = uuidv4();
            const productParams = {
                id,
                price: body.price,
                title: body.title,
                description: body.description,
            }
            const stockParams = {
                product_id: id,
                count: body.count
            };

            if(this.useDB) {
                return this.documentClient.transactWrite({
                    TransactItems: [
                        { Put: { TableName: 'products', Item: productParams } },
                        { Put: { TableName: 'stocks', Item: stockParams } },
                    ]
                }).promise();
            }

            const localProduct = {
                ...productParams,
                count: body.count,
                imagePath: null,
            }
            products.push(localProduct);
            return Promise.resolve(localProduct)
        }
    }

    private createBodyValidator(body: ICreateProductBody): boolean {
        type TValidatorKeys = (keyof ICreateProductBody)[];
        const requiredKeys: TValidatorKeys = ['title', 'description', 'price', 'count'];
        const bodyKeys: TValidatorKeys = Object.keys(body) as TValidatorKeys;
        return requiredKeys.every((key) => bodyKeys.includes(key))
    }
}

export const productsService = new ProductsService();
