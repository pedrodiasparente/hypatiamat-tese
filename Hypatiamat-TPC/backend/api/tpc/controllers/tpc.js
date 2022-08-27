"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async findProfTpcs(ctx) {
    const { codProf } = ctx.params;
    let entities = await strapi.services.tpc.find({ codProf });

    if (ctx.query.time === "active") {
      entities = entities.filter((tpc) => {
        return new Date(tpc.dataFim) > new Date();
      });
      entities.sort((a, b) => a.dataFim.localeCompare(b.dataFim));
    } else if (ctx.query.time === "expired") {
      entities = entities.filter((tpc) => {
        return new Date(tpc.dataFim) <= new Date();
      });
      entities.sort((a, b) => b.dataFim.localeCompare(a.dataFim));
    }

    let tpcs = [];
    for (const tpc of entities) {
      const totalAlunos = tpc["tpc_alunos"].length;
      let totalResp = 0;

      for (const al of tpc["tpc_alunos"]) {
        const aluno = await strapi.services["tpc-aluno"].findOne({
          codAluno: al.codAluno,
        });

        const temResol = aluno.resolucoes.find((el) => el.idTpc === tpc.id);

        if (temResol) totalResp += 1;
      }

      tpc.totalAlunos = totalAlunos;
      tpc.totalResp = totalResp;
      tpcs.push(tpc);
    }
    return sanitizeEntity(tpcs, { model: strapi.models.tpc });
  },
  async findProfTpcsTurma(ctx) {
    const { codProf } = ctx.params;
    let entities = await strapi.services.tpc.find({ codProf });

    let catTurmas = {};
    for (const tpc of entities) {
      const turmas = [...new Set(tpc["tpc_alunos"].map((obj) => obj.codTurma))];

      for (const tur of turmas) {
        catTurmas[tur] = catTurmas[tur] || [];
        catTurmas[tur].push({ tpcId: tpc.id, tpcName: tpc.tagname });
      }
    }
    return catTurmas;
  },
  async findTpcStats(ctx) {
    const { tpcId } = ctx.params;

    const tpc = await strapi.services.tpc.findOne({ id: tpcId });

    let alunos = [];
    for (let al of tpc["tpc_alunos"]) {
      const aluno = await strapi.services["tpc-aluno"].findOne({
        codAluno: al.codAluno,
      });

      let resols = aluno.resolucoes.filter((resol) => resol.idTpc == tpcId);

      if (resols.length > 0) {
        // Resolucao mais recente
        const resol = resols.reduce((a, b) => (a.data > b.data ? a : b), {});

        //Stats
        const stats = {
          qRespondidas: resol.qRespondidas,
          qCorretas: resol.qCertas,
          classif: resol.classificacao,
        };

        al.stats = stats;
        alunos.push(al);
      }
    }

    return alunos;
  },
  async findAllTpcStats(ctx) {
    let alunos = {};
    if (ctx.query.turma) {
      const codTurma = ctx.query.turma;

      // Turmas prof
      let turmas = await strapi.controllers.tpc.findProfTpcsTurma(ctx);
      let tpcsTurma = turmas[codTurma];

      for (const el of tpcsTurma) {
        const tpc = await strapi.services.tpc.findOne({ id: el.tpcId });

        for (let al of tpc["tpc_alunos"]) {
          const aluno = await strapi.services["tpc-aluno"].findOne({
            codAluno: al.codAluno,
          });

          let resols = aluno.resolucoes.filter(
            (resol) => resol.idTpc == el.tpcId
          );

          if (resols.length > 0) {
            // Resolucao mais recente
            const resol = resols.reduce(
              (a, b) => (a.data > b.data ? a : b),
              {}
            );

            if (al.codAluno in alunos) {
              // Somar stats
              const tpcs = alunos[al.codAluno].stats.tpcs + 1;
              const qRespondidas =
                resol.qRespondidas + alunos[al.codAluno].stats.qRespondidas;
              const qCertas =
                resol.qCertas + alunos[al.codAluno].stats.qCorretas;
              const classificacao = (qCertas / qRespondidas) * 100;

              const stats = {
                qRespondidas: qRespondidas,
                qCorretas: qCertas,
                tpcs: tpcs,
                classif: classificacao,
              };
              al.stats = stats;
            } else {
              //Stats
              const stats = {
                qRespondidas: resol.qRespondidas,
                qCorretas: resol.qCertas,
                tpcs: 1,
                classif: resol.classificacao,
              };

              al.stats = stats;
            }
            alunos[al.codAluno] = al;
          }
        }
      }
    }

    return alunos;
  },
};
