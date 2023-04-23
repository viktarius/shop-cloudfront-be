import { SQSEvent } from 'aws-lambda';

export const catalogBatchProcess = (event: SQSEvent) => {
    const data = event.Records.map(({ body }) => JSON.parse(body));

    console.log('Processed data from Queue ::: ', data);
}
