const swaggerHelpers = require('./swagger-helpers');

const securityObject = [
    {
        authenticate: []
    }
];

module.exports = {
    '/': {
        get: {
            tags: ['Open'],
            description:
                "Get root request's response from the api - basically server status",
            responses: {
                301: {
                    description: 'Redirect to Open Api'
                }
            }
        }
    },
    /** ============ Auth ============ */
    '/auth/login': {
        post: {
            tags: ['Auth'],
            summary: 'Route for login user.',
            description: 'Route for login user.',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'body',
                    name: 'Login user.',
                    description: 'Route for login user.',
                    required: true,
                    schema: {
                        type: 'object',
                        required: [
                            'email',
                            'password',
                            'role'
                        ],
                        properties: {
                            email: {
                                type: 'string',
                                example: 'mango@gmail.com'
                            },
                            password: { type: 'string', example: 'pass123' },
                            role: {
                                type: 'string',
                                example: 'sellers or customers'
                            }
                        }
                    }
                }
            ],
            responses: swaggerHelpers.responseObject
        }
    },
    '/auth/updateConnection': {
        post: {
            tags: ['Auth'],
            summary: 'Route for updating connection of user.',
            description: 'Route for updating connection of user.',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'header',
                    name: 'refreshToken',
                    required: true,
                    schema: {
                        type: 'string',
                        required: ['refreshToken'],
                        properties: {
                            refreshToken: { type: 'string', example: 'email' }
                        }
                    }
                }
            ],
            responses: swaggerHelpers.responseObject
        }
    },
    '/auth/verify/{token}': {
        get: {
            tags: ['Auth'],
            summary: 'Route for verifing token.',
            description:
                'Route for verifing token.',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'path',
                    name: 'token',
                    required: true,
                    schema: {
                        type: 'string',
                        required: ['token'],
                        properties: {
                            token: { type: 'string', example: 'http://localhost:3000/auth/verify/:token' }
                        }
                    }
                }
            ],
            responses: swaggerHelpers.responseObject,
            security: securityObject
        }
    },
    /** ============ Customer ============ */
    '/customer/signup': {
        post: {
            tags: ['Customer'],
            summary: 'Customer registration.',
            description: 'Customer registration.',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'body',
                    name: 'Customer signup',
                    description: 'Customer registration.',
                    required: true,
                    schema: {
                        type: 'object',
                        required: [
                            'email',
                            'password',
                            'firstname',
                            'lastname'
                        ],
                        properties: {
                            email: {
                                type: 'string',
                                example: 'mango@gmail.com'
                            },
                            password: { type: 'string', example: 'pass123' },
                            firstname: {
                                type: 'string',
                                example: 'kotickha'
                            },
                            lastname: {
                                type: 'string',
                                example: 'makarovich'
                            }
                        }
                    }
                }
            ],
            responses: swaggerHelpers.responseObject
        }
    },
    '/customer/me': {
        get: {
            tags: ['Customer'],
            summary: 'Get personal customer information.',
            description:
                'Get personal customer information.',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'header',
                    name: 'refreshToken',
                    required: true,
                    schema: {
                        type: 'string',
                        required: ['refreshToken'],
                        properties: {
                            refreshToken: { type: 'string', example: 'email' }
                        }
                    }
                }
            ],
            responses: swaggerHelpers.responseObject,
            security: securityObject
        }
    },
    /** ============ Seller ============ */
    '/seller/signup': {
        post: {
            tags: ['Seller'],
            summary: 'Seller registration.',
            description: 'Seller registration.',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'body',
                    name: 'Seller signup',
                    description: 'Seller registration.',
                    required: true,
                    schema: {
                        type: 'object',
                        required: [
                            'email',
                            'password',
                            'firstname',
                            'lastname'
                        ],
                        properties: {
                            email: {
                                type: 'string',
                                example: 'mango@gmail.com'
                            },
                            password: { type: 'string', example: 'pass123' },
                            firstname: {
                                type: 'string',
                                example: 'kotickha'
                            },
                            lastname: {
                                type: 'string',
                                example: 'makarovich'
                            }
                        }
                    }
                }
            ],
            responses: swaggerHelpers.responseObject
        }
    },
    '/seller/me': {
        get: {
            tags: ['Seller'],
            summary: 'Get personal seller information.',
            description:
                'Get personal seller information.',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'header',
                    name: 'refreshToken',
                    required: true,
                    schema: {
                        type: 'string',
                        required: ['refreshToken'],
                        properties: {
                            refreshToken: { type: 'string', example: 'email' }
                        }
                    }
                }
            ],
            responses: swaggerHelpers.responseObject,
            security: securityObject
        }
    },
    '/seller/{id}': {
        get: {
            tags: ['Seller'],
            summary: 'Get personal another seller information.',
            description:
                'Get personal another seller information.',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                        required: ['id'],
                        properties: {
                            id: { type: 'string', example: '1' }
                        }
                    }
                },
                {
                    in: 'header',
                    name: 'refreshToken',
                    required: true,
                    schema: {
                        type: 'string',
                        required: ['refreshToken'],
                        properties: {
                            refreshToken: { type: 'string', example: 'email' }
                        }
                    }
                }
            ],
            responses: swaggerHelpers.responseObject,
            security: securityObject
        }
    },
    '/seller/': {
        get: {
            tags: ['Seller'],
            summary: 'Get all sellers.',
            description:
                'Get  all sellers.',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'header',
                    name: 'refreshToken',
                    required: true,
                    schema: {
                        type: 'string',
                        required: ['refreshToken'],
                        properties: {
                            refreshToken: { type: 'string', example: 'email' }
                        }
                    }
                }
            ],
            responses: swaggerHelpers.responseObject,
            security: securityObject
        }
    },
    /** ============ Category ============ */
    '/category/create': {
        post: {
            tags: ['Category'],
            summary: 'Route for create category.',
            description: 'Route for create category.',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'header',
                    name: 'refreshToken',
                    required: true,
                    schema: {
                        type: 'string',
                        required: ['refreshToken'],
                        properties: {
                            refreshToken: { type: 'string', example: 'email' }
                        }
                    }
                },
                {
                    in: 'body',
                    name: 'Category create',
                    description: 'Route for create category.',
                    required: true,
                    schema: {
                        type: 'object',
                        required: [
                            'name'
                        ],
                        properties: {
                            name: {
                                type: 'string',
                                example: 'category'
                            }
                        }
                    }
                }
            ],
            responses: swaggerHelpers.responseObject
        }
    },
    '/category/{id}': {
        get: {
            tags: ['Category'],
            summary: 'Get category.',
            description:
                'Get  category.',
            consumes: ['application/json'],
            produces: ['application/json'],
            responses: swaggerHelpers.responseObject,
            security: securityObject,
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                        required: ['id'],
                        properties: {
                            token: { type: 'string', example: '1' }
                        }
                    }
                }
            ]
        }
    },
    '/category/': {
        get: {
            tags: ['Category'],
            summary: 'Get all categories.',
            description:
                'Get  all categories.',
            consumes: ['application/json'],
            produces: ['application/json'],
            responses: swaggerHelpers.responseObject,
            security: securityObject
        }
    },
    /** ============ Tag ============ */
    '/tag/create': {
        post: {
            tags: ['Tag'],
            summary: 'Route for create tag.',
            description: 'Route for create tag.',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'header',
                    name: 'refreshToken',
                    required: true,
                    schema: {
                        type: 'string',
                        required: ['refreshToken'],
                        properties: {
                            refreshToken: { type: 'string', example: 'email' }
                        }
                    }
                },
                {
                    in: 'body',
                    name: 'Tag create',
                    description: 'Route for create tag.',
                    required: true,
                    schema: {
                        type: 'object',
                        required: [
                            'name'
                        ],
                        properties: {
                            name: {
                                type: 'string',
                                example: 'tag'
                            }
                        }
                    }
                }
            ],
            responses: swaggerHelpers.responseObject
        }
    },
    '/tag/{id}': {
        get: {
            tags: ['Tag'],
            summary: 'Get tag.',
            description:
                'Get  tag.',
            consumes: ['application/json'],
            produces: ['application/json'],
            responses: swaggerHelpers.responseObject,
            security: securityObject,
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                        required: ['id'],
                        properties: {
                            token: { type: 'string', example: '1' }
                        }
                    }
                }
            ]
        }
    },
    '/tag/': {
        get: {
            tags: ['Tag'],
            summary: 'Route for getting all tags.',
            description:
                'Route for getting all tags.',
            consumes: ['application/json'],
            produces: ['application/json'],
            responses: swaggerHelpers.responseObject,
            security: securityObject
        }
    },
    /** ============ Product ============ */
    '/product/create': {
        post: {
            tags: ['Product'],
            summary: 'Route for create product.',
            description: 'Route for create product.',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'header',
                    name: 'refreshToken',
                    required: true,
                    schema: {
                        type: 'string',
                        required: ['refreshToken'],
                        properties: {
                            refreshToken: { type: 'string', example: 'email' }
                        }
                    }
                },
                {
                    in: 'body',
                    name: 'Category product',
                    description: 'Route for create product.',
                    required: true,
                    schema: {
                        type: 'object',
                        required: [
                            'name',
                            'seller_id',
                            'tags'
                        ],
                        properties: {
                            name: {
                                type: 'string',
                                example: 'name'
                            },
                            seller_id: {
                                type: 'number',
                                example: 5
                            },
                            tags: {
                                type: 'string',
                                example: 5
                            }
                        }
                    }
                }
            ],
            responses: swaggerHelpers.responseObject
        }
    },
    '/product/seller': {
        get: {
            tags: ['Product'],
            summary: 'Route for getting seller products.',
            description: 'Route for getting seller products.',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    in: 'header',
                    name: 'refreshToken',
                    required: true,
                    schema: {
                        type: 'string',
                        required: ['refreshToken'],
                        properties: {
                            refreshToken: { type: 'string', example: 'email' }
                        }
                    }
                }
            ],
            responses: swaggerHelpers.responseObject
        }
    },
    '/product/{id}': {
        get: {
            tags: ['Product'],
            summary: 'Get product.',
            description:
                'Get  product.',
            consumes: ['application/json'],
            produces: ['application/json'],
            responses: swaggerHelpers.responseObject,
            security: securityObject,
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    required: true,
                    schema: {
                        type: 'string',
                        required: ['id'],
                        properties: {
                            token: { type: 'string', example: '1' }
                        }
                    }
                }
            ]
        }
    },
    '/product/seller/{sellerId}': {
        get: {
            tags: ['Product'],
            summary: 'Get product from one seller.',
            description:
                'Get  product from one seller.',
            consumes: ['application/json'],
            produces: ['application/json'],
            responses: swaggerHelpers.responseObject,
            security: securityObject,
            parameters: [
                {
                    in: 'path',
                    name: 'sellerId',
                    required: true,
                    schema: {
                        type: 'string',
                        required: ['sellerId'],
                        properties: {
                            token: { type: 'string', example: '1' }
                        }
                    }
                }
            ]
        }
    },
    '/product/tag/{tagId}': {
        get: {
            tags: ['Product'],
            summary: 'Get product by tag.',
            description:
                'Get product by tag.',
            consumes: ['application/json'],
            produces: ['application/json'],
            responses: swaggerHelpers.responseObject,
            security: securityObject,
            parameters: [
                {
                    in: 'path',
                    name: 'tagId',
                    required: true,
                    schema: {
                        type: 'string',
                        required: ['tagId'],
                        properties: {
                            token: { type: 'string', example: '1' }
                        }
                    }
                }
            ]
        }
    },
    '/product/category/{categoryId}': {
        get: {
            tags: ['Product'],
            summary: 'Get product by category.',
            description:
                'Get  product by category.',
            consumes: ['application/json'],
            produces: ['application/json'],
            responses: swaggerHelpers.responseObject,
            security: securityObject,
            parameters: [
                {
                    in: 'path',
                    name: 'categoryId',
                    required: true,
                    schema: {
                        type: 'string',
                        required: ['categoryId'],
                        properties: {
                            token: { type: 'string', example: '1' }
                        }
                    }
                }
            ]
        }
    },
    '/product/': {
        get: {
            tags: ['Product'],
            summary: 'Get all products.',
            description:
                'Get  all products.',
            consumes: ['application/json'],
            produces: ['application/json'],
            responses: swaggerHelpers.responseObject,
            security: securityObject
        }
    }
};
