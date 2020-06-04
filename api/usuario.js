const express = require('express');

//Simple router
const router = express.Router();

const queries = require('../db/queries');

function validUsuario(usuario){
    const hasNUSP = typeof usuario.nuspusuario == 'string' && usuario.nuspusuario.trim() != '';
    const hasNome = typeof usuario.nomeusuario == 'string' && usuario.nomeusuario.trim() != '';

    return hasNUSP && hasNome;
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

router.get('/aluno/', (req, res) => {
    queries.getAllUsuario().then(usuario => {
        res.json(usuario);
    })
});

router.post('/aluno/', (req, res, next) => {
    if(validUsuario(req.body)){
        //Insert into DB
        queries.createUsuario(req.body).then(usuarios => {
            res.json(usuarios[0]);
        });
    }
    else next(new Error('Usuário inválido.'));
});

router.put('/aluno/:nuspusuario', (req, res, next) => {
    if(validUsuario(req.body)){
        //Update the quest
        queries.updateUsuario(req.params.nuspusuario, req.body).then(usuarios => {
            res.json(usuarios[0]);
        });
    }
    else next(new Error('Usuário inválido. Impossível atualizar.'));
});

router.delete('/aluno/:nuspusuario', (req, res) => {
    queries.deleteUsuario(req.params.nuspusuario).then(() => {
        res.json({
            deleted: true
        });
    });
});


//Making it available in another file
module.exports = router;
