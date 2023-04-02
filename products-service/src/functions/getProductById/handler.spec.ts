// import { main } from './handler';
//
// jest.mock('@middy/core', () => {
//     return (handler) => {
//         return {
//             use: jest.fn().mockReturnValue(handler), // ...use(ssm()) will return handler function
//         }
//     }
// })
//
// describe('getProductById', () => {
//     it('should return found product and status 200', async () => {
//         const productId = "7567ec4b-b10c-48c5-9445-fc73c48a80a2";
//         const res = await main(productId);
//
//         expect(res.statusCode).toBe(200);
//     });
// });
