"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  async specialChars(exercicios) {
    exercicios.forEach((el) => {
      //Parse questao
      el.questao = el.questao.replace(
        /%([A-Z]*[0-9]*[A-Z]*)/g,
        function (_, token) {
          return String.fromCharCode(parseInt(token, 16));
        }
      );

      el.idexame = el.idexame.replace(
        /%([A-Z]*[0-9]*[A-Z]*)/g,
        function (_, token) {
          return String.fromCharCode(parseInt(token, 16));
        }
      );

      el.questao = el.questao.replace(/<sub>(.*?)<sub>/g, function (_, token) {
        return `<sup>${token}</sup>`;
      });

      el.questao = el.questao.replace(/mQQ/gm, "<");

      el.questao = el.questao.replace(
        /<raiz>(.*?)<raiz>/g,
        function (_, token) {
          return `<span class="raiz">
        &radic;<span class="raiz-content">${token}</span>
        </span>`;
        }
      );

      //Parse respostas
      if (el.tipo === 1) {
        // Converter resp. aberta para tipo de input do frontend
        for (let i = 1; i < 7; i++) {
          if (el[`resposta${i}`] !== "") {
            // remove whitespace
            el[`resposta${i}`] = el[`resposta${i}`].replace(/\s+/g, "");

            // convert %2B to "+"
            el[`resposta${i}`] = el[`resposta${i}`].replace(
              /%([A-Z]*[0-9]*[A-Z]*)/g,
              function (_, token) {
                return String.fromCharCode(parseInt(token, 16));
              }
            );

            // converter potencias
            el[`resposta${i}`] = el[`resposta${i}`].replace(
              /<sub>(.*?)<sub>/g,
              function (_, token) {
                let potencias = token.split("");

                potencias.forEach((el, index) => {
                  potencias[index] = `<sup>${el}</sup>`;
                });
                potencias = potencias.join("");
                return potencias;
              }
            );
            // converter +inf e -inf
            el[`resposta${i}`] = el[`resposta${i}`].replace(
              /([-|+])xpto/g,
              function (_, token) {
                return `${token}&infin;`;
              }
            );
          }
        }
      } else {
        for (let i = 1; i < 7; i++) {
          if (el[`resposta${i}`] !== "") {
            el[`resposta${i}`] = el[`resposta${i}`].replace(
              /%([A-Z]*[0-9]*[A-Z]*)/g,
              function (_, token) {
                return String.fromCharCode(parseInt(token, 16));
              }
            );

            el[`resposta${i}`] = el[`resposta${i}`].replace(
              /<sub>(.*?)<sub>/g,
              function (_, token) {
                return `<sup>${token}</sup>`;
              }
            );

            el[`resposta${i}`] = el[`resposta${i}`].replace(
              /([-|+])xpto/g,
              function (_, token) {
                return `${token}&infin;`;
              }
            );

            el[`resposta${i}`] = el[`resposta${i}`].replace(
              /<raiz>(.*?)<raiz>/g,
              function (_, token) {
                return `<span class="raiz">
            &radic;<span class="raiz-content">${token}</span>
            </span>`;
              }
            );
          }
        }
      }

      //Parse unidade
      if (el.unidade !== "") {
        el.unidade = el.unidade.replace(
          /%([A-Z]*[0-9]*[A-Z]*)/g,
          function (_, token) {
            return String.fromCharCode(parseInt(token, 16));
          }
        );

        el.unidade = el.unidade.replace(
          /<sub>(.*?)<sub>/g,
          function (_, token) {
            return `<sup>${token}</sup>`;
          }
        );
      }
    });
    return exercicios;
  },
};
