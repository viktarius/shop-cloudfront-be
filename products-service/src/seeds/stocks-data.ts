import { DynamoDB } from 'aws-sdk';
export const stocksData: DynamoDB.Types.BatchWriteItemInput = {
    RequestItems: {
        stocks: [{
            PutRequest: {
                Item: {
                    'product_id': { S: '7567ec4b-b10c-48c5-9345-fc73c48a80aa' },
                    'count': { N: '4' },
                }
            }
        }, {
            PutRequest: {
                Item: {
                    'product_id': { S: '7567ec4b-b10c-48c5-9345-fc73c48a80a2' },
                    'count': { N: '007' },
                }
            }
        }, {
            PutRequest: {
                Item: {
                    'product_id': { S: '7567ec4b-b10c-48c5-9345-fc73c48a80a3' },
                    'count': { N: '7' },
                }
            }
        }, {
            PutRequest: {
                Item: {
                    'product_id': { S: '7567ec4b-b10c-48c5-9345-fc73c48a80a4' },
                    'count': { N: '8' },
                }
            }
        }, {
            PutRequest: {
                Item: {
                    'product_id': { S: '7567ec4b-b10c-48c5-9345-fc73c48a80a5' },
                    'count': { N: '12' },
                }
            }
        }, {
            PutRequest: {
                Item: {
                    'product_id': { S: '7567ec4b-b10c-48c5-9345-fc73c48a80a6' },
                    'count': { N: '4' },
                }
            }
        }, {
            PutRequest: {
                Item: {
                    'product_id': { S: '7567ec4b-b10c-48c5-9345-fc73c48a80a7' },
                    'count': { N: '3' },
                }
            }
        }, {
            PutRequest: {
                Item: {
                    'product_id': { S: '7567ec4b-b10c-48c5-9345-fc73c48a80a8' },
                    'count': { N: '11' },
                }
            }
        }]
    }
}
