import { S3 } from 'aws-sdk';
import { formatJSONResponse, ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';

const s3 = new S3({ region: 'us-east-1' });

const BUCKET = 'electronic-lootbox-shop-uploade-storage'
export const importProductsFile: ValidatedEventAPIGatewayProxyEvent<any> = async (event) => {
    const fileName = event.queryStringParameters?.name;
    const filePath = `uploaded/${fileName}`;

    let statusCode = 200;
    let body = {};

    const params = {
        Bucket: BUCKET,
        Key: filePath,
        Expires: 60,
        ContentType: 'text/csv',
    }

    try {
        body = await s3.getSignedUrlPromise('putObject', params);
    } catch (error) {
        console.error('Error appears: ');
        console.error(error)
        statusCode = 500;
        body = error;
    }

    return formatJSONResponse(body, statusCode);
}
