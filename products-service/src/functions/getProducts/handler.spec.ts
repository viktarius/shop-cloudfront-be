import { APIGatewayProxyResult } from 'aws-lambda';
import { ValidatedAPIGatewayProxyEvent } from '@libs/api-gateway';

import { getProducts } from './handler';
import { productsService } from '../../services/products.service';

describe('#getProducts', () => {
    it('should return statusCode 200', async () => {
        const event = { } as unknown as ValidatedAPIGatewayProxyEvent<any>;
        jest.spyOn(productsService, "getList").mockReturnValue(Promise.resolve([]));
        const res = await getProducts(event, null, null) as APIGatewayProxyResult;

        expect(res.statusCode).toBe(200);
    });

    it('should call the ProductsService getList method', async () => {
        const event = { } as unknown as ValidatedAPIGatewayProxyEvent<any>;
        const spy = jest.spyOn(productsService, "getList").mockReturnValue(Promise.resolve([]));

        await getProducts(event, null, null);

        expect(spy).toHaveBeenCalled();
    });
})
