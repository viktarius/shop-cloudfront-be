import ProductsService from "./src/services/products.service";

export const handler = async () => {
    const products = await ProductsService.getProducts();

    return {
        statusCode: 200,
        body: JSON.stringify(products),
    };
};
