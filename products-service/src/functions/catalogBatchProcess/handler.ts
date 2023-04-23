import { SQSEvent } from 'aws-lambda';
import { SNS } from 'aws-sdk';
import * as process from 'process';

export const catalogBatchProcess = (event: SQSEvent) => {
    const sns: SNS = new SNS({ region: 'us-east-1' });
    const data = event.Records.map(({ body }) => JSON.parse(body));

    sns.publish({
        Subject: 'Data added to DB',
        Message: JSON.stringify(data),
        TopicArn: process.env.SNS,
    }, (err) => {
        if(err) {
            console.log('Error occur in public to SNS --->>> ', err)
        } else {
            console.log('Data successfully sent to SNS ::: ', data);
        }
    })
}
