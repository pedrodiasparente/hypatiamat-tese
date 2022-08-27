"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async findOne(ctx) {
    const { cod } = ctx.params;

    const entity = await strapi.services.escola.findOne({ cod });
    return sanitizeEntity(entity, { model: strapi.models.escola });
  },
};
