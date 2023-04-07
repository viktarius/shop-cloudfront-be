import { handlerPath } from '@libs/handler-resolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.getProductById`,
    events: [
        {
            http: {
                method: 'get',
                path: 'products/{id}',
                cors: true,
                request: {
                    parameters: {
                        paths: {
                            id: true,
                        }
                    }
                },
                summary: "Get product by id",
                swaggerTags: ['Products']
            },
        },
    ],
};
