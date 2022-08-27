"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/services.html#core-services)
 * to customize this service
 */

var mysql = require("mysql");
const db_config = require("../../../config/confs").db_config;
var sql = mysql.createPool(db_config);

module.exports = {
  //----------------- check, create e update tabelas appstablepcs
  checkTableEntry(data) {
    var table = data.table;
    var args = [data.user, data.data, data.frame];
    return new Promise(function (resolve, reject) {
      sql.query(
        `select id, user, turma, codprof, escola, tema, subtema, frame, data, certas, total
                from ${table} 
                where user=? and (data=?) and frame=?;`,
        args,
        function (err, res) {
          if (err) {
            console.log("error: ", err);
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  },
  createTableEntry(data) {
    var table = data.table;
    var args = [
      data.user,
      data.turma,
      data.codprof,
      data.escola,
      data.tema,
      data.subtema,
      data.frame,
      data.data,
      data.certas,
      data.total,
    ];
    return new Promise(function (resolve, reject) {
      sql.query(
        "INSERT INTO " +
          table +
          " ( `user`, `turma`, `codprof`, `escola`, `tema`, `subtema`, `frame`, `data`, `certas`, `total`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        args,
        function (err, res) {
          if (err) {
            console.log("error: ", err);
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  },
  updateTableEntry(oldData, body) {
    var table = body.table;
    let certas = oldData.certas + parseInt(body.certas);
    let total = oldData.total + parseInt(body.total);
    var args = [certas, total, oldData.id];
    return new Promise(function (resolve, reject) {
      sql.query(
        "UPDATE " + table + " SET certas = ?, total = ? where id = ?;",
        args,
        function (err, res) {
          if (err) {
            console.log("error: ", err);
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  },

  //--------------- check, create e update tabela appsinfoall
  checkAppsInfoAll(data) {
    var args = [
      data.tema,
      data.subtema,
      data.data,
      data.user,
      data.codprof,
      data.turma,
    ];
    return new Promise(function (resolve, reject) {
      sql.query(
        `select * from appsinfoall 
                where grupo=? and appid=? and lastdate=? and userid=? and codProf=? and turma=?;`,
        args,
        function (err, res) {
          if (err) {
            console.log("error: ", err);
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  },
  createAppsInfoAll(data) {
    let onpeak, offpeak;
    if (data.tempo >= "08:00:00" && data.tempo <= "16:30:00") {
      onpeak = 1;
      offpeak = 0;
    } else {
      onpeak = 0;
      offpeak = 1;
    }

    var args = [
      data.tema,
      data.subtema,
      data.certas,
      data.total,
      "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
      data.data,
      1,
      data.user,
      data.tempo,
      onpeak,
      offpeak,
      data.codprof,
      data.turma,
    ];
    return new Promise(function (resolve, reject) {
      sql.query(
        "INSERT INTO appsinfoall (`grupo`, `appid`, `ncertas`, `ntotal`, `problemas`, `lastdate`, `frequencia`, `userid`, `horario`, `onpeak`, `offpeak`, `codProf`, `turma`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        args,
        function (err, res) {
          if (err) {
            console.log("error: ", err);
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  },
  updateAppsInfoAll(oldData, body) {
    let onpeak, offpeak;
    if (body.tempo >= "08:00:00" && body.tempo <= "16:30:00") {
      onpeak = oldData.onpeak + 1;
      offpeak = oldData.offpeak;
    } else {
      onpeak = oldData.onpeak;
      offpeak = oldData.offpeak + 1;
    }

    let certas = oldData.ncertas + parseInt(body.certas);
    let total = oldData.ntotal + parseInt(body.total);
    let freq = oldData.frequencia + 1;
    var args = [certas, total, freq, onpeak, offpeak, oldData.id];
    return new Promise(function (resolve, reject) {
      sql.query(
        "UPDATE appsinfoall SET ncertas = ?, ntotal = ?, frequencia = ?, onpeak = ?, offpeak = ? where id = ?;",
        args,
        function (err, res) {
          if (err) {
            console.log("error: ", err);
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  },
  //------------------ check, create e update tabela appsinfo
  checkAppsInfo(data) {
    var args = [data.tema, data.subtema, data.user, data.codprof, data.turma];
    return new Promise(function (resolve, reject) {
      sql.query(
        `select * from appsinfo 
                where grupo=? and appid=? and userid=? and codProf=? and turma=?;`,
        args,
        function (err, res) {
          if (err) {
            console.log("error: ", err);
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  },
  createAppsInfo(data) {
    let onpeak, offpeak;
    if (data.tempo >= "08:00:00" && data.tempo <= "16:30:00") {
      onpeak = 1;
      offpeak = 0;
    } else {
      onpeak = 0;
      offpeak = 1;
    }

    var args = [
      data.tema,
      data.subtema,
      data.certas,
      data.total,
      "0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0",
      data.data,
      1,
      data.user,
      data.tempo,
      onpeak,
      offpeak,
      data.codprof,
      data.turma,
    ];
    return new Promise(function (resolve, reject) {
      sql.query(
        "INSERT INTO appsinfo (`grupo`, `appid`, `ncertas`, `ntotal`, `problemas`, `lastdate`, `frequencia`, `userid`, `horario`, `onpeak`, `offpeak`, `codProf`, `turma`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        args,
        function (err, res) {
          if (err) {
            console.log("error: ", err);
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  },
  updateAppsInfo(oldData, body) {
    let onpeak, offpeak;
    if (body.tempo >= "08:00:00" && body.tempo <= "16:30:00") {
      onpeak = oldData.onpeak + 1;
      offpeak = oldData.offpeak;
    } else {
      onpeak = oldData.onpeak;
      offpeak = oldData.offpeak + 1;
    }

    let certas = oldData.ncertas + parseInt(body.certas);
    let total = oldData.ntotal + parseInt(body.total);
    let freq = oldData.frequencia + 1;
    var args = [
      certas,
      total,
      body.data,
      freq,
      body.tempo,
      onpeak,
      offpeak,
      oldData.id,
    ];
    return new Promise(function (resolve, reject) {
      sql.query(
        "UPDATE appsinfo SET ncertas = ?, ntotal = ?, lastdate = ?, frequencia = ?, horario = ?, onpeak = ?, offpeak = ? where id = ?;",
        args,
        function (err, res) {
          if (err) {
            console.log("error: ", err);
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  },
};
