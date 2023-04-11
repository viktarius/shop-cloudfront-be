## Task 4 (Integration with NoSQL Database)

### Additional (optional) tasks
- ✔️ +6 (All languages) - POST /products lambda functions returns error 400 status code if product data is invalid
- ✔️ +6 (All languages) - All lambdas return error 500 status code on any error (DB connection, any unhandled error in code)
- ✔️ +6 (All languages) - All lambdas do console.log for each incoming requests and their arguments
- ❌ +6 (All languages) - Use RDS instance instead fo DynamoDB tables. Do not commit your environment variables in serverless.yml to github!
- ✔️ +6 (All languages) - Transaction based creation of product (in case stock creation is failed then related to this stock product is not created and not ready to be used by the end user and vice versa) (https://devcenter.kinvey.com/nodejs/tutorials/bl-transactional-support, https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/transaction-apis.html)

### LINKS: 
- getProducts - https://7d1m2iiap0.execute-api.us-east-1.amazonaws.com/v2/products
- getProductById - https://7d1m2iiap0.execute-api.us-east-1.amazonaws.com/v2/products/7567ec4b-b10c-48c5-9345-fc73c48a80a2
- SWAGGER: https://7d1m2iiap0.execute-api.us-east-1.amazonaws.com/v2/swagger
- FE: https://d17hlkvoaz74v8.cloudfront.net/

### The score: 94 / 100
