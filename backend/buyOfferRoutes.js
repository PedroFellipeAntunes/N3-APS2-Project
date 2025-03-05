const express = require("express");
const database = require("./connect");
const Int32 = require("mongodb").Int32;
const ObjectId = require('mongodb').ObjectId;

const { buildBuyOfferQuery } = require("./filterUtils");

let buyOfferRoutes = express.Router();

//#1 Get All
//http://localhost:3000/buy_offer
buyOfferRoutes.route("/buy_offer").get(async (request, response) => {
    let db = database.getDb();
    let query = buildBuyOfferQuery(request.query);

    try {
        let data = await db.collection("buy_offer").find(query).toArray();
        
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
buyOfferRoutes.route("/buy_offer/:id").get(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("buy_offer").findOne({_id: new ObjectId(request.params.id)});

        if (Object.keys(data.length > 0)) {
            response.json(data);
        } else {
            response.status(404).json({ error: "Nenhuma oferta encontrada." });
        }
    } catch (error) {
        response.status(500).json({ error: "Erro ao buscar ofertas" });
    }
});

//#3 Create One
buyOfferRoutes.route("/buy_offer").post(async (request, response) => {
    let db = database.getDb();

    let mongoObject = {
        "user_id": new ObjectId(request.body.user_id), // Convertendo para ObjectId
        "type": "buy",
        "max_price": new Int32(request.body.max_price), // Convertendo para Int32
        "negotiable": request.body.negotiable,
        "created_at": new Date(), // Garantindo Date válido
        "location": request.body.location, // Mantendo como objeto diretamente
        "retrival": request.body.retrival,
        "product": request.body.product,
        "auction": [] //Empty array
    };

    let data = await db.collection("buy_offer").insertOne(mongoObject);

    response.json(data);
});

//#4 Update One
buyOfferRoutes.route("/buy_offer/:id").put(async (request, response) => {
    let db = database.getDb();

    let mongoObject = {
        $set: {
            "user_id": new ObjectId(request.body.user_id), // Convertendo para ObjectId
            "type": "buy",
            "max_price": new Int32(request.body.max_price), // Convertendo para Int32
            "negotiable": request.body.negotiable,
            "created_at": new Date(), // Garantindo Date válido
            "location": request.body.location, // Mantendo como objeto diretamente
            "retrival": request.body.retrival,
            "product": request.body.product,
            "auction": request.body.auction || [] //Data or empty
        }
    };

    let data = await db.collection("buy_offer").updateOne({_id: new ObjectId(request.params.id)}, mongoObject);

    response.json(data);
});

//#5 Delete One
buyOfferRoutes.route("/buy_offer/:id").delete(async (request, response) => {
    let db = database.getDb();
    let data = await db.collection("buy_offer").deleteOne({_id: new ObjectId(request.params.id)});

    response.json(data);
});

module.exports = buyOfferRoutes;