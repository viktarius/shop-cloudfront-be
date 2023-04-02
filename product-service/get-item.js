import ProductsService from "./src/services/products.service";

export const handler = async (event) => {
    const { id } = event.pathParameters;
    const product = await ProductsService.getProductById(id);

    if (!product) {
        return {
            statusCode: 404,
            body: 'Product not found!'
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify(product),
    };
};
