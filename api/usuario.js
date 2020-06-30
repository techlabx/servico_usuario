const express = require('express');

//Simple router
const router = express.Router();

const queries = require('../db/queries');

function validUsuario(userId, nusp, userName, instituto, userEmail) {
    const hasID = typeof userId == 'string' && userId.trim() != '';
    const hasNumUsp = typeof nusp == 'string' && nusp.trim() != '';
    const hasNome = typeof userName == 'string' && userName.trim() != '';
    const hasInstituto = typeof instituto == 'string' && instituto.trim() != '';
    const hasEmail = typeof userEmail == 'string' && userEmail.trim() != '';
    
    return hasID && hasNumUsp && hasNome && hasInstituto && hasEmail;
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
    try {
        queries.getAllAtend().then(usuario => {
            res.json(usuario);
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Erro");
    }
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
    try {
            queries.getAllUsuario().then(usuario => {
            res.json(usuario);
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

router.get('/aluno/:idusuario', (req, res) => {
    queries.getOneUsuario(req.params.idusuario).then(usuario => {
        if(usuario) res.json(usuario);
        else res.json({error: true});
    })
});

router.post('/aluno', (req, res, next) => {
    //Giovana, inserir esses dados abaixo na criação de um usuário

    let usuario = {
        userId: req.userId,
        nusp: req.body.nusp,
        userName: req.userName,
        instituto: req.body.instituto,
        email: req.userEmail
    }

    console.log(usuario);
    if(validUsuario(usuario.userId, usuario.nusp, usuario.userName, usuario.instituto, usuario.email)){
        //Insert into DB
        queries.createUsuario(usuario.userId, usuario.nusp, usuario.userName, usuario.instituto, usuario.email).then(usuarios => {
            res.json(usuarios[0]);
        });
    }
    else next(new Error('Usuário inválido.'));
});

router.put('/aluno/:idusuario', (req, res, next) => {
    
    let usuario = {
        idusuario: req.userId,
        nuspusuario: req.body.nusp,
        nomeusuario: req.userName,
        institutousuario: req.body.instituto,
        emailusuario: req.userEmail
    }

    if(validUsuario(usuario.idusuario, usuario.nuspusuario, usuario.nomeusuario, usuario.institutousuario, usuario.emailusuario)){
        //Update the quest
        queries.updateUsuario(req.params.idusuario, usuario).then(usuarios => {
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
