"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  async create(ctx) {
    const existentEntity = await strapi.services["tpc-questao"].findOne({
      codQuestao: ctx.request.body.codQuestao,
    });

    if (existentEntity !== null)
      return sanitizeEntity(existentEntity, {
        model: strapi.models["tpc-questao"],
      });

    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services["tpc-questao"].create(data, {
        files,
      });
    } else {
      entity = await strapi.services["tpc-questao"].create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models["tpc-questao"] });
  },
};
