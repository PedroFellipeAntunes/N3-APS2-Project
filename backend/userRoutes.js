const express = require("express");
const database = require("./connect");
const Int32 = require("mongodb").Int32;
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config({path: "./config.env"});

const { buildUserQuery } = require("./filterUtils");

let userRoutes = express.Router();
const SALT_ROUNDS = 6;

//#1 Get All
//http://localhost:3000/user
userRoutes.route("/user").get(async (request, response) => {
    let db = database.getDb();
    let query = buildUserQuery(request.query);

    try {
        let data = await db.collection("user").findOne(query);

        if (data) {
            response.json(data);
        } else {
            response.status(404).json({ error: "Nenhum usuario encontrado." });
        }
    } catch (error) {
        response.status(500).json({ error: "Erro ao buscar user" });
    }
});

//#2 Get One
userRoutes.route("/user/:id").get(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("user").findOne({_id: new ObjectId(request.params.id)});

        if (data) {
            response.json(data);
        } else {
            response.status(404).json({ error: "Nenhum user encontrada." });
        }
    } catch (error) {
        response.status(500).json({ error: "Erro ao buscar user" });
    }
});

//#3 Create One
userRoutes.route("/user").post(async (request, response) => {
    let db = database.getDb();

    const takenEmail = await db.collection("user").findOne({"email": request.body.email});
    const takenCPF = await db.collection("user").findOne({"cpf": request.body.cpf});

    if (takenEmail || takenCPF) {
        response.json({message: "Email ou CPF já usados"});
    } else {
        const hash = await bcrypt.hash(request.body.password, SALT_ROUNDS);

        mongoObject = {
            "name": request.body.name,
            "email": request.body.email,
            "password": hash,
            "join_date": new Date(),
            "cpf": request.body.cpf,
            "cep": request.body.cep,
            "ban": {
                "status": false,
                "description": ""
            },
            "blocked": []
        };

        let data = await db.collection("user").insertOne(mongoObject);

        response.json(data);
    }
});

//#4 Update One
userRoutes.route("/user/:id").put(async (request, response) => {
    let db = database.getDb();

    mongoObject = {
        $set: {
            "name": request.body.name,
            "email": request.body.email,
            "password": request.body.password,
            "join_date": new Date(request.body.join_date),
            "cpf": request.body.cpf,
            "cep": request.body.cep,
            "ban": {
                "status": request.body.ban.status,
                "description": request.body.ban.description
            },
            "blocked": request.body.blocked
        }
    };

    let data = await db.collection("user").updateOne({_id: new ObjectId(request.params.id)}, mongoObject);

    response.json(data);
});

//#5 Delete One
userRoutes.route("/user/:id").delete(async (request, response) => {
    let db = database.getDb();
    let data = await db.collection("user").deleteOne({_id: new ObjectId(request.params.id)});

    response.json(data);
});

//#6 Login
userRoutes.route("/user/login").post(async (request, response) => {
    let db = database.getDb();

    const user = await db.collection("user").findOne({"email": request.body.email});

    if (user) {
        let confirmation = await bcrypt.compare(request.body.password, user.password);

        if (confirmation) {
            //Optional, after SECRET_KEY ,expiresIn: "1h"});
            //const token = jwt.sign(user, process.env.SECRET_KEY, {expiresIn: "1h"});
            const token = jwt.sign(user, process.env.SECRET_KEY);
            response.json({success: true, token});
        } else {
            response.json({success: false, message: "Senha errada"});
        }
    } else {
        response.json({success: false, message: "Usuario não encontrado"});
    }
});

//7 Get user NAME ONLY
userRoutes.route("/user_name/:id").get(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("user").findOne({_id: new ObjectId(request.params.id)});

        if (data) {
            response.json(data.name);
        } else {
            response.status(404).json({ error: "Nenhum user encontrada." });
        }
    } catch (error) {
        response.status(500).json({ error: "Erro ao buscar user" });
    }
});

module.exports = userRoutes;