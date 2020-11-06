const info = {
    version: '1.0',
    title: 'Contacts-Api Api Documentation ',
    description: 'Detailed Api documentaion for the `Contacts-Api`',
    license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
    },
    contact: {
        email: 'ricky.month@gmail.com'
    }
};

const tags = [{ name: 'Open' }, { name: 'Auth' }];

/**
 * 1xx: Informational (request has been received and the process is continuing).
 * 2xx: Success (action was successfully received, understood, and accepted).
 * 3xx: Redirection (further action must be taken in order to complete the request).
 * 4xx: Client Error (request contains incorrect syntax or cannot be fulfilled).
 * 5xx: Server Error (server failed to fulfill an apparently valid request).
 */
const responseObject = {
    200: { description: 'Success response with data' },
    400: { description: 'Bad Request with error data' },
    401: { description: 'Unauthorized' },
    404: { description: 'Not found with error data' },
    408: { description: 'Duplicate key' },
    500: { description: 'Server is down' }
};

const definitions = {
    StandartResponseBody: {
        properties: {
            user: {
                id: {
                    type: 'string',
                    example: 'ObjectID',
                    uniqueItems: true
                },
                email: {
                    type: 'string',
                    example: 'mango@gmail.com',
                    uniqueItems: true
                },
                subscription: { type: 'string', example: 'free' }
            },
            message: { type: 'string', example: 'Success message' },
            data: { type: 'object', example: 'property' }
        }
    },
    AuthRoutesResponse: {
        properties: {
            status: { type: 'number', example: 200 },
            logged: { type: 'boolean', example: true },
            data: {
                user: {
                    id: {
                        type: 'string',
                        example: 'ObjectID',
                        uniqueItems: true
                    },
                    email: {
                        type: 'string',
                        example: 'mango@gmail.com',
                        uniqueItems: true
                    },
                    subscription: { type: 'string', example: 'free' }
                },
                accessToken: {
                    type: 'string',
                    example:
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMWZkZmQ2N2ZmOWU1OWYyOGNhMGU2NCIsImlhdCI6MTU5NjAwNDg1OCwiZXhwIjoxNTk2MDA4NDU4fQ.jP9dCDrTsKOdVWl-01TPcsD4kQgN5fqsSO9LsECKnW0'
                },

                refreshToken: {
                    type: 'string',
                    example:
                        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMWZkZmQ2N2ZmOWU1OWYyOGNhMGU2NCIsImlhdCI6MTU5NjAwNDg1OCwiZXhwIjoxNjAzNzgwODU4fQ.AGRtgGxg-FpKNdF-nVsPzUNkuzN4ivTAC54d33S0HwY'
                }
            },
            message: { type: 'string', example: 'Success Message' }
        }
    }
};

module.exports = {
 info, tags, responseObject, definitions
};
