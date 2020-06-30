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
    getAllUsuario(){
        return knex('usuario');
    },

    // SELECT * FROM usuario WHERE idusuario = "...";
    getOneUsuario(idusuario){
        return knex('usuario').where('idusuario', idusuario).first();
    },

    // INSERT INTO atendente VALUES (..., ...);
    createUsuario(idusuario, nusp, nomeusuario, institutousuario, email){
        return knex('usuario').insert(
            {
                idusuario: idusuario,
                nuspusuario: nusp,
                nomeusuario: nomeusuario,
                institutousuario: institutousuario,
                emailusuario: email 
            }
        );
    },

    // UPDATE usuario SET idusuario = '...', nomeusuario = '...' WHERE idusuario = '...';
    updateUsuario(idusuario, usuario){
        return knex('usuario').where('idusuario', idusuario).update(usuario, '*');
    },

    //DELETE FROM usuario WHERE idusuario = '...';
    deleteUsuario(idusuario){
        return knex('usuario').where('idusuario', idusuario).del();
    }

}
