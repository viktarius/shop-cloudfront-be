import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { BadRequest } from '@libs/bad-request';

import ProductsService from '../../services/products.service';
import { TCreateProductBody } from '../../services/product.model';

export const createProduct: ValidatedEventAPIGatewayProxyEvent<{ body: TCreateProductBody }> = async (event: { body: any }) => {
    const body = JSON.parse(event.body);
    try {
        const result = await ProductsService.createProduct(body);
        return formatJSONResponse({ result });
    } catch (e) {
        console.log('ERROR: ', e);
        if (e instanceof BadRequest) {
            return formatJSONResponse({ message: e.message }, e.statusCode);
        }
        return formatJSONResponse({ message: e.message }, 500);
    }
};
