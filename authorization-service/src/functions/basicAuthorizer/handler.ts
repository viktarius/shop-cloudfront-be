export const basicAuthorizer = async (event, context, callback) => {
    if (event?.type !== 'TOKEN') {
        callback('Unauthorized')
    }

    const generatePolicy = (principalId, resource, effect) => ({
        principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [{
                Action: 'execute-api:Invoke',
                Effect: effect,
                Resource: resource
            }]
        }
    })

    try {
        const authorizationToken: string = event.authorizationTOken;

        const encodedCreds = authorizationToken.split(' ')[1];
        const buff = Buffer.from(encodedCreds, 'base64');
        const plainCreds = buff.toString('utf-8').split(':');
        const username = plainCreds[0];
        const password = plainCreds[1];

        console.log(`username: ${ username }, password: ${ password }`);

        const storedUserPassword = process.env[username];
        const effect = !storedUserPassword || storedUserPassword !== password ? 'Deny' : 'Allow';

        const policy = generatePolicy(encodedCreds, event.methodArn, effect);

        callback(null, policy);

    } catch (e) {
        callback(`Unauthorized: ${ e.message }`)
    }
}
