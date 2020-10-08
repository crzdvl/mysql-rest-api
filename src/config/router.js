const express = require('express');
const http = require('http');

// const TagRouter = require('../components/Tag/router');
const AuthRouter = require('../components/Auth/router');
const SellerRouter = require('../components/Seller/router');
const ProductRouter = require('../components/Product/router');
const CategoryRouter = require('../components/Category/router');
const CustomerRouter = require('../components/Customer/router');

module.exports = {
    /**
     * @function
     * @param {express.Application} app
     * @summary init Application router
     * @returns void
     */
    init(app) {
        const router = express.Router();

        /**
         * Forwards any requests to the /tag URI to TagRouter.
         * @name /tag
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        // app.use('/tag', TagRouter);

        /**
         * Forwards any requests to the /auth URI to AuthRouter.
         * @name /auth
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        app.use('/auth', AuthRouter);

        /**
         * Forwards any requests to the /seller URI to SellerRouter.
         * @name /seller
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        app.use('/seller', SellerRouter);

        /**
         * Forwards any requests to the /product URI to ProductRouter.
         * @name /product
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        app.use('/product', ProductRouter);

        /**
         * Forwards any requests to the /category URI to CategoryRouter.
         * @name /category
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        app.use('/category', CategoryRouter);

        /**
         * Forwards any requests to the /customer URI to CustomerRouter.
         * @name /customer
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        app.use('/customer', CustomerRouter);

        /**
         * @description No results returned mean the object is not found
         * @function
         * @inner
         * @param {callback} middleware - Express middleware.
         */
        app.use((req, res) => {
            res.status(404).send(http.STATUS_CODES[404]);
        });

        /**
         * @function
         * @inner
         * @param {express.Router}
         */
        app.use(router);
    }
};
