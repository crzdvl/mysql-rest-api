const CustomersService = require('./service');
const ValidationError = require('../../error/ValidationError');

/**
 * @function getAllProducts
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function getAllProducts(req, res, next) {
    try {
        const products = await CustomersService.getAllProducts();

        return res.status(200).json({
            status: 'verify',
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

module.exports = {
    getAllProducts
};
