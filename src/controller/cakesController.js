import { db } from "../config/database.conection.js";

export async function postCakes(req, res) {
    const { name, price, description, image } = req.body
    const cakeExists = await db.query(`SELECT * FROM cakes WHERE name = $1`, [name])
    if (cakeExists.rows[0]) {
        return res.sendStatus(409)
    }
    try {
        await db.query(`INSERT INTO cakes (name, price, description, image)
        VALUES ($1, $2, $3, $4);`, [name, price, description, image])
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}