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
    const hasInstituto = typeof usuario.institutoatendente == 'string' && usuario.institutoatendente.trim() != '';
    const hasStatus = typeof usuario.statusatendente == 'string' && usuario.statusatendente.trim() != '';

    return hasName && hasEmail && hasInstituto && hasStatus;
}


//Router handlers

// ------------------------------------------------------------------- Usuário GAPsi/Apoia

router.get('/gapsi', async (req, res) => {
    try {
        let usuarios = await queries.getAllAtend();
        res.status(200).json(usuarios);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Erro");
    }
});

router.post('/gapsi', async (req, res, next) => {
    try {
        if(validAtend(req.body)){
            //Insert into DB
            let result = await queries.createAtend(req.body);
            res.status(201).send(result[0]);
        }
        else next(new Error('Atendente GAPSI/Apoia inválido.'));
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Erro");
    }
});

router.get('/gapsi/:instituto', async (req, res) => {
    try {
        let usuario = await queries.getAtendenteInst(req.params.instituto)
        if(usuario) res.json(usuario);
        else res.status(404).send("Not found");
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

router.put('/gapsi/:emailatendente', async (req, res, next) => {
    if(validAtend(req.body)){
        //Update the quest
        let usuario = await queries.updateAtend(req.params.emailatendente, req.body)[0];
        res.status(200).send(usuario)
    }
    else next(new Error('Atendente GAPSI/Apoia inválido. Impossível atualizar.'));
});

router.delete('/gapsi/:emailatendente', async (req, res) => {
    try {
        await queries.deleteAtend(req.params.emailatendente);
        res.status(200).send({deleted: true});
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Erro");
    }
});


// ------------------------------------------------------------------- Usuário comum

router.get('/aluno', async (req, res) => {
    try {
            let usuario = await queries.getAllUsuario();
            res.status(200).send(usuario);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

router.get('/aluno/:idusuario', async (req, res) => {
    try {
        let usuario = await queries.getOneUsuario(req.params.idusuario)
        if(usuario) res.json(usuario);
        else res.status(404).send("Not found");
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

router.post('/aluno', async (req, res, next) => {
    try {
        let usuario = {
            userId: req.body.userId,
            nusp: req.body.nusp,
            userName: req.body.userName,
            instituto: req.body.instituto,
            email: req.body.userEmail,
            nivelAcesso: req.body.nivelAcesso
        }

        if(validUsuario(usuario.userId, usuario.nusp, usuario.userName, usuario.instituto, usuario.email)){
            //Insert into DB
            let usuarios = await queries.createUsuario(usuario.userId, usuario.nusp, usuario.userName, usuario.instituto, usuario.email, usuario.nivelAcesso);
            res.status(200).send(usuarios[0]);
        }
        else next(new Error('Usuário inválido.'));
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Error");
    }
});

router.put('/aluno/:idusuario', async (req, res, next) => {
    try {
        let usuario = {
            userId: req.body.userId,
            nusp: req.body.nusp,
            userName: req.body.userName,
            instituto: req.body.instituto,
            email: req.body.userEmail,
            nivelAcesso: req.body.nivelAcesso
        }

        if(validUsuario(usuario.userId, usuario.nusp, usuario.userName, usuario.instituto, usuario.email)){
            //Update the quest
            let usuarios = await queries.updateUsuario(usuario.userId, usuario.nusp, usuario.userName, usuario.instituto, usuario.email, usuario.nivelAcesso);
            res.status(200).send(usuarios[0]);
        }
        else next(new Error('Usuário inválido. Impossível atualizar.'));
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Erro");
    }
});

router.delete('/aluno/:idusuario', async (req, res) => {
    try {
        await queries.deleteUsuario(req.params.idusuario);
        res.status(200).send({deleted: true});
    }
    catch (err) {
        console.error(err);
        res.status(500).send("error");
    }
});


//Making it available in another file
module.exports = router;
