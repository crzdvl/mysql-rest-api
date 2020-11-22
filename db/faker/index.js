const service = require('./service');
const _ = require('lodash');

(async function () {
    try {
        await service.createTables();

        let peoples = await service.generatePeoples();
        const floatPeoples = _.chunk(peoples, 500);

        for (const chunk of floatPeoples) {
            await service.addPeoplesInDB(chunk);
        }

        let products = await service.generateProducts();
        const floatProducts = _.chunk(products, 500);

        for (const chunk of floatProducts) {
            await service.addProductsInDB(chunk);
        }

        let categories = await service.generateCategories();
        const floatCategories = _.chunk(categories, 500);

        for (const chunk of floatCategories) {
            await service.addCategoriesInDB(chunk);
        }

        let tags = await service.generateTags();
        const floatTags = _.chunk(tags, 500);

        for (const chunk of floatTags) {
            await service.addTagsInDB(chunk);
        }

        let integrationProductsTags = await service.generateIntegrationsProductsTags();
        const floatIntegrationProductsTags = _.chunk(integrationProductsTags, 500);

        for (const chunk of floatIntegrationProductsTags) {
            await service.addIntegrationsProductsTagsInDB(chunk);
        }

        process.exit(1);
    } catch (error) {
        console.error(error);
    }
}());
