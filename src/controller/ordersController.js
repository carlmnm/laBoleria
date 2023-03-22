import { db } from "../config/database.conection.js";

export async function postOrder(req, res) {
    const { clientId, cakeId, quantity, totalPrice } = req.body
    const clientExists = await db.query(`SELECT * FROM clients WHERE id = $1`, [clientId])
    const cakeExists = await db.query(`SELECT * FROM cakes WHERE id = $1`, [cakeId])
    if (!cakeExists.rows[0] || !clientExists.rows[0]) {
        return res.sendStatus(404)
    }
    try {
        await db.query(`INSERT INTO orders (clientid, cakeid, quantity, totalPrice)
        VALUES ($1, $2, $3, $4);`, [clientId, cakeId, quantity, totalPrice])
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}