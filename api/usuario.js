const express = require('express');

//Simple router
const router = express.Router();

const queries = require('../db/queries');

function validUsuario(idusuario, nomeusuario){
    const hasID = typeof idusuario == 'string' && idusuario.trim() != '';
    const hasNome = typeof nomeusuario == 'string' && nomeusuario.trim() != '';

    return hasID && hasNome;
}

function validAtend(usuario){
    const hasName = typeof usuario.nomeatendente == 'string' && usuario.nomeatendente.trim() != '';
    const hasEmail = typeof usuario.emailatendente == 'string' && usuario.emailatendente.trim() != '';
    const hasLink = typeof usuario.linkagenda == 'string' && usuario.linkagenda.trim() != '';

    return hasName && hasEmail && hasLink;
}


//Router handlers

// ------------------------------------------------------------------- Usuário GAPsi/Apoia

router.get('/gapsi/', (req, res) => {
    queries.getAllAtend().then(usuario => {
        res.json(usuario);
    })
});

router.post('/gapsi/', (req, res, next) => {
    if(validAtend(req.body)){
        //Insert into DB
        queries.createAtend(req.body).then(usuarios => {
            res.json(usuarios[0]);
        });
    }
    else next(new Error('Atendente GAPSI/Apoia inválido.'));
});

router.put('/gapsi/:emailatendente', (req, res, next) => {
    if(validAtend(req.body)){
        //Update the quest
        queries.updateAtend(req.params.emailatendente, req.body).then(usuarios => {
            res.json(usuarios[0]);
        });
    }
    else next(new Error('Atendente GAPSI/Apoia inválido. Impossível atualizar.'));
});

router.delete('/gapsi/:emailatendente', (req, res) => {
    queries.deleteAtend(req.params.emailatendente).then(() => {
        res.json({
            deleted: true
        });
    });
});


// ------------------------------------------------------------------- Usuário comum

router.get('/aluno', (req, res) => {
    queries.getAllUsuario().then(usuario => {
        res.json(usuario);
    })
});

router.get('/aluno/:idusuario', (req, res) => {
    queries.getOneUsuario(req.params.idusuario).then(usuario => {
        if(usuario) res.json(usuario);
        else res.json({error: true});
    })
});

router.post('/aluno/', (req, res, next) => {
    if(validUsuario(req.body.idusuario, req.body.nomeusuario)){
        //Insert into DB
        queries.createUsuario(req.body.idusuario,
                              req.body.nomeusuario).then(usuarios => {
            res.json(usuarios[0]);
        });
    }
    else next(new Error('Usuário inválido.'));
});

router.put('/aluno/:idusuario', (req, res, next) => {
    if(validUsuario(req.body)){
        //Update the quest
        queries.updateUsuario(req.params.idusuario, req.body).then(usuarios => {
            res.json(usuarios[0]);
        });
    }
    else next(new Error('Usuário inválido. Impossível atualizar.'));
});

router.delete('/aluno/:idusuario', (req, res) => {
    queries.deleteUsuario(req.params.idusuario).then(() => {
        res.json({
            deleted: true
        });
    });
});


//Making it available in another file
module.exports = router;
