"use strict";

/**
 * Auth.js controller
 *
 * @description: A set of functions called "actions" for managing `Auth`.
 */

/* eslint-disable no-useless-escape */
const crypto = require("crypto");
const _ = require("lodash");
const grant = require("grant-koa");
const { sanitizeEntity } = require("strapi-utils");

const emailRegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const formatError = (error) => [
  { messages: [{ id: error.id, message: error.message, field: error.field }] },
];

module.exports = {
  async callback(ctx) {
    const provider = ctx.params.provider || "local";
    const params = ctx.request.body;

    const store = await strapi.store({
      environment: "",
      type: "plugin",
      name: "users-permissions",
    });

    if (provider === "local") {
      if (!_.get(await store.get({ key: "grant" }), "email.enabled")) {
        return ctx.badRequest(null, "This provider is disabled.");
      }

      // The identifier is required.
      if (!params.identifier) {
        return ctx.badRequest(
          null,
          formatError({
            id: "Auth.form.error.email.provide",
            message: "Please provide your username or your e-mail.",
          })
        );
      }

      // The password is required.
      if (!params.password) {
        return ctx.badRequest(
          null,
          formatError({
            id: "Auth.form.error.password.provide",
            message: "Please provide your password.",
          })
        );
      }

      // -----------------------------------------
      let query = {};

      // Check if the provided identifier is an email or not.
      const isEmail = emailRegExp.test(params.identifier);

      // Set the identifier to the appropriate query field.
      if (isEmail) {
        query.email = params.identifier.toLowerCase();
      } else {
        query.user = params.identifier;
      }

      // Check if the user exists. (aluno)
      let user = await strapi.query("aluno").findOne(query);
      if (user) {
        user.type = "aluno";
      }
      // Check if the user exists. (prof)
      else {
        query = {};
        query.codigo = params.identifier;
        user = await strapi.query("professor").findOne(query);
        if (user) {
          user.type = "professor";
        }
      }

      if (!user) {
        return ctx.send({
          message: "credenciais",
        });
      }

      let validPassword;
      if (user.type === "aluno") {
        validPassword = await strapi.services.aluno.validatePassword(
          params.password,
          user.password
        );
      } else {
        validPassword = await strapi.services.professor.validatePassword(
          params.password,
          user.password
        );
      }

      if (!validPassword) {
        return ctx.send({
          message: "credenciais",
        });
      } else {
        const userModel =
          user.type === "aluno"
            ? strapi.query("aluno").model
            : strapi.query("professor").model;

        // Verificacoes confirmacao, validade, premium

        // aluno
        if (user.type === "aluno") {
          const prof = await strapi
            .query("professor")
            .findOne({ codigo: user.codprofessor });

          const validade = new Date(prof.validade) <= new Date() ? 0 : 1;

          if (validade === 0)
            return ctx.send({
              message: "invalido",
            });

          // professor
        } else {
          const validade = new Date(user.validade) <= new Date() ? 0 : 1;

          if (user.confirmacao !== 1 || validade === 0 || user.premium === 0)
            return ctx.send({
              message: "invalido",
            });
        }

        // agrupamento do user
        const agrupamento = await strapi
          .query("escola")
          .findOne({ cod: user.escola });

        // payload token
        let payload = {};

        if (user.type === "aluno") {
          payload = {
            agrupamento: agrupamento.nome,
            id: user.id,
            user: user.user,
            email: user.email,
            escola: user.escola,
            type: 10,
            tpcType: "aluno",
          };
        } else if (user.type === "professor") {
          // professor
          payload = {
            id: user.id,
            codigo: user.codigo,
            email: user.email,
            escola: user.escola,
            type: 20,
            tpcType: "professor",
            agrupamento: agrupamento.nome,
          };

          // municipio
          if (user.premium === 2) {
            const escolas = await strapi
              .query("escola")
              .find({ localidade: agrupamento.localidade });

            payload.type = 30;
            payload.infoEscola = agrupamento;
            payload.escolas = escolas;
          }

          // agrupamento
          if (user.premium === 3) {
            payload.type = 40;
          }

          // admin
          if (user.premium === 5) {
            payload.type = 50;
          }
        }

        ctx.send({
          token: {
            jwt: strapi.plugins["users-permissions"].services.jwt.issue({
              user: payload,
            }),
            expiresIn: 5400,
          },
          user: sanitizeEntity(user.toJSON ? user.toJSON() : user, {
            model: userModel,
          }),
        });
      }
    }
  },
};
