import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';

import ProductsService from '../../services/products.service';

export const getProducts: ValidatedEventAPIGatewayProxyEvent<any> = async () => {
    const products = await ProductsService.getList();
    return formatJSONResponse(products);
};
