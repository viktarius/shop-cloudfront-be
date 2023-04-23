import * as AWS from 'aws-sdk';
import * as AWSMock from 'aws-sdk-mock';
import { importProductsFile } from './handler';

describe('#importProductsFile', () => {
    let event;

    beforeEach(() => {
        AWSMock.setSDKInstance(AWS);

        event = {
            queryStringParameters: {
                name: 'test.csv',
            },
        }
    });

    it('should return url and status 200', async () => {
        const mockedURL: string = 'https://aws.s3.bucket.test';

        AWSMock.mock('S3', 'getSignedUrl', mockedURL);

        const response: any = await importProductsFile(event, null, null);
        expect(response.body).toEqual(JSON.stringify(mockedURL));
        expect(response.statusCode).toEqual(200);
        AWSMock.restore('S3');
    });

    it('should return error and status 500', async () => {
        // @ts-ignore
        AWSMock.mock('S3', 'getSignedUrl', (operation, params, callback) => callback(null, Promise.reject('error msg')));

        const response: any = await importProductsFile(event, null, null);
        expect(response.body).toEqual(JSON.stringify('error msg'));
        expect(response.statusCode).toEqual(500);
        AWSMock.restore('S3');
    });
});
