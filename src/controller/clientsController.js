import { db } from "../config/database.conection.js";

export async function postClients(req, res) {
    const { name, address, phone } = req.body
    // const cakeExists = await db.query(`SELECT * FROM cakes WHERE name = $1`, [name])
    // if (cakeExists.rows[0]) {
    //     return res.sendStatus(409)
    // }
    try {
        await db.query(`INSERT INTO clients (name, address, phone)
        VALUES ($1, $2, $3);`, [name, address, phone])
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}