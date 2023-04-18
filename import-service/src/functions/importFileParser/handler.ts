import { S3 } from 'aws-sdk';
import csv from 'csv-parser';

import { Bucket } from '@core/core.helper';

export const importFileParser = async (event) => {
    const s3 = new S3({ region: 'us-east-1' });

    for (const record of event.Records) {
        return new Promise((resolve, reject) => {
            const params = {
                Bucket,
                Key: record.s3.object.key
            }

            const s3Stream = s3.getObject(params).createReadStream().pipe(csv());
            return s3Stream.on('data', (data) => { console.log('Parsed data ::: ', data) })
                .on('error', (error) => { console.error("Error appears during reading file --->>> ", error) })
                .on('end', async () => {
                    try {
                        await s3.copyObject({
                            ...params,
                            CopySource: `${ Bucket }/${ record.s3.object.key }`,
                            Key: record.s3.object.key.replace('uploaded', 'parsed')
                        }).promise();

                        await s3.deleteObject(params).promise();
                        resolve(null);
                    } catch (e) {
                        console.log('Error appears during copying file --->>> ', e)
                        reject(e)
                    }

                })
        })
    }
}
