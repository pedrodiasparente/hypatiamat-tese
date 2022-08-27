"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.exercicio.search(ctx.query);
    } else {
      entities = await strapi.services.exercicio.find(ctx.query);
    }

    // remover questoes de pintar
    entities = entities.filter((el) => el.tipo !== 33);

    entities = await strapi.services.exercicio.specialChars(entities);

    let result = entities.reduce(function (list, ex) {
      list[ex.subtema] = list[ex.subtema] || [];
      list[ex.subtema].push({
        ...ex,
      });
      return list;
    }, Object.create(null));

    return result;
  },
  async findOne(ctx) {
    const { cod } = ctx.params;

    let entity = await strapi.services.exercicio.findOne({ cod });

    entity = await strapi.services.exercicio.specialChars([entity]);

    return sanitizeEntity(entity[0], { model: strapi.models.exercicio });
  },
};
