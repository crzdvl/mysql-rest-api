const ProductService = require('./service');
const AuthService = require('../Auth/service');
const TagValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const ParamsError = require('../../error/ParamsError');

/**
 * @function getAllProducts
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function getAllProducts(req, res, next) {
    try {
        const products = await ProductService.getAllProducts();

        return res.status(200).json({
            status: 'all products.',
            products
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({ error: error.message });
        }

        res.status(500).json({
            name: error.name,
            message: error.message
        });

        return next(error);
    }
}

/**
 * @function getSellerProducts
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function getSellerProducts(req, res, next) {
    try {
        const seller = await AuthService.decodeToken(req.header('refreshToken'));

        const products = await ProductService.getSellerProducts(seller.id);

        return res.status(200).json({
            status: 'all seller products.',
            products
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({ error: error.message });
        }

        res.status(500).json({
            name: error.name,
            message: error.message
        });

        return next(error);
    }
}

/**
 * @function createProduct
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function createProduct(req, res, next) {
    try {
        const { error } = TagValidation.product(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const seller = await AuthService.decodeToken(req.header('refreshToken'));

        const product = await ProductService.createProduct(seller.id, req.body);
        const integration = await ProductService.intergrationProductsTags(product.insertId, req.body.tags);

        return res.status(200).json({
            status: 'Product was succesfully added!',
            integration
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({ error: error.message });
        }

        if (error instanceof ParamsError) {
            return res.status(403).json({ error: 'params error' });
        }

        res.status(500).json({
            name: error.name,
            message: error.message
        });

        return next(error);
    }
}

/**
 * @function getProduct
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function getProduct(req, res, next) {
    try {
        const product = await ProductService.findProduct(req.params.id);

        return res.status(200).json({
            product
        });
    } catch (error) {
        res.status(500).json({
            name: error.name,
            message: error.message
        });

        return next(error);
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getSellerProducts,
    getProduct
};
