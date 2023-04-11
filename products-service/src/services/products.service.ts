import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';
import { v4 as uuidv4 } from 'uuid';

import { IProduct, ICreateProductBody } from './product.model';
import { BadRequest } from '@libs/bad-request';

class ProductsService {
    private documentClient: DocumentClient;

    constructor() {
        this.documentClient = new DynamoDB.DocumentClient();
    }

    async getList(): Promise<IProduct[]> {
        const productsParams = { TableName: 'products' };
        const stocksParams = { TableName: 'stocks' };
        const products = await this.documentClient.scan(productsParams).promise();
        const stocks = await this.documentClient.scan(stocksParams).promise();
        return products.Items.map((product: IProduct) => ({
            ...product,
            count: stocks.Items.find(({ product_id }) => product_id === product.id)?.count || 0
        }))
    }

    async getItemById(productId: string): Promise<IProduct> {
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

            return this.documentClient.transactWrite({
                TransactItems: [
                    { Put: { TableName: 'products', Item: productParams } },
                    { Put: { TableName: 'stocks', Item: stockParams } },
                ]
            }).promise();
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
