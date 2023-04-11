import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { BadRequest } from '@libs/bad-request';

import { productsService } from '../../services/products.service';
import { ICreateProductBody } from '../../services/product.model';
import { loggerService } from '../../services/logger.service';

export const createProduct: ValidatedEventAPIGatewayProxyEvent<{ body: ICreateProductBody }> = async (event: { body: any }) => {
    const body = JSON.parse(event.body);
    loggerService.log('lambda -->> createProduct -->> requests and arguments: ', event);
    try {
        const result = await productsService.createProduct(body);
        return formatJSONResponse({ result });
    } catch (e) {
        loggerService.logError('lambda -->> createProduct', e);
        if (e instanceof BadRequest) {
            return formatJSONResponse({ message: e.message }, e.statusCode);
        }
        return formatJSONResponse({ message: e.message }, 500);
    }
};
