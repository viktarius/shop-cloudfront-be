import { handlerPath } from '@libs/handler-resolver';

export default {
    handler: `${ handlerPath(__dirname) }/handler.basicAuthorizer`,
    events: [
        {
            httpApi: {
                method: 'get',
                path: '/basicAuthorizer',
                responseData: {
                    401: {
                        description: 'Unauthorized'
                    },
                    403: {
                        description: 'Forbidden'
                    }
                }
            }
        }
    ]
}
