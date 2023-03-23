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

export async function getClientsOrders(req, res) {
    const { id } = req.params
    const clientExists = await db.query(`SELECT * FROM clients WHERE id = $1;`, [id])
    if (!clientExists.rows[0]){
        return res.sendStatus(404)
    }
    console.log(id)
    try {
        const result = await db.query(`
            SELECT 
              c.id AS client_id,
              o.id AS order_id,
              o.createdat AS created_at,
              o.quantity,
              o.totalprice,
              k.name AS cake_name
            FROM orders o
            JOIN clients c ON c.id = o.clientid
            JOIN cakes k ON k.id = o.cakeid
            WHERE o.clientid = $1;
            `, [id]
        )

        const clientOrders = result.rows.map((row) => {
            return {
                orderId: row.order_id,
                quantity: row.quantity,
                createdAt: row.created_at,                
                totalPrice: row.totalprice,
                cakeName: row.cake_name
            }
        })

        res.status(200).send(clientOrders)
    } catch (error) {
        res.status(500).send(error.message)
    }
}