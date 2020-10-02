const SellerService = require('./service');
const AuthService = require('../Auth/service');
const SellerValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const ParamsError = require('../../error/ParamsError');

/**
 * @function createTag
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function createTag(req, res, next) {
    try {
        const { error } = SellerValidation.tag(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const tag = await SellerService.createTag(req.body);

        return res.status(200).json({
            status: 'Tag was succesfully created!',
            tag: tag
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
 * @function createProduct
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function createProduct(req, res, next) {
    try {
        const { error } = SellerValidation.product(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const seller = await AuthService.decodeToken(req.header('refreshToken'));

        const product = await SellerService.createProduct(seller.id, req.body);
        const integration = await SellerService.intergrationProductsTags(product.insertId, req.body.tags);

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

module.exports = {
    createTag,
    createProduct
};
