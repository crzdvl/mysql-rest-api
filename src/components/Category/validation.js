const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class CategoryValidation extends Validation {
    /**
     * @param {String} profile.email
     * @param {String} profile.password
     * @param {String} profile.firstname
     * @param {String} profile.lastname
     * @returns
     * @memberof AuthValidation
     */
    category(profile) {
        return this.Joi.object({
            name: this.Joi.string().min(3).max(30).required()
        }).validate(profile, {
            allowUnknown: true
        });
    }
}

module.exports = new CategoryValidation();
