import type { AWS } from '@serverless/typescript';

import getProducts from '@functions/getProducts';
import getProductById from '@functions/getProductById';

const serverlessConfiguration: AWS = {
  service: 'products-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-auto-swagger'],
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
          Effect: "Allow",
          Action: [
            "dynamodb:DescribeTable",
            "dynamodb:Query",
            "dynamodb:Scan",
            "dynamodb:GetItem",
            "dynamodb:PutItem",
            "dynamodb:UpdateItem",
            "dynamodb:DeleteItem",
          ],
          Resource: 'arn:aws:dynamodb:us-east-1:*:*'
        }]
      }
    }
  },
  // import the function via paths
  functions: { getProducts, getProductById },
  package: { individually: true },
  custom: {
    documentation: {
      version: '1',
      title: 'My API',
      description: 'This is my API',
      models: {}
    },
    autoswagger:{
      apiType: 'http',
      generateSwaggerOnDeploy: false,
    },
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
