const express = require("express");
const database = require("./connect");
const Int32 = require("mongodb").Int32;
const ObjectId = require('mongodb').ObjectId;

let buyOfferRoutes = express.Router();

//#1 Get All
//http://localhost:3000/buy_offer
buyOfferRoutes.route("/buy_offer").get(async (request, response) => {
    let db = database.getDb();
    let data = await db.collection("buy_offer").find({}).toArray();

    if (data.length > 0) {
        response.json(data);
    } else {
        //Without a catch this will cause the server to stop running
        throw new Error("Data was not found");
    }
});

//#2 Get One
buyOfferRoutes.route("/buy_offer/:id").get(async (request, response) => {
    let db = database.getDb();
    let data = await db.collection("buy_offer").findOne({_id: new ObjectId(request.params.id)});

    if (Object.keys(data.length > 0)) {
        response.json(data);
    } else {
        //Without a catch this will cause the server to stop running
        throw new Error("Data was not found");
    }
});

//#3 Create One
buyOfferRoutes.route("/buy_offer").post(async (request, response) => {
    let db = database.getDb();

    let mongoObject = {
        "user_id": new ObjectId(request.body.user_id), // Convertendo para ObjectId
        "max_price": new Int32(request.body.max_price), // Convertendo para Int32
        "negotiable": request.body.negotiable,
        "created_at": new Date(), // Garantindo Date válido
        "location": request.body.location, // Mantendo como objeto diretamente
        "delivery": request.body.delivery,
        "product": request.body.product
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
            "max_price": new Int32(request.body.max_price), // Convertendo para Int32
            "negotiable": request.body.negotiable,
            "created_at": new Date(), // Garantindo Date válido
            "location": request.body.location, // Mantendo como objeto diretamente
            "delivery": request.body.delivery,
            "product": request.body.product
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