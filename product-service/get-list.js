'use strict';
const getProducts = require("./products");

module.exports.handler = async () => {
    const products = await getProducts();

    return {
        statusCode: 200,
        body: JSON.stringify(products),
    };
};
