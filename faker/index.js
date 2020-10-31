const service = require('./service');
const _ = require('lodash');

(async function () {
    try {
        let peoples = await service.generatePeoples();
        const floatPeoples = _.chunk(peoples, 500);

        for (const e of floatPeoples) {
            await service.addPeoplesInDB(e);
        }

        let products = await service.generateProducts();
        const floatProducts = _.chunk(products, 500);

        for (const e of floatProducts) {
            await service.addProductsInDB(e);
        }

        let categories = await service.generateCategories();
        const floatCategories = _.chunk(categories, 500);

        for (const e of floatCategories) {
            await service.addCategoriesInDB(e);
        }

        let tags = await service.generateTags();
        const floatTags = _.chunk(tags, 500);

        for (const e of floatTags) {
            await service.addTagsInDB(e);
        }

        let integrationProductsTags = await service.generateIntegrationsProductsTags();
        const floatIntegrationProductsTags = _.chunk(integrationProductsTags, 500);

        for (const e of floatIntegrationProductsTags) {
            await service.addIntegrationsProductsTagsInDB(e);
        }

        process.exit(1);
    } catch (error) {
        console.error(error);
    }
}());
