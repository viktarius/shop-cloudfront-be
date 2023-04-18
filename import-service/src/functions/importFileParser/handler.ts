import { S3 } from 'aws-sdk';
import csv from 'csv-parser';

const s3 = new S3({ region: 'us-east-1' });
const BUCKET = 'electronic-lootbox-shop-uploade-storage'
export const importFileParser = async (event) => {
    console.log('event::: ', event)
    for (const record of event.Records) {
        return new Promise((resolve, reject) => {
            console.log('record key :: ', record.s3.object.key);

            const params = {
                Bucket: BUCKET,
                Key: record.s3.object.key
            }

            const s3Stream = s3.getObject(params).createReadStream().pipe(csv());
            return s3Stream.on('data', (data) => { console.log('Parsed data ::: ', data) })
                .on('error', (error) => { console.error("Error during read stream -> ", error) })
                .on('end', async () => {
                    try {
                        await s3.copyObject({
                            ...params,
                            CopySource: `${ BUCKET }/${ record.s3.object.key }`,
                            Key: record.s3.object.key.replace('uploaded', 'parsed')
                        }).promise();

                        await s3.deleteObject(params).promise();
                        resolve(null);
                    } catch (e) {
                        console.log('error during copying: ', e)
                        reject(e)
                    }

                })
        })
    }
}
