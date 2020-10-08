const SellerService = require('./service');
const AuthService = require('../Auth/service');
const SellerValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const ParamsError = require('../../error/ParamsError');

/**
 * @function signup
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function signup(req, res, next) {
    try {
        const { error } = SellerValidation.create(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const emailToken = await AuthService.createEmailToken(req.body.email, 'sellers');

        await SellerService.create(req.body);

        await AuthService.sendEmailToken(req.body.email, emailToken);

        return res.status(200).json({
            status: 'user registered.'
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
    signup
};
