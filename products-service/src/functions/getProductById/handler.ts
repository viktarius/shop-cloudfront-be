import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';

import { productsService } from '../../services/products.service';
import { loggerService } from '../../services/logger.service';

export const getProductById: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
    const { id } = event.pathParameters;
    loggerService.log('lambda -->> getProductById -->> requests and arguments: ', event);
    try {
        const result = await productsService.getItemById(id);
        if (result?.id) {
            return formatJSONResponse(result);
        } else {
            return formatJSONResponse({ message: `Product with id: ${ id } not found!` }, 404);
        }
    } catch (e) {
        loggerService.logError('lambda -->> getProductById', e);
        return formatJSONResponse({ message: e.message }, 500);
    }
};
