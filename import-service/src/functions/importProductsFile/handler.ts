import { S3 } from 'aws-sdk';

import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { Bucket } from '@core/core.helper';

export const importProductsFile: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
    const s3 = new S3({ region: 'us-east-1' });

    const fileName = event.queryStringParameters?.name;

    const params = {
        Bucket,
        Key: `uploaded/${fileName}`,
        Expires: 60,
        ContentType: 'text/csv',
    }

    try {
        const result = await s3.getSignedUrlPromise('putObject', params);
        return formatJSONResponse(result, 200);
    } catch (error) {
        console.error('Error appears: ', error);
        return formatJSONResponse(error, 500);
    }

}
