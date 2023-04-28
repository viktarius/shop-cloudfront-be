import { SQSEvent } from 'aws-lambda';
import { SNS } from 'aws-sdk';
import * as process from 'process';

import { productsService } from '../../services/products.service';
import { loggerService } from '../../services/logger.service';

export const catalogBatchProcess = async (event: SQSEvent) => {
    let data = [];
    try {
        data = event.Records.map(({ body }) => JSON.parse(body));
        data = data.map((d) => ({ ...d, price: +d.price }))
        await Promise.allSettled(data.map(d => productsService.createProduct(d)));
    } catch (err) {
        loggerService.logError('catalogBatchProcess -->> Error in save data to DB --->>> ', err);
    }

    try {
        const sns: SNS = new SNS({ region: 'us-east-1' });

        await Promise.allSettled(data.map(d => {
            return sns.publish({
                Subject: 'Data added to DB',
                Message: JSON.stringify(d),
                TopicArn: process.env.SNS,
            }).promise()
        }));

        loggerService.log('Data successfully sent to SNS ::: ', data);
    } catch (err) {
        loggerService.logError('catalogBatchProcess -->> Error occur in public to SNS --->>> ', err);
    }
}
