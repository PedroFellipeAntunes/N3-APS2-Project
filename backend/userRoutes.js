const express = require("express");
const database = require("./connect");
const Int32 = require("mongodb").Int32;
const ObjectId = require('mongodb').ObjectId;

const { buildOfferQuery } = require("./filterUtils");

let userRoutes = express.Router();

//#1 Get All
//http://localhost:3000/user
userRoutes.route("/user").get(async (request, response) => {
    let db = database.getDb();
    let query = buildOfferQuery(request.query);

    try {
        let data = await db.collection("user").find(query).toArray();

        if (data.length > 0) {
            response.json(data);
        } else {
            response.status(404).json({ error: "Nenhuma oferta encontrada." });
        }
    } catch (error) {
        response.status(500).json({ error: "Erro ao buscar ofertas" });
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
            response.status(404).json({ error: "Nenhuma oferta encontrada." });
        }
    } catch (error) {
        response.status(500).json({ error: "Erro ao buscar ofertas" });
    }
});

//#3 Create One
userRoutes.route("/user").post(async (request, response) => {
    let db = database.getDb();

    mongoObject = {
        "name": request.body.name,
        "email": request.body.email,
        "password": request.body.password,
        "join_date": new Date(),
        "cpf": request.body.cpf,
        "cep": request.body.cep,
        "offers": [],
        "ban": {
            "status": false,
            "description": ""
        }
    };

    let data = await db.collection("user").insertOne(mongoObject);

    response.json(data);
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
            "offers": request.body.offers,
            "ban": {
                "status": request.body.ban.status,
                "description": request.body.ban.description
            }
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

module.exports = userRoutes;