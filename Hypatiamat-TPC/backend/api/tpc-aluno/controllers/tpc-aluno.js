"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  async create(ctx) {
    const codAluno = ctx.request.body.codAluno;
    const existentEntity = await strapi.services["tpc-aluno"].findOne({
      codAluno,
    });

    let entity;
    // caso o aluno exista (update)
    if (existentEntity !== null) {
      entity = await strapi.services["tpc-aluno"].update(
        { codAluno },
        ctx.request.body
      );
      return sanitizeEntity(entity, { model: strapi.models["tpc-aluno"] });
    }

    // caso nao exista o aluno (create)
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services["tpc-aluno"].create(data, {
        files,
      });
    } else {
      entity = await strapi.services["tpc-aluno"].create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models["tpc-aluno"] });
  },
  async findOne(ctx) {
    const { codAluno } = ctx.params;

    const entity = await strapi.services["tpc-aluno"].findOne({ codAluno });

    if (!entity) return ctx.send("Not Found");

    return sanitizeEntity(entity, { model: strapi.models["tpc-aluno"] });
  },
  async findAlunoTpcs(ctx) {
    const { codAluno } = ctx.params;

    const entity = await strapi.services["tpc-aluno"].findOne({ codAluno });

    if (!entity) return ctx.send("Not Found");

    let tpcs = entity.tpcs;
    let resolucoes = entity.resolucoes;
    if (ctx.query.time === "active") {
      tpcs = tpcs.filter((tpc) => {
        return new Date(tpc.dataFim) > new Date();
      });

      for (const tpc of tpcs) {
        const nResol = resolucoes.filter((res) => {
          return res.idTpc === tpc.id;
        }).length;

        tpc.nResol = nResol;
      }
    } else if (ctx.query.time === "expired") {
      tpcs = tpcs.filter((tpc) => {
        return new Date(tpc.dataFim) <= new Date();
      });
    }
    tpcs.sort((a, b) => b.dataFim.localeCompare(a.dataFim));
    return tpcs;
  },
  async findAlunoTpcStats(ctx) {
    const { codAluno, tpcId } = ctx.params;
    let stats = {};

    const entity = await strapi.services["tpc-aluno"].findOne({ codAluno });

    if (!entity) return ctx.send("Not Found");

    const tpc = entity.tpcs.filter((r) => r.id == tpcId)[0];

    // Ultima tentativa de resolucao
    const resolucao = entity.resolucoes
      .filter((r) => r.idTpc == tpcId)
      .reduce((a, b) => (a.data > b.data ? a : b), {});

    if (Object.keys(resolucao).length > 0) {
      stats = {
        tpcId: tpc.id,
        qRespondidas: resolucao.qRespondidas,
        qCorretas: resolucao.qCertas,
        tentativa: resolucao.tentativa,
        classif: resolucao.classificacao,
      };
    }
    tpc.stats = stats;

    return tpc;
  },

  async findAlunoAllStats(ctx) {
    const { codAluno } = ctx.params;
    let stats = {};

    const entity = await strapi.services["tpc-aluno"].findOne({ codAluno });

    if (!entity) return {};

    let tpcs = entity.tpcs;

    // apenas expirados
    tpcs = tpcs.filter((tpc) => {
      return new Date(tpc.dataFim) <= new Date();
    });

    for (const tpc of tpcs) {
      let resols = entity.resolucoes.filter((resol) => resol.idTpc == tpc.id);

      if (resols.length > 0) {
        // Resolucao mais recente
        const resol = resols.reduce((a, b) => (a.data > b.data ? a : b), {});

        if (Object.keys(stats).length > 0) {
          // Somar stats
          const tpcs = stats.tpcs + 1;
          const qRespondidas = resol.qRespondidas + stats.qRespondidas;
          const qCertas = resol.qCertas + stats.qCorretas;
          const classificacao = (qCertas / qRespondidas) * 100;

          stats = {
            qRespondidas: qRespondidas,
            qCorretas: qCertas,
            tpcs: tpcs,
            classif: classificacao,
          };
        } else {
          //Stats
          stats = {
            qRespondidas: resol.qRespondidas,
            qCorretas: resol.qCertas,
            tpcs: 1,
            classif: resol.classificacao,
          };
        }
      }
    }

    entity.stats = stats;
    delete entity["resolucoes"];
    delete entity["tpcs"];
    return entity;
  },

  async update(ctx) {
    const { codAluno } = ctx.params;

    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services["tpc-aluno"].update({ codAluno }, data, {
        files,
      });
    } else {
      entity = await strapi.services["tpc-aluno"].update(
        { codAluno },
        ctx.request.body
      );
    }

    return sanitizeEntity(entity, { model: strapi.models["tpc-aluno"] });
  },
};
