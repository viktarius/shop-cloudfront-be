import type { AWS } from '@serverless/typescript';

import getProducts from '@functions/getProducts';
import getProductById from '@functions/getProductById';
import createProduct from '@functions/createProduct';
import catalogBatchProcess from '@functions/catalogBatchProcess';

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
      SNS: {
        Ref: 'createProductTopic'
      }
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
        }, {
          Effect: "Allow",
          Action: "sns:*",
          Resource: {
            Ref: "createProductTopic"
          }
        }]
      }
    }
  },
  // import the function via paths
  functions: { getProducts, getProductById, createProduct, catalogBatchProcess },
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
      typefiles: ['./src/services/product.model.ts']
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
  resources: {
    Resources: {
      catalogItemsQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'catalogItemsQueue'
        }
      },
      createProductTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'createProductTopic'
        }
      },
      firstSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'learn.cloud.first@gmail.com',
          Protocol: 'email',
          TopicArn: {
            Ref: 'createProductTopic'
          }
        }
      },
      secondSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Endpoint: 'learn.cloud.second@gmail.com',
          Protocol: 'email',
          TopicArn: {
            Ref: 'createProductTopic'
          },
          FilterPolicyScope: 'MessageBody',
          FilterPolicy: {
            price: [{ "numeric": [">=", 100] }]
          }
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
