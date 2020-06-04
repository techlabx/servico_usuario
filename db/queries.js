const knex = require('./knex'); // Conexão

module.exports = {

    // --------------------------------------------------------- Usuário GAPsi/Apoia

    // SELECT * FROM atendente;
    getAllAtend(){
        return knex('atendente');
    },

    // INSERT INTO atendente VALUES (..., ...);
    createAtend(usuario){
        return knex('atendente').insert(usuario, '*');
    },

    // UPDATE atendente SET nomeatendente = '...', emailatendente = '...' WHERE emailatendente = '...';
    updateAtend(emailatendente, usuario){
        return knex('atendente').where('emailatendente', emailatendente).update(usuario, '*');
    },

    //DELETE FROM atendente WHERE emailatendente = '...';
    deleteAtend(emailatendente){
        return knex('atendente').where('emailatendente', emailatendente).del();
    },


    // --------------------------------------------------------- Usuário comum

    // SELECT * FROM usuario;
    getAllUsuario(nome){
        return knex('usuario');
    },

    // INSERT INTO atendente VALUES (..., ...);
    createUsuario(usuario){
        return knex('usuario').insert(usuario, '*');
    },

    // UPDATE usuario SET nuspusuario = '...', nomeusuario = '...' WHERE nuspusuario = '...';
    updateUsuario(nuspusuario, usuario){
        return knex('usuario').where('nuspusuario', nuspusuario).update(usuario, '*');
    },

    //DELETE FROM usuario WHERE nuspusuario = '...';
    deleteUsuario(nuspusuario){
        return knex('usuario').where('nuspusuario', nuspusuario).del();
    }

}
