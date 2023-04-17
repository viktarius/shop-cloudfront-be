import type { AWS } from '@serverless/typescript';

import importProductsFile from '@functions/importProductsFile';

const serverlessConfiguration: AWS = {
    service: 'import-service',
    frameworkVersion: '3',
    plugins: ['serverless-esbuild'],
    provider: {
        name: 'aws',
        runtime: 'nodejs14.x',
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
        },
        region: 'us-east-1',
        profile: 'Viktar_Belski',
        stage: 'v2',
        iam: {
            role: {
                statements: [{
                    Effect: 'Allow',
                    Action: ['s3:ListBucket'],
                    Resource: 'arn:aws:s3:::electronic-lootbox-shop-uploade-storage'
                }, {
                    Effect: 'Allow',
                    Action: ['s3:*'],
                    Resource: 'arn:aws:s3:::electronic-lootbox-shop-uploade-storage/*'
                }]
            }
        }
    },
    // import the function via paths
    functions: { importProductsFile },
    package: { individually: true },
    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ['aws-sdk'],
            target: 'node14',
            define: { 'require.resolve': undefined },
            platform: 'node',
            concurrency: 10,
        },
    },
};

module.exports = serverlessConfiguration;
