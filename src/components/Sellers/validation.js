const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class SellerValidation extends Validation {
    /**
     * @param {String} profile.email
     * @param {String} profile.fullName
     * @param {String} profile.username
     * @returns
     * @memberof AuthValidation
     */
    product(data) {
        return this.Joi.object({
            name: this.Joi.string().required()
        }).validate(data, {
            allowUnknown: true
        });
    }

    /**
     * @param {String} profile.email
     * @param {String} profile.fullName
     * @param {String} profile.username
     * @returns
     * @memberof AuthValidation
     */
    tag(data) {
        return this.Joi.object({
            name: this.Joi.string().required()
        }).validate(data, {
            allowUnknown: true
        });
    }
}

module.exports = new SellerValidation();
