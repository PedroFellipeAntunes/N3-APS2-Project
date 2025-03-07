const express = require("express");
const database = require("./connect");
const Int32 = require("mongodb").Int32;
const ObjectId = require('mongodb').ObjectId;

const { buildOfferQuery } = require("./filterUtils");

let offerRoutes = express.Router();

//#1 Get All
//http://localhost:3000/offer
offerRoutes.route("/offer").get(async (request, response) => {
    let db = database.getDb();
    let query = buildOfferQuery(request.query);

    try {
        let data = await db.collection("offer").find(query).toArray();

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
offerRoutes.route("/offer/:id").get(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("offer").findOne({_id: new ObjectId(request.params.id)});

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
offerRoutes.route("/offer").post(async (request, response) => {
    let db = database.getDb();
    let offerType = request.body.type;

    if (offerType === "buy") {
        mongoObject = {
            "user_id": new ObjectId(request.body.user_id),
            "type": "buy",
            "max_price": new Int32(request.body.max_price),
            "negotiable": request.body.negotiable,
            "created_at": new Date(),
            "location": request.body.location,
            "retrival": request.body.retrival,
            "product": request.body.product,
            "auction": request.body.auction || []
        };
    } else {
        mongoObject = {
            "user_id": new ObjectId(request.body.user_id),
            "type": "sell",
            "price": new Int32(request.body.price),
            "amount": new Int32(request.body.amount),
            "negotiable": request.body.negotiable,
            "created_at": new Date(),
            "location": request.body.location,
            "delivery": request.body.delivery,
            "images": request.body.images || [],
            "product": request.body.product
        };
    }

    let data = await db.collection("offer").insertOne(mongoObject);

    response.json(data);
});

//#4 Update One
offerRoutes.route("/offer/:id").put(async (request, response) => {
    let db = database.getDb();
    let offerType = request.body.type;

    if (offerType === "buy") {
        mongoObject = {
            $set: {
                "user_id": new ObjectId(request.body.user_id),
                "type": "buy",
                "max_price": new Int32(request.body.max_price),
                "negotiable": request.body.negotiable,
                "created_at": new Date(request.body.date),
                "location": request.body.location,
                "retrival": request.body.retrival,
                "product": request.body.product,
                "auction": request.body.auction || []
            }
        };
    } else {
        mongoObject = {
            $set: {
                "user_id": new ObjectId(request.body.user_id),
                "type": "sell",
                "price": new Int32(request.body.price),
                "amount": new Int32(request.body.amount),
                "negotiable": request.body.negotiable,
                "created_at": new Date(request.body.date),
                "location": request.body.location,
                "delivery": request.body.delivery,
                "images": request.body.images || [],
                "product": request.body.product
            }
        };
    }

    let data = await db.collection("offer").updateOne({_id: new ObjectId(request.params.id)}, mongoObject);

    response.json(data);
});

//#5 Delete One
offerRoutes.route("/offer/:id").delete(async (request, response) => {
    let db = database.getDb();
    let data = await db.collection("offer").deleteOne({_id: new ObjectId(request.params.id)});

    response.json(data);
});

module.exports = offerRoutes;