import { APIGatewayProxyResult } from 'aws-lambda';
import { ValidatedAPIGatewayProxyEvent } from '@libs/api-gateway';

import { getProductById } from './handler';
import { productsService } from '../../services/products.service';
import { IProduct } from '../../services/product.model';

describe('#getProducts', () => {

    afterEach(() => {
        jest.clearAllMocks();
    })

    describe('when passed correct product id', () => {
        it('should return product and statusCode equal 200', async () => {
            const id = '7567ec4b-b10c-48c5-9345-fc73c48a80a3';
            jest.spyOn(productsService, "getItemById").mockImplementation(() => Promise.resolve({
                id
            } as unknown as IProduct));
            const event = { pathParameters: { id } } as unknown as ValidatedAPIGatewayProxyEvent<any>;
            const res = await getProductById(event, null, null) as APIGatewayProxyResult;

            expect(res.statusCode).toBe(200);
        });
    });

    describe('when passed incorrect product id', () => {
        it('should return message and statusCode equal 404', async () => {
            const id = 'wrong-product-id';
            jest.spyOn(productsService, "getItemById").mockImplementation(() => Promise.resolve(null));
            const event = { pathParameters: { id } } as unknown as ValidatedAPIGatewayProxyEvent<any>;
            const res = await getProductById(event, null, null) as APIGatewayProxyResult;

            expect(res.statusCode).toBe(404);
        });
    });

    it('should call the ProductsService getItemById method with id', async () => {
        const id = '7567ec4b-b10c-48c5-9345-fc73c48a80a3';
        const event = { pathParameters: { id } } as unknown as ValidatedAPIGatewayProxyEvent<any>;
        const spy = jest.spyOn(productsService, "getItemById").mockImplementation(() => Promise.resolve(null));

        await getProductById(event, null, null);

        expect(spy).toHaveBeenCalledWith(id);
    });
})
