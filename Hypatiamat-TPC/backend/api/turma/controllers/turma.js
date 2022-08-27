"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const anoletivo = require("../../../config/confs").anoletivo;

module.exports = {
  async findProfTurmas(ctx) {
    const { idprofessor } = ctx.params;

    let entities;
    if (ctx.query.ano === "last") {
      entities = await strapi.services.turma.find({
        idprofessor,
        anoletivo,
      });
    } else {
      entities = await strapi.services.turma.find({
        idprofessor,
      });
    }

    const turmas = {};

    for (const el of entities) {
      let alunos = await strapi.services.aluno.find({
        turma: el.turma,
        codprofessor: idprofessor,
      });
      if (alunos.length > 0) {
        alunos.sort((a, b) => a.nome.localeCompare(b.nome));
        turmas[el.turma] = alunos;
      }
    }

    return turmas;
  },
  async findProfTurmasAno(ctx) {
    const { idprofessor } = ctx.params;

    const entities = await strapi.services.turma.find({
      idprofessor,
    });

    let result = entities.reduce(function (list, el) {
      list[el.anoletivo] = list[el.anoletivo] || [];
      list[el.anoletivo].push(el.turma);
      return list;
    }, Object.create(null));

    return result;
  },
};
