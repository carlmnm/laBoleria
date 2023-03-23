import { db } from "../config/database.conection.js";

export async function postOrder(req, res) {
    const { clientId, cakeId, quantity, totalPrice } = req.body
    const clientExists = await db.query(`SELECT * FROM clients WHERE id = $1;`, [clientId])
    const cakeExists = await db.query(`SELECT * FROM cakes WHERE id = $1;`, [cakeId])
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

export async function getOrder(req, res) {
    const date = req.query.date
    console.log(date)
    const orders = await db.query(`SELECT * FROM orders`)
    if (!orders.rows[0]) {
        return res.sendStatus(404)
    }
    try {
        const result = await db.query(`
          SELECT 
            c.id AS client_id,
            c.name AS client_name,
            c.address AS client_address,
            c.phone AS client_phone,
            o.id AS order_id,
            o.createdat AS created_at,
            o.quantity,
            o.totalprice,
            k.id AS cake_id,
            k.name AS cake_name,
            k.price AS cake_price,
            k.description AS cake_description,
            k.image AS cake_image
          FROM orders o
          JOIN clients c ON c.id = o.clientid
          JOIN cakes k ON k.id = o.cakeid
        `)

        const orders = result.rows.map((row) => {
            return {
                client: {
                    id: row.client_id,
                    name: row.client_name,
                    address: row.client_address,
                    phone: row.client_phone,
                },
                cake: {
                    id: row.cake_id,
                    name: row.cake_name,
                    price: row.cake_price,
                    description: row.cake_description,
                    image: row.cake_image,
                },
                orderId: row.order_id,
                createdAt: row.created_at,
                quantity: row.quantity,
                totalPrice: row.totalprice,
            };
        });

        if (date) {
            const dateResult = await db.query(`
            SELECT 
              c.id AS client_id,
              c.name AS client_name,
              c.address AS client_address,
              c.phone AS client_phone,
              o.id AS order_id,
              o.createdat AS created_at,
              o.quantity,
              o.totalprice,
              k.id AS cake_id,
              k.name AS cake_name,
              k.price AS cake_price,
              k.description AS cake_description,
              k.image AS cake_image
            FROM orders o
            JOIN clients c ON c.id = o.clientid
            JOIN cakes k ON k.id = o.cakeid
            WHERE o.createdat LIKE $1;
            `, [`${date}%`]
            )

            if (!dateResult.rows[0]) {
                return res.sendStatus(404)
            }

            const dateOrders = dateResult.rows.map((row) => {
                return {
                    client: {
                        id: row.client_id,
                        name: row.client_name,
                        address: row.client_address,
                        phone: row.client_phone,
                    },
                    cake: {
                        id: row.cake_id,
                        name: row.cake_name,
                        price: row.cake_price,
                        description: row.cake_description,
                        image: row.cake_image,
                    },
                    orderId: row.order_id,
                    createdAt: row.created_at,
                    quantity: row.quantity,
                    totalPrice: row.totalprice,
                }
            })
            return res.status(200).send(dateOrders)

        }

        res.status(200).send(orders)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getOrderById(req, res) {
    const { id } = req.params
    const orderExistis = await db.query(`SELECT * FROM orders WHERE id = $1;`, [id])
    if (!orderExistis) {
        return res.sendStatus(404)
    }
    try {
        const result = await db.query(`
            SELECT 
              c.id AS client_id,
              c.name AS client_name,
              c.address AS client_address,
              c.phone AS client_phone,
              o.id AS order_id,
              o.createdat AS created_at,
              o.quantity,
              o.totalprice,
              k.id AS cake_id,
              k.name AS cake_name,
              k.price AS cake_price,
              k.description AS cake_description,
              k.image AS cake_image
            FROM orders o
            JOIN clients c ON c.id = o.clientid
            JOIN cakes k ON k.id = o.cakeid
            WHERE o.id = $1;
            `, [id]
        )
        
        if (!result.rows[0]) {
            return res.sendStatus(404)
        }

        const selectedOrder = result.rows.map((row) => {
            return {
                client: {
                    id: row.client_id,
                    name: row.client_name,
                    address: row.client_address,
                    phone: row.client_phone,
                },
                cake: {
                    id: row.cake_id,
                    name: row.cake_name,
                    price: row.cake_price,
                    description: row.cake_description,
                    image: row.cake_image,
                },
                orderId: row.order_id,
                createdAt: row.created_at,
                quantity: row.quantity,
                totalPrice: row.totalprice,
            }
        })

        res.status(200).send(selectedOrder)

    } catch (error) {
        res.status(500).send(error.message)
    }
}