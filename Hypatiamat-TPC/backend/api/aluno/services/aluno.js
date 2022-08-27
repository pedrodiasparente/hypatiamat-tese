"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

const md5 = require("md5");

module.exports = {
  validatePassword(password, hash) {
    let code = md5(password);
    return code === hash ? true : false;
  },
  fetchAuthenticatedUser(id) {
    return strapi.query("aluno").findOne({ id }, ["role"]);
  },
};
