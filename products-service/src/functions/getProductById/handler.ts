import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';

import ProductsService from '../../services/products.service';

export const getProductById: ValidatedEventAPIGatewayProxyEvent<null> = async (event) => {
    const { id } = event.pathParameters;
    const product = await ProductsService.getProductById(id);
    if (product) {
        return formatJSONResponse( product);
    }
    return formatJSONResponse({ message: `Product with id: ${id} not found!` }, 404);
};
