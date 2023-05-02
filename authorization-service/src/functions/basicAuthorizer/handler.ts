export const basicAuthorizer = async (event, _context, callback) => {
    console.log(event);

    if (event?.type !== 'REQUEST') {
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
        const authorizationToken: string = event.headers.authorization;
        const buff = Buffer.from(authorizationToken, 'base64');
        const plainCreds = buff.toString('utf-8').split(':');
        const username = plainCreds[0];
        const password = plainCreds[1];

        console.log(`username: ${ username }, password: ${ password }`);

        const storedUserPassword = process.env[username];
        const effect = !storedUserPassword || storedUserPassword !== password ? 'Deny' : 'Allow';
        console.log('storedUserPassword:::', storedUserPassword);
        console.log('effect:::', effect);


        const policy = generatePolicy(authorizationToken, event.routeArn, effect);

        callback(null, policy);

    } catch (e) {
        callback(`Unauthorized: ${ e.message }`)
    }
}
