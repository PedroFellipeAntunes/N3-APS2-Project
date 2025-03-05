const express = require("express");
const database = require("./connect");
const Int32 = require("mongodb").Int32;
const ObjectId = require('mongodb').ObjectId;

const { buildSellOfferQuery } = require("./filterUtils");

let sellOfferRoutes = express.Router();

//#1 Get All
//http://localhost:3000/sell_offer
sellOfferRoutes.route("/sell_offer").get(async (request, response) => {
    let db = database.getDb();
    let query = buildSellOfferQuery(request.query);

    try {
        let data = await db.collection("sell_offer").find(query).toArray();

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
sellOfferRoutes.route("/sell_offer/:id").get(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("sell_offer").findOne({_id: new ObjectId(request.params.id)});

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
sellOfferRoutes.route("/sell_offer").post(async (request, response) => {
    let db = database.getDb();

    let mongoObject = {
        "user_id": new ObjectId(request.body.user_id), // Convertendo para ObjectId
        "type": "sell",
        "price": new Int32(request.body.price), // Convertendo para Int32
        "amount": new Int32(request.body.amount),
        "negotiable": request.body.negotiable,
        "created_at": new Date(), // Garantindo Date válido
        "location": request.body.location, // Mantendo como objeto diretamente
        "delivery": request.body.delivery,
        "images": request.body.images || [], // Garante que seja um array
        "product": request.body.product
    };

    let data = await db.collection("sell_offer").insertOne(mongoObject);

    response.json(data);
});

//#4 Update One
sellOfferRoutes.route("/sell_offer/:id").put(async (request, response) => {
    let db = database.getDb();

    let mongoObject = {
        $set: {
            "user_id": new ObjectId(request.body.user_id), // Convertendo para ObjectId
            "type": "sell",
            "price": new Int32(request.body.price), // Convertendo para Int32
            "amount": new Int32(request.body.amount),
            "negotiable": request.body.negotiable,
            "created_at": new Date(request.body.date), // Garantindo Date válido
            "location": request.body.location, // Mantendo como objeto diretamente
            "delivery": request.body.delivery,
            "images": request.body.images || [], // Garante que seja um array
            "product": request.body.product
        }
    };

    let data = await db.collection("sell_offer").updateOne({_id: new ObjectId(request.params.id)}, mongoObject);

    response.json(data);
});

//#5 Delete One
sellOfferRoutes.route("/sell_offer/:id").delete(async (request, response) => {
    let db = database.getDb();
    let data = await db.collection("sell_offer").deleteOne({_id: new ObjectId(request.params.id)});

    response.json(data);
});

module.exports = sellOfferRoutes;