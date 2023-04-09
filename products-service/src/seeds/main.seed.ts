import { DynamoDB, config } from 'aws-sdk';

import { productsData } from './products-data';
import { stocksData } from './stocks-data';

config.update({ region: 'us-east-1' })

const ddb = new DynamoDB({ apiVersion: '2012-08-10' });

fillTable('products', productsData);
fillTable('stocks', stocksData);

function fillTable(tableName: string, data: DynamoDB.Types.BatchWriteItemInput): void {
    console.log(`LOG: filling table -->> ${ tableName }`);
    ddb.batchWriteItem(data, function (err) {
        if (err) {
            console.log(`LOG: filling table -->> ${ tableName } -->> ERROR`);
            console.log(err);
        } else {
            console.log(`LOG: filling table -->> ${ tableName } -->> SUCCESS`);
        }
    })
}
