const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class SellerValidation extends Validation {
    /**
     * @param {String} profile.email
     * @param {String} profile.password
     * @param {String} profile.firstname
     * @param {String} profile.lastname
     * @returns
     * @memberof AuthValidation
     */
    create(profile) {
        return this.Joi.object({
            email: this.Joi.string().email().required(),
            password: this.Joi.string().required(),
            firstname: this.Joi.string().min(3).max(30).required(),
            lastname: this.Joi.string().min(3).max(30).required()
        }).validate(profile, {
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
