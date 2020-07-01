const knex = require('./knex'); // Conexão

// --------------------------------------------------------- Usuário GAPsi/Apoia
// SELECT * FROM atendente;
async function getAllAtend(){
    return await knex('atendente');
}

// INSERT INTO atendente VALUES (..., ...);
async function createAtend(usuario){
    return await knex('atendente').insert(usuario, '*');
}

// UPDATE atendente SET nomeatendente = '...', emailatendente = '...' WHERE emailatendente = '...';
async function updateAtend(emailatendente, usuario){
    return await knex('atendente').where('emailatendente', emailatendente).update(usuario, '*');
}

//DELETE FROM atendente WHERE emailatendente = '...';
async function deleteAtend(emailatendente){
    return await knex('atendente').where('emailatendente', emailatendente).del();
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
async function createUsuario(idusuario, nusp, nomeusuario, institutousuario, email){
    return await knex('usuario').insert(
        {
            idusuario: idusuario,
            nuspusuario: nusp,
            nomeusuario: nomeusuario,
            institutousuario: institutousuario,
            emailusuario: email 
        }
    );
}

// UPDATE usuario SET idusuario = '...', nomeusuario = '...' WHERE idusuario = '...';
async function updateUsuario(idusuario, usuario){
    return await knex('usuario').where('idusuario', idusuario).update(usuario, '*');
}

//DELETE FROM usuario WHERE idusuario = '...';
async function deleteUsuario(idusuario){
    return await knex('usuario').where('idusuario', idusuario).del();
}

module.exports  = {
    getAllAtend,
    createAtend,
    updateAtend,
    deleteAtend,
    getAllUsuario,
    getOneUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario
}