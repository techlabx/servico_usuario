const knex = require('./knex'); // Conexão

// --------------------------------------------------------- Usuário GAPsi/Apoia
// SELECT * FROM atendente;
async function getAllAtend(){
    return await knex('atendente');
}

// SELECT * FROM atendente WHERE instituto = "...";
async function getAtendenteInst(instituto){
    return await knex('atendente').where('institutoatendente', instituto).first();
}

// INSERT INTO atendente VALUES (..., ...);
async function createAtend(usuario){
    return await knex('atendente').insert(usuario, '*');
}

// UPDATE atendente SET nomeatendente = '...', emailatendente = '...' WHERE institutoatendente = '...';
async function updateAtend(instituto, usuario){
    return await knex('atendente').where('institutoatendente', instituto).update(usuario, '*');
}

//DELETE FROM atendente WHERE institutoAtendente = '...';
async function deleteAtend(instituto){
    return await knex('atendente').where('institutoatendente', instituto).del();
}


// --------------------------------------------------------- Usuário comum

// SELECT * FROM usuario;
async function getAllUsuario(){
    return await knex('usuario');
}

// SELECT * FROM usuario WHERE idusuario = "...";
async function getOneUsuario(idusuario){
    return await knex('usuario').where('idusuario', idusuario).first();
}

// INSERT INTO atendente VALUES (..., ...);
async function createUsuario(idusuario, nusp, nomeusuario, institutousuario, email, nivelacesso){
    return await knex('usuario').insert(
        {
            idusuario: idusuario,
            nuspusuario: nusp,
            nomeusuario: nomeusuario,
            institutousuario: institutousuario,
            emailusuario: email,
            nivelacesso: nivelacesso
        }
    );
}

// UPDATE usuario SET idusuario = '...', nomeusuario = '...' WHERE idusuario = '...';
async function updateUsuario(idusuario, nusp, nomeusuario, institutousuario, email, nivelacesso){
    return await knex('usuario').where('idusuario', idusuario).update(
        {
            idusuario: idusuario,
            nuspusuario: nusp,
            nomeusuario: nomeusuario,
            institutousuario: institutousuario,
            emailusuario: email,
            nivelacesso: nivelacesso
        }
    );
}

//DELETE FROM usuario WHERE idusuario = '...';
async function deleteUsuario(idusuario){
    return await knex('usuario').where('idusuario', idusuario).del();
}

// --------------------------------------------------------- Token
async function createTokenInfo(tokenInfo) {
    return await knex('token').insert(tokenInfo, '*');
}

async function getTokenInfo(instituto) {
    return await knex('token').where('institutotoken', instituto);
}

async function updateTokenInfo(instituto, tokenInfo) {
    return await knex('token').where('institutotoken', instituto).update(tokenInfo, '*');
}

async function deleteTokenInfo(instituto) {
    return await knex('token').where('institutotoken', instituto).del();
}

// --------------------------------------------------------- Token
// SELECT * FROM instituto;
async function getAllInstituto(){
    return await knex('instituto');
}


module.exports  = {
    getAllAtend,
    createAtend,
    updateAtend,
    deleteAtend,
    getAllUsuario,
    getAtendenteInst,
    getOneUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    getAllInstituto,
    createTokenInfo,
    getTokenInfo,
    updateTokenInfo,
    deleteTokenInfo
}
