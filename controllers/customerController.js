const pool = require("../db/db.js");

exports.getAllUsers = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM customers`);

        if (result.rows.length > 0) {
            res.status(200).json({
                message: "Ma'lumot yetib keldi",
                data: result.rows
            });
        } else {
            res.status(400).json({
                message: "Hech qanday Foydlanuvchi mavjud emas"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: `Xatolik: ${error}` });
    }
}

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`SELECT * FROM customers WHERE id = $1`, [id])

        if (result.rowCount > 0) {
            res.status(200).json({
                message: "Foydlanuvchi topildi",
                data: result.rows
            });
        } else {
            res.status(400).json({
                message: "Foydlanuvchi topilmadi"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: `Xatolik: ${error}` });
    }
}

exports.createCustomer = async (req, res) => {
    try {
        const { fullname, phon } = req.body;

        if (fullname.length > 0 && phon.length > 0) {
            if (fullname.length > 3) {
                if (phon.length >= 9) {
                    const result = await pool.query(`
                        INSERT INTO customers(fullname, phon)
                        VALUES ($1, $2) RETURNING *`, [fullname, phon]
                    )
                    res.status(200).json({
                        message: "Foydalanuvchi muvaffaqqiyatli qo'shildi",
                        data: result.rows
                    });
                } else {
                    res.status(400).json({
                        message: "Xatolik: Telefon raqam kamida 9ta belgidan iborat bo'lisji zarur"
                    });
                }
            } else {
                res.status(400).json({
                    message: "Xatolik: Ism kamida 4ta harfdan iboray bo'lishi kerak"
                });
            }
        } else {
            res.status(400).json({
                message: "Xatolik: Ma'lumotlar to'liq emas"
            });
        }
    } catch (error) {
        res.status(404).json({ message: `Xatolik ${error}` });
    }
}

exports.editCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { fullname, phon } = req.body;

        if (fullname.length > 0 && phon.length > 0) {
            if (fullname.length > 3) {
                if (phon.length >= 9) {
                    const result = await pool.query(`
                        UPDATE customers
                        SET fullname = $1,
                            phon = $2
                        WHERE id = $3
                        RETURNING *`, [fullname, phon, id]
                    )
                    if (result.rowCount > 0) {
                        res.status(200).json({
                            message: "Foydalanuvchi ma'lumotlari muvaffaqqiyatli o'zgartirildi",
                            data: result.rows
                        });
                    } else {
                        res.status(400).json({
                            message: " Foydalanuvchi topilmadi"
                        });
                    }
                } else {
                    res.status(400).json({
                        message: "Telefon raqam kamida 9ta belgidan iborat bo'lisji zarur"
                    });
                }
            } else {
                res.status(400).json({
                    message: "Ism kamida 4ta harfdan iboray bo'lishi kerak"
                });
            }
        } else {
            res.status(400).json({
                message: "Ma'lumotlar to'liq emas"
            });
        }
    } catch (error) {
        res.status(404).json({ message: `Xatolik ${error}` });
    }
}

exports.deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`DELETE FROM customers WHERE id = $1 RETURNING *`, [id])

        if (result.rowCount > 0) {
            res.status(200).json({
                message: "Foydalanuvchi o'chirildi",
                deleteCustomer: result.rows
            });
        } else {
            res.status(400).json({ message: "Foydlanuvchi topilmadi" });
        }
    } catch (error) {
        res.status(404).json({
            message: `Xatolik: ${error}`
        });
    }
}

exports.allCustomerBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const bormi = await pool.query(`SELECT * FROM customers WHERE id = $1`, [id])
        const result = await pool.query(`
            select customers.fullname, rooms.id as "roomid" , rooms.roomnumber, rooms.status
            from customers
            join reviews
            on customers.id = reviews.customerid
            join rooms
            on rooms.id = reviews.roomid
            where customers.id = $1`,
            [id]
        )

        if (bormi.rowCount > 0) {
            if (result.rowCount > 0) {
                res.status(200).json({
                    message: "Ma'lumot yetib keldi",
                    data: result.rows
                });
            } else {
                res.status(400).json({ message: "Foydalanuvchi xona band qilmagan!!!"});
            }
        } else {
            res.status(400).json({ message: "Foydalanuvchi topilmadi!!!" });
        }
    } catch (error) {
        res.status(404).json({
            message: `Xatolik: ${error}`
        });
    }
}

exports.allCustomerReviews = async (req, res) => {
    try {
        const { id } = req.params;
        const bormi = await pool.query(`SELECT * FROM customers WHERE id = $1`, [id]);
        const result = await pool.query(`
            select customers.fullname, reviews.reviewsDate, reviews.coments, rooms.roomnumber, roomtypes.typename, roomtypes.description, roomtypes.price, rooms.status
            from roomtypes
            join rooms
            on roomtypes.id = rooms.roomtypeid
            join reviews
            on rooms.id = reviews.roomid
            join customers
            on reviews.customerid = customers.id
            where customers.id = $1`,
            [id]
        );

        if (bormi.rowCount > 0){
            if (result.rowCount>0){
                res.status(200).json({
                    message: "Ma'lumot yetib keldi",
                    data: result.rows
                });
            } else {
                res.status(400).json({message: "Foydalanuvchi hali xona band qilmagan"});
            }
        } else {
            res.status(400).json({message: "Foydalanuvchi topilmadi!!!"});
        }
    } catch (error) {
        res.status(404).json({message: `Xatolik: ${error}`});
    }
}