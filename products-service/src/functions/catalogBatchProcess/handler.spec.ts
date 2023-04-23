import * as AWS from 'aws-sdk';
import * as AWSMock from 'aws-sdk-mock';

import { catalogBatchProcess } from './handler';
import { productsService } from '../../services/products.service';
import { loggerService } from '../../services/logger.service';


describe('catalogBatchProcess', () => {
    let event;

    beforeEach(() => {
        AWSMock.setSDKInstance(AWS);
        AWSMock.mock('DynamoDB.DocumentClient', 'transactWrite', Promise.resolve(null))
        event = {
            Records: [
                { body: '{"id":"101","title":"Laptop","price":"100","count":"1"}' },
                { body: '{"id":"102","title":"Mouse","price":"600","count":"12"}' },
                { body: '{"id":"103","title":"Keyboard","price":"1100","count":"21"}' }
            ]
        }
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should call createProduct method with each item', async () => {
        const spy = jest.spyOn(productsService, 'createProduct').mockImplementation((d) => Promise.resolve(d));

        // @ts-ignore
        AWSMock.mock('SNS', 'publish', Promise.resolve('data sent'));

        await catalogBatchProcess(event);

        expect(spy).toHaveBeenCalledTimes(3);
    });

    it('should call log if publish success', async () => {
        jest.spyOn(productsService, 'createProduct').mockImplementation((d) => Promise.resolve(d));
        const spyLogger = jest.spyOn(loggerService, 'log')
        // @ts-ignore
        AWSMock.mock('SNS', 'publish', Promise.resolve('data sent'));

        await catalogBatchProcess(event);

        expect(spyLogger).toHaveBeenCalled();
    });
});
