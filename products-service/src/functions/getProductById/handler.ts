import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';

import ProductsService from '../../services/products.service';

export const getProductById: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
    const { id } = event.pathParameters;
    const product = await ProductsService.getItemById(id);
    if (product) {
        return formatJSONResponse( product);
    }
    return formatJSONResponse({ message: `Product with id: ${id} not found!` }, 404);
};
