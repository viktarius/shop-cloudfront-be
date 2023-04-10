import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/lib/dynamodb/document_client';

import { IProduct } from './product.model';

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
}

const productsService = new ProductsService();

export default productsService;
