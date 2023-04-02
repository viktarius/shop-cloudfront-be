'use strict';
const getProducts = require("./products");

module.exports.handler = async (event) => {
    const { id } = event.pathParameters;
    const products = await getProducts();
    const product = products.find(pr => pr.id === id);

    if (!product) {
        return {
            statusCode: 404,
            message: 'Product not found!'
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify(product),
    };
};
