const Calculus = module.exports
const { bdSAMD, bdAplicacoes } = require('../../models/conf');
var sql = require('../../models/db_samd');
var dataInicioAno = require('../../config/confs').dataInicio1
var dataFimAno = require('../../config/confs').dataFim1

// por cada municipio e todos os tipos e niveis do jogo minutenew
Calculus.getTodosMinuteNewMunicipios = async function(dataInicio, dataFim){
    var args = [dataInicio, dataFim]
    return new Promise(function(resolve, reject) {
        sql.query(`select esc.localidade, sum(jogo.numcertas) as numcertas, sum(jogo.numerradas) as numerradas, sum(jogo.pontos) as pontos, count(jogo.pontos) as frequencia
		from (select * from ${bdSAMD}.minutenew where (data between ? and ?)) jogo, ${bdAplicacoes}.Escolas esc
        where esc.cod = jogo.escola Group By esc.localidade;`, args, function (err, res) {            
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

Calculus.getTiposNiveisMinuteNewMunicipios = async function(dataInicio, dataFim, niveis, tipos){
    var args = [dataInicio, dataFim, niveis, tipos]
    return new Promise(function(resolve, reject) {
        sql.query(`select esc.localidade, sum(jogo.numcertas) as numcertas, sum(jogo.numerradas) as numerradas, sum(jogo.pontos) as pontos, count(jogo.pontos) as frequencia
		from (select * from ${bdSAMD}.minutenew where (data between ? and ?) and nivel in (?) and op = ?) jogo, ${bdAplicacoes}.Escolas esc
        where esc.cod = jogo.escola Group By esc.localidade;`, args, function (err, res) {            
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

Calculus.getTiposMinuteNewMunicipios = async function(dataInicio, dataFim, tipos){
    var args = [dataInicio, dataFim, tipos]
    return new Promise(function(resolve, reject) {
        sql.query(`select esc.localidade, sum(jogo.numcertas) as numcertas, sum(jogo.numerradas) as numerradas, sum(jogo.pontos) as pontos, count(jogo.pontos) as frequencia
		from (select * from ${bdSAMD}.minutenew where (data between ? and ?) and op = ?) jogo, ${bdAplicacoes}.Escolas esc
        where esc.cod = jogo.escola Group By esc.localidade;`, args, function (err, res) {            
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

Calculus.getNiveisMinuteNewMunicipios = async function(dataInicio, dataFim, niveis){
    var args = [dataInicio, dataFim, niveis]
    return new Promise(function(resolve, reject) {
        sql.query(`select esc.localidade, sum(jogo.numcertas) as numcertas, sum(jogo.numerradas) as numerradas, sum(jogo.pontos) as pontos, count(jogo.pontos) as frequencia
		from (select * from ${bdSAMD}.minutenew where (data between ? and ?) and nivel in (?)) jogo, ${bdAplicacoes}.Escolas esc
        where esc.cod = jogo.escola Group By esc.localidade;`, args, function (err, res) {            
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

// por cada municipio de uma comunidade e todos os tipos e niveis do jogo minutenew
Calculus.getTodosMinuteNewComunidade = async function(dataInicio, dataFim, comunidade){
    var args = [dataInicio, dataFim, comunidade]
    return new Promise(function(resolve, reject) {
        sql.query(`select esc.localidade, sum(jogo.numcertas) as numcertas, sum(jogo.numerradas) as numerradas, sum(jogo.pontos) as pontos, count(jogo.pontos) as frequencia
		from (select * from ${bdSAMD}.minutenew where (data between ? and ?)) jogo, 
        (select * from ${bdAplicacoes}.Escolas where localidade in (select municipio from ${bdAplicacoes}.comunidades where codigo=?)) as esc
        where esc.cod = jogo.escola Group By esc.localidade;`, args, function (err, res) {            
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

Calculus.getTiposNiveisMinuteNewComunidade = async function(dataInicio, dataFim, niveis, tipos, comunidade){
    var args = [dataInicio, dataFim, niveis, tipos, comunidade]
    return new Promise(function(resolve, reject) {
        sql.query(`select esc.localidade, sum(jogo.numcertas) as numcertas, sum(jogo.numerradas) as numerradas, sum(jogo.pontos) as pontos, count(jogo.pontos) as frequencia
		from (select * from ${bdSAMD}.minutenew where (data between ? and ?) and nivel in (?) and op = ?) jogo, 
        (select * from ${bdAplicacoes}.Escolas where localidade in (select municipio from ${bdAplicacoes}.comunidades where codigo=?)) as esc
        where esc.cod = jogo.escola Group By esc.localidade;`, args, function (err, res) {            
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

Calculus.getTiposMinuteNewComunidade = async function(dataInicio, dataFim, tipos, comunidade){
    var args = [dataInicio, dataFim, tipos, comunidade]
    return new Promise(function(resolve, reject) {
        sql.query(`select esc.localidade, sum(jogo.numcertas) as numcertas, sum(jogo.numerradas) as numerradas, sum(jogo.pontos) as pontos, count(jogo.pontos) as frequencia
		from (select * from ${bdSAMD}.minutenew where (data between ? and ?) and op = ?) jogo, 
        (select * from ${bdAplicacoes}.Escolas where localidade in (select municipio from ${bdAplicacoes}.comunidades where codigo=?)) as esc
        where esc.cod = jogo.escola Group By esc.localidade;`, args, function (err, res) {            
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

Calculus.getNiveisMinuteNewComunidade = async function(dataInicio, dataFim, niveis, comunidade){
    var args = [dataInicio, dataFim, niveis, comunidade]
    return new Promise(function(resolve, reject) {
        sql.query(`select esc.localidade, sum(jogo.numcertas) as numcertas, sum(jogo.numerradas) as numerradas, sum(jogo.pontos) as pontos, count(jogo.pontos) as frequencia
		from (select * from ${bdSAMD}.minutenew where (data between ? and ?) and nivel in (?)) jogo, 
        (select * from ${bdAplicacoes}.Escolas where localidade in (select municipio from ${bdAplicacoes}.comunidades where codigo=?)) as esc
        where esc.cod = jogo.escola Group By esc.localidade;`, args, function (err, res) {            
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


// por cada agrupamento de um municipio e todos os tipos e niveis do jogo minutenew
Calculus.getTodosMinuteNewAgrupamentos = async function(municipio,dataInicio, dataFim){
    var args = [dataInicio, dataFim, municipio]
    return new Promise(function(resolve, reject) {
        sql.query(`select esc.cod, esc.nome, sum(jogo.numcertas) as numcertas, sum(jogo.numerradas) as numerradas, sum(jogo.pontos) as pontos, count(jogo.pontos) as frequencia
		from (select * from ${bdSAMD}.minutenew where (data between ? and ?)) jogo, (select * from ${bdAplicacoes}.Escolas where localidade = ?) esc
        where esc.cod = jogo.escola Group By esc.cod;`, args, function (err, res) {            
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

Calculus.getTiposNiveisMinuteNewAgrupamentos = async function(municipio, dataInicio, dataFim, niveis, tipos){
    var args = [dataInicio, dataFim, niveis, tipos, municipio]
    return new Promise(function(resolve, reject) {
        sql.query(`select esc.cod, esc.nome, sum(jogo.numcertas) as numcertas, sum(jogo.numerradas) as numerradas, sum(jogo.pontos) as pontos, count(jogo.pontos) as frequencia
		from (select * from ${bdSAMD}.minutenew where (data between ? and ?) and nivel in (?) and op = ?) jogo, (select * from ${bdAplicacoes}.Escolas where localidade = ?) esc
        where esc.cod = jogo.escola Group By esc.cod;`, args, function (err, res) {            
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

Calculus.getTiposMinuteNewAgrupamentos = async function(municipio, dataInicio, dataFim, tipos){
    var args = [dataInicio, dataFim, tipos, municipio]
    return new Promise(function(resolve, reject) {
        sql.query(`select esc.cod, esc.nome, sum(jogo.numcertas) as numcertas, sum(jogo.numerradas) as numerradas, sum(jogo.pontos) as pontos, count(jogo.pontos) as frequencia
		from (select * from ${bdSAMD}.minutenew where (data between ? and ?) and op = ?) jogo, (select * from ${bdAplicacoes}.Escolas where localidade = ?) esc
        where esc.cod = jogo.escola Group By esc.cod;`, args, function (err, res) {            
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

Calculus.getNiveisMinuteNewAgrupamentos = async function(municipio, dataInicio, dataFim, niveis){
    var args = [dataInicio, dataFim, niveis, municipio]
    return new Promise(function(resolve, reject) {
        sql.query(`select esc.cod, esc.nome, sum(jogo.numcertas) as numcertas, sum(jogo.numerradas) as numerradas, sum(jogo.pontos) as pontos, count(jogo.pontos) as frequencia
		from (select * from ${bdSAMD}.minutenew where (data between ? and ?) and nivel in (?)) jogo, (select * from ${bdAplicacoes}.Escolas where localidade = ?) esc
        where esc.cod = jogo.escola Group By esc.cod;`, args, function (err, res) {            
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

// por cada professor de um agrupamento e todos os tipos e niveis do jogo minutenew
Calculus.getTodosMinuteNewProfessores = async function(escola, dataInicio, dataFim){
    var args = [dataInicio, dataFim, escola, escola, escola]
    return new Promise(function(resolve, reject) {
        sql.query(`select prof.codigo, prof.nome, sum(jogo.numcertas) as numcertas, sum(jogo.numerradas) as numerradas, sum(jogo.pontos) as pontos, count(jogo.pontos) as frequencia
		from (select * from ${bdSAMD}.minutenew where (data between ? and ?) and escola = ?) jogo, 
        (select * from ${bdAplicacoes}.alunos where escola=?) as al, (select * from ${bdAplicacoes}.professores where escola=?) prof
        where prof.escola=jogo.escola and prof.codigo = al.codprofessor and jogo.user = al.user  Group By prof.codigo;`, args, function (err, res) {            
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

Calculus.getTiposNiveisMinuteNewProfessores = async function(escola, dataInicio, dataFim, niveis, tipos){
    var args = [dataInicio, dataFim, niveis, tipos, escola, escola, escola]
    return new Promise(function(resolve, reject) {
        sql.query(`select prof.codigo, prof.nome, sum(jogo.numcertas) as numcertas, sum(jogo.numerradas) as numerradas, sum(jogo.pontos) as pontos, count(jogo.pontos) as frequencia
		from (select * from ${bdSAMD}.minutenew where (data between ? and ?) and nivel in (?) and op = ? and escola=?) jogo,
        (select * from ${bdAplicacoes}.alunos where escola=?) as al, (select * from ${bdAplicacoes}.professores where escola=?) prof
        where prof.escola=jogo.escola and prof.codigo = al.codprofessor and jogo.user = al.user  Group By prof.codigo;`, args, function (err, res) {            
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

Calculus.getTiposMinuteNewProfessores = async function(escola, dataInicio, dataFim, tipos){
    var args = [dataInicio, dataFim, tipos, escola, escola, escola]
    return new Promise(function(resolve, reject) {
        sql.query(`select prof.codigo, prof.nome, sum(jogo.numcertas) as numcertas, sum(jogo.numerradas) as numerradas, sum(jogo.pontos) as pontos, count(jogo.pontos) as frequencia
		from (select * from ${bdSAMD}.minutenew where (data between ? and ?) and op = ? and escola =?) jogo, 
        (select * from ${bdAplicacoes}.alunos where escola=?) as al, (select * from ${bdAplicacoes}.professores where escola=?) prof
        where prof.escola=jogo.escola and prof.codigo = al.codprofessor and jogo.user = al.user  Group By prof.codigo;`, args, function (err, res) {            
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

Calculus.getNiveisMinuteNewProfessores = async function(escola, dataInicio, dataFim, niveis){
    var args = [dataInicio, dataFim, niveis, escola, escola, escola]
    return new Promise(function(resolve, reject) {
        sql.query(`select prof.codigo, prof.nome, sum(jogo.numcertas) as numcertas, sum(jogo.numerradas) as numerradas, sum(jogo.pontos) as pontos, count(jogo.pontos) as frequencia
		from (select * from ${bdSAMD}.minutenew where (data between ? and ?) and nivel in (?) and escola = ?) jogo,
        (select * from ${bdAplicacoes}.alunos where escola=?) as al, (select * from ${bdAplicacoes}.professores where escola=?) prof
        where prof.escola=jogo.escola and prof.codigo = al.codprofessor and jogo.user = al.user  Group By prof.codigo;`, args, function (err, res) {            
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

// por cada aluno de uma turma e todos os tipos e niveis do jogo minutenew
Calculus.getTodosMinuteNewTurma = async function(turma, escola, dataInicio, dataFim, horaInicio, horaFim){
    var horarioInicio = dataInicio.concat(' ', horaInicio)
    var horarioFim = dataFim.concat(' ', horaFim + ':59')
    var args = [escola, turma, horarioInicio, horarioFim, escola]
    return new Promise(function(resolve, reject) {
        sql.query(`select jogo.user, al.numero, al.nome, sum(jogo.numcertas) as numcertas, sum(jogo.numerradas) as numerradas, sum(jogo.pontos) as pontos, count(jogo.pontos) as frequencia
		from (select * from ${bdSAMD}.minutenew where escola = ? and turma=? and (CONCAT(data, ' ', horario) between ? and ?) ) jogo, 
        (select * from ${bdAplicacoes}.alunos where escola=?) as al
        where jogo.user = al.user Group By jogo.user Order by al.numero;`, args, function (err, res) {            
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

Calculus.getTiposNiveisMinuteNewTurma = async function(turma, escola, dataInicio, dataFim, niveis, tipo, horaInicio, horaFim){
    var horarioInicio = dataInicio.concat(' ', horaInicio)
    var horarioFim = dataFim.concat(' ', horaFim + ':59')
    var args = [escola, turma, niveis, tipo, horarioInicio, horarioFim, escola]
    return new Promise(function(resolve, reject) {
        sql.query(`select jogo.user, al.numero, al.nome, sum(jogo.numcertas) as numcertas, sum(jogo.numerradas) as numerradas, sum(jogo.pontos) as pontos, count(jogo.pontos) as frequencia
		from (select * from ${bdSAMD}.minutenew where escola = ? and turma=? and nivel in (?) and op=? and (CONCAT(data, ' ', horario) between ? and ?) ) jogo, 
        (select * from ${bdAplicacoes}.alunos where escola=?) as al
        where jogo.user = al.user Group By jogo.user Order by al.numero;`, args, function (err, res) {            
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

Calculus.getNiveisMinuteNewTurma = async function(turma, escola, dataInicio, dataFim, niveis, horaInicio, horaFim){
    var horarioInicio = dataInicio.concat(' ', horaInicio)
    var horarioFim = dataFim.concat(' ', horaFim + ':59')
    var args = [escola, turma, niveis, horarioInicio, horarioFim, escola]
    return new Promise(function(resolve, reject) {
        sql.query(`select jogo.user, al.numero, al.nome, sum(jogo.numcertas) as numcertas, sum(jogo.numerradas) as numerradas, sum(jogo.pontos) as pontos, count(jogo.pontos) as frequencia
		from (select * from ${bdSAMD}.minutenew where escola = ? and turma=? and nivel in (?) and (CONCAT(data, ' ', horario) between ? and ?) ) jogo, 
        (select * from ${bdAplicacoes}.alunos where escola=?) as al
        where jogo.user = al.user Group By jogo.user Order by al.numero;`, args, function (err, res) {            
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

Calculus.getTiposMinuteNewTurma = async function(turma, escola, dataInicio, dataFim, tipo, horaInicio, horaFim){
    var horarioInicio = dataInicio.concat(' ', horaInicio)
    var horarioFim = dataFim.concat(' ', horaFim + ':59')
    var args = [escola, turma, tipo, horarioInicio, horarioFim, escola]
    return new Promise(function(resolve, reject) {
        sql.query(`select jogo.user, al.numero, al.nome, sum(jogo.numcertas) as numcertas, sum(jogo.numerradas) as numerradas, sum(jogo.pontos) as pontos, count(jogo.pontos) as frequencia
		from (select * from ${bdSAMD}.minutenew where escola = ? and turma=? and op = ? and (CONCAT(data, ' ', horario) between ? and ?) ) jogo, 
        (select * from ${bdAplicacoes}.alunos where escola=?) as al
        where jogo.user = al.user Group By jogo.user Order by al.numero;`, args, function (err, res) {            
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

// por um aluno 
Calculus.getTodosMinuteNewAluno = async function(user, dataInicio, dataFim){
    var args = [user, dataInicio, dataFim]
    return new Promise(function(resolve, reject) {
        sql.query(`SELECT sum(numcertas) as numcertas, sum(numerradas) as numerradas, count(distinct nivel) as niveis, count(distinct op) as ops 
		            FROM ${bdSAMD}.minutenew where user=? and (data between ? and ?);`, args, function (err, res) {            
                if(err) {
                    console.log("error: ", err);
                    reject(err);
                }
                else{
                    if(res.length == 0) resolve(undefined)
                    else resolve(res[0]);
                }
            });   
    })  
}

Calculus.getTiposNiveisMinuteNewAluno = async function(user, dataInicio, dataFim, niveis, tipos){
    var args = [user, dataInicio, dataFim, niveis, tipos]
    return new Promise(function(resolve, reject) {
        sql.query(`SELECT sum(numcertas) as numcertas, sum(numerradas) as numerradas, count(distinct nivel) as niveis, count(distinct op) as ops 
        FROM ${bdSAMD}.minutenew where user=? and (data between ? and ?) and nivel in (?) and op=?;`, args, function (err, res) {            
                if(err) {
                    console.log("error: ", err);
                    reject(err);
                }
                else{
                    if(res.length == 0) resolve(undefined)
                    else resolve(res[0]);
                }
            });   
    })  
}

Calculus.getNiveisMinuteNewAluno = async function(user, dataInicio, dataFim, niveis){
    var args = [user, dataInicio, dataFim, niveis]
    return new Promise(function(resolve, reject) {
        sql.query(`SELECT sum(numcertas) as numcertas, sum(numerradas) as numerradas, count(distinct nivel) as niveis, count(distinct op) as ops 
        FROM ${bdSAMD}.minutenew where user=? and (data between ? and ?) and nivel in (?);`, args, function (err, res) {            
                if(err) {
                    console.log("error: ", err);
                    reject(err);
                }
                else{
                    console.log(res)
                    if(res.length == 0) resolve(undefined)
                    else resolve(res[0]);
                }
            });   
    })  
}

Calculus.getTiposMinuteNewAluno = async function(user, dataInicio, dataFim, tipos){
    var args = [user, dataInicio, dataFim, tipos]
    return new Promise(function(resolve, reject) {
        sql.query(`SELECT sum(numcertas) as numcertas, sum(numerradas) as numerradas, count(distinct nivel) as niveis, count(distinct op) as ops 
        FROM ${bdSAMD}.minutenew where user=? and (data between ? and ?) and op=?;`, args, function (err, res) {            
                if(err) {
                    console.log("error: ", err);
                    reject(err);
                }
                else{
                    if(res.length == 0) resolve(undefined)
                    else resolve(res[0]);
                }
            });   
    })    
}

Calculus.alunoPorDia = function(user){
    return new Promise(function(resolve, reject) {
        sql.query(`SELECT data, sum(numcertas) as numcertas, sum(numerradas) as numerradas, count(distinct nivel) as niveis, count(distinct op) as ops 
                FROM ${bdSAMD}.minutenew where user=?
                group by data
                order by data desc;`, user, function (err, res) {            
                if(err) {
                    console.log("error: ", err);
                    reject(err);
                }
                else{
                    resolve(res)
                }
            });   
    })
}

Calculus.getFreqAlunoPorDia = function(user){
    var args = [user, dataInicioAno, dataFimAno]
    return new Promise(function(resolve, reject) {
        sql.query(`SELECT data, count(pontos) as frequencia
                FROM ${bdSAMD}.minutenew 
                where user=? and (data between ? and ?)
                group by data
                order by data asc;`, args, function (err, res) {            
                if(err) {
                    console.log("error: ", err);
                    reject(err);
                }
                else{
                    resolve(res)
                }
            });   
    })
}


Calculus.alunoJogouMinuteNew = async function(user, dataInicio, dataFim){
    var args = [user, dataInicio, dataFim]
    return new Promise(function(resolve, reject) {
        sql.query(`SELECT user 
                    FROM ${bdSAMD}.minutenew where user=? and (data between ? and ?);`, args, function (err, res) {            
                if(err) {
                    console.log("error: ", err);
                    reject(err);
                }
                else{
                    resolve(res)
                }
            });   
    })    
}

// última vez que o aluno jogou
Calculus.getAlunoLast = function(user){
    return new Promise(function(resolve, reject) {
        sql.query(`select max(concat(data, ' ', horario)) as lastdate, count(pontos) as frequencia 
            	from ${bdSAMD}.minutenew where user=? and (data between ? and ?);`, [user, dataInicioAno, dataFimAno], function(err, res){
            if(err){
                console.log("erro: " + err)
                reject(err)
            }
            else{
                if(res.length == 0) resolve(undefined)
                else resolve(res[0])
            }
        })
    })
}

Calculus.getAlunoFrequencia = function(user){
    var args = [user, dataInicioAno, dataFimAno]
    return new Promise(function(resolve, reject) {
        sql.query(`Select count(pontos) as frequencia from ${bdSAMD}.minutenew where user = ? and (data between ? and ?);`, args, function(err, res){
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