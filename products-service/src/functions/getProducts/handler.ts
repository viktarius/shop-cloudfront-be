import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';

import ProductsService from '../../services/products.service';

export const getProducts: ValidatedEventAPIGatewayProxyEvent<any> = async () => {
    try {
        const result = await ProductsService.getList();
        return formatJSONResponse(result);
    } catch (e) {
        console.log('ERROR: ', e);
        return formatJSONResponse({message: e.message}, 500);
    }
};
