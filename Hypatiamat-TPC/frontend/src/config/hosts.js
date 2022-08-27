// module.exports.hostAPI = "https://apitpc.hypatiamat.com/";
// module.exports.hostOffice = "https://backoffice.hypatiamat.com";
//module.exports.hostAPI = "http://localhost:3052/";
module.exports.hostAPI = "http://localhost:8000/tpc-api/"
module.exports.hostOffice = "http://localhost:8081";
module.exports.storageHosts = [
  // em desenvolvimento local, retirar de comentário
  // {
  //   origin: /localhost:8081$/,
  //   allow: ["get", "set", "del", "getKeys", "clear"],
  // },
  { origin: /hypatiamat.com$/, allow: ["get", "set", "del", "clear"] },
];
