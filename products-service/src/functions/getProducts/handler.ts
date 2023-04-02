import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';

import ProductsService from '../../services/products.service';

export const getProducts: ValidatedEventAPIGatewayProxyEvent<null> = async () => {
    const products = await ProductsService.getProducts();
    return formatJSONResponse(products);
};
