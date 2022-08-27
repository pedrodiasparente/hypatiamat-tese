"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async find(ctx) {
    let entities;

    if (ctx.query._q) {
      entities = await strapi.services.appstabletpc.search(ctx.query);
    } else {
      entities = await strapi.services.appstabletpc.find(ctx.query);
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.appstabletpc })
    );
  },

  // Create/update nas tabelas do appstabletpc, appsinfo e appsinfoall
  async create(ctx) {
    let info = {},
      info2 = {},
      info3 = {};
    //--------------------- APPSTABLETPC --------------------------
    let check = await strapi.services.appstabletpc.checkTableEntry(
      ctx.request.body
    );

    // verificar se ja existe entrada na tabela
    if (check.length === 0)
      // post
      info = await strapi.services.appstabletpc.createTableEntry(
        ctx.request.body
      );
    else {
      // update
      info = await strapi.services.appstabletpc.updateTableEntry(
        check[0],
        ctx.request.body
      );
    }

    //--------------------- APPSINFO/APPSINFOALL -------------------
    let check2 = await strapi.services.appstabletpc.checkAppsInfoAll(
      ctx.request.body
    );

    let check3 = await strapi.services.appstabletpc.checkAppsInfo(
      ctx.request.body
    );

    // verificar se ja existe entrada na appsinfoall
    if (check2.length === 0) {
      // post
      info2 = await strapi.services.appstabletpc.createAppsInfoAll(
        ctx.request.body
      );
    } else {
      // update
      info2 = await strapi.services.appstabletpc.updateAppsInfoAll(
        check2[0],
        ctx.request.body
      );
    }

    // verificar se ja existe entrada na appsinfo
    if (check3.length === 0) {
      // post
      info3 = await strapi.services.appstabletpc.createAppsInfo(
        ctx.request.body
      );
    } else {
      // update
      info3 = await strapi.services.appstabletpc.updateAppsInfo(
        check3[0],
        ctx.request.body
      );
    }
    return [info, info2, info3];
  },
};
