const express = require("express");
const database = require("./connect");
const Int32 = require("mongodb").Int32;
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');

require("dotenv").config({path: "./config.env"});

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
            data.forEach(item => {
                if (item.type === "buy") {
                    item.max_price = (item.max_price / 100).toFixed(2); 
                } else {
                    item.price = (item.price / 100).toFixed(2); 
                }
            });

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

        if (data) {
            // Convert price from int32 to double before sending it in the response
            if (data.type === "buy") {
                data.max_price = (data.max_price / 100).toFixed(2); // Converts to double
            } else {
                data.price = (data.price / 100).toFixed(2); // Converts to double
            }

            response.json(data);
        } else {
            response.status(404).json({ error: "Nenhuma oferta encontrada." });
        }
    } catch (error) {
        response.status(500).json({ error: "Erro ao buscar ofertas" });
    }
});

//#3 Create One
offerRoutes.route("/offer").post(verifyToken, async (request, response) => {
    let db = database.getDb();
    let offerType = request.body.type;

    console.log(`User ID:${request.body.user._id}`);

    if (offerType === "buy") {
        mongoObject = {
            "user_id": new ObjectId(request.body.user._id),
            "type": "buy",
            "max_price": new Int32(Math.round(request.body.max_price * 100)),
            "negotiable": request.body.negotiable,
            "created_at": new Date(),
            "location": request.body.location,
            "retrival": request.body.retrival,
            "product": request.body.product,
            "auction": []
        };
    } else {
        mongoObject = {
            "user_id": new ObjectId(request.body.user._id),
            "type": "sell",
            "price": new Int32(Math.round(request.body.price * 100)),
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
offerRoutes.route("/offer/:id").put(verifyToken, async (request, response) => {
    let db = database.getDb();
    let offerType = request.body.type;

    if (offerType === "buy") {
        mongoObject = {
            $set: {
                "user_id": new ObjectId(request.body.user_id),
                "type": "buy",
                "max_price": new Int32(Math.round(request.body.max_price * 100)),
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
                "price": new Int32(Math.round(request.body.price * 100)),
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
offerRoutes.route("/offer/:id").delete(verifyToken, async (request, response) => {
    let db = database.getDb();
    let data = await db.collection("offer").deleteOne({_id: new ObjectId(request.params.id)});

    response.json(data);
});

//#6 Get all offers by specific user
offerRoutes.route("/offer/:user_id").get(async (request, response) => {
    try {
        let db = database.getDb();
        let data = await db.collection("offer").get({user_id: new ObjectId(request.params.user_id)});

        if (data) {
            // Convert price from int32 to double before sending it in the response
            if (data.type === "buy") {
                data.max_price = (data.max_price / 100).toFixed(2); // Converts to double
            } else {
                data.price = (data.price / 100).toFixed(2); // Converts to double
            }

            response.json(data);
        } else {
            response.status(404).json({ error: "Nenhuma oferta encontrada." });
        }
    } catch (error) {
        response.status(500).json({ error: "Erro ao buscar ofertas" });
    }
});

function verifyToken(request, response, next) {
    const authHeaders = request.headers["authorization"];
    const token = authHeaders && authHeaders.split(' ')[1];

    if (!token) {
        return response.status(401).json({message: "Token de sessão não existente"});
    }

    jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
        if (error) {
            return response.status(403).json({message: "Token de sessão não valido"});
        }

        request.body.user = user;
        next();
    });
}

module.exports = offerRoutes;