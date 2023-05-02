import { handlerPath } from '@libs/handler-resolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.basicAuthorizer`,
    events: [
        {
            httpApi: {
                method: 'get',
                path: '/basicAuthorizer'
            }
        }
    ]
}
