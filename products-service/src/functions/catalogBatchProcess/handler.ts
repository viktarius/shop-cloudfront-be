import { SQSEvent } from 'aws-lambda';
import { SNS } from 'aws-sdk';
import * as process from 'process';

import { productsService } from '../../services/products.service';
import { loggerService } from '../../services/logger.service';

export const catalogBatchProcess = async (event: SQSEvent) => {
    const sns: SNS = new SNS({ region: 'us-east-1' });

    try {
        const data = event.Records.map(({ body }) => JSON.parse(body));
        await Promise.all(data.map(d => productsService.createProduct(d)))

        sns.publish({
            Subject: 'Data added to DB',
            Message: JSON.stringify(data),
            TopicArn: process.env.SNS,
        }, (err) => {
            if (err) {
                loggerService.logError('catalogBatchProcess -->> Error occur in public to SNS --->>> ', err);
            } else {
                loggerService.log('Data successfully sent to SNS ::: ', data);
            }
        })
    } catch(e) {
        loggerService.logError('catalogBatchProcess -->> Error in save data to DB --->>> ', e);
    }
}
