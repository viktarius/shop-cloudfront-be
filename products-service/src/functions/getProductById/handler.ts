import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';

import ProductsService from '../../services/products.service';

export const getProductById: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
    const { id } = event.pathParameters;
    try {
        const result = await ProductsService.getItemById(id);
        if (result?.id) {
            return formatJSONResponse(result);
        } else {
            return formatJSONResponse({ message: `Product with id: ${ id } not found!` }, 404);
        }
    } catch (e) {
        console.log('ERROR: ', e);
        return formatJSONResponse({message: e.message}, 500);
    }
};
