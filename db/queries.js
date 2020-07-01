const knex = require('./knex'); // Conexão

module.exports = {

    // --------------------------------------------------------- Usuário GAPsi/Apoia

    // SELECT * FROM atendente;
    async getAllAtend(){
        return await knex('atendente');
    },

    // INSERT INTO atendente VALUES (..., ...);
    async createAtend(usuario){
        return await knex('atendente').insert(usuario, '*');
    },

    // UPDATE atendente SET nomeatendente = '...', emailatendente = '...' WHERE emailatendente = '...';
    async updateAtend(emailatendente, usuario){
        return await knex('atendente').where('emailatendente', emailatendente).update(usuario, '*');
    },

    //DELETE FROM atendente WHERE emailatendente = '...';
    async deleteAtend(emailatendente){
        return await knex('atendente').where('emailatendente', emailatendente).del();
    },


    // --------------------------------------------------------- Usuário comum

    // SELECT * FROM usuario;
    async getAllUsuario(){
        return await knex('usuario');
    },

    // SELECT * FROM usuario WHERE idusuario = "...";
    async getOneUsuario(idusuario){
        return await knex('usuario').where('idusuario', idusuario).first();
    },

    // INSERT INTO atendente VALUES (..., ...);
    async createUsuario(idusuario, nusp, nomeusuario, institutousuario, email){
        return await knex('usuario').insert(
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
    async updateUsuario(idusuario, usuario){
        return await knex('usuario').where('idusuario', idusuario).update(usuario, '*');
    },

    //DELETE FROM usuario WHERE idusuario = '...';
    async deleteUsuario(idusuario){
        return await knex('usuario').where('idusuario', idusuario).del();
    }

}
