const Cromos = module.exports
const sql = require('../../models/db_testeconhecimentos');
const anoletivo = require('../../config/confs').anoletivo

Cromos.insertComFreq = function(cromo){
    var args = [cromo.user, cromo.idcromo, cromo.oldfrequencia, cromo.frequencia, 
                cromo.lastdate, cromo.virado, cromo.anoletivo]
    return new Promise(function(resolve, reject) {
        sql.query("INSERT INTO cromos_alunos (`user`, `idcromo`, `oldfrequencia`, `frequencia`, `lastdate`, `virado`, `anoletivo`) VALUES (?, ?, ?, ?, ?, ?, ?)", 
                    args, function (err, res) {  
                if(err) {
                    console.log("error: ", err);
                    reject(err);
                }
                else{
                    resolve(res);
                }
            });   
    })
}

Cromos.insertSemFreq = function(cromo){
    var args = [cromo.user, cromo.idcromo, cromo.virado, cromo.anoletivo]
    return new Promise(function(resolve, reject) {
        sql.query("INSERT INTO cromos_alunos (`user`, `idcromo`, `lastdate`, `virado`, `anoletivo`) VALUES (?, ?, now(), ?, ?)", 
                    args, function (err, res) {  
                if(err) {
                    console.log("error: ", err);
                    reject(err);
                }
                else{
                    resolve(res);
                }
            });   
    })
}

Cromos.getCromosAppsCompletadosFromAluno = function(user){
    return new Promise(function(resolve, reject) {
        sql.query(`SELECT cal.* 
                    FROM (select * from cromosdb where not(isnull(apps)) ) cdb, (select * from cromos_alunos where user=? and anoletivo=?) cal 
                    where cdb.id = cal.idcromo;`, [user, anoletivo], function(err, res){
            if(err){
                console.log("erro: " + err)
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
}

Cromos.getCromosJogosCompletadosFromAluno = function(user){
    return new Promise(function(resolve, reject) {
        sql.query(`SELECT cal.* 
                    FROM (select * from cromosdb where not(isnull(jogos)) ) cdb, (select * from cromos_alunos where user=? and anoletivo=?) cal 
                    where cdb.id = cal.idcromo;`, [user, anoletivo], function(err, res){
            if(err){
                console.log("erro: " + err)
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
}

Cromos.getCromosCampeonatosCompletadosFromAluno = function(user){
    return new Promise(function(resolve, reject) {
        sql.query(`SELECT cal.* 
                    FROM (select * from cromosdb where not(isnull(campeonatos))) cdb, (select * from cromos_alunos where user=? and anoletivo=?) cal 
                    where cdb.id = cal.idcromo;`, [user, anoletivo], function(err, res){
            if(err){
                console.log("erro: " + err)
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
}

Cromos.getCromosFromUser= function(user){
    return new Promise(function(resolve, reject) {
        sql.query(`SELECT * 
                    FROM cromos_alunos
                    where user = ? and anoletivo=?;`, [user, anoletivo], function(err, res){
            if(err){
                console.log("erro: " + err)
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
}

Cromos.getCromosFromUser2= function(user, anoletivoSel){
    return new Promise(function(resolve, reject) {
        sql.query(`SELECT * 
                    FROM cromos_alunos
                    where user = ? and anoletivo=?;`, [user, anoletivoSel], function(err, res){
            if(err){
                console.log("erro: " + err)
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
}

Cromos.updateCromoAberto = function(id){
    return new Promise(function(resolve, reject) {
        sql.query(`Update cromos_alunos SET virado = true, oldfrequencia = frequencia where id=?;`, [id], function(err, res){
            if(err){
                console.log("erro: " + err)
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
}

Cromos.updateCromoFreq = function(id, frequencia){
    return new Promise(function(resolve, reject) {
        sql.query(`Update cromos_alunos SET frequencia=? where id=?;`, [frequencia, id], function(err, res){
            if(err){
                console.log("erro: " + err)
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
}

Cromos.getUserFromoCromoId = function(id){
    return new Promise(function(resolve, reject) {
        sql.query(`Select user from cromos_alunos where id=?;`, [id], function(err, res){
            if(err){
                console.log("erro: " + err)
                reject(err)
            }
            else{
                if(res.length > 0) resolve(res[0])
                else resolve(undefined)
            }
        })
    })
}

Cromos.isCromoCompletado = function(id){
    return new Promise(function(resolve, reject) {
        sql.query(`Select count(*) as users from cromos_alunos where idcromo=?;`, [id], function(err, res){
            if(err){
                console.log("erro: " + err)
                reject(err)
            }
            else{
                resolve(res[0].users > 0)
            }
        })
    })
}