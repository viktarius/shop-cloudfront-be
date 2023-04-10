import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';

import { productsService } from '../../services/products.service';
import { loggerService } from '../../services/logger.service';

export const getProducts: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
    loggerService.log('lambda -->> getProducts -->> requests and arguments: ', event);
    try {
        const result = await productsService.getList();
        return formatJSONResponse(result);
    } catch (e) {
        loggerService.logError('lambda -->> getProducts', e);
        return formatJSONResponse({message: e.message}, 500);
    }
};
