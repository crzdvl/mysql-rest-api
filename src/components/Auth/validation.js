const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class AuthValidation extends Validation {
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
     * @param {String} profile.password
     * @returns
     * @memberof AuthValidation
     */
    login(profile) {
        return this.Joi.object({
            email: this.Joi.string().email().required(),
            password: this.Joi.string().required()
        }).validate(profile, {
            allowUnknown: true
        });
    }
}

module.exports = new AuthValidation();
